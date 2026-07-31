import { randomUUID } from 'crypto';
import { addCredits } from '@/credits/credits';
import { getDb } from '@/db';
import { wav2lipTask } from '@/db/schema';
import { uploadFile } from '@/storage';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';
import type { Wav2LipStatusResult, Wav2LipTaskStatus } from './types';

export const WAV2LIP_CREDITS_PER_TASK = Number(
  process.env.WAV2LIP_CREDITS_PER_TASK || 20
);

export async function createWav2LipTaskRecord({
  userId,
  providerTaskId,
  siteId,
  videoUrl,
  audioUrl,
  creditsUsed,
  providerResponse,
}: {
  userId: string;
  providerTaskId: string;
  siteId?: string;
  videoUrl: string;
  audioUrl: string;
  creditsUsed: number;
  providerResponse: unknown;
}) {
  const db = await getDb();
  const id = randomUUID();

  await db.insert(wav2lipTask).values({
    id,
    userId,
    providerTaskId,
    siteId: siteId || 'lipsync.pro',
    videoUrl,
    audioUrl,
    creditsUsed,
    providerResponse,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return id;
}

export async function getUserWav2LipTask({
  userId,
  taskId,
  siteId,
}: {
  userId: string;
  taskId: string;
  siteId?: string;
}) {
  const db = await getDb();
  const filters = [
    eq(wav2lipTask.userId, userId),
    eq(wav2lipTask.providerTaskId, taskId),
  ];

  if (siteId) {
    filters.push(eq(wav2lipTask.siteId, siteId));
  }

  const records = await db
    .select()
    .from(wav2lipTask)
    .where(and(...filters))
    .limit(1);

  return records[0] || null;
}

function taskSiteFilter(siteId?: string) {
  if (!siteId) {
    return undefined;
  }

  return eq(wav2lipTask.siteId, siteId);
}

export async function listUserWav2LipTasks({
  userId,
  siteId,
}: {
  userId: string;
  siteId?: string;
}) {
  const db = await getDb();
  const filters = [eq(wav2lipTask.userId, userId)];
  const siteFilter = taskSiteFilter(siteId);

  if (siteFilter) {
    filters.push(siteFilter);
  }

  return db
    .select()
    .from(wav2lipTask)
    .where(and(...filters))
    .orderBy(desc(wav2lipTask.createdAt))
    .limit(20);
}

export async function listRecoverableWav2LipTasks({
  limit = 20,
  siteId = 'lipsync.pro',
}: {
  limit?: number;
  siteId?: string;
} = {}) {
  const db = await getDb();

  return db
    .select()
    .from(wav2lipTask)
    .where(
      and(
        eq(wav2lipTask.siteId, siteId),
        inArray(wav2lipTask.status, ['pending', 'running', 'unknown'])
      )
    )
    .orderBy(asc(wav2lipTask.createdAt))
    .limit(limit);
}

export async function updateWav2LipTaskFromProvider({
  userId,
  siteId,
  result,
  outputUrl,
  outputStorageKey,
  refundedAt,
}: {
  userId: string;
  siteId?: string;
  result: Wav2LipStatusResult;
  outputUrl?: string;
  outputStorageKey?: string;
  refundedAt?: Date;
}) {
  const db = await getDb();
  const now = new Date();
  const status: Wav2LipTaskStatus = result.status;
  const filters = [
    eq(wav2lipTask.userId, userId),
    eq(wav2lipTask.providerTaskId, result.taskId),
  ];

  if (siteId) {
    filters.push(eq(wav2lipTask.siteId, siteId));
  }

  await db
    .update(wav2lipTask)
    .set({
      status,
      outputUrl: outputUrl ?? result.outputUrl,
      outputStorageKey,
      errorMessage: result.error,
      providerResponse: result.providerResponse,
      updatedAt: now,
      completedAt:
        status === 'succeeded' || status === 'failed' ? now : undefined,
      refundedAt,
    })
    .where(and(...filters));
}

function filenameFromTask(taskId: string) {
  return `wav2lip-${taskId}.mp4`;
}

export async function transferWav2LipOutputToStorage({
  taskId,
  outputUrl,
}: {
  taskId: string;
  outputUrl: string;
}) {
  const response = await fetch(outputUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download Lip Sync AI result: ${response.status}`
    );
  }

  const contentType = response.headers.get('content-type') || 'video/mp4';
  const buffer = Buffer.from(await response.arrayBuffer());

  return uploadFile(
    buffer,
    filenameFromTask(taskId),
    contentType,
    'wav2lip/results'
  );
}

export async function refundWav2LipTaskCredits({
  userId,
  taskId,
  siteId,
  creditsUsed,
}: {
  userId: string;
  taskId: string;
  siteId?: string;
  creditsUsed: number;
}) {
  if (creditsUsed <= 0) {
    return;
  }

  await addCredits({
    userId,
    siteId,
    amount: creditsUsed,
    type: 'WAV2LIP_REFUND',
    description: `Refund failed Lip Sync AI task: ${taskId}`,
  });
}
