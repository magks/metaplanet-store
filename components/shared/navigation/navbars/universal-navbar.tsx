// components/shared/navigation/navbars/universal-navbar.tsx 
import CartModal from '@/components/shared/cart/modal';
import { SettingsMenu } from '@/components/shared/navigation/menus/settings-menu';
import UniversalMenuList from '@/components/shared/navigation/menus/universal-menu-list';
import UniversalSearch, { UniversalSearchSkeleton } from '@/components/shared/navigation/search/universal-search';
import { themeConfigs, type NavbarLayoutProps } from '@/components/shared/theme/navbar-theme-configs';
import { Link } from '@/i18n/navigation';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

// Theme-specific mobile menu imports

const { SITE_NAME } = process.env;

interface UniversalNavbarProps {
  pathname: string;
  theme: string;
}

// Layout Templates
function BMJLayout({ logoComponent, searchComponent, menuComponent, cartComponent, settingsComponent, mobileMenuComponent }: NavbarLayoutProps) {
  return (
    <nav className="navbar-nav flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        {/* Mobile: Hamburger Menu (left) */}
        <div className="flex md:hidden items-center">
          {mobileMenuComponent}
        </div>

        {/* Logo: Left on desktop, center on mobile */}
        <Link
          href="/"
          prefetch={true}
          className="flex items-center md:flex-none flex-1 justify-center md:justify-start"
        >
          {logoComponent}
        </Link>

        {/* Desktop: Search (center); Mobile: Hidden */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-80">
            {searchComponent}
          </div>
        </div>

        {/* Desktop: Menu, Cart, Settings (right); Mobile: Cart, Settings (right) */}
        <div className="flex items-center">
          {/* Menu List: Hidden on mobile */}
          <div className="hidden md:block">
            {menuComponent}
            <div className="pr-1"></div>
          </div>
          {cartComponent}
          {settingsComponent}
        </div>
      </div>
    </nav>
  );
}

function MetaplanetLayout({ logoComponent, searchComponent, menuComponent, cartComponent, settingsComponent, mobileMenuComponent }: NavbarLayoutProps) {
  return (
    <nav className="navbar-nav flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        {mobileMenuComponent}
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            {logoComponent}
          </Link>
          {menuComponent}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {searchComponent}
        </div>
        <div className="flex justify-end md:w-1/3">
          {cartComponent}
          {settingsComponent}
        </div>
      </div>
    </nav>
  );
}

export async function UniversalNavbar({ pathname, theme }: UniversalNavbarProps) {
  // Get theme configuration
  const config = themeConfigs[theme];
  
  if (!config) {
    console.warn(`Theme configuration not found for: ${theme}`);
    // Fallback to bmj configuration
    const fallbackConfig = themeConfigs.bmj;
    return <UniversalNavbar pathname={pathname} theme="bmj" />;
  }

  // Fetch menu using theme-specific handle
  const menu = await getMenu(config.menuHandle);

  // Create reusable components
  const logoComponent = config.logoComponent();
  const searchComponent = (
    <Suspense fallback={<UniversalSearchSkeleton />}>
      <UniversalSearch />
    </Suspense>
  );
  const menuComponent = <UniversalMenuList menu={menu} />;
  const cartComponent = <CartModal />;
  const settingsComponent = <SettingsMenu />;
  const mobileMenuComponent = (
    <Suspense fallback={null}>
      {config.mobileMenuComponent({ menu })}
    </Suspense>
  );

  // Use custom layout if provided, otherwise use predefined layouts
  if (config.customLayout) {
    return config.customLayout({
      logoComponent,
      searchComponent,
      menuComponent,
      cartComponent,
      settingsComponent,
      mobileMenuComponent
    });
  }

  // Use predefined layout templates
  const layoutProps = {
    logoComponent,
    searchComponent,
    menuComponent,
    cartComponent,
    settingsComponent,
    mobileMenuComponent
  };

  switch (config.layout) {
    case 'bmj':
      return <BMJLayout {...layoutProps} />;
    case 'metaplanet':
      return <MetaplanetLayout {...layoutProps} />;
    default:
      console.warn(`Unknown layout: ${config.layout}`);
      return <BMJLayout {...layoutProps} />;
  }
}