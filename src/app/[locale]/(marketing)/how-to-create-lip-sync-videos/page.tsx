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

import { redirect } from 'next/navigation';

export default function HowToCreateLipSyncVideosPage() {
  redirect('/lip-sync-ai/how-to-use');
}
