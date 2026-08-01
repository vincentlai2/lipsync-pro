'use client';

import Container from '@/components/layout/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  HelpCircleIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';
import {
  PhotoToAvatarDiagram,
  TextToSpeechPipelineDiagram,
  UseCasesGridDiagram,
  VisemeAlignmentDiagram,
  WorkflowStepsDiagram,
} from './topic-cluster-visuals';

function renderSectionVisual(pillarRoute: string, idx: number) {
  if (pillarRoute.includes('photo-to-lip-sync')) {
    if (idx === 0) return <PhotoToAvatarDiagram />;
    if (idx === 1) return <WorkflowStepsDiagram />;
    return <UseCasesGridDiagram />;
  }
  if (pillarRoute.includes('text-to-lip-sync')) {
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

export function TopicClusterPage({ content }: { content: ClusterPageContent }) {
  return (
    <div className="relative overflow-hidden py-10 sm:py-16">
      {/* Background Subtle Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
        <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 opacity-40 dark:opacity-30" />
      </div>

      <Container className="max-w-4xl px-4 sm:px-6">
        {/* Header Breadcrumb & Badge */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <LocaleLink href="/" className="hover:text-foreground">
            Home
          </LocaleLink>
          <span>/</span>
          <LocaleLink
            href={content.pillarRoute as any}
            className="hover:text-foreground"
          >
            {content.pillarTitle}
          </LocaleLink>
          <span>/</span>
          <span className="text-foreground">{content.badge}</span>
        </div>

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
              href={content.pillarRoute as any}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform'
              )}
            >
              <ZapIcon className="mr-2 size-4" />
              <span>{content.ctaText || 'Try Tool Online Now'}</span>
            </LocaleLink>
            <LocaleLink
              href="/pricing"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-xl font-semibold'
              )}
            >
              <span>View Free Credits</span>
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
          <div className="my-8 relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-900 via-slate-900 to-black p-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400">
                  <span>AI NEURAL ENGINE VISUALIZATION</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Audio-Driven Viseme & Lip Sync Pipeline
                </h3>
                <p className="text-xs text-zinc-400">
                  Sub-frame acoustic spectral matching with automatic phoneme
                  alignment.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                  99.4%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Viseme Sync Precision
                  </div>
                  <div className="text-[10px] text-emerald-400">
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
                renderSectionVisual(content.pillarRoute, idx)
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
              Related Concepts & Search Intent Topics
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

        {/* FAQ Section */}
        {content.faqs && content.faqs.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
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
                href={content.pillarRoute as any}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-xl bg-white font-bold text-zinc-950 hover:bg-zinc-100 transition-all'
                )}
              >
                <span>Launch {content.pillarTitle} Tool</span>
                <ArrowRightIcon className="ml-2 size-4" />
              </LocaleLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
