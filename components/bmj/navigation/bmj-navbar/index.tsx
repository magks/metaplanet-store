// components/bmj/navigation/bmj-navbar/index.tsx 
import CartModal from '@/components/shared/cart/modal';
import { SettingsMenu } from '@/components/shared/navigation/menus/settings-menu';
import { Link } from '@/i18n/navigation';
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

  return (
    <nav className="flex items-center justify-between p-4 lg:px-6 shadow-lg">
      <div className="flex w-full items-center">
        {/* Mobile: Hamburger Menu (left) */}
        <div className="flex md:hidden items-center">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo: Left on desktop, center on mobile */}
        <Link
          href="/"
          prefetch={true}
          className="flex items-center md:flex-none flex-1 justify-center md:justify-start"
        >
          <Image
            src="/images/BM_Japan_White.webp"
            alt={`${SITE_NAME} Logo`}
            width={300}
            height={67}
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </Link>

        {/* Desktop: Search (center); Mobile: Hidden */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-80">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
        </div>

        {/* Desktop: Menu, Cart, Settings (right); Mobile: Cart, Settings (right) */}
        <div className="flex items-center ">
          {/* Menu List: Hidden on mobile */}
          <div className="hidden md:block">
            <MenuListClient menu={menu} />
            <div className="pr-1"></div>
          </div>
          <CartModal />
          <SettingsMenu />
        </div>
      </div>
    </nav>
  );
}