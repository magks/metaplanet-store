// app/[locale]/page.tsx
import { Carousel } from '@/components/shared/carousel';
import { ThreeItemGrid } from '@/components/shared/grid/three-items';
import { HomePageHeroSelector } from '@/components/shared/heroes/home-page-hero-selector';
import appSettings from '@/lib/app-settings';
import Footer from 'components/shared/layout/footer';

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
      <HomePageHeroSelector theme={appSettings.siteTheme} />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
