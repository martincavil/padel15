import Link from "next/link";
import Image from "next/image";

const LINKS_CLUB = [
  { href: "/terrains", label: "Nos terrains" },
  { href: "/restaurant", label: "Restaurant & Guinguette" },
  { href: "/coaching", label: "Coaching" },
  { href: "/evenements", label: "Événements entreprise" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/le-club", label: "Le Club" },
];

const LINKS_PRATIQUE = [
  { href: "/contact", label: "Contact & Accès" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Padel 15"
                width={100}
                height={40}
                className="filter brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Le club de padel haut de gamme du 15ème arrondissement de Paris.
              115 rue Castagnary, 75015 Paris.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/padel15club/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-brand transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Le Club */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Le Club</h3>
            <ul className="space-y-2">
              {LINKS_CLUB.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pratique */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Pratique</h3>
            <ul className="space-y-2 mb-4">
              {LINKS_PRATIQUE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://playtomic.com/clubs/padel-15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Réserver (Playtomic)
                </a>
              </li>
            </ul>
            <div className="text-sm text-gray-400 space-y-1">
              <p>7j/7 — 8h à 22h</p>
              <a href="tel:+33145315876" className="hover:text-white transition-colors block">+33 1 45 31 58 76</a>
              <a href="mailto:contact@padel15.fr" className="hover:text-white transition-colors block">contact@padel15.fr</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Actu du club, tournois et offres exclusives.</p>
            <a
              href="mailto:contact@padel15.fr?subject=Newsletter Padel 15"
              className="inline-block bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              S'inscrire
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-gray-500 text-xs">
          <p>© {year} Padel 15. Tous droits réservés.</p>
          <p>115 rue Castagnary, 75015 Paris</p>
        </div>
      </div>
    </footer>
  );
}
