import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { getByDepartment } from "@/lib/products";
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
      filters={[
        { label: "Femme", query: { gender: "femme" } },
        { label: "Homme", query: { gender: "homme" } },
        { label: "Accessoires", query: { category: "accessoires" } },
      ]}
      products={getByDepartment("mode")}
    />
  );
}
