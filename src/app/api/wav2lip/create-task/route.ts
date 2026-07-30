import { consumeCredits, getUserCredits } from '@/credits/credits';
import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { getTenantByHost } from '@/lib/tenant';
import { storageConfig } from '@/storage/config/storage-config';
import {
  createDashScopeEmoTask,
  createDashScopeWav2LipTask,
  Wav2LipProviderError,
} from '@/wav2lip/dashscope';
import {
  createWav2LipTaskRecord,
  WAV2LIP_CREDITS_PER_TASK,
} from '@/wav2lip/tasks';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { type NextRequest, NextResponse } from 'next/server';
import { basename, join } from 'path';
import { tmpdir } from 'os';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_REFERENCE_IMAGE_SIZE = 10 * 1024 * 1024;
const GENERATED_IMAGE_VIDEO_FOLDER = 'wav2lip/image-video';

function getS3Client() {
  return new S3Client({
    region: storageConfig.region || 'auto',
    endpoint: storageConfig.endpoint,
    credentials: {
      accessKeyId: storageConfig.accessKeyId,
      secretAccessKey: storageConfig.secretAccessKey,
    },
    forcePathStyle: storageConfig.forcePathStyle,
  });
}

const createTaskSchema = z.object({
  videoUrl: z.string().url(),
  audioUrl: z.string().url(),
  refImageUrl: z.string().url().optional(),
  videoExtension: z.boolean().optional(),
  modelMode: z.enum(['videoretalk', 'emo']).optional(),
});

function getPublicFileUrl(appUrl: string, key: string) {
  return `${appUrl.replace(/\/$/, '')}/api/public-file?key=${encodeURIComponent(key)}`;
}

function extensionFromContentType(contentType: string) {
  if (contentType.includes('png')) {
    return '.png';
  }
  if (contentType.includes('webp')) {
    return '.webp';
  }
  if (contentType.includes('bmp')) {
    return '.bmp';
  }
  return '.jpg';
}

function runFfmpeg(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(ffmpeg.path, args, { windowsHide: true });
    let stderr = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`ffmpeg exited with code ${code}: ${stderr}`));
    });
  });
}

async function createVideoFromReferenceImage({
  refImageUrl,
  appUrl,
}: {
  refImageUrl: string;
  appUrl: string;
}) {
  const response = await fetch(refImageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch reference image: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Reference image URL returned ${contentType}`);
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  if (imageBuffer.length > MAX_REFERENCE_IMAGE_SIZE) {
    throw new Error('Reference image exceeds the 10 MB DashScope limit');
  }

  const id = randomUUID();
  const workDir = join(tmpdir(), `wav2lip-image-${id}`);
  const inputPath = join(
    workDir,
    `source${extensionFromContentType(contentType)}`
  );
  const outputPath = join(workDir, `${basename(id)}.mp4`);
  const outputKey = `${GENERATED_IMAGE_VIDEO_FOLDER}/${id}.mp4`;

  await mkdir(workDir, { recursive: true });

  try {
    await writeFile(inputPath, imageBuffer);
    await runFfmpeg([
      '-y',
      '-loop',
      '1',
      '-framerate',
      '25',
      '-i',
      inputPath,
      '-t',
      '4',
      '-vf',
      'scale=720:720:force_original_aspect_ratio=decrease,pad=720:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p',
      '-r',
      '25',
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-level',
      '4.0',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      outputPath,
    ]);

    const s3 = getS3Client();
    await s3.send(
      new PutObjectCommand({
        Bucket: storageConfig.bucketName,
        Key: outputKey,
        Body: await readFile(outputPath),
        ContentType: 'video/mp4',
      })
    );

    return getPublicFileUrl(appUrl, outputKey);
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const body = createTaskSchema.parse(await request.json());
    const balance = await getUserCredits(session.user.id);

    if (balance < WAV2LIP_CREDITS_PER_TASK) {
      return NextResponse.json(
        {
          error: 'Insufficient credits',
          requiredCredits: WAV2LIP_CREDITS_PER_TASK,
          balance,
        },
        { status: 402 }
      );
    }

    const useEmoPhotoMode = body.refImageUrl && body.modelMode === 'emo';
    let finalBody = body;
    if (body.refImageUrl && !useEmoPhotoMode) {
      const appUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_WEBSITE_URL ||
        request.nextUrl.origin ||
        'https://lipsync.pro';
      const imageVideoUrl = await createVideoFromReferenceImage({
        refImageUrl: body.refImageUrl,
        appUrl,
      });
      finalBody = {
        ...body,
        videoUrl: imageVideoUrl,
        refImageUrl: undefined,
        videoExtension: body.videoExtension ?? true,
      };
    }

    const providerTask = useEmoPhotoMode
      ? await createDashScopeEmoTask({
          imageUrl: body.refImageUrl!,
          audioUrl: body.audioUrl,
        })
      : await createDashScopeWav2LipTask(finalBody);
    await consumeCredits({
      userId: session.user.id,
      amount: WAV2LIP_CREDITS_PER_TASK,
      description: `Lip Sync AI generation: ${WAV2LIP_CREDITS_PER_TASK} credits`,
    });

    const tenant = getTenantByHost(request.headers.get('host'));

    await createWav2LipTaskRecord({
      userId: session.user.id,
      providerTaskId: providerTask.taskId,
      siteId: tenant.siteId,
      videoUrl: useEmoPhotoMode ? body.refImageUrl! : finalBody.videoUrl,
      audioUrl: body.audioUrl,
      creditsUsed: WAV2LIP_CREDITS_PER_TASK,
      providerResponse: providerTask.providerResponse,
    });

    return NextResponse.json({
      taskId: providerTask.taskId,
      creditsUsed: WAV2LIP_CREDITS_PER_TASK,
      remainingCredits: balance - WAV2LIP_CREDITS_PER_TASK,
    });
  } catch (error) {
    console.error('wav2lip create task error:', error);
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
      {
        error: error instanceof Error ? error.message : 'Task creation failed',
      },
      { status: 500 }
    );
  }
}
