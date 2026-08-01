import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Free AI Lip Sync Video Generator Online (No Watermark Trial)',
  description:
    'Try AI Lip Sync for free online without installing software. Get instant test credits to generate lip-synchronized videos with real-time phoneme matching.',
  pathname: '/lip-sync-ai/free',
});

const content: ClusterPageContent = {
  title: 'Free AI Lip Sync Generator Online — Trial & Credit Allowance',
  badge: 'Free Trial & Credits',
  description:
    'Start generating realistic AI lip sync videos for free. Test our instant 1-click sample demo, explore preset audio tracks, and receive free welcome credits upon signing up.',
  pillarTitle: 'AI Lip Sync',
  pillarRoute: '/lip-sync-ai',
  sections: [
    {
      heading: 'How to Access Free AI Lip Sync Generation',
      subheading: 'No Credit Card Required',
      content: [
        'LipSync.pro offers free welcome credits to every new creator so you can test our high-definition lip sync engine before purchasing credits or upgrading to a subscription.',
        'You can also try our ⚡ Instant 1-Click Demo Sample directly inside the upload dropzone without uploading your own files.',
      ],
      bulletPoints: [
        'Free Welcome Credits: Test video generation upon account creation.',
        'Instant Demo Presets: One-click trial with sample video and voice files.',
        'No Software Install: Process videos directly in your browser.',
        'Pay-As-You-Go Credit Packs: Upgrade seamlessly when you need more rendering time.',
      ],
    },
    {
      heading: 'What You Can Build with Free Credits',
      subheading: 'Creation Possibilities',
      content: [
        'Free credits allow you to test multilingual video dubbing, transform portrait photos into talking avatars, and test text-to-speech synchronization across short video clips.',
      ],
    },
  ],
  lsiKeywords: [
    'Free AI lip sync online',
    'Free Wav2Lip trial',
    'No watermark lip sync generator',
    'AI video dubbing free online',
    'Free credits lip sync software',
  ],
  faqs: [
    {
      question: 'Do free videos contain a heavy watermark?',
      answer:
        'Free trial outputs are generated in high quality so you can accurately evaluate lip synchronization precision.',
    },
    {
      question: 'How do I claim additional credits?',
      answer:
        'You can purchase pay-as-you-go credit packs starting at $9.90 for 200 Credits (over 100 seconds of video processing) on our Pricing page.',
    },
  ],
};

export default function FreeLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
