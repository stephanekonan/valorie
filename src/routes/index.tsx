import cosmetiqueImg from "@/assets/category-cosmetique.jpg";
import modeImg from "@/assets/category-mode.jpg";
import heroImg from "@/assets/hero-fashion.png";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valorie - L'art du raffinement" },
      {
        name: "description",
        content:
          "Découvrez la nouvelle collection mode et cosmétique de Valorie : élégance parisienne, beauté naturelle.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const nouveautes = products.filter((p) => p.badge === "Nouveau").slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[90vh] min-h-150 overflow-hidden">
        <img
          src={heroImg}
          alt="Collection Valorie"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/40 via-background/10 to-transparent" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl fade-in-up">
            <p className="text-xs uppercase tracking-luxury mb-4">Collection Automne 2026</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              L'élégance,
              <br />à fleur de peau.
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-md">
              Une sélection raffinée de pièces mode et soins beauté, pensée pour celles et ceux qui
              cultivent la beauté du quotidien.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/mode"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity"
              >
                Découvrir la mode
              </Link>
              <Link
                to="/cosmetique"
                className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:bg-foreground hover:text-background transition-colors"
              >
                Explorer les soins
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-3">
            L'univers Édène
          </p>
          <h2 className="text-4xl md:text-5xl">Deux mondes, une signature</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/mode" className="group block hover-zoom relative aspect-4/5 overflow-hidden">
            <img
              src={modeImg}
              alt="Mode"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
              <p className="text-xs uppercase tracking-luxury mb-2 opacity-80">
                Vêtements & accessoires
              </p>
              <h3 className="font-serif text-4xl mb-2">Mode</h3>
              <span className="text-sm border-b border-background pb-1">Découvrir →</span>
            </div>
          </Link>
          <Link
            to="/cosmetique"
            className="group block hover-zoom relative aspect-4/5 overflow-hidden"
          >
            <img
              src={cosmetiqueImg}
              alt="Cosmétique"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
              <p className="text-xs uppercase tracking-luxury mb-2 opacity-80">
                Soins & maquillage
              </p>
              <h3 className="font-serif text-4xl mb-2">Cosmétique</h3>
              <span className="text-sm border-b border-background pb-1">Découvrir →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* NOUVEAUTÉS */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-2">
              Tout juste arrivé
            </p>
            <h2 className="text-3xl md:text-4xl">Nouveautés</h2>
          </div>
          <Link
            to="/mode"
            className="text-xs uppercase tracking-luxury border-b border-foreground pb-1 hidden sm:block"
          >
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {nouveautes.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BEST-SELLERS */}
      <section className="bg-secondary py-24 mt-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-2">
              Vos préférés
            </p>
            <h2 className="text-3xl md:text-4xl">Nos best-sellers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              t: "Beauté responsable",
              d: "Des formulations clean, des matières nobles, des partenaires choisis.",
            },
            {
              t: "Livraison soignée",
              d: "Emballage éco-conçu, livraison offerte dès 80€ en France.",
            },
            {
              t: "Conseil sur-mesure",
              d: "Notre équipe vous accompagne, du choix d'un produit à votre routine.",
            },
          ].map((i) => (
            <div key={i.t}>
              <h3 className="font-serif text-2xl mb-3">{i.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
