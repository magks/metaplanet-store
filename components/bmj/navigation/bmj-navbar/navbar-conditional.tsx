// components/layout/navbar-conditional.tsx
'use client';

import themeData from '@/lib/theme-data';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { isHomePagePath } from 'utils';

interface NavbarConditionalProps {
  children: ReactNode;
}

type NavbarPageType = 'TRANSPARENT_NAVBAR' | 'DEFAULT_LIGHT_BG' | 'DEFAULT_DARK_BG' | 'DEFAULT';

const navbarPageClsx: Record<NavbarPageType, string> = {
  TRANSPARENT_NAVBAR: 'absolute top-0 left-0 right-0 z-30',
  DEFAULT_LIGHT_BG: 'relative bg-black dark:bg-white',
  DEFAULT_DARK_BG: 'relative bg-black dark:bg-white border-b border-grey',
  DEFAULT: 'relative bg-black dark:bg-white',
};

function getNavbarPageClsx(): string {
  const pathname = usePathname();
  const isHomePage = isHomePagePath(pathname);
  let navbarPageClsxStr: string = navbarPageClsx['DEFAULT'];

  if (isHomePage && themeData?.pages.home.navbar.blurred) {
    navbarPageClsxStr = navbarPageClsx['TRANSPARENT_NAVBAR'];
  } else {
    // use dark navbar
    if (themeData?.pages.default.navbar.dark) {
      navbarPageClsxStr = navbarPageClsx['DEFAULT_DARK_BG'];
    } else {
      navbarPageClsxStr = navbarPageClsx['DEFAULT_LIGHT_BG'];
    }
  }
  return navbarPageClsxStr;
}

export function NavbarConditional({ children }: NavbarConditionalProps) {
  const navBarClsxStr: string = getNavbarPageClsx();

  return <div className={navBarClsxStr}>{children}</div>;
}