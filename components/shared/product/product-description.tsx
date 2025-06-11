import { AddToCart } from '@/components/shared/cart/add-to-cart';
import Price from '@/components/shared/price';
import Prose from '@/components/shared/prose';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { translateOrDefault } from 'utils';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const t = useTranslations('products');
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 ignoredark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{translateOrDefault(t(`productHandles.${product.handle}`), product.title)}</h1>
        <div className="mr-auto w-auto rounded-full bg-grey-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight ignoredark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
