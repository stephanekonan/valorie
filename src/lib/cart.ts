import {
  useEffect,
  useState,
} from "react";

import { Product } from "./products";

export interface CartItem {
  product: Product;
  qty: number;
  size?: string;
  color?: string;
}

const CART_STORAGE_KEY = "edene_cart";

// Helper to check if window is defined (SSR safety)
const isClient = typeof window !== "undefined";

export function getCart(): CartItem[] {
  if (!isClient) return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage", error);
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (!isClient) return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Trigger custom event for other components in same window
    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
}

export function addToCart(product: Product, qty: number, size?: string, color?: string): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) =>
      item.product.id === product.id &&
      item.size === size &&
      item.color === color
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({ product, qty, size, color });
  }

  saveCart(cart);
}

export function updateCartItemQty(
  productId: string,
  size: string | undefined,
  color: string | undefined,
  delta: number
): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) =>
      item.product.id === productId &&
      item.size === size &&
      item.color === color
  );

  if (existingIndex > -1) {
    const newQty = cart[existingIndex].qty + delta;
    if (newQty <= 0) {
      // Remove item if qty becomes 0 or less
      cart.splice(existingIndex, 1);
    } else {
      cart[existingIndex].qty = newQty;
    }
    saveCart(cart);
  }
}

export function removeFromCart(
  productId: string,
  size: string | undefined,
  color: string | undefined
): void {
  const cart = getCart();
  const filtered = cart.filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.size === size &&
        item.color === color
      )
  );
  saveCart(filtered);
}

export function clearCart(): void {
  saveCart([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(getCart());

  useEffect(() => {
    setItems(getCart());

    const handleCartUpdate = () => {
      setItems(getCart());
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.qty, 0);

  return {
    items,
    totalItems,
    addToCart: (product: Product, qty: number, size?: string, color?: string) => {
      addToCart(product, qty, size, color);
      setItems(getCart());
    },

    removeFromCart: (productId: string, size?: string, color?: string) => {
      removeFromCart(productId, size, color);
      setItems(getCart());
    },

    updateQty: (productId: string, size: string | undefined, color: string | undefined, delta: number) => {
      updateCartItemQty(productId, size, color, delta);
      setItems(getCart());
    },
    
    clearCart: () => {
      clearCart();
      setItems([]);
    },
  };
}
