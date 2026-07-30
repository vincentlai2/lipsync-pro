'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { BookOpenIcon, ClapperboardIcon, HelpCircleIcon } from 'lucide-react';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/navbar
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function useNavbarLinks(): NestedMenuItem[] {
  return [
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
      href: Routes.PhotoToLipSync,
      external: false,
    },
    {
      title: 'Pricing',
      href: '/#pricing',
      external: false,
    },
    {
      title: 'Guides',
      items: [
        {
          title: 'AI lip sync guides',
          description:
            'Practical workflows for creators, teams, and localization.',
          icon: <BookOpenIcon className="size-4 shrink-0" />,
          href: Routes.Blog,
          external: false,
        },
        {
          title: 'How to create lip sync videos',
          description: 'A step-by-step guide from upload to export.',
          icon: <BookOpenIcon className="size-4 shrink-0" />,
          href: Routes.Wav2LipHowTo,
          external: false,
        },
        {
          title: 'AI vs traditional dubbing',
          description:
            'When AI lip sync fits better than classic dubbing workflows.',
          icon: <ClapperboardIcon className="size-4 shrink-0" />,
          href: Routes.Wav2LipAlternative,
          external: false,
        },
        {
          title: 'Video translation and dubbing',
          description:
            'Plan multilingual video updates without losing performance.',
          icon: <ClapperboardIcon className="size-4 shrink-0" />,
          href: Routes.Wav2LipColab,
          external: false,
        },
        {
          title: 'What is AI lip sync?',
          description: 'A plain-English definition, use cases, and limits.',
          icon: <HelpCircleIcon className="size-4 shrink-0" />,
          href: Routes.Wav2LipWhatIs,
          external: false,
        },
      ],
    },
  ];
}
