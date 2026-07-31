import { validateCronAuth, unauthorizedCronResponse } from '@/lib/cron-auth';
import { queryDashScopeWav2LipTask } from '@/wav2lip/dashscope';
import { formatWav2LipFailureMessage } from '@/wav2lip/errors';
import {
  listRecoverableWav2LipTasks,
  refundWav2LipTaskCredits,
  transferWav2LipOutputToStorage,
  updateWav2LipTaskFromProvider,
} from '@/wav2lip/tasks';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_MAX_TASK_AGE_MINUTES = 30;
const DEFAULT_BATCH_LIMIT = 20;
const DEFAULT_SITE_ID = 'lipsync.pro';

function getMaxTaskAgeMs() {
  const minutes = Number(
    process.env.WAV2LIP_TASK_TIMEOUT_MINUTES || DEFAULT_MAX_TASK_AGE_MINUTES
  );
  return Math.max(5, minutes) * 60 * 1000;
}

function isExpired(createdAt: Date, now: Date) {
  return now.getTime() - createdAt.getTime() > getMaxTaskAgeMs();
}

function expiredErrorMessage(creditsUsed: number) {
  return `Generation expired before returning a result. Your ${creditsUsed} credits were automatically refunded. Please try again with a short video and clean audio.`;
}

export async function GET(request: Request) {
  if (!validateCronAuth(request)) {
    return unauthorizedCronResponse();
  }

  const now = new Date();
  const url = new URL(request.url);
  const siteId = url.searchParams.get('siteId') || DEFAULT_SITE_ID;
  const batchLimit = Math.min(
    Math.max(Number(url.searchParams.get('limit') || DEFAULT_BATCH_LIMIT), 1),
    50
  );
  const summary = {
    siteId,
    checked: 0,
    succeeded: 0,
    failed: 0,
    expired: 0,
    stillProcessing: 0,
    errors: 0,
    details: [] as Array<{
      taskId: string;
      previousStatus: string;
      status: string;
      message?: string;
    }>,
  };

  const tasks = await listRecoverableWav2LipTasks({
    siteId,
    limit: batchLimit,
  });

  for (const task of tasks) {
    summary.checked++;

    try {
      const result = await queryDashScopeWav2LipTask(task.providerTaskId);
      const taskExpired = isExpired(task.createdAt, now);

      if (result.status === 'succeeded' && result.outputUrl) {
        const storedOutput =
          task.outputUrl && task.outputStorageKey
            ? { url: task.outputUrl, key: task.outputStorageKey }
            : await transferWav2LipOutputToStorage({
                taskId: task.providerTaskId,
                outputUrl: result.outputUrl,
              });

        await updateWav2LipTaskFromProvider({
          userId: task.userId,
          siteId,
          result,
          outputUrl: storedOutput.url,
          outputStorageKey: storedOutput.key,
        });

        summary.succeeded++;
        summary.details.push({
          taskId: task.providerTaskId,
          previousStatus: task.status,
          status: 'succeeded',
        });
        continue;
      }

      if (result.status === 'failed' || taskExpired) {
        let refundedAt: Date | undefined;
        const error = taskExpired
          ? expiredErrorMessage(task.creditsUsed)
          : formatWav2LipFailureMessage({
              error: result.error,
              creditsUsed: task.creditsUsed,
            });

        if (!task.refundedAt) {
          await refundWav2LipTaskCredits({
            userId: task.userId,
            taskId: task.providerTaskId,
            siteId,
            creditsUsed: task.creditsUsed,
          });
          refundedAt = new Date();
        }

        await updateWav2LipTaskFromProvider({
          userId: task.userId,
          siteId,
          result: {
            ...result,
            status: 'failed',
            error,
          },
          refundedAt,
        });

        if (taskExpired) {
          summary.expired++;
        } else {
          summary.failed++;
        }
        summary.details.push({
          taskId: task.providerTaskId,
          previousStatus: task.status,
          status: taskExpired ? 'expired' : 'failed',
          message: error,
        });
        continue;
      }

      await updateWav2LipTaskFromProvider({
        userId: task.userId,
        siteId,
        result,
      });

      summary.stillProcessing++;
      summary.details.push({
        taskId: task.providerTaskId,
        previousStatus: task.status,
        status: result.status,
      });
    } catch (error) {
      summary.errors++;
      summary.details.push({
        taskId: task.providerTaskId,
        previousStatus: task.status,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return NextResponse.json(summary);
}
