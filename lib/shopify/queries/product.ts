import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!, $countryCode: CountryCode) 
    @inContext(country: $countryCode) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $countryCode: CountryCode)
    @inContext(country: $countryCode) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!, $countryCode: CountryCode) 
    @inContext(country: $countryCode) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
