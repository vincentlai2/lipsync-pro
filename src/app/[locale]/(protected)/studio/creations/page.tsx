import React from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/server';
import { getTenantByHost } from '@/lib/tenant';
import { listUserWav2LipTasks } from '@/wav2lip/tasks';
import { Routes } from '@/routes';
import { LocaleLink } from '@/i18n/navigation';
import { SparklesIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreationsGrid } from '@/components/dashboard/creations-grid';

/**
 * My Creations page
 * Accessible only by logged-in users under /studio/creations.
 * Renders a full grid gallery of finished syncs, play previews, statuses, and downloads.
 */
export default async function CreationsPage() {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(Routes.Login);
  }

  const headersList = await headers();
  const tenant = getTenantByHost(headersList.get('host'));
  const rawTasks = await listUserWav2LipTasks({
    userId,
    siteId: tenant.siteId,
  });
  const tasks = rawTasks.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Lip Sync Studio' },
          { label: 'My Creations', isCurrentPage: true },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-gradient-to-b from-blue-50/30 via-background to-background dark:from-transparent dark:to-transparent relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/0 rounded-full blur-3xl -z-10" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              My Lip Sync Creations
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 font-medium">
              History, preview player, and 1080p HD downloads for your AI
              generated videos.
            </p>
          </div>
          <Button
            asChild
            className="cursor-pointer bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold shadow-lg hover:from-zinc-700 hover:to-zinc-900 shrink-0 rounded-xl px-5"
          >
            <LocaleLink href={Routes.LipSyncAI}>
              <SparklesIcon className="mr-2 size-4 text-blue-400" />
              Create New Video
            </LocaleLink>
          </Button>
        </div>

        <CreationsGrid tasks={tasks} />
      </div>
    </>
  );
}
