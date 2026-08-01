'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';

/**
 * Get footer config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/footer
 *
 * @returns The footer config with translated titles
 */
export function useFooterLinks(): NestedMenuItem[] {
  return [
    {
      title: 'Product',
      items: [
        {
          title: 'Lip Sync AI',
          href: Routes.LipSyncAI,
          external: false,
        },
        {
          title: 'Text to Lip Sync',
          href: Routes.TextToLipSync,
          external: false,
        },
        {
          title: 'Photo to Lip Sync',
          href: Routes.AnimerPhotoIA,
          external: false,
        },
        {
          title: 'Pricing & Credit Plans',
          href: Routes.Pricing,
          external: false,
        },
      ],
    },
    {
      title: 'Learn & Clusters',
      items: [
        {
          title: 'Learn Academy Hub',
          href: '/learn' as any,
          external: false,
        },
        {
          title: 'What is AI lip sync?',
          href: '/lip-sync-ai/what-is' as any,
          external: false,
        },
        {
          title: 'How to create lip sync videos',
          href: '/lip-sync-ai/how-to-use' as any,
          external: false,
        },
        {
          title: 'AI vs traditional dubbing',
          href: '/lip-sync-ai/vs-traditional-dubbing' as any,
          external: false,
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'Text to Lip Sync Guide',
          href: '/text-to-lip-sync/how-to-use' as any,
          external: false,
        },
        {
          title: 'Photo Avatar Guide',
          href: '/photo-to-lip-sync/how-to-use' as any,
          external: false,
        },
        {
          title: 'Contact',
          href: Routes.Contact,
          external: false,
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          title: 'Privacy',
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: 'Terms',
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
