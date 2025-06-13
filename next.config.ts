
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
import appSettings from './lib/app-settings';
const nextConfig: NextConfig =  {}
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({

  distDir: `.next-${appSettings.brandId}`,
  transpilePackages: ["geist"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    //dynamicIO: true,
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
