import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'How to Write AI Video Scripts for Natural Text to Speech Lip Sync',
  description:
    'Master scriptwriting techniques optimized for text-to-speech AI avatars. Learn how punctuation, cadence markers, and phonetic spelling create human-like video dialogue.',
  pathname: '/text-to-lip-sync/script-writing-tips',
});

const content: ClusterPageContent = {
  title: 'How to Write AI Video Scripts for Natural Text to Speech Lip Sync',
  badge: 'Scriptwriting',
  description:
    'Drafting scripts for AI video avatars requires a slightly different approach than writing traditional blog posts or print copy. Discover how to pace sentences, structure natural pauses, and use SSML cues for compelling visual avatars.',
  pillarTitle: 'Text to Lip Sync',
  pillarRoute: '/text-to-lip-sync',
  sections: [
    {
      heading: 'The Psychology of Scriptwriting for AI Avatars',
      subheading: 'Conversational Cadence',
      content: [
        'When humans read print text, we digest long compound sentences easily. However, when an AI presenter delivers dialogue on video, short punchy sentences create a much higher engagement rate.',
        'Proper script formatting gives neural TTS engines clean prosody (pitch and rhythm), which in turn feeds the facial generator natural mouth motion.',
      ],
      bulletPoints: [
        'Use Micro-Punctuation: Commas and ellipses create essential 200ms pauses for realistic breathing simulation.',
        'Spell Out Acronyms: Write "S-A-A-S" or "Sass" instead of "SaaS" if you want accurate phonetic pronunciation.',
        'Vary Sentence Lengths: Alternate 5-word statements with 12-word explanations to maintain viewer interest.',
      ],
    },
    {
      heading: 'Formatting Checklist for Text-to-Video Scripts',
      subheading: 'Best Practices',
      content: [
        'Rule 1: Write for the Ear, Not the Eye. Speak your script out loud before pasting it into the Text to Lip Sync generator. If you stumble over a phrase, simplify it.',
        'Rule 2: Emphasize Key Product Benefits. Place core value propositions at the start of paragraphs so the avatar delivers them with rising vocal inflection.',
      ],
    },
  ],
  lsiKeywords: [
    'AI video scriptwriting guide',
    'text to speech video copy tips',
    'avatar dialogue formatting',
    'natural TTS cadence script',
    'AI presenter voice script',
  ],
  faqs: [
    {
      question: 'How long should a Text to Lip Sync video script be?',
      answer:
        'For social media ads, aim for 60 to 130 words (approx. 30 to 60 seconds). For tutorial videos, 250 to 450 words provides ideal pacing.',
    },
    {
      question: 'Can I add pause breaks manually in the text script?',
      answer:
        'Yes! Adding commas, periods, or dash breaks (—) signals the neural TTS engine to insert natural pauses and facial resting frames.',
    },
  ],
};

export default function ScriptWritingTipsPage() {
  return <TopicClusterPage content={content} />;
}
