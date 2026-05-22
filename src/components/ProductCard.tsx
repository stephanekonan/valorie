import { useState } from "react";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
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
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setColor(product.colors?.[0]);
    setSize(product.sizes?.[0]);
    setQty(1);
    setIsOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, qty, size, color);
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-foreground">Ajouté au panier !</span>
        <span className="text-xs text-muted-foreground">
          <strong>{product.name}</strong> ({qty}x) a été ajouté à votre sélection.
        </span>
      </div>
    );
    setIsOpen(false);
  };

  return (
    <>
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
            <button
              aria-label="Ajouter aux favoris"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <Heart className="h-4 w-4" />
            </button>
            <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    onClick={handleAddClick}
                    className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-[11px] uppercase tracking-luxury text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Ajouter
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>{product.name}</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    {product.colors && (
                      <div>
                        <p className="text-xs uppercase tracking-luxury mb-3">
                          Couleur:{" "}
                          <span className="text-muted-foreground normal-case tracking-normal">
                            {color}
                          </span>
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {product.colors.map((c: string) => (
                            <button
                              key={c}
                              onClick={() => setColor(c)}
                              className={`px-4 py-2 text-xs border transition-colors ${
                                color === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.sizes && (
                      <div>
                        <p className="text-xs uppercase tracking-luxury mb-3">Taille</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((s: string) => (
                            <button
                              key={s}
                              onClick={() => setSize(s)}
                              className={`w-12 h-12 text-sm border transition-colors ${
                                size === s
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border hover:border-foreground"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-xs uppercase tracking-luxury mb-3">Quantité</p>
                      <div className="inline-flex border border-border">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="p-3 hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-6 py-3 text-sm min-w-16 text-center">{qty}</span>
                        <button
                          onClick={() => setQty(qty + 1)}
                          className="p-3 hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-primary text-primary-foreground py-3 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground mb-1">
              {product.brand}
            </p>
            <h3 className="text-sm font-medium leading-snug mb-2">{product.name}</h3>
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-sm font-medium">{product.price} €</p>
              {product.rating && <p className="text-xs text-muted-foreground">⭐ {product.rating}</p>}
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
    </>
  );
}
