import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDb } from '@/db';
import { cn } from '@/lib/utils';
import { sql } from 'drizzle-orm';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  Clock3Icon,
  CreditCardIcon,
  DatabaseIcon,
  HeartPulseIcon,
  HistoryIcon,
  UserRoundPlusIcon,
  VideoIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

type CountRow = { count: number | string | bigint };

type SiteMetricRow = {
  site_id: string | null;
  total_users?: number | string | bigint;
  users_24h?: number | string | bigint;
  total_tasks?: number | string | bigint;
  tasks_24h?: number | string | bigint;
  succeeded_tasks?: number | string | bigint;
  failed_tasks?: number | string | bigint;
  running_tasks?: number | string | bigint;
  total_credits?: number | string | bigint | null;
  paid_payments?: number | string | bigint;
  paid_revenue_cents?: number | string | bigint | null;
};

type RecoverableTaskRow = {
  site_id: string | null;
  status: string;
  count: number | string | bigint;
};

type RecentTaskRow = {
  site_id: string | null;
  status: string;
  provider_task_id: string;
  email: string | null;
  credits_used: number;
  error_message: string | null;
  created_at: Date;
  updated_at: Date;
};

function toNumber(value: number | string | bigint | null | undefined) {
  return Number(value || 0);
}

function countValue(rows: CountRow[]) {
  return toNumber(rows[0]?.count);
}

function siteLabel(siteId: string | null | undefined) {
  return siteId || 'No site';
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value);
}

function HealthBadge({ ok }: { ok: boolean }) {
  return (
    <Badge
      variant={ok ? 'secondary' : 'destructive'}
      className={cn(
        'gap-1',
        ok
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      )}
    >
      {ok ? (
        <CheckCircle2Icon className="size-3" />
      ) : (
        <AlertTriangleIcon className="size-3" />
      )}
      {ok ? 'Healthy' : 'Needs attention'}
    </Badge>
  );
}

function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <p className="mt-1 text-muted-foreground text-xs">{detail}</p>
      </CardContent>
    </Card>
  );
}

export default async function AdminHealthPage() {
  const db = await getDb();

  const [
    nullPaymentRows,
    nullUserCreditRows,
    nullCreditTransactionRows,
    nullTaskRows,
    crossSiteRows,
    orphanUsageRows,
    usersBySite,
    tasksBySite,
    creditsBySite,
    paymentsBySite,
    recoverableTasks,
    recentFailures,
  ] = await Promise.all([
    db.execute(sql`select count(*) from payment where site_id is null`),
    db.execute(sql`select count(*) from user_credit where site_id is null`),
    db.execute(
      sql`select count(*) from credit_transaction where site_id is null`
    ),
    db.execute(sql`select count(*) from wav2lip_task where site_id is null`),
    db.execute(sql`
      select count(*) as count
      from wav2lip_task t
      join credit_transaction c
        on c.user_id = t.user_id
       and c.type = 'USAGE'
       and c.amount = -t.credits_used
       and c.created_at between t.created_at - interval '2 minutes'
                        and t.created_at + interval '2 minutes'
      where t.site_id is not null
        and c.site_id is not null
        and t.site_id <> c.site_id
    `),
    db.execute(sql`
      select count(*) as count
      from credit_transaction c
      where c.type = 'USAGE'
        and c.description ilike '%Lip Sync AI generation%'
        and not exists (
          select 1
          from wav2lip_task t
          where t.user_id = c.user_id
            and t.site_id = c.site_id
            and t.credits_used = abs(c.amount)
            and t.created_at between c.created_at - interval '2 minutes'
                             and c.created_at + interval '2 minutes'
        )
    `),
    db.execute(sql`
      select
        coalesce(first_site_id, 'unknown') as site_id,
        count(*)::int as total_users,
        count(*) filter (where created_at >= now() - interval '24 hours')::int as users_24h
      from "user"
      group by coalesce(first_site_id, 'unknown')
      order by total_users desc
    `),
    db.execute(sql`
      select
        coalesce(site_id, 'unknown') as site_id,
        count(*)::int as total_tasks,
        count(*) filter (where created_at >= now() - interval '24 hours')::int as tasks_24h,
        count(*) filter (where status = 'succeeded')::int as succeeded_tasks,
        count(*) filter (where status = 'failed')::int as failed_tasks,
        count(*) filter (where status in ('pending', 'running', 'unknown'))::int as running_tasks
      from wav2lip_task
      group by coalesce(site_id, 'unknown')
      order by total_tasks desc
    `),
    db.execute(sql`
      select
        coalesce(site_id, 'unknown') as site_id,
        coalesce(sum(current_credits), 0)::int as total_credits
      from user_credit
      group by coalesce(site_id, 'unknown')
      order by total_credits desc
    `),
    db.execute(sql`
      select
        coalesce(site_id, 'unknown') as site_id,
        count(*) filter (where paid = true)::int as paid_payments,
        coalesce(sum(amount) filter (where paid = true), 0)::int as paid_revenue_cents
      from payment
      group by coalesce(site_id, 'unknown')
      order by paid_revenue_cents desc
    `),
    db.execute(sql`
      select site_id, status, count(*)::int as count
      from wav2lip_task
      where status in ('pending', 'running', 'unknown')
      group by site_id, status
      order by site_id, status
    `),
    db.execute(sql`
      select
        t.site_id,
        t.status,
        t.provider_task_id,
        u.email,
        t.credits_used,
        t.error_message,
        t.created_at,
        t.updated_at
      from wav2lip_task t
      left join "user" u on u.id = t.user_id
      where t.status = 'failed'
      order by t.updated_at desc
      limit 10
    `),
  ]);

  const nullSiteCounts = {
    payment: countValue(nullPaymentRows as unknown as CountRow[]),
    userCredit: countValue(nullUserCreditRows as unknown as CountRow[]),
    creditTransaction: countValue(
      nullCreditTransactionRows as unknown as CountRow[]
    ),
    wav2lipTask: countValue(nullTaskRows as unknown as CountRow[]),
  };
  const crossSiteTaskUsageMatches = countValue(
    crossSiteRows as unknown as CountRow[]
  );
  const orphanLipSyncUsageTransactions = countValue(
    orphanUsageRows as unknown as CountRow[]
  );
  const issueCount =
    Object.values(nullSiteCounts).reduce((sum, count) => sum + count, 0) +
    crossSiteTaskUsageMatches +
    orphanLipSyncUsageTransactions;
  const isHealthy = issueCount === 0;

  const siteRows = new Map<string, SiteMetricRow>();
  for (const row of usersBySite as unknown as SiteMetricRow[]) {
    siteRows.set(siteLabel(row.site_id), { ...row });
  }
  for (const row of tasksBySite as unknown as SiteMetricRow[]) {
    const key = siteLabel(row.site_id);
    siteRows.set(key, { ...siteRows.get(key), ...row });
  }
  for (const row of creditsBySite as unknown as SiteMetricRow[]) {
    const key = siteLabel(row.site_id);
    siteRows.set(key, { ...siteRows.get(key), ...row });
  }
  for (const row of paymentsBySite as unknown as SiteMetricRow[]) {
    const key = siteLabel(row.site_id);
    siteRows.set(key, { ...siteRows.get(key), ...row });
  }

  const totalUsers24h = Array.from(siteRows.values()).reduce(
    (sum, row) => sum + toNumber(row.users_24h),
    0
  );
  const totalTasks24h = Array.from(siteRows.values()).reduce(
    (sum, row) => sum + toNumber(row.tasks_24h),
    0
  );
  const totalRecoverable = (
    recoverableTasks as unknown as RecoverableTaskRow[]
  ).reduce((sum, row) => sum + toNumber(row.count), 0);
  const totalPaidRevenueCents = Array.from(siteRows.values()).reduce(
    (sum, row) => sum + toNumber(row.paid_revenue_cents),
    0
  );

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-semibold text-primary text-xs uppercase tracking-wide">
            SaaS Operations
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Site Health
          </h1>
          <p className="mt-2 max-w-3xl text-muted-foreground text-sm">
            Monitor tenant isolation, recent signups, generation activity,
            credits, payments, and stuck Lip Sync AI tasks.
          </p>
        </div>
        <HealthBadge ok={isHealthy} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Health issues"
          value={issueCount}
          detail="Null site, cross-site, and orphan usage checks"
          icon={HeartPulseIcon}
        />
        <MetricCard
          title="New users"
          value={totalUsers24h}
          detail="Registered in the last 24 hours"
          icon={UserRoundPlusIcon}
        />
        <MetricCard
          title="Tasks"
          value={totalTasks24h}
          detail="Created in the last 24 hours"
          icon={VideoIcon}
        />
        <MetricCard
          title="Recoverable"
          value={totalRecoverable}
          detail="Pending, running, or unknown provider tasks"
          icon={Clock3Icon}
        />
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Tenant Isolation Checks</CardTitle>
          <CardDescription>
            These should stay at zero after the site_id isolation changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Payment null site_id', nullSiteCounts.payment],
            ['User credit null site_id', nullSiteCounts.userCredit],
            [
              'Credit transaction null site_id',
              nullSiteCounts.creditTransaction,
            ],
            ['Task null site_id', nullSiteCounts.wav2lipTask],
            ['Cross-site task/usage matches', crossSiteTaskUsageMatches],
            ['Orphan Lip Sync AI usage', orphanLipSyncUsageTransactions],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between rounded-md border px-3 py-2"
              key={label}
            >
              <span className="text-muted-foreground text-sm">{label}</span>
              <Badge variant={value === 0 ? 'outline' : 'destructive'}>
                {value}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Sites</CardTitle>
          <CardDescription>
            Per-site activity and money signals. Revenue is shown from paid
            payment rows.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Site</th>
                <th className="py-2 pr-4 font-medium">Users</th>
                <th className="py-2 pr-4 font-medium">24h Users</th>
                <th className="py-2 pr-4 font-medium">Tasks</th>
                <th className="py-2 pr-4 font-medium">24h Tasks</th>
                <th className="py-2 pr-4 font-medium">Succeeded</th>
                <th className="py-2 pr-4 font-medium">Failed</th>
                <th className="py-2 pr-4 font-medium">Running</th>
                <th className="py-2 pr-4 font-medium">Credits</th>
                <th className="py-2 pr-4 font-medium">Paid</th>
                <th className="py-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(siteRows.entries()).map(([site, row]) => (
                <tr className="border-b last:border-0" key={site}>
                  <td className="py-3 pr-4 font-medium">{site}</td>
                  <td className="py-3 pr-4">{toNumber(row.total_users)}</td>
                  <td className="py-3 pr-4">{toNumber(row.users_24h)}</td>
                  <td className="py-3 pr-4">{toNumber(row.total_tasks)}</td>
                  <td className="py-3 pr-4">{toNumber(row.tasks_24h)}</td>
                  <td className="py-3 pr-4">{toNumber(row.succeeded_tasks)}</td>
                  <td className="py-3 pr-4">{toNumber(row.failed_tasks)}</td>
                  <td className="py-3 pr-4">{toNumber(row.running_tasks)}</td>
                  <td className="py-3 pr-4">{toNumber(row.total_credits)}</td>
                  <td className="py-3 pr-4">{toNumber(row.paid_payments)}</td>
                  <td className="py-3">
                    ${(toNumber(row.paid_revenue_cents) / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HistoryIcon className="size-4 text-primary" />
              Recoverable Tasks
            </CardTitle>
            <CardDescription>
              The GitHub recovery workflow checks these every 10 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(recoverableTasks as unknown as RecoverableTaskRow[]).length ===
            0 ? (
              <div className="rounded-md border border-dashed p-4 text-muted-foreground text-sm">
                No pending, running, or unknown tasks.
              </div>
            ) : (
              <div className="space-y-2">
                {(recoverableTasks as unknown as RecoverableTaskRow[]).map(
                  (row) => (
                    <div
                      className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                      key={`${row.site_id}-${row.status}`}
                    >
                      <span>
                        {siteLabel(row.site_id)} / {row.status}
                      </span>
                      <Badge variant="outline">{toNumber(row.count)}</Badge>
                    </div>
                  )
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseIcon className="size-4 text-primary" />
              Recent Failed Tasks
            </CardTitle>
            <CardDescription>
              Latest provider failures, useful for spotting prompt, upload, or
              face detection problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(recentFailures as unknown as RecentTaskRow[]).length === 0 ? (
              <div className="rounded-md border border-dashed p-4 text-muted-foreground text-sm">
                No failed tasks found.
              </div>
            ) : (
              <div className="space-y-3">
                {(recentFailures as unknown as RecentTaskRow[]).map((task) => (
                  <div
                    className="rounded-md border p-3 text-sm"
                    key={task.provider_task_id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium">
                        {siteLabel(task.site_id)}
                      </div>
                      <Badge variant="destructive">{task.status}</Badge>
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      {task.email || 'Unknown user'} · {task.credits_used}{' '}
                      credits · {formatDate(task.updated_at)}
                    </div>
                    <div className="mt-2 break-words text-xs">
                      {task.error_message || task.provider_task_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon className="size-4 text-primary" />
            Billing Signal
          </CardTitle>
          <CardDescription>
            Total paid revenue across all sites is currently $
            {(totalPaidRevenueCents / 100).toFixed(2)}.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
