'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import {
  DownloadIcon,
  VideoIcon,
  SparklesIcon,
  CalendarIcon,
  AlertCircleIcon,
  Loader2Icon,
  CopyIcon,
  CheckIcon,
  FilmIcon,
  CoinsIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TaskItem {
  id: string;
  status: string;
  outputUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
  errorMessage?: string | null;
  creditsUsed?: number | null;
  createdAt: string | Date;
}

interface CreationsGridProps {
  tasks: TaskItem[];
}

export function CreationsGrid({ tasks }: CreationsGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  function statusLabel(status: string) {
    switch (status) {
      case 'succeeded':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'running':
        return 'Processing';
      case 'pending':
        return 'Queued';
      default:
        return 'Unknown';
    }
  }

  function statusVariant(status: string) {
    if (status === 'succeeded') return 'default';
    if (status === 'failed') return 'destructive';
    return 'secondary';
  }

  if (tasks.length === 0) {
    return (
      <Card className="border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm p-12 text-center flex flex-col items-center gap-4 max-w-2xl mx-auto mt-8 rounded-2xl">
        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/50">
          <FilmIcon className="size-10" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white">
            No video creations yet
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm font-medium">
            Upload a video or photo to render your first AI lip sync creation.
          </p>
        </div>
        <Button
          asChild
          className="mt-2 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold cursor-pointer rounded-xl shadow-md hover:from-zinc-700 hover:to-zinc-900 px-6"
        >
          <LocaleLink href={Routes.LipSyncAI}>
            <SparklesIcon className="mr-2 size-4 text-blue-400" />
            Start Creating Free
          </LocaleLink>
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
      {tasks.map((task) => {
        const createdDate = new Date(task.createdAt);
        const fileName = task.videoUrl
          ? decodeURIComponent(task.videoUrl).split('/').pop()?.split('?')[0]
          : 'Untitled Lip Sync Video';

        return (
          <Card
            key={task.id}
            className="group overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between rounded-2xl"
          >
            {/* Preview / Video Player Header */}
            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center border-b border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
              {task.status === 'succeeded' && task.outputUrl ? (
                <>
                  {/* biome-ignore lint/a11y/useMediaCaption: User generated video preview */}
                  <video
                    src={task.outputUrl}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <Badge className="bg-emerald-500/90 text-white font-extrabold text-[10px] px-2 py-0.5 shadow-md backdrop-blur-xs border border-emerald-400/30">
                      1080p HD
                    </Badge>
                  </div>
                </>
              ) : task.status === 'failed' ? (
                <div className="flex flex-col items-center gap-2 text-destructive p-4 text-center">
                  <AlertCircleIcon className="size-8 text-red-500" />
                  <p className="text-xs font-extrabold text-red-600 dark:text-red-400">
                    Generation Failed
                  </p>
                  {task.errorMessage && (
                    <p
                      className="text-[11px] text-zinc-400 max-w-[220px] truncate"
                      title={task.errorMessage}
                    >
                      {task.errorMessage}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-blue-500 p-6 text-center">
                  <Loader2Icon className="size-8 animate-spin" />
                  <p className="text-xs font-extrabold animate-pulse text-zinc-300">
                    AI Lip Syncing in progress...
                  </p>
                </div>
              )}
            </div>

            {/* Info Area */}
            <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <CalendarIcon className="size-3.5" />
                    {createdDate.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <Badge
                    variant={statusVariant(task.status)}
                    className="text-[10px] px-2 py-0.5 shrink-0 font-bold"
                  >
                    {statusLabel(task.status)}
                  </Badge>
                </div>

                <p
                  className="text-sm font-extrabold text-zinc-950 dark:text-white line-clamp-1"
                  title={fileName}
                >
                  {fileName}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                  <CoinsIcon className="size-3.5 text-amber-500" />
                  Cost: <b>{task.creditsUsed ?? 20}</b> credits
                </span>

                {task.status === 'succeeded' && task.outputUrl && (
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyLink(task.id, task.outputUrl!)}
                      className="h-8 px-2.5 text-xs font-bold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                      title="Copy video URL"
                    >
                      {copiedId === task.id ? (
                        <CheckIcon className="size-3.5 text-emerald-600" />
                      ) : (
                        <CopyIcon className="size-3.5 text-zinc-600 dark:text-zinc-300" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="h-8 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold text-xs cursor-pointer shadow-sm hover:from-zinc-700 hover:to-zinc-900 px-3"
                    >
                      <a
                        href={task.outputUrl}
                        target="_blank"
                        rel="noreferrer"
                        download={`lipsync_${task.id}.mp4`}
                      >
                        <DownloadIcon className="mr-1.5 size-3.5 text-emerald-400" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
