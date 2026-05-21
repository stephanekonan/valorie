import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-4">Maison Édène</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une maison française dédiée à la beauté, à la mode et au raffinement du quotidien.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="hover:text-accent-foreground"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-accent-foreground"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-accent-foreground"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-luxury mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/mode" className="hover:text-foreground">Mode</Link></li>
              <li><Link to="/cosmetique" className="hover:text-foreground">Cosmétique</Link></li>
              <li><a href="#" className="hover:text-foreground">Nouveautés</a></li>
              <li><a href="#" className="hover:text-foreground">Best-sellers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-luxury mb-4">Service client</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Livraison & retours</a></li>
              <li><a href="#" className="hover:text-foreground">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">Nous contacter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-luxury mb-4">La Maison</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/a-propos" className="hover:text-foreground">Notre histoire</Link></li>
              <li><a href="#" className="hover:text-foreground">Engagements</a></li>
              <li><a href="#" className="hover:text-foreground">Carrières</a></li>
              <li><a href="#" className="hover:text-foreground">Presse</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Maison Édène. Tous droits réservés.</p>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>American Express</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
