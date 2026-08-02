import { defaultMessages } from '@/i18n/messages';
import { routing } from '@/i18n/routing';
import EmailButton from '@/mail/components/email-button';
import EmailLayout from '@/mail/components/email-layout';
import type { BaseEmailProps } from '@/mail/types';
import { Heading, Section, Text } from '@react-email/components';
import { createTranslator } from 'use-intl/core';

interface DailyCreditsReminderProps extends BaseEmailProps {
  userName?: string;
  creditsAmount?: number;
}

export default function DailyCreditsReminder({
  locale,
  messages,
  userName = 'Creator',
  creditsAmount = 20,
}: DailyCreditsReminderProps) {
  const t = createTranslator({
    locale,
    messages,
    namespace: 'Mail.dailyCreditsReminder',
  });

  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? 'https://lipsync.pro';
  const studioUrl =
    locale === routing.defaultLocale
      ? `${baseUrl}/lip-sync-ai`
      : `${baseUrl}/${locale}/lip-sync-ai`;

  return (
    <EmailLayout locale={locale} messages={messages}>
      <Heading className="text-xl font-bold text-zinc-900">
        {t('title', { name: userName })}
      </Heading>
      <Text className="my-4 text-base text-zinc-700 leading-relaxed">
        {t('body', { amount: creditsAmount })}
      </Text>
      <Section className="my-6 text-center">
        <EmailButton href={studioUrl}>{t('ctaButton')}</EmailButton>
      </Section>
      <Text className="mt-4 border-zinc-200 border-t pt-4 text-xs text-zinc-500 italic">
        {t('footerNote')}
      </Text>
    </EmailLayout>
  );
}

DailyCreditsReminder.PreviewProps = {
  locale: routing.defaultLocale,
  messages: defaultMessages,
  userName: 'Alex',
  creditsAmount: 20,
};
