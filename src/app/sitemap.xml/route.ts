import { websiteConfig } from '@/config/website';
import { getLocalePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { generateHreflangUrls } from '@/lib/hreflang';
import { getAllArticles } from '@/lib/articles';
import { getBaseUrl } from '@/lib/urls/urls';

export const revalidate = 3600; // Hourly ISR cache revalidation

const dynamicContentArticles = getAllArticles(false).map(
  (a) => `/learn/${a.slug}`
);

const staticRoutes = [
  '/',
  '/lip-sync-ai',
  '/lip-sync-ai/what-is',
  '/lip-sync-ai/how-to-use',
  '/lip-sync-ai/free',
  '/lip-sync-ai/applications',
  '/lip-sync-ai/vs-traditional-dubbing',
  '/lip-sync-ai/phoneme-viseme-matching-guide',
  '/text-to-lip-sync',
  '/text-to-lip-sync/what-is',
  '/text-to-lip-sync/how-to-use',
  '/text-to-lip-sync/free',
  '/text-to-lip-sync/examples',
  '/text-to-lip-sync/script-writing-tips',
  '/text-to-lip-sync/voice-selection-guide',
  '/photo-to-lip-sync',
  '/photo-to-lip-sync/what-is',
  '/photo-to-lip-sync/how-to-use',
  '/photo-to-lip-sync/free',
  '/photo-to-lip-sync/examples',
  '/photo-to-lip-sync/portrait-image-optimization',
  '/photo-to-lip-sync/virtual-avatar-marketing',
  '/pricing',
  '/contact',
  '/privacy',
  '/terms',
  '/cookie',
  '/learn',
  '/learn/best-ai-lip-sync-tools',
  '/learn/ai-video-localization-guide-2026',
  '/learn/how-faceless-youtube-channels-use-ai-avatars',
  '/learn/multilingual-elearning-video-dubbing',
  '/learn/ai-avatar-copyright-ethics-best-practices',
  '/learn/video-re-dubbing-workflow-optimization',
  ...dynamicContentArticles,
];

export async function GET() {
  const baseUrl = getBaseUrl();
  const articles = getAllArticles(false);
  const nowIso = new Date().toISOString();

  const urlEntries: { url: string; lastmod: string }[] = [];

  // Add all static and dynamic routes with locale handling
  staticRoutes.forEach((route) => {
    routing.locales.forEach((locale) => {
      const pathname = getLocalePathname({ locale, href: route as any });
      urlEntries.push({
        url: `${baseUrl}${pathname}`,
        lastmod: nowIso,
      });
    });
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
