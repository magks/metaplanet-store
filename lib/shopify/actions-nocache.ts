import { cookies } from 'next/headers';
import { getCartQuery } from './queries/cart';
import { Cart, ShopifyCartOperation, Image } from './types';
import { shopifyFetch } from './fetch';
import { reshapeCart } from './reshape';
/*
export async function getCart(): Promise<Cart | undefined> {
  try {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return undefined;
  }

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId }
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
  } catch (err) {
    console.log(`actions-nocache getcart error:${err}`);
    return undefined;
  }
}*/