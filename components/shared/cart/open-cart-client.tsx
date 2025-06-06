// components/shared/cart/open-cart-client.tsx
'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md transition-colors">
      <ShoppingCartIcon
        className={clsx(
          'cart-icon h-5 transition-all ease-in-out hover:scale-110',
          className
        )}
      />
      
      {quantity ? (
        <div className="cart-badge z-20 absolute right-0 top-0 -mr-0 -mt-0 h-4 w-4 rounded-sm text-[11px] font-medium">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}