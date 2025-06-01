// components/layout/navbar.tsx
import { SettingsMenu } from '@/components/navigation/menus/settings-menu';
import { Link } from '@/i18n/navigation';
import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import { Suspense } from 'react';
import MenuListClient from './menu-list-client';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

interface NavbarProps {
  pathname: string;
}

export async function Navbar({ pathname }: NavbarProps) {
  const menu = await getMenu('bmj-frontend-header-menu');
  //const useWhiteText = isHomePagePath(pathname) && themeData?.pages.home.dark;

  return (
    <nav className="flex items-center justify-between p-4 lg:px-6 shadow-lg">
      <div className="flex w-full items-center">
        {/* Logo on the left */}
        <Link href="/" prefetch={true} className="flex items-center">
          <Image
            src="/images/BM_Japan_White.webp"
            alt={`${SITE_NAME} Logo`}
            width={300}
            height={67}
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </Link>

        {/* Spacer to push other items to the right */}
        <div className="flex-1"></div>

        {/* Mobile Menu (visible only on mobile) */}
        <div className="block md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Right-side components: Menu, Search, Cart, Settings */}
        <div className="hidden md:flex items-center gap-4">
          {/* Menu List (Collections) */}
          <MenuListClient menu={menu} />

          {/* Search */}
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>

          {/* Cart */}
          <CartModal />

          {/* Settings */}
          <SettingsMenu />
        </div>
      </div>
    </nav>
  );
}