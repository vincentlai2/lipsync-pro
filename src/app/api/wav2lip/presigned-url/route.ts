import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { storageConfig } from '@/storage/config/storage-config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_VIDEO_TYPES = new Set([
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/avi',
  'video/webm',
  'video/x-matroska',
  'video/ogg',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const ALLOWED_AUDIO_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/mp4',
  'audio/m4a',
  'audio/x-m4a',
  'audio/aac',
  'audio/x-aac',
]);

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { filename, contentType, kind } = body;

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json(
        { error: 'Filename is required.' },
        { status: 400 }
      );
    }

    if (!contentType || typeof contentType !== 'string') {
      return NextResponse.json(
        { error: 'File type is required.' },
        { status: 400 }
      );
    }

    if (kind !== 'video' && kind !== 'audio') {
      return NextResponse.json(
        { error: 'Invalid asset type. Use video or audio.' },
        { status: 400 }
      );
    }

    const allowedTypes =
      kind === 'audio' ? ALLOWED_AUDIO_TYPES : ALLOWED_VIDEO_TYPES;
    if (!allowedTypes.has(contentType)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${contentType}` },
        { status: 400 }
      );
    }

    const extension = filename.split('.').pop() || '';
    const uniqueFilename = `${randomUUID()}${extension ? `.${extension}` : ''}`;
    const folder = kind === 'audio' ? 'wav2lip/audio' : 'wav2lip/video';
    const key = `${folder}/${uniqueFilename}`;

    const s3Client = new S3Client({
      region: storageConfig.region || 'auto',
      endpoint: storageConfig.endpoint,
      credentials: {
        accessKeyId: storageConfig.accessKeyId,
        secretAccessKey: storageConfig.secretAccessKey,
      },
      forcePathStyle: storageConfig.forcePathStyle,
    });

    const command = new PutObjectCommand({
      Bucket: storageConfig.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    const origin = request.nextUrl.origin || 'https://lipsync.pro';
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_WEBSITE_URL ||
      origin;
    const publicUrl = `${appUrl.replace(/\/$/, '')}/api/public-file?key=${encodeURIComponent(key)}`;

    return NextResponse.json({
      uploadUrl,
      key,
      url: publicUrl,
    });
  } catch (error) {
    console.error('Presigned URL generation error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate the upload URL.',
      },
      { status: 500 }
    );
  }
}
