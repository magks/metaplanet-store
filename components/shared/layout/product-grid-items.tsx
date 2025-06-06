import Grid from '@/components/shared/grid';
import { GridTileImage } from '@/components/shared/grid/tile';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { translateOrDefault } from 'utils';

export default function ProductGridItems({ products }: { products: Product[] }) {
  
  const t = useTranslations('products');
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <GridTileImage
              alt={ translateOrDefault(t(`productHandles.${product.handle}`), product.title) }
              label={{
                title: translateOrDefault(t(`productHandles.${product.handle}`), product.title),
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
