import heroImg from "@/assets/hero-fashion.png";
import { Newsletter } from "@/components/Newsletter";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos - Valorie" },
      {
        name: "description",
        content:
          "L'histoire, les valeurs et les engagements de Valorie, maison française de mode et cosmétique.",
      },
    ],
  }),
  component: AProposPage,
});

function AProposPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-100 overflow-hidden">
        <img
          src={heroImg}
          alt="Valorie"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-background">
          <p className="text-xs uppercase tracking-luxury mb-3 fade-in">Notre histoire</p>
          <h1 className="font-serif text-5xl md:text-7xl fade-in-up">L'art du raffinement</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 max-w-3xl text-center">
        <p className="text-xs uppercase tracking-luxury text-muted-foreground mb-4">Depuis 2018</p>
        <h2 className="font-serif text-4xl mb-8">Une maison née à Paris</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Valorie voit le jour dans un petit atelier du Marais, portée par une conviction
          simple : la beauté ne doit jamais être ostentatoire. Elle se cultive dans le détail, le
          geste juste, la matière choisie.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          De la création de vêtements intemporels aux formules de soin élaborées avec des
          laboratoires français, chaque pièce est pensée pour durer, embellir, accompagner.
        </p>
      </section>

      <section className="bg-secondary py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">Nos engagements</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                t: "Naturel & clean",
                d: "Nos cosmétiques privilégient des actifs d'origine naturelle, sans ingrédients controversés.",
              },
              {
                t: "Éthique & local",
                d: "Une production majoritairement européenne, des partenaires choisis pour leurs valeurs.",
              },
              {
                t: "Durabilité",
                d: "Des matières nobles, conçues pour traverser les saisons, et des emballages éco-pensés.",
              },
            ].map((v) => (
              <div key={v.t} className="text-center">
                <div className="w-12 h-px bg-foreground mx-auto mb-6" />
                <h3 className="font-serif text-2xl mb-4">{v.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 text-center max-w-2xl">
        <h2 className="font-serif text-4xl mb-6">Rejoignez l'aventure</h2>
        <p className="text-muted-foreground mb-8">
          Découvrez nos collections et laissez-vous inspirer par notre univers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/mode"
            className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:opacity-90"
          >
            Explorer la mode
          </Link>
          <Link
            to="/cosmetique"
            className="border border-foreground px-8 py-4 text-xs uppercase tracking-luxury hover:bg-foreground hover:text-background transition-colors"
          >
            Découvrir les soins
          </Link>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
