import { useState, useEffect } from "react";

import { Link, useSearch, useNavigate } from "@tanstack/react-router";

import type { Product } from "@/lib/products";

import { ProductCard } from "./ProductCard";

type Filter = { label: string; query: Record<string, string>; href?: string };

type Props = {
  title: string;
  intro: string;
  heroImage: string;
  filters?: Filter[];
  products: Product[];
  selectedColor?: string;
};

export function CategoryPage({
  title,
  intro,
  heroImage,
  filters = [],
  products,
  selectedColor,
}: Props) {
  const search: any = useSearch({ strict: false });
  const navigate = useNavigate();

  const [filterNew, setFilterNew] = useState(false);
  const [filterBestseller, setFilterBestseller] = useState(false);
  const [filterBlack, setFilterBlack] = useState(false);
  const [sortBy, setSortBy] = useState("pertinence");

  const handleFilterClick = (query: Record<string, string>) => {
    navigate({ search: query as any, replace: true });
  };

  const isFilterActive = (query: Record<string, string>) => {
    if (Object.keys(query).length === 0) {
      return !search.category && !search.subcategory && !search.gender;
    }
    return Object.entries(query).every(([k, v]) => search[k] === v);
  };

  const filtered = products.filter((p) => {
    if (search.category && p.category !== search.category) return false;
    if (search.subcategory && p.subcategory !== search.subcategory) return false;
    if (search.gender && p.gender !== search.gender) return false;
    if (search.color && p.colors && p.colors.indexOf(search.color.toLowerCase()) === -1) return false;

    if (filterNew && p.badge !== "Nouveau") return false;
    if (filterBestseller && p.badge !== "Bestseller") return false;
    if (filterBlack && (!p.colors || !p.colors.some((c) => c.toLowerCase() === "noir"))) return false;

    return true;
  });

  const sorted = [...filtered];
  if (sortBy === "Prix croissant") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Prix décroissant") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Nouveautés") {
    sorted.sort((a, b) => (a.badge === "Nouveau" ? -1 : b.badge === "Nouveau" ? 1 : 0));
  }

  const prices = filtered.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <div>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-5 text-xs text-muted-foreground">
          Accueil / Mode / <span className="text-foreground">{title}</span>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">

        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-8 border-r border-border pr-8">
              <div>
                <h2 className="mb-4 text-xs uppercase tracking-luxury">Filtres</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" checked={filterNew} onChange={(e) => setFilterNew(e.target.checked)} /> Nouveautés
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" checked={filterBestseller} onChange={(e) => setFilterBestseller(e.target.checked)} /> Best-sellers
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="accent-current" checked={filterBlack} onChange={(e) => setFilterBlack(e.target.checked)} /> Disponible en noir
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
                <div className="space-y-3">
                  {filters.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => handleFilterClick(f.query)}
                      className={`block w-full text-left transition-colors ${isFilterActive(f.query)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
              <p>
                {sorted.length} article{sorted.length > 1 ? "s" : ""}
              </p>
              <select
                className="bg-transparent border-b border-border text-xs uppercase tracking-luxury py-2 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="pertinence">Tri : Pertinence</option>
                <option value="Prix croissant">Prix croissant</option>
                <option value="Prix décroissant">Prix décroissant</option>
                <option value="Nouveautés">Nouveautés</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
