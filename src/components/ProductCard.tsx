import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link to="/produit/$id" params={{ id: product.id }} className="block">
        <div className="relative hover-zoom bg-secondary aspect-[4/5] mb-4">
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
          <button
            aria-label="Ajouter aux favoris"
            onClick={(e) => { e.preventDefault(); }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground mb-1">
            {product.brand}
          </p>
          <h3 className="font-serif text-lg mb-1">{product.name}</h3>
          <p className="text-sm">{product.price} €</p>
        </div>
      </Link>
    </article>
  );
}
