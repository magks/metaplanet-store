import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from '@/components/shared/grid/tile';
import { NavbarConditional } from '@/components/shared/navigation/navbar-conditional';
import SiteSwitcher from '@/components/shared/navigation/navbars/banner/site-switcher';
import { SiteSwitcherConditional } from '@/components/shared/navigation/navbars/banner/site-switcher-conditional';
import { UniversalNavbar } from '@/components/shared/navigation/navbars/universal-navbar';
import { Gallery } from '@/components/shared/product/gallery';
import { ProductProvider } from '@/components/shared/product/product-context';
import { ProductDescription } from '@/components/shared/product/product-description';
import appSettings from '@/lib/app-settings';
import { getCountryCode, StoreLocale } from '@/lib/i18n/storelocale-countrycode';
import Footer from 'components/shared/layout/footer';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Suspense } from 'react';
import { translateOrDefault } from 'utils';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const locale = await getLocale() as StoreLocale;
  const countryCode = getCountryCode(locale)
  console.log(`product/[handle] Page::generateMetadata::\n\tlocale==${locale};\n\tcountryCode==${countryCode}`);


  const product = await getProduct(params.handle, countryCode);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string, locale: string }> }) {
  const locale_intl = await getLocale() as StoreLocale;
  const countryCode = getCountryCode(locale_intl)
  console.log(`product/[handle] Page::locale::\n\tlocale==${locale_intl};\n\tcountryCode==${countryCode}`);
  const params = await props.params;
   console.log(`!!!!!!!!!!!!!!product/[handle] Page::props.locale=${params.locale}`);
  const product = await getProduct(params.handle, countryCode);

  if (!product) return notFound();
  const t = await getTranslations('products');

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title, //t(`productHandles.${product.handle}`), //product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
    <div>
            <SiteSwitcherConditional>
              <SiteSwitcher />
              <NavbarConditional>
                <UniversalNavbar 
                  pathname={'/product'} 
                  theme={appSettings.siteTheme} 
                />
              </NavbarConditional>
            </SiteSwitcherConditional>
          </div>
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 ignoredark:border-neutral-800 ignoredark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </ProductProvider>
    </>
  );
}

async function RelatedProducts({ id }: { id: string}) {
  const locale = await getLocale() as StoreLocale;
  const countryCode = getCountryCode(locale)
  console.log(`product/[handle] Page::RelatedProducts::\n\tlocale==${locale};\n\tcountryCode==${countryCode}`);
  const relatedProducts = await getProductRecommendations(id, countryCode);

  if (!relatedProducts.length) return null;
  const t = await getTranslations('products');
  return (
    <div className="py-10">
      <h2 className="mb-4 text-2xl font-bold">{t('relatedProducts')}</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={translateOrDefault(t(`productHandles.${product.handle}`), product.title)}
                label={{
                  title: translateOrDefault(t(`productHandles.${product.handle}`), product.title),
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
