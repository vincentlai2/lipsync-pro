import { generateEdgeTTSAudio } from '@/lib/edge-tts';
import { uploadFile } from '@/storage';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_TEXT_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice = 'en-US-JennyNeural' } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter valid text.' },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();
    if (trimmedText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Text must be ${MAX_TEXT_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    const audioBuffer = await generateEdgeTTSAudio(trimmedText, voice);

    if (!audioBuffer || audioBuffer.length === 0) {
      throw new Error('Voice synthesis failed.');
    }

    const fileName = `tts_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.mp3`;
    const result = await uploadFile(
      audioBuffer,
      fileName,
      'audio/mpeg',
      'wav2lip/audio'
    );

    return NextResponse.json({
      url: result.url,
      key: result.key,
      text: trimmedText,
      voice,
    });
  } catch (error) {
    console.error('Edge-TTS synthesis error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Voice generation failed.',
      },
      { status: 500 }
    );
  }
}
