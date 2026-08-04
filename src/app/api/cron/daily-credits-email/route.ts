import { getDb } from '@/db';
import { user, userCredit } from '@/db/schema';
import { validateCronAuth, unauthorizedCronResponse } from '@/lib/cron-auth';
import { getTenantByHost } from '@/lib/tenant';
import { sendEmail } from '@/mail';
import { and, eq, gte, isNull, lt, or } from 'drizzle-orm';
import type { Locale } from 'next-intl';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DAILY_CREDITS_EMAIL_AMOUNT = 20;

function getDailyCreditsEmailContext(request: Request) {
  const url = new URL(request.url);
  const tenant = getTenantByHost(request.headers.get('host'));
  const requestedSiteId = url.searchParams.get('siteId');
  const siteId = requestedSiteId || tenant.siteId;

  if (siteId === 'wav2lipia.com') {
    return {
      siteId,
      locale: 'fr' as Locale,
      fallbackName: 'Createur',
      studioUrl: 'https://wav2lipia.com/wav2lip-en-ligne',
      from: 'Wav2Lip IA <hi@wav2lipia.com>',
    };
  }

  return {
    siteId: 'lipsync.pro',
    locale: 'en' as Locale,
    fallbackName: 'Creator',
    studioUrl: 'https://lipsync.pro/lip-sync-ai',
    from: 'LipSync.pro <hi@lipsync.pro>',
  };
}

/**
 * Cron Endpoint: Send gradient retention emails (Max 2 per site credit row).
 * Email 1: 24h after registration/inactivity
 * Email 2: 5 days after Email 1
 */
export async function GET(request: Request) {
  if (!validateCronAuth(request)) {
    return unauthorizedCronResponse();
  }

  let sentCount = 0;
  let errorCount = 0;

  try {
    const db = await getDb();
    const emailContext = getDailyCreditsEmailContext(request);
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const eligibleUsers = await db
      .select({
        userId: userCredit.userId,
        creditId: userCredit.id,
        userName: user.name,
        email: user.email,
        currentCredits: userCredit.currentCredits,
        retentionEmailCount: userCredit.retentionEmailCount,
        lastRetentionEmailAt: userCredit.lastRetentionEmailAt,
        createdAt: user.createdAt,
      })
      .from(userCredit)
      .innerJoin(user, eq(userCredit.userId, user.id))
      .where(
        and(
          eq(userCredit.siteId, emailContext.siteId),
          gte(userCredit.currentCredits, DAILY_CREDITS_EMAIL_AMOUNT),
          or(eq(user.banned, false), isNull(user.banned)),
          lt(userCredit.retentionEmailCount, 2),
          lt(user.createdAt, twentyFourHoursAgo),
          or(
            eq(userCredit.retentionEmailCount, 0),
            and(
              eq(userCredit.retentionEmailCount, 1),
              lt(userCredit.lastRetentionEmailAt, fiveDaysAgo)
            )
          )
        )
      )
      .limit(50);

    for (const u of eligibleUsers) {
      try {
        const success = await sendEmail({
          template: 'dailyCreditsReminder',
          to: u.email,
          from: emailContext.from,
          locale: emailContext.locale,
          context: {
            userName: u.userName || emailContext.fallbackName,
            creditsAmount: DAILY_CREDITS_EMAIL_AMOUNT,
            studioUrl: emailContext.studioUrl,
          },
        });

        if (success) {
          sentCount++;
          await db
            .update(userCredit)
            .set({
              retentionEmailCount: (u.retentionEmailCount || 0) + 1,
              lastRetentionEmailAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(userCredit.id, u.creditId));
        } else {
          errorCount++;
        }
      } catch (err) {
        console.error(
          `Failed to send daily credit email to user ${u.userId}:`,
          err
        );
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily credits email dispatch completed for ${emailContext.siteId}. Sent: ${sentCount}, Errors: ${errorCount}`,
      siteId: emailContext.siteId,
      locale: emailContext.locale,
      sentCount,
      errorCount,
    });
  } catch (error) {
    console.error('Error executing daily-credits-email cron job:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during email dispatch' },
      { status: 500 }
    );
  }
}
