import heroImg from "@/assets/category-mode.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sacs-femme/c/noir")({
  head: () => ({
    meta: [
      { title: "Sacs femme noirs — Valorie" },
      {
        name: "description",
        content: "Sélection de sacs femme noirs et accessoires élégants Valorie.",
      },
    ],
  }),
  component: SacsFemmeNoirPage,
});

function SacsFemmeNoirPage() {
  const selection = products.filter((p) => p.category === "mode" && p.colors?.includes("Noir"));

  return (
    <CategoryPage
      title="Sacs femme noirs"
      intro="Une sélection graphique et intemporelle pensée pour accompagner chaque silhouette."
      heroImage={heroImg}
      subcategories={[
        { id: "accessoires", label: "Sacs" },
        { id: "femme", label: "Mode femme" },
      ]}
      products={selection}
    />
  );
}
