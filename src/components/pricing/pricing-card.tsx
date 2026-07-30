'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useMounted } from '@/hooks/use-mounted';
import { useLocalePathname } from '@/i18n/navigation';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import {
  type PaymentType,
  PaymentTypes,
  type PlanInterval,
  PlanIntervals,
  type Price,
  type PricePlan,
} from '@/payment/types';
import { CheckCircleIcon, XCircleIcon, ZapIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LoginWrapper } from '../auth/login-wrapper';
import { Badge } from '../ui/badge';
import { CheckoutButton } from './create-checkout-button';

interface PricingCardProps {
  plan: PricePlan;
  interval?: PlanInterval; // 'month' or 'year'
  paymentType?: PaymentType; // 'subscription' or 'one_time'
  metadata?: Record<string, string>;
  successCallbackUrl?: string;
  cancelCallbackUrl?: string;
  className?: string;
  isCurrentPlan?: boolean;
}

/**
 * Get the appropriate price object for the selected interval and payment type
 * @param plan The price plan
 * @param interval The selected interval (month or year)
 * @param paymentType The payment type (SUBSCRIPTION or one_time)
 * @returns The price object or undefined if not found
 */
function getPriceForPlan(
  plan: PricePlan,
  interval?: PlanInterval,
  paymentType?: PaymentType
): Price | undefined {
  if (plan.isFree) {
    // Free plan has no price
    return undefined;
  }

  // non-free plans must have a price
  return plan.prices.find((price) => {
    if (paymentType === PaymentTypes.ONE_TIME) {
      return price.type === PaymentTypes.ONE_TIME;
    }
    return (
      price.type === PaymentTypes.SUBSCRIPTION && price.interval === interval
    );
  });
}

/**
 * Pricing Card Component
 *
 * Displays a single pricing plan with features and action button
 */
export function PricingCard({
  plan,
  interval,
  paymentType,
  metadata,
  successCallbackUrl,
  cancelCallbackUrl,
  className,
  isCurrentPlan = false,
}: PricingCardProps) {
  const t = useTranslations('PricingPage.PricingCard');
  const price = getPriceForPlan(plan, interval, paymentType);
  const currentUser = useCurrentUser();
  const currentPath = useLocalePathname();
  const mounted = useMounted();
  // console.log('pricing card, currentPath', currentPath);

  // generate formatted price and price label
  let formattedPrice = '';
  let priceLabel = '';
  let billingNote = '';
  if (plan.isFree) {
    formattedPrice = t('freePrice');
  } else if (price && price.amount > 0) {
    // price is available
    if (interval === PlanIntervals.MONTH) {
      formattedPrice = formatPrice(price.amount, price.currency);
      priceLabel = t('perMonth');
    } else if (interval === PlanIntervals.YEAR) {
      formattedPrice = formatPrice(price.amount / 12, price.currency);
      priceLabel = t('perMonth');
      billingNote = t('billedAnnually', {
        amount: formatPrice(price.amount, price.currency, {
          minimumFractionDigits: 2,
        }),
      });
    } else {
      formattedPrice = formatPrice(price.amount, price.currency);
    }
  } else {
    formattedPrice = t('notAvailable');
  }

  // check if plan is not free and has a price
  const isPaidPlan = !plan.isFree && !!price;
  // check if plan has a trial period, period is greater than 0
  const hasTrialPeriod = price?.trialPeriodDays && price.trialPeriodDays > 0;

  return (
    <Card
      className={cn(
        'flex flex-col h-full bg-white/85 dark:bg-black/40 border-black/5 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-zinc-200/40 dark:shadow-none',
        plan.popular &&
          'border-primary ring-1 ring-primary shadow-xl shadow-primary/15 relative',
        isCurrentPlan && 'border-blue-500 shadow-lg shadow-blue-900/30',
        className
      )}
    >
      {/* show popular badge if plan is recommended */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground font-semibold px-3 py-0.5 border border-primary/20 shadow-md shadow-primary/30"
          >
            {t('popular')}
          </Badge>
        </div>
      )}

      {/* show current plan badge if plan is current plan */}
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge
            variant="default"
            className="bg-blue-950 text-blue-300 border-blue-800 font-semibold px-3 py-0.5"
          >
            {t('currentPlan')}
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{plan.name}</h3>
          {plan.credits?.enable && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-extrabold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/20">
              <ZapIcon className="size-3 fill-amber-500 text-amber-500" />
              <span>{plan.credits.amount} Credits</span>
            </span>
          )}
        </CardTitle>

        {/* show price and price label */}
        <div className="flex items-baseline gap-2">
          <span className="my-3 block text-4xl font-extrabold">
            {formattedPrice}
          </span>
          {priceLabel && (
            <span className="text-xl text-zinc-500 font-medium">
              {priceLabel}
            </span>
          )}
        </div>
        {billingNote && (
          <p className="-mt-2 mb-2 text-xs text-muted-foreground">
            {billingNote}
          </p>
        )}

        {/* Credit-to-Second Value Ratio Line */}
        {plan.credits?.enable && (
          <div className="mb-3 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
            ⚡ ~{Math.round((plan.credits.amount / 10) * 10)}s HD Video Dubbing
            ({Math.round(plan.credits.amount / 20)} AI Videos)
          </div>
        )}

        <CardDescription>
          <p className="text-sm">{plan.description}</p>
        </CardDescription>

        {/* show action buttons based on plans */}
        {plan.isFree ? (
          mounted && currentUser ? (
            <Button variant="outline" className="mt-4 w-full disabled">
              {t('getStartedForFree')}
            </Button>
          ) : (
            <LoginWrapper mode="modal" asChild callbackUrl={currentPath}>
              <Button variant="outline" className="mt-4 w-full cursor-pointer">
                {t('getStartedForFree')}
              </Button>
            </LoginWrapper>
          )
        ) : isCurrentPlan ? (
          <Button
            disabled
            className="mt-4 w-full bg-blue-100 dark:bg-blue-800
          text-blue-700 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-800 border border-blue-200 dark:border-blue-700"
          >
            {t('yourCurrentPlan')}
          </Button>
        ) : isPaidPlan ? (
          mounted && currentUser ? (
            <CheckoutButton
              userId={currentUser.id}
              planId={plan.id}
              priceId={price.priceId}
              metadata={metadata}
              successCallbackUrl={successCallbackUrl}
              cancelCallbackUrl={cancelCallbackUrl}
              className="mt-4 w-full cursor-pointer"
            >
              {plan.isLifetime ? t('getLifetimeAccess') : t('getStarted')}
            </CheckoutButton>
          ) : (
            <LoginWrapper mode="modal" asChild callbackUrl={currentPath}>
              <Button variant="default" className="mt-4 w-full cursor-pointer">
                {t('getStarted')}
              </Button>
            </LoginWrapper>
          )
        ) : (
          <Button disabled className="mt-4 w-full">
            {t('notAvailable')}
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <hr className="border-dashed" />

        {/* show trial period if it exists */}
        {hasTrialPeriod && (
          <div className="my-4">
            <span
              className="inline-block px-2.5 py-1.5 text-xs font-medium rounded-md
            bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 shadow-sm"
            >
              {t('daysTrial', { days: price.trialPeriodDays as number })}
            </span>
          </div>
        )}

        {/* show features of this plan */}
        <ul className="list-outside space-y-3.5 text-sm">
          {plan.features?.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-foreground/90">
              <CheckCircleIcon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* show limits of this plan */}
        <ul className="list-outside space-y-3.5 text-sm">
          {plan.limits?.map((limit, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-muted-foreground/65"
            >
              <XCircleIcon className="size-4 text-black/20 dark:text-white/20 shrink-0 mt-0.5" />
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
