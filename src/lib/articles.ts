import fs from 'node:fs';
import path from 'node:path';

export interface ArticleFeature {
  title: string;
  description: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleMetadata {
  slug: string;
  publishedAt: string; // ISO date format "YYYY-MM-DD"
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
  heroTitle?: string;
  heroSubtitle?: string;
  overviewTitle?: string;
  overviewParagraphs?: string[];
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: ArticleFeature[];
  diagramTitle?: string;
  diagramSubtitle?: string;
  faqs?: ArticleFAQ[];
  author?: string;
  description?: string;
  lsiKeywords?: string[];
  ctaText?: string;
  pathname?: string;
  sections?: {
    heading: string;
    subheading?: string;
    content: string[];
    bulletPoints?: string[];
  }[];
}

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

/**
 * Get all articles from content/articles directory.
 * If includeFuture is false, filters out articles where publishedAt > today.
 */
export function getAllArticles(includeFuture = false): ArticleMetadata[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(ARTICLES_DIR);
  const now = new Date();

  const articles: ArticleMetadata[] = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(ARTICLES_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContents) as ArticleMetadata;
      return data;
    })
    .filter((article) => {
      if (includeFuture) return true;
      const pubDate = new Date(article.publishedAt);
      return pubDate <= now;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return articles;
}

/**
 * Get single article by slug.
 * Returns null if article is not published yet (unless includeFuture is true).
 */
export function getArticleBySlug(
  slug: string,
  includeFuture = false
): ArticleMetadata | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const article = JSON.parse(fileContents) as ArticleMetadata;

  if (!includeFuture) {
    const pubDate = new Date(article.publishedAt);
    if (pubDate > new Date()) {
      return null;
    }
  }

  return article;
}
