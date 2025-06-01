// components/layout/navbar-conditional.tsx
'use client';

// This is needed because Navbar must be a server component to support lib/shopify cart tree
import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/utils';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavbarConditionalProps {
  children: ReactNode;
}
// Define the keys as a union type for type safety
type NavbarPageType = 'TRANSPARENT_NAVBAR' 
  | 'DEFAULT_PAGE_DARK_NAVBAR'
  | 'DEFAULT_PAGE_LIGHT_NAVBAR'  
  | 'DEFAULT'
;
// Define the table using Record
const navbarPageClsx: Record<NavbarPageType, string> = {
  TRANSPARENT_NAVBAR: 'absolute top-0 left-0 right-0 z-30' ,
  DEFAULT_PAGE_DARK_NAVBAR: 'relative bg-black dark:bg-white',
  DEFAULT_PAGE_LIGHT_NAVBAR:  'relative bg-background dark:bg-black',
  DEFAULT:  'relative bg-black dark:bg-white',
};

function getNavbarPageClsx(): string {
  const pathname = usePathname();
  const isHomePage = isHomePagePath(pathname);
  let navbarPageClsxStr: string = navbarPageClsx['DEFAULT'];
  if (isHomePage && themeData?.pages.home.navbar.transparent) {
    navbarPageClsxStr = navbarPageClsx['TRANSPARENT_NAVBAR']
  }
  else {
    if (themeData?.pages.default.navbar.dark) {
      navbarPageClsxStr = navbarPageClsx['DEFAULT_PAGE_DARK_NAVBAR'];
    }
    else {
      navbarPageClsxStr = navbarPageClsx['DEFAULT_PAGE_LIGHT_NAVBAR'];
    }
  } 
  return navbarPageClsxStr;
}

export function NavbarConditional({ children }: NavbarConditionalProps) {
  const navBarClsxStr: string = getNavbarPageClsx();
  
  return (
    <div className={navBarClsxStr}>
      {children}
    </div>
  );
}