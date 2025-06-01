import { Link } from '@/i18n/navigation';
import appSettings from '@/lib/app-settings';
import { translateOrDefault } from '@/utils/translate-or-default';
import { getCollectionProducts } from 'lib/shopify';
import { getTranslations } from 'next-intl/server';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  const brand = appSettings.siteTheme;
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: `hidden-homepage-carousel-${brand}` });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];
  const t = await getTranslations('homePage');
  const productMsgs = await getTranslations('products');
  return (
    <>
    <pre> <h1>   {t('carousel')} </h1></pre>
    <div className="scrollbar-hide w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={translateOrDefault(productMsgs(`productHandles.${product.handle}`), product.title)}
                label={{
                  title: translateOrDefault(productMsgs(`productHandles.${product.handle}`), product.title),
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
