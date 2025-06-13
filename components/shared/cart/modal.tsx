// components/shared/cart/modal.tsx
'use client';

import LoadingDots from '@/components/shared/loading-dots';
import Price from '@/components/shared/price';
import { CountryCode, getCountryCode, StoreLocale } from '@/lib/i18n/storelocale-countrycode';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl, translateOrDefault } from 'lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCartAndSetCookie, redirectToCheckout, updateCartCountryCode } from './actions';
import { useCart } from './cart-context';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart-client';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const t = useTranslations(`cart.modal`);
  const { cart, updateCartItem, refreshCart} = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const [locale] = useState(useLocale());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie({
        buyerIdentity: { countryCode: locale as CountryCode }
      });
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  // Check local storage if mark has been set for buyer identity update for this locale
  // (i.e. switched to this locale in settings menu)
  useEffect(() => {
    const updateNeeded = localStorage.getItem('needsCartBuyerIdentityUpdate');
    if (updateNeeded === locale) {
      localStorage.removeItem('needsCartBuyerIdentityUpdate');
      // Do update
      setIsRefreshing(true);
      updateCartCountryCode({ 
        buyerIdentity: { countryCode: getCountryCode(locale as StoreLocale) }
      })
      .then(() => refreshCart(locale))
      .then(() => {
        // Verify currency updated
        if (cart?.cost.totalAmount.currencyCode !== (locale === 'jp' ? 'JPY' : 'USD')) {
          console.warn('Currency mismatch after update');
        }
      })
      .finally(() => setIsRefreshing(false))
      .catch((err) => console.warn("Failed to update cart currency:", err));
    }
  }, [locale, refreshCart, cart]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-69">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 cart-modal-overlay" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l cart-modal-panel p-6 md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold cart-modal-text">
                  {translateOrDefault(t("My Cart"), "My Cart")}
                </p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              { isRefreshing ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center">
                  <p className="mt-6 text-center text-lg">
                    {translateOrDefault(t('loadingCart'), "Loading cart...")}
                    <LoadingDots className="cart-modal-loading-dots" />

                  </p>

                </div>
              ) : !cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16 cart-empty-icon" />
                  <p className="mt-6 text-center text-2xl font-bold cart-modal-text">
                    {translateOrDefault(t("Your cart is empty"),"Your cart is empty.")}
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          }
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b cart-item-border"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-61 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border cart-product-image-container">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-60 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight cart-modal-text">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="text-sm cart-modal-text-secondary">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm cart-price-text"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border cart-action-button">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm cart-modal-text">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm cart-modal-text-secondary">
                    <div className="mb-3 flex items-center justify-between border-b cart-modal-border pb-1">
                      <p>{translateOrDefault(t("Taxes"), "Taxes")}</p>
                      <Price
                        className="text-right text-base cart-price-text"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b cart-modal-border pb-1 pt-1">
                      <p>{translateOrDefault(t("Shipping"),"Shipping")}</p>
                      <p className="text-right">{translateOrDefault(t("Calculated at checkout"),"Calculated at checkout")}</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b cart-modal-border pb-1 pt-1">
                      <p>{translateOrDefault(t("Total"), "Total")}</p>
                      <Price
                        className="text-right text-base cart-price-text"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton proceedStr={translateOrDefault(t('Proceed to Checkout'),'Proceed to Checkout')}/>
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md cart-modal-text transition-colors">
      <XMarkIcon
        className={clsx(
          'h-6 transition-all ease-in-out hover:scale-110',
          className
        )}
      />
    </div>
  );
}

function CheckoutButton({proceedStr = "Proceed to Checkout"}: {proceedStr?: string}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full cart-modal-button p-3 text-center text-sm font-medium opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="cart-checkout-btn-loading-dots" /> : proceedStr}
    </button>
  );
}