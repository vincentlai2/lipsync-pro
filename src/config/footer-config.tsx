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
      title: 'Guides',
      items: [
        {
          title: 'AI lip sync guides',
          href: Routes.Blog,
          external: false,
        },
        {
          title: 'How to create lip sync videos',
          href: Routes.Wav2LipHowTo,
          external: false,
        },
        {
          title: 'Video translation and dubbing',
          href: Routes.Wav2LipColab,
          external: false,
        },
        {
          title: 'AI vs traditional dubbing',
          href: Routes.Wav2LipAlternative,
          external: false,
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'What is AI lip sync?',
          href: Routes.Wav2LipWhatIs,
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
