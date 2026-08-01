import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'How to Make Photos Talk: Photo to Lip Sync Tutorial',
  description:
    'Complete guide on animating still pictures with vocal audio. Step-by-step instructions for uploading portraits, selecting audio, and generating talking photo videos.',
  pathname: '/photo-to-lip-sync/how-to-use',
});

const content: ClusterPageContent = {
  title: 'How to Animate Still Photos with Vocal Audio',
  badge: 'Photo Animation Tutorial',
  description:
    'Turn any portrait photo into a speaking AI avatar in 4 simple steps. Learn how to optimize portrait framing, lighting, and audio alignment for lifelike facial animation.',
  pillarTitle: 'Photo to Lip Sync',
  pillarRoute: '/photo-to-lip-sync',
  sections: [
    {
      heading: 'Step 1: Upload a Front-Facing Portrait',
      subheading: 'Photo Preparation',
      content: [
        'Upload a clear portrait picture (JPG, PNG, WEBM). Ensure the person face is unobstructed by sunglasses, hats, or hands.',
      ],
    },
    {
      heading: 'Step 2: Add Audio File or TTS Script',
      subheading: 'Speech Input',
      content: [
        'Upload your audio recording or type a text script to generate an AI voice track.',
      ],
    },
    {
      heading: 'Step 3: Select Photo Animation Mode',
      subheading: 'Retalk vs. EMO',
      content: [
        'Select Retalk for static head stability or EMO for full head movement and emotion.',
      ],
    },
    {
      heading: 'Step 4: Render & Download Talking Avatar',
      subheading: 'Export Video',
      content: [
        'Click Generate to watch your still photo come to life in 1080p video.',
      ],
    },
  ],
  lsiKeywords: [
    'How to make photo talk',
    'Animate picture with voice tutorial',
    'Talking photo generator guide',
    'AI photo lip sync steps',
  ],
  faqs: [
    {
      question: 'Can I animate digital illustrations or AI-generated artwork?',
      answer:
        'Yes! Midjourney, DALL-E, and Stable Diffusion portrait outputs work exceptionally well.',
    },
  ],
};

export default function HowToUsePhotoToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
