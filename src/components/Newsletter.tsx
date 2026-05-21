export function Newsletter() {
  return (
    <section className="bg-accent py-20">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <p className="text-xs uppercase tracking-luxury mb-3">Rejoignez la Maison</p>
        <h2 className="text-4xl md:text-5xl mb-4">Inspirations & privilèges</h2>
        <p className="text-muted-foreground mb-8">
          Recevez <strong className="text-foreground">-10% sur votre première commande</strong> et accédez en avant-première à nos nouveautés et événements.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Votre adresse email"
            className="flex-1 px-4 py-3 bg-background border-0 text-sm focus:outline-none focus:ring-1 focus:ring-ring rounded-sm"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-luxury hover:opacity-90 transition-opacity"
          >
            Je m'inscris
          </button>
        </form>
      </div>
    </section>
  );
}
