import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { getTenantByHost } from '@/lib/tenant';
import {
  queryDashScopeWav2LipTask,
  Wav2LipProviderError,
} from '@/wav2lip/dashscope';
import {
  getUserWav2LipTask,
  refundWav2LipTaskCredits,
  transferWav2LipOutputToStorage,
  updateWav2LipTaskFromProvider,
} from '@/wav2lip/tasks';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const statusSchema = z.object({
  taskId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { taskId } = statusSchema.parse(await request.json());
    const tenant = getTenantByHost(request.headers.get('host'));
    const task = await getUserWav2LipTask({
      userId: session.user.id,
      taskId,
      siteId: tenant.siteId,
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.status === 'succeeded' || task.status === 'failed') {
      return NextResponse.json({
        taskId,
        status: task.status,
        outputUrl: task.outputUrl,
        error: task.errorMessage,
      });
    }

    const result = await queryDashScopeWav2LipTask(taskId);
    let finalOutputUrl = result.outputUrl;
    let outputStorageKey: string | undefined;
    let refundedAt: Date | undefined;

    if (result.status === 'succeeded' && result.outputUrl) {
      if (task.outputUrl && task.outputStorageKey) {
        finalOutputUrl = task.outputUrl;
        outputStorageKey = task.outputStorageKey;
      } else {
        const storedOutput = await transferWav2LipOutputToStorage({
          taskId,
          outputUrl: result.outputUrl,
        });
        finalOutputUrl = storedOutput.url;
        outputStorageKey = storedOutput.key;
      }
    }

    let friendlyError = result.error;
    if (result.status === 'failed') {
      if (!task.refundedAt) {
        await refundWav2LipTaskCredits({
          userId: session.user.id,
          taskId,
          siteId: tenant.siteId,
          creditsUsed: task.creditsUsed,
        });
        refundedAt = new Date();
      }

      const rawErr = (result.error || '').toLowerCase();
      if (
        rawErr.includes("can't detect face") ||
        rawErr.includes('no matched face') ||
        rawErr.includes('face not found')
      ) {
        friendlyError =
          'No clear human face was detected in this video. Your 20 credits were automatically refunded. Please use a well-lit video with a visible face.';
      } else if (
        rawErr.includes('audio duration') ||
        rawErr.includes('audio limit')
      ) {
        friendlyError =
          'The audio duration is invalid. Your 20 credits were automatically refunded.';
      } else if (
        rawErr.includes('video file corrupted') ||
        rawErr.includes('invalid video')
      ) {
        friendlyError =
          'The video file is corrupted or unreadable. Your 20 credits were automatically refunded.';
      } else {
        friendlyError = `Generation failed (${result.error || 'GPU error'}). Your 20 credits were automatically refunded.`;
      }
    }

    await updateWav2LipTaskFromProvider({
      userId: session.user.id,
      siteId: tenant.siteId,
      result: {
        ...result,
        error: friendlyError,
      },
      outputUrl: finalOutputUrl,
      outputStorageKey,
      refundedAt,
    });

    return NextResponse.json({
      taskId,
      status: result.status,
      outputUrl: finalOutputUrl,
      error: friendlyError,
      refunded: !!refundedAt || !!task.refundedAt,
    });
  } catch (error) {
    console.error('wav2lip task status error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.flatten() },
        { status: 400 }
      );
    }
    if (error instanceof Wav2LipProviderError) {
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Task status failed' },
      { status: 500 }
    );
  }
}
