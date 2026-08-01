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
      title: 'Learn',
      href: '/learn' as any,
      items: [
        {
          title: 'Learn Academy Hub',
          description:
            'Explore AI video workflows, step-by-step guides, and tutorials.',
          icon: <BookOpenIcon className="size-4 shrink-0 text-blue-500" />,
          href: '/learn' as any,
          external: false,
        },
        {
          title: 'What is AI lip sync?',
          description:
            'A plain-English definition, neural Viseme alignment & use cases.',
          icon: <HelpCircleIcon className="size-4 shrink-0" />,
          href: '/lip-sync-ai/what-is' as any,
          external: false,
        },
        {
          title: 'How to create lip sync videos',
          description:
            'A step-by-step creator guide from video upload to HD export.',
          icon: <BookOpenIcon className="size-4 shrink-0" />,
          href: '/lip-sync-ai/how-to-use' as any,
          external: false,
        },
        {
          title: 'Text to lip sync guide',
          description: 'How to convert written scripts into speaking video.',
          icon: <ClapperboardIcon className="size-4 shrink-0" />,
          href: '/text-to-lip-sync/how-to-use' as any,
          external: false,
        },
        {
          title: 'Photo animation guide',
          description:
            'How to turn still portrait pictures into talking avatars.',
          icon: <ClapperboardIcon className="size-4 shrink-0" />,
          href: '/photo-to-lip-sync/how-to-use' as any,
          external: false,
        },
      ],
    },
  ];
}
