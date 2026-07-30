import {
  CheckCircle2Icon,
  Globe2Icon,
  PlayIcon,
  SparklesIcon,
  VideoIcon,
  ZapIcon,
} from 'lucide-react';
import type React from 'react';

export interface AlternatingFeatureItem {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  badgeIcon?: React.ElementType;
  mediaType?: 'video' | 'image' | 'mockup';
  mediaUrl?: string;
  posterUrl?: string;
  visualType: 'translation' | 'avatar' | 'quality';
  previewTitle: string;
  previewSubtitle: string;
  previewMetrics: { label: string; value: string }[];
}

interface AlternatingFeaturesProps {
  items: AlternatingFeatureItem[];
}

export function AlternatingFeatures({ items }: AlternatingFeaturesProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-50/50 via-slate-50/80 to-zinc-100/60 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950 border-t border-b border-zinc-200/80 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 space-y-16 md:space-y-24">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const BadgeIcon = item.badgeIcon || SparklesIcon;

          return (
            <div
              key={item.title}
              className={`grid gap-8 md:gap-12 lg:grid-cols-2 items-center ${
                isEven ? '' : 'lg:grid-flow-col-dense'
              }`}
            >
              {/* Text Column */}
              <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 font-semibold text-blue-600 dark:text-blue-400 text-xs">
                  <BadgeIcon className="size-3.5" />
                  <span>{item.tag}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
                  {item.title}
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="space-y-3 pt-2">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2Icon className="size-3.5" />
                      </div>
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card Column (Glassmorphic Mockup / Real Media Showcase) */}
              <div className={`relative ${isEven ? '' : 'lg:col-start-1'}`}>
                <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white/90 via-zinc-50/80 to-slate-100/90 p-5 md:p-7 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950">
                  {/* Background Glow */}
                  <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-blue-500/15 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-indigo-500/15 blur-3xl" />

                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3.5 dark:border-zinc-800 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex size-2.5 rounded-full bg-red-400/80" />
                      <div className="flex size-2.5 rounded-full bg-amber-400/80" />
                      <div className="flex size-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 font-semibold text-zinc-500 text-xs">
                        {item.previewTitle}
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                      Live AI Render
                    </span>
                  </div>

                  {/* Real Video or Image Showcase */}
                  {item.mediaType === 'video' && item.mediaUrl ? (
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-black shadow-md dark:border-zinc-800 aspect-video group">
                      <video
                        src={item.mediaUrl}
                        poster={item.posterUrl || '/video-poster.png'}
                        controls
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                        <PlayIcon className="size-3 text-emerald-400 fill-emerald-400" />
                        <span>Real Video Demo</span>
                      </div>
                    </div>
                  ) : item.mediaType === 'image' && item.mediaUrl ? (
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-900 shadow-md dark:border-zinc-800 aspect-video group">
                      <img
                        src={item.mediaUrl}
                        alt={item.previewTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                        <SparklesIcon className="size-3 text-amber-400 fill-amber-400" />
                        <span>Real AI Avatar Result</span>
                      </div>
                    </div>
                  ) : (
                    /* Fallback Glassmorphic UI Card */
                    <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
                            {item.previewTitle}
                          </h4>
                          <p className="mt-0.5 text-zinc-500 text-xs">
                            {item.previewSubtitle}
                          </p>
                        </div>
                        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/50 p-2.5 text-blue-600 dark:text-blue-400">
                          {item.visualType === 'translation' && (
                            <Globe2Icon className="size-5" />
                          )}
                          {item.visualType === 'avatar' && (
                            <SparklesIcon className="size-5" />
                          )}
                          {item.visualType === 'quality' && (
                            <ZapIcon className="size-5" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800/80">
                        <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
                        <div className="h-4 w-1 rounded-full bg-blue-400" />
                        <div className="h-7 w-1 rounded-full bg-blue-600" />
                        <div className="h-3 w-1 rounded-full bg-blue-400" />
                        <div className="h-6 w-1 rounded-full bg-blue-500" />
                        <div className="h-8 w-1 rounded-full bg-indigo-600" />
                        <div className="h-4 w-1 rounded-full bg-blue-400" />
                        <div className="h-6 w-1 rounded-full bg-blue-500" />
                        <span className="ml-auto font-mono font-medium text-zinc-500 text-xs">
                          Sync 100%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Real Metrics Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {item.previewMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3 text-center dark:border-zinc-800 dark:bg-zinc-900/60"
                      >
                        <div className="font-extrabold text-zinc-900 dark:text-zinc-100 text-base">
                          {metric.value}
                        </div>
                        <div className="mt-0.5 text-zinc-500 text-[11px] font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
