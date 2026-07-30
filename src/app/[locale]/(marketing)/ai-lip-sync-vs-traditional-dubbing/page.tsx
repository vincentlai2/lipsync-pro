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
    title: 'AI Lip Sync vs Traditional Dubbing | LipSync.pro',
    description:
      'Compare AI lip sync with traditional dubbing for localization, creator content, and video updates.',
    locale,
    pathname: '/ai-lip-sync-vs-traditional-dubbing',
  });
}

export default function AILipSyncVsTraditionalDubbingPage() {
  return (
    <LipSyncContentPage
      eyebrow="Comparison"
      title="AI lip sync vs traditional dubbing"
      description="Traditional dubbing focuses on voice replacement. AI lip sync adds visual speech alignment so localized or updated videos feel more natural."
      sections={[
        {
          title: 'Traditional dubbing',
          body: 'Classic dubbing replaces or overlays speech audio. It can work well when viewers do not need close visual alignment, but obvious mismatch between lips and voice can reduce trust in presenter-led video.',
        },
        {
          title: 'AI lip sync',
          body: 'AI lip sync updates the visual mouth movement so the speaker appears to say the new line. This is useful for translated videos, revised scripts, ads, demos, and training clips that need visual consistency.',
        },
        {
          title: 'Choosing the right workflow',
          body: 'Use traditional dubbing when speed and audio-only replacement are enough. Use Lip Sync AI when the viewer sees the speaker clearly and the mouth mismatch would be distracting.',
        },
      ]}
      bullets={[
        'Dubbing changes the voice.',
        'AI lip sync changes the visible speech.',
        'Combining both is valuable for localization.',
      ]}
      relatedLinks={[
        {
          href: Routes.LipSyncAI,
          title: 'Try Lip Sync AI',
          description: 'Create a synced test video online.',
        },
        {
          href: Routes.Wav2LipColab,
          title: 'Video translation and dubbing',
          description: 'Plan multilingual video workflows.',
        },
      ]}
    />
  );
}
