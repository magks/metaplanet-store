import { Carousel } from '@/components/shared/carousel';
import { ThreeItemGrid } from '@/components/shared/grid/three-items';
import { HomePageHeroSelector } from '@/components/shared/heroes/home-page-hero-selector';
import appSettings from '@/lib/app-settings';
import Footer from 'components/shared/layout/footer';

import { spaceGrotesk } from 'styles/fonts';
export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
    <html  className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = '${appSettings.siteTheme || 'default'}';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      {/*<body className="bg-neutral-50 text-black selection:bg-teal-300 ignoredark:bg-neutral-900 ignoredark:text-white ignoredark:selection:bg-pink-500 ignoredark:selection:text-white">*/}
     <body suppressHydrationWarning>
      <HomePageHeroSelector theme={appSettings.siteTheme} />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
      </body>
      </html>
    </>
  );
}
