/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import {
  Link,
  useNavigate,
} from "@tanstack/react-router";

import {
  navigationItems,
  NavigationMenu,
} from "./NavigationMenu";

export function Header() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [searchOpen]);

  const toggleMobileCategory = useCallback((label: string) => {
    setExpandedMobile((prev) => (prev === label ? null : label));
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/97 shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "bg-white"
      }`}
    >
      {/* ─── Promo Banner ─── */}
      <div className="bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-6 py-2 text-center text-[10.5px] tracking-[0.18em] uppercase font-medium">
          Livraison offerte dès 80€ - Retours gratuits sous 30 jours
        </div>
      </div>

      {/* ─── Main Header Bar ─── */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center h-14 md:h-16 gap-6">
          {/* Left: Logo */}
          <Link
            to="/"
            className="text-lg md:text-xl font-bold tracking-[0.25em] uppercase text-foreground hover:opacity-70 transition-opacity duration-300 shrink-0 font-serif"
          >
            Valorie
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu />
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-1 md:gap-1.5 ml-auto">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Rechercher"
              className="relative p-2.5 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/70"
            >
              {searchOpen ? <X className="h-4.5 w-4.5" /> : <Search className="h-4.5 w-4.5" />}
            </button>

            {/* Account */}
            <Link
              to="/dashboard"
              aria-label="Tableau de bord"
              className="hidden sm:flex p-2.5 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/70"
            >
              <User className="h-4.5 w-4.5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/favoris"
              aria-label="Favoris"
              className="relative hidden sm:flex p-2.5 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/70"
            >
              <Heart className="h-4.5 w-4.5" />
              {totalFavorites > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/panier"
              aria-label="Panier"
              className="relative p-2.5 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/70"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-foreground text-background text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2.5 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary/70 ml-0.5"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Search Overlay ─── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-border/30 ${
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Rechercher un produit, une catégorie..."
              autoFocus={searchOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = e.currentTarget.value.trim();
                  if (q) {
                    navigate({ to: "/recherche", search: { q } });
                    setSearchOpen(false);
                  }
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border/30 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 rounded-sm transition-all duration-200 placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer (Sheet) ─── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[320px] sm:w-90 p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/30">
            <SheetTitle className="text-left">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-bold tracking-[0.25em] uppercase font-serif"
              >
                Valorie
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              {navigationItems.map((category) => (
                <div key={category.label}>
                  <button
                    onClick={() => toggleMobileCategory(category.label)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium uppercase tracking-wider text-foreground hover:bg-secondary/50 rounded-sm transition-colors duration-200"
                  >
                    {category.label}
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                        expandedMobile === category.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMobile === category.label
                        ? "max-h-125 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-3 pb-2 space-y-0.5">
                      {category.groups.map((group, gIdx) => (
                        <div key={gIdx}>
                          {group.title && (
                            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-luxury text-muted-foreground/60">
                              {group.title}
                            </p>
                          )}
                          {group.items.map((item) => (
                            <SheetClose key={item.label} asChild>
                              <Link
                                to={item.href}
                                search={(item.search || {}) as any}
                                className="block px-3 py-2 text-sm text-foreground/75 hover:text-foreground hover:bg-secondary/40 rounded-sm transition-colors duration-200"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      ))}
                      <SheetClose asChild>
                        <Link
                          to={category.href}
                          className="block px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors duration-200"
                        >
                          Voir tout →
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              ))}

              <SheetClose asChild>
                <Link
                  to="/a-propos"
                  className="block px-3 py-3 text-sm font-medium uppercase tracking-wider text-foreground hover:bg-secondary/50 rounded-sm transition-colors duration-200"
                >
                  À propos
                </Link>
              </SheetClose>
            </div>
          </nav>

          {/* Mobile drawer footer */}
          <div className="border-t border-border/30 px-6 py-5 space-y-3">
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              <User className="h-4 w-4" />
              Tableau de bord
            </Link>
            <Link
              to="/favoris"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              <Heart className="h-4 w-4" />
              Mes favoris
              {totalFavorites > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
