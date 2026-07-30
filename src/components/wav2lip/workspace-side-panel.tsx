import { RechargeButton } from '@/components/pricing/recharge-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserCredits } from '@/credits/credits';
import { getTenantByHost } from '@/lib/tenant';
import { listUserWav2LipTasks } from '@/wav2lip/tasks';
import { ClockIcon, WandSparklesIcon } from 'lucide-react';
import { headers } from 'next/headers';
import { Suspense } from 'react';

interface WorkspaceSidePanelProps {
  userId: string;
  callbackUrl: string;
}

function statusLabel(status: string) {
  switch (status) {
    case 'succeeded':
      return 'Done';
    case 'failed':
      return 'Failed';
    case 'running':
      return 'Running';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
}

function statusVariant(status: string) {
  if (status === 'succeeded') return 'default';
  if (status === 'failed') return 'destructive';
  return 'secondary';
}

async function CreditsCard({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl: string;
}) {
  const credits = await getUserCredits(userId);

  return (
    <Card className="border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="px-5 pb-2 pt-5">
        <CardTitle className="flex items-center gap-2 text-sm">
          <WandSparklesIcon className="size-4 text-blue-600 dark:text-blue-400" />
          Available credits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5">
        <div className="flex items-center justify-between">
          <p className="font-extrabold text-3xl text-zinc-950 dark:text-white">
            {credits}
          </p>
          <RechargeButton
            callbackUrl={callbackUrl}
            className="h-8 cursor-pointer px-3 text-xs"
          />
        </div>
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800 text-sm dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
          <div className="flex items-center justify-between gap-3">
            <span>Render cost</span>
            <span className="font-bold">20 credits</span>
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          Failed generations are refunded automatically.
        </p>
      </CardContent>
    </Card>
  );
}

async function RecentTasksCard({ userId }: { userId: string }) {
  const headersList = await headers();
  const tenant = getTenantByHost(headersList.get('host'));
  const tasks = await listUserWav2LipTasks({
    userId,
    siteId: tenant.siteId,
  });

  return (
    <Card className="border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="px-5 pb-2 pt-5">
        <CardTitle className="flex items-center gap-2 text-sm">
          <ClockIcon className="size-4 text-blue-600 dark:text-blue-400" />
          Recent videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5">
        {tasks.length === 0 ? (
          <p className="py-3 text-muted-foreground text-sm">
            No generations yet. Your Lip Sync AI history will appear here.
          </p>
        ) : (
          <div className="max-h-[480px] divide-y divide-border/60 overflow-y-auto pr-1">
            {tasks.slice(0, 10).map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="flex-1 truncate font-medium text-foreground text-sm">
                    {task.videoUrl
                      ? decodeURIComponent(task.videoUrl)
                          .split('/')
                          .pop()
                          ?.split('?')[0]
                      : task.providerTaskId || 'Lip sync video'}
                  </p>
                  <Badge
                    variant={statusVariant(task.status)}
                    className="shrink-0 px-1.5 py-0 text-[10px]"
                  >
                    {statusLabel(task.status)}
                  </Badge>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-[10px]">
                    {task.createdAt.toLocaleString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    - {task.creditsUsed} credits
                  </span>
                  {task.outputUrl && (
                    <Button
                      size="xs"
                      asChild
                      className="h-6 cursor-pointer px-2 text-[10px]"
                    >
                      <a href={task.outputUrl} target="_blank" rel="noreferrer">
                        Download
                      </a>
                    </Button>
                  )}
                </div>
                {task.errorMessage && (
                  <p className="mt-0.5 break-all text-[10px] text-destructive">
                    {task.errorMessage}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PanelSkeleton() {
  return (
    <Card className="border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 h-5 w-28 animate-pulse rounded bg-muted" />
      <div className="h-8 w-20 animate-pulse rounded bg-muted" />
    </Card>
  );
}

export function WorkspaceSidePanel({
  userId,
  callbackUrl,
}: WorkspaceSidePanelProps) {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <Suspense fallback={<PanelSkeleton />}>
        <CreditsCard userId={userId} callbackUrl={callbackUrl} />
      </Suspense>
      <Suspense fallback={<PanelSkeleton />}>
        <RecentTasksCard userId={userId} />
      </Suspense>
    </div>
  );
}
