'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import { LoginForm } from '@/components/auth/login-form';
import { PricingModal } from '@/components/pricing/pricing-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSession } from '@/hooks/use-session';
import { useCreditBalance } from '@/hooks/use-credits';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  AudioLinesIcon,
  CheckCircle2Icon,
  ClapperboardIcon,
  DownloadIcon,
  Loader2Icon,
  LockIcon,
  UploadCloudIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  Trash2Icon,
  VideoIcon,
  CoinsIcon,
  Volume2Icon,
  ImageIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import confetti from 'canvas-confetti';

import { InsufficientCreditsModal } from '@/components/credits/insufficient-credits-modal';

interface Wav2LipUploaderProps {
  compact?: boolean;
  className?: string;
  defaultAudioSourceMode?: 'file' | 'tts';
  mode?: 'video-lipsync' | 'text-to-lipsync' | 'image-to-lipsync';
  callbackUrl?: string;
  studioLabel?: string;
  defaultTtsText?: string;
}

type Step = 'video' | 'audio' | 'generate' | 'processing' | 'result';

type JobStatus =
  | 'idle'
  | 'uploading'
  | 'creating'
  | 'running'
  | 'succeeded'
  | 'failed';

interface StatusResponse {
  taskId: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'unknown';
  outputUrl?: string;
  error?: string;
}

const CREDITS_PER_TASK = 20;
const SERVER_UPLOAD_FALLBACK_LIMIT = 4 * 1024 * 1024;

async function uploadWav2LipFileViaServer(file: File, kind: 'video' | 'audio') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('kind', kind);

  const uploadRes = await fetch('/api/wav2lip/upload', {
    method: 'POST',
    body: formData,
  });

  const text = await uploadRes.text();
  if (!uploadRes.ok) {
    let msg = 'Could not upload the media.';
    try {
      const json = JSON.parse(text);
      if (json.error) msg = json.error;
    } catch {}
    throw new Error(msg);
  }

  const result = JSON.parse(text);
  return result.url as string;
}

async function uploadWav2LipFile(file: File, kind: 'video' | 'audio') {
  // Use a presigned R2 URL so large media uploads bypass the Vercel body limit.
  const presignedRes = await fetch('/api/wav2lip/presigned-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || (kind === 'video' ? 'video/mp4' : 'audio/mpeg'),
      kind,
    }),
  });

  const text = await presignedRes.text();
  if (!presignedRes.ok) {
    let msg = 'Could not prepare the media upload.';
    try {
      const json = JSON.parse(text);
      if (json.error) msg = json.error;
    } catch {}
    throw new Error(msg);
  }

  const { uploadUrl, url } = JSON.parse(text);

  let uploadRes: Response;
  try {
    // Upload directly from the browser to R2 / S3.
    uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type':
          file.type || (kind === 'video' ? 'video/mp4' : 'audio/mpeg'),
      },
      body: file,
    });
  } catch {
    if (file.size <= SERVER_UPLOAD_FALLBACK_LIMIT) {
      return uploadWav2LipFileViaServer(file, kind);
    }

    throw new Error(
      'Direct upload is blocked. Please configure storage CORS for this domain.'
    );
  }

  if (!uploadRes.ok) {
    if (file.size <= SERVER_UPLOAD_FALLBACK_LIMIT) {
      return uploadWav2LipFileViaServer(file, kind);
    }

    throw new Error('Direct upload to storage failed.');
  }

  return url as string;
}

export function Wav2LipUploader({
  compact,
  className,
  defaultAudioSourceMode = 'file',
  mode = 'video-lipsync',
  callbackUrl = '/lip-sync-ai',
  studioLabel = 'Lip Sync AI Studio',
  defaultTtsText = 'Welcome to LipSync.pro. Create a natural talking video with a clear voice and realistic lip movement.',
}: Wav2LipUploaderProps) {
  const session = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTtsFirst = mode === 'text-to-lipsync';

  // Wizard state
  const [currentStep, setCurrentStep] = useState<Step>(
    isTtsFirst ? 'audio' : 'video'
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [audioPreview, setAudioPreview] = useState<string>('');

  // Audio source mode: 'file' | 'tts'
  const [audioSourceMode, setAudioSourceMode] = useState<'file' | 'tts'>(
    defaultAudioSourceMode
  );
  const [ttsText, setTtsText] = useState(defaultTtsText);
  const [ttsVoice, setTtsVoice] = useState('en-US-JennyNeural');
  const [isSynthesizingTTS, setIsSynthesizingTTS] = useState(false);
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string>('');

  // Job execution state
  const [status, setStatus] = useState<JobStatus>('idle');
  const [taskId, setTaskId] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [creditsUsed, setCreditsUsed] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  // Persistent face detection error - only cleared when user picks a new video
  const [isFaceDetectionError, setIsFaceDetectionError] = useState(false);
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);

  const DEMO_VIDEOS = [
    {
      id: 'presenter_demo',
      label: 'HD presenter demo',
      poster: '/video-poster.png',
      url: '/example-video.mp4',
    },
  ];

  const DEMO_AVATARS = [
    {
      id: 'avatar_1',
      label: 'Avatar Sophie',
      poster: '/avatar_presenter_1.png',
    },
    {
      id: 'avatar_2',
      label: 'Avatar Marc',
      poster: '/avatar_presenter_2.png',
    },
    {
      id: 'avatar_3',
      label: 'Avatar Yuki',
      poster: '/avatar_presenter_3.png',
    },
  ];

  const SAMPLE_TEXTS = [
    {
      label: 'Presentation',
      text: defaultTtsText,
    },
    {
      label: 'Ad script',
      text: 'Discover a faster way to create realistic AI lip sync videos for product campaigns.',
    },
    {
      label: 'Training',
      text: 'This is a short AI dubbing demo with smooth and realistic lip movement.',
    },
  ];

  const handleSelectPresetVideo = async (url: string, name: string) => {
    if (guardUploadAction()) return;

    try {
      setIsLoadingPreset(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `${name}.mp4`, { type: 'video/mp4' });
      await handleVideoSelect(file);
      if (mode === 'text-to-lipsync') {
        setCurrentStep('generate');
      }
    } catch (error) {
      console.error('Failed to load preset video:', error);
      setErrorMessage('Unable to load the demo video.');
    } finally {
      setIsLoadingPreset(false);
    }
  };

  const handleSelectPresetImage = async (url: string, name: string) => {
    if (guardUploadAction()) return;

    try {
      setIsLoadingPreset(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `${name}.png`, { type: 'image/png' });
      await handleVideoSelect(file);
      if (mode === 'text-to-lipsync') {
        setCurrentStep('generate');
      }
    } catch (error) {
      console.error('Failed to load preset avatar image:', error);
      setErrorMessage('Could not load the example avatar.');
    } finally {
      setIsLoadingPreset(false);
    }
  };

  const handleVideoSelect = (file: File | null) => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (file) {
      if (file.size > MAX_CLIENT_FILE_SIZE) {
        setErrorMessage(
          `The selected file (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 300 MB limit.`
        );
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setIsFaceDetectionError(false);
      setErrorMessage('');
      setTaskId('');
      setCreditsUsed(null);
      setStatus('idle');
    } else {
      setVideoFile(null);
      setVideoPreview('');
    }
  };

  // Fetch credit balance using hook
  const { data: balance = 0, isLoading: isLoadingBalance } = useCreditBalance(
    session?.user?.id
  );

  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isInsufficientModalOpen, setIsInsufficientModalOpen] = useState(false);
  const [isUploadLoginOpen, setIsUploadLoginOpen] = useState(false);

  const promptLoginBeforeUpload = () => {
    setErrorMessage(
      'Log in before uploading files. Your selected workflow stays here after authentication.'
    );
    setIsUploadLoginOpen(true);
  };

  const guardUploadAction = (
    event?: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (session?.user) return false;
    event?.preventDefault();
    if (
      'currentTarget' in (event ?? {}) &&
      event?.currentTarget instanceof HTMLInputElement
    ) {
      event.currentTarget.value = '';
    }
    promptLoginBeforeUpload();
    return true;
  };

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
      // Clean up object URLs
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (audioPreview && audioSourceMode === 'file')
        URL.revokeObjectURL(audioPreview);
    };
  }, [videoPreview, audioPreview, audioSourceMode]);

  const resetResult = () => {
    setOutputUrl('');
    setTaskId('');
    setCreditsUsed(null);
    // Only clear errorMessage if it's NOT a persistent face detection error
    if (!isFaceDetectionError) {
      setErrorMessage('');
    }
  };

  const MAX_CLIENT_FILE_SIZE = 300 * 1024 * 1024; // 300MB Wav2Lip limit via R2 direct upload

  async function parseJsonResponse<T = any>(
    response: Response,
    defaultError: string
  ): Promise<T> {
    const text = await response.text();
    if (!response.ok) {
      if (response.status === 413) {
        throw new Error('File too large. The maximum file size is 300 MB.');
      }
      try {
        const json = JSON.parse(text);
        if (json.error) throw new Error(json.error);
      } catch (e) {
        if (e instanceof Error && !e.message.startsWith('Unexpected token')) {
          throw e;
        }
      }
      throw new Error(defaultError);
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(defaultError);
    }
  }

  const handleAudioSelect = (file: File | null) => {
    if (audioPreview && audioSourceMode === 'file')
      URL.revokeObjectURL(audioPreview);
    if (file) {
      if (file.size > MAX_CLIENT_FILE_SIZE) {
        setErrorMessage(
          `The selected audio file (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 300 MB limit.`
        );
        return;
      }
      setAudioFile(file);
      setAudioPreview(URL.createObjectURL(file));
      setTtsAudioUrl('');
      resetResult();
      setStatus('idle');
    } else {
      setAudioFile(null);
      setAudioPreview('');
    }
  };

  const handleSynthesizeTTS = async () => {
    if (guardUploadAction()) return null;

    if (!ttsText.trim()) return null;
    try {
      setIsSynthesizingTTS(true);
      setErrorMessage('');
      const response = await fetch('/api/wav2lip/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsText, voice: ttsVoice }),
      });

      const data = await parseJsonResponse(response, 'Voice synthesis failed.');

      setTtsAudioUrl(data.url);
      setAudioPreview(data.url);
      setAudioFile(null);
      resetResult();
      setStatus('idle');
      return data.url as string;
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Voice synthesis failed.'
      );
      return null;
    } finally {
      setIsSynthesizingTTS(false);
    }
  };

  const handleRestart = () => {
    setVideoFile(null);
    setAudioFile(null);
    setTtsAudioUrl('');
    setVideoPreview('');
    setAudioPreview('');
    resetResult();
    setStatus('idle');
    setCurrentStep('video');
  };

  const handleDownloadResult = async () => {
    if (!outputUrl || isDownloading) return;

    try {
      setIsDownloading(true);
      const response = await fetch(outputUrl);
      if (!response.ok) {
        throw new Error('Download failed.');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `lipsync-result-${taskId || Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      setErrorMessage(
        'Download could not start automatically. Please open the video and save it from the browser.'
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const pollTaskStatus = (nextTaskId: string) => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
    }

    pollTimerRef.current = setInterval(async () => {
      try {
        const response = await fetch('/api/wav2lip/task-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId: nextTaskId }),
        });
        const data = await parseJsonResponse<StatusResponse>(
          response,
          'Status check failed'
        );

        if (data.status === 'succeeded') {
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
          }
          setOutputUrl(data.outputUrl || '');
          setStatus('succeeded');
          setCurrentStep('result');
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          // Refresh credit balance
          if (session?.user?.id) {
            queryClient.invalidateQueries({
              queryKey: ['credits', 'balance', session.user.id],
            });
          }
          router.refresh();
        } else if (data.status === 'failed') {
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
          }
          const errMsg = data.error || 'Generation failed.';
          setErrorMessage(errMsg);
          // Lock generate button if it's a face detection error
          if (errMsg.includes('visage')) {
            setIsFaceDetectionError(true);
          }
          setStatus('failed');
          setCurrentStep('generate');
          if (session?.user?.id) {
            queryClient.invalidateQueries({
              queryKey: ['credits', 'balance', session.user.id],
            });
          }
          router.refresh();
        } else {
          setStatus('running');
        }
      } catch (error) {
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
        }
        setErrorMessage(
          error instanceof Error ? error.message : 'Status failed'
        );
        setStatus('failed');
        setCurrentStep('generate');
      }
    }, 5000);
  };

  const handleGenerate = async () => {
    if (!videoFile) {
      setErrorMessage('Please add a source video or image.');
      return;
    }

    if (audioSourceMode === 'file' && !audioFile) {
      setErrorMessage('Please upload an audio file.');
      return;
    }

    if (audioSourceMode === 'tts' && !ttsAudioUrl) {
      setErrorMessage('Please generate or test the AI voice first.');
      return;
    }

    try {
      resetResult();
      setCurrentStep('processing');
      setStatus('uploading');

      const isImageInput = videoFile.type.startsWith('image/');
      // Template video publicly accessible to DashScope (known-good H.264 MP4 with a face)
      const TEMPLATE_VIDEO_URL =
        'https://assets.sync.so/docs/example-video.mp4';

      let finalAudioUrl = ttsAudioUrl;
      let finalVideoUrl = '';
      let finalRefImageUrl: string | undefined;

      if (audioSourceMode === 'file' && audioFile) {
        if (isImageInput) {
          const [imgUrl, aUrl] = await Promise.all([
            uploadWav2LipFile(videoFile, 'video'),
            uploadWav2LipFile(audioFile, 'audio'),
          ]);
          finalRefImageUrl = imgUrl;
          finalVideoUrl = TEMPLATE_VIDEO_URL;
          finalAudioUrl = aUrl;
        } else {
          const [vUrl, aUrl] = await Promise.all([
            uploadWav2LipFile(videoFile, 'video'),
            uploadWav2LipFile(audioFile, 'audio'),
          ]);
          finalVideoUrl = vUrl;
          finalAudioUrl = aUrl;
        }
      } else {
        if (isImageInput) {
          finalRefImageUrl = await uploadWav2LipFile(videoFile, 'video');
          finalVideoUrl = TEMPLATE_VIDEO_URL;
        } else {
          finalVideoUrl = await uploadWav2LipFile(videoFile, 'video');
        }
      }

      setStatus('creating');
      const response = await fetch('/api/wav2lip/create-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: finalVideoUrl,
          audioUrl: finalAudioUrl,
          ...(finalRefImageUrl ? { refImageUrl: finalRefImageUrl } : {}),
          modelMode: isImageInput ? 'emo' : 'videoretalk',
        }),
      });
      const data = await parseJsonResponse(response, 'Task creation failed');

      setTaskId(data.taskId);
      setCreditsUsed(data.creditsUsed);
      setStatus('running');
      pollTaskStatus(data.taskId);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Generation failed'
      );
      setStatus('failed');
      setCurrentStep('generate');
    }
  };

  const hasInsufficientCredits = session?.user && balance < CREDITS_PER_TASK;
  const isTtsGuidanceMessage =
    audioSourceMode === 'tts' &&
    !ttsAudioUrl &&
    errorMessage.toLowerCase().includes('synth');

  return (
    <Card
      className={cn(
        'w-full overflow-hidden rounded-xl border border-zinc-200/90 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-all',
        className
      )}
    >
      <CardHeader className="space-y-3 border-b border-zinc-100 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-zinc-200/90 bg-zinc-50 px-3 py-1 font-semibold text-zinc-700 text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <SparklesIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
            {studioLabel}
          </div>
          {session?.user && (
            <div className="flex items-center gap-1.5 rounded-md border border-zinc-200/90 bg-zinc-50 px-3 py-1 text-zinc-700 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <CoinsIcon className="size-3.5 text-amber-500" />
              <span>
                Balance:{' '}
                <b className="text-zinc-950 dark:text-white">
                  {isLoadingBalance ? '...' : balance}
                </b>{' '}
                credits
              </span>
            </div>
          )}
        </div>
        <CardTitle className="font-bold text-zinc-950 dark:text-white text-xl md:text-2xl tracking-tight">
          {currentStep === 'processing' && 'AI Generation in Progress...'}
          {currentStep === 'result' && 'Your Lip Sync Video is Ready!'}
          {currentStep !== 'processing' &&
            currentStep !== 'result' &&
            (mode === 'image-to-lipsync'
              ? currentStep === 'video'
                ? 'Step 1: Upload Portrait Image'
                : currentStep === 'audio'
                  ? 'Step 2: Add Script or Voice Track'
                  : 'Step 3: Render Talking Image'
              : mode === 'text-to-lipsync'
                ? currentStep === 'audio'
                  ? 'Step 1: Add Text Script & Voice'
                  : currentStep === 'video'
                    ? 'Step 2: Choose Presenter Video or Photo'
                    : 'Step 3: Render Talking Video'
                : currentStep === 'video'
                  ? 'Step 1: Choose Source Presenter Video'
                  : currentStep === 'audio'
                    ? 'Step 2: Add Target Voiceover'
                    : 'Step 3: Render Lip Sync Video')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 px-4 sm:px-7 pt-4 sm:pt-6 pb-5 sm:pb-7">
        {/* Step Indicator Tabs */}
        {currentStep !== 'processing' && currentStep !== 'result' && (
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-zinc-200/90 bg-zinc-100 p-1 font-medium text-xs dark:border-zinc-800 dark:bg-zinc-900">
            {mode === 'image-to-lipsync' ? (
              <>
                <button
                  onClick={() => setCurrentStep('video')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'video'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <ImageIcon className="size-3.5" />
                  1. Photo / Image
                </button>
                <button
                  onClick={() => setCurrentStep('audio')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'audio'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <SparklesIcon className="size-3.5 text-blue-600" />
                  2. Text & Voice
                </button>
                <button
                  onClick={() => setCurrentStep('generate')}
                  disabled={!videoFile}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'generate'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white disabled:opacity-40'
                  )}
                  type="button"
                >
                  <SparklesIcon className="size-3.5" />
                  3. Render
                </button>
              </>
            ) : mode === 'text-to-lipsync' ? (
              <>
                <button
                  onClick={() => setCurrentStep('audio')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'audio'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <SparklesIcon className="size-3.5 text-blue-600" />
                  1. Text & Voice
                </button>
                <button
                  onClick={() => setCurrentStep('video')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'video'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <VideoIcon className="size-3.5" />
                  2. Source Media
                </button>
                <button
                  onClick={() => setCurrentStep('generate')}
                  disabled={!videoFile}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'generate'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white disabled:opacity-40'
                  )}
                  type="button"
                >
                  <SparklesIcon className="size-3.5" />
                  3. Render
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentStep('video')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'video'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <VideoIcon className="size-3.5" />
                  1. Video
                </button>
                <button
                  onClick={() => setCurrentStep('audio')}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'audio'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                  )}
                  type="button"
                >
                  <AudioLinesIcon className="size-3.5" />
                  2. Audio
                </button>
                <button
                  onClick={() => setCurrentStep('generate')}
                  disabled={!videoFile}
                  className={cn(
                    'py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    currentStep === 'generate'
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white disabled:opacity-40'
                  )}
                  type="button"
                >
                  <SparklesIcon className="size-3.5" />
                  3. Render
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 1: VIDEO UPLOAD */}
        {currentStep === 'video' && (
          <div className="space-y-5">
            {!videoPreview ? (
              <div className="space-y-5">
                <label
                  htmlFor="studio-video-input"
                  onClick={(event) => {
                    guardUploadAction(event);
                  }}
                  className="group flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200/90 bg-zinc-50/70 p-8 text-center transition-all duration-200 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
                >
                  <div className="rounded-lg border border-zinc-200/90 bg-white p-4 text-zinc-900 transition-colors duration-200 group-hover:bg-zinc-950 group-hover:text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                    <ClapperboardIcon className="size-8" />
                  </div>
                  <span className="mt-4 font-extrabold text-zinc-950 dark:text-white text-base">
                    {mode === 'image-to-lipsync'
                      ? 'Drop or select portrait photo or avatar image'
                      : 'Drop or select your presenter video or photo'}
                  </span>
                  <span className="mt-1.5 text-zinc-500 dark:text-zinc-400 text-xs max-w-sm leading-relaxed font-medium">
                    Clear, well-lit, face-forward media. JPG, PNG, WEBP, MP4, or
                    MOV (max 300 MB).
                  </span>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isLoadingPreset}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (mode === 'image-to-lipsync') {
                          handleSelectPresetImage(
                            DEMO_AVATARS[0].poster,
                            DEMO_AVATARS[0].id
                          );
                        } else {
                          handleSelectPresetVideo(
                            DEMO_VIDEOS[0].url,
                            DEMO_VIDEOS[0].id
                          );
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-900 bg-zinc-950 px-4 py-1.5 font-semibold text-white text-xs transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 cursor-pointer"
                    >
                      <SparklesIcon className="size-3.5 text-amber-400 fill-amber-400" />
                      <span>
                        {isLoadingPreset
                          ? 'Loading Sample...'
                          : '⚡ Instant 1-Click Demo Sample'}
                      </span>
                    </button>
                  </div>
                  <Input
                    id="studio-video-input"
                    type="file"
                    accept="video/mp4,video/quicktime,video/x-msvideo,image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.avi,.mov,.mp4"
                    className="sr-only"
                    onChange={(e) => {
                      if (guardUploadAction(e)) return;
                      handleVideoSelect(e.target.files?.[0] ?? null);
                    }}
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-zinc-200/90 bg-white p-3.5 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                    <p className="font-extrabold text-zinc-950 dark:text-white flex items-center gap-1.5">
                      <SparklesIcon className="size-3.5 text-blue-600" />
                      Photo: Expressive Mode
                    </p>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      Best for animating static portraits. Generates natural
                      facial expressions and eye movement.
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-200/90 bg-white p-3.5 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                    <p className="font-extrabold text-zinc-950 dark:text-white flex items-center gap-1.5">
                      <VideoIcon className="size-3.5 text-emerald-600" />
                      Video: High Precision
                    </p>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      Best for existing clips. Aligns lip movements
                      frame-by-frame with visible mouth geometry.
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5 text-left">
                  <div className="flex items-center gap-2 font-extrabold text-zinc-950 dark:text-white text-xs">
                    <SparklesIcon className="size-4 text-blue-600" />
                    <span>
                      {mode === 'image-to-lipsync'
                        ? 'No portrait ready? Try a sample avatar:'
                        : 'No video ready? Try a sample presenter:'}
                    </span>
                  </div>
                  {mode === 'image-to-lipsync' ? (
                    <div className="grid grid-cols-3 gap-3 pt-1">
                      {DEMO_AVATARS.map((demo) => (
                        <button
                          key={demo.id}
                          type="button"
                          disabled={isLoadingPreset}
                          onClick={() =>
                            handleSelectPresetImage(demo.poster, demo.id)
                          }
                          className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 focus:outline-none"
                        >
                          <div className="relative h-28 w-full overflow-hidden bg-zinc-100">
                            <img
                              src={demo.poster}
                              alt={demo.label}
                              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                              <span className="text-xs font-bold text-white truncate drop-shadow-sm">
                                {demo.label}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    DEMO_VIDEOS.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        disabled={isLoadingPreset}
                        onClick={() =>
                          handleSelectPresetVideo(demo.url, demo.id)
                        }
                        className="group relative flex w-full cursor-pointer items-center gap-3.5 overflow-hidden rounded-lg border border-zinc-200/90 bg-white p-3 text-left transition-all duration-200 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 focus:outline-none"
                      >
                        <div className="relative aspect-video w-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 shadow-2xs border border-zinc-200/60">
                          <img
                            src={demo.poster}
                            alt={demo.label}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-zinc-950 dark:text-white text-xs sm:text-sm">
                            {demo.label}
                          </p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                            Face-forward presenter demo (0.9 MB)
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 text-white hover:from-zinc-700 hover:to-zinc-900 px-3.5 py-1.5 font-extrabold text-xs shadow-[0_2px_6px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all group-hover:scale-105">
                          Use Sample
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-900 p-2">
                  {videoFile?.type.startsWith('image/') ? (
                    <img
                      src={videoPreview}
                      alt={videoFile?.name || 'Media preview'}
                      className="max-h-64 max-w-full object-contain rounded-lg"
                    />
                  ) : (
                    /* biome-ignore lint/a11y/useMediaCaption: user preview */
                    <video
                      src={videoPreview}
                      controls
                      className="max-h-64 max-w-full"
                    />
                  )}
                  <button
                    onClick={() => handleVideoSelect(null)}
                    className="absolute top-3 right-3 rounded-xl border border-red-200 bg-white p-2 text-red-600 transition-colors hover:bg-red-50 shadow-xs"
                    title="Remove media"
                    type="button"
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50 p-3 text-zinc-600 text-xs">
                  <span className="truncate">
                    File: <b className="text-zinc-950">{videoFile?.name}</b>
                  </span>
                  <span className="shrink-0 ml-2">
                    {(videoFile!.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div className="flex gap-3">
                  {mode === 'text-to-lipsync' && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('audio')}
                      className="h-13 rounded-2xl border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50 to-zinc-100/80 text-zinc-800 hover:bg-zinc-100 font-bold shadow-[0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Back to text
                    </Button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (mode === 'text-to-lipsync') {
                        setCurrentStep('generate');
                      } else {
                        setCurrentStep('audio');
                      }
                    }}
                    className="flex-1 h-13 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-zinc-700/60 flex items-center justify-center cursor-pointer transition-all hover:from-zinc-700 hover:to-zinc-900 active:scale-[0.99] text-sm tracking-wide"
                  >
                    {mode === 'image-to-lipsync'
                      ? 'Continue: add text or voice'
                      : mode === 'text-to-lipsync'
                        ? 'Continue to final render'
                        : 'Continue to audio'}
                    <ArrowRightIcon className="ml-2 size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: AUDIO UPLOAD / TTS */}
        {currentStep === 'audio' && (
          <div className="space-y-4">
            {/* Audio Source Sub-tabs */}
            <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-200/50 via-zinc-100/60 to-zinc-100/90 dark:border-zinc-800 dark:bg-zinc-900 p-1.5 font-medium text-xs shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]">
              <button
                type="button"
                onClick={() => {
                  setAudioSourceMode('file');
                  if (ttsAudioUrl && !audioFile) {
                    setAudioPreview('');
                  }
                }}
                className={cn(
                  'py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer',
                  audioSourceMode === 'file'
                    ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                )}
              >
                <AudioLinesIcon className="size-4 text-blue-600 dark:text-blue-400" />
                Upload audio file
              </button>
              <button
                type="button"
                onClick={() => {
                  setAudioSourceMode('tts');
                  if (ttsAudioUrl) {
                    setAudioPreview(ttsAudioUrl);
                  } else {
                    setAudioPreview('');
                  }
                }}
                className={cn(
                  'py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer',
                  audioSourceMode === 'tts'
                    ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-950 font-extrabold shadow-[0_3px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-zinc-200/90 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-950 font-semibold hover:bg-white/40 dark:text-zinc-400 dark:hover:text-white'
                )}
              >
                <SparklesIcon className="size-4 text-indigo-600 dark:text-indigo-400" />
                AI voice synthesis (TTS)
              </button>
            </div>

            {audioSourceMode === 'file' ? (
              !audioPreview || audioFile === null ? (
                <label
                  htmlFor="studio-audio-input"
                  onClick={(event) => {
                    guardUploadAction(event);
                  }}
                  className="group flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200/90 bg-gradient-to-b from-zinc-50/60 via-white to-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-900/50 p-6 text-center transition-all hover:border-zinc-300 hover:bg-white dark:hover:bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900 p-3.5 text-zinc-900 dark:text-white transition-transform group-hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                    <AudioLinesIcon className="size-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="mt-4 font-bold text-zinc-950 dark:text-white text-sm">
                    Drop or select your audio file
                  </span>
                  <span className="mt-1.5 text-zinc-500 dark:text-zinc-400 text-xs max-w-xs font-medium">
                    Clear voiceover or dubbing audio. MP3, WAV, or AAC (max 30
                    MB)
                  </span>
                  <Input
                    id="studio-audio-input"
                    type="file"
                    accept="audio/mpeg,audio/wav,audio/aac,.mp3,.wav,.aac"
                    className="sr-only"
                    onChange={(e) => {
                      if (guardUploadAction(e)) return;
                      handleAudioSelect(e.target.files?.[0] ?? null);
                    }}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-4 rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/60 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 border border-blue-200/50">
                        <AudioLinesIcon className="size-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-zinc-950 dark:text-white text-sm">
                          {audioFile?.name}
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 font-medium">
                          {(audioFile!.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => handleAudioSelect(null)}
                        className="rounded-xl border border-red-200/90 bg-gradient-to-b from-white to-red-50/50 p-2 text-red-600 transition-colors hover:bg-red-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)]"
                        type="button"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                    <div className="flex justify-center border-zinc-200/80 dark:border-zinc-800 border-t pt-4">
                      {/* biome-ignore lint/a11y/useMediaCaption: user audio preview */}
                      <audio src={audioPreview} controls className="w-full" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('video')}
                      className="h-13 rounded-2xl border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50 to-zinc-100/80 text-zinc-800 hover:bg-zinc-100 font-bold shadow-[0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep('generate')}
                      className="flex-1 h-13 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-zinc-700/60 hover:from-zinc-700 hover:to-zinc-900 text-sm tracking-wide"
                    >
                      Configure render
                      <ArrowRightIcon className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              )
            ) : (
              /* TTS Text Mode */
              <div className="space-y-4">
                <div className="space-y-4 rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/60 p-5.5 shadow-[0_4px_20px_rgba(0,0,0,0.025)]">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <label
                        htmlFor="studio-tts-input"
                        className="flex items-center gap-1.5 font-extrabold text-zinc-950 dark:text-white"
                      >
                        <SparklesIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                        Text to speak:
                      </label>
                      <span className="text-zinc-400 text-[11px] font-semibold">
                        {ttsText.length}/500 characters
                      </span>
                    </div>
                    <textarea
                      id="studio-tts-input"
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      maxLength={500}
                      rows={4}
                      placeholder="Write the text you want the AI voice to speak..."
                      className="w-full resize-none rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-4 text-zinc-950 dark:text-white text-sm font-medium placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)]"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1 items-center">
                      <span className="text-[11px] text-zinc-500 font-bold mr-1">
                        Quick examples:
                      </span>
                      {SAMPLE_TEXTS.map((sample) => (
                        <button
                          key={sample.label}
                          type="button"
                          onClick={() => setTtsText(sample.text)}
                          className="rounded-full border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900 px-3.5 py-1 text-xs text-zinc-800 dark:text-zinc-200 font-bold transition-all hover:border-zinc-300 dark:hover:bg-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:scale-[1.02] cursor-pointer"
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="studio-voice-select"
                        className="text-xs text-zinc-600 dark:text-zinc-400 font-bold flex items-center justify-between"
                      >
                        <span>AI Voice Persona</span>
                        <span className="text-[10px] text-blue-600 font-bold bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
                          Neural Synthesis
                        </span>
                      </label>
                      <select
                        id="studio-voice-select"
                        value={ttsVoice}
                        onChange={(e) => setTtsVoice(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50/90 dark:bg-zinc-900 p-2.5 font-bold text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-zinc-400 shadow-[0_1.5px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
                      >
                        <option value="en-US-JennyNeural">
                          🇺🇸 Jenny — Natural Conversational (Female)
                        </option>
                        <option value="en-US-GuyNeural">
                          🇺🇸 Guy — Professional Clear (Male)
                        </option>
                        <option value="en-US-AvaNeural">
                          🇺🇸 Ava — Expressive Presenter (Female)
                        </option>
                        <option value="en-US-AndrewNeural">
                          🇺🇸 Andrew — Warm Storyteller (Male)
                        </option>
                        <option value="en-GB-SoniaNeural">
                          🇬🇧 Sonia — British Elegant (Female)
                        </option>
                        <option value="fr-FR-DeniseNeural">
                          🇫🇷 Denise — Natural French (Female)
                        </option>
                        <option value="fr-FR-HenriNeural">
                          🇫🇷 Henri — Clear French (Male)
                        </option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={handleSynthesizeTTS}
                        disabled={isSynthesizingTTS || !ttsText.trim()}
                        className="w-full h-10 text-xs font-extrabold bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-900 border border-zinc-200/90 rounded-xl cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-zinc-100 active:scale-[0.98]"
                      >
                        {isSynthesizingTTS ? (
                          <>
                            <Loader2Icon className="mr-2 size-3.5 animate-spin" />
                            Synthesizing...
                          </>
                        ) : (
                          <>
                            <Volume2Icon className="mr-2 size-3.5 text-blue-600" />
                            Preview Voice Audio
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {ttsAudioUrl && (
                    <div className="border-t border-zinc-200/80 dark:border-zinc-800 pt-4 space-y-2">
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <CheckCircle2Icon className="size-3.5" />
                        AI Voice Audio Generated Successfully
                      </p>
                      {/* biome-ignore lint/a11y/useMediaCaption: tts preview */}
                      <audio
                        src={ttsAudioUrl}
                        controls
                        autoPlay
                        className="w-full h-10"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {mode !== 'text-to-lipsync' &&
                    defaultAudioSourceMode !== 'tts' && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep('video')}
                        className="h-13 rounded-2xl border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50 to-zinc-100/80 text-zinc-800 hover:bg-zinc-100 font-bold shadow-[0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
                      >
                        <ArrowLeftIcon className="mr-2 size-4" />
                        {mode === 'image-to-lipsync'
                          ? 'Back to image'
                          : 'Back to source media'}
                      </Button>
                    )}
                  {mode === 'image-to-lipsync' && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('video')}
                      className="h-13 rounded-2xl border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50 to-zinc-100/80 text-zinc-800 hover:bg-zinc-100 font-bold shadow-[0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Back to image
                    </Button>
                  )}
                  <button
                    type="button"
                    onClick={async () => {
                      if (!ttsAudioUrl) {
                        const nextAudioUrl = await handleSynthesizeTTS();
                        if (!nextAudioUrl) {
                          return;
                        }
                      }
                      if (videoFile) {
                        setCurrentStep('generate');
                      } else {
                        setCurrentStep('video');
                      }
                    }}
                    disabled={isSynthesizingTTS || !ttsText.trim()}
                    className="flex-1 h-13 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white font-extrabold rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-zinc-700/60 flex items-center justify-center cursor-pointer disabled:opacity-40 transition-all hover:from-zinc-700 hover:to-zinc-900 active:scale-[0.99] text-sm tracking-wide"
                  >
                    {videoFile ? (
                      <>
                        Continue to final render
                        <ArrowRightIcon className="ml-2 size-4" />
                      </>
                    ) : mode === 'image-to-lipsync' ? (
                      <>
                        Continue: upload image
                        <ArrowRightIcon className="ml-2 size-4" />
                      </>
                    ) : (
                      <>
                        Continue: choose source media
                        <ArrowRightIcon className="ml-2 size-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: CONFIGURE & GENERATE */}
        {currentStep === 'generate' && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-3 divide-y divide-slate-200 rounded-md border border-slate-200 bg-slate-50 p-4">
              <div className="flex justify-between items-center pb-3">
                <div className="flex items-center gap-2">
                  <VideoIcon className="size-4 text-primary" />
                  <span className="max-w-xs truncate font-medium text-slate-950 text-sm">
                    {videoFile?.name}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentStep('video')}
                  className="text-xs text-primary hover:underline"
                  type="button"
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-between items-center pt-3">
                <div className="flex items-center gap-2 min-w-0">
                  {audioSourceMode === 'file' ? (
                    <>
                      <AudioLinesIcon className="size-4 text-primary shrink-0" />
                      <span className="max-w-xs truncate font-medium text-slate-950 text-sm">
                        {audioFile?.name || 'Audio file'}
                      </span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="size-4 shrink-0 text-blue-500" />
                      <span className="max-w-xs truncate font-medium text-slate-950 text-sm">
                        AI voice: "{ttsText.slice(0, 35)}..."
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setCurrentStep('audio')}
                  className="text-xs text-primary hover:underline shrink-0"
                  type="button"
                >
                  Edit
                </button>
              </div>
            </div>

            {hasInsufficientCredits ? (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm space-y-3">
                <p className="text-amber-500 font-medium flex items-center gap-2">
                  Insufficient credits ({balance}/{CREDITS_PER_TASK})
                </p>
                <p className="text-muted-foreground text-xs">
                  This generation requires <b>{CREDITS_PER_TASK}</b> credits.
                  Your current balance is <b>{balance}</b> credits.
                </p>
                <Button
                  size="sm"
                  className="w-full bg-amber-500 text-black hover:bg-amber-400 cursor-pointer font-semibold"
                  onClick={() => setIsInsufficientModalOpen(true)}
                >
                  <SparklesIcon className="mr-1.5 size-4" />
                  Get credits
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm">
                <div>
                  <p className="font-medium text-slate-950">Render cost</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Balance after generation:{' '}
                    <b>{session?.user ? balance - CREDITS_PER_TASK : 30}</b>{' '}
                    credits
                  </p>
                </div>
                <span className="rounded-md border border-emerald-200 bg-white px-3 py-1 font-semibold text-emerald-700">
                  -{CREDITS_PER_TASK} credits
                </span>
              </div>
            )}

            {errorMessage && (
              <div
                className={cn(
                  'space-y-3 rounded-md border p-4 text-xs',
                  isTtsGuidanceMessage
                    ? 'border-amber-200 bg-amber-50 text-amber-700'
                    : 'border-red-200 bg-red-50 text-red-600'
                )}
              >
                <p className="leading-relaxed font-medium">{errorMessage}</p>
                {isFaceDetectionError && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsFaceDetectionError(false);
                      setErrorMessage('');
                      setVideoFile(null);
                      setVideoPreview('');
                      setStatus('idle');
                      setCurrentStep('video');
                    }}
                    className="h-9 w-full border-red-200 font-semibold text-red-600 text-xs hover:bg-red-50"
                  >
                    <VideoIcon className="mr-1.5 size-3.5 text-red-400" />
                    Change source video or image
                  </Button>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('audio')}
                className="h-12 rounded-2xl border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50 font-semibold"
              >
                <ArrowLeftIcon className="mr-2 size-4" />
                Back
              </Button>

              {!session?.user ? (
                <LoginWrapper mode="modal" callbackUrl={callbackUrl} asChild>
                  <button
                    type="button"
                    className="flex-1 h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <UploadCloudIcon className="mr-2 size-4" />
                    Log in to generate
                  </button>
                </LoginWrapper>
              ) : hasInsufficientCredits ? (
                <Button
                  onClick={() => setIsInsufficientModalOpen(true)}
                  className="flex-1 h-12 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl shadow-md"
                >
                  <SparklesIcon className="mr-2 size-4" />
                  Get credits
                </Button>
              ) : isFaceDetectionError ? (
                <Button
                  onClick={() => {
                    setIsFaceDetectionError(false);
                    setErrorMessage('');
                    setVideoFile(null);
                    setVideoPreview('');
                    setStatus('idle');
                    setCurrentStep('video');
                  }}
                  className="flex-1 h-12 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl font-semibold shadow-2xs"
                  variant="outline"
                >
                  <VideoIcon className="mr-2 size-4" />
                  Change source media
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex-1 h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center cursor-pointer transition-all active:scale-[0.99]"
                >
                  <SparklesIcon className="mr-2 size-4" />
                  {mode === 'image-to-lipsync'
                    ? 'Animate photo'
                    : mode === 'text-to-lipsync'
                      ? 'Generate talking video'
                      : 'Generate lip sync video'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: PROCESSING STATE */}
        {currentStep === 'processing' && (
          <div className="space-y-6 text-center py-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center">
                <Loader2Icon className="size-16 text-primary animate-spin" />
                <SparklesIcon className="absolute size-6 text-blue-500" />
              </div>
            </div>

            <div className="max-w-xs mx-auto space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-950">
                  AI generation in progress...
                </h3>
                <p className="text-muted-foreground text-xs">
                  {status === 'uploading' &&
                    'Securely uploading your media to the cloud...'}
                  {status === 'creating' &&
                    'Preparing the lip sync generation...'}
                  {status === 'running' &&
                    'Lip Sync AI is aligning the mouth movement. This usually takes about 30 seconds.'}
                </p>
              </div>

              {/* Sequential detailed stepper */}
              <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-left text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'size-5 rounded-full flex items-center justify-center text-[10px] border font-bold shrink-0',
                      status !== 'uploading'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-primary/20 text-primary border-primary/30 animate-pulse'
                    )}
                  >
                    {status !== 'uploading' ? 'OK' : '1'}
                  </span>
                  <span
                    className={
                      status === 'uploading'
                        ? 'font-medium text-slate-950'
                        : 'text-muted-foreground'
                    }
                  >
                    Uploading files
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'size-5 rounded-full flex items-center justify-center text-[10px] border font-bold shrink-0',
                      status === 'running' || status === 'succeeded'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : status === 'creating'
                          ? 'bg-primary/20 text-primary border-primary/30 animate-pulse'
                          : 'border-slate-200 bg-white text-muted-foreground'
                    )}
                  >
                    {status === 'running' || status === 'succeeded'
                      ? 'OK'
                      : '2'}
                  </span>
                  <span
                    className={
                      status === 'creating'
                        ? 'font-medium text-slate-950'
                        : 'text-muted-foreground'
                    }
                  >
                    Creating the AI task
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'size-5 rounded-full flex items-center justify-center text-[10px] border font-bold shrink-0',
                      status === 'succeeded'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : status === 'running'
                          ? 'bg-primary/20 text-primary border-primary/30 animate-pulse'
                          : 'border-slate-200 bg-white text-muted-foreground'
                    )}
                  >
                    {status === 'succeeded' ? 'OK' : '3'}
                  </span>
                  <span
                    className={
                      status === 'running'
                        ? 'font-medium text-slate-950'
                        : 'text-muted-foreground'
                    }
                  >
                    Lip sync and rendering
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: RESULT SUCCESS STATE */}
        {currentStep === 'result' && (
          <div className="space-y-5 animate-fade-in">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-950">
              {/* biome-ignore lint/a11y/useMediaCaption: final output rendering */}
              <video
                src={outputUrl}
                controls
                autoPlay
                className="max-h-64 max-w-full"
              />
            </div>

            <div className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm">
              <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600" />
              <div className="text-left">
                <p className="font-semibold text-emerald-700">
                  Generation complete!
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  The lip sync video was generated successfully.
                </p>
              </div>
            </div>

            {balance < CREDITS_PER_TASK && (
              <div className="flex flex-col items-start justify-between gap-3 rounded-md border border-blue-200 bg-blue-50 p-4 text-xs sm:flex-row sm:items-center">
                <div className="space-y-0.5">
                  <p className="flex items-center gap-1.5 font-semibold text-slate-950">
                    <SparklesIcon className="size-3.5 text-blue-600" />
                    Your current credits are used up
                  </p>
                  <p className="text-muted-foreground">
                    Need to keep creating more videos at higher volume?
                  </p>
                </div>
                <Button
                  size="xs"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="h-8 shrink-0 cursor-pointer px-3"
                >
                  Add credits
                </Button>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="h-11"
              >
                Create another video
              </Button>
              <Button
                className="h-11 bg-blue-600 font-semibold text-white hover:bg-blue-700"
                onClick={handleDownloadResult}
                disabled={isDownloading || !outputUrl}
              >
                {isDownloading ? (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                ) : (
                  <DownloadIcon className="mr-2 size-4" />
                )}
                {isDownloading ? 'Preparing download...' : 'Download MP4'}
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="w-full" asChild>
              <a href={outputUrl} target="_blank" rel="noreferrer">
                Open video in new tab
              </a>
            </Button>
          </div>
        )}

        {!session?.user && (
          <>
            <Separator />
            <div className="grid gap-2 text-muted-foreground text-xs sm:grid-cols-3 text-center">
              <p className="flex items-center justify-center gap-1">
                Private source files
              </p>
              <p className="flex items-center justify-center gap-1">
                No Python install
              </p>
              <p className="flex items-center justify-center gap-1">
                High-fidelity render
              </p>
            </div>
          </>
        )}
      </CardContent>
      <InsufficientCreditsModal
        open={isInsufficientModalOpen}
        onOpenChange={setIsInsufficientModalOpen}
        onOpenPricingModal={() => setIsPricingModalOpen(true)}
        currentBalance={balance}
        creditsRequired={CREDITS_PER_TASK}
      />
      <Dialog open={isUploadLoginOpen} onOpenChange={setIsUploadLoginOpen}>
        <DialogContent className="p-0 sm:max-w-[400px]">
          <DialogHeader className="hidden">
            <DialogTitle />
          </DialogHeader>
          <LoginForm callbackUrl={callbackUrl} className="border-none" />
        </DialogContent>
      </Dialog>
      <PricingModal
        open={isPricingModalOpen}
        onOpenChange={setIsPricingModalOpen}
        successCallbackUrl={callbackUrl}
        cancelCallbackUrl={callbackUrl}
      />
    </Card>
  );
}
