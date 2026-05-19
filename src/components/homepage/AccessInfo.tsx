import { Clock, MapPin, Phone, Navigation } from "lucide-react";

export function AccessInfo() {
  return (
    <section className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Horaires */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Horaires</p>
              <p className="text-gray-400 text-sm">7j/7 de 8h à 22h</p>
              <p className="text-gray-400 text-sm">Ouvert toute l&apos;année</p>
            </div>
          </div>

          {/* Adresse */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Adresse</p>
              <p className="text-gray-400 text-sm">115 rue Castagnary</p>
              <p className="text-gray-400 text-sm">75015 Paris</p>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Contact</p>
              <a href="tel:+33145315876" className="text-gray-400 text-sm hover:text-white transition-colors">
                +33 1 45 31 58 76
              </a>
              <br />
              <a href="mailto:contact@padel15.fr" className="text-gray-400 text-sm hover:text-white transition-colors">
                contact@padel15.fr
              </a>
            </div>
          </div>

          {/* CTA Maps */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Accès</p>
              <p className="text-gray-400 text-sm mb-2">Métro Convention (12)</p>
              <a
                href="https://maps.google.com/?q=115+rue+Castagnary+75015+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-brand hover:underline"
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
