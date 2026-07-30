import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  // Docker standalone output
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),

  /* config options here */
  devIndicators: false,

  // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
  // Remove all console.* calls in production only
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  serverExternalPackages: ['@ffmpeg-installer/ffmpeg'],

  // https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots
  // This config allows you to specify a list of user agents that should receive
  // blocking metadata instead of streaming metadata
  htmlLimitedBots: /.*/,

  images: {
    // https://vercel.com/docs/image-optimization/managing-image-optimization-costs#minimizing-image-optimization-costs
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    // vercel has limits on image optimization, 1000 images per month
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATION === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.mksaas.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'html.tailus.io',
      },
      {
        protocol: 'https',
        hostname: 'service.firecrawl.dev',
      },
    ],
  },
  async rewrites() {
    return [
      // Rewrite markdown requests to llms.mdx route
      // All markdownUrl includes locale prefix (e.g., /en/docs/xxx.mdx)
      {
        source: '/:locale/docs/:path*.mdx',
        destination: '/:locale/docs/llms.mdx/:path*',
      },
    ];
  },
  async redirects() {
    const baseRedirects = [
      '/docs/:path*',
      '/changelog',
      '/roadmap',
      '/waitlist',
      '/test',
    ].map((source) => ({
      source,
      destination: '/',
      permanent: false,
    }));

    return [
      ...baseRedirects,
      {
        source: '/alternative-wav2lip',
        destination: '/ai-lip-sync-vs-traditional-dubbing',
        permanent: true,
      },
      {
        source: '/comment-utiliser-wav2lip',
        destination: '/how-to-create-lip-sync-videos',
        permanent: true,
      },
      {
        source: '/qu-est-ce-que-wav2lip',
        destination: '/what-is-ai-lip-sync',
        permanent: true,
      },
      {
        source: '/wav2lip-en-ligne-vs-local',
        destination: '/ai-lip-sync-vs-traditional-dubbing',
        permanent: true,
      },
      {
        source: '/wav2lip-google-colab',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/prix-wav2lip',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/wav2lip-en-ligne',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/wav2lip-gratuit',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/wav2lip-pro',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/wav2lip-en-ligne/:path+',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/en/wav2lip-en-ligne',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/en/wav2lip-en-ligne/:path+',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/en/comment-utiliser-wav2lip',
        destination: '/how-to-create-lip-sync-videos',
        permanent: true,
      },
      {
        source: '/en/qu-est-ce-que-wav2lip',
        destination: '/what-is-ai-lip-sync',
        permanent: true,
      },
      {
        source: '/en/wav2lip-en-ligne-vs-local',
        destination: '/ai-lip-sync-vs-traditional-dubbing',
        permanent: true,
      },
      {
        source: '/en/wav2lip-google-colab',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/en/prix-wav2lip',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/lipsync-ai',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/ai-lip-sync',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/blog/:path+',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ai-lip-sync-guide',
        destination: '/how-to-create-lip-sync-videos',
        permanent: true,
      },
      {
        source: '/ai-lip-sync-for-elearning',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/ai-lip-sync-for-social-media',
        destination: '/lip-sync-ai',
        permanent: true,
      },
      {
        source: '/corporate-training',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/cultural-adaptation-tips',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/measuring-localization-success',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/video-localization-best-practices',
        destination: '/video-translation-dubbing',
        permanent: true,
      },
      {
        source: '/author/lipsync-team',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

/**
 * You can specify the path to the request config file or use the default one (@/i18n/request.ts)
 *
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#next-config
 */
const withNextIntl = createNextIntlPlugin();

/**
 * https://fumadocs.dev/docs/ui/manual-installation
 * https://fumadocs.dev/docs/mdx/plugin
 */
const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
