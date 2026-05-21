import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-2 text-center text-xs tracking-luxury uppercase text-muted-foreground">
          Livraison offerte dès 80€ — Retours gratuits sous 30 jours
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider uppercase">
            <Link to="/mode" className="hover:text-accent-foreground transition-colors" activeProps={{ className: "text-accent-foreground" }}>
              Mode
            </Link>
            <Link to="/cosmetique" className="hover:text-accent-foreground transition-colors">
              Cosmétique
            </Link>
            <Link to="/a-propos" className="hover:text-accent-foreground transition-colors">
              À propos
            </Link>
          </nav>

          <Link to="/" className="font-serif text-3xl md:text-4xl tracking-tight">
            Maison Édène
          </Link>

          <div className="flex items-center gap-4">
            <button aria-label="Recherche" className="hover:text-accent-foreground transition-colors hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Compte" className="hover:text-accent-foreground transition-colors hidden sm:block">
              <User className="h-5 w-5" />
            </button>
            <button aria-label="Favoris" className="hover:text-accent-foreground transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <Link to="/panier" aria-label="Panier" className="relative hover:text-accent-foreground transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden md:block pb-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher un produit, une marque..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border-0 text-sm focus:outline-none focus:ring-1 focus:ring-ring rounded-sm"
            />
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 text-sm uppercase tracking-wider">
            <Link to="/mode" onClick={() => setMobileOpen(false)}>Mode</Link>
            <Link to="/cosmetique" onClick={() => setMobileOpen(false)}>Cosmétique</Link>
            <Link to="/a-propos" onClick={() => setMobileOpen(false)}>À propos</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
