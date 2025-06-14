// components/metaplanet/navigation/metaplanet-navbar/index.tsx

import CartModal from '@/components/shared/cart/modal';
import LogoSquare from '@/components/shared/logo-square';
import { SettingsMenu } from '@/components/shared/navigation/menus/settings-menu';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

import { Link } from '@/i18n/navigation';
import appSettings from '@/lib/app-settings';
import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/lib/utils/is-homepage';
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
   //console.log(`NAVBARmenu::metaplanet-frontend-header-menu`);
  const menu = await getMenu(`${appSettings.brandId}-frontend-header-menu`); 
  //console.log(`NAVBARmenu::menulength=${menu.length}`);

menu.map((item: Menu) => {
                //console.log(`NAVBAR::menu item.title=${item.title}`);
});

  const useWhiteText = (
    isHomePagePath(pathname) 
    && themeData?.pages.home.dark
  );

   //console.log(`NAVBARmenu::pathname=${pathname}`);
   //console.log(`NAVBARmenu::themeData?.pages.home.dark=${themeData?.pages.home.dark}`);
   //console.log(`NAVBARmenu::useWhiteText=${useWhiteText}`);
   return (
    <>
    {/* <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 lg:px-6 bg-transparent backdrop-blur-[3px]">*/}
    {/* blur gradient in style*/}
    {/*<nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 lg:px-6 pb-12 bg-black/10 backdrop-blur-[2px]"
     style={{maskImage: 'linear-gradient(to bottom, white 70%, transparent 100%)'}}>*/}
    {/*<nav className={`flex items-center justify-between p-4 lg:px-6 ${
      isOverlay 
        ? 'absolute top-0 left-0 right-0 z-30 bg-transparent backdrop-blur-[2px]' 
        : 'relative bg-white ignoredark:bg-black'
    }`}>*/}
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
        <div className="flex justify-end md:w-1/3 ">
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
