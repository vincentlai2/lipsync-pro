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
  BadgeCheckIcon,
  CheckCircle2Icon,
  HelpCircleIcon,
  FileAudioIcon,
  Globe2Icon,
  MonitorPlayIcon,
  ZapIcon,
  SparklesIcon,
  VideoIcon,
  CpuIcon,
  LayersIcon,
  ShieldCheckIcon,
  CheckIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  UserCheckIcon,
  AlertCircleIcon,
} from 'lucide-react';

const lipSyncAiFeatures: AlternatingFeatureItem[] = [
  {
    tag: 'Lip Sync AI Neural Engine',
    title: 'Sub-Pixel Audio-to-Visual Lip Motion Synthesis',
    description:
      'Utilize state-of-the-art Lip Sync AI neural networks to recalculate complex mouth geometry and viseme physics. Seamlessly match any vocal pitch, speed, or tone to the presenter’s natural facial expression.',
    bullets: [
      'Sub-pixel facial mesh alignment with 60fps motion smoothness',
      'Zero facial jitter or artificial boundary distortion',
      'Handles complex angles, head rotation, and natural eye movements',
    ],
    badgeIcon: CpuIcon,
    mediaType: 'video',
    mediaUrl: '/example-video.mp4',
    posterUrl: '/video-poster.png',
    visualType: 'translation',
    previewTitle: 'Lip Sync AI Core Engine',
    previewSubtitle: 'Real-time neural viseme calculation',
    previewMetrics: [
      { label: 'Viseme Precision', value: '99.4%' },
      { label: 'Frame Interpolation', value: '60 FPS' },
    ],
  },
  {
    tag: 'Global Content Localization',
    title: 'Dub Presenter Videos into 40+ International Languages',
    description:
      'Scale your video marketing without localized reshoots. Swap the original speech track with localized voiceovers in Spanish, Japanese, German, or French—our Lip Sync AI model automatically re-renders the presenter’s lip movements.',
    bullets: [
      'Automatic audio-visual duration synchronization',
      'Preserves original studio lighting and skin textures',
      'Supports MP4, MOV, WAV, MP3, and AAC audio formats',
    ],
    badgeIcon: Globe2Icon,
    mediaType: 'image',
    mediaUrl: '/multilingual_dubbing_demo_ui.png',
    visualType: 'avatar',
    previewTitle: 'Multilingual Dubbing Engine',
    previewSubtitle: 'Instant lip realignment for global audiences',
    previewMetrics: [
      { label: 'Supported Languages', value: '40+' },
      { label: 'Localization Cost', value: '-85%' },
    ],
  },
  {
    tag: 'Neural HD Upscaling',
    title: 'Full Resolution & Background Detail Preservation',
    description:
      'Say goodbye to blurry lower-face artifacts. High-fidelity neural resolution recovery ensures background video clarity, lighting shadows, and fine details stay 100% sharp.',
    bullets: [
      'Neural face enhancement for 1080p and 4K video exports',
      'No background blur or edge haloing',
      'Instant cloud processing without local GPU setups',
    ],
    badgeIcon: LayersIcon,
    mediaType: 'image',
    mediaUrl: '/talking_photo_animation_demo.png',
    visualType: 'quality',
    previewTitle: 'HD Resolution Recovery',
    previewSubtitle: 'Crisp lower-face rendering with 4K clarity',
    previewMetrics: [
      { label: 'Export Resolution', value: 'Full HD / 4K' },
      { label: 'Artifact Reduction', value: '100% Clean' },
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
    title: 'Free Lip Sync AI Video Generator Online | High Precision Dubbing',
    description:
      'Free online Lip Sync AI Generator. Synchronize video presenter mouth movements, create talking photo avatars, and produce multilingual dubs with instant credit protection.',
    locale,
    pathname: '/lip-sync-ai',
  });
}

const workflow = [
  {
    icon: VideoIcon,
    title: '1. Upload Presenter Video or Photo',
    description:
      'Select a clear face-forward video clip, AI avatar artwork, or portrait headshot.',
  },
  {
    icon: FileAudioIcon,
    title: '2. Provide Voice Audio or Text Script',
    description:
      'Upload a translated MP3/WAV speech file or generate natural voiceovers with AI TTS.',
  },
  {
    icon: SparklesIcon,
    title: '3. Generate Free Lip Sync AI',
    description:
      'Our Lip Sync AI engine renders frame-accurate lip motion aligned precisely to the voice track.',
  },
];

const painPointSolutions = [
  {
    problem: 'Expensive Video Reshoots for Overseas Markets',
    solution:
      'Re-dub voice tracks in 40+ languages while AI automatically re-aligns mouth movements in seconds.',
  },
  {
    problem: 'Camera Shyness or Expensive Presenter Actors',
    solution:
      'Animate a single static portrait photo or AI avatar into an active, talking video presenter.',
  },
  {
    problem: 'Outdated Scripts in Educational Courses',
    solution:
      'Update spoken audio tracks without re-filming video footage or re-booking studio time.',
  },
];

const useCaseScenarios = [
  {
    icon: MegaphoneIcon,
    title: 'Cross-Border Video Marketing & Ads',
    description:
      'Localize TikTok, Instagram Reels, and YouTube ads into localized native accents while maintaining 100% presenter lip sync accuracy.',
  },
  {
    icon: GraduationCapIcon,
    title: 'E-Learning & Video Course Creators',
    description:
      'Keep online educational lectures up to date. Swap changed terminology or foreign language voiceovers effortlessly.',
  },
  {
    icon: UserCheckIcon,
    title: 'Faceless Creators & Digital Avatars',
    description:
      'Build scalable personal brands and YouTube channels using digital avatars and static photo presenters.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Corporate Demos & Product Pitch Videos',
    description:
      'Deliver multi-language sales pitches and onboarding videos to global clients without hiring multilingual voice actors.',
  },
];

const faqs = [
  {
    question: 'How does Lip Sync AI generate realistic presenter videos?',
    answer:
      'Our platform uses deep neural networks to evaluate vocal phonemes and re-synthesize matching viseme mouth shapes frame-by-frame on the presenter’s face.',
  },
  {
    question:
      'What happens if video generation fails? Will my credits be refunded?',
    answer:
      'Yes, 100%! If a generation fails or encounters network errors, your credits are automatically refunded to your account balance immediately with zero loss.',
  },
  {
    question: 'Is there a free trial for Lip Sync AI video generation?',
    answer:
      'Yes! New registered accounts receive free trial credits upon sign-up to test video clips and custom voiceovers.',
  },
  {
    question: 'Can I translate and lip sync videos into other languages?',
    answer:
      'Absolutely. You can upload translated audio tracks in Spanish, French, German, Japanese, Chinese, or 40+ other languages, and the AI will re-align the mouth movements to match the new language naturally.',
  },
  {
    question: 'What video and audio formats are supported?',
    answer:
      'We support MP4, MOV, WEBM, and portrait images (JPG, PNG, WebP). Audio inputs include MP3, WAV, M4A, and AAC.',
  },
];

export default async function LipSyncAiPage() {
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
                Lip Sync AI Workspace
              </p>
              <h1 className="mt-1.5 font-extrabold text-2xl text-zinc-950 tracking-tight dark:text-white md:text-3xl">
                Create Lip Sync AI Videos
              </h1>
              <p className="mt-2 font-medium text-sm text-zinc-600 dark:text-zinc-400">
                Upload a presenter video or portrait, add voice audio or text,
                and manage your render flow from the studio workspace.
              </p>
            </div>

            <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <Wav2LipUploader
                  callbackUrl="/lip-sync-ai"
                  studioLabel="Lip Sync AI Generator"
                  defaultTtsText="Upload a presenter video or portrait photo to create a natural Lip Sync AI video."
                />
              </div>
              <WorkspaceSidePanel userId={userId} callbackUrl="/lip-sync-ai" />
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
          {/* Dual Micro Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎬 Video & Lip Sync Engine
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎁 Free Daily Credits
            </span>
          </div>

          {/* Centered H1 Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
            Free{' '}
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Lip Sync AI
            </span>{' '}
            Generator
          </h1>

          {/* Centered Subtitle */}
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal mt-2.5">
            Re-align presenter video mouth movements with new voice tracks in
            seconds. Built for global video dubbing and marketing.
          </p>

          {/* Ultra-subtle Inline Benefit Line */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-3 mb-6 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />{' '}
              Frame-Accurate Video Re-Dubbing
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />{' '}
              Preserves Original Lighting & Skin
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 40+
              Language Audio Alignment
            </span>
          </div>

          {/* Centered Wide Porcelain Studio Panel (Generator Uploader) */}
          <div className="mx-auto max-w-4xl w-full text-left">
            <Wav2LipUploader
              callbackUrl="/lip-sync-ai"
              studioLabel="Lip Sync AI Generator"
              defaultTtsText="Upload a presenter video or portrait photo to experience sub-pixel lip synchronization."
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: What is Lip Sync AI & What can it do? (图文功能与核心技术特性) */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 mb-4 text-center">
          <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
            Core AI Capabilities
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
            AI Lip Sync Technology & Core Capabilities
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
            Precision viseme calculation and frame-accurate mouth alignment for
            video dubbing, talking avatars, and multilingual content.
          </p>
        </div>
        <AlternatingFeatures items={lipSyncAiFeatures} />
      </section>

      {/* SECTION 2: How to Use? (3 步极简操作指南) */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-zinc-50/80 via-slate-50/50 to-slate-100/60 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 border-y border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
              <p className="font-semibold text-xs tracking-wider uppercase text-zinc-500">
                Simple 3-Step Process
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
                How to Use Online Lip Sync AI
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

      {/* SECTION 3: What Pain Points Does It Solve? (淡淡橙黄色调与纯粹科技蓝对比) */}
      <section className="py-12 md:py-16 bg-white/60 dark:bg-zinc-900/60 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Value & Efficiency
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Overcome Traditional Video Production Bottlenecks
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {painPointSolutions.map((item) => (
              <div
                key={item.problem}
                className="rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* 淡淡的橙黄色 Tag */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    <AlertCircleIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                    <span>TRADITIONAL CHALLENGE</span>
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                    {item.problem}
                  </h3>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                    <CheckIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>LIP SYNC AI SOLUTION</span>
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

      {/* SECTION 4: Application Scenarios & Target Audience (使用场景与适合人群) */}
      <section className="py-16 md:py-24 bg-slate-50/60 dark:bg-zinc-950/60 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Use Cases & Target Audience
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Who is Lip Sync AI Designed For?
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

      {/* SECTION 4.5: Related Guides & Knowledge Matrix (下级文章入口) */}
      <section className="py-12 md:py-16 bg-white/70 dark:bg-zinc-900/40 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <p className="font-bold text-xs tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Knowledge & Guides
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              AI Lip Sync Creator Guides & Deep Dives
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Explore step-by-step creator tutorials, technical principles, deep
              comparisons, and commercial use cases.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title:
                  'What is AI Lip Sync? Technical Principles & Neural Viseme Alignment',
                excerpt:
                  'Learn how neural networks align audio visemes with facial movements and video re-dubbing.',
                href: '/lip-sync-ai/what-is',
                tag: 'Technical Guide',
              },
              {
                title:
                  'How to Create AI Lip Sync Videos: Step-by-Step Creator Guide',
                excerpt:
                  'Upload source video files, align audio tracks, and export high-definition natural speaking videos.',
                href: '/lip-sync-ai/how-to-use',
                tag: 'Creator Tutorial',
              },
              {
                title:
                  'Free AI Lip Sync Generator: Online Trial & Feature Overview',
                excerpt:
                  'Try AI lip synchronization online without software installation. Explore free credits & quality.',
                href: '/lip-sync-ai/free',
                tag: 'Free Lead Magnet',
              },
              {
                title:
                  'AI Lip Sync vs Traditional Voiceover Dubbing: Cost & Speed Comparison',
                excerpt:
                  'In-depth breakdown of speed, budget efficiency, localization scalability, and natural visual match.',
                href: '/lip-sync-ai/vs-traditional-dubbing',
                tag: 'Deep Comparison',
              },
              {
                title:
                  'Industry Use Cases & Commercial Applications for AI Lip Sync',
                excerpt:
                  'How video localization, e-learning academies, and marketing agencies leverage neural lip sync.',
                href: '/lip-sync-ai/applications',
                tag: 'Use Cases',
              },
            ].map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <span className="inline-block rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground mb-2">
                    {guide.tag}
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ Container */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 md:p-10 shadow-sm backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-semibold text-blue-600 dark:text-blue-400 text-xs">
                <HelpCircleIcon className="size-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
                Everything You Need to Know
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
    </main>
  );
}
