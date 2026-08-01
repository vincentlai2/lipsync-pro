'use client';

import React from 'react';
import {
  AudioWaveformIcon,
  BarChart3Icon,
  BotIcon,
  CheckCircle2Icon,
  CpuIcon,
  FileAudioIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LayersIcon,
  ServerIcon,
  SparklesIcon,
  VideoIcon,
  ZapIcon,
} from 'lucide-react';

/**
 * Visual Diagram 1: Viseme & Phoneme Audio-Visual Alignment Diagram (Theme Aware)
 */
export function VisemeAlignmentDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-zinc-950 dark:via-slate-950 dark:to-zinc-900 p-6 text-foreground dark:text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <CpuIcon className="size-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Acoustic Phoneme to Visual Viseme Mapping
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Sub-frame Alignment Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="rounded-xl border border-border/80 bg-background/80 dark:bg-white/5 dark:border-white/10 p-4 backdrop-blur-xs shadow-xs">
          <FileAudioIcon className="mx-auto mb-2 size-6 text-indigo-600 dark:text-indigo-400" />
          <div className="text-xs font-bold">1. Acoustic Spectrum</div>
          <div className="mt-1 text-[10px] text-muted-foreground dark:text-zinc-400">
            Mel-Spectrogram 16kHz audio extraction
          </div>
        </div>

        <div className="flex items-center justify-center py-2 md:py-0">
          <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-500/20">
            <ZapIcon className="size-3.5 text-amber-500" />
            <span>Neural Encoding</span>
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/80 dark:bg-white/5 dark:border-white/10 p-4 backdrop-blur-xs shadow-xs">
          <VideoIcon className="mx-auto mb-2 size-6 text-emerald-600 dark:text-emerald-400" />
          <div className="text-xs font-bold">2. Viseme Deformation</div>
          <div className="mt-1 text-[10px] text-muted-foreground dark:text-zinc-400">
            Generates precise mouth shapes per frame
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 2: Step-by-Step Production Workflow Diagram
 */
export function WorkflowStepsDiagram() {
  const steps = [
    {
      num: '01',
      title: 'Upload Source',
      desc: 'MP4 / MOV video or portrait photo',
    },
    { num: '02', title: 'Add Voice', desc: 'Audio track or type text script' },
    { num: '03', title: 'AI Rendering', desc: 'Cloud GPU neural phoneme sync' },
    { num: '04', title: 'Export HD', desc: 'Download 1080p synced video' },
  ];

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        4-Step Creation Pipeline
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border/80 bg-muted/40 p-3.5 space-y-1"
          >
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">
              {s.num}
            </span>
            <div className="text-xs font-bold text-foreground">{s.title}</div>
            <div className="text-[10px] text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Visual Diagram 3: Text-to-Speech & Lip Sync Pipeline (Theme Aware)
 */
export function TextToSpeechPipelineDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-zinc-950 p-6 text-foreground dark:text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-4 text-purple-600 dark:text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            TTS Voice Synthesis + Viseme Generator Pipeline
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10 shadow-xs">
          <div className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
            Step 1: Text Script
          </div>
          <div className="text-[10px] font-mono text-muted-foreground dark:text-zinc-400 italic">
            "Welcome to LipSync.pro AI..."
          </div>
        </div>
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10 shadow-xs">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
            Step 2: Neural TTS Voice
          </div>
          <div className="text-[10px] text-muted-foreground dark:text-zinc-400">
            40+ Languages & Accent Models
          </div>
        </div>
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10 shadow-xs">
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">
            Step 3: Lip Sync Render
          </div>
          <div className="text-[10px] text-muted-foreground dark:text-zinc-400">
            Sub-frame mouth animation
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 4: Photo to Talking Avatar Architecture (Theme Aware)
 */
export function PhotoToAvatarDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 dark:from-zinc-950 dark:via-emerald-950/30 dark:to-slate-950 p-6 text-foreground dark:text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Single Portrait Facial Mesh & Viseme Synthesis
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-4 border border-border/80 dark:border-white/10 shadow-xs">
          <ImageIcon className="mx-auto mb-2 size-6 text-emerald-600 dark:text-emerald-400" />
          <div className="text-xs font-bold">2D Still Portrait</div>
          <div className="mt-1 text-[10px] text-muted-foreground dark:text-zinc-400">
            Single frame photo or headshot
          </div>
        </div>
        <div className="flex items-center justify-center">
          <LayersIcon className="size-6 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-4 border border-border/80 dark:border-white/10 shadow-xs">
          <BotIcon className="mx-auto mb-2 size-6 text-blue-600 dark:text-blue-400" />
          <div className="text-xs font-bold">Expressive Avatar</div>
          <div className="mt-1 text-[10px] text-muted-foreground dark:text-zinc-400">
            Natural facial blinks & synced speech
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 5: Market Benchmark Comparison Grid (New for Tool Reviews)
 */
export function MarketBenchmarkDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 dark:from-zinc-950 dark:via-indigo-950/30 dark:to-slate-950 p-6 text-foreground dark:text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3Icon className="size-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            2026 AI Lip Sync Performance Benchmark
          </span>
        </div>
        <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
          Independent Review
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-700 dark:text-blue-300">
              LipSync.pro
            </span>
            <span className="rounded-md bg-blue-600 text-white px-1.5 py-0.5 text-[9px] font-bold">
              TOP PICK
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground dark:text-zinc-300">
            Sub-frame viseme match, 20 free signup credits, sub-30s rendering.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/80 dark:bg-white/5 p-4 space-y-1.5">
          <span className="text-xs font-bold text-foreground">
            Legacy Studio Dubbing
          </span>
          <p className="text-[11px] text-muted-foreground dark:text-zinc-400">
            Requires voice actors, reshoots, $500+/min costs & multi-week delay.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/80 dark:bg-white/5 p-4 space-y-1.5">
          <span className="text-xs font-bold text-foreground">
            Basic Open-Source Wav2Lip
          </span>
          <p className="text-[11px] text-muted-foreground dark:text-zinc-400">
            Requires local GPU setup, frequent lower-face blur & teeth
            distortion.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 6: Enterprise Automation & API Pipeline (New for Enterprise Guides)
 */
export function EnterpriseWorkflowDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-slate-50 dark:from-zinc-950 dark:via-amber-950/20 dark:to-zinc-950 p-6 text-foreground dark:text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ServerIcon className="size-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Cloud REST API Automated Localization Architecture
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10">
          <div className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
            1. Media & Script Ingest
          </div>
          <div className="text-[10px] text-muted-foreground dark:text-zinc-400">
            REST API payload with MP4 video & multi-language subtitles
          </div>
        </div>

        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
            2. GPU Worker Cluster
          </div>
          <div className="text-[10px] text-muted-foreground dark:text-zinc-400">
            Parallel viseme synthesis & automated voice synchronization
          </div>
        </div>

        <div className="rounded-xl bg-background/80 dark:bg-white/5 p-3.5 border border-border/80 dark:border-white/10">
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">
            3. Webhook Delivery
          </div>
          <div className="text-[10px] text-muted-foreground dark:text-zinc-400">
            Instant webhook trigger with zero-watermark 1080p output
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 7: Global E-Commerce & Localization Use Cases Grid
 */
export function UseCasesGridDiagram() {
  const useCases = [
    {
      title: 'Global E-Commerce Ads',
      desc: 'Dub product videos into 40+ languages to boost ad ROI.',
    },
    {
      title: 'E-Learning & Tutorials',
      desc: 'Update course video voiceovers without re-filming.',
    },
    {
      title: 'Social Media Avatars',
      desc: 'Convert photos to daily speaking TikTok & Reels content.',
    },
  ];

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <GlobeIcon className="size-4 text-blue-600 dark:text-blue-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Industry Application Highlights
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {useCases.map((u, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border/80 bg-muted/40 p-4 space-y-1"
          >
            <div className="text-xs font-bold text-foreground">{u.title}</div>
            <div className="text-[11px] text-muted-foreground leading-relaxed">
              {u.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
