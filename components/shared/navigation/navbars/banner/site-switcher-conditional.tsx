// components/shared/navigation/navbar-conditional.tsx
'use client';

import { usePathname } from '@/i18n/navigation';
import { ReactNode } from 'react';
import { isHomePagePath } from 'utils';

interface SiteSwitcherConditionalProps {
  children: ReactNode;
}

// todo rename to NavbarContainer and fix imports
export function SiteSwitcherConditional({ children }: SiteSwitcherConditionalProps) {
  const pathname = usePathname();
  const isHomePage = isHomePagePath(pathname);
  
  // Build data attributes for page context
  const dataAttributes: Record<string, string> = {};
  
  if (isHomePage) {
    dataAttributes['data-page'] = 'homepage';
  }
  
  // You can add more page detection logic here:
  // if (pathname.includes('/product/')) {
  //   dataAttributes['data-page'] = 'product';
  // }
  // if (pathname.includes('/checkout')) {
  //   dataAttributes['data-page'] = 'checkout';
  // }
  
  return (
    <div 
      className=""
      {...dataAttributes}
    >
      {children}
    </div>
  );
}