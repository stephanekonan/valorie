import heroImg from "@/assets/category-mode.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/femme/sacs/c/$color")({
  head: () => ({
    meta: [
      { title: "Sacs femme — Valorie" },
      { name: "description", content: "Sacs femme en exclusivité" },
    ],
  }),
  component: FemmeSacsCouleurPage,
});

function FemmeSacsCouleurPage() {
  const { color } = Route.useParams();
  const colorLabel = color.charAt(0).toUpperCase() + color.slice(1);

  const filtered = products.filter((p) => {
    const hasColor = p.colors && p.colors.some((c) => c.toLowerCase() === color.toLowerCase());
    return p.category === "mode" && p.subcategory === "accessoires" && hasColor;
  });

  return (
    <CategoryPage
      title={`Sacs femme ${colorLabel}`}
      intro={`Découvrez nos sacs femme en ${colorLabel}`}
      heroImage={heroImg}
      subcategories={[
        { id: "all", label: "Tous les sacs" },
        { id: "noir", label: "Noir", href: "/femme/sacs/c/noir" },
        { id: "blanc", label: "Blanc", href: "/femme/sacs/c/blanc" },
        { id: "marron", label: "Marron", href: "/femme/sacs/c/marron" },
      ]}
      products={filtered}
      selectedColor={color}
    />
  );
}
