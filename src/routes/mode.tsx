import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { getByCategory } from "@/lib/products";
import heroImg from "@/assets/category-mode.jpg";

export const Route = createFileRoute("/mode")({
  head: () => ({
    meta: [
      { title: "Mode — Valorie" },
      {
        name: "description",
        content:
          "Vêtements femme, homme et accessoires : la collection mode Valorie, élégante et intemporelle.",
      },
    ],
  }),
  component: ModePage,
});

function ModePage() {
  return (
    <CategoryPage
      title="Mode"
      intro="Des pièces intemporelles, des matières nobles, une coupe parfaite."
      heroImage={heroImg}
      subcategories={[
        { id: "femme", label: "Femme" },
        { id: "homme", label: "Homme" },
        { id: "accessoires", label: "Accessoires" },
      ]}
      products={getByCategory("mode")}
    />
  );
}
