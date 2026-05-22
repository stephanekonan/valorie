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
  const filtered = products.filter((p) => p.category === "mode" && p.subcategory === "accessoires");

  return (
    <CategoryPage
      title="Sacs & accessoires"
      intro="Découvrez notre sélection de sacs et accessoires pour femme."
      heroImage={heroImg}
      subcategories={[
        { id: "all", label: "Tous les sacs" },
        { id: "noir", label: "Noir", href: "/femme/sacs/c/noir" },
        { id: "blanc", label: "Blanc", href: "/femme/sacs/c/blanc" },
        { id: "marron", label: "Marron", href: "/femme/sacs/c/marron" },
      ]}
      products={filtered}
    />
  );
}
