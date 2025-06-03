import Grid from '@/components/shared/grid';
import NoneFound from '@/components/shared/layout/search/none-found';
import appSettings from '@/lib/app-settings';
import ProductGridItems from 'components/shared/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

const includeTagsList = [`${appSettings.brandId}`];
const includeTagsQuery = includeTagsList
  .filter(tag => tag !== undefined && tag !== '') // Skip undefined or empty strings
  .map(tag => `tag:${tag}`)
  .join(' ');

const excludeTagsList = ['hidden'];
const excludeTagsQuery = excludeTagsList
  .filter(tag => tag !== undefined && tag !== '') // Skip undefined or empty strings
  .map(tag => `-tag:${tag}`)
  .join(' ');

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  console.log(`searchPage::sortKey=${sortKey}\n\tsearchValue=${searchValue || 'empty'}`);
  const queryString = `${(searchValue||'')} ${includeTagsQuery} ${excludeTagsQuery}`;

  console.log(`searchPage::queryString=${queryString || 'empty'}`);
  const products = await getProducts({ sortKey, reverse, query: queryString });
  const resultsText = products.length > 1 ? 'results' : 'result';
  const t = await getTranslations('searchPage');
  return (
    <>
      {searchValue ? (<>
        <p className="mb-4">
          {t.rich('searchResultsRichText', {
              count: products.length,
              params: searchValue,
              searchParams: (chunks) => (
                <span className="font-bold">{chunks}</span>
              )
            })
          }
        </p>
        {products.length === 0 
        ?  <NoneFound 
            namespace='searchPage'
            titleTranslation = 'noMatchesTitle'
            titleSearchParams = {searchValue}
            titleDefault = {`There are no products that match "${searchValue}"`}
            titleKey = 'noMatchesTitle'
          />
        : null
        }
        </>
      ) : 
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      }
    </>
  );
}

