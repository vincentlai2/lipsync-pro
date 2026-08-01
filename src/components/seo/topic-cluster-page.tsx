'use client';

import Container from '@/components/layout/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  HelpCircleIcon,
  HomeIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';
import {
  EnterpriseWorkflowDiagram,
  MarketBenchmarkDiagram,
  PhotoToAvatarDiagram,
  TextToSpeechPipelineDiagram,
  UseCasesGridDiagram,
  VisemeAlignmentDiagram,
  WorkflowStepsDiagram,
} from './topic-cluster-visuals';

function renderSectionVisual(
  pillarRoute: string,
  pathname?: string,
  idx: number = 0
) {
  const path = (pathname || pillarRoute).toLowerCase();

  if (path.includes('best-ai-lip-sync-tools')) {
    if (idx === 0) return <MarketBenchmarkDiagram />;
    if (idx === 1) return <WorkflowStepsDiagram />;
    return <UseCasesGridDiagram />;
  }
  if (
    path.includes('workflow') ||
    path.includes('localization') ||
    path.includes('dubbing') ||
    path.includes('copyright')
  ) {
    if (idx === 0) return <EnterpriseWorkflowDiagram />;
    if (idx === 1) return <WorkflowStepsDiagram />;
    return <UseCasesGridDiagram />;
  }
  if (path.includes('photo-to-lip-sync')) {
    if (idx === 0) return <PhotoToAvatarDiagram />;
    if (idx === 1) return <WorkflowStepsDiagram />;
    return <UseCasesGridDiagram />;
  }
  if (path.includes('text-to-lip-sync')) {
    if (idx === 0) return <TextToSpeechPipelineDiagram />;
    if (idx === 1) return <WorkflowStepsDiagram />;
    return <UseCasesGridDiagram />;
  }
  // Default Lip Sync AI route
  if (idx === 0) return <VisemeAlignmentDiagram />;
  if (idx === 1) return <WorkflowStepsDiagram />;
  return <UseCasesGridDiagram />;
}

export interface ClusterPageImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ClusterPageContent {
  title: string;
  badge: string;
  description: string;
  pillarTitle: string;
  pillarRoute: string;
  pathname?: string;
  heroImage?: ClusterPageImage;
  sections: {
    heading: string;
    subheading?: string;
    content: string[];
    bulletPoints?: string[];
    image?: ClusterPageImage;
  }[];
  lsiKeywords: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaText?: string;
}

interface RelatedArticleItem {
  title: string;
  href: string;
}

const lipSyncAiArticles: RelatedArticleItem[] = [
  {
    title: 'How to Create AI Lip Sync Videos',
    href: '/lip-sync-ai/how-to-use',
  },
  {
    title: 'Fix Vocal Audio Desync & Viseme Jitter',
    href: '/lip-sync-ai/phoneme-viseme-matching-guide',
  },
  { title: 'What is AI Lip Sync Technology?', href: '/lip-sync-ai/what-is' },
  {
    title: 'AI Lip Sync vs Traditional Dubbing',
    href: '/lip-sync-ai/vs-traditional-dubbing',
  },
  {
    title: 'Top 5 AI Lip Sync Tools Comparison (2026)',
    href: '/learn/best-ai-lip-sync-tools',
  },
  {
    title: 'AI Video Localization & Dubbing Guide',
    href: '/learn/ai-video-localization-guide-2026',
  },
  {
    title: 'Video Re-Dubbing Workflow Optimization',
    href: '/learn/video-re-dubbing-workflow-optimization',
  },
];

const textToLipSyncArticles: RelatedArticleItem[] = [
  {
    title: 'Convert Written Scripts to HD Video',
    href: '/text-to-lip-sync/how-to-use',
  },
  {
    title: 'AI Video Scriptwriting Tips',
    href: '/text-to-lip-sync/script-writing-tips',
  },
  {
    title: 'Choosing Right AI Voice Persona',
    href: '/text-to-lip-sync/voice-selection-guide',
  },
  { title: 'What is Text to Lip Sync?', href: '/text-to-lip-sync/what-is' },
  {
    title: 'Multilingual E-Learning & Voice Dubbing',
    href: '/learn/multilingual-elearning-video-dubbing',
  },
];

const photoToLipSyncArticles: RelatedArticleItem[] = [
  {
    title: 'Animate Photos into Talking Avatars',
    href: '/photo-to-lip-sync/how-to-use',
  },
  {
    title: 'Photo Lighting & Framing Optimization',
    href: '/photo-to-lip-sync/portrait-image-optimization',
  },
  {
    title: 'Build Virtual AI Brand Presenter',
    href: '/photo-to-lip-sync/virtual-avatar-marketing',
  },
  { title: 'What is Photo to Lip Sync?', href: '/photo-to-lip-sync/what-is' },
  {
    title: 'How Faceless YouTube Channels Use AI Avatars',
    href: '/learn/how-faceless-youtube-channels-use-ai-avatars',
  },
  {
    title: 'AI Avatar Commercial Copyright & Ethics',
    href: '/learn/ai-avatar-copyright-ethics-best-practices',
  },
];

function getRelatedArticles(
  pillarRoute: string,
  pathname?: string
): RelatedArticleItem[] {
  const path = (pathname || '').toLowerCase();
  let pool = lipSyncAiArticles;

  if (
    pillarRoute.includes('text-to-lip-sync') ||
    path.includes('text-to-lip-sync') ||
    path.includes('elearning')
  ) {
    pool = textToLipSyncArticles;
  } else if (
    pillarRoute.includes('photo-to-lip-sync') ||
    path.includes('photo-to-lip-sync') ||
    path.includes('faceless') ||
    path.includes('copyright')
  ) {
    pool = photoToLipSyncArticles;
  }

  const filtered = pool.filter((item) => item.href.toLowerCase() !== path);
  return filtered.slice(0, 3);
}

export function TopicClusterPage({ content }: { content: ClusterPageContent }) {
  return (
    <div className="relative overflow-hidden py-10 sm:py-16">
      {/* Background Subtle Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
        <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 opacity-40 dark:opacity-30" />
      </div>

      {/* GEO & Google Schema.org Graph JSON-LD */}
      <script
        type="application/ld+json"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for GEO & Google Search */
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://lipsync.pro',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: content.pillarTitle,
                    item: `https://lipsync.pro${content.pillarRoute}`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: content.badge,
                  },
                ],
              },
              {
                '@type': 'SoftwareApplication',
                name: 'LipSync.pro',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Web',
                url: 'https://lipsync.pro',
                description:
                  'LipSync.pro is an AI-powered web platform for automated Wav2Lip video synchronization, text-to-speech lip matching, and photo avatar animation.',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'USD',
                  description: 'Free trial welcome credits available.',
                },
              },
              ...(content.faqs && content.faqs.length > 0
                ? [
                    {
                      '@type': 'FAQPage',
                      mainEntity: content.faqs.map((faq) => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: faq.answer,
                        },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />

      <Container className="max-w-4xl px-4 sm:px-6">
        {/* Header Breadcrumbs Bar */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-md shadow-xs"
        >
          <LocaleLink
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <HomeIcon className="size-3.5" />
            <span>Home</span>
          </LocaleLink>
          <ChevronRightIcon className="size-3 text-muted-foreground/60" />
          <LocaleLink
            href={content.pillarRoute as any}
            className="hover:text-foreground transition-colors"
          >
            {content.pillarTitle}
          </LocaleLink>
          <ChevronRightIcon className="size-3 text-muted-foreground/60" />
          <span className="font-bold text-foreground">{content.badge}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
            <SparklesIcon className="size-3.5" />
            <span>{content.badge}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>

          {/* Quick CTA Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <LocaleLink
              href={
                (content.pillarRoute && content.pillarRoute !== '/learn'
                  ? content.pillarRoute
                  : '/lip-sync-ai') as any
              }
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform'
              )}
            >
              <ZapIcon className="mr-2 size-4" />
              <span>
                {content.ctaText ||
                  (content.pillarTitle && content.pillarTitle !== 'Academy Hub'
                    ? `Try ${content.pillarTitle} Tool Online`
                    : 'Try AI Lip Sync Tool Online')}
              </span>
            </LocaleLink>
          </div>
        </div>

        {/* Hero Banner Image */}
        {content.heroImage ? (
          <div className="my-8 overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={content.heroImage.src}
              alt={content.heroImage.alt}
              className="h-auto w-full object-cover max-h-[420px]"
            />
            {content.heroImage.caption && (
              <p className="bg-muted/40 p-3 text-center text-xs text-muted-foreground font-medium">
                {content.heroImage.caption}
              </p>
            )}
          </div>
        ) : (
          <div className="my-8 relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 dark:from-zinc-900 dark:via-slate-900 dark:to-black p-8 text-foreground dark:text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/15 dark:bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <span>AI NEURAL ENGINE VISUALIZATION</span>
                </div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">
                  Audio-Driven Viseme & Lip Sync Pipeline
                </h3>
                <p className="text-xs text-muted-foreground dark:text-zinc-400">
                  Sub-frame acoustic spectral matching with automatic phoneme
                  alignment.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/80 dark:bg-white/5 dark:border-white/10 p-4 backdrop-blur-md shadow-xs">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                  99.4%
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground dark:text-white">
                    Viseme Sync Precision
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Sub-frame alignment
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-12 border-t border-border pt-10">
          {content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {section.subheading}
                </p>
              )}

              {section.image ? (
                <div className="my-4 overflow-hidden rounded-2xl border border-border shadow-md">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className="h-auto w-full object-cover max-h-[360px]"
                  />
                  {section.image.caption && (
                    <p className="bg-muted/30 p-2.5 text-center text-xs text-muted-foreground">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              ) : (
                renderSectionVisual(content.pillarRoute, content.pathname, idx)
              )}

              {section.content.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="leading-relaxed text-muted-foreground sm:text-base"
                >
                  {paragraph}
                </p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-2.5 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-xs">
                  {section.bulletPoints.map((point, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-sm text-foreground sm:text-base"
                    >
                      <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* LSI Topic Tags Bar */}
        {content.lsiKeywords && content.lsiKeywords.length > 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Explore Related AI Concepts & Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.lsiKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles Section */}
        {(() => {
          const related = getRelatedArticles(
            content.pillarRoute,
            content.pathname
          );
          if (related.length === 0) return null;
          return (
            <div className="mt-14 border-t border-border pt-10">
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Related Guides & Reading
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {related.map((article) => (
                  <LocaleLink
                    key={article.href}
                    href={article.href as any}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/40 hover:shadow-md"
                  >
                    <span className="text-xs font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </span>
                    <span className="mt-3 flex items-center text-[11px] font-semibold text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      Read Guide{' '}
                      <ArrowRightIcon className="ml-1 size-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </LocaleLink>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Bottom Parent Topic Center Navigation Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-muted/40 p-4 text-xs">
          <LocaleLink
            href={(content.pillarRoute || '/learn') as any}
            className="flex items-center gap-1.5 font-bold text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>← Return to {content.pillarTitle} Topic Hub</span>
          </LocaleLink>
          <LocaleLink
            href={
              (content.pillarRoute === '/lip-sync-ai'
                ? '/learn#lip-sync-ai'
                : content.pillarRoute === '/text-to-lip-sync'
                  ? '/learn#text-to-lip-sync'
                  : content.pillarRoute === '/photo-to-lip-sync'
                    ? '/learn#photo-to-lip-sync'
                    : '/learn#general-strategy') as any
            }
            className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Academy Guides →
          </LocaleLink>
        </div>

        {/* FAQ Section */}
        {content.faqs && content.faqs.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <div className="mb-8 flex items-center gap-3">
              <HelpCircleIcon className="size-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-6">
              {content.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom High-Conversion Call To Action */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-black p-8 sm:p-10 text-white shadow-2xl dark:border dark:border-white/10">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Ready to create realistic AI Lip Sync videos?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Experience automatic phoneme alignment, audio-driven lip
              synchronization, and crisp HD output without downloading any
              software.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <LocaleLink
                href={
                  (content.pillarRoute && content.pillarRoute !== '/learn'
                    ? content.pillarRoute
                    : '/lip-sync-ai') as any
                }
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-xl bg-white font-bold text-zinc-950 hover:bg-zinc-100 transition-all'
                )}
              >
                <span>
                  {content.pillarRoute === '/text-to-lip-sync'
                    ? 'Try Text to Lip Sync Free'
                    : content.pillarRoute === '/photo-to-lip-sync'
                      ? 'Try Photo to Lip Sync Free'
                      : 'Try AI Lip Sync Free'}
                </span>
                <ArrowRightIcon className="ml-2 size-4" />
              </LocaleLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
