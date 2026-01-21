import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/private/', 
          '/admin/', 
          '/_next/webpack-hmr', 
          '/not-found', 
          '/error',
          '/api/waitlist',  // Protect form submission endpoint
          '/*?*utm_*',      // Block UTM tracking parameters
          '/search',        // Block internal search if exists
          '/tmp/',          // Block temporary files
          '/*.backup',      // Block backup files
          '/*.bak',         // Block backup files
          '/*.tmp',         // Block temporary files
          '/*.log',         // Block log files
        ],
      },
      // Major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/private/', '/admin/', '/not-found', '/error', '/api/waitlist', '/*?*utm_*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/private/', '/admin/', '/not-found', '/error', '/api/waitlist', '/*?*utm_*'],
        crawlDelay: 1,
      },
      // AI Search Engines - Allow (they cite sources and drive traffic)
      {
        userAgent: [
          'GPTBot',           // OpenAI GPT - training and knowledge
          'PerplexityBot',    // Perplexity AI - good for citations
          'YouBot',           // You.com - search engine
          'Google-Extended',  // Google Bard - important for Google ecosystem
          'Claude-Web',       // Anthropic Claude - good for citations and research
        ],
        allow: '/',
        disallow: ['/api/', '/admin/', '/not-found', '/error'],
        crawlDelay: 2,
      },
      // AI Training Crawlers - Block to protect content
      {
        userAgent: [
          'ChatGPT-User',     // OpenAI ChatGPT user browsing (block training)
          'CCBot',            // Common Crawl (used by many AI companies)
          'anthropic-ai',     // Anthropic training
          'AI2Bot',           // Allen Institute for AI
          'Meta-ExternalAgent', // Meta AI training
          'Meta-ExternalFetcher', // Meta AI training
          'OAI-SearchBot',    // OpenAI Search
          'Omgilibot',        // Omgili crawler
          'Diffbot',          // Diffbot AI
          'Scrapy',           // Scrapy framework
          'python-requests',  // Python requests (often used by scrapers)
          'Bytespider',       // ByteDance AI
          'img2dataset',      // Image dataset creation
          'DataForSeoBot',    // DataForSeo
        ],
        disallow: '/',
      },
      // Social media crawlers (allow for sharing)
      {
        userAgent: [
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'WhatsApp',
          'TelegramBot',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://lipsync.pro/sitemap.xml',
    host: 'https://lipsync.pro',
  }
}