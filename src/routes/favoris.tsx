import { Heart, X } from "lucide-react";
import { toast } from "sonner";

import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/lib/favorites";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes Favoris — Valorie" },
      { name: "description", content: "Vos articles favoris Valorie." },
    ],
  }),
  component: FavorisPage,
});

function FavorisPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      {/* Header section */}
      <section className="bg-secondary/40 border-b border-border/40 py-10">
        <div className="container mx-auto px-6">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-xs uppercase tracking-luxury text-muted-foreground/80 mb-1">
                Ma sélection
              </p>
              <h1 className="text-4xl font-serif flex items-center gap-3">
                Mes favoris
                {favorites.length > 0 && (
                  <span className="text-base font-sans font-normal text-muted-foreground">
                    ({favorites.length} article{favorites.length > 1 ? "s" : ""})
                  </span>
                )}
              </h1>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  favorites.forEach((p) => toggleFavorite(p));
                  toast("Tous les favoris ont été retirés.");
                }}
                className="ml-auto text-xs uppercase tracking-luxury text-muted-foreground hover:text-foreground transition-colors pb-1 border-b border-transparent hover:border-muted-foreground"
              >
                Tout effacer
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <Heart className="h-7 w-7 text-muted-foreground" />
              </div>
            </div>
            <h2 className="font-serif text-3xl mb-3">Aucun favori pour l'instant</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Explorez nos collections et ajoutez vos coups de cœur en cliquant sur le{" "}
              <Heart className="inline h-3.5 w-3.5" /> sur chaque article.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/mode"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity"
              >
                Explorer la mode
              </Link>
              <Link
                to="/cosmetique"
                className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:bg-foreground hover:text-background transition-colors"
              >
                Découvrir les soins
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
            {favorites.map((product) => (
              <div key={product.id} className="relative group/fav">
                <ProductCard product={product} />
                <button
                  onClick={() => {
                    toggleFavorite(product);
                    toast(`${product.name} retiré des favoris.`);
                  }}
                  aria-label="Retirer des favoris"
                  className="absolute -top-2 -right-2 h-6 w-6 bg-background border border-border rounded-full flex items-center justify-center opacity-0 group-hover/fav:opacity-100 transition-opacity shadow-sm hover:bg-destructive hover:border-destructive hover:text-white z-10"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
