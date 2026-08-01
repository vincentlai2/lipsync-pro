import { constructMetadata } from '@/lib/metadata';
import {
  TopicClusterPage,
  type ClusterPageContent,
} from '@/components/seo/topic-cluster-page';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title:
    'Best Photo Lighting & Angle Practices for High-Quality Talking Portraits',
  description:
    'Optimize your source photos for stunning Photo-to-Lip-Sync rendering. Learn image framing, lighting setups, resolution specs, and landmark alignment guidelines.',
  pathname: '/photo-to-lip-sync/portrait-image-optimization',
});

const content: ClusterPageContent = {
  title:
    'Best Photo Lighting & Angle Practices for High-Quality Talking Portraits',
  badge: 'Photo Prep',
  description:
    'The quality of your photo avatar depends heavily on input image specs. Discover how front-facing lighting, neutral facial expressions, and un-occluded mouth framing produce ultra-realistic portrait animation.',
  pillarTitle: 'Photo to Lip Sync',
  pillarRoute: '/photo-to-lip-sync',
  sections: [
    {
      heading: 'The 4 Golden Rules of Source Photo Selection',
      subheading: 'Image Pre-processing Guidelines',
      content: [
        'Neural facial animation algorithms analyze facial keypoints (eyes, nose, mouth contours). Providing a clear, high-resolution front-facing headshot ensures accurate keypoint tracking and distortion-free synthesis.',
      ],
      bulletPoints: [
        'Rule 1: Direct Frontal Angle (0° to 15° Tilt). Avoid extreme side profiles or high-angle selfies.',
        'Rule 2: Closed-Lip Neutral Expression. A closed, relaxed mouth allows the neural Viseme generator to open and close lips naturally.',
        'Rule 3: Soft, Even Lighting. Avoid harsh side shadows across the lower jawline or mouth.',
        'Rule 4: HD Resolution (1024x1024 Minimum). Crisp pixel density prevents visual artifacts around teeth.',
      ],
    },
    {
      heading: 'Common Mistakes to Avoid',
      subheading: 'Troubleshooting Occlusions',
      content: [
        'Avoid images where fingers, microphones, hair strands, or dark sunglasses cover the lips or chin. Unobstructed lower face regions yield 100% realistic animation.',
      ],
    },
  ],
  lsiKeywords: [
    'photo to lip sync source image guide',
    'talking photo avatar portrait requirements',
    'facial landmark detection photo prep',
    'AI avatar lighting tips',
  ],
  faqs: [
    {
      question:
        'Can I use AI-generated Midjourney or Stable Diffusion portraits?',
      answer:
        'Absolutely! High-resolution AI-generated portrait images work spectacularly well with Photo-to-Lip-Sync.',
    },
  ],
};

export default function PortraitImageOptimizationPage() {
  return <TopicClusterPage content={content} />;
}
