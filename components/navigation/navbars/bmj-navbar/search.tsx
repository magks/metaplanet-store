// components/layout/search.tsx
'use client';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('navBar');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(`e.currentTarget=${e.currentTarget}`);
      console.log(`e.currentTarget.get('q')=${e.currentTarget.get('q')}`);
      const query = new FormData(e.currentTarget).get('q')?.toString() || '';
      console.log(`query=${query}`);
      //if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false); // Close modal after submission
      //}
    },
    [router]
  );

  // Close modal on Escape key (handled by Dialog, but kept for clarity)
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      {/* Magnifying Glass Icon */}
      <button
        type="button"
        onClick={openModal}
        className="flex items-center justify-center p-2 text-white dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        aria-label={t('search')}
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>

      {/* Search Modal */}
      <Transition show={isOpen}>
        <Dialog onClose={closeModal} className="relative z-50">
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>

          {/* Modal Panel */}
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel
              className="fixed bottom-0 right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-lg font-semibold">{t('search')}</DialogTitle>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-6" />
                </button>
              </div>
              <form 
                action="/search"
                onSubmit={handleSubmit}
                className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    name="q"
                    placeholder={`${t('search')}`}
                    autoComplete="off"
                    defaultValue={searchParams?.get('q') || ''}
                    className="w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 text-md md:text-sm dark:border-neutral-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-neutral-400"
                  />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                  <MagnifyingGlassIcon className="h-4" />
                </div>
                <input type="submit" style={{ position: 'absolute', width: '1px', height: '1px', border: 'none', padding: '0', clip: 'rect(0 0 0 0)' }} />
              </form>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
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