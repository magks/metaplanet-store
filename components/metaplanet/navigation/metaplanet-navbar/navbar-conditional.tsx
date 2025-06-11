// components/metaplanet/navigation/metaplanet-navbar/navbar-conditional.tsx
'use client';

// This is needed because Navbar must be a server component to support lib/shopify cart tree
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { isHomePagePath } from 'utils';

interface NavbarConditionalProps {
  children: ReactNode;
}

function getNavbarPageClsx(): string {
  const pathname = usePathname();
  const isHomePage = isHomePagePath(pathname);
  let navbarPageClsxStr: string = '';
  if (isHomePage) {
    navbarPageClsxStr = 'absolute top-8 left-0 right-0 z-30';
  }
  else {
      navbarPageClsxStr =  'relative bg-background ignoredark:bg-black';
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