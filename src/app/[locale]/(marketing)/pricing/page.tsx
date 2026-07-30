import FaqSection from '@/components/blocks/faqs/faqs';
import Container from '@/components/layout/container';
import { OneTimeCreditPacks } from '@/components/pricing/one-time-credit-packs';
import { PricingTable } from '@/components/pricing/pricing-table';
import { constructMetadata } from '@/lib/metadata';
import { BadgeCheckIcon } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Pricing & Credit Plans | LipSync.pro',
    description:
      'Simple, transparent credit plans for AI lip sync video generation. Start free with 20 credits, upgrade anytime.',
    locale,
    pathname: '/pricing',
  });
}

export default async function PricingPage() {
  return (
    <Container className="my-10 max-w-6xl px-4 flex flex-col gap-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 font-medium text-blue-600 dark:text-blue-400 text-xs">
          <BadgeCheckIcon className="size-4" />
          Transparent Credit Pricing
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-5xl">
          Flexible Plans for Every Creator
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Start for free with 20 credits upon signup. Choose a monthly
          subscription or purchase pay-as-you-go credit top-ups with no
          commitment.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white">
            Monthly & Annual Subscriptions
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            Best value for recurring creators with monthly credit refreshes
          </p>
        </div>
        <PricingTable />
      </div>

      {/* One-Time Credit Top-Up Packs */}
      <OneTimeCreditPacks />

      <FaqSection />
    </Container>
  );
}
