'use client';

import React from 'react';
import {
  AudioWaveformIcon,
  BotIcon,
  CheckCircle2Icon,
  CpuIcon,
  FileAudioIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LayersIcon,
  SparklesIcon,
  VideoIcon,
  ZapIcon,
} from 'lucide-react';

/**
 * Visual Diagram 1: Viseme & Phoneme Audio-Visual Alignment Diagram
 */
export function VisemeAlignmentDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 p-6 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <CpuIcon className="size-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Acoustic Phoneme to Visual Viseme Mapping
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          Sub-frame Alignment Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
          <FileAudioIcon className="mx-auto mb-2 size-6 text-indigo-400" />
          <div className="text-xs font-bold">1. Acoustic Spectrum</div>
          <div className="mt-1 text-[10px] text-zinc-400">
            Mel-Spectrogram 16kHz audio extraction
          </div>
        </div>

        <div className="flex items-center justify-center py-2 md:py-0">
          <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-300 border border-blue-500/20">
            <ZapIcon className="size-3.5 text-amber-400" />
            <span>Neural Encoding</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
          <VideoIcon className="mx-auto mb-2 size-6 text-emerald-400" />
          <div className="text-xs font-bold">2. Viseme Deformation</div>
          <div className="mt-1 text-[10px] text-zinc-400">
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
 * Visual Diagram 3: Text-to-Speech & Lip Sync Pipeline
 */
export function TextToSpeechPipelineDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-slate-950 via-purple-950/30 to-zinc-950 p-6 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-4 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
            TTS Voice Synthesis + Viseme Generator Pipeline
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
          <div className="text-xs font-bold text-purple-300 mb-1">
            Step 1: Text Script
          </div>
          <div className="text-[10px] font-mono text-zinc-400 italic">
            "Welcome to LipSync.pro AI..."
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
          <div className="text-xs font-bold text-blue-300 mb-1">
            Step 2: Neural TTS Voice
          </div>
          <div className="text-[10px] text-zinc-400">
            40+ Languages & Accent Models
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
          <div className="text-xs font-bold text-emerald-300 mb-1">
            Step 3: Lip Sync Render
          </div>
          <div className="text-[10px] text-zinc-400">
            Sub-frame mouth animation
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 4: Photo to Talking Avatar Architecture
 */
export function PhotoToAvatarDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-zinc-950 via-emerald-950/30 to-slate-950 p-6 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            EMO & Retalk Portrait Animation Engine
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <ImageIcon className="mx-auto mb-2 size-6 text-emerald-400" />
          <div className="text-xs font-bold">2D Still Portrait</div>
          <div className="mt-1 text-[10px] text-zinc-400">
            Single frame photo or artwork
          </div>
        </div>
        <div className="flex items-center justify-center">
          <LayersIcon className="size-6 text-blue-400 animate-pulse" />
        </div>
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <BotIcon className="mx-auto mb-2 size-6 text-blue-400" />
          <div className="text-xs font-bold">3D Expressive Avatar</div>
          <div className="mt-1 text-[10px] text-zinc-400">
            Head movement, blinks & lip sync
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Diagram 5: Global E-Commerce & Localization Use Cases Grid
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
