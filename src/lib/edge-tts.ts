import { Communicate } from 'edge-tts-universal';

export async function generateEdgeTTSAudio(
  text: string,
  voice = 'en-US-JennyNeural'
): Promise<Buffer> {
  const comm = new Communicate(text, { voice });
  const audioBuffers: Buffer[] = [];

  for await (const chunk of comm.stream()) {
    if (chunk.type === 'audio' && chunk.data) {
      audioBuffers.push(Buffer.from(chunk.data));
    }
  }

  const finalBuffer = Buffer.concat(audioBuffers);
  if (finalBuffer.length === 0) {
    throw new Error('Edge-TTS generated empty audio buffer');
  }

  return finalBuffer;
}
