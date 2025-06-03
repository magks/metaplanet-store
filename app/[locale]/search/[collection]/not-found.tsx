'use client';
import NoneFound from '@/components/shared/layout/search/none-found';
import './search.css';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function CollectionNotFound() {
  return (
      <>
       <NoneFound 
          titleTranslation="errorCollectionDoesNotExist"
          titleDefault="That collection doesn't exist"
          titleKey="errorCollectionDoesNotExist"
          descriptionTranslation="errorBrowseOtherCollections"
          descriptionDefault="Check back later or browse other collections."
          descriptionKey="errorBrowseOtherCollections"
          buttonTranslation="errorRefresh"
          buttonDefault="Refresh Page"
          buttonKey="errorRefresh"
        />
      </>
  );
}