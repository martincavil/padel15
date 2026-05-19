"use client";

interface CTANewsletterProps {
  brevoFormUrl?: string;
  title?: string;
  subtitle?: string;
}

export function CTANewsletter({
  brevoFormUrl,
  title = "Restez dans la boucle",
  subtitle = "Tournois, nouveautés, offres exclusives — 2× par mois, pas de spam.",
}: CTANewsletterProps) {
  return (
    <section className="relative bg-black py-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-brand/20 text-brand border border-brand/30 mb-4">
          Newsletter
        </span>
        <h2 className="font-buzz text-3xl md:text-4xl text-white mb-3">{title}</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">{subtitle}</p>
        {brevoFormUrl ? (
          <iframe
            src={brevoFormUrl}
            width="100%"
            height="120"
            frameBorder={0}
            className="max-w-lg mx-auto"
            title="Newsletter Padel 15"
          />
        ) : (
          <a
            href="mailto:contact@padel15.fr?subject=Newsletter"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            S'inscrire à la newsletter
          </a>
        )}
      </div>
    </section>
  );
}
