import { defaultMessages } from '@/i18n/messages';
import { routing } from '@/i18n/routing';
import EmailLayout from '@/mail/components/email-layout';
import type { BaseEmailProps } from '@/mail/types';
import { Button, Heading, Section, Text } from '@react-email/components';
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
      <Heading className="text-xl font-bold text-zinc-900 dark:text-white">
        {t('title', { name: userName })}
      </Heading>
      <Text className="text-base text-zinc-700 dark:text-zinc-300 my-4 leading-relaxed">
        {t('body', { amount: creditsAmount })}
      </Text>
      <Section className="my-6 text-center">
        <Button
          href={studioUrl}
          className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm shadow-md inline-block"
        >
          {t('ctaButton')}
        </Button>
      </Section>
      <Text className="text-xs text-muted-foreground mt-4 italic border-t border-zinc-200 dark:border-zinc-800 pt-4">
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
