import { LipSyncContentPage } from '@/components/lipsync/content-page';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'How to Create Lip Sync Videos Online | LipSync.pro',
    description:
      'A simple workflow for creating AI lip sync videos online from a source video and voice audio.',
    locale,
    pathname: '/how-to-create-lip-sync-videos',
  });
}

export default function HowToCreateLipSyncVideosPage() {
  return (
    <LipSyncContentPage
      eyebrow="Workflow"
      title="How to create lip sync videos online"
      description="Use Lip Sync AI to turn a source video and voice track into a synced talking video without a local editing setup."
      sections={[
        {
          title: 'Prepare the source video',
          body: 'Choose a short clip with one clear face, stable lighting, and a visible mouth. If you are testing a longer project, start with a representative 10 to 20 second sample so you can evaluate the result quickly.',
        },
        {
          title: 'Add the voice',
          body: 'Upload a clean audio track or begin with text-to-speech. The voice should be clear, paced naturally, and close to the timing you want in the final video.',
        },
        {
          title: 'Generate and review',
          body: 'Run the generation, review the mouth movement, and adjust the source or audio if needed. Once the short test works, repeat the same workflow for production clips.',
        },
      ]}
      bullets={[
        'Start with a short test clip.',
        'Use clean audio for better mouth movement.',
        'Keep the face visible and well lit.',
      ]}
      relatedLinks={[
        {
          href: Routes.LipSyncAI,
          title: 'Open Lip Sync AI',
          description: 'Use the tool directly in your browser.',
        },
        {
          href: Routes.Wav2LipAlternative,
          title: 'AI lip sync vs traditional dubbing',
          description: 'Compare the workflow with classic production.',
        },
      ]}
    />
  );
}
