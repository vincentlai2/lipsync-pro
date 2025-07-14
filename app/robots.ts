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
        ],
      },
      // Major search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/private/', '/admin/', '/not-found', '/error', '/api/waitlist'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/private/', '/admin/', '/not-found', '/error', '/api/waitlist'],
        crawlDelay: 1,
      },
      // AI Training Crawlers - Block for data protection
      {
        userAgent: [
          'GPTBot',           // OpenAI
          'Claude-Web',       // Anthropic
          'ChatGPT-User',     // OpenAI ChatGPT
          'CCBot',            // Common Crawl (used by many AI companies)
          'anthropic-ai',     // Anthropic
          'Claude-Web',       // Anthropic Claude
          'PerplexityBot',    // Perplexity AI
          'YouBot',           // You.com
          'ChatGPT-User',     // OpenAI
          'Google-Extended',  // Google Bard training
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