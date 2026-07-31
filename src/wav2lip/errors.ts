export function formatWav2LipFailureMessage({
  error,
  creditsUsed,
}: {
  error?: string;
  creditsUsed: number;
}) {
  const rawError = (error || '').toLowerCase();
  const refundText = `Your ${creditsUsed} credits were automatically refunded.`;

  if (
    rawError.includes('datainspectionfailed') ||
    rawError.includes('inappropriate content')
  ) {
    return `This video or audio did not pass the automated content check. ${refundText} Please try another short clip with a clearly visible face and clean audio.`;
  }

  if (
    rawError.includes('invalidfile.resolution') ||
    rawError.includes('invalid video resolution')
  ) {
    return `The video resolution is not supported. ${refundText} Please use a video with width and height between 640 and 2048 px.`;
  }

  if (
    rawError.includes("can't detect face") ||
    rawError.includes('no matched face') ||
    rawError.includes('face not found')
  ) {
    return `No clear human face was detected in this video. ${refundText} Please use a well-lit video with a visible face.`;
  }

  if (rawError.includes('audio duration') || rawError.includes('audio limit')) {
    return `The audio duration is invalid. ${refundText}`;
  }

  if (
    rawError.includes('video file corrupted') ||
    rawError.includes('invalid video')
  ) {
    return `The video file is corrupted or unreadable. ${refundText}`;
  }

  return `Generation failed. ${refundText}`;
}
