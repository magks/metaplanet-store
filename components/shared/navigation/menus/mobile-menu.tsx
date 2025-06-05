// components/layout/mobile-menu.tsx
import Search, { SearchSkeleton } from '@/components/shared/navigation/search';
import { Link } from '@/i18n/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Menu } from 'lib/shopify/types'; // Adjust based on your types file
import { Fragment, Suspense } from 'react';
import { translateOrDefault } from 'utils/translate-or-default';

interface MobileMenuProps {
  menu: Menu[];
  useDarkMenu: boolean;
  openButtonColorClsx?: string;
  isOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  m: (key: string) => string ; // Translation function for menu items
  mm: (key: string) => string ; // Translation function for mobile menu labels
}

export default function MobileMenu({
  menu,
  useDarkMenu,
  openButtonColorClsx = 'text-white',
  isOpen,
  openMobileMenu,
  closeMobileMenu,
  m,
  mm,
}: MobileMenuProps) {
  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label={translateOrDefault(mm('Open mobile menu'), 'Open mobile menu')}
        className={clsx(
          'flex h-11 w-11 items-center justify-center rounded-md transition-colors md:hidden',
          openButtonColorClsx
        )}
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
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-mobile-menu pb-6">
              <div className="p-1">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label={translateOrDefault(mm('Close mobile menu'), 'Close mobile menu')}
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? (
                  <div
                    className={clsx(
                      'inline-block px-0 py-1 rounded-md w-full shadow-inset-all',
                      useDarkMenu 
                        ? 'bg-mobile-menu text-white shadow-color-dark' 
                       : 'bg-white/60 text-black shadow-color-dark'
                    )}
                  >
                    <ul className="flex w-full flex-col">
                      {menu.map((item: Menu) => (
                        <li
                          className={clsx(
                            'py-2 text-xl transition-colors hover:underline',
                          )}
                          key={item.title}
                        >
                          <Link className={clsx('px-4')} href={item.path} prefetch={true} onClick={closeMobileMenu}>
                            {translateOrDefault(m(item.title), item.title)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}