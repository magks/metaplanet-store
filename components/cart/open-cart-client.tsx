// app/components/cart/open-cart-client.tsx
'use client';

import themeData from '@/lib/theme-data';
import { isHomePagePath } from '@/utils/is-homepage';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  const pathname = usePathname();
  const useWhiteText = isHomePagePath(pathname) && themeData?.pages.home.dark;

  return (
    <div
      className={clsx(
        'relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 transition-colors dark:border-neutral-700',
        'backdrop-blur-[2px]'
      )}
    >
      <ShoppingCartIcon
        className={clsx(
        useWhiteText ? 'text-white' : 'text-black', 
        'h-4 transition-all ease-in-out hover:scale-110', 
        className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}