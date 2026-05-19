// src/components/shared/GoogleReviews.tsx
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Thomas L.",
    avatar: "TL",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "Super club ! Les terrains sont impeccables, bien entretenus et lumineux. L'équipe est top et très accueillante. Le bar après le match, c'est vraiment un plus.",
  },
  {
    name: "Claire M.",
    avatar: "CM",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Notre team building ici était un franc succès. Formule très bien organisée, coachs professionnels et repas au restaurant délicieux. On recommande vivement !",
  },
  {
    name: "Antoine R.",
    avatar: "AR",
    rating: 5,
    date: "Il y a 3 semaines",
    text: "Cadre magnifique en plein Paris. La guinguette est vraiment dépaysante. Cours particuliers au top, j'ai vraiment progressé en quelques séances seulement.",
  },
  {
    name: "Margaux D.",
    avatar: "MD",
    rating: 5,
    date: "Il y a 2 mois",
    text: "Terrains en excellent état, réservation facile via Playtomic. Accueil chaleureux et vestiaires très propres. Un club qui mérite largement sa réputation.",
  },
  {
    name: "Pierre S.",
    avatar: "PS",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Le meilleur club de padel du 15ème sans hésitation. Très bonne ambiance, terrain extérieur magnifique de nuit. On revient chaque semaine !",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="font-buzz text-3xl mb-1">Ce que disent nos membres</h2>
            <p className="text-gray-500">Avis vérifiés sur Google My Business</p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">4,8</div>
              <StarRating rating={5} />
              <p className="text-gray-500 text-sm mt-1">247 avis</p>
            </div>
            <div className="w-px h-16 bg-gray-200" />
            <div className="flex flex-col gap-1.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-2">{star}</span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: star === 5 ? "85%" : star === 4 ? "12%" : "3%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.slice(0, 3).map((review) => (
            <div key={review.name} className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand/20 text-brand font-semibold flex items-center justify-center text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.date}</p>
                </div>
                <div className="ml-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-300">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://g.page/r/padel-15/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand hover:underline text-sm font-medium"
          >
            Voir tous les avis sur Google
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
