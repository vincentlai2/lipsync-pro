import { TopicClusterPage } from '@/components/seo/topic-cluster-page';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const articles = getAllArticles(false);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata | undefined> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, false);

  if (!article) {
    return undefined;
  }

  return constructMetadata({
    title: `${article.title} | LipSync.pro`,
    description: article.subtitle,
    locale,
    pathname: `/learn/${slug}`,
  });
}

export default async function DynamicArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, false);

  if (!article) {
    notFound();
  }

  return <TopicClusterPage content={article} />;
}
