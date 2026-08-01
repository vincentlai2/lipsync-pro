import { LocaleLink } from '@/i18n/navigation';
import { LOCALES } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import {
  ArrowRightIcon,
  BookOpenIcon,
  BookOpenTextIcon,
  CheckCircle2Icon,
  ClapperboardIcon,
  ClockIcon,
  CompassIcon,
  HelpCircleIcon,
  MonitorPlayIcon,
  SparklesIcon,
  WorkflowIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type ArticleItem = {
  title: string;
  excerpt: string;
  href: string;
  tag: string;
  readTime: string;
  icon: any;
};

type LearnCategorySection = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  pillarHref: string;
  pillarLabel: string;
  icon: any;
  articles: ArticleItem[];
};

const learnCategories: LearnCategorySection[] = [
  {
    id: 'lip-sync-ai',
    title: 'AI Lip Sync Video Synchronization Guides',
    subtitle:
      'Master neural viseme alignment, video re-dubbing, audio-to-video matching, and localization workflows.',
    badge: 'Video Synchronization',
    pillarHref: '/lip-sync-ai',
    pillarLabel: 'Launch Lip Sync AI Tool',
    icon: SparklesIcon,
    articles: [
      {
        title:
          'What is AI Lip Sync? Technical Principles & Neural Viseme Alignment',
        excerpt:
          'A plain-English breakdown of neural audio-viseme matching, automatic lip movement alignment, and video re-dubbing.',
        href: '/lip-sync-ai/what-is',
        tag: 'Technical Principles',
        readTime: '4 min read',
        icon: HelpCircleIcon,
      },
      {
        title: 'How to Create AI Lip Sync Videos: Step-by-Step Creator Guide',
        excerpt:
          'Learn how to upload source video files, align audio tracks, and export high-definition natural speaking videos in minutes.',
        href: '/lip-sync-ai/how-to-use',
        tag: 'Creator Tutorial',
        readTime: '6 min read',
        icon: WorkflowIcon,
      },
      {
        title: 'Free AI Lip Sync Generator: Online Trial & Feature Overview',
        excerpt:
          'Try AI lip synchronization online without software installation. Explore complimentary processing credits and output quality.',
        href: '/lip-sync-ai/free',
        tag: 'Free Lead Magnet',
        readTime: '3 min read',
        icon: BookOpenIcon,
      },
      {
        title:
          'AI Lip Sync vs Traditional Voiceover Dubbing: Cost & Speed Comparison',
        excerpt:
          'In-depth breakdown of speed, budget efficiency, localization scalability, and natural visual match between AI and voice actors.',
        href: '/lip-sync-ai/vs-traditional-dubbing',
        tag: 'Deep Comparison',
        readTime: '7 min read',
        icon: BookOpenTextIcon,
      },
      {
        title: 'Industry Use Cases & Commercial Applications for AI Lip Sync',
        excerpt:
          'How video localization, e-learning academies, film dubbing studios, and digital marketing agencies leverage neural lip sync.',
        href: '/lip-sync-ai/applications',
        tag: 'Use Cases',
        readTime: '5 min read',
        icon: CheckCircle2Icon,
      },
      {
        title:
          'How to Fix Vocal Audio Desync & Improve Viseme Precision in AI Lip Sync',
        excerpt:
          'Master audio pre-processing, sample rate normalization, and vocal isolation techniques to eliminate mouth jitter.',
        href: '/lip-sync-ai/phoneme-viseme-matching-guide',
        tag: 'Tutorial',
        readTime: '5 min read',
        icon: WorkflowIcon,
      },
    ],
  },
  {
    id: 'text-to-lip-sync',
    title: 'Text to Lip Sync & Script-Driven Video Tutorials',
    subtitle:
      'Learn how to convert raw text scripts into realistic speaking avatars with automated neural text-to-speech alignment.',
    badge: 'Script to Video',
    pillarHref: '/text-to-lip-sync',
    pillarLabel: 'Launch Text to Lip Sync Tool',
    icon: ClapperboardIcon,
    articles: [
      {
        title: 'What is Text to Lip Sync? Script-to-Speaking Avatar Explained',
        excerpt:
          'Understand how neural text-to-speech models pair with facial animation pipelines to generate speaking videos from written text.',
        href: '/text-to-lip-sync/what-is',
        tag: 'Definition & Overview',
        readTime: '4 min read',
        icon: HelpCircleIcon,
      },
      {
        title: 'How to Convert Written Scripts into HD Speaking Videos',
        excerpt:
          'Step-by-step workflow for writing video scripts, selecting realistic neural voices, and outputting HD lip-synced videos.',
        href: '/text-to-lip-sync/how-to-use',
        tag: 'Step-by-Step Guide',
        readTime: '5 min read',
        icon: WorkflowIcon,
      },
      {
        title: 'Free Text to Lip Sync Online Trial: Features & Free Credits',
        excerpt:
          'Test script-driven video generation for free. Evaluate voice options, language availability, and lip movement precision.',
        href: '/text-to-lip-sync/free',
        tag: 'Free Trial Guide',
        readTime: '3 min read',
        icon: BookOpenIcon,
      },
      {
        title: 'Multilingual Voice Examples & Language Alignment Showcase',
        excerpt:
          'Explore script-to-video capabilities across English, Spanish, Japanese, German, Mandarin, and 29+ global languages.',
        href: '/text-to-lip-sync/examples',
        tag: 'Voice Showcase',
        readTime: '4 min read',
        icon: BookOpenTextIcon,
      },
      {
        title:
          'How to Write AI Video Scripts for Natural Text to Speech Lip Sync',
        excerpt:
          'Master scriptwriting techniques optimized for text-to-speech AI avatars: punctuation, cadence markers, and phonetic spelling.',
        href: '/text-to-lip-sync/script-writing-tips',
        tag: 'Scriptwriting',
        readTime: '5 min read',
        icon: WorkflowIcon,
      },
      {
        title:
          'Choosing the Right AI Neural Voice Persona for Script-Driven Videos',
        excerpt:
          'Match your brand identity with the ideal AI neural voice persona: tone, regional accents, and emotional warmth.',
        href: '/text-to-lip-sync/voice-selection-guide',
        tag: 'Voice Persona',
        readTime: '4 min read',
        icon: SparklesIcon,
      },
    ],
  },
  {
    id: 'photo-to-lip-sync',
    title: 'Photo to Lip Sync & Talking Portrait Guides',
    subtitle:
      'Turn 2D portrait images and still headshots into expressive, vocal-driven talking avatars and animated videos.',
    badge: 'Talking Portrait Avatar',
    pillarHref: '/photo-to-lip-sync',
    pillarLabel: 'Launch Photo Animation Tool',
    icon: MonitorPlayIcon,
    articles: [
      {
        title: 'What is Photo to Lip Sync? 2D Portrait Animation Technology',
        excerpt:
          'Discover how single-image facial landmark detection and neural animation turn still photographs into realistic talking avatars.',
        href: '/photo-to-lip-sync/what-is',
        tag: 'Technology Guide',
        readTime: '4 min read',
        icon: HelpCircleIcon,
      },
      {
        title: 'How to Animate Still Photos into Expressive Talking Avatars',
        excerpt:
          'Complete creator tutorial: upload headshot images, attach custom audio tracks or scripts, and generate animated portrait videos.',
        href: '/photo-to-lip-sync/how-to-use',
        tag: 'Creator Tutorial',
        readTime: '5 min read',
        icon: WorkflowIcon,
      },
      {
        title:
          'Free Online Photo Talking Avatar Generator: Step-by-Step Overview',
        excerpt:
          'Animate your first portrait photo for free online. Learn image framing best practices, audio formatting, and credit usage.',
        href: '/photo-to-lip-sync/free',
        tag: 'Free Generator Guide',
        readTime: '3 min read',
        icon: BookOpenIcon,
      },
      {
        title: 'Photo Avatar Showcase & Commercial Production Examples',
        excerpt:
          'Browse real-world examples of photo talking avatars used in customer support bots, marketing promos, and virtual avatars.',
        href: '/photo-to-lip-sync/examples',
        tag: 'Avatar Showcase',
        readTime: '4 min read',
        icon: BookOpenTextIcon,
      },
      {
        title:
          'Best Photo Lighting & Angle Practices for High-Quality Talking Portraits',
        excerpt:
          'Optimize source photos for Photo-to-Lip-Sync: framing specs, direct frontal angles, and un-occluded mouth guidelines.',
        href: '/photo-to-lip-sync/portrait-image-optimization',
        tag: 'Photo Prep',
        readTime: '4 min read',
        icon: WorkflowIcon,
      },
      {
        title: 'How to Build a Virtual AI Brand Presenter Using a Single Photo',
        excerpt:
          'Scale video marketing without cameras or studios. Learn how e-commerce brands create virtual spokespeople from headshots.',
        href: '/photo-to-lip-sync/virtual-avatar-marketing',
        tag: 'Branding',
        readTime: '5 min read',
        icon: SparklesIcon,
      },
    ],
  },
  {
    id: 'general-strategy',
    title: 'AI Video Strategy & Global Creator Guides',
    subtitle:
      'General insights, localization blueprints, legal copyright guidelines, and enterprise video production workflows.',
    badge: 'General & Industry',
    pillarHref: '/learn',
    pillarLabel: 'Browse All Guides',
    icon: CompassIcon,
    articles: [
      {
        title: 'Top 5 AI Lip Sync & Video Realignment Tools Comparison (2026)',
        excerpt:
          'In-depth review and objective benchmark of the top AI lip sync platforms. Compare speed, lip-matching fidelity, and credit costs.',
        href: '/learn/best-ai-lip-sync-tools',
        tag: 'Market Review',
        readTime: '6 min read',
        icon: SparklesIcon,
      },
      {
        title:
          'The Complete 2026 AI Video Localization Guide for Global SaaS & E-Commerce',
        excerpt:
          'Comprehensive strategy for scaling video localization into 29+ languages using AI lip sync and automated audio matching.',
        href: '/learn/ai-video-localization-guide-2026',
        tag: 'Global Strategy',
        readTime: '8 min read',
        icon: CompassIcon,
      },
      {
        title:
          'How Faceless YouTube & TikTok Creators Scale Video Output using AI Avatars',
        excerpt:
          'Learn how top faceless content creators leverage AI talking photos and text-to-speech avatars to publish daily Short content.',
        href: '/learn/how-faceless-youtube-channels-use-ai-avatars',
        tag: 'Creator Guide',
        readTime: '6 min read',
        icon: WorkflowIcon,
      },
      {
        title:
          'How E-Learning Academies Cut Video Translation Costs by 80% with Neural Dubbing',
        excerpt:
          'Case study and implementation guide for online course platforms translating video lectures into multi-language catalogs.',
        href: '/learn/multilingual-elearning-video-dubbing',
        tag: 'EdTech Case Study',
        readTime: '6 min read',
        icon: CheckCircle2Icon,
      },
      {
        title:
          'AI Generated Avatars & Commercial Copyright: Best Practices for Businesses',
        excerpt:
          'Navigate the legal, ethical, and commercial copyright frameworks governing AI generated avatar videos and voice dubbing.',
        href: '/learn/ai-avatar-copyright-ethics-best-practices',
        tag: 'Legal & Ethics',
        readTime: '5 min read',
        icon: BookOpenTextIcon,
      },
      {
        title:
          'Enterprise Video Re-Dubbing Workflow: From Script Translation to Neural Lip Sync',
        excerpt:
          'A step-by-step technical blueprint for enterprise media teams automating video re-dubbing workflows with REST APIs.',
        href: '/learn/video-re-dubbing-workflow-optimization',
        tag: 'Enterprise Workflow',
        readTime: '7 min read',
        icon: SparklesIcon,
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
    title: 'LipSync.pro Learn Hub | AI Lip Sync Academy & Knowledge Base',
    description:
      'Master AI lip-syncing, text-to-video generation, and photo avatar animation. Browse structured guides, workflow tutorials, and technical principles.',
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
    <main className="border-t bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-zinc-50/70 dark:bg-zinc-950/40 py-14 md:py-18">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
          <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 opacity-40 dark:opacity-30" />
        </div>

        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <CompassIcon className="size-4" />
            <span>LIPSYNC.PRO LEARN ACADEMY</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            AI Video Synchronization Knowledge Base
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Browse technical guides, creator workflows, definitions, and
            comparison articles across all AI video synchronization tools.
          </p>

          {/* Quick Category Navigation Bar */}
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {learnCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:border-blue-500/50 hover:bg-muted"
              >
                <cat.icon className="size-3.5 text-blue-500" />
                <span>
                  {cat.title.split(' ')[0]} {cat.title.split(' ')[1]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Option A: Minimalist Modern List Layout (极简无边框列表) */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 space-y-16">
          {learnCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-24 border-b border-border/60 pb-12 last:border-0 last:pb-0"
              >
                {/* Category Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <CategoryIcon className="size-4" />
                      </div>
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        {category.badge}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                      {category.subtitle}
                    </p>
                  </div>

                  <LocaleLink
                    href={category.pillarHref as any}
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>{category.pillarLabel}</span>
                    <ArrowRightIcon className="size-3.5" />
                  </LocaleLink>
                </div>

                {/* Minimalist Article Row List (无边框极简行列表) */}
                <div className="divide-y divide-border/50 rounded-2xl border border-border/40 bg-card/50 overflow-hidden shadow-2xs">
                  {category.articles.map((article) => {
                    const ArticleIcon = article.icon;
                    return (
                      <LocaleLink
                        key={article.href}
                        href={article.href as any}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 gap-3 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 transition-colors"
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-600 transition-colors">
                            <ArticleIcon className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                {article.tag}
                              </span>
                              <h3 className="text-base font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {article.title}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-1">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-11 md:pl-0 pt-1 md:pt-0">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <ClockIcon className="size-3" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            <span className="hidden sm:inline">Read Guide</span>
                            <ArrowRightIcon className="size-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </LocaleLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
