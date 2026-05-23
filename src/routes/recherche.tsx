import heroImg from "@/assets/hero-fashion.png";
import { CategoryPage } from "@/components/CategoryPage";
import { products } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recherche")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    };
  },
  head: () => ({
    meta: [
      { title: "Recherche — Valorie" },
      { name: "description", content: "Résultats de votre recherche sur Valorie." },
    ],
  }),
  component: RecherchePage,
});

function RecherchePage() {
  const { q } = Route.useSearch();
  const searchLower = q.toLowerCase();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.department.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.subcategory.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.colors?.some((c) => c.toLowerCase().includes(searchLower))
  );

  return (
    <CategoryPage
      title={`Recherche: ${q}`}
      intro={`Résultats pour "${q}"`}
      heroImage={heroImg}
      filters={[]}
      products={filtered}
    />
  );
}
