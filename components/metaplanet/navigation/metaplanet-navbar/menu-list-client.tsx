// components/metaplanet/navigation/metaplanet-navbar/menu-list-client.tsx
'use client';

import { Link, usePathname } from '@/i18n/navigation';
import appSettings from '@/lib/app-settings';
import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/lib/utils/is-homepage';
import { Menu } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { cn, translateOrDefault } from 'utils';

interface MenuListClientProps {
  menu: Menu[];
}

export default function MenuListClient({ menu }: MenuListClientProps) {
  const pathname = usePathname();
  const useWhiteText = isHomePagePath(pathname) && themeData?.pages.home.dark;
  const t = useTranslations(`${appSettings.brandId}.navbar.menu`);
  return (
    <>
      {menu.length ? (
        <ul className="hidden gap-6 text-sm md:flex md:items-center">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className={cn(
                  useWhiteText ? 'text-white' : 'text-black',
                  "underline-offset-4  hover:underline ignoredark:hover:text-neutral-300"
                )}
              >
                {translateOrDefault(t(item.title), item.title)}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}