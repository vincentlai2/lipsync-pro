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

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main className="border-t bg-background">
      <section className="border-b bg-zinc-50 dark:bg-zinc-950/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_0.72fr] md:items-end md:py-20">
          <div>
            <p className="font-medium text-primary text-sm">
              Lip Sync AI Guides
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white md:text-5xl">
              Practical guides for AI lip sync video workflows
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              Learn how to create, localize, update, and compare talking-video
              workflows without turning the site into a model-specific technical
              glossary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink
                href={Routes.LipSyncAI}
                className="inline-flex h-10 items-center rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm hover:bg-primary/90"
              >
                Try Lip Sync AI
                <ArrowRightIcon className="ml-2 size-4" />
              </LocaleLink>
              <LocaleLink
                href={Routes.Wav2LipHowTo}
                className="inline-flex h-10 items-center rounded-md border border-border px-4 font-medium text-sm hover:bg-muted"
              >
                Start with the workflow guide
              </LocaleLink>
            </div>
          </div>

          <div className="rounded-md border border-border/70 bg-background p-5">
            <div className="flex items-start gap-3">
              <BookOpenTextIcon className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold text-base text-zinc-950 dark:text-white">
                  Content strategy
                </h2>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  LipSync.pro should rank through workflow, use case, and
                  conversion-intent content while keeping the actual tool easy
                  to reach from every guide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide, index) => (
              <GuideLink key={guide.href} guide={guide} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-zinc-50 dark:bg-zinc-950/20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-3 md:py-18">
          {[
            {
              icon: MonitorPlayIcon,
              title: 'Creators',
              text: 'Make short clips, explainers, avatar videos, and campaign variants faster.',
            },
            {
              icon: LanguagesIcon,
              title: 'Localization teams',
              text: 'Translate and update presenter-led videos without reshooting every language.',
            },
            {
              icon: WorkflowIcon,
              title: 'SaaS operators',
              text: 'Use credits, billing, history, and auth as a reusable AI product base.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-md border bg-background p-6"
              >
                <Icon className="size-5 text-primary" />
                <h2 className="mt-4 font-semibold">{item.title}</h2>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
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
