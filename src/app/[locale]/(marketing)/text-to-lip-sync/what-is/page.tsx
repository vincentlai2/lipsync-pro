import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'What is Text-to-Lip-Sync? Text-Driven Video Animation Explained',
  description:
    'Learn how Text-to-Lip-Sync converts raw text scripts into synthesized voiceover and animated lip movements. Pipeline combining neural TTS and viseme generation.',
  pathname: '/text-to-lip-sync/what-is',
});

const content: ClusterPageContent = {
  title: 'What is Text-to-Lip-Sync? Text-Driven Neural Video Generation',
  badge: 'What is Text-to-Lip-Sync',
  description:
    'Text-to-Lip-Sync combines Text-to-Speech (TTS) voice synthesis with audio-driven video lip sync. Type any script in plain text, choose an AI voice actor, and automatically animate speaker lips in perfect synchrony.',
  pillarTitle: 'Text to Lip Sync',
  pillarRoute: '/text-to-lip-sync',
  sections: [
    {
      heading: 'Understanding Text-to-Lip-Sync Technology',
      subheading: 'From Typed Script to Speaking Video',
      content: [
        'Text-to-Lip-Sync streamlines video creation by eliminating the need for audio recording hardware or professional voice actors. The pipeline converts written text into high-fidelity speech audio, extracts acoustic features, and aligns mouth shape visemes automatically onto target video frames.',
      ],
      bulletPoints: [
        'Neural TTS Integration: Natural-sounding human voices with proper cadence, emphasis, and pitch.',
        'Automatic Phoneme Timing: Converting written words directly into audio-video synchronization timecodes.',
        'Zero Voice Recording Required: Ideal for creators without studio microphonic setups.',
      ],
    },
  ],
  lsiKeywords: [
    'Text to lip sync explained',
    'Text driven facial animation',
    'TTS to lip synchronization',
    'Text to video lip sync generator',
    'Script to speech video synthesis',
  ],
  faqs: [
    {
      question: 'Which languages are supported in Text-to-Lip-Sync?',
      answer:
        'Over 40 languages are supported, including English, French, Japanese, German, Spanish, Mandarin, and Arabic.',
    },
  ],
};

export default function WhatIsTextToLipSyncPage() {
  return <TopicClusterPage content={content} />;
}
