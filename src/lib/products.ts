import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "mode" | "cosmetique";
  subcategory: string;
  badge?: "Nouveau" | "Bestseller";
  description: string;
  colors?: string[];
  sizes?: string[];
  brand: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "pull-cashmere-creme",
    name: "Pull cachemire oversize",
    price: 189,
    image: product1,
    category: "mode",
    subcategory: "femme",
    badge: "Bestseller",
    brand: "Maison Élise",
    description: "Pull en cachemire pur, coupe oversize pour un confort absolu. Doux, chaud et intemporel.",
    colors: ["Crème", "Taupe", "Noir"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "sac-cuir-nude",
    name: "Sac cabas en cuir",
    price: 295,
    image: product2,
    category: "mode",
    subcategory: "accessoires",
    badge: "Nouveau",
    brand: "Atelier Rive",
    description: "Sac cabas en cuir véritable, finitions soignées et format idéal pour le quotidien.",
    colors: ["Nude", "Cognac", "Noir"],
    rating: 4.9,
    reviews: 87,
  },
  {
    id: "serum-eclat",
    name: "Sérum éclat vitaminé",
    price: 68,
    image: product3,
    category: "cosmetique",
    subcategory: "visage",
    badge: "Bestseller",
    brand: "Botanique",
    description: "Un sérum concentré pour une peau lumineuse et repulpée dès la première application.",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: "rouge-mat-nude",
    name: "Rouge à lèvres mat nude",
    price: 32,
    image: product4,
    category: "cosmetique",
    subcategory: "maquillage",
    badge: "Nouveau",
    brand: "Lude",
    description: "Une formule mate longue tenue, confortable, dans une teinte nude universelle.",
    colors: ["Nude rosé", "Beige", "Terracotta"],
    rating: 4.6,
    reviews: 96,
  },
  {
    id: "robe-soie-beige",
    name: "Robe en soie midi",
    price: 245,
    image: product5,
    category: "mode",
    subcategory: "femme",
    brand: "Maison Élise",
    description: "Robe midi en soie fluide, parfaite pour les soirées et événements raffinés.",
    colors: ["Beige", "Ivoire", "Sauge"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviews: 58,
  },
  {
    id: "creme-hydratante",
    name: "Crème hydratante nuit",
    price: 78,
    image: product6,
    category: "cosmetique",
    subcategory: "visage",
    badge: "Bestseller",
    brand: "Botanique",
    description: "Une crème nuit régénérante aux actifs naturels pour réveiller votre éclat.",
    rating: 4.8,
    reviews: 214,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (cat: "mode" | "cosmetique") =>
  products.filter((p) => p.category === cat);
