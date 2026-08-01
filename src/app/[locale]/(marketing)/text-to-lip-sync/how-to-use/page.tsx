import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'How to Convert Text to Lip Sync Video: Creator Guide',
  description:
    'Step-by-step guide to generating lip-synced videos from text scripts. Select AI voices, fine-tune text prompts, and render lip-synced videos in minutes.',
  pathname: '/text-to-lip-sync/how-to-use',
});

const content: ClusterPageContent = {
  title: 'How to Convert Text Script to Lip Sync Video',
  badge: 'Text-to-Lip-Sync Guide',
  description:
    'Generate video voiceovers directly from written scripts. Follow this step-by-step tutorial to select natural AI voices and synthesize accurate lip sync videos.',
  pillarTitle: 'Text to Lip Sync',
  pillarRoute: '/text-to-lip-sync',
  sections: [
    {
      heading: 'Step 1: Enter Your Text Script',
      subheading: 'Script Preparation',
      content: [
        'Type or paste your dialogue into the text input prompt. Use punctuation (commas, periods, question marks) to control voice pauses and natural speech rhythm.',
      ],
    },
    {
      heading: 'Step 2: Select AI Voice & Language',
      subheading: 'Voice Customization',
      content: [
        'Choose from female, male, or neutral voice models across dozens of accents. Preview the voice synthesis before generating.',
      ],
    },
    {
      heading: 'Step 3: Upload Speaker Image or Video',
      subheading: 'Target Media Input',
      content: [
        'Upload your spokesperson video or portrait photo to serve as the visual presenter.',
      ],
    },
    {
      heading: 'Step 4: Generate & Export Video',
      subheading: 'Instant Cloud Rendering',
      content: [
        'Click Generate to synthesize speech and align mouth movements in 1080p HD.',
      ],
    },
  ],
  lsiKeywords: [
    'Text to lip sync tutorial',
    'Generate video from script',
    'Text to speech video animation guide',
    'AI voice text to lip sync',
  ],
  faqs: [
    {
      question: 'Can I adjust the speed of the AI voice?',
      answer:
        'Yes, you can configure speech rate and tone parameters within the Text-to-Speech settings panel.',
    },
  ],
};

export default function HowToUseTextToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
