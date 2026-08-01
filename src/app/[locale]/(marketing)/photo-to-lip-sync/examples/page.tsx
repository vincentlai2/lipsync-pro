import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Photo to Lip Sync Examples & Talking Portrait Showcase',
  description:
    'Browse talking photo video examples. Historical portrait animations, AI digital avatar showcases, and spokesperson video samples.',
  pathname: '/photo-to-lip-sync/examples',
});

const content: ClusterPageContent = {
  title: 'Photo to Lip Sync Video Showcase & Examples',
  badge: 'Gallery & Demos',
  description:
    'See what is possible with photo animation. Explore historical portrait revivals, AI avatar presentations, and creative video marketing examples.',
  pillarTitle: 'Photo to Lip Sync',
  pillarRoute: '/photo-to-lip-sync',
  sections: [
    {
      heading: '1. Historical Portrait Revivals',
      subheading: 'Bringing History to Life',
      content: [
        'Classic historical portraits animated with archival speech audio, delivering immersive storytelling experiences for museums and documentaries.',
      ],
    },
    {
      heading: '2. Virtual AI Spokespersons',
      subheading: 'Brand Ambassadors',
      content: [
        'AI-generated character portraits powered by text-to-speech to deliver marketing announcements across social channels.',
      ],
    },
  ],
  lsiKeywords: [
    'Photo to lip sync examples',
    'Talking photo sample gallery',
    'AI avatar video showcase',
    'Animate historic picture examples',
  ],
  faqs: [
    {
      question: 'Can I upload full-body photos or only close-ups?',
      answer:
        'Close-up and upper-body portraits yield the highest quality facial animation.',
    },
  ],
};

export default function ExamplesPhotoToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
