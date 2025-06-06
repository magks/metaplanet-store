// components/bmj/navigation/bmj-navbar/mobile-menu.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import appSettings from '@/lib/app-settings';
import themeData from '@/lib/theme-data';
import { Menu } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';

import { default as MobileMenuFramework } from '@/components/shared/navigation/menus/mobile-menu';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const mm = useTranslations(`${appSettings.brandId}.navbar.mobile-menu`);
  const m = useTranslations(`${appSettings.brandId}.navbar.menu`);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  const useDarkMenu = (
    themeData?.pages.home?.mobile_menu.useDarkMenuList
  );
 // const useWhiteText = isHomePage || settings.darkHome ;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <MobileMenuFramework
            menu={menu}
            useDarkMenu={useDarkMenu} // Adjust based on your logic
            isOpen={isOpen}
            openMobileMenu={() => setIsOpen(true)}
            closeMobileMenu={() => setIsOpen(false)}
            m={m}
            mm={mm}
          />
  );
}
