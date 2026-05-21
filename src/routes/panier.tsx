import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ShieldCheck, Truck } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier — Maison Édène" },
      { name: "description", content: "Votre sélection Maison Édène." },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  const [items, setItems] = useState([
    { product: products[0], qty: 1, size: "M", color: "Crème" },
    { product: products[2], qty: 2, size: undefined, color: undefined },
  ]);
  const [step, setStep] = useState<"panier" | "livraison" | "paiement">("panier");

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal >= 80 ? 0 : 6.9;
  const total = subtotal + shipping;

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id: string) => setItems(items.filter(i => i.product.id !== id));

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">Votre panier</h1>

      {/* Steps */}
      <div className="flex justify-center gap-8 mb-12 text-xs uppercase tracking-luxury">
        {(["panier", "livraison", "paiement"] as const).map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`flex items-center gap-2 ${step === s ? "text-foreground" : "text-muted-foreground"}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === s ? "bg-primary text-primary-foreground" : "border border-border"}`}>
              {i + 1}
            </span>
            {s}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-6">Votre panier est vide.</p>
          <Link to="/" className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury">
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {step === "panier" && items.map((item) => (
              <article key={item.product.id} className="flex gap-4 pb-6 border-b border-border">
                <Link to="/produit/$id" params={{ id: item.product.id }} className="w-28 h-36 bg-secondary flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{item.product.brand}</p>
                      <h3 className="font-serif text-xl">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.color && `${item.color}`}{item.color && item.size && " · "}{item.size && `Taille ${item.size}`}
                      </p>
                    </div>
                    <button onClick={() => remove(item.product.id)} aria-label="Retirer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="inline-flex border border-border">
                      <button onClick={() => updateQty(item.product.id, -1)} className="p-2"><Minus className="h-3 w-3" /></button>
                      <span className="px-4 py-2 text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-serif text-lg">{(item.product.price * item.qty).toFixed(2)} €</p>
                  </div>
                </div>
              </article>
            ))}

            {step === "livraison" && (
              <form className="space-y-4">
                <h2 className="font-serif text-2xl mb-4">Adresse de livraison</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Prénom" className="px-4 py-3 bg-secondary border-0 text-sm" />
                  <input placeholder="Nom" className="px-4 py-3 bg-secondary border-0 text-sm" />
                </div>
                <input placeholder="Adresse" className="w-full px-4 py-3 bg-secondary border-0 text-sm" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <input placeholder="Code postal" className="px-4 py-3 bg-secondary border-0 text-sm" />
                  <input placeholder="Ville" className="px-4 py-3 bg-secondary border-0 text-sm sm:col-span-2" />
                </div>
                <input placeholder="Email" type="email" className="w-full px-4 py-3 bg-secondary border-0 text-sm" />
              </form>
            )}

            {step === "paiement" && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl mb-4">Paiement sécurisé</h2>
                <input placeholder="Numéro de carte" className="w-full px-4 py-3 bg-secondary border-0 text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM / AA" className="px-4 py-3 bg-secondary border-0 text-sm" />
                  <input placeholder="CVC" className="px-4 py-3 bg-secondary border-0 text-sm" />
                </div>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /> Transactions chiffrées et 100% sécurisées
                </p>
              </div>
            )}
          </div>

          <aside className="bg-secondary p-8 h-fit">
            <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>
            <div className="space-y-3 text-sm pb-6 border-b border-border">
              <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Offerte" : `${shipping.toFixed(2)} €`}</span>
              </div>
            </div>
            <div className="flex justify-between font-serif text-xl py-6">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button
              onClick={() => {
                if (step === "panier") setStep("livraison");
                else if (step === "livraison") setStep("paiement");
              }}
              className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-luxury hover:opacity-90"
            >
              {step === "paiement" ? "Confirmer la commande" : "Continuer"}
            </button>
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Truck className="h-3 w-3" /> Livraison offerte dès 80€</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Paiement sécurisé</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
