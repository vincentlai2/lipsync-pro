import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Free Photo to Lip Sync Video Generator Online (Talking Photos)',
  description:
    'Animate static pictures into talking AI avatars for free online. Upload portraits, test preset speech tracks, and export high-definition videos.',
  pathname: '/photo-to-lip-sync/free',
});

const content: ClusterPageContent = {
  title: 'Free Photo to Lip Sync Generator Online',
  badge: 'Free Trial',
  description:
    'Test photo-to-lip-sync online without paying upfront. Make pictures talk using welcome credits and instant demo samples.',
  pillarTitle: 'Photo to Lip Sync',
  pillarRoute: '/photo-to-lip-sync',
  sections: [
    {
      heading: 'Free Talking Photo Animation Online',
      subheading: 'Instant Web Tool',
      content: [
        'LipSync.pro gives you free welcome credits to turn still photos into speaking videos instantly in your browser.',
      ],
    },
  ],
  lsiKeywords: [
    'Free photo to lip sync online',
    'Make photo talk free',
    'Free talking avatar generator',
    'Animate portrait free online',
  ],
  faqs: [
    {
      question: 'Do free talking photos expire?',
      answer:
        'No! Generated videos are stored in your account history so you can download them anytime.',
    },
  ],
};

export default function FreePhotoToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
