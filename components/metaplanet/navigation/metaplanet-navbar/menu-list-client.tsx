// app/components/MenuListClient.tsx
'use client';

import { Link, usePathname } from '@/i18n/navigation';
import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/lib/utils/is-homepage';
import { Menu } from 'lib/shopify/types';

interface MenuListClientProps {
  menu: Menu[];
}

export default function MenuListClient({ menu }: MenuListClientProps) {
  const pathname = usePathname();
  const useWhiteText = isHomePagePath(pathname) && themeData?.pages.home.dark;

  return (
    <>
      {menu.length ? (
        <ul className="hidden gap-6 text-sm md:flex md:items-center">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className={`${useWhiteText ? 'text-white' : 'text-black'} underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}