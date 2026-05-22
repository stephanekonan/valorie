import heroImg from "@/assets/category-cosmetique.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { getByCategory } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cosmetique")({
  head: () => ({
    meta: [
      { title: "Cosmétique — Valorie" },
      {
        name: "description",
        content:
          "Soin visage, soin corps et maquillage : nos rituels beauté pour révéler votre éclat naturel.",
      },
    ],
  }),
  component: CosmetiquePage,
});

function CosmetiquePage() {
  return (
    <CategoryPage
      title="Cosmétique"
      intro="Des soins inspirés de la nature, pensés pour révéler votre éclat singulier."
      heroImage={heroImg}
      subcategories={[
        { id: "visage", label: "Soin visage" },
        { id: "corps", label: "Soin corps" },
        { id: "maquillage", label: "Maquillage" },
      ]}
      products={getByCategory("cosmetique")}
    />
  );
}
