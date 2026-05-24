import { useState } from "react";

import {
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/lib/cart";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier - Valorie" },
      { name: "description", content: "Votre sélection Valorie." },
    ],
  }),
  component: PanierPage,
});

interface ShippingData {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  email: string;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

function PanierPage() {
  const { items, removeFromCart, updateQty, clearCart } = useCart();
  const [step, setStep] = useState<"panier" | "livraison" | "paiement" | "confirmation">("panier");
  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    email: "",
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal >= 80 ? 0 : 6.9;
  const total = subtotal + shipping;

  const isShippingValid = () => {
    return (
      shippingData.firstName.trim() &&
      shippingData.lastName.trim() &&
      shippingData.address.trim() &&
      shippingData.zipCode.trim() &&
      shippingData.city.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)
    );
  };

  const isPaymentValid = () => {
    return (
      paymentData.cardNumber.replace(/\s/g, "").length === 16 &&
      /^\d{2}\/\d{2}$/.test(paymentData.expiryDate) &&
      paymentData.cvc.length === 3
    );
  };

  const handleShippingSubmit = () => {
    if (!isShippingValid()) {
      toast.error("Veuillez remplir tous les champs correctement");
      return;
    }
    setStep("paiement");
  };

  const handlePaymentSubmit = async () => {
    if (!isPaymentValid()) {
      toast.error("Veuillez vérifier les informations de paiement");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the order to your backend
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          qty: item.qty,
          size: item.size,
          color: item.color,
          price: item.product.price,
        })),
        shipping: shippingData,
        total,
        timestamp: new Date().toISOString(),
      };

      console.log("Order placed:", orderData);
      toast.success("Commande confirmée avec succès!");
      clearCart();
      setStep("confirmation");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Une erreur est survenue lors du paiement");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-2">Votre panier</h1>
          <p className="text-muted-foreground text-sm">Passez votre commande en quelques étapes</p>
        </div>

        {/* Steps */}
        <div className="flex justify-center gap-8 mb-12 text-xs uppercase tracking-luxury">
          {(["panier", "livraison", "paiement", "confirmation"] as const).map((s, i) => (
            <button
              key={s}
              onClick={() => {
                if (step === "confirmation") return;
                if (s === "livraison" && !items.length) return;
                setStep(s);
              }}
              className={`flex items-center gap-2 transition-colors ${
                step === s || (step === "confirmation" && s !== "confirmation")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } ${step === "confirmation" && s !== "confirmation" ? "cursor-default" : "cursor-pointer"}`}
              disabled={step === "confirmation" && s !== "confirmation"}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all ${
                  step === s
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-border"
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </div>

        {step === "confirmation" ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="font-serif text-3xl mb-4">Commande confirmée!</h2>
            <p className="text-muted-foreground mb-8">
              Merci pour votre achat. Un email de confirmation a été envoyé à {shippingData.email}
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity rounded-sm shadow-sm"
            >
              ← Continuer mes achats
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-6 text-5xl">📦</div>
            <p className="text-muted-foreground mb-8 text-lg">Votre panier est vide.</p>
            <p className="text-sm text-muted-foreground mb-8">
              Découvrez notre sélection et ajoutez vos articles préférés.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity rounded-sm shadow-sm"
            >
              → Continuer mes achats
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {step === "panier" &&
                items.map((item) => (
                  <article
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="bg-white rounded-sm border border-border/50 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4 p-6">
                      <Link
                        to="/produit/$id"
                        params={{ id: item.product.id }}
                        className="w-32 h-40 bg-secondary shrink-0 rounded-sm overflow-hidden group"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              {item.product.brand}
                            </p>
                            <h3 className="font-serif text-lg mt-1 leading-tight">
                              {item.product.name}
                            </h3>
                            <div className="mt-3 space-y-1">
                              {item.color && (
                                <p className="text-xs text-muted-foreground">
                                  Couleur:{" "}
                                  <span className="text-foreground font-medium">{item.color}</span>
                                </p>
                              )}
                              {item.size && (
                                <p className="text-xs text-muted-foreground">
                                  Taille:{" "}
                                  <span className="text-foreground font-medium">{item.size}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.size, item.color)
                            }
                            className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2"
                            aria-label="Retirer"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border/30">
                          <div className="inline-flex border border-border rounded-sm">
                            <button
                              onClick={() =>
                                updateQty(item.product.id, item.size, item.color, -1)
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                              aria-label="Diminuer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-4 py-2 text-sm min-w-12 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(item.product.id, item.size, item.color, 1)
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                              aria-label="Augmenter"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-serif text-xl">
                            {(item.product.price * item.qty).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

              {step === "livraison" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleShippingSubmit();
                  }}
                  className="space-y-6 bg-white rounded-sm border border-border/50 p-8"
                >
                  <h2 className="font-serif text-2xl mb-6">Adresse de livraison</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Prénom"
                      value={shippingData.firstName}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, firstName: e.target.value })
                      }
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nom"
                      value={shippingData.lastName}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, lastName: e.target.value })
                      }
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Adresse"
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    required
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Code postal"
                      value={shippingData.zipCode}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, zipCode: e.target.value })
                      }
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Ville"
                      value={shippingData.city}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, city: e.target.value })
                      }
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition sm:col-span-2"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingData.email}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    required
                  />
                </form>
              )}

              {step === "paiement" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePaymentSubmit();
                  }}
                  className="space-y-6 bg-white rounded-sm border border-border/50 p-8"
                >
                  <h2 className="font-serif text-2xl mb-6">Paiement sécurisé</h2>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\s/g, "").slice(0, 16);
                      const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                      setPaymentData({ ...paymentData, cardNumber: formatted });
                    }}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / AA"
                      value={paymentData.expiryDate}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                        const formatted = val.length > 2 ? `${val.slice(0, 2)} / ${val.slice(2)}` : val;
                        setPaymentData({ ...paymentData, expiryDate: formatted });
                      }}
                      maxLength={7}
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      value={paymentData.cvc}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                        setPaymentData({ ...paymentData, cvc: val });
                      }}
                      maxLength={3}
                      className="px-4 py-3 bg-secondary/50 border border-border/30 rounded-sm text-sm placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono"
                      required
                    />
                  </div>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground mt-6">
                    <ShieldCheck className="h-4 w-4 text-green-600" /> Transactions chiffrées et
                    100% sécurisées
                  </p>
                </form>
              )}
            </div>

            <aside className="bg-white rounded-sm border border-border/50 p-8 h-fit sticky top-24">
              <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>
              <div className="space-y-3 text-sm pb-6 border-b border-border/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Offerte" : `${shipping.toFixed(2)} €`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between font-serif text-lg py-6 border-b border-border/30">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)} €</span>
              </div>
              <button
                onClick={() => {
                  if (step === "panier") setStep("livraison");
                  else if (step === "livraison") handleShippingSubmit();
                  else if (step === "paiement") handlePaymentSubmit();
                }}
                disabled={isProcessing}
                className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-luxury font-medium hover:opacity-90 transition-opacity rounded-sm mt-6 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing
                  ? "Traitement en cours..."
                  : step === "paiement"
                    ? "Confirmer la commande"
                    : "Continuer vers l'étape suivante"}
              </button>
              <button
                onClick={() => {
                  if (step === "livraison") setStep("panier");
                  else if (step === "paiement") setStep("livraison");
                }}
                className={`w-full py-3 text-xs uppercase tracking-luxury font-medium mt-3 rounded-sm transition-colors ${step === "panier" ? "opacity-50 cursor-not-allowed" : "border border-border hover:bg-secondary"}`}
                disabled={step === "panier"}
              >
                ← Retour
              </button>
              <div className="mt-8 space-y-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Livraison offerte dès 80€
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Paiement 100% sécurisé
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
