# Modèle Prismic de padel15.fr

Dépôt : `aqal1a2b` (affiché « padel15 »), un dépôt par site du client.
Les modèles du code font référence : `customtypes/` et `src/slices/`, envoyés
avec `node scripts/prismic/push-models.mjs` (simulation) puis `--apply`.

## Types de documents

| Type | Rôle | Documents |
|---|---|---|
| `settings` · Réglages du site | Adresse, téléphone, e-mail, horaires, liens Playtomic / stores / Instagram / Facebook / carte, liens du menu et du pied de page | 1 |
| `homepage` · Accueil | Vidéo d'accueil (titre, texte, vidéo, image, boutons) + sections + SEO | 1 |
| `page` · Page | Bandeau (titre, sous-titre, pastille, photo) + sections + SEO | terrains, restaurant, coaching, evenements, le-club, tarifs, contact |
| `legal_page` · Page légale | Titre + texte + SEO | mentions-legales, confidentialite |

## Blocs (slices) et sections actuelles

| Bloc | Variantes | Sections du site |
|---|---|---|
| Texte + visuel `text_image` | photo · trois photos · vidéo verticale | Notre histoire (Le Club), Un lieu de vie unique (Restaurant), Demandez un devis (Événements) · Restaurant & Bar (accueil) · L'expérience en images (Événements) |
| Liste à icônes `feature_grid` | tuiles · liste · infos + réservation · bandeau noir · valeurs | Tout est prévu (accueil), Notre infrastructure (Le Club) · Équipements & Services (Terrains) · Réservez votre terrain (Terrains) · bandeau Playtomic (accueil) · Nos Valeurs (Le Club) |
| Tarifs `pricing` | cartes · aperçu · liste | Location de terrains (Tarifs) · Jouez à votre rythme (accueil) · Coaching (Tarifs) |
| Cartes de formules `offer_cards` | — | Nos Formules (Événements), services du Restaurant |
| Galerie photos `gallery` | agrandissable · légendée | Galerie (Terrains, Restaurant) · trois photos (Le Club) |
| Logos `logos` | partenaires · clients | Nos partenaires (accueil) · Ils nous font confiance (accueil, Événements) |
| Appel à l'action `cta_banner` | simple · encadré noir · sur photo | Venez découvrir (Le Club) · Événements d'entreprise (Tarifs) · Privatisez notre espace (Restaurant) |
| Team Building `b2b_highlight` | — | Team Building & Événements (accueil) |
| Réservation de cours `course_booking` | — | Réservez votre cours (accueil, Coaching) |
| Vidéos Instagram `instagram_videos` | — | Vivez l'expérience Padel15 (accueil) |
| Module du site `widget` | — | Prochains tournois, Avis Google, Newsletter, Archives newsletters, Formulaire événement, Contact + plan, Carte Canva |
| Texte libre `rich_text` | — | réserve pour du texte simple |

## Ce qui reste dans le code

Logique du widget Playtomic et des tournois, avis Google, envoi newsletter,
formulaire événement (outil de Gaspard), bandeau cookies, boutons flottants,
données structurées (JSON-LD), style et mise en page des blocs.

## Choix

- Icônes : liste fermée en français (« Vélo », « Douche »…), reliée aux icônes
  du site dans le code, pour garder un rendu homogène.
- Boutons : un lien avec son texte (page du site, adresse web, `tel:`, PDF) et
  un style (orange, contour, lien texte).
- Vidéos : on colle l'adresse du fichier (Cloudflare Pages), sans changer
  d'hébergeur ; l'image d'attente se dépose dans Prismic.
- Ancre : un champ facultatif sur les blocs visés par des liens (`#demande`).

## Migration du contenu (phase 2)

`scripts/prismic/content.mjs` contient le contenu actuel du site, recopié du
code ; `scripts/prismic/migrate-content.mjs` le vérifie champ par champ par
rapport aux modèles, puis l'envoie en brouillon (release « Migration » de
Prismic) avec `--apply`. Les images de `public/` vont dans la médiathèque.
`migration.lock.json` garde les images envoyées et l'id des documents : une
relance met à jour les brouillons sans doublon.

Les liens internes sont écrits en adresse complète (`https://www.padel15.fr/…`),
pour garder les ancres comme `#demande` ; le site les transforme en liens
internes à l'affichage.
