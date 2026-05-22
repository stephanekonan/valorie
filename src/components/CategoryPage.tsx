import { useState, useEffect } from "react";

import { Link, useSearch, useNavigate } from "@tanstack/react-router";

import type { Product } from "@/lib/products";

import { ProductCard } from "./ProductCard";

type Props = {
  title: string;
  intro: string;
  heroImage: string;
  subcategories: { id: string; label: string; href?: string }[];
  products: Product[];
  selectedColor?: string;
};

export function CategoryPage({
  title,
  intro,
  heroImage,
  subcategories,
  products,
  selectedColor,
}: Props) {
  const search: any = useSearch({ strict: false });
  const navigate = useNavigate();
  const [sub, setSub] = useState<string>(search.sub || "all");

  useEffect(() => {
    if (search.sub) {
      setSub(search.sub);
    }
  }, [search.sub]);

  const handleSubChange = (newSub: string) => {
    setSub(newSub);
    navigate({ search: { ...search, sub: newSub } as any, replace: true });
  };

  const filtered = sub === "all" ? products : products.filter((p) => p.subcategory === sub);
  const prices = filtered.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <div>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-5 text-xs text-muted-foreground">
          Accueil / Femme / <span className="text-foreground">{title}</span>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => handleSubChange("all")}
            className={`px-5 py-3 text-xs uppercase tracking-luxury border transition ${
              sub === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-background hover:border-foreground"
            }`}
          >
            Tout
          </button>
          {subcategories.map((s) => (
            <div key={s.id}>
              {s.href ? (
                <Link
                  to={s.href}
                  className={`inline-block px-5 py-3 text-xs uppercase tracking-luxury border transition ${
                    sub === s.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-background hover:border-foreground"
                  }`}
                >
                  {s.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleSubChange(s.id)}
                  className={`px-5 py-3 text-xs uppercase tracking-luxury border transition ${
                    sub === s.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-background hover:border-foreground"
                  }`}
                >
                  {s.label}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-8 border-r border-border pr-8">
              <div>
                <h2 className="mb-4 text-xs uppercase tracking-luxury">Filtres</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" /> Nouveautés
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" /> Best-sellers
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" /> Disponible en noir
                  </label>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-xs uppercase tracking-luxury">Prix</h2>
                <p className="text-sm text-muted-foreground">
                  {minPrice} € — {maxPrice} €
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-xs uppercase tracking-luxury">Catégorie</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {subcategories.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSubChange(s.id)}
                      className="block hover:text-foreground"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
              <p>
                {filtered.length} article{filtered.length > 1 ? "s" : ""}
              </p>
              <select className="bg-transparent border-b border-border text-xs uppercase tracking-luxury py-2 focus:outline-none">
                <option>Tri : Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
