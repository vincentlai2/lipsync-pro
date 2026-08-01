import { Wav2LipUploader } from '@/components/wav2lip/wav2lip-uploader';
import { WorkspaceMobileHeader } from '@/components/wav2lip/workspace-mobile-header';
import { WorkspaceSidePanel } from '@/components/wav2lip/workspace-side-panel';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { claimDailyLoginCredits } from '@/credits/credits';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getSession } from '@/lib/server';
import {
  AlternatingFeatures,
  type AlternatingFeatureItem,
} from '@/components/marketing/alternating-features';
import {
  MarketingFaq,
  type FaqItem,
} from '@/components/marketing/marketing-faq';
import {
  ImageIcon,
  ZapIcon,
  SparklesIcon,
  Volume2Icon,
  CheckCircle2Icon,
  UserCheckIcon,
  GraduationCapIcon,
  PaletteIcon,
  Building2Icon,
  SparkleIcon,
  ClockIcon,
  DollarSignIcon,
  ShieldCheckIcon,
} from 'lucide-react';

const photoToLipSyncFeatures: AlternatingFeatureItem[] = [
  {
    tag: 'Talking Avatar Synthesis',
    title: 'Transform Static Photos into Lifelike Video Presenters',
    description:
      'Breathe life into any static portrait photograph, digital character artwork, or AI avatar. Upload a single image and match it with any voice recording or text script.',
    bullets: [
      'Sub-pixel facial expression and landmark tracking',
      'Supports JPG, PNG, and WebP portrait formats',
      'Preserves original facial lighting and skin detail',
    ],
    badgeIcon: ImageIcon,
    mediaType: 'image',
    mediaUrl: '/photo_to_lipsync_demo_ui.png',
    visualType: 'avatar',
    previewTitle: 'Talking Photo & Avatar Engine',
    previewSubtitle: 'Convert still images into expressive video avatars',
    previewMetrics: [
      { label: 'Facial Accuracy', value: '98.8%' },
      { label: 'Image Formats', value: 'JPG, PNG, WebP' },
    ],
  },
  {
    tag: 'Creator & E-Learning Tools',
    title: 'Create Personal Brand Presenters & E-Course Lessons',
    description:
      'Generate professional video lectures, social avatar posts, and automated presenter demos without spending hours in front of a camera.',
    bullets: [
      'Ideal for faceless YouTube channels and TikTok creators',
      'Update video voice tracks without re-photographing models',
      'Export high-definition MP4 videos directly online',
    ],
    badgeIcon: SparklesIcon,
    mediaType: 'image',
    mediaUrl: '/avatar_presenter_3.png',
    visualType: 'quality',
    previewTitle: 'E-Learning & Social Avatar Video Demo',
    previewSubtitle: 'Streamlined video creation for digital creators',
    previewMetrics: [
      { label: 'Render Speed', value: 'Instant' },
      { label: 'Resolution', value: '1080p Full HD' },
    ],
  },
];

const photoToLipSyncFaqs: FaqItem[] = [
  {
    question: 'What kind of photos work best for Photo to Lip Sync?',
    answer:
      'Clear, well-lit, face-forward portrait photos yield the highest quality lip synchronization. Front-facing studio portraits, digital avatar illustrations, and AI-generated avatars work exceptionally well.',
  },
  {
    question: 'Do I need multiple photos or 3D models?',
    answer:
      'No! Our AI facial landmark model only requires 1 single portrait photograph to synthesize natural lip movement, eye blinks, and micro-expressions.',
  },
  {
    question: 'Can I upload my own custom voice audio recording?',
    answer:
      'Yes! You can either type text for neural voice synthesis or upload your own MP3, WAV, or AAC audio voiceover file.',
  },
  {
    question: 'Are there watermarks on free trial exports?',
    answer:
      'No. Your 20 free signup credits allow you to generate and download high-definition talking avatar videos without watermarks.',
  },
  {
    question: 'Is my uploaded photo kept private?',
    answer:
      'Yes. Your media uploads are processed securely via encrypted cloud storage and are accessible only to your account.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title:
      'Photo to Lip Sync AI Generator - Turn Photos into Talking Videos | LipSync.pro',
    description:
      'Animate static portrait photos, avatars, and artwork into realistic talking videos with precise sub-pixel facial tracking and natural audio voiceover synchronization.',
    locale,
    pathname: '/photo-to-lip-sync',
  });
}

const defaultTtsText =
  'Welcome to LipSync.pro. Animate this portrait photo with natural speech and lip movement.';

function ToolIntro() {
  return (
    <div className="max-w-3xl">
      <p className="font-extrabold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
        Photo to Lip Sync AI
      </p>
      <h1 className="mt-1.5 text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
        Turn Any Portrait Photo into a Talking Video
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
        Upload a face image, add voice audio or text script, and synthesize
        natural talking videos instantly.
      </p>
    </div>
  );
}

export default async function PhotoToLipSyncPage() {
  let session = null;
  try {
    session = await getSession();
  } catch (error) {
    console.error('Failed to retrieve session:', error);
  }

  const userId = session?.user?.id;

  if (userId) {
    claimDailyLoginCredits(userId).catch((err) => {
      console.error('claimDailyLoginCredits background error:', err);
    });

    return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
          } as React.CSSProperties
        }
      >
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <WorkspaceMobileHeader />
          <div className="relative flex flex-1 flex-col gap-6 overflow-hidden bg-gradient-to-b from-blue-50/50 via-background to-background p-4 dark:from-transparent dark:to-transparent lg:p-6">
            <ToolIntro />
            <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <Wav2LipUploader
                  callbackUrl="/photo-to-lip-sync"
                  studioLabel="Photo to Lip Sync Studio"
                  mode="image-to-lipsync"
                  defaultTtsText={defaultTtsText}
                />
              </div>
              <WorkspaceSidePanel
                userId={userId}
                callbackUrl="/photo-to-lip-sync"
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <main className="relative bg-gradient-to-b from-slate-100/90 via-zinc-50/60 to-slate-100/70 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 min-h-screen">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-amber-300/15 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-5 md:pt-8 md:pb-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          {/* Dual Micro Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🖼️ Photo & Avatar Studio
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎁 Free Daily Credits
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
            Animate{' '}
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Photo & Avatar
            </span>{' '}
            Online
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal mt-2.5">
            Animate portrait photos, digital avatars, and artwork into talking
            presenters with sub-pixel motion tracking.
          </p>

          {/* Inline Benefit Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-3 mb-6 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> Animate
              Any 1 Still Portrait Photo
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />{' '}
              Sub-Pixel Eye Blinks & Expressions
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> Works
              with Photos, Avatars & AI Art
            </span>
          </div>

          <div className="mx-auto max-w-4xl w-full text-left">
            <Wav2LipUploader
              callbackUrl="/photo-to-lip-sync"
              studioLabel="Photo to Lip Sync Studio"
              mode="image-to-lipsync"
              defaultTtsText={defaultTtsText}
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: What It Is & Problem Solved */}
      <section className="py-12 bg-white/70 dark:bg-zinc-900/50 border-y border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <SparklesIcon className="size-4" />
                <span>What It Is & Solution</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight">
                Animate Still Pictures without 3D Rigging or Filming
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Generating video presenters used to require hiring actors or
                building complex 3D motion capture rigs.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                <b>LipSync.pro Photo-to-Lip-Sync AI</b> solves this by animating
                any single portrait photo, artwork, or AI avatar with realistic
                mouth movements, micro-expressions, and eye blinks using audio
                voiceovers or text.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/90 p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-zinc-950 dark:text-white text-base flex items-center gap-2">
                <SparklesIcon className="size-4 text-blue-600 dark:text-blue-400" />
                <span>Why Use Photo to Lip Sync AI?</span>
              </h3>
              <div className="space-y-3 text-xs font-medium">
                <div className="p-3.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80 text-zinc-700 dark:bg-zinc-800/60 dark:border-zinc-700/60 dark:text-zinc-300 flex items-start gap-2.5">
                  <span className="shrink-0 font-extrabold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px]">
                    1 Single Photo
                  </span>
                  <span className="leading-relaxed">
                    No 3D software, multi-angle camera shoots, or motion capture
                    rigging required.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/90 border border-blue-200/90 text-zinc-950 dark:bg-blue-950/40 dark:border-blue-800/60 dark:text-white flex items-start gap-2.5 shadow-xs">
                  <span className="shrink-0 font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white text-[10px]">
                    Sub-Pixel AI
                  </span>
                  <span className="leading-relaxed font-semibold">
                    Synchronizes lip motion, subtle eye blinks, and facial
                    details with zero stiffness.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How to Use (3 Steps) */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
              <p className="font-semibold text-xs tracking-wider uppercase text-zinc-500">
                Simple 3-Step Creation
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
                How Photo to Lip Sync Works
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: ImageIcon,
                  title: '1. Upload Face Image',
                  text: 'Drop a portrait photo, digital avatar, character art, or select a sample presenter photo.',
                  badgeBg:
                    'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
                },
                {
                  icon: Volume2Icon,
                  title: '2. Add Voice Audio or Text',
                  text: 'Type text script for AI voice synthesis or upload your custom MP3/WAV audio track.',
                  badgeBg:
                    'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
                },
                {
                  icon: SparklesIcon,
                  title: '3. Render Talking Video',
                  text: 'Our facial landmark engine synthesizes natural talking video with 1080p HD export.',
                  badgeBg:
                    'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div
                      className={`inline-flex rounded-xl p-3 shadow-sm ${item.badgeBg}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Selling Points */}
      <AlternatingFeatures items={photoToLipSyncFeatures} />

      {/* SECTION 4: Use Cases & Target Scenarios */}
      <section className="py-12 bg-zinc-50/80 dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center space-y-2 mb-10">
            <p className="font-extrabold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Target Scenarios & Applications
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Popular Use Cases for Photo Lip Sync
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: UserCheckIcon,
                title: 'Digital Avatars',
                desc: 'Create virtual spokespersons for websites, podcasts, and personal brand profiles.',
              },
              {
                icon: Building2Icon,
                title: 'Brand Mascots',
                desc: 'Animate brand logos, mascots, and product photos to speak directly to customers.',
              },
              {
                icon: GraduationCapIcon,
                title: 'Educational History',
                desc: 'Animate historical portraits and textbook figures for interactive learning.',
              },
              {
                icon: PaletteIcon,
                title: 'AI Art & Gaming',
                desc: 'Breathe life into AI-generated concept art, digital OC characters, and game NPCs.',
              },
            ].map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-extrabold text-zinc-950 dark:text-white text-base mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Core Advantages */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-zinc-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="inline-flex rounded-xl bg-zinc-900 text-white p-3 shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
                <ClockIcon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                Works with 1 Single Photo
              </h3>
              <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                No complex multi-angle photo shoots or 3D rigging required.
                Simply upload one portrait photograph.
              </p>
            </div>
            <div className="group rounded-2xl border border-zinc-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="inline-flex rounded-xl bg-amber-500/10 text-amber-700 p-3 shadow-sm dark:bg-amber-500/20 dark:text-amber-300">
                <SparkleIcon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                Natural Micro-Expressions
              </h3>
              <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                Synthesizes eye blinks, micro facial muscle motion, and
                synchronized mouth movements naturally.
              </p>
            </div>
            <div className="group rounded-2xl border border-zinc-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="inline-flex rounded-xl bg-emerald-500/10 text-emerald-700 p-3 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300">
                <ShieldCheckIcon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                No Watermark Free Trial
              </h3>
              <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                Get 20 free signup credits right away with full HD quality
                export and zero watermark restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ & Schema JSON-LD */}
      <MarketingFaq
        title="Frequently Asked Questions"
        subtitle="Common questions about Photo to Lip Sync AI"
        items={photoToLipSyncFaqs}
      />

      {/* SECTION 7: Compact Bottom Guides Anchor (Strictly /photo-to-lip-sync/* Directory) */}
      <section className="py-10 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
              Photo to Lip Sync Knowledge Hub
            </h3>
            <a
              href="/learn"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All Academy Guides →
            </a>
          </div>

          <div className="space-y-6">
            {/* Recommended Guides Sub-Section */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Recommended Guides
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-4">
                {[
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
                  {
                    title: 'What is Photo to Lip Sync?',
                    href: '/photo-to-lip-sync/what-is',
                  },
                ].map((guide) => (
                  <a
                    key={guide.href}
                    href={guide.href}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200/70 bg-white px-3.5 py-2.5 text-xs shadow-2xs transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {guide.title}
                    </span>
                    <span className="shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform ml-1">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* More Photo to Lip Sync Topics Sub-Section */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                More Photo to Lip Sync Topics
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  {
                    title: 'Photo Avatar Showcase & Examples',
                    href: '/photo-to-lip-sync/examples',
                  },
                  {
                    title: 'Free Photo Avatar Generation Trial',
                    href: '/photo-to-lip-sync/free',
                  },
                ].map((article) => (
                  <a
                    key={article.href}
                    href={article.href}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200/70 bg-white px-3.5 py-2.5 text-xs shadow-2xs transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {article.title}
                    </span>
                    <span className="shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform ml-1">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
