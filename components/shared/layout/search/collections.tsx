import clsx from 'clsx';
import { Suspense } from 'react';

import { getCollections } from 'lib/shopify';
import { useTranslations } from 'next-intl';
import { translateOrDefault } from 'utils';
import FilterList from './filter';

async function CollectionList({collectionsTitle = "Collections"}: {collectionsTitle?: string}) {
  const collections = await getCollections();
  return <FilterList list={collections} title={collectionsTitle} />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 ignoredark:bg-neutral-300';
const items = 'bg-neutral-400 ignoredark:bg-neutral-700';

export default function Collections() {
  const t = useTranslations('collections');
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList collectionsTitle={translateOrDefault(t("Collections"),"Collections")} />
    </Suspense>
  );
}
