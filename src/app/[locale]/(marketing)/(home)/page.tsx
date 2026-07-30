import PricingSection from '@/components/blocks/pricing/pricing';
import {
  AlternatingFeatures,
  type AlternatingFeatureItem,
} from '@/components/marketing/alternating-features';
import { constructMetadata } from '@/lib/metadata';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  Globe2Icon,
  ZapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VideoIcon,
  PlayIcon,
  FileTextIcon,
  ImageIcon,
  CpuIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'LipSync.pro - Next-Gen AI Lip Sync & Talking Video Studio',
    description:
      'The ultimate AI lip sync & talking video platform. Localize videos in 40+ languages, animate portrait photos, and turn text scripts into studio-grade presenter videos online.',
    locale,
    pathname: '',
  });
}

const homeAlternatingFeatures: AlternatingFeatureItem[] = [
  {
    tag: 'Multilingual Video Dubbing',
    title: 'Localize Video Content into 40+ Languages',
    description:
      'Expand your audience reach globally. Translate your spoken video voiceovers into English, Spanish, French, Japanese, or German while automatically synthesizing matching mouth movements.',
    bullets: [
      'Preserves original presenter lighting and facial expressions',
      'Supports MP4, MOV, WAV, MP3, and M4A audio inputs',
      'Frame-accurate mouth shape realignment',
    ],
    badgeIcon: Globe2Icon,
    mediaType: 'video',
    mediaUrl: '/example-video.mp4',
    posterUrl: '/video-poster.png',
    visualType: 'translation',
    previewTitle: 'AI Multilingual Video Localization Demo',
    previewSubtitle: 'Real video audio & mouth shape sync',
    previewMetrics: [
      { label: 'Sync Realism', value: '99.4%' },
      { label: 'Render Time', value: '< 15 Sec' },
    ],
  },
  {
    tag: 'AI Talking Avatars',
    title: 'Animate Static Photos & Avatars into Talking Presenters',
    description:
      'Turn static headshots, character artwork, and AI avatar images into active video presenters. Perfect for e-learning courses, social media ads, and YouTube shorts.',
    bullets: [
      'Sub-pixel facial landmark and expression tracking',
      'Compatible with JPG, PNG, and WebP portrait images',
      'No camera crew or recording studio required',
    ],
    badgeIcon: SparklesIcon,
    mediaType: 'image',
    mediaUrl: '/lip_sync_multilingual_demo.png',
    visualType: 'avatar',
    previewTitle: 'Portrait Photo & Avatar Animation',
    previewSubtitle: 'Convert still images into lifelike talking videos',
    previewMetrics: [
      { label: 'Facial Precision', value: '98.8%' },
      { label: 'Format Support', value: 'HD & 4K' },
    ],
  },
  {
    tag: 'Studio-Grade Quality',
    title: 'Resolution Preservation & Sub-Pixel Facial Realism',
    description:
      'Never compromise on video quality. LipSync.pro processes facial regions with high-fidelity neural upscaling so your background video and lighting remain 100% crisp.',
    bullets: [
      'Zero background blur or artifact distortion',
      'Preserves natural skin textures and lighting highlights',
      'Instant cloud rendering without local Python setups',
    ],
    badgeIcon: ZapIcon,
    mediaType: 'image',
    mediaUrl: '/talking_photo_animation_demo.png',
    visualType: 'quality',
    previewTitle: 'Neural High-Fidelity Rendering',
    previewSubtitle: 'Sub-pixel accuracy with full resolution preservation',
    previewMetrics: [
      { label: 'Export Resolution', value: 'Full HD / 4K' },
      { label: 'Artifact Reduction', value: '100% Clean' },
    ],
  },
];

const productSuite = [
  {
    icon: VideoIcon,
    title: 'Lip Sync AI',
    tagline: 'Multilingual Video Re-Dubbing',
    description:
      'Re-align presenter mouth movements frame-by-frame to match new voice tracks in 40+ international languages.',
    href: '/lip-sync-ai',
    badge: 'Popular',
  },
  {
    icon: FileTextIcon,
    title: 'Text to Lip Sync',
    tagline: 'Script-to-Video Engine',
    description:
      'Convert written copy and promotional scripts into natural speech voiceovers with automatic presenter lip sync.',
    href: '/text-to-lip-sync',
    badge: 'Neural TTS',
  },
  {
    icon: ImageIcon,
    title: 'Photo to Lip Sync',
    tagline: 'Talking Photo Avatar',
    description:
      'Breathe life into still portrait photographs, digital avatars, and character illustrations with expressive audio motion.',
    href: '/photo-to-lip-sync',
    badge: 'AI Avatar',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Brand Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-slate-100/90 via-zinc-100/60 to-zinc-50/90 dark:border-zinc-800 dark:from-zinc-900/90 dark:via-zinc-950 dark:to-zinc-950 py-6 md:py-10">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-amber-300/15 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          {/* Dual Micro Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              ✨ Next-Gen AI Video Studio
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎁 Free Daily Credits
            </span>
          </div>

          {/* Centered H1 Headline (Brand Facade Position) */}
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl max-w-4xl mx-auto leading-tight">
            Free{' '}
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              AI Lip Sync
            </span>{' '}
            Studio
          </h1>

          {/* Centered Subtitle */}
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal mt-2.5">
            Localize video voiceovers in 40+ languages, animate portrait
            headshots, and turn scripts into studio videos.
          </p>

          {/* CTA Action Buttons Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 mb-6">
            <Link
              href="/lip-sync-ai"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:scale-[1.02] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <span>Try Free Now</span>
              <ArrowRightIcon className="size-4" />
            </Link>
            <a
              href="#product-suite"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-md transition-all hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200"
            >
              <CpuIcon className="size-4 text-blue-500" />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Ultra-subtle Inline Benefit Line */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-xs text-zinc-600 dark:text-zinc-400 font-semibold mb-6">
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> Video,
              Photo & Script Studio
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 40+
              Language Voiceover Localizer
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 1080p
              Full HD Studio Export
            </span>
          </div>

          {/* Brand Studio Showcase Card (Porcelain Split Preview) */}
          <div className="mx-auto max-w-4xl w-full text-left">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white via-zinc-50 to-slate-100 p-4 md:p-6 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950">
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3 mb-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-zinc-500">
                    LipSync.pro Studio Showcase
                  </span>
                </div>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  4K Studio Preview
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Left: Original Presenter Video */}
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-black aspect-video group shadow-md dark:border-zinc-800">
                  <video
                    src="/example-video.mp4"
                    poster="/video-poster.png"
                    controls
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                    Original English Video
                  </div>
                </div>

                {/* Right: AI Localized Lip-Synced Video Result */}
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-900 aspect-video group shadow-md dark:border-zinc-800">
                  <img
                    src="/lip_sync_multilingual_demo.png"
                    alt="AI Multilingual Lip Sync Demo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                    <SparklesIcon className="size-3 text-amber-400 fill-amber-400" />
                    <span>Localized Lip Sync (Spanish/Japanese)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite Matrix Grid */}
      <section
        id="product-suite"
        className="py-16 md:py-24 bg-white/60 dark:bg-zinc-950/60 border-b border-zinc-200/80 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center mb-12 space-y-3">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Complete AI Video Suite
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-4xl">
              Three Powerful Ways to Create Talking Videos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base">
              Choose the dedicated tool engineered for your video creation
              workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {productSuite.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-500/40 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/60 p-3.5 text-blue-600 dark:text-blue-400">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 font-bold text-zinc-600 dark:text-zinc-300 text-xs">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="font-semibold text-blue-600 dark:text-blue-400 text-xs">
                      {item.tagline}
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                      <span>Open {item.title} Tool</span>
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIX.AI Style Alternating Image & Feature Showcases */}
      <AlternatingFeatures items={homeAlternatingFeatures} />

      {/* Pricing Section (Anchor #pricing) */}
      <section
        id="pricing"
        className="py-16 md:py-24 bg-slate-100/60 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-4">
          <PricingSection />
        </div>
      </section>
    </>
  );
}
