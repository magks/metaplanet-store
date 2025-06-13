'use server';
import { CountryCode } from '@/lib/i18n/storelocale-countrycode';
import { Cart } from '@/lib/shopify/types';
// todo these cart actions can hrow errors: connectionTimeout, invalid cache
// setup observability logging / system on error via e.g. splunk/datadog etc.
import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateCartBuyerIdentity,
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}


export async function refreshCart(prevState: any) {
  try {
    revalidateTag(TAGS.cart);
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }
  } catch (e) {
    return 'Error refreshing cart';
  }
}

export async function getCartServerAction(): Promise<Cart | undefined> {
  try {
    revalidateTag(TAGS.cart);
    return await getCart();
  } catch (error) {
    console.error('Cart fetch error:', error);
    return undefined; // Return undefined instead of throwing
  }
}



export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie({
  buyerIdentity
}:{
   buyerIdentity?: {countryCode?: CountryCode};
}) {
  let cart = await createCart({
    buyerIdentity
  });
  (await cookies()).set('cartId', cart.id!);
}



export async function updateCartCountryCode({
  buyerIdentity
}:{
   buyerIdentity?: {countryCode?: CountryCode};
}) {
  if (process.env.NODE_ENV == 'development') {
    const throttle = 1000;
    console.log(`updateCartCountryCode:: delaying ${throttle/1000} second(s)...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`updateCartCountryCode:: finished delaying ${throttle/1000} second(s)...`);
  }
  console.log(`updateCartCountryCode:: updating cart buyer identity to countrycode=${buyerIdentity?.countryCode}`);
  let cart = await updateCartBuyerIdentity({
    buyerIdentity
  });
  //revalidateTag(TAGS.collections);
  //revalidateTag(TAGS.products);
  //revalidateTag(TAGS.cart);
}
