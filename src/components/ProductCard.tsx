import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useFavorites } from "@/lib/favorites";
import type { Product } from "@/lib/products";
import { Link } from "@tanstack/react-router";

const colorMap: { [key: string]: string } = {
  Noir: "#000000",
  Blanc: "#FFFFFF",
  Marron: "#8B4513",
  Crème: "#FFFDD0",
  Taupe: "#B38B6D",
  Nude: "#D4A574",
  Cognac: "#A0522D",
  Beige: "#F5F5DC",
  Ivoire: "#FFFFF0",
  Sauge: "#9CAF88",
  "Nude rosé": "#E8B5A0",
  Terracotta: "#E2725B",
};

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    toast(
      liked ? (
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-foreground">Retiré des favoris</span>
          <span className="text-xs text-muted-foreground">{product.name}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-foreground">Ajouté aux favoris !</span>
          <span className="text-xs text-muted-foreground">{product.name}</span>
        </div>
      ),
    );
  };

  return (
    <article className="group bg-background">
      <Link to="/produit/$id" params={{ id: product.id }} className="block">
        <div className="relative hover-zoom bg-secondary aspect-3/4 mb-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[10px] uppercase tracking-luxury px-2 py-1 ${
                product.badge === "Nouveau"
                  ? "bg-sage text-sage-foreground"
                  : "bg-foreground text-background"
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Favorites button */}
          <button
            aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavorite}
            className={`absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              liked
                ? "bg-foreground text-background opacity-100"
                : "bg-background/95 text-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium leading-snug mb-2">{product.name}</h3>
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="text-sm font-medium">{product.price} €</p>
            {product.rating && (
              <p className="text-xs text-muted-foreground">⭐ {product.rating}</p>
            )}
          </div>
          {product.colors && (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color}
                  className="h-2.5 w-2.5 rounded-full border border-border cursor-pointer hover:border-foreground transition-colors"
                  style={{
                    backgroundColor: colorMap[color] || "#E5E5E5",
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
