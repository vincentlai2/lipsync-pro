import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'What is Photo-to-Lip-Sync? Single Portrait Animation (EMO & Wav2Lip)',
  description:
    'Learn how photo-to-lip-sync technology transforms static single-frame portraits into realistic speaking videos. Neural head animation, gaze control, and emotion mapping.',
  pathname: '/photo-to-lip-sync/what-is',
});

const content: ClusterPageContent = {
  title: 'What is Photo to Lip Sync? Single Image Talking Avatars',
  badge: 'What is Photo to Lip Sync',
  description:
    'Photo to Lip Sync converts any still portrait image, historical photograph, or digital artwork into an expressive, speaking video. Discover how neural models generate head motion, eye blinks, and lip synchronization from a single input photo.',
  pillarTitle: 'Photo to Lip Sync',
  pillarRoute: '/photo-to-lip-sync',
  sections: [
    {
      heading: 'Understanding Photo-to-Lip-Sync Technology',
      subheading: 'Single-Frame Image Animation',
      content: [
        'Unlike video-to-video lip sync which modifies an existing moving speaker, Photo-to-Lip-Sync animates a still 2D portrait photo from scratch. Using advanced models like EMO (Emote Portrait Alive) or image-to-video Wav2Lip extensions, neural networks predict 3D facial geometry, head movement, and lip visemes synchronized with vocal audio.',
      ],
      bulletPoints: [
        '3D Head Pose Synthesis: Generating subtle head turns, tilts, and natural gaze movements.',
        'Facial Expression Dynamics: Expressing emotion, eye blinks, and eyebrow raises in harmony with speech cadence.',
        'Legacy Photo Restoration: Animating historic family portraits or artwork with lifelike voices.',
      ],
    },
  ],
  lsiKeywords: [
    'Photo to lip sync explained',
    'Single photo avatar animation',
    'EMO portrait model',
    'Talking photo AI generator',
    'Animate static portrait with audio',
  ],
  faqs: [
    {
      question: 'What types of photos work best for Photo-to-Lip-Sync?',
      answer:
        'Front-facing portraits with clear lighting, unblocked mouths, and sharp resolution work best.',
    },
  ],
};

export default function WhatIsPhotoToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
