// components/shared/navigation/menus/universal-menu-list.tsx 
'use client';

import { Link } from '@/i18n/navigation';
import appSettings from '@/lib/app-settings';
import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
//import { orbitron, spaceGrotesk } from 'styles/fonts';
import { translateOrDefault } from 'utils';
interface UniversalMenuListProps {
  menu: Menu[];
}

export default function UniversalMenuList({ menu }: UniversalMenuListProps) {
  const t = useTranslations(`${appSettings.brandId}.navbar.menu`);
  
  return (
    <>
      {menu.length ? (
        <ul className={clsx( //`${spaceGrotesk.variable} ${orbitron.variable} `,
          "hidden gap-6 text-sm md:flex md:items-center")}
        >
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className={clsx(`antialiased`,
                  "nav-link inline-block px-2 py-1 transition-all duration-200 text-navbar navbar-bottom-indicator hover:bg-theme-hover")}
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