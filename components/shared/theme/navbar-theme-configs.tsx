
// lib/theme-configs.tsx (New Theme Configuration System)
import { default as BMJMobileMenu } from '@/components/bmj/navigation/bmj-navbar/mobile-menu';
import { default as MetaplanetMobileMenu } from '@/components/metaplanet/navigation/metaplanet-navbar/mobile-menu';
import LogoSquare from '@/components/shared/logo-square';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import { ReactNode } from 'react';
;

export interface ThemeConfig {
  menuHandle: string;
  logoComponent: () => ReactNode;
  layout: 'bmj' | 'metaplanet' | 'custom';
  mobileMenuComponent: (props: { menu: Menu[] }) => ReactNode;
  customLayout?: (props: NavbarLayoutProps) => ReactNode;
}

export interface NavbarLayoutProps {
  logoComponent: ReactNode;
  searchComponent: ReactNode;
  menuComponent: ReactNode;
  cartComponent: ReactNode;
  settingsComponent: ReactNode;
  mobileMenuComponent: ReactNode;
}

// Theme configurations
export const themeConfigs: Record<string, ThemeConfig> = {
  bmj: {
    menuHandle: 'bmj-frontend-header-menu',
    logoComponent: () => (
      <Image
        src="/images/BM_Japan_White.webp"
        alt={`${process.env.SITE_NAME} Logo`}
        width={300}
        height={67}
        className="navbar-logo h-10 w-auto max-w-[150px] object-contain"
      />
    ),
    layout: 'bmj',
    mobileMenuComponent: ({ menu }) => <BMJMobileMenu menu={menu} />
  },
  
  metaplanet: {
    menuHandle: 'metaplanet-frontend-header-menu',
    logoComponent: () => <LogoSquare />,
    layout: 'metaplanet', 
    mobileMenuComponent: ({ menu }) => <MetaplanetMobileMenu menu={menu} />
  },
  

  /*
  // Example of how to add a new theme
  newtheme: {
    menuHandle: 'newtheme-frontend-header-menu',
    logoComponent: () => (
      <Image
        src="/images/newtheme-logo.webp"
        alt="New Theme Logo"
        width={300}
        height={67}
        className="navbar-logo h-10 w-auto max-w-[150px] object-contain"
      />
    ),
    layout: 'custom',
    mobileMenuComponent: ({ menu }) => <NewThemeMobileMenu menu={menu} />,
    customLayout: ({ logoComponent, searchComponent, menuComponent, cartComponent, settingsComponent, mobileMenuComponent }) => (
      <nav className="navbar-nav flex items-center justify-between p-4 lg:px-6">
        {/* Custom layout for new theme *\/}
        <div className="flex w-full items-center">
          <div className="md:hidden">{mobileMenuComponent}</div>
          <div className="flex flex-1">
            {logoComponent}
            {searchComponent}
          </div>
          <div className="flex items-center gap-4">
            {menuComponent}
            {cartComponent}
            {settingsComponent}
          </div>
        </div>
      </nav>
    )
  }*/

};
