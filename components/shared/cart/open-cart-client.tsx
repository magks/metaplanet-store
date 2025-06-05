// app/components/cart/open-cart-client.tsx
'use client';

import themeData from '@/lib/theme-data';
import { Theme } from '@/lib/types/themes';
import { isHomePagePath } from '@/lib/utils/is-homepage';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


const selectCartMenuIconColor  = () => {
  const pathname = usePathname();
  const theme = themeData?.name as Theme;

  const components: Record<Theme, string> = {
    metaplanet: (
      isHomePagePath(pathname) && themeData?.pages.home.dark 
      ? "text-white"
      : "text-black"
    ),
    bmj: (
     themeData.components.open_cart.icon_color
    ),
    default: (
      "text-black dark:text-white"
    )
  };

  return components[theme] || components.default;
};

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  const shoppingCartIconColor = selectCartMenuIconColor();
  
  return (
    <div
      className={clsx(
        'relative flex h-11 w-11 items-center justify-center rounded-md transition-colors ',
        'backdrop-blur-[2px]'
      )}
    >
      <ShoppingCartIcon
        className={clsx(
        shoppingCartIconColor, 
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