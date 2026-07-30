'use server';

import { getDb } from '@/db';
import { payment } from '@/db/schema';
import { userActionClient } from '@/lib/safe-action';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { findPlanByPriceId } from '@/lib/price-plan';
import { websiteConfig } from '@/config/website';

const checkPaymentCompletionSchema = z.object({
  sessionId: z.string(),
});

function getPriceDetailsByPriceId(priceId: string) {
  // 1. Search in subscription plans
  const plan = findPlanByPriceId(priceId);
  if (plan) {
    const price = plan.prices.find((p) => p.priceId === priceId);
    if (price) {
      return {
        amount: price.amount,
        currency: price.currency || 'EUR',
        planId: plan.id,
      };
    }
  }

  // 2. Search in credit packages
  const creditPackages = Object.values(websiteConfig.credits.packages);
  const pkg = creditPackages.find((p) => p.price.priceId === priceId);
  if (pkg) {
    return {
      amount: pkg.price.amount,
      currency: pkg.price.currency || 'EUR',
      planId: `credits_${pkg.id}`,
    };
  }

  return {
    amount: 0,
    currency: 'EUR',
    planId: 'unknown',
  };
}

/**
 * Check if a payment is completed for the given session ID
 */
export const checkPaymentCompletionAction = userActionClient
  .schema(checkPaymentCompletionSchema)
  .action(async ({ parsedInput: { sessionId } }) => {
    try {
      const db = await getDb();
      const paymentRecord = await db
        .select()
        .from(payment)
        .where(eq(payment.sessionId, sessionId))
        .limit(1);

      const paymentData = paymentRecord[0] || null;
      const isPaid = paymentData ? paymentData.paid : false;
      console.log('Check payment completion, isPaid:', isPaid);

      if (isPaid && paymentData) {
        const details = getPriceDetailsByPriceId(paymentData.priceId);
        return {
          success: true,
          isPaid,
          amount: details.amount,
          currency: details.currency,
          planId: details.planId,
          priceId: paymentData.priceId,
        };
      }

      return {
        success: true,
        isPaid,
        amount: 0,
        currency: 'EUR',
        planId: '',
        priceId: '',
      };
    } catch (error) {
      console.error('Check payment completion error:', error);
      return {
        success: false,
        error: 'Failed to check payment completion',
      };
    }
  });
