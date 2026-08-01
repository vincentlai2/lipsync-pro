import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Free Text to Lip Sync Video Generator Online (No Download)',
  description:
    'Try Text to Lip Sync for free online. Generate video speech from text scripts using natural AI voices and sub-frame lip synchronization.',
  pathname: '/text-to-lip-sync/free',
});

const content: ClusterPageContent = {
  title: 'Free Text to Lip Sync Generator Online',
  badge: 'Free Trial',
  description:
    'Test Text-to-Lip-Sync online without paying upfront. Convert short scripts into natural speaking videos with welcome credits.',
  pillarTitle: 'Text to Lip Sync',
  pillarRoute: '/text-to-lip-sync',
  sections: [
    {
      heading: 'Free Text-to-Speech & Lip Sync Testing',
      subheading: 'Instant Web Generator',
      content: [
        'LipSync.pro lets you test text-driven video animation directly in your web browser. Write custom scripts, pick AI voice models, and render videos instantly.',
      ],
    },
  ],
  lsiKeywords: [
    'Free text to lip sync',
    'Free script to video generator',
    'Text to speech lip sync online free',
  ],
  faqs: [
    {
      question: 'Is there a limit on text length in the free trial?',
      answer:
        'Free trial credits allow testing short scripts up to 100 characters per clip.',
    },
  ],
};

export default function FreeTextToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
