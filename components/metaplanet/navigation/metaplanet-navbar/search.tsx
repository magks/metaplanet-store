// components/metaplanet/navigation/metaplanet-navbar/search.tsx

'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('navBar');

  // Handle form submission
  const handleSubmit = 
    (e: React.FormEvent<HTMLFormElement>) => {
      //e.preventDefault();
      const query = new FormData(e.currentTarget).get('q')?.toString() || '';
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
    //[router]
  ;

  return (
    <form
      action="/search"
      onSubmit={handleSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder={`${t('search')}`}
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <input type="submit" style={{ position: 'absolute', width: '1px', height: '1px', border: 'none', padding: '0', clip: 'rect(0 0 0 0)' }} />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  const t = useTranslations('navBar');

  return (
    <div className="flex items-center justify-center p-2">
      <MagnifyingGlassIcon className="h-6 w-6 text-white dark:text-black" />
    </div>
  );
}