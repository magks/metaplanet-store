// components/metaplanet/navigation/metaplanet-navbar/mobile-menu.tsx

'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import appSettings from '@/lib/app-settings';
import themeData from '@/lib/theme-data';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { isHomePagePath, translateOrDefault } from 'utils';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const mm = useTranslations(`${appSettings.brandId}.navbar.mobile-menu`);
  const m = useTranslations(`${appSettings.brandId}.navbar.menu`);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  const useWhiteText = (
    isHomePagePath(pathname) 
    && themeData?.pages.home.dark 
    && (themeData?.pages.home?.mobile_menu.transparent || themeData?.pages.home?.mobile_menu?.blurred)
  );
 // const useWhiteText = isHomePage || settings.darkHome ;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label={translateOrDefault(mm("Open mobile menu"), "Open mobile menu")}
        className={`${useWhiteText ? 'text-white ignoredark:text-white': 'text-black ignoredark:text-white'} flex h-11 w-11 items-center justify-center rounded-md transition-colors md:hidden `}
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col backdrop-blur-md pb-6 ignoredark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors ignoredark:text-white"
                  onClick={closeMobileMenu}
                  aria-label={translateOrDefault(mm("Close mobile menu"), "Close mobile menu")}
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-xl text-white transition-colors hover:text-neutral-500 ignoredark:text-white"
                        key={item.title}
                      >
                        <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                          {translateOrDefault(m(item.title), item.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
