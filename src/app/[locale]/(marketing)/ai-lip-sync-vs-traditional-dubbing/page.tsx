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

import { redirect } from 'next/navigation';

export default function AILipSyncVsTraditionalDubbingPage() {
  redirect('/lip-sync-ai/vs-traditional-dubbing');
}
