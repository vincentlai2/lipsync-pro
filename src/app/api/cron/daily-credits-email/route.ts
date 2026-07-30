import { getDb } from '@/db';
import { user, userCredit } from '@/db/schema';
import { sendEmail } from '@/mail';
import { eq, gte, and, lt, or, isNull } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Authentication middleware for Cron
function validateAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') !== null;
  const cronSecret = process.env.CRON_SECRET;

  if (isVercelCron) {
    return true;
  }

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  if (authHeader?.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8'
    );
    const [username, password] = credentials.split(':');

    const expectedUsername = process.env.CRON_JOBS_USERNAME;
    const expectedPassword = process.env.CRON_JOBS_PASSWORD;

    if (expectedUsername && expectedPassword) {
      return username === expectedUsername && password === expectedPassword;
    }
  }

  return process.env.NODE_ENV === 'development';
}

/**
 * Cron Endpoint: Send gradient retention emails (Max 2 per user lifetime).
 * Email 1: 24h after registration/inactivity
 * Email 2: 5 days after Email 1
 */
export async function GET(request: Request) {
  if (!validateAuth(request)) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  let sentCount = 0;
  let errorCount = 0;

  try {
    const db = await getDb();
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    // Eligible users:
    // 1. Credit >= 20, not banned
    // 2. retentionEmailCount < 2
    // 3. User created > 24h ago
    // 4. Either (retentionEmailCount == 0 AND user created > 24h ago) OR (retentionEmailCount == 1 AND lastRetentionEmailAt < 5 days ago)
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
          gte(userCredit.currentCredits, 20),
          eq(user.banned, false),
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
          locale: 'fr',
          context: {
            userName: u.userName || 'Créateur',
            creditsAmount: 20,
          },
        });

        if (success) {
          sentCount++;
          // Update retention email counter & timestamp in DB
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
      message: `Daily credits email dispatch completed. Sent: ${sentCount}, Errors: ${errorCount}`,
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
