import heroImg from "@/assets/category-mode.jpg";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sacs-femme/c/$color")({
  head: () => ({
    meta: [
      { title: "Sacs femme — Valorie" },
      { name: "description", content: "Sacs femme en exclusivité" },
    ],
  }),
  component: SacsFemmeCouleurPage,
});

function SacsFemmeCouleurPage() {
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
        { id: "all", label: "Tous les sacs", href: "/femme/sacs" },
        { id: "noir", label: "Noir", href: "/sacs-femme/c/noir" },
        { id: "blanc", label: "Blanc", href: "/sacs-femme/c/blanc" },
        { id: "marron", label: "Marron", href: "/sacs-femme/c/marron" },
      ]}
      products={filtered}
      selectedColor={color}
    />
  );
}
