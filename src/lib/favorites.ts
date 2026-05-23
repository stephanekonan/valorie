import { useEffect, useState } from "react";
import type { Product } from "./products";

const FAVORITES_KEY = "valorie_favorites";
const isClient = typeof window !== "undefined";

export function getFavorites(): Product[] {
  if (!isClient) return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: Product[]): void {
  if (!isClient) return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("favorites-updated"));
  } catch {
    // ignore
  }
}

export function toggleFavorite(product: Product): void {
  const favs = getFavorites();
  const idx = favs.findIndex((p) => p.id === product.id);
  if (idx > -1) {
    favs.splice(idx, 1);
  } else {
    favs.push(product);
  }
  saveFavorites(favs);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>(() => getFavorites());

  useEffect(() => {
    // Sync on mount
    setFavorites(getFavorites());
    const handler = () => setFavorites(getFavorites());
    window.addEventListener("favorites-updated", handler);
    return () => window.removeEventListener("favorites-updated", handler);
  }, []);

  const toggle = (product: Product) => {
    toggleFavorite(product);
    setFavorites(getFavorites());
  };

  const isLiked = (productId: string) => favorites.some((p) => p.id === productId);

  return {
    favorites,
    toggleFavorite: toggle,
    isFavorite: isLiked,
    totalFavorites: favorites.length,
  };
}
