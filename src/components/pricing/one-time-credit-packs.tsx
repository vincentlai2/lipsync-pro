'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import { CreditCheckoutButton } from '@/components/settings/credits/credit-checkout-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { websiteConfig } from '@/config/website';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useMounted } from '@/hooks/use-mounted';
import { useLocalePathname } from '@/i18n/navigation';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import {
  CheckCircle2Icon,
  CoinsIcon,
  HelpCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';

export function OneTimeCreditPacks({ className }: { className?: string }) {
  const currentUser = useCurrentUser();
  const mounted = useMounted();
  const currentPath = useLocalePathname();

  const packagesConfig = websiteConfig.credits.packages;
  const packagesList = [
    {
      ...packagesConfig.basic,
      name: 'Starter Pack',
      subtitle: 'Ideal for testing lip sync videos',
      videosCount: 5,
    },
    {
      ...packagesConfig.standard,
      name: 'Popular Pack',
      subtitle: 'Most popular for creators & small teams',
      videosCount: 10,
    },
    {
      ...packagesConfig.premium,
      name: 'Pro Creator Pack',
      subtitle: 'For regular video localization & dubbing',
      videosCount: 25,
    },
    {
      ...packagesConfig.enterprise,
      name: 'Studio Power Pack',
      subtitle: 'Maximum credits value for high volume',
      videosCount: 50,
    },
  ];

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header Info Banner */}
      <div className="rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50/50 to-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-950 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-bold text-amber-600 dark:text-amber-400 text-xs">
              <ZapIcon className="size-3.5 fill-amber-500 text-amber-500" />
              Pay-As-You-Go Credits (No Monthly Subscription Required)
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              One-Time Credit Top-Up Packs
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              Need extra credits without recurring billing? Purchase one-time
              credit top-ups anytime. Purchased credits carry over and never
              expire while your account is active.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 text-center shadow-2xs">
              <span className="block font-black text-zinc-950 dark:text-white text-lg">
                20 Credits
              </span>
              <span className="text-zinc-500 text-xs font-semibold">
                1 AI Lip Sync Video
              </span>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 text-center shadow-2xs">
              <span className="block font-black text-emerald-600 dark:text-emerald-400 text-lg">
                100% Refund
              </span>
              <span className="text-zinc-500 text-xs font-semibold">
                On Failed Tasks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packagesList.map((pkg) => {
          const priceAmount = pkg.price.amount;
          const currency = pkg.price.currency;
          const priceId = pkg.price.priceId;

          return (
            <Card
              key={pkg.id}
              className={cn(
                'relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white text-zinc-950 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                pkg.popular &&
                  'border-zinc-950 ring-2 ring-zinc-950 dark:border-white dark:ring-white shadow-xl'
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-0 right-0 z-10">
                  <span className="rounded-bl-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <CoinsIcon className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="font-extrabold text-lg text-zinc-950 dark:text-white">
                      {pkg.name}
                    </CardTitle>
                    <p className="text-zinc-500 text-xs font-medium">
                      {pkg.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                    {formatPrice(priceAmount, currency)}
                  </span>
                  <span className="text-zinc-500 text-xs font-semibold">
                    one-time
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/60 px-3 py-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-white">
                    <span>{pkg.amount} Credits</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                      ~{pkg.videosCount} Videos
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-5 flex-1 flex flex-col justify-between">
                <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      ~{pkg.videosCount * 10} seconds of HD AI video dubbing
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-600 shrink-0" />
                    <span>Credits never expire while active</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-600 shrink-0" />
                    <span>Access to video and photo lip sync models</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-600 shrink-0" />
                    <span>Instant high-priority rendering</span>
                  </li>
                </ul>

                <div className="pt-2">
                  {mounted && currentUser ? (
                    <CreditCheckoutButton
                      userId={currentUser.id}
                      packageId={pkg.id}
                      priceId={priceId}
                      className="w-full font-bold cursor-pointer rounded-xl"
                      variant={pkg.popular ? 'default' : 'outline'}
                      disabled={!priceId}
                    >
                      Buy {pkg.amount} Credits
                    </CreditCheckoutButton>
                  ) : (
                    <LoginWrapper
                      mode="modal"
                      asChild
                      callbackUrl={currentPath}
                    >
                      <Button
                        className="w-full font-bold cursor-pointer rounded-xl"
                        variant={pkg.popular ? 'default' : 'outline'}
                      >
                        Buy {pkg.amount} Credits
                      </Button>
                    </LoginWrapper>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
