import { useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  title: string;
  intro: string;
  heroImage: string;
  subcategories: { id: string; label: string }[];
  products: Product[];
};

export function CategoryPage({ title, intro, heroImage, subcategories, products }: Props) {
  const [sub, setSub] = useState<string>("all");
  const filtered = sub === "all" ? products : products.filter((p) => p.subcategory === sub);

  return (
    <div>
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-background">
          <h1 className="font-serif text-5xl md:text-6xl mb-3 fade-in-up">{title}</h1>
          <p className="max-w-xl fade-in opacity-90">{intro}</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setSub("all")}
            className={`px-5 py-2 text-xs uppercase tracking-luxury border transition ${
              sub === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
            }`}
          >
            Tout
          </button>
          {subcategories.map((s) => (
            <button
              key={s.id}
              onClick={() => setSub(s.id)}
              className={`px-5 py-2 text-xs uppercase tracking-luxury border transition ${
                sub === s.id ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
          <p>{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>
          <select className="bg-transparent border-b border-border text-xs uppercase tracking-luxury py-1 focus:outline-none">
            <option>Tri : Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Nouveautés</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
