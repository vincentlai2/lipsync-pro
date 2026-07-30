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
    title: 'Video Translation and AI Dubbing | LipSync.pro',
    description:
      'Use AI lip sync to support translated videos, dubbing workflows, and multilingual content updates.',
    locale,
    pathname: '/video-translation-dubbing',
  });
}

export default function VideoTranslationDubbingPage() {
  return (
    <LipSyncContentPage
      eyebrow="Localization"
      title="Video translation and AI dubbing"
      description="Multilingual video needs more than translated audio. Lip Sync AI helps the speaker look aligned with the new language."
      sections={[
        {
          title: 'Why lip sync matters in localization',
          body: 'When the face is visible, translated audio can feel disconnected if mouth movement still follows the original language. AI lip sync helps translated videos feel more coherent, especially for presenter-led content.',
        },
        {
          title: 'A repeatable localization flow',
          body: 'Translate the script, record or generate the target voice, test a short segment, then produce the full localized clip. This keeps review cycles smaller and makes quality issues easier to catch.',
        },
        {
          title: 'Where teams can apply it',
          body: 'Marketing videos, onboarding lessons, sales demos, product explainers, and internal training can all benefit when the same source video needs multiple language versions.',
        },
      ]}
      bullets={[
        'Useful for translated presenter videos.',
        'Works best with clean target-language audio.',
        'Future French pages should target synchronisation labiale IA.',
      ]}
      relatedLinks={[
        {
          href: Routes.LipSyncAI,
          title: 'Open Lip Sync AI',
          description: 'Generate a localized lip sync test.',
        },
        {
          href: Routes.Wav2LipWhatIs,
          title: 'What is AI lip sync?',
          description: 'Understand the core concept and limits.',
        },
      ]}
    />
  );
}
