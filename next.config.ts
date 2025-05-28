
/*
export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
*/

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const brand = process.env.NEXT_PUBLIC_THEME_NAME || 'default';
const nextConfig: NextConfig =  {}
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({

  distDir: `.next-${brand}`,
  transpilePackages: ["geist"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
    turbo: { 
    resolveAlias: {
      'next-intl/config': '@/i18n/request.ts'
    }
  },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
});
