import { LocaleLink } from '@/i18n/navigation';
import { LOCALES } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  LanguagesIcon,
  MonitorPlayIcon,
  WorkflowIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type GuideCard = {
  title: string;
  description: string;
  href: string;
};

const guides: GuideCard[] = [
  {
    title: 'What is AI lip sync?',
    description:
      'Understand the product category, best use cases, and quality limits.',
    href: Routes.Wav2LipWhatIs,
  },
  {
    title: 'How to create lip sync videos',
    description:
      'Prepare a source clip, add voice, run a short test, and export.',
    href: Routes.Wav2LipHowTo,
  },
  {
    title: 'AI lip sync vs traditional dubbing',
    description: 'Compare voice-only dubbing with visual speech alignment.',
    href: Routes.Wav2LipAlternative,
  },
  {
    title: 'Video translation and dubbing',
    description:
      'Plan multilingual video updates with translated scripts and synced faces.',
    href: Routes.Wav2LipColab,
  },
];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Lip Sync AI Guides | LipSync.pro',
    description:
      'Practical Lip Sync AI guides for creators, marketers, educators, and localization teams.',
    locale,
    pathname: '/blog',
  });
}

interface BlogPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

import { redirect } from 'next/navigation';

export default function BlogPage() {
  redirect('/learn');
}

function GuideLink({ guide, index }: { guide: GuideCard; index: number }) {
  return (
    <LocaleLink
      href={guide.href}
      className="group rounded-md border border-border/70 bg-card p-5 transition-colors hover:border-primary/50 hover:bg-primary/[0.03]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 font-medium text-primary text-xs">
            Guide {index + 1}
          </p>
          <h3 className="font-semibold text-base text-zinc-950 dark:text-white group-hover:text-primary">
            {guide.title}
          </h3>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            {guide.description}
          </p>
        </div>
        <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground opacity-60 group-hover:text-primary" />
      </div>
    </LocaleLink>
  );
}
