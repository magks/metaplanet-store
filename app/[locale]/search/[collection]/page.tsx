import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from '@/components/shared/grid';
import NoneFound from '@/components/shared/layout/search/none-found';
import ProductGridItems from 'components/shared/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getLocale, getTranslations } from 'next-intl/server';
import './search.css';
import { StoreLocale, getCountryCode } from '@/lib/i18n/storelocale-countrycode';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const locale = await getLocale() as StoreLocale;
  const countryCode = getCountryCode(locale)
  console.log(`product/[handle] Page::locale::\n\tlocale==${locale};\n\tcountryCode==${countryCode}`);

  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse, countryCode });
  const t = await getTranslations('collections');
  return (
  <>
    <section>
      {products.length === 0 ? (
        <>
        {/*
          <p className="py-3 text-lg">
          {t('noProductsFound')} 
          <span className="ellipsis-anim" /></p>
        */}
        <NoneFound />
        </>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
    
  </>
  );
}
