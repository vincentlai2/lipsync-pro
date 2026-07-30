'use client';

import { CreditsBalanceButton } from '@/components/layout/credits-balance-button';
import { Logo } from '@/components/layout/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';

export function WorkspaceMobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200/80 bg-white/95 px-3 backdrop-blur lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="size-9 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
        <LocaleLink
          href={Routes.Root}
          className="flex min-w-0 items-center gap-2 font-semibold text-sm"
          aria-label="Go to LipSync.pro home"
        >
          <Logo className="size-6" />
          <span className="truncate">LipSync.pro</span>
        </LocaleLink>
      </div>
      <CreditsBalanceButton />
    </header>
  );
}
