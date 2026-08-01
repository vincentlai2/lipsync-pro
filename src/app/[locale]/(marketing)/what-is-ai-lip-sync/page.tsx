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

import { redirect } from 'next/navigation';

export default function WhatIsAILipSyncPage() {
  redirect('/lip-sync-ai/what-is');
}
