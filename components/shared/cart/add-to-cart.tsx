'use client';

import { addItem } from '@/components/shared/cart/actions';
import { useProduct } from '@/components/shared/product/product-context';
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const t = useTranslations('cart.submit');
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-neutral-800 p-4 tracking-wide text-white hover:bg-neutral-700 transition-colors';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60 hover:bg-neutral-800';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
       {t('outOfStock')}
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
       {t('addToCart')}
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={buttonClasses}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {t('addToCart')}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}