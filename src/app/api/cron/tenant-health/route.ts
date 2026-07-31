import { getDb } from '@/db';
import { validateCronAuth, unauthorizedCronResponse } from '@/lib/cron-auth';
import { type SQL, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CountRow = { count: number | string | bigint };

function countValue(rows: CountRow[]) {
  return Number(rows[0]?.count || 0);
}

async function countQuery(query: SQL) {
  const db = await getDb();
  const rows = (await db.execute(query)) as unknown as CountRow[];
  return countValue(rows);
}

export async function GET(request: Request) {
  if (!validateCronAuth(request)) {
    return unauthorizedCronResponse();
  }

  const db = await getDb();

  const nullSiteCounts = {
    payment: await countQuery(
      sql`select count(*) from payment where site_id is null`
    ),
    userCredit: await countQuery(
      sql`select count(*) from user_credit where site_id is null`
    ),
    creditTransaction: await countQuery(
      sql`select count(*) from credit_transaction where site_id is null`
    ),
    wav2lipTask: await countQuery(
      sql`select count(*) from wav2lip_task where site_id is null`
    ),
  };

  const crossSiteRows = (await db.execute(sql`
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
  `)) as unknown as CountRow[];

  const orphanUsageRows = (await db.execute(sql`
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
  `)) as unknown as CountRow[];

  const recoverableRows = (await db.execute(sql`
    select site_id, status, count(*)::int as count
    from wav2lip_task
    where status in ('pending', 'running', 'unknown')
    group by site_id, status
    order by site_id, status
  `)) as unknown as Array<{
    site_id: string | null;
    status: string;
    count: number;
  }>;

  const issueCount =
    Object.values(nullSiteCounts).reduce((sum, count) => sum + count, 0) +
    countValue(crossSiteRows) +
    countValue(orphanUsageRows);

  return NextResponse.json({
    ok: issueCount === 0,
    checkedAt: new Date().toISOString(),
    issueCount,
    nullSiteCounts,
    crossSiteTaskUsageMatches: countValue(crossSiteRows),
    orphanLipSyncUsageTransactions: countValue(orphanUsageRows),
    recoverableTasks: recoverableRows,
  });
}
