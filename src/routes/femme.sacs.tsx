import heroImg from "@/assets/category-mode.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/femme/sacs")({
  head: () => ({
    meta: [
      { title: "Sacs & accessoires femme — Valorie" },
      { name: "description", content: "Sacs et accessoires femme." },
    ],
  }),
  component: FemmeSacsPage,
});

function FemmeSacsPage() {
  const filtered = products.filter((p) => p.department === "mode" && p.category === "sacs" && (p.gender === "femme" || p.gender === "mixte"));

  return (
    <CategoryPage
      title="Sacs"
      intro="Découvrez notre sélection de sacs pour femme."
      heroImage={heroImg}
      filters={[]}
      products={filtered}
    />
  );
}
