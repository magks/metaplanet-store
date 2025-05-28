import { SettingsMenu } from '@/components/navigation/menus/settings-menu';
import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

import { Link } from '@/i18n/navigation';
import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/utils/is-homepage';
import { Suspense } from 'react';
import MenuListClient from './menu-list-client';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;
interface NavbarProps {
  pathname: string;
}

export async function Navbar(
  { pathname }: NavbarProps
) {
   console.log(`NAVBARmenu::nextjs-frontend-header-menu`);
  const menu = await getMenu('nextjs-frontend-header-menu'); 
  console.log(`NAVBARmenu::menulength=${menu.length}`);

menu.map((item: Menu) => {
                console.log(`NAVBAR::menu item.title=${item.title}`);
});

  const useWhiteText = (
    isHomePagePath(pathname) 
    && themeData?.pages.home.dark
  );

   console.log(`NAVBARmenu::pathname=${pathname}`);
   console.log(`NAVBARmenu::themeData?.pages.home.dark=${themeData?.pages.home.dark}`);
   console.log(`NAVBARmenu::useWhiteText=${useWhiteText}`);
   return (
    <>
    <nav className="flex items-center justify-between p-4 lg:px-6 bg-transparent">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            {/*<div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>*/}
          </Link>
          <MenuListClient menu={menu} />
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3 gap-2">
          <CartModal />
          <SettingsMenu />

        </div>
      </div>
    </nav>
    {/* second blur fade for natural taper 
    <div className="absolute top-16 left-0 right-0 z-20 h-8 bg-gradient-to-b from-black/10 to-transparent backdrop-blur-[1px]" 
       style={{maskImage: 'linear-gradient(to bottom, white, transparent)'}} />
       */}
    </>
  );
}
