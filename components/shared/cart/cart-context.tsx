'use client';
import { getCartServerAction } from '@/components/shared/cart/actions';
import type {
  Cart,
  CartItem,
  Product,
  ProductVariant
} from 'lib/shopify/types';
import { useLocale } from 'next-intl';
import React, {
  createContext, startTransition, use, useCallback, useContext,
  useMemo,
  useOptimistic, useState
} from 'react';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
| {
    type: 'UPDATE_ITEM';
    payload: { merchandiseId: string; updateType: UpdateType };
  }
| {
    type: 'ADD_ITEM';
    payload: { variant: ProductVariant; product: Product };
  }
| {
    type: 'REFRESH_CART';
    payload: { cart: Cart | undefined }; // Updated payload
  }
  ;

// Simplified CartContext
type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
  locale: string;
};


export const CartContext = createContext<CartContextType | undefined>(undefined);


function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === 'delete') return null;

  const newQuantity =
    updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount
      }
    }
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode
      }
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage
      }
    }
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' }
    }
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: '0' }
          }
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload;
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines
      };
    }
    case 'REFRESH_CART': {
      console.log(`cart reducer refreshcart cart with payload=${action.payload}`);
      const { cart } = action.payload;
      return cart || createEmptyCart(); // Replace with new cart or empty cart
    }
    default:
      return currentCart;
  }
}


export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const locale = useLocale();
  const [cartLocale, setLocale] = useState(locale); 

  const incrementCount = () => {

  };

  // is this computing anything ? if not just pass the cartPromise and locale to provider
  const contextValue = useMemo(
    () => ({ cartPromise, locale }),
    [cartPromise, locale]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const locale = useLocale();
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const initialCart = use(context.cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  );


  const refreshCart = useCallback(async (locale: string) => {
  try {
    console.log("Refreshing cart...");
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Cart fetch timeout')), 1000*60) // 60 seconds
    );
    
    const freshCart = await Promise.race([
      getCartServerAction(),
      timeoutPromise
    ]) as Cart | undefined;
    
    // Wrap optimistic update in transition
    startTransition(() => {
      updateOptimisticCart({
        type: "REFRESH_CART",
        payload: { cart: freshCart },
      });
    });
  } catch (error) {
    console.error("Error refreshing cart:", error);
  }
  }, [updateOptimisticCart]);

  const updateCartItem = useCallback((merchandiseId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: 'UPDATE_ITEM',
      payload: { merchandiseId, updateType }
    });
  }, [updateOptimisticCart]);

  const addCartItem = useCallback((variant: ProductVariant, product: Product) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product } });
  }, [updateOptimisticCart]);

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
      refreshCart
    }),
    [optimisticCart, updateCartItem, addCartItem, refreshCart]
  );
}