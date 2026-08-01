import fs from 'node:fs';
import path from 'node:path';

interface ArticleData {
  slug: string;
  publishedAt: string;
  category:
    | 'lip-sync-ai'
    | 'text-to-lip-sync'
    | 'photo-to-lip-sync'
    | 'general-strategy';
  pillarRoute: string;
  pillarTitle: string;
  badge: string;
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: { title: string; description: string }[];
  diagramTitle: string;
  diagramSubtitle: string;
  faqs: { question: string; answer: string }[];
}

const geoTargets = [
  { city: 'Tokyo', country: 'Japan', lang: 'Japanese', code: 'JP' },
  { city: 'London', country: 'UK', lang: 'English', code: 'UK' },
  { city: 'Paris', country: 'France', lang: 'French', code: 'FR' },
  { city: 'Berlin', country: 'Germany', lang: 'German', code: 'DE' },
  { city: 'Seoul', country: 'South Korea', lang: 'Korean', code: 'KR' },
  { city: 'Sao Paulo', country: 'Brazil', lang: 'Portuguese', code: 'BR' },
  { city: 'Madrid', country: 'Spain', lang: 'Spanish', code: 'ES' },
  { city: 'Sydney', country: 'Australia', lang: 'English', code: 'AU' },
  { city: 'Toronto', country: 'Canada', lang: 'English', code: 'CA' },
  { city: 'Singapore', country: 'Singapore', lang: 'English', code: 'SG' },
  { city: 'Amsterdam', country: 'Netherlands', lang: 'Dutch', code: 'NL' },
  { city: 'Stockholm', country: 'Sweden', lang: 'Swedish', code: 'SE' },
  { city: 'Dubai', country: 'UAE', lang: 'Arabic', code: 'AE' },
  { city: 'Mumbai', country: 'India', lang: 'Hindi', code: 'IN' },
  { city: 'Mexico City', country: 'Mexico', lang: 'Spanish', code: 'MX' },
];

const scenarios = [
  {
    name: 'E-Commerce Virtual Spokesperson',
    category: 'photo-to-lip-sync' as const,
    pillarRoute: '/photo-to-lip-sync',
    pillarTitle: 'Photo to Lip Sync',
    badge: 'E-Commerce Avatar',
    lsi: [
      'portrait headshot animation',
      'talking photo presenter',
      'product demo avatar',
      'convert image to speaking video',
    ],
  },
  {
    name: 'Faceless YouTube Shorts & TikTok',
    category: 'text-to-lip-sync' as const,
    pillarRoute: '/text-to-lip-sync',
    pillarTitle: 'Text to Lip Sync',
    badge: 'Social Media Automation',
    lsi: [
      'script to avatar video',
      'text-to-speech alignment',
      'faceless channel growth',
      'viral video generation',
    ],
  },
  {
    name: 'Multilingual E-Learning Academy',
    category: 'lip-sync-ai' as const,
    pillarRoute: '/lip-sync-ai',
    pillarTitle: 'Lip Sync AI',
    badge: 'E-Learning Localization',
    lsi: [
      'video re-dubbing',
      'phoneme-viseme precision',
      'educational video localization',
      'course dubbing workflow',
    ],
  },
  {
    name: 'Corporate Compliance & HR Training',
    category: 'general-strategy' as const,
    pillarRoute: '/learn',
    pillarTitle: 'Learn Academy',
    badge: 'Enterprise Training',
    lsi: [
      'corporate video dubbing',
      'multi-region compliance video',
      'AI presenter scaling',
      'training video localization',
    ],
  },
  {
    name: 'Podcast Video Re-Dubbing & Global Syndication',
    category: 'lip-sync-ai' as const,
    pillarRoute: '/lip-sync-ai',
    pillarTitle: 'Lip Sync AI',
    badge: 'Podcast Dubbing',
    lsi: [
      'vocal audio re-alignment',
      'spectrogram viseme matching',
      'podcast translation',
      'lip sync jitter reduction',
    ],
  },
  {
    name: 'Real Estate Virtual Property Presenters',
    category: 'photo-to-lip-sync' as const,
    pillarRoute: '/photo-to-lip-sync',
    pillarTitle: 'Photo to Lip Sync',
    badge: 'Real Estate Video',
    lsi: [
      'agent portrait animation',
      'listing tour narrator',
      '2D image talking video',
      'headshot to vocal presenter',
    ],
  },
];

const articlesDir = path.join(process.cwd(), 'content', 'articles');

if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

const startDate = new Date('2026-08-02T00:00:00Z');
const totalDays = 90;

let generatedCount = 0;

for (let i = 0; i < totalDays; i++) {
  const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  const dateIso = currentDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
  const publishedAt = `${dateIso}T00:00:00Z`;

  const geo = geoTargets[i % geoTargets.length];
  const scenario = scenarios[i % scenarios.length];

  const slug = `ai-lip-sync-${scenario.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${geo.city.toLowerCase()}-${dateIso}`;

  const articleData: ArticleData = {
    slug,
    publishedAt,
    category: scenario.category,
    pillarRoute: scenario.pillarRoute,
    pillarTitle: scenario.pillarTitle,
    badge: `${geo.city} ${scenario.badge}`,
    title: `AI Lip Sync for ${scenario.name} in ${geo.city}, ${geo.country} (${geo.lang} Localization)`,
    subtitle: `Learn how marketing teams in ${geo.city} leverage neural audio-viseme alignment and ${scenario.lsi[0]} to scale ${scenario.name} in ${geo.lang}.`,
    heroTitle: `AI Lip Sync for ${scenario.name} (${geo.city})`,
    heroSubtitle: `Streamline video localization, reduce dubbing costs, and maximize viewer engagement in ${geo.country} with automated lip synchronization.`,
    overviewTitle: `The ${geo.city} Market: Scaling ${scenario.name}`,
    overviewParagraphs: [
      `Producing high-impact video content for audiences in ${geo.city}, ${geo.country} requires flawless visual and vocal alignment. Traditional dubbing often suffers from noticeable lip desync, reducing viewer retention and brand credibility in the ${geo.lang}-speaking market.`,
      `By deploying automated AI lip synchronization powered by neural viseme alignment (${scenario.lsi[1]}), creators and agencies in ${geo.city} can instantly adapt native ${geo.lang} audio tracks to existing video footage without costly reshoots.`,
    ],
    featuresTitle: `Technical Capabilities for ${scenario.name}`,
    featuresSubtitle: `Optimized for ${scenario.lsi[2]} and sub-frame precision.`,
    features: [
      {
        title: `Sub-Frame ${geo.lang} Phoneme Matching`,
        description: `Neural acoustic models map ${geo.lang} phonetic structures directly to facial landmark visemes for seamless lip movement.`,
      },
      {
        title: `${scenario.lsi[3].toUpperCase()} Workflow`,
        description: `Batch-process video assets via REST API or browser studio, ensuring enterprise-grade scalability for ${geo.city} production teams.`,
      },
      {
        title: 'Zero Lower-Face Blurring & Artifact Protection',
        description:
          'Advanced temporal smoothing protects skin textures, facial lighting, and background stability across all HD exports.',
      },
    ],
    diagramTitle: `${geo.city} ${scenario.name} Audio-Viseme Pipeline`,
    diagramSubtitle: `Acoustic spectrograph matching paired with automated facial landmark alignment.`,
    faqs: [
      {
        question: `How does LipSync.pro handle ${geo.lang} audio alignment?`,
        answer: `LipSync.pro utilizes deep neural viseme models trained on multilingual spectrographs, guaranteeing precise mouth synchronization for ${geo.lang} vocal tracks.`,
      },
      {
        question: `Can studios in ${geo.city} try LipSync.pro for free?`,
        answer: `Yes! LipSync.pro offers free complimentary processing credits for all new registered accounts to test video alignment online.`,
      },
    ],
  };

  const filePath = path.join(articlesDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2), 'utf-8');
  generatedCount++;
}

console.log(
  `🎉 Successfully generated ${generatedCount} daily articles covering 90 days (2026-08-02 to 2026-10-30)!`
);
