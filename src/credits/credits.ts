import { randomUUID } from 'crypto';
import { websiteConfig } from '@/config/website';
import { getDb } from '@/db';
import { creditTransaction, userCredit } from '@/db/schema';
import { findPlanByPlanId, findPlanByPriceId } from '@/lib/price-plan';
import { addDays, isAfter } from 'date-fns';
import { and, asc, eq, gt, isNull, not, or, sql } from 'drizzle-orm';
import { CREDIT_TRANSACTION_TYPE } from './types';

const DEFAULT_SITE_ID = 'lipsync.pro';

/**
 * Get user's current credit balance
 * @param userId - User ID
 * @returns User's current credit balance
 */
export async function getUserCredits(
  userId: string,
  siteId = DEFAULT_SITE_ID
): Promise<number> {
  try {
    const db = await getDb();

    // Optimized query: only select the needed field
    // This can benefit from covering index if we add one later
    const record = await db
      .select({ currentCredits: userCredit.currentCredits })
      .from(userCredit)
      .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)))
      .limit(1);

    if (record[0]) {
      return record[0].currentCredits;
    }

    if (
      websiteConfig.credits.enableCredits &&
      websiteConfig.credits.registerGiftCredits.enable &&
      websiteConfig.credits.registerGiftCredits.amount > 0
    ) {
      await addRegisterGiftCredits(userId, siteId);
      return websiteConfig.credits.registerGiftCredits.amount;
    }

    return 0;
  } catch (error) {
    console.error('getUserCredits, error:', error);
    // Return 0 on error to prevent UI from breaking
    return 0;
  }
}

/**
 * Update user's current credit balance
 * @param userId - User ID
 * @param credits - New credit balance
 */
export async function updateUserCredits(
  userId: string,
  credits: number,
  siteId = DEFAULT_SITE_ID
) {
  try {
    const db = await getDb();
    await db
      .update(userCredit)
      .set({ currentCredits: credits, updatedAt: new Date() })
      .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)));
  } catch (error) {
    console.error('updateUserCredits, error:', error);
  }
}

/**
 * Write a credit transaction record
 * @param params - Credit transaction parameters
 */
export async function saveCreditTransaction({
  userId,
  siteId = DEFAULT_SITE_ID,
  type,
  amount,
  description,
  paymentId,
  expirationDate,
}: {
  userId: string;
  siteId?: string;
  type: string;
  amount: number;
  description: string;
  paymentId?: string;
  expirationDate?: Date;
}) {
  if (!userId || !type || !description) {
    console.error(
      'saveCreditTransaction, invalid params',
      userId,
      type,
      description
    );
    throw new Error('saveCreditTransaction, invalid params');
  }
  if (!Number.isFinite(amount) || amount === 0) {
    console.error('saveCreditTransaction, invalid amount', userId, amount);
    throw new Error('saveCreditTransaction, invalid amount');
  }
  const db = await getDb();
  await db.insert(creditTransaction).values({
    id: randomUUID(),
    userId,
    siteId,
    type,
    amount,
    // remaining amount is the same as amount for earn transactions
    // remaining amount is null for spend transactions
    remainingAmount: amount > 0 ? amount : null,
    description,
    paymentId,
    expirationDate,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

/**
 * Add credits (registration, monthly, purchase, etc.)
 * @param params - Credit creation parameters
 */
export async function addCredits({
  userId,
  siteId = DEFAULT_SITE_ID,
  amount,
  type,
  description,
  paymentId,
  expireDays,
}: {
  userId: string;
  siteId?: string;
  amount: number;
  type: string;
  description: string;
  paymentId?: string;
  expireDays?: number;
}) {
  if (!userId || !type || !description) {
    console.error('addCredits, invalid params', userId, type, description);
    throw new Error('Invalid params');
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    console.error('addCredits, invalid amount', userId, amount);
    throw new Error('Invalid amount');
  }
  if (
    expireDays !== undefined &&
    (!Number.isFinite(expireDays) || expireDays <= 0)
  ) {
    console.error('addCredits, invalid expire days', userId, expireDays);
    throw new Error('Invalid expire days');
  }
  // Update user credit balance
  const db = await getDb();
  const current = await db
    .select()
    .from(userCredit)
    .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)))
    .limit(1);
  // const newBalance = (current[0]?.currentCredits || 0) + amount;
  if (current.length > 0) {
    const newBalance = (current[0]?.currentCredits || 0) + amount;
    console.log('addCredits, update user credit', userId, newBalance);
    await db
      .update(userCredit)
      .set({
        currentCredits: newBalance,
        updatedAt: new Date(),
      })
      .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)));
  } else {
    const newBalance = amount;
    console.log('addCredits, insert user credit', userId, newBalance);
    await db.insert(userCredit).values({
      id: randomUUID(),
      userId,
      siteId,
      currentCredits: newBalance,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  // Write credit transaction record
  await saveCreditTransaction({
    userId,
    siteId,
    type,
    amount,
    description,
    paymentId,
    expirationDate: expireDays ? addDays(new Date(), expireDays) : undefined,
  });
}

/**
 * Check if user has enough credits
 * @param userId - User ID
 * @param requiredCredits - Required credits
 */
export async function hasEnoughCredits({
  userId,
  siteId = DEFAULT_SITE_ID,
  requiredCredits,
}: {
  userId: string;
  siteId?: string;
  requiredCredits: number;
}) {
  const balance = await getUserCredits(userId, siteId);
  return balance >= requiredCredits;
}

/**
 * Consume credits (FIFO, by expiration)
 * @param params - Credit consumption parameters
 */
export async function consumeCredits({
  userId,
  siteId = DEFAULT_SITE_ID,
  amount,
  description,
}: {
  userId: string;
  siteId?: string;
  amount: number;
  description: string;
}) {
  if (!userId || !description) {
    console.error('consumeCredits, invalid params', userId, description);
    throw new Error('Invalid params');
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    console.error('consumeCredits, invalid amount', userId, amount);
    throw new Error('Invalid amount');
  }
  // Check balance
  if (!(await hasEnoughCredits({ userId, siteId, requiredCredits: amount }))) {
    console.error(
      `consumeCredits, insufficient credits for user ${userId}, required: ${amount}`
    );
    throw new Error('Insufficient credits');
  }
  // FIFO consumption: consume from the earliest unexpired credits first
  const db = await getDb();
  const now = new Date();
  const transactions = await db
    .select()
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.siteId, siteId),
        // Exclude usage and expire records (these are consumption/expiration logs)
        not(eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.USAGE)),
        not(eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.EXPIRE)),
        // Only include transactions with remaining amount > 0
        gt(creditTransaction.remainingAmount, 0),
        // Only include unexpired credits (either no expiration date or not yet expired)
        or(
          isNull(creditTransaction.expirationDate),
          gt(creditTransaction.expirationDate, now)
        )
      )
    )
    .orderBy(
      asc(creditTransaction.expirationDate),
      asc(creditTransaction.createdAt)
    );
  // Consume credits
  let remainingToDeduct = amount;
  for (const transaction of transactions) {
    if (remainingToDeduct <= 0) break;
    const remainingAmount = transaction.remainingAmount || 0;
    if (remainingAmount <= 0) continue;
    // credits to consume at most in this transaction
    const deductFromThis = Math.min(remainingAmount, remainingToDeduct);
    await db
      .update(creditTransaction)
      .set({
        remainingAmount: remainingAmount - deductFromThis,
        updatedAt: new Date(),
      })
      .where(eq(creditTransaction.id, transaction.id));
    remainingToDeduct -= deductFromThis;
  }
  // Update balance
  const current = await db
    .select()
    .from(userCredit)
    .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)))
    .limit(1);
  const newBalance = (current[0]?.currentCredits || 0) - amount;
  await db
    .update(userCredit)
    .set({ currentCredits: newBalance, updatedAt: new Date() })
    .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)));
  // Write usage record
  await saveCreditTransaction({
    userId,
    siteId,
    type: CREDIT_TRANSACTION_TYPE.USAGE,
    amount: -amount,
    description,
  });
}

/**
 * Process expired credits
 * @param userId - User ID
 * @deprecated This function is no longer used, see distribute.ts instead
 */
export async function processExpiredCredits(
  userId: string,
  siteId = DEFAULT_SITE_ID
) {
  const now = new Date();
  // Get all credit transactions that can expire (have expirationDate and not yet processed)
  const db = await getDb();
  const transactions = await db
    .select()
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.siteId, siteId),
        // Exclude usage and expire records (these are consumption/expiration logs)
        not(eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.USAGE)),
        not(eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.EXPIRE)),
        // Only include transactions with expirationDate set
        not(isNull(creditTransaction.expirationDate)),
        // Only include transactions not yet processed for expiration
        isNull(creditTransaction.expirationDateProcessedAt),
        // Only include transactions with remaining amount > 0
        gt(creditTransaction.remainingAmount, 0)
      )
    );
  let expiredTotal = 0;
  // Process expired credit transactions
  for (const transaction of transactions) {
    if (
      transaction.expirationDate &&
      isAfter(now, transaction.expirationDate) &&
      !transaction.expirationDateProcessedAt
    ) {
      const remain = transaction.remainingAmount || 0;
      if (remain > 0) {
        expiredTotal += remain;
        await db
          .update(creditTransaction)
          .set({
            remainingAmount: 0,
            expirationDateProcessedAt: now,
            updatedAt: now,
          })
          .where(eq(creditTransaction.id, transaction.id));
      }
    }
  }
  if (expiredTotal > 0) {
    // Deduct expired credits from balance
    const current = await db
      .select()
      .from(userCredit)
      .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)))
      .limit(1);
    const newBalance = Math.max(
      0,
      (current[0]?.currentCredits || 0) - expiredTotal
    );
    await db
      .update(userCredit)
      .set({ currentCredits: newBalance, updatedAt: now })
      .where(and(eq(userCredit.userId, userId), eq(userCredit.siteId, siteId)));
    // Write expire record
    await saveCreditTransaction({
      userId,
      siteId,
      type: CREDIT_TRANSACTION_TYPE.EXPIRE,
      amount: -expiredTotal,
      description: `Expire credits: ${expiredTotal}`,
    });

    console.log(
      `processExpiredCredits, ${expiredTotal} credits expired for user ${userId}`
    );
  }
}

/**
 * Check if specific type of credits can be added for a user based on transaction history
 * @param userId - User ID
 * @param creditType - Type of credit transaction to check
 */
export async function canAddCreditsByType(
  userId: string,
  creditType: string,
  siteId = DEFAULT_SITE_ID
) {
  const db = await getDb();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Check if user has already received this type of credits this month
  const existingTransaction = await db
    .select()
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.siteId, siteId),
        eq(creditTransaction.type, creditType),
        // Check if transaction was created in the current month and year
        sql`EXTRACT(MONTH FROM ${creditTransaction.createdAt}) = ${currentMonth + 1}`,
        sql`EXTRACT(YEAR FROM ${creditTransaction.createdAt}) = ${currentYear}`
      )
    )
    .limit(1);

  return existingTransaction.length === 0;
}

/**
 * Check if subscription credits can be added for a user based on last refresh time
 * @param userId - User ID
 */

/**
 * Add register gift credits
 * @param userId - User ID
 */
export async function addRegisterGiftCredits(
  userId: string,
  siteId = DEFAULT_SITE_ID
) {
  // Check if user has already received register gift credits
  const db = await getDb();
  const record = await db
    .select()
    .from(creditTransaction)
    .where(
      and(
        eq(creditTransaction.userId, userId),
        eq(creditTransaction.siteId, siteId),
        eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.REGISTER_GIFT)
      )
    )
    .limit(1);

  // add register gift credits if user has not received them yet
  if (record.length === 0) {
    const credits = websiteConfig.credits.registerGiftCredits.amount;
    const expireDays = websiteConfig.credits.registerGiftCredits.expireDays;
    await addCredits({
      userId,
      siteId,
      amount: credits,
      type: CREDIT_TRANSACTION_TYPE.REGISTER_GIFT,
      description: `Register gift credits: ${credits}`,
      expireDays,
    });

    console.log(
      `addRegisterGiftCredits, ${credits} credits for user ${userId}`
    );
  }
}

/**
 * Add free monthly credits
 * @param userId - User ID
 * @param planId - Plan ID
 */
export async function addMonthlyFreeCredits(
  userId: string,
  planId: string,
  siteId = DEFAULT_SITE_ID
) {
  // NOTICE: make sure the free plan is not disabled and has credits enabled
  const pricePlan = findPlanByPlanId(planId);
  if (
    !pricePlan ||
    pricePlan.disabled ||
    !pricePlan.isFree ||
    !pricePlan.credits ||
    !pricePlan.credits.enable
  ) {
    console.log(
      `addMonthlyFreeCredits, no credits configured for plan ${planId}`
    );
    return;
  }

  const canAdd = await canAddCreditsByType(
    userId,
    CREDIT_TRANSACTION_TYPE.MONTHLY_REFRESH,
    siteId
  );
  const now = new Date();

  // add credits if it's a new month
  if (canAdd) {
    const credits = pricePlan.credits?.amount || 0;
    const expireDays = pricePlan.credits?.expireDays || 0;
    await addCredits({
      userId,
      siteId,
      amount: credits,
      type: CREDIT_TRANSACTION_TYPE.MONTHLY_REFRESH,
      description: `Free monthly credits: ${credits} for ${now.getFullYear()}-${now.getMonth() + 1}`,
      expireDays,
    });

    console.log(
      `addMonthlyFreeCredits, ${credits} credits for user ${userId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  } else {
    console.log(
      `addMonthlyFreeCredits, no new month for user ${userId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  }
}

/**
 * Add subscription credits
 * @param userId - User ID
 * @param priceId - Price ID
 */
export async function addSubscriptionCredits(
  userId: string,
  priceId: string,
  siteId = DEFAULT_SITE_ID
) {
  // NOTICE: the price plan maybe disabled, but we still need to add credits for existing users
  const pricePlan = findPlanByPriceId(priceId);
  if (
    !pricePlan ||
    // pricePlan.disabled ||
    !pricePlan.credits ||
    !pricePlan.credits.enable
  ) {
    console.log(
      `addSubscriptionCredits, no credits configured for plan ${priceId}`
    );
    return;
  }

  const canAdd = await canAddCreditsByType(
    userId,
    CREDIT_TRANSACTION_TYPE.SUBSCRIPTION_RENEWAL,
    siteId
  );
  const now = new Date();

  // Add credits if it's a new month
  if (canAdd) {
    const credits = pricePlan.credits.amount;
    const expireDays = pricePlan.credits.expireDays;

    await addCredits({
      userId,
      siteId,
      amount: credits,
      type: CREDIT_TRANSACTION_TYPE.SUBSCRIPTION_RENEWAL,
      description: `Subscription renewal credits: ${credits} for ${now.getFullYear()}-${now.getMonth() + 1}`,
      expireDays,
    });

    console.log(
      `addSubscriptionCredits, ${credits} credits for user ${userId}, priceId: ${priceId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  } else {
    console.log(
      `addSubscriptionCredits, no new month for user ${userId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  }
}

/**
 * Add lifetime monthly credits
 * @param userId - User ID
 * @param priceId - Price ID
 */
export async function addLifetimeMonthlyCredits(
  userId: string,
  priceId: string,
  siteId = DEFAULT_SITE_ID
) {
  // NOTICE: make sure the lifetime plan is not disabled and has credits enabled
  const pricePlan = findPlanByPriceId(priceId);
  if (
    !pricePlan ||
    !pricePlan.isLifetime ||
    pricePlan.disabled ||
    !pricePlan.credits ||
    !pricePlan.credits.enable
  ) {
    console.log(
      `addLifetimeMonthlyCredits, no credits configured for plan ${priceId}`
    );
    return;
  }

  const canAdd = await canAddCreditsByType(
    userId,
    CREDIT_TRANSACTION_TYPE.LIFETIME_MONTHLY,
    siteId
  );
  const now = new Date();

  // Add credits if it's a new month
  if (canAdd) {
    const credits = pricePlan.credits.amount;
    const expireDays = pricePlan.credits.expireDays;

    await addCredits({
      userId,
      siteId,
      amount: credits,
      type: CREDIT_TRANSACTION_TYPE.LIFETIME_MONTHLY,
      description: `Lifetime monthly credits: ${credits} for ${now.getFullYear()}-${now.getMonth() + 1}`,
      expireDays,
    });

    console.log(
      `addLifetimeMonthlyCredits, ${credits} credits for user ${userId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  } else {
    console.log(
      `addLifetimeMonthlyCredits, no new month for user ${userId}, date: ${now.getFullYear()}-${now.getMonth() + 1}`
    );
  }
}

/**
 * Add daily login credits
 *
 * Strategy: Need-based free trial with a hard paywall after N days.
 * - Credits are only granted when the user's balance is below the cost of one
 *   generation (config.amount). If they still have unused credits from a
 *   previous grant, they don't receive new ones — this prevents hoarding and
 *   keeps the free-trial funnel honest.
 * - Each login gives exactly enough credits for 1 video generation.
 * - Credits expire in 1 day (forces daily usage, prevents multi-day hoarding).
 * - After maxLifetimeClaims total claims, stop giving free credits → user must upgrade.
 *
 * @param userId - User ID
 * @returns 'claimed' if credits were given,
 *          'already_claimed_today' if already claimed today,
 *          'sufficient_balance' if the user already has enough credits,
 *          'limit_reached' if lifetime cap is hit,
 *          'disabled' if feature is off
 */
export async function claimDailyLoginCredits(
  userId: string,
  siteId = DEFAULT_SITE_ID
): Promise<
  | 'claimed'
  | 'already_claimed_today'
  | 'sufficient_balance'
  | 'limit_reached'
  | 'disabled'
> {
  try {
    const config = websiteConfig.credits.dailyLoginCredits;

    // Feature gate: bail out if not configured or disabled
    if (!config?.enable) {
      return 'disabled';
    }

    const db = await getDb();
    const now = new Date();

    // ─── 1. Check lifetime claim cap ────────────────────────────────────────
    // Count how many DAILY_LOGIN transactions this user has ever received
    const allClaims = await db
      .select({ id: creditTransaction.id })
      .from(creditTransaction)
      .where(
        and(
          eq(creditTransaction.userId, userId),
          eq(creditTransaction.siteId, siteId),
          eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.DAILY_LOGIN),
          // Only count positive (earning) transactions, not corrections
          gt(creditTransaction.amount, 0)
        )
      );

    if (allClaims.length >= config.maxLifetimeClaims) {
      console.log(
        `claimDailyLoginCredits, lifetime cap reached for user ${userId}: ${allClaims.length}/${config.maxLifetimeClaims}`
      );
      return 'limit_reached';
    }

    // ─── 2. Check if already claimed today ──────────────────────────────────
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const todayClaim = await db
      .select({ id: creditTransaction.id })
      .from(creditTransaction)
      .where(
        and(
          eq(creditTransaction.userId, userId),
          eq(creditTransaction.siteId, siteId),
          eq(creditTransaction.type, CREDIT_TRANSACTION_TYPE.DAILY_LOGIN),
          gt(creditTransaction.createdAt, startOfToday)
        )
      )
      .limit(1);

    if (todayClaim.length > 0) {
      return 'already_claimed_today';
    }

    // ─── 3. Check if balance is already sufficient ───────────────────────────
    // Only grant when the user actually needs credits (balance < 1 task cost).
    // If their previous grant is still sitting unused, skip this login so we
    // don't pile up credits that dilute the upgrade funnel.
    const currentBalance = await getUserCredits(userId, siteId);
    if (currentBalance >= config.amount) {
      console.log(
        `claimDailyLoginCredits, sufficient balance (${currentBalance} >= ${config.amount}) for user ${userId}, skipping`
      );
      return 'sufficient_balance';
    }

    // ─── 4. Grant daily credits ──────────────────────────────────────────────
    await addCredits({
      userId,
      siteId,
      amount: config.amount,
      type: CREDIT_TRANSACTION_TYPE.DAILY_LOGIN,
      description: `Connexion quotidienne: +${config.amount} crédits (jour ${allClaims.length + 1}/${config.maxLifetimeClaims})`,
      expireDays: config.expireDays,
    });

    console.log(
      `claimDailyLoginCredits, granted ${config.amount} credits to user ${userId} (claim ${allClaims.length + 1}/${config.maxLifetimeClaims})`
    );
    return 'claimed';
  } catch (error) {
    console.error('claimDailyLoginCredits, error:', error);
    return 'disabled';
  }
}
