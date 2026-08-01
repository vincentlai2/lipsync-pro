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
  FileTextIcon,
  ZapIcon,
  SparklesIcon,
  VideoIcon,
  Volume2Icon,
  GlobeIcon,
  CheckCircle2Icon,
  TvIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  UserCheckIcon,
  ClockIcon,
  DollarSignIcon,
  ShieldCheckIcon,
} from 'lucide-react';

const textToLipSyncFeatures: AlternatingFeatureItem[] = [
  {
    tag: 'Text-to-Speech Engine',
    title: 'Natural Neural AI Voice Synthesis from Written Text',
    description:
      'Turn written scripts, marketing hooks, and lesson text into lifelike spoken audio. Choose from over 40 neural voice personas across multiple languages with realistic intonation.',
    bullets: [
      'Multi-language neural voice personas (Male & Female)',
      'Instant audio preview before full video render',
      'Automatic syllable-to-mouth shape synchronization',
    ],
    badgeIcon: FileTextIcon,
    mediaType: 'image',
    mediaUrl: '/text_to_lipsync_demo_ui.png',
    visualType: 'translation',
    previewTitle: 'Neural Voice & Speech Synthesis',
    previewSubtitle:
      'Convert written text scripts into spoken audio & lip movement',
    previewMetrics: [
      { label: 'Voice Quality', value: 'Neural HD' },
      { label: 'Languages', value: '40+ Supported' },
    ],
  },
  {
    tag: 'Rapid Ad & Content Creation',
    title: 'Generate Marketing Ads & Explainer Videos in Seconds',
    description:
      'Skip scheduling expensive studio sessions or hiring voice actors. Simply type your promotional copy, select your presenter video or avatar, and produce high-converting video ads instantly.',
    bullets: [
      'Ideal for TikTok, Instagram Reels, and YouTube Shorts',
      'Iterate on video hooks and ad script variations effortlessly',
      'Export ready-to-publish 1080p HD MP4 video files',
    ],
    badgeIcon: SparklesIcon,
    mediaType: 'video',
    mediaUrl: '/example-video.mp4',
    posterUrl: '/video-poster.png',
    visualType: 'quality',
    previewTitle: 'Script-to-Video Workflow',
    previewSubtitle: 'Transform text copy into viral social video ads',
    previewMetrics: [
      { label: 'Script-to-Video', value: '< 20 Sec' },
      { label: 'Conversion Lift', value: 'High Impact' },
    ],
  },
];

const textToLipSyncFaqs: FaqItem[] = [
  {
    question: 'How does Text to Lip Sync AI work?',
    answer:
      'Text to Lip Sync AI uses advanced neural speech synthesis to convert your written text into natural human voice audio. It then analyzes the audio wave phonemes and aligns the lips of your source video or avatar image frame-by-frame.',
  },
  {
    question:
      'Can I preview the synthesized voice audio before generating the video?',
    answer:
      'Yes! You can click "Preview Voice Audio" to hear how your script sounds with your chosen neural voice persona before committing any video render credits.',
  },
  {
    question: 'Is there a watermark on free generated videos?',
    answer:
      'No. All new users receive 20 free signup credits with zero watermarks. You can test and download your first complete AI lip sync video for free.',
  },
  {
    question: 'Which languages and voices are supported?',
    answer:
      'We support over 40 languages including US/UK English, French, German, Spanish, Japanese, Chinese, and more, with distinct male and female neural voice personas.',
  },
  {
    question: 'What video or photo formats can I use as the presenter?',
    answer:
      'You can upload MP4 or MOV presenter videos, or static portrait photos in JPG, PNG, or WebP format up to 300 MB.',
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
      'Text to Lip Sync AI Generator Online - Script to Video | LipSync.pro',
    description:
      'Convert written text scripts into realistic talking videos. Generate neural AI voice audio and synchronize mouth movements automatically with presenter videos or photos.',
    locale,
    pathname: '/text-to-lip-sync',
  });
}

const defaultTtsText =
  'Welcome to LipSync.pro. Turn this written script into a realistic talking presenter video in seconds.';

function ToolIntro() {
  return (
    <div className="max-w-3xl">
      <p className="font-extrabold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
        Text to Lip Sync AI
      </p>
      <h1 className="mt-1.5 text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
        Turn Written Scripts into Talking Presenter Videos
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
        Type or paste your script, pick a neural AI voice, and sync mouth
        movements with any video or photo.
      </p>
    </div>
  );
}

export default async function TextToLipSyncPage() {
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
                  callbackUrl="/text-to-lip-sync"
                  studioLabel="Text to Lip Sync Studio"
                  defaultAudioSourceMode="tts"
                  mode="text-to-lipsync"
                  defaultTtsText={defaultTtsText}
                />
              </div>
              <WorkspaceSidePanel
                userId={userId}
                callbackUrl="/text-to-lip-sync"
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-100 via-zinc-100 to-slate-200/80 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      {/* Ambient Aura */}
      <div className="absolute -top-24 -right-20 size-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-20 size-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-5 md:pt-8 md:pb-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          {/* Dual Micro Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              📄 Script-First Voice Generator
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-medium text-zinc-600 dark:text-zinc-400 shadow-sm backdrop-blur-sm">
              🎁 Free Daily Credits
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
            Generate{' '}
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-800 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Text to Lip Sync
            </span>{' '}
            Videos
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-normal mt-2.5">
            Turn written scripts into spoken voiceovers with automatic presenter
            lip sync. Choose from 40+ neural AI voices.
          </p>

          {/* Inline Benefit Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-3 mb-6 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />{' '}
              Script-to-Presenter Video Generator
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> 40+
              Neural AI Voice Personas
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-emerald-600" /> Instant
              Script & Audio Preview
            </span>
          </div>

          <div className="mx-auto max-w-4xl w-full text-left">
            <Wav2LipUploader
              callbackUrl="/text-to-lip-sync"
              studioLabel="Text to Lip Sync Studio"
              defaultAudioSourceMode="tts"
              mode="text-to-lipsync"
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
                Eliminate Filming Bottlenecks with Text-to-Video AI
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Traditional video production requires hiring actors, booking
                studios, setting up lights, and manually synchronizing audio
                tracks frame-by-frame.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                <b>LipSync.pro Text-to-Lip-Sync AI</b> solves this by generating
                natural neural voice audio directly from written scripts and
                mapping lip movements onto your presenter video or photo
                automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/90 p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-zinc-950 dark:text-white text-base flex items-center gap-2">
                <SparklesIcon className="size-4 text-blue-600 dark:text-blue-400" />
                <span>Before vs. After LipSync.pro</span>
              </h3>
              <div className="space-y-3 text-xs font-medium">
                <div className="p-3.5 rounded-xl bg-zinc-100/90 border border-zinc-200/80 text-zinc-700 dark:bg-zinc-800/60 dark:border-zinc-700/60 dark:text-zinc-300 flex items-start gap-2.5">
                  <span className="shrink-0 font-extrabold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px]">
                    Traditional
                  </span>
                  <span className="leading-relaxed">
                    $500+ studio budget, 3+ days filming & video editing, manual
                    lip alignment error.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/90 border border-blue-200/90 text-zinc-950 dark:bg-blue-950/40 dark:border-blue-800/60 dark:text-white flex items-start gap-2.5 shadow-xs">
                  <span className="shrink-0 font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white text-[10px]">
                    LipSync AI
                  </span>
                  <span className="leading-relaxed font-semibold">
                    Type text script, pick AI voice persona, 20-second automated
                    1080p HD render.
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
                How Text to Lip Sync Works
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: FileTextIcon,
                  title: '1. Write or Paste Script',
                  text: 'Type your message or ad script into the studio text input, or click a quick example script.',
                  badgeBg:
                    'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
                },
                {
                  icon: Volume2Icon,
                  title: '2. Select Neural Voice',
                  text: 'Choose from 40+ neural voice personas (Male/Female) and preview spoken audio instantly.',
                  badgeBg:
                    'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
                },
                {
                  icon: VideoIcon,
                  title: '3. Synthesize & Download HD',
                  text: 'Our AI engine maps speech audio onto your presenter video or photo for 1080p HD export.',
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
      <AlternatingFeatures items={textToLipSyncFeatures} />

      {/* SECTION 4: Use Cases & Target Scenarios */}
      <section className="py-12 bg-zinc-50/80 dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center space-y-2 mb-10">
            <p className="font-extrabold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Applications & Industry Scenarios
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white">
              Who Benefits from Text to Lip Sync AI?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: TvIcon,
                title: 'Short Video Ads',
                desc: 'Generate high-converting TikTok, Instagram Reels, and Shorts ad hook variations in minutes.',
              },
              {
                icon: GraduationCapIcon,
                title: 'E-Learning & Courses',
                desc: 'Convert text lecture notes and training slides into video lessons with a digital instructor.',
              },
              {
                icon: GlobeIcon,
                title: 'Multilingual Dubbing',
                desc: 'Translate text scripts into global languages and sync mouth movements automatically.',
              },
              {
                icon: UserCheckIcon,
                title: 'Faceless Channels',
                desc: 'Run YouTube faceless content channels by pairing text scripts with AI avatars.',
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
                10x Faster Video Delivery
              </h3>
              <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                Generate high-definition talking videos directly from text in
                under 20 seconds without filming or editing delays.
              </p>
            </div>
            <div className="group rounded-2xl border border-zinc-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="inline-flex rounded-xl bg-amber-500/10 text-amber-700 p-3 shadow-sm dark:bg-amber-500/20 dark:text-amber-300">
                <DollarSignIcon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                Zero Filming Costs
              </h3>
              <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                Save thousands on studio rentals, camera equipment, and voice
                actors. Pay only for what you synthesize.
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
                Try 20 free signup credits right out of the box with full HD
                quality export and zero watermark restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ & Schema JSON-LD */}
      <MarketingFaq
        title="Frequently Asked Questions"
        subtitle="Common questions about Text to Lip Sync AI"
        items={textToLipSyncFaqs}
      />

      {/* SECTION 7: Compact Bottom Guides Anchor (Strictly /text-to-lip-sync/* Directory) */}
      <section className="py-10 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
              Text to Lip Sync Knowledge Hub
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
                  {
                    title: 'What is Text to Lip Sync?',
                    href: '/text-to-lip-sync/what-is',
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

            {/* More Text to Lip Sync Topics Sub-Section */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                More Text to Lip Sync Topics
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  {
                    title: 'Text to Speech Showcase & Examples',
                    href: '/text-to-lip-sync/examples',
                  },
                  {
                    title: 'Free Text to Lip Sync Credits & Trial',
                    href: '/text-to-lip-sync/free',
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
