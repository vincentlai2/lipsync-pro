import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'How to Use AI Lip Sync: Step-by-Step Tutorial & Best Practices',
  description:
    'Learn how to create perfectly synchronized AI lip sync videos in 4 easy steps. Guide on selecting audio, optimizing reference videos, and rendering high-definition mouth movements.',
  pathname: '/lip-sync-ai/how-to-use',
});

const content: ClusterPageContent = {
  title: 'How to Use AI Lip Sync: Step-by-Step Creator Guide',
  badge: 'How-to-Use Guide',
  description:
    'Follow this simple 4-step workflow to synchronize any video speaker with new vocal audio. Master input file preparation, lighting tips, and rendering options for flawless lip-sync results.',
  pillarTitle: 'AI Lip Sync',
  pillarRoute: '/lip-sync-ai',
  sections: [
    {
      heading: 'Step 1: Upload Your Target Video or Photo',
      subheading: 'Selecting Clear Source Footage',
      content: [
        'Begin by selecting a video clip or portrait photo featuring a clear view of the speaker face. For optimal neural alignment, choose footage where the speaker is facing forward under even studio lighting.',
        'LipSync.pro supports MP4, MOV, WEBM video formats as well as PNG, JPG, and WEBM images up to 1080p resolution.',
      ],
      bulletPoints: [
        'Ensure the speaker mouth is unobstructed by hands, microphones, or extreme tilt.',
        'Avoid heavy motion blur or rapid camera zooms during speaking scenes.',
      ],
    },
    {
      heading: 'Step 2: Add Vocal Audio or Type Text',
      subheading: 'Audio Input Options',
      content: [
        'Upload your pre-recorded audio track (MP3, WAV, M4A) containing clean speech. Alternatively, use our Text-to-Speech (TTS) engine to generate natural AI voices across 40+ languages.',
        'For best accuracy, ensure the audio track has minimal background music or loud ambient noise.',
      ],
    },
    {
      heading: 'Step 3: Choose Neural Engine Mode',
      subheading: 'Retalk vs. EMO Photo Mode',
      content: [
        'Select VideoRetalk for high-definition video-to-video lip replacement, or select EMO Photo Mode for dynamic head poses and expressive emotions generated from a single photo.',
      ],
    },
    {
      heading: 'Step 4: Click Generate & Download HD Output',
      subheading: 'Fast Cloud Processing',
      content: [
        'Click the Generate button. Our cloud GPU cluster processes your video in seconds, aligning every phoneme with precision. Preview the finished video directly in your browser and download in 1080p HD.',
      ],
    },
  ],
  lsiKeywords: [
    'How to create lip sync videos',
    'AI video dubbing tutorial',
    'Audio video synchronization steps',
    'Wav2Lip video tutorial',
    'AI mouth movement generator',
    'HD video lip sync export',
  ],
  faqs: [
    {
      question: 'How long does it take to render a lip sync video?',
      answer:
        'Most 10 to 30 second video clips are processed within 15 to 45 seconds on our cloud GPUs.',
    },
    {
      question: 'Can I upload videos with multiple speakers?',
      answer:
        'Our model automatically detects the primary forward-facing face in the frame and applies lip sync to the main speaker.',
    },
  ],
};

export default function HowToUseLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
