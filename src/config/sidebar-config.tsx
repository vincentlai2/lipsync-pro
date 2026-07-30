'use client';

import { isDemoWebsite } from '@/lib/demo';
import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  CircleUserRoundIcon,
  ClapperboardIcon,
  CreditCardIcon,
  Settings2Icon,
  SettingsIcon,
  SparklesIcon,
  UsersRoundIcon,
  VideoIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Get sidebar config with translations.
 */
export function useSidebarLinks(): NestedMenuItem[] {
  const t = useTranslations('Dashboard');
  const isDemo = isDemoWebsite();

  return [
    {
      title: 'Lip Sync Studio',
      icon: <ClapperboardIcon className="size-4 shrink-0 text-primary" />,
      href: Routes.LipSyncAI,
      external: false,
      items: [
        {
          title: 'Lip Sync AI',
          icon: <SparklesIcon className="size-4 shrink-0 text-primary" />,
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
      ],
    },
    {
      title: t('myCreations'),
      icon: <VideoIcon className="size-4 shrink-0 text-primary" />,
      href: Routes.Wav2LipCreations,
      external: false,
    },
    {
      title: t('admin.title'),
      icon: <SettingsIcon className="size-4 shrink-0" />,
      authorizeOnly: isDemo ? ['admin', 'user'] : ['admin'],
      align: 'bottom',
      items: [
        {
          title: t('admin.users.title'),
          icon: <UsersRoundIcon className="size-4 shrink-0" />,
          href: Routes.AdminUsers,
          external: false,
        },
      ],
    },
    {
      title: t('settings.title'),
      icon: <Settings2Icon className="size-4 shrink-0" />,
      align: 'bottom',
      items: [
        {
          title: t('settings.profile.title'),
          icon: <CircleUserRoundIcon className="size-4 shrink-0" />,
          href: Routes.SettingsProfile,
          external: false,
        },
        {
          title: t('settings.billing.title'),
          icon: <CreditCardIcon className="size-4 shrink-0" />,
          href: Routes.SettingsBilling,
          external: false,
        },
      ],
    },
  ];
}
