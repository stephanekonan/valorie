import heroImg from "@/assets/category-mode.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/femme")({
  head: () => ({
    meta: [
      { title: "Femme — Valorie" },
      { name: "description", content: "Vêtements, sacs et accessoires femme Valorie." },
    ],
  }),
  component: FemmePage,
});

function FemmePage() {
  return (
    <CategoryPage
      title="Femme"
      intro="Les essentiels du vestiaire féminin : silhouettes nettes, beaux volumes et accessoires du quotidien."
      heroImage={heroImg}
      filters={[
        { label: "Vêtements", query: { category: "vetements" } },
        { label: "Sacs & accessoires", href: "/femme/sacs", query: {} },
      ]}
      products={products.filter(
        (p) => p.department === "mode" && (p.gender === "femme" || p.gender === "mixte"),
      )}
    />
  );
}
