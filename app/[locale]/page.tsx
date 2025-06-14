// app/[locale]/page.tsx
import { Carousel } from '@/components/shared/carousel';
import { ThreeItemGrid } from '@/components/shared/grid/three-items';
import { HomePageHeroSelector } from '@/components/shared/heroes/home-page-hero-selector';
import { NavbarConditional } from '@/components/shared/navigation/navbar-conditional';
import SiteSwitcher from '@/components/shared/navigation/navbars/banner/site-switcher';
import { SiteSwitcherConditional } from '@/components/shared/navigation/navbars/banner/site-switcher-conditional';
import { UniversalNavbar } from '@/components/shared/navigation/navbars/universal-navbar';
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
  const isMetaplanet = appSettings.siteTheme === 'metaplanet';
  if (isMetaplanet) {
    return (
      <>
      <NavbarConditional>
        <UniversalNavbar 
          pathname={"/"} 
          theme={appSettings.siteTheme} 
        />
      </NavbarConditional>
      <div>
        <div className="relative">
          <HomePageHeroSelector theme={appSettings.siteTheme} />
          {/* Gradient overlay at top */}
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-top from-transparent to-black/35" />
          {/* SiteThemeSwitcher positioned on top */}
          <div className="absolute top-0 right-0  z-55">
            <SiteSwitcherConditional>
              <SiteSwitcher />
            </SiteSwitcherConditional>
          </div>
        </div>
        <ThreeItemGrid />
      </div>
      <Carousel />
      <Footer />
      </>
    );
  }

  return (
    <>
      <div>
        <SiteSwitcherConditional>
          <SiteSwitcher />
        </SiteSwitcherConditional>
        <NavbarConditional>
          <UniversalNavbar 
            pathname={"/"} 
            theme={appSettings.siteTheme} 
          />
        </NavbarConditional>

      </div>
      <div>
        <HomePageHeroSelector theme={appSettings.siteTheme} />
        <ThreeItemGrid />
      </div>
      <Carousel />
      <Footer />
    </>
  );
}
