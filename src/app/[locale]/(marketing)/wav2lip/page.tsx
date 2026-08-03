import { Wav2LipUploader } from '@/components/wav2lip/wav2lip-uploader';
import { WorkspaceMobileHeader } from '@/components/wav2lip/workspace-mobile-header';
import { WorkspaceSidePanel } from '@/components/wav2lip/workspace-side-panel';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { claimDailyLoginCredits } from '@/credits/credits';
import { constructMetadata } from '@/lib/metadata';
import { getSession } from '@/lib/server';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import type React from 'react';
import {
  AlternatingFeatures,
  type AlternatingFeatureItem,
} from '@/components/marketing/alternating-features';
import {
  CheckCircle2Icon,
  HelpCircleIcon,
  FileAudioIcon,
  Globe2Icon,
  SparklesIcon,
  VideoIcon,
  CpuIcon,
  LayersIcon,
  CheckIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  UserCheckIcon,
  AlertCircleIcon,
} from 'lucide-react';

const wav2lipFeatures: AlternatingFeatureItem[] = [
  {
    tag: 'Cloud WebUI Engine',
    title: 'Run Wav2Lip Online Without Python or Google Colab',
    description:
      'Eliminate CUDA driver errors, environment setup, and Google Colab GPU timeouts. Our cloud-hosted Wav2Lip engine processes your video and audio inputs instantly in your browser.',
    bullets: [
      '100% browser-based WebUI with zero local installation',
      'Instant cloud GPU rendering with fast processing speeds',
      'Supports high-resolution MP4, MOV, WAV, and MP3 files',
    ],
    badgeIcon: CpuIcon,
    mediaType: 'video',
    mediaUrl: '/example-video.mp4',
    posterUrl: '/video-poster.png',
    visualType: 'translation',
    previewTitle: 'Wav2Lip Cloud WebUI Engine',
    previewSubtitle: 'Browser-based audio-to-video lip sync',
    previewMetrics: [
      { label: 'Setup Time', value: '0 Sec' },
      { label: 'Rendering Speed', value: 'Instant' },
    ],
  },
  {
    tag: 'Neural HD Restoration',
    title: 'Fix Blurry Mouth Boxes & Lower-Face Artifacts',
    description:
      'Standard Wav2Lip outputs often suffer from blurry mouth rectangles. Our enhanced Wav2Lip pipeline integrates facial upscaling models to restore crisp 1080p and 4K mouth textures naturally.',
    bullets: [
      'Built-in neural face restoration for sharp mouth rendering',
      'Seamless skin color blending without artificial halos',
      'Preserves original camera lighting, shadows, and expressions',
    ],
    badgeIcon: LayersIcon,
    mediaType: 'image',
    mediaUrl: '/talking_photo_animation_demo.png',
    visualType: 'quality',
    previewTitle: 'HD Face Restoration',
    previewSubtitle: 'Eliminates original Wav2Lip blurriness',
    previewMetrics: [
      { label: 'Clarity Rating', value: '4K Ready' },
      { label: 'Artifact Reduction', value: '100%' },
    ],
  },
  {
    tag: 'Global Multilingual Alignment',
    title: 'Precise Viseme Alignment for 40+ Languages',
    description:
      'Re-align presenter lip movements to any foreign voice track. Whether dubbing into Spanish, French, Japanese, or German, Wav2Lip calculates exact phoneme-to-viseme timing for natural speech alignment.',
    bullets: [
      'Automatic audio duration and speed matching',
      'Maintains natural head motion and visual pacing',
      'Ideal for video marketing, localization, and e-learning',
    ],
    badgeIcon: Globe2Icon,
    mediaType: 'image',
    mediaUrl: '/multilingual_dubbing_demo_ui.png',
    visualType: 'avatar',
    previewTitle: 'Multilingual Dubbing',
    previewSubtitle: 'Instant lip realignment for global audiences',
    previewMetrics: [
      { label: 'Supported Languages', value: '40+' },
      { label: 'Localization Cost', value: '-85%' },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Wav2Lip Online Lip Sync AI Video Generator | Free WebUI',
    description:
      'Free Wav2Lip Online Lip Sync AI Video Generator. Run Wav2Lip WebUI in your browser without Google Colab or Python setup. Instant audio-to-video alignment with HD face restoration.',
    locale,
    pathname: '/wav2lip',
  });
}

const workflow = [
  {
    icon: VideoIcon,
    title: '1. Upload Presenter Video or Photo',
    description:
      'Choose a clear face-forward video clip, portrait photo, or AI presenter avatar.',
  },
  {
    icon: FileAudioIcon,
    title: '2. Provide Voice Audio or Text Script',
    description:
      'Upload a speech audio file (MP3/WAV) or input a text script for instant AI voice generation.',
  },
  {
    icon: SparklesIcon,
    title: '3. Render Wav2Lip Online',
    description:
      'Our cloud Wav2Lip engine synthesizes frame-accurate mouth movements with neural HD face restoration.',
  },
];

const painPointSolutions = [
  {
    problem: 'Google Colab Disconnections & GPU Quotas',
    solution:
      '100% cloud-hosted WebUI with zero environment setup, no CUDA driver errors, and instant browser rendering.',
  },
  {
    problem: 'Blurry Lower-Face Artifacts in Original Wav2Lip',
    solution:
      'Built-in neural face enhancement restores sharp teeth, lips, and skin textures in 1080p and 4K quality.',
  },
  {
    problem: 'Expensive Overseas Video Re-Shoots',
    solution:
      'Swap voice tracks into 40+ foreign languages while Wav2Lip automatically realigns the presenter mouth movements.',
  },
];

const useCaseScenarios = [
  {
    icon: MegaphoneIcon,
    title: 'Video Ad Localization',
    description:
      'Localize marketing videos and social ads into foreign languages with natural presenter lip sync.',
  },
  {
    icon: GraduationCapIcon,
    title: 'E-Learning & Course Updates',
    description:
      'Update spoken course lectures or fix misspoken terms without re-booking actors or re-filming video footage.',
  },
  {
    icon: UserCheckIcon,
    title: 'Faceless Creators & Avatars',
    description:
      'Turn static portrait photos or digital avatar artwork into active, speaking presenters for YouTube and TikTok.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Product Demos & Corporate Sales',
    description:
      'Deliver multi-language sales pitches and onboarding videos without hiring expensive voice actors.',
  },
];

const faqs = [
  {
    question: 'Is this Wav2Lip online tool free to try?',
    answer:
      'Yes! New registered accounts receive free trial credits upon sign-up and daily login credits to test Wav2Lip video generation.',
  },
  {
    question: 'How does this differ from running Wav2Lip on Google Colab?',
    answer:
      'Unlike Google Colab, our WebUI requires zero code, no Python installation, and no CUDA driver setup. Plus, it includes built-in neural HD face restoration to fix original Wav2Lip mouth blurriness.',
  },
  {
    question: 'How do you fix the blurry mouth artifact in standard Wav2Lip?',
    answer:
      'We run an integrated post-processing pipeline with neural facial enhancement models to sharpen mouth contours, teeth, and skin textures seamlessly.',
  },
  {
    question: 'What happens if video generation fails?',
    answer:
      'If a render fails or experiences a network glitch, 100% of your credits are automatically refunded to your balance immediately.',
  },
  {
    question: 'What video and audio formats are supported?',
    answer:
      'We support MP4, MOV, WEBM videos, portrait images (JPG, PNG, WebP), and audio files in MP3, WAV, M4A, and AAC formats.',
  },
];

export default async function Wav2LipPage() {
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
            <div className="max-w-3xl">
              <p className="font-extrabold text-blue-600 text-xs uppercase tracking-wider dark:text-blue-400">
                Wav2Lip Online Studio
              </p>
              <h1 className="mt-1.5 font-extrabold text-2xl text-zinc-950 tracking-tight dark:text-white md:text-3xl">
                Wav2Lip Online Lip Sync AI Video Generator
              </h1>
              <p className="mt-2 font-medium text-sm text-zinc-600 dark:text-zinc-400">
                Upload a video or portrait image, provide audio or text, and
                render Wav2Lip lip sync with HD face enhancement.
              </p>
            </div>

            <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <Wav2LipUploader
                  callbackUrl="/wav2lip"
                  studioLabel="Wav2Lip Online Studio"
                  defaultTtsText="Upload a presenter video or photo to experience browser-based Wav2Lip generation."
                />
              </div>
              <WorkspaceSidePanel userId={userId} callbackUrl="/wav2lip" />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-100 via-zinc-100 to-slate-200/80 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute -top-24 -right-20 size-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-20 size-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-5 md:pt-8 md:pb-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          {/* Micro Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎬 Wav2Lip Neural Engine
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎁 Free Daily Credits
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
            Wav2Lip Online{' '}
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Lip Sync AI
            </span>{' '}
            Video Generator
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal mt-2.5">
            Run Wav2Lip in your browser without Python setup, CUDA driver
            errors, or Google Colab timeouts.
          </p>

          {/* Inline Benefit Line */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-3 mb-6 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 1-Click
              Browser WebUI
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />{' '}
              Built-In Neural HD Enhancement
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 40+
              Language Audio Alignment
            </span>
          </div>

          {/* Generator Studio Panel */}
          <div className="mx-auto max-w-4xl w-full text-left">
            <Wav2LipUploader
              callbackUrl="/wav2lip"
              studioLabel="Wav2Lip Online Studio"
              defaultTtsText="Upload a presenter video or portrait photo to experience browser-based Wav2Lip generation."
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: Features */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 mb-4 text-center">
          <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
            Wav2Lip Features
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
            Enhanced Wav2Lip Capabilities & HD Pipeline
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
            Browser-based execution with integrated neural face restoration for
            sharp, realistic mouth synchronization.
          </p>
        </div>
        <AlternatingFeatures items={wav2lipFeatures} />
      </section>

      {/* SECTION 2: How to Use */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-zinc-50/80 via-slate-50/50 to-slate-100/60 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 border-y border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
              <p className="font-semibold text-xs tracking-wider uppercase text-zinc-500">
                Simple 3-Step Process
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
                How to Use Wav2Lip Online
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {workflow.map((step, idx) => {
                const Icon = step.icon;
                const badgeBgs = [
                  'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
                  'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
                  'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
                ];
                return (
                  <div
                    key={step.title}
                    className="group rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div
                      className={`inline-flex rounded-xl p-3 shadow-sm ${badgeBgs[idx % 3]}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Pain Points */}
      <section className="py-12 md:py-16 bg-white/60 dark:bg-zinc-900/60 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Value & Problem Solving
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Why Use Lipsync.pro for Wav2Lip Rendering?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {painPointSolutions.map((item) => (
              <div
                key={item.problem}
                className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    <AlertCircleIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                    <span>COMMON CHALLENGE</span>
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                    {item.problem}
                  </h3>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                    <CheckIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>LIPSYNC.PRO WAV2LIP SOLUTION</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Use Cases */}
      <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-zinc-950/60 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Applications
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Who Uses Wav2Lip Online?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {useCaseScenarios.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="flex gap-5 rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/60 p-3.5 text-blue-600 dark:text-blue-400 shrink-0 h-fit">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQs */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-semibold text-blue-600 dark:text-blue-400 text-xs">
                <HelpCircleIcon className="size-3.5" />
                <span>Wav2Lip FAQ</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Knowledge Hub Links */}
      <section className="py-10 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
              Wav2Lip Knowledge Hub & Resources
            </h3>
            <a
              href="/learn#lip-sync-ai"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All Guides →
            </a>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: 'What is AI Lip Sync Technology?',
                href: '/lip-sync-ai/what-is',
              },
              {
                title: 'How to Create AI Lip Sync Videos',
                href: '/lip-sync-ai/how-to-use',
              },
              {
                title: 'AI Lip Sync vs Traditional Dubbing',
                href: '/lip-sync-ai/vs-traditional-dubbing',
              },
              {
                title: 'Top AI Lip Sync Tools Comparison',
                href: '/lip-sync-ai/best-ai-lip-sync-tools',
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
      </section>
    </main>
  );
}
