// components/shared/navigation/universal-search.tsx (New)
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UniversalSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('navBar');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const query = new FormData(e.currentTarget).get('q')?.toString() || '';
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

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
        className="search-input text-md w-full rounded-lg border px-4 py-2 md:text-sm"
      />
      <input 
        type="submit" 
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          border: 'none', 
          padding: '0', 
          clip: 'rect(0 0 0 0)' 
        }} 
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="search-icon h-4" />
      </div>
    </form>
  );
}

export function UniversalSearchSkeleton() {
  return (
    <div className="flex items-center justify-center p-2">
      <MagnifyingGlassIcon className="search-icon h-6 w-6" />
    </div>
  );
}