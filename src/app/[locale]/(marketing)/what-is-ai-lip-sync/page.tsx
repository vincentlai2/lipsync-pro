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
    title: 'What Is AI Lip Sync? | LipSync.pro',
    description:
      'Learn what AI lip sync means, where it helps, and how creators and teams use it to update video speech.',
    locale,
    pathname: '/what-is-ai-lip-sync',
  });
}

export default function WhatIsAILipSyncPage() {
  return (
    <LipSyncContentPage
      eyebrow="Guide"
      title="What is AI lip sync?"
      description="AI lip sync updates the mouth movement in a video so it matches a new voice track, narration, or translated script."
      sections={[
        {
          title: 'A practical definition',
          body: 'AI lip sync is a video generation workflow for matching visible speech to audio. Instead of reshooting a presenter or manually animating every mouth shape, you provide a source face video and a target voice. The system creates a new version where the mouth movement follows the new audio.',
        },
        {
          title: 'Where it fits',
          body: 'The strongest use cases are video localization, creator content, marketing tests, product demos, training updates, and avatar workflows. It is especially useful when the face, message, and voice need to change faster than a traditional production cycle allows.',
        },
        {
          title: 'What affects quality',
          body: 'Clear face visibility, steady lighting, limited head turns, and clean voice audio matter. Short clips are easier to test and tune before scaling to longer videos.',
        },
      ]}
      bullets={[
        'Best for videos with a clear visible face.',
        'Useful for dubbing, narration, and content updates.',
        'Lip Sync AI is the product feature name on LipSync.pro.',
      ]}
      relatedLinks={[
        {
          href: Routes.LipSyncAI,
          title: 'Try Lip Sync AI',
          description: 'Open the online lip sync video generator.',
        },
        {
          href: Routes.Wav2LipHowTo,
          title: 'How to create lip sync videos',
          description: 'Follow a simple workflow from source files to export.',
        },
      ]}
    />
  );
}
