import appSettings from '@/lib/app-settings';
import { Carousel } from 'components/carousel';
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

// cartoon-shop-metaplanet-m-logo-bitcoin-b-shirts-hats-books-lg.png
export default function HomePage() {
  return (
    <>
      <HomePageHeroSelector theme={appSettings.siteTheme} />
      <div className="h-8 md:h-12 lg:h-16" />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
