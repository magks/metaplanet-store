import { GridTileImage } from '@/components/shared/grid/tile';
import appSettings from '@/lib/app-settings';
import { StoreLocale, getCountryCode } from '@/lib/i18n/storelocale-countrycode';
import { translateOrDefault } from '@/lib/utils/translate-or-default';
import clsx from 'clsx';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  const t = useTranslations('products');
  const labelTitle=translateOrDefault(t(`productHandles.${item.handle}`), item.title);
  //console.log(`3gridItem::labelTitle==${labelTitle}`)
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: labelTitle,//item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const locale = await getLocale() as StoreLocale;
  const countryCode = getCountryCode(locale)
  console.log(`ThreeItemGrid::locale::\n\tlocale==${locale};\n\tcountryCode==${countryCode}`);
  
  const brand = appSettings.siteTheme;
  let homepageItems: Product[] = [];
  // Collections that start with `hidden-*` are hidden from the search page.
  try {
    homepageItems = await getCollectionProducts({
    collection: `hidden-homepage-featured-items-${brand}`,
    countryCode
  });
  } catch (err) {
    console.log(`threeitemgrid:: failure fetching collection products for country code::${countryCode}`);
  }


  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;


  return (
    <>
    {/* Remove or reduce spacer */}
    {/* <div className="h-8 md:h-12 lg:h-16" /> */}
     <div className="h-3 md:h-3 lg:h-4" /> 
    {/* Add negative margin-top to pull grid up */}
    <section className={clsx(
      "z-[15] mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]",
      {"-mt-16 md:-mt-15 lg:-mt-15 relative": appSettings.siteTheme == 'metaplanet'
      } 
    )}>
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
    </>
  );
}
