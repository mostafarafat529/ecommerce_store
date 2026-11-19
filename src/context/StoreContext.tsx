import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storeConfig } from '../data/store.js';

export interface CartItem {
  variantKey: string;
  productId: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  unitPrice: number;
  unitOldPrice: number | null;
  selectedColor?: string;
  selectedSize?: string;
  selectedVolume?: string;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info';
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  isCartOpen: boolean;
  toasts: ToastMessage[];
  cartCount: number;
  cartSubtotal: number;
  cartOriginalTotal: number;
  cartDiscount: number;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'variantKey'>) => void;
  updateQuantity: (variantKey: string, delta: number) => void;
  removeFromCart: (variantKey: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  recordProductView: (productId: string) => void;
  showToast: (text: string, type?: 'success' | 'info') => void;
  dismissToast: (id: string) => void;
}

const CART_STORAGE_KEY = 'vera_store_cart_v1';
const WISHLIST_STORAGE_KEY = 'vera_store_wishlist_v1';
const RECENT_STORAGE_KEY = 'vera_store_recent_v1';

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function buildVariantKey(
  productId: string,
  color?: string,
  size?: string,
  volume?: string
): string {
  return [
    productId,
    color || '_',
    size || '_',
    volume || '_',
  ].join('::');
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(CART_STORAGE_KEY, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(WISHLIST_STORAGE_KEY, [])
  );
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() =>
    readStorage<string[]>(RECENT_STORAGE_KEY, [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch {
      // Ignore storage quota errors
    }
  }, [recentlyViewed]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { id, text, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (incoming: Omit<CartItem, 'variantKey'>) => {
    const variantKey = buildVariantKey(
      incoming.productId,
      incoming.selectedColor,
      incoming.selectedSize,
      incoming.selectedVolume
    );

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantKey === variantKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + incoming.quantity,
        };
        return updated;
      }
      return [...prev, { ...incoming, variantKey }];
    });

    showToast(`تمت إضافة "${incoming.name}" إلى سلة المشتريات`);
  };

  const updateQuantity = (variantKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.variantKey !== variantKey) return item;
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        })
    );
  };

  const removeFromCart = (variantKey: string) => {
    setCart((prev) => prev.filter((item) => item.variantKey !== variantKey));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(
          productName ? `تمت إزالة "${productName}" من المفضلة` : 'تمت الإزالة من المفضلة',
          'info'
        );
        return prev.filter((id) => id !== productId);
      } else {
        showToast(
          productName ? `تمت إضافة "${productName}" إلى المفضلة` : 'تمت الإضافة إلى المفضلة'
        );
        return [productId, ...prev];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const recordProductView = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const totals = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    let originalTotal = 0;

    for (const item of cart) {
      count += item.quantity;
      subtotal += item.unitPrice * item.quantity;
      const baseUnit =
        item.unitOldPrice && item.unitOldPrice > item.unitPrice
          ? item.unitOldPrice
          : item.unitPrice;
      originalTotal += baseUnit * item.quantity;
    }

    const discount = Math.max(0, originalTotal - subtotal);

    return {
      cartCount: count,
      cartSubtotal: subtotal,
      cartOriginalTotal: originalTotal,
      cartDiscount: discount,
    };
  }, [cart]);

  const value: StoreContextValue = {
    cart,
    wishlist,
    recentlyViewed,
    isCartOpen,
    toasts,
    cartCount: totals.cartCount,
    cartSubtotal: totals.cartSubtotal,
    cartOriginalTotal: totals.cartOriginalTotal,
    cartDiscount: totals.cartDiscount,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    recordProductView,
    showToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}

export function getShippingEstimate(subtotal: number, governorateName?: string, deliveryMethod: 'delivery' | 'pickup' = 'delivery') {
  if (deliveryMethod === 'pickup') return 0;
  if (subtotal >= storeConfig.freeShippingThreshold) return 0;
  if (!governorateName) return storeConfig.defaultShippingCost;
  const match = storeConfig.governorates.find((g) => g.name === governorateName);
  return match ? match.shipping : storeConfig.defaultShippingCost;
}
