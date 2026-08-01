import { LocaleLink } from '@/i18n/navigation';
import { LOCALES } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  ClapperboardIcon,
  CompassIcon,
  HelpCircleIcon,
  LanguagesIcon,
  MonitorPlayIcon,
  SparklesIcon,
  WorkflowIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type TopicPillarCard = {
  title: string;
  badge: string;
  description: string;
  pillarHref: string;
  links: { label: string; href: string }[];
  icon: any;
};

const pillarHubs: TopicPillarCard[] = [
  {
    title: 'AI Lip Sync',
    badge: 'Video Synchronization',
    description:
      'Match visible speech in source videos with localized audio, narration, and translated dialogue tracks.',
    pillarHref: '/lip-sync-ai',
    icon: SparklesIcon,
    links: [
      { label: 'What is AI Lip Sync?', href: '/lip-sync-ai/what-is' },
      {
        label: 'How to Create Lip Sync Videos',
        href: '/lip-sync-ai/how-to-use',
      },
      { label: 'Free AI Lip Sync Generator', href: '/lip-sync-ai/free' },
      {
        label: 'AI Lip Sync vs Traditional Dubbing',
        href: '/lip-sync-ai/vs-traditional-dubbing',
      },
      {
        label: 'Industry Use Cases & Applications',
        href: '/lip-sync-ai/applications',
      },
    ],
  },
  {
    title: 'Text to Lip Sync',
    badge: 'Script to Video',
    description:
      'Convert written scripts into natural speaking avatars with automated neural text-to-speech alignment.',
    pillarHref: '/text-to-lip-sync',
    icon: ClapperboardIcon,
    links: [
      { label: 'What is Text to Lip Sync?', href: '/text-to-lip-sync/what-is' },
      {
        label: 'How to Convert Text to Video',
        href: '/text-to-lip-sync/how-to-use',
      },
      { label: 'Free Text to Lip Sync Trial', href: '/text-to-lip-sync/free' },
      {
        label: 'Multilingual Voice Examples',
        href: '/text-to-lip-sync/examples',
      },
    ],
  },
  {
    title: 'Photo to Lip Sync',
    badge: 'Talking Portrait Avatar',
    description:
      'Animate 2D portrait images into expressive 3D talking avatars powered by vocal audio files.',
    pillarHref: '/photo-to-lip-sync',
    icon: MonitorPlayIcon,
    links: [
      {
        label: 'What is Photo to Lip Sync?',
        href: '/photo-to-lip-sync/what-is',
      },
      {
        label: 'How to Animate Still Photos',
        href: '/photo-to-lip-sync/how-to-use',
      },
      { label: 'Free Photo Generator Online', href: '/photo-to-lip-sync/free' },
      {
        label: 'Avatar Showcase & Examples',
        href: '/photo-to-lip-sync/examples',
      },
    ],
  },
];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'LipSync.pro Learn Hub | AI Lip Sync Academy & Topic Clusters',
    description:
      'Explore deep-dive guides, workflow tutorials, and neural AI video synchronization principles at LipSync.pro Learn Academy.',
    locale,
    pathname: '/learn',
  });
}

export default async function LearnHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="border-t bg-background">
      {/* Hero Section */}
      <section className="border-b bg-zinc-50 dark:bg-zinc-950/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <CompassIcon className="size-4" />
            <span>LIPSYNC.PRO LEARN ACADEMY</span>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            AI Video Synchronization & Localization Hub
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Master the art of AI lip-syncing, text-driven video generation, and
            photo avatar animation. Explore structured topic clusters and
            step-by-step creator guides.
          </p>
        </div>
      </section>

      {/* 3 Pillars & Clusters Grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured Learning Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Select a feature category to master step-by-step guides,
              definitions, and tutorials.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {pillarHubs.map((hub) => {
              const Icon = hub.icon;
              return (
                <div
                  key={hub.title}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-blue-500/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                        {hub.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground">
                      {hub.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {hub.description}
                    </p>

                    <div className="my-6 border-t border-border/60" />

                    <ul className="space-y-2.5 text-sm">
                      {hub.links.map((link) => (
                        <li key={link.href}>
                          <LocaleLink
                            href={link.href as any}
                            className="group flex items-center justify-between text-muted-foreground hover:text-foreground font-medium transition-colors"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {link.label}
                            </span>
                            <ArrowRightIcon className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/40">
                    <LocaleLink
                      href={hub.pillarHref as any}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                    >
                      Explore {hub.title}
                      <ArrowRightIcon className="ml-2 size-4" />
                    </LocaleLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
