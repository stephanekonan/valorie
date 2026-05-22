import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Package,
  ShoppingBag,
  ShoppingBag as CartIcon,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  toast,
  Toaster,
} from "sonner";

import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de Bord — Valorie" },
      { name: "description", content: "Supervision des ventes et statistiques de Valorie." },
    ],
  }),
  component: DashboardPage,
});

type Order = {
  id: string;
  customerName: string;
  time: string;
  productName: string;
  amount: number;
  status: "Payé" | "En cours" | "Expédié";
  category: "mode" | "cosmetique";
};

// Initial simulated orders
const INITIAL_ORDERS: Order[] = [
  {
    id: "CMD-2026-981",
    customerName: "Camille Laurent",
    time: "Il y a 10 min",
    productName: "Sac Porté Épaule Cuir Noir",
    amount: 320,
    status: "Payé",
    category: "mode",
  },
  {
    id: "CMD-2026-980",
    customerName: "Thomas Dubois",
    time: "Il y a 45 min",
    productName: "Sérum Anti-Âge Cellulaire",
    amount: 82,
    status: "En cours",
    category: "cosmetique",
  },
  {
    id: "CMD-2026-979",
    customerName: "Sophie Martin",
    time: "Il y a 2 h",
    productName: "Robe Cache-Cœur Fleurie",
    amount: 185,
    status: "Expédié",
    category: "mode",
  },
  {
    id: "CMD-2026-978",
    customerName: "Emma Bernard",
    time: "Il y a 4 h",
    productName: "Crème Hydratante Intense Rose",
    amount: 54,
    status: "Payé",
    category: "cosmetique",
  },
  {
    id: "CMD-2026-977",
    customerName: "Lucas Petit",
    time: "Il y a 6 h",
    productName: "Sweat Brodé Valorie",
    amount: 95,
    status: "Expédié",
    category: "mode",
  },
];

const INITIAL_SALES_DATA = [
  { name: "Lun", ventes: 1420, commandes: 8 },
  { name: "Mar", ventes: 2150, commandes: 12 },
  { name: "Mer", ventes: 1890, commandes: 11 },
  { name: "Jeu", ventes: 2840, commandes: 16 },
  { name: "Ven", ventes: 3100, commandes: 19 },
  { name: "Sam", ventes: 4250, commandes: 26 },
  { name: "Dim", ventes: 3890, commandes: 22 },
];

const FIRST_NAMES = ["Alice", "Chloé", "Julien", "Antoine", "Sarah", "Manon", "Mathieu", "Inès", "Hugo", "Léa"];
const LAST_NAMES = ["Moreau", "Roux", "Fournier", "Girard", "Mercier", "Lefebvre", "Garcia", "Michel", "Boyer", "Bonnet"];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sales" | "inventory">("overview");
  const [period, setPeriod] = useState<"7d" | "30d" | "y">("7d");
  const [isMounted, setIsMounted] = useState(false);

  // Live states for simulation
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [salesData, setSalesData] = useState(INITIAL_SALES_DATA);
  const [stockLevels, setStockLevels] = useState<{ [key: string]: number }>(() => {
    // Generate initial semi-random stock levels for all products
    const initialStocks: { [key: string]: number } = {};
    products.forEach((p) => {
      // Bestsellers have lower stock to trigger alert warnings
      initialStocks[p.id] = p.badge === "Bestseller" ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 25) + 6;
    });
    return initialStocks;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute stats dynamically
  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + o.amount, 19540); // Base revenue + new ones
    const totalOrders = orders.length + 114; // Base orders + new ones
    const averageBasket = Math.round(totalSales / totalOrders);
    return {
      revenue: totalSales,
      ordersCount: totalOrders,
      averageBasket,
      conversionRate: 3.42,
    };
  }, [orders]);

  // Compute category sales dynamically
  const categoryData = useMemo(() => {
    let modeSales = 12450;
    let cosmeSales = 7090;

    orders.forEach((o) => {
      // Only count newly simulated orders (existing are already in the base totals)
      if (!INITIAL_ORDERS.some(io => io.id === o.id)) {
        if (o.category === "mode") {
          modeSales += o.amount;
        } else {
          cosmeSales += o.amount;
        }
      }
    });

    return [
      { name: "Mode", value: modeSales, color: "oklch(0.28 0.012 60)" },
      { name: "Cosmétique", value: cosmeSales, color: "oklch(0.85 0.035 25)" },
    ];
  }, [orders]);

  // Handle sale simulation
  const handleSimulateSale = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const randomLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const idNum = Math.floor(Math.random() * 900) + 100;
    const randomStatus: "Payé" | "En cours" = Math.random() > 0.3 ? "Payé" : "En cours";

    const newOrder: Order = {
      id: `CMD-2026-${idNum}`,
      customerName: `${randomFirstName} ${randomLastName}`,
      time: "À l'instant",
      productName: randomProduct.name,
      amount: randomProduct.price,
      status: randomStatus,
      category: randomProduct.category,
    };

    // 1. Add order to list
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Decrement stock
    setStockLevels((prev) => {
      const currentStock = prev[randomProduct.id] || 0;
      const newStock = Math.max(0, currentStock - 1);
      if (newStock <= 3) {
        toast.warning(`Alerte de stock : ${randomProduct.name} n'a plus que ${newStock} pièces disponibles !`);
      }
      return {
        ...prev,
        [randomProduct.id]: newStock,
      };
    });

    // 3. Update charts (increment Sunday/Dim in 7d chart as live simulation day)
    setSalesData((prev) => {
      return prev.map((day) => {
        if (day.name === "Dim") {
          return {
            ...day,
            ventes: day.ventes + randomProduct.price,
            commandes: day.commandes + 1,
          };
        }
        return day;
      });
    });

    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-foreground">Nouvelle vente simulée !</span>
        <span className="text-xs text-muted-foreground">
          {newOrder.customerName} a acheté : <strong>{newOrder.productName}</strong> ({newOrder.amount} €)
        </span>
      </div>
    );
  };

  const lowStockProducts = useMemo(() => {
    return products
      .map((p) => ({ ...p, stock: stockLevels[p.id] ?? 0 }))
      .filter((p) => p.stock <= 4)
      .sort((a, b) => a.stock - b.stock);
  }, [stockLevels]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Toaster position="top-right" richColors />

      {/* Header section */}
      <section className="bg-secondary/40 border-b border-border/40 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-luxury text-muted-foreground/80 mb-1">
                Espace Administration
              </p>
              <h1 className="text-4xl font-serif">Tableau de bord</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSimulateSale}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 transition px-5 py-3 text-xs uppercase tracking-luxury font-medium rounded-sm cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4.5 w-4.5 text-accent" />
                Simuler une vente
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard navigation tabs & filters */}
      <section className="container mx-auto px-6 mt-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-border/40 pb-4 mb-8">
          <div className="flex border border-border/60 bg-secondary/20 p-1 rounded-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2.5 text-xs uppercase tracking-luxury font-medium transition rounded-sm ${
                activeTab === "overview" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`px-5 py-2.5 text-xs uppercase tracking-luxury font-medium transition rounded-sm ${
                activeTab === "sales" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ventes détaillées
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-5 py-2.5 text-xs uppercase tracking-luxury font-medium transition rounded-sm ${
                activeTab === "inventory" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Stocks & Alertes
            </button>
          </div>

          <div className="flex items-center gap-1 border border-border/60 bg-secondary/20 p-1 rounded-sm self-end lg:self-auto">
            {(["7d", "30d", "y"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`w-10 py-1.5 text-xs font-semibold uppercase rounded-sm transition ${
                  period === p ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "7d" ? "7j" : p === "30d" ? "30j" : "1a"}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TAB: OVERVIEW ─── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card Revenue */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-secondary/80 rounded-sm">
                    <DollarSign className="h-5 w-5 text-foreground/80" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3" /> +12.4%
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Chiffre d'affaires</p>
                <h3 className="text-3xl font-serif mt-1 font-semibold">
                  {stats.revenue.toLocaleString("fr-FR")} €
                </h3>
                <p className="text-[10px] text-muted-foreground mt-2">vs 17 380 € la période précédente</p>
              </div>

              {/* Card Orders */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-secondary/80 rounded-sm">
                    <ShoppingBag className="h-5 w-5 text-foreground/80" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3" /> +8.3%
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Commandes validées</p>
                <h3 className="text-3xl font-serif mt-1 font-semibold">{stats.ordersCount}</h3>
                <p className="text-[10px] text-muted-foreground mt-2">Taux de retour moyen : 1.2%</p>
              </div>

              {/* Card Avg Basket */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-secondary/80 rounded-sm">
                    <CartIcon className="h-5 w-5 text-foreground/80" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    <TrendingDown className="h-3 w-3" /> -1.8%
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Panier moyen</p>
                <h3 className="text-3xl font-serif mt-1 font-semibold">{stats.averageBasket} €</h3>
                <p className="text-[10px] text-muted-foreground mt-2">Obj. annuel fixé à 180 €</p>
              </div>

              {/* Card Conversion */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-secondary/80 rounded-sm">
                    <Users className="h-5 w-5 text-foreground/80" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3" /> +2.1%
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Taux de conversion</p>
                <h3 className="text-3xl font-serif mt-1 font-semibold">{stats.conversionRate} %</h3>
                <p className="text-[10px] text-muted-foreground mt-2">26 480 visiteurs uniques</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Sales History Area Chart */}
              <div className="lg:col-span-2 bg-white border border-border/50 p-6 rounded-sm shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-luxury text-foreground">Évolution des ventes</h4>
                  <span className="text-[11px] text-muted-foreground">En direct</span>
                </div>
                <div className="h-80 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.28 0.012 60)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="oklch(0.28 0.012 60)" stopOpacity={0.01} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                          labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
                        />
                        <Area type="monotone" dataKey="ventes" name="Ventes (€)" stroke="oklch(0.28 0.012 60)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full bg-secondary/10 flex items-center justify-center text-xs text-muted-foreground">Chargement des données...</div>
                  )}
                </div>
              </div>

              {/* Category Share Pie Chart */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs flex flex-col">
                <h4 className="text-sm font-semibold uppercase tracking-luxury text-foreground mb-6">Répartition par Univers</h4>
                <div className="flex-1 h-56 w-full flex items-center justify-center">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString()} €`} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full bg-secondary/10 flex items-center justify-center text-xs text-muted-foreground">Chargement...</div>
                  )}
                </div>
                <div className="flex justify-center gap-6 text-xs mt-4">
                  {categoryData.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-muted-foreground">{c.name} :</span>
                      <strong className="text-foreground">{Math.round((c.value / stats.revenue) * 100)}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Recent Orders & Stock Alert */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Orders Table */}
              <div className="lg:col-span-2 bg-white border border-border/50 p-6 rounded-sm shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-luxury text-foreground">Dernières commandes</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Temps réel
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border/60 text-muted-foreground text-xs uppercase tracking-wider pb-3">
                        <th className="py-3 font-semibold">Commande</th>
                        <th className="py-3 font-semibold">Client</th>
                        <th className="py-3 font-semibold">Article</th>
                        <th className="py-3 font-semibold">Montant</th>
                        <th className="py-3 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-secondary/10 transition duration-150">
                          <td className="py-3 font-medium text-foreground">{o.id}</td>
                          <td className="py-3 text-muted-foreground">{o.customerName}</td>
                          <td className="py-3 text-foreground/80 max-w-50 truncate">{o.productName}</td>
                          <td className="py-3 font-semibold text-foreground">{o.amount} €</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                o.status === "Payé"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : o.status === "En cours"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {o.status === "Payé" && <CheckCircle className="h-2.5 w-2.5" />}
                              {o.status === "En cours" && <Clock className="h-2.5 w-2.5" />}
                              {o.status === "Expédié" && <ArrowUpRight className="h-2.5 w-2.5" />}
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stock Alerts Column */}
              <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-luxury text-foreground">Alertes Stocks</h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    {lowStockProducts.length} alertes
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto max-h-80 space-y-4 pr-1">
                  {lowStockProducts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                      <CheckCircle className="h-8 w-8 text-emerald-500 mb-2" />
                      <p className="text-sm">Tous les stocks sont normaux.</p>
                    </div>
                  ) : (
                    lowStockProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between border-b border-border/20 pb-3 last:border-b-0">
                        <div className="flex gap-3 items-center">
                          <img src={p.image} alt={p.name} className="h-10 w-10 object-cover rounded-sm border border-border/30" />
                          <div>
                            <p className="text-xs font-semibold text-foreground max-w-35 truncate">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{p.brand}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-sm ${
                            p.stock === 0
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            <AlertTriangle className="h-3 w-3" /> {p.stock === 0 ? "Rupture" : `${p.stock} restants`}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: SALES DETAILS ─── */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-luxury mb-6 text-foreground">Analyse Détaillée des Ventes</h3>
              <div className="h-96 w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Bar dataKey="ventes" name="Volume d'affaires (€)" fill="oklch(0.28 0.012 60)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="commandes" name="Nombre de commandes" fill="oklch(0.85 0.035 25)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">Chargement...</div>
                )}
              </div>
            </div>

            <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-luxury mb-4 text-foreground">Historique complet de la session</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-muted-foreground text-xs uppercase tracking-wider pb-3">
                      <th className="py-3 font-semibold">Identifiant</th>
                      <th className="py-3 font-semibold">Date / Heure</th>
                      <th className="py-3 font-semibold">Client</th>
                      <th className="py-3 font-semibold">Produit commandé</th>
                      <th className="py-3 font-semibold">Univers</th>
                      <th className="py-3 font-semibold">Montant TTC</th>
                      <th className="py-3 font-semibold">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-secondary/10 transition duration-150">
                        <td className="py-3 font-medium text-foreground">{o.id}</td>
                        <td className="py-3 text-muted-foreground text-xs">{o.time}</td>
                        <td className="py-3 text-foreground/80">{o.customerName}</td>
                        <td className="py-3 font-medium text-foreground/90">{o.productName}</td>
                        <td className="py-3 text-xs uppercase tracking-wider text-muted-foreground">{o.category}</td>
                        <td className="py-3 font-semibold text-foreground">{o.amount} €</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              o.status === "Payé"
                                ? "bg-emerald-50 text-emerald-700"
                                : o.status === "En cours"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: INVENTORY & STOCK MANAGEMENT ─── */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">Stocks Normaux</h4>
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-serif text-emerald-950 font-bold">
                  {products.length - lowStockProducts.length} <span className="text-xs font-sans text-emerald-800 font-medium">produits</span>
                </h3>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs uppercase tracking-wider text-amber-800 font-semibold">Stocks Faibles</h4>
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-3xl font-serif text-amber-950 font-bold">
                  {lowStockProducts.filter(p => p.stock > 0).length} <span className="text-xs font-sans text-amber-800 font-medium">références</span>
                </h3>
              </div>

              <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs uppercase tracking-wider text-rose-800 font-semibold">Ruptures de Stock</h4>
                  <Package className="h-5 w-5 text-rose-600" />
                </div>
                <h3 className="text-3xl font-serif text-rose-950 font-bold">
                  {lowStockProducts.filter(p => p.stock === 0).length} <span className="text-xs font-sans text-rose-800 font-medium">produits</span>
                </h3>
              </div>
            </div>

            <div className="bg-white border border-border/50 p-6 rounded-sm shadow-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-luxury text-foreground">Catalogue & Disponibilité en temps réel</h3>
                <span className="text-xs text-muted-foreground">Cliquez sur un produit pour réapprovisionner (+10 pièces)</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((p) => {
                  const stock = stockLevels[p.id] ?? 0;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setStockLevels((prev) => ({
                          ...prev,
                          [p.id]: (prev[p.id] || 0) + 10,
                        }));
                        toast.info(`Réapprovisionnement : +10 pièces pour ${p.name}`);
                      }}
                      className="border border-border/40 p-4 rounded-sm flex items-center gap-3 cursor-pointer hover:border-foreground/40 hover:bg-secondary/10 transition duration-200"
                    >
                      <img src={p.image} alt={p.name} className="h-12 w-12 object-cover rounded-sm border border-border/20" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{p.brand} — {p.price} €</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className={`h-2 w-2 rounded-full ${
                            stock === 0
                              ? "bg-rose-500"
                              : stock <= 4
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`} />
                          <span className="text-xs text-muted-foreground font-medium">Stock : {stock}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
