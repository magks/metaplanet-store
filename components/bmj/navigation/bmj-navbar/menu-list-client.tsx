// components/bmj/navigation/bmj-navbar/menu-list-client.tsx

'use client';

import { Link } from '@/i18n/navigation';
import appSettings from '@/lib/app-settings';
import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { translateOrDefault } from 'utils';

interface MenuListClientProps {
  menu: Menu[];
}

export default function MenuListClient({ menu }: MenuListClientProps) {
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
          className={clsx(
            'inline-block px-2 py-1 transition-all duration-200',
            'text-navbar', // Custom utility for navbar text color
            'navbar-bottom-indicator', // Custom utility for bottom indicator
            'hover:scale-105',
            'hover:bg-theme-hover'
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