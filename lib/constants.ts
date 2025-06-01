export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
  titleTranslationKey: string;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
  titleTranslationKey: 'relevance',
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { titleTranslationKey: 'trending', title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { titleTranslationKey: 'latest', title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { titleTranslationKey: 'priceAsc', title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { titleTranslationKey: 'priceDesc', title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export const TRANSLATION_NOT_FOUND = "TRANSLATION_NOT_FOUND";