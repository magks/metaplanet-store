import clsx from 'clsx';
import Footer from 'components/shared/layout/footer';
import Collections from 'components/shared/layout/search/collections';
import FilterList from 'components/shared/layout/search/filter';
import { sorting } from 'lib/constants';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

import { ibmPlexMono } from 'styles/fonts';


export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('searchPage');
  return (
    <>
      <div className={clsx(`${ibmPlexMono.variable}`,
        "search-layout-container",
        "mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pt-2 pb-4 text-black md:flex-row ignoredark:text-white",
      "antialiased"
      )}>
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title={t('filter.sortBy')} />
        </div>
      </div>
      <Footer />
    </>
  );
}
