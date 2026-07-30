import { requireSession, unauthorizedResponse } from '@/lib/require-session';
import { uploadFile } from '@/storage';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_WAV2LIP_VIDEO_SIZE = Number(
  process.env.WAV2LIP_MAX_VIDEO_FILE_SIZE ||
    process.env.WAV2LIP_MAX_FILE_SIZE ||
    300 * 1024 * 1024
);

const MAX_WAV2LIP_AUDIO_SIZE = Number(
  process.env.WAV2LIP_MAX_AUDIO_FILE_SIZE || 30 * 1024 * 1024
);

const ALLOWED_VIDEO_TYPES = new Set([
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/avi',
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
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const kind = formData.get('kind') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (kind !== 'video' && kind !== 'audio') {
      return NextResponse.json(
        { error: 'Invalid file kind. Use video or audio.' },
        { status: 400 }
      );
    }

    const maxSize =
      kind === 'audio' ? MAX_WAV2LIP_AUDIO_SIZE : MAX_WAV2LIP_VIDEO_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error:
            kind === 'audio'
              ? 'Audio size exceeds the 30 MB LipSync.pro limit'
              : 'Video size exceeds the 300 MB LipSync.pro limit',
        },
        { status: 400 }
      );
    }

    const allowedTypes =
      kind === 'audio' ? ALLOWED_AUDIO_TYPES : ALLOWED_VIDEO_TYPES;
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: `File type not supported: ${file.type || 'unknown'}` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = kind === 'audio' ? 'wav2lip/audio' : 'wav2lip/video';
    const result = await uploadFile(buffer, file.name, file.type, folder);

    return NextResponse.json(result);
  } catch (error) {
    console.error('wav2lip upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
