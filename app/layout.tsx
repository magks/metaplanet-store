// app/[locale]/layout.tsx
import { getFaviconConfig } from '@/lib/favicon-config';
// todo: fix false "has no imported member Geist{Mono|Sans}" error message in linter
//import { GeistMono } from 'geist/font/mono';
//import { GeistSans } from 'geist/font/sans';

import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';

// In your root layout or app entry
import '@/styles/globals.css';



// Conditionally import brand styles based on env var
if (process.env.NEXT_PUBLIC_BRAND_ID === 'metaplanet') {
  require('@/styles/brands/metaplanet/index.css');
  console.log(`importing brand styles for metaplanet`);
} else if (process.env.NEXT_PUBLIC_BRAND_ID === 'bmj') {
  require('@/styles/brands/bmj/index.css');
  console.log(`importing brand styles for bmj`);
}
console.log(`done conditionally setting styling `);


/*

const geist = Geist({
  subsets: ['latin'],
})*/

// i18n
import { headers } from 'next/headers';
const { SITE_NAME } = process.env;



// metadata
import type { Metadata, ResolvingMetadata } from 'next';
type MetadataProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const faviconConfig = getFaviconConfig();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: SITE_NAME!,
      template: `%s | ${SITE_NAME}`
    },
    robots: {
      follow: true,
      index: true
    },
    icons: {
      icon: [
        {
          url: faviconConfig.favicon,
          sizes: 'any',
        },
        {
          url: faviconConfig.icon,
          type: 'image/svg+xml',
        },
        {
          url: faviconConfig.iconSizes.small,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: faviconConfig.iconSizes.large,
          sizes: '512x512', 
          type: 'image/png',
        },
      ],
      apple: faviconConfig.appleTouchIcon,
    },
    manifest: faviconConfig.manifest,
  };
}


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {


  // Enable static rendering
 



  const cart = getCart().catch(() => undefined);

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  
  // Check if it's homepage
  //console.log(`rootLayout::x-pathname=${headersList.get('x-pathname') }`);
  //console.log(`rootLayout::settings.themeName=${appSettings.siteTheme}`)


  return children;
  
}
