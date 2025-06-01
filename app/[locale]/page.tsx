import { Carousel } from '@/components/shared/carousel';
import appSettings from '@/lib/app-settings';
import { ThreeItemGrid } from 'components/grid/three-items';
import { HomePageHeroSelector } from 'components/heroes/home-page-hero-selector';
import Footer from 'components/layout/footer';

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
