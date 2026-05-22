import { useState } from "react";

import {
  Heart,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import {
  getProduct,
  products,
} from "@/lib/products";
import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — Valorie` : "Produit" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Produit introuvable</h1>
      <Link to="/" className="text-xs uppercase tracking-luxury border-b border-foreground pb-1">
        Retour à l'accueil
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useCart();
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    {
      author: "Camille L.",
      rating: 5,
      date: "il y a 2 semaines",
      text: "Magnifique pièce, conforme à la description. La qualité est incroyable et la livraison rapide.",
    },
    {
      author: "Sophie M.",
      rating: 5,
      date: "il y a 1 mois",
      text: "Mon coup de cœur de la saison. Je recommande les yeux fermés.",
    },
    {
      author: "Léa D.",
      rating: 4,
      date: "il y a 1 mois",
      text: "Très belle qualité, je retire une étoile pour la taille un peu grande.",
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-6 py-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={product.category === "mode" ? "/mode" : "/cosmetique"}
          className="hover:text-foreground capitalize"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div className="bg-secondary aspect-4/5">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="lg:py-8">
          <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-2">
            {product.brand}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= Math.round(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviews} avis
            </span>
          </div>

          <p className="text-2xl font-serif mb-8">{product.price} €</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

          {product.colors && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-luxury mb-3">
                Couleur :{" "}
                <span className="text-muted-foreground normal-case tracking-normal">{color}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-xs border ${color === c ? "border-foreground" : "border-border"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-luxury mb-3">Taille</p>
              <div className="flex gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 text-sm border ${size === s ? "border-foreground bg-foreground text-background" : "border-border"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs uppercase tracking-luxury mb-3">Quantité</p>
            <div className="inline-flex border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3">
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-6 py-3 text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                addToCart(product, qty, size, color);
                toast.success(
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground">Ajouté au panier !</span>
                    <span className="text-xs text-muted-foreground">
                      <strong>{product.name}</strong> ({qty}x) a été ajouté à votre sélection.
                    </span>
                  </div>
                );
              }}
              className="flex-1 bg-primary text-primary-foreground py-4 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity"
            >
              Ajouter au panier
            </button>
            <button
              aria-label="Favoris"
              className="border border-border px-5 hover:border-foreground"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="border-t border-border pt-6 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4" /> Livraison offerte dès 80€
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4" /> Retours gratuits sous 30 jours
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" /> Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="font-serif text-3xl md:text-4xl mb-10 text-center">Avis clients</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <article key={r.author} className="bg-secondary p-6">
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i <= r.rating ? "fill-foreground text-foreground" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm mb-4 leading-relaxed">"{r.text}"</p>
              <p className="text-xs uppercase tracking-luxury text-muted-foreground">
                {r.author} · {r.date}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SIMILAIRES */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-10 text-center">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
