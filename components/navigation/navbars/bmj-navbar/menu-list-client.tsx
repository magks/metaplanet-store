// app/components/MenuListClient.tsx
'use client';

import { Link } from '@/i18n/navigation';
import { Menu } from 'lib/shopify/types';

interface MenuListClientProps {
  menu: Menu[];
}

export default function MenuListClient({ menu }: MenuListClientProps) {

  return (
    <>
      {menu.length ? (
        <ul className="hidden gap-6 text-sm md:flex md:items-center">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className={`${'text-white'} underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300`}
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