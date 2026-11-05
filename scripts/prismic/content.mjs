/**
 * Contenu actuel de padel15.fr, recopié depuis le code pour la migration vers
 * Prismic (phase 2). Chaque entrée devient un document en brouillon.
 */
import {
  rt, heading, list, blocks, h2, p, img, link, button, outline, textLink, slice,
} from "./lib.mjs";

const PLAYTOMIC = "https://playtomic.com/clubs/padel-15";
const TEL = "tel:+33145315876";
const DEVIS = "/evenements#demande";
const VIDEO_CDN = "https://padel15-video.pages.dev";

const seo = (meta_title, meta_description, image) => ({
  meta_title, meta_description, meta_image: image ? img(image) : {},
});

// ── Sections partagées par plusieurs pages ────────────────────────────

const coursBooking = () => slice("course_booking", "default", {
  badge: "Coaching & Progression",
  title: heading("Réservez votre cours de Padel"),
  intro: rt("Débutant ou confirmé, nos coaches certifiés vous accompagnent pour progresser rapidement et prendre encore plus de plaisir sur le terrain."),
  courses: [
    {
      label: "Cours Particulier", emoji: "🎾",
      description: rt("Un coach dédié, un programme sur mesure. Progressez à votre rythme avec un suivi personnalisé."),
      includes: list(
        "Suivi individuel et technique personnalisée",
        "Horaires flexibles selon vos disponibilités",
        "Tous niveaux, de débutant à confirmé",
        "Pack de séances ou séance à l'unité",
      ),
    },
    {
      label: "Cours Collectif", emoji: "👥",
      description: rt("Apprenez en groupe dans une ambiance conviviale. Idéal pour débuter ou progresser ensemble."),
      includes: list(
        "Groupes de 2 à 8 joueurs maximum",
        "Ambiance conviviale et progression rapide",
        "Initiation, perfectionnement, compétition",
        "Tarif préférentiel vs. cours particulier",
      ),
    },
  ],
  stats: [
    { value: "5+", label: "Coachs certifiés" },
    { value: "100%", label: "Satisfaction" },
    { value: "Tous niveaux", label: "Accueillis" },
  ],
  form_title: "Demande de cours",
  form_text: "Remplissez le formulaire, notre équipe vous contacte sous 24h.",
  tally_url: link("https://tally.so/embed/7R4EXa?alignLeft=1&hideTitle=1&dynamicHeight=1"),
  anchor: "cours",
});

const CLIENTS = [
  ["Club Med", "clubmed.svg"], ["AXA", "axa.svg"], ["Big Mamma", "big-mamma.jpeg"],
  ["Sander & Partners", "sander.svg"], ["BlackRock", "blackrock.svg"], ["MUFG", "mufg.svg"],
  ["BNP Paribas", "bnp.svg"], ["Boston Consulting Group", "bcg.svg"], ["ASICS", "asics.svg"],
  ["Cupra", "cupra.svg"],
  ["EDF", "edf.svg"], ["Air Liquide", "airliquide.svg"], ["Siemens", "siemens.svg"],
  ["Linkt", "linkt.svg"], ["DEEL", "deel.svg"], ["HubSpot", "hubspot.svg"],
  ["American Vintage", "americanvintage.png"], ["HEC", "hec.png"],
  ["Pompiers de Paris", "pompiers.jpeg"], ["Kering", "kering.svg"], ["LFP", "lfp.png"],
];
const clients = () => slice("logos", "marquee", {
  title: heading("Ils nous font confiance"),
  items: CLIENTS.map(([name, file], i) => ({
    logo: img(`/logos/${file}`, `Logo ${name}`), name, row: i < 10 ? "1" : "2",
  })),
});

const widget = (name, fields = {}) => slice("widget", "default", {
  widget: name, badge: "", title: [], intro: [], anchor: "", ...fields,
});
const agenda = () => widget("Prochains tournois (Playtomic)", { badge: "Agenda", title: heading("Prochains tournois") });
const newsletter = () => widget("Inscription newsletter");

// ── Documents ─────────────────────────────────────────────────────────

export const DOCUMENTS = [
  {
    key: "settings", type: "settings", title: "Réglages du site",
    data: {
      club_name: "Padel 15",
      address: "115 rue Castagnary, 75015 Paris",
      phone: "+33 1 45 31 58 76",
      phone_link: "+33145315876",
      email: "contact@padel15.fr",
      hours: "8h – 22h",
      hours_long: "7j/7, 8h à 22h",
      playtomic_url: link(PLAYTOMIC),
      app_store_url: link("https://apps.apple.com/fr/app/playtomic-play-padel/id1242321076"),
      google_play_url: link("https://play.google.com/store/apps/details?id=com.playtomic&hl=fr"),
      instagram_url: link("https://www.instagram.com/padel15club/"),
      facebook_url: { link_type: "Any" }, // pas de page Facebook pour l'instant
      menu_url: link("https://canva.link/hk499dmtauwn9vl", "Voir la carte"),
      table_booking: link(TEL, "Réserver une table"),
      nav_links: [
        ["/terrains", "Terrains"], ["/restaurant", "Restaurant"], ["/coaching", "Coaching"],
        ["/evenements", "Événements"], ["/tarifs", "Tarifs"], ["/le-club", "Le Club"],
      ].map(([u, t]) => ({ link: link(u, t) })),
      nav_cta: link(DEVIS, "Organiser un événement"),
      footer_links: [
        ["/terrains", "Nos terrains"], ["/restaurant", "Restaurant & Guinguette"],
        ["/coaching", "Coaching"], ["/evenements", "Événements entreprise"],
        ["/tarifs", "Tarifs"], ["/le-club", "Le Club"],
      ].map(([u, t]) => ({ link: link(u, t) })),
      footer_practical_links: [{ link: link("/contact", "Contact & Accès") }],
      footer_tagline: "Le club de padel haut de gamme du 15ème arrondissement de Paris.",
      footer_newsletter_text: "Actu du club, tournois et offres exclusives.",
      footer_legal: "PADEL 15 — SAS au capital de 5 000 € — RCS Paris 949 726 848 — 115 rue Castagnary 75015 Paris",
    },
  },

  {
    key: "homepage", type: "homepage", title: "Accueil",
    data: {
      hero_title: heading("L'art de vivre\n**le padel**", "heading1"),
      hero_text: rt("L'art de vivre le padel à Paris. Un club d'exception où sport, élégance et convivialité se rencontrent. Dans un écrin végétalisé en plein cœur de la capitale, jouez, partagez, détendez-vous… et savourez chaque instant. Terrains couvert et haut de gamme, terrasse guinguette, pétanque, fléchettes, bar et restaurant."),
      hero_tagline: "Sport · Élégance · Convivialité · Paris 15ème",
      hero_video_url: link(`${VIDEO_CDN}/padel-15-hero-v2.mp4`),
      hero_poster: img("/images/terrains/terrain-ext-jour.webp", "Terrain de padel extérieur de Padel 15"),
      hero_buttons: [
        button(PLAYTOMIC, "Réserver un terrain"),
        outline(DEVIS, "Organiser un événement pro ou perso"),
      ],
      slices: [
        slice("feature_grid", "strip", {
          items: [
            { icon: "Horloge", label: "7j/7 · 8h–22h", detail: "Ouvert toute l'année" },
            { icon: "Calendrier", label: "Créneaux en temps réel", detail: "Ouverts 5 jours à l'avance" },
          ],
          buttons: [button(PLAYTOMIC, "Réserver sur Playtomic")],
          show_app_badges: true,
        }),
        slice("feature_grid", "tiles", {
          badge: "Équipements",
          title: heading("Tout est prévu"),
          intro: rt("Un club pensé pour que vous n'ayez à vous occuper que d'une chose : jouer."),
          items: [
            ["Panier", "Raquettes en location + balles"], ["Douche", "Vestiaires & douches"],
            ["Canapé", "Espace détente"], ["Ordinateur", "Coworking WiFi"],
            ["Goutte d'eau", "Fontaine à eau"], ["Vélo", "Garage à vélo"],
            ["Accessibilité", "Accès PMR total"], ["Pétanque (cercle)", "Terrain de pétanque"],
            ["Fléchettes (cible)", "Fléchettes"], ["Molkky (couches)", "Molki"],
          ].map(([icon, label]) => ({ icon, label, detail: "" })),
        }),
        slice("pricing", "compact", {
          badge: "Tarifs & Horaires",
          title: heading("Jouez à votre rythme"),
          items: [
            { label: "Heures creuses", detail: "Lun–Ven : 8h–12h et 14h–16h", price: "12,50 €", unit: "/ pers / h", highlight: false },
            { label: "Heures pleines", detail: "12h–14h, 16h–22h et week-end", price: "15 €", unit: "/ pers / h", highlight: true },
          ],
          note: rt("4 joueurs par terrain · Raquettes et balles disponibles sur place · Créneaux ouverts 5 jours à l'avance"),
          buttons: [outline("/tarifs", "Voir tous les tarifs")],
        }),
        agenda(),
        slice("text_image", "photoMosaic", {
          badge: "Restaurant & Bar",
          title: heading("Le plaisir du Padel,\n**le plaisir de La table**"),
          body: rt("Service continu du petit-déjeuner au dîner, 7j/7. Cuisine généreuse avec des produits frais et de saison. Terrasse guinguette végétalisée, terrain de pétanque et espaces lounge — l'après-padel parfait, ou un déjeuner en plein air en semaine."),
          buttons: [
            button("https://canva.link/hk499dmtauwn9vl", "Voir la carte"),
            outline(TEL, "Réserver une table"),
            textLink("/restaurant", "En savoir plus sur le restaurant"),
          ],
          image_large: img("/images/restaurant/restaurant-verticale-1.webp", "Restaurant intérieur Padel 15"),
          image_top: img("/images/restaurant/restau-diner.webp", "Ambiance dîner au restaurant Padel 15"),
          image_bottom: img("/images/restaurant/restaurant-nourriture-verticale-1.webp", "Plats du restaurant Padel 15 — cuisine fraîche et de saison"),
          anchor: "",
        }),
        widget("Avis Google"),
        slice("logos", "partners", {
          badge: "Partenaires premium",
          title: heading("Nos partenaires"),
          items: [
            { logo: img("/logos/asics.svg", "Logo ASICS"), name: "ASICS", description: "Équipementier officiel — accessoires de padel disponibles sur place.", link: link("https://www.asics.com/fr/fr-fr/padel/") },
            { logo: img("/logos/cupra.svg", "Logo CUPRA"), name: "CUPRA", description: "Partenaire automobile — l'esprit performance et élégance, sur le terrain comme sur la route.", link: link("https://www.cupraofficial.fr/") },
            { logo: img("/logos/head.png", "Logo HEAD"), name: "HEAD", description: "Équipementier racket sport — raquettes et balles de padel disponibles sur nos courts, à l'achat comme à la location.", link: link("https://www.head.com/fr-FR/sports/padel/") },
          ],
        }),
        coursBooking(),
        slice("instagram_videos", "default", {
          title: heading("Vivez l'expérience Padel15"),
          handle: "@padel15club",
          videos: [
            ["padel-food", "Gauche"], ["food", "Gauche"], ["padel", "Droite"], ["app", "Droite"],
          ].map(([slug, column]) => ({
            video_url: link(`${VIDEO_CDN}/instagram/${slug}.mp4`),
            poster: img(`/images/instagram/${slug}.webp`),
            column,
          })),
        }),
        slice("b2b_highlight", "default", {
          badge: "Entreprises & Groupes",
          title: heading("Team Building & Événements"),
          intro: rt("Renforcez la cohésion de vos équipes dans un lieu atypique au cœur de Paris."),
          background: img("/images/terrains/match.webp"),
          cards: [
            { icon: "Mallette", title: "Événements d'entreprise", description: "Formules sur-mesure pour vos team buildings, afterworks ou séminaires, avec restauration et espaces privatifs." },
            { icon: "Sport (activité)", title: "Coaching privé en groupe", description: "Sessions encadrées pour vos collaborateurs, tous niveaux. Coaching, initiation ou perfectionnement." },
            { icon: "Trophée", title: "Tournois & challenges", description: "Organisez votre tournoi privé entre collègues ou partenaires dans une ambiance dynamique clé-en-main." },
          ],
          quote: "Le team building le plus réussi qu'on ait organisé — tout le monde est reparti avec l'envie de revenir.",
          quote_author: "Marie D.",
          quote_company: "BNP Paribas",
          show_form: true,
        }),
        clients(),
        newsletter(),
      ],
      ...seo(
        "Padel 15 | Club de Padel Paris 15ème — Terrains, Restaurant, Coaching",
        "Club de padel haut de gamme au cœur du 15ème arrondissement de Paris. Terrains couverts et extérieurs, coaching certifié, restaurant guinguette. Réservez sur Playtomic.",
      ),
    },
  },

  {
    key: "page/terrains", type: "page", uid: "terrains", title: "Terrains",
    data: {
      title: heading("Nos Terrains", "heading1"),
      subtitle: "2 terrains couverts et extérieurs — 7j/7, 8h à 22h",
      badge: "Paris 15ème",
      hero_image: img("/images/terrains/terrain-match-1.webp", "Terrains de padel Padel 15"),
      slices: [
        slice("feature_grid", "bookingInfo", {
          title: heading("Réservez votre terrain"),
          items: [
            { icon: "Horloge", label: "Horaires", detail: rt("7j/7 de 8h à 22h — Ouvert tous les jours de l'année") },
            { icon: "Billets", label: "Tarifs", detail: rt("12,50 € / personne / heure (heures creuses : lun-ven 8h-12h et 14h-16h)\n\n15 € / personne / heure (heures pleines : 12h-14h, 16h-22h et week-end)") },
            { icon: "Panier", label: "Matériel", detail: rt("Raquettes en location et balles disponibles dans un casier connecté entre les terrains") },
            { icon: "Calendrier", label: "Créneaux", detail: rt("Les créneaux ouvrent 5 jours à l'avance, heure par heure — soyez réactifs !") },
          ],
          buttons: [button(PLAYTOMIC, "Réserver sur Playtomic")],
        }),
        slice("gallery", "default", {
          title: heading("Galerie"), columns: "3",
          images: [
            ["terrain-ext-jour", "Terrain extérieur de jour"], ["terrain-inte-game", "Match en cours"],
            ["terrain-ext-nuit", "Terrain extérieur de nuit"], ["terrain-inte-vide", "Terrain intérieur"],
            ["terrain-inte-1", "Terrain intérieur vue d'ensemble"], ["terrain-match-1", "Match en tournoi"],
          ].map(([f, alt]) => ({ image: img(`/images/terrains/${f}.webp`, alt) })),
        }),
        slice("feature_grid", "list", {
          title: heading("Équipements & Services"),
          items: [
            ["Vélo", "Garage à vélo sécurisé"], ["Douche", "Vestiaires, douches et toilettes"],
            ["Canapé", "Espace détente intérieur"], ["Ordinateur", "Coin coworking"],
            ["Goutte d'eau", "Fontaine à eau en libre-service"], ["Accessibilité", "Accessibilité PMR totale"],
          ].map(([icon, label]) => ({ icon, label })),
        }),
      ],
      ...seo(
        "Terrains de Padel Paris 15 | Réservation Playtomic",
        "2 terrains de padel couverts et extérieurs au 115 rue Castagnary, Paris 15ème. Réservation en ligne via Playtomic. Créneaux 7j/7, 8h-22h.",
        "/images/terrains/terrain-ext-jour.webp",
      ),
    },
  },

  {
    key: "page/restaurant", type: "page", uid: "restaurant", title: "Restaurant",
    data: {
      title: heading("Restaurant & Guinguette", "heading1"),
      subtitle: "Cuisine, bar, terrasse en plein air — 7j/7 de 10h à 22h · Ouvert à tous, sans réservation",
      badge: "Paris 15ème",
      hero_image: img("/images/restaurant/rest-inte-grand-angle.webp", "Restaurant Padel 15"),
      slices: [
        slice("text_image", "default", {
          badge: "",
          title: heading("Un lieu de vie unique"),
          body: rt("Ouvert 7j/7 en service continu de 10h à 22h, avec des produits frais et de saison. **Ouvert à tous, sans réservation de terrain.** Un cadre chaleureux pour se détendre après un match… ou organiser vos séminaires, afterworks et événements privés dans un lieu unique au cœur de Paris.\n\nNotre terrasse guinguette vous transporte dans une ambiance dépaysante en plein Paris : espace végétalisé, couleurs vives, terrain de pétanque et espaces lounge."),
          buttons: [button(DEVIS, "Privatiser l'espace")],
          image: img("/images/restaurant/food/DSC00617.webp", "Planche à partagée Padel 15"),
          image_position: "Droite",
          image_format: "Paysage",
          anchor: "",
        }),
        slice("offer_cards", "simple", {
          items: [
            { icon: "Couverts", title: "Restaurant", includes: list("Service continu 7j/7 — 10h à 22h", "Ouvert à tous, sans réservation de terrain", "Produits frais et de saison", "Cadre chaleureux et moderne") },
            { icon: "Feuille", title: "Terrasse & Guinguette", includes: list("Terrasse végétalisée", "Terrain de pétanque", "Espaces lounge", "Ambiance dépaysante") },
            { icon: "Verre", title: "Bar", includes: list("Cocktails et boissons fraîches", "Afterworks et soirées", "Privatisation possible") },
          ],
        }),
        slice("gallery", "default", {
          title: heading("Galerie"), columns: "3",
          images: [
            ["/images/restaurant/restau-diner.webp", "Ambiance dîner"],
            ["/images/restaurant/food/DSC00739.webp", "Burger Maison"],
            ["/images/restaurant/rest-inte-bar.webp", "Bar intérieur"],
            ["/images/restaurant/food/DSC00768.webp", "Salade César"],
            ["/images/restaurant/rest-inte-terrain.webp", "Vue sur les terrains"],
            ["/images/restaurant/food/DSC00577.webp", "Planche Mixte"],
          ].map(([src, alt]) => ({ image: img(src, alt) })),
        }),
        widget("Carte du restaurant (Canva)", { badge: "Menu", title: heading("Plat du jour & Carte"), intro: rt("Mis à jour chaque matin") }),
        slice("cta_banner", "image", {
          badge: "Privatisation",
          title: heading("Privatisez notre espace"),
          subtitle: "Séminaires · Afterworks · Événements privés",
          text: rt("Anniversaire, afterwork, séminaire ou soirée d'entreprise — nous créons l'événement sur mesure."),
          image: img("/images/restaurant/rest-ext.webp", "Terrasse extérieure Padel 15 — espace privatisable"),
          buttons: [button(DEVIS, "Demander un devis"), outline(TEL, "+33 1 45 31 58 76")],
        }),
      ],
      ...seo(
        "Restaurant & Guinguette Paris 15 | Bar, Terrasse, Pétanque",
        "Restaurant, bar et terrasse guinguette au cœur du Paris 15ème. Ouvert 7j/7 de 10h à 22h. Ouvert à tous, même sans réservation de terrain. Privatisation disponible.",
        "/images/restaurant/rest-inte-grand-angle.webp",
      ),
    },
  },

  {
    key: "page/coaching", type: "page", uid: "coaching", title: "Coaching",
    data: {
      title: heading("Coaching Padel", "heading1"),
      subtitle: "Cours particuliers et collectifs avec nos coachs certifiés. Tous niveaux, tous les jours.",
      badge: "Coaching & Progression",
      hero_image: img("/images/terrains/terrain-inte-game.webp", "Cours de padel Padel 15 Paris"),
      slices: [coursBooking()],
      ...seo(
        "Cours de Padel Paris 15 | Coaching Particulier & Collectif",
        "Cours particuliers et collectifs de padel à Paris 15ème. Coachs certifiés, tous niveaux de débutant à confirmé. Réservation en ligne via formulaire.",
        "/images/terrains/terrain-inte-game.webp",
      ),
    },
  },

  {
    key: "page/evenements", type: "page", uid: "evenements", title: "Événements",
    data: {
      title: heading("Team Building & Événements", "heading1"),
      subtitle: "BlackRock, BNP Paribas, BCG, Kering, AXA… et plus de 100 autres entreprises font confiance à Padel 15.",
      badge: "Entreprises & Groupes",
      hero_image: img("/images/new-events/evenements-hero.webp", "Groupe de joueurs réunis autour du filet lors d'un événement d'entreprise sur le terrain indoor de Padel 15"),
      slices: [
        slice("text_image", "video", {
          badge: "En images",
          title: heading("L'expérience\n**Padel 15** en images"),
          body: rt("Terrain privatisé, coach dédié, restaurant et guinguette, tout ce qu'il faut pour un évènement d'exception au cœur de Paris."),
          buttons: [button(DEVIS, "Demander un devis"), outline(TEL, "Appeler le club")],
          video_url: link("https://www.padel15.fr/images/new-events/WhatsApp-Video-2026-09-15-at-15.32.55.mp4"),
          poster: img("/images/new-events/event-video-poster.webp"),
          stats: [
            { value: "100+", label: "Entreprises clientes" },
            { value: "8–150", label: "Personnes / événement" },
            { value: "24h", label: "Réponse garantie" },
          ],
          corner_label: "Paris 15ème",
          anchor: "",
        }),
        slice("offer_cards", "default", {
          title: heading("Nos Formules"),
          intro: rt("Chaque événement est sur-mesure. Nous nous adaptons à vos besoins, votre budget et votre groupe."),
          items: [
            {
              icon: "Sport (activité)", title: "Team Building & Afterwork Padel",
              subtitle: "Sport, cohésion & soirée · 8 à 120 personnes",
              description: rt("Privatisez nos terrains pour une expérience padel sur-mesure : tournoi interne, coaching collectif ou initiation encadrée par nos pros, puis laissez la soirée prendre le relais. Guinguette, bar privatisé, ambiance pilotée par notre équipe. Notre cuisine assure du début à la fin : collation d'accueil, buffet maison entre les sessions, planches & tapas, BBQ ou dîner assis en soirée, tout préparé sur place, avec des produits frais, et ajusté à votre format et votre budget."),
              includes: list("Terrains privatisés · Coach dédié · Matériel fourni", "Bar privatisé & animation", "Restauration sur mesure (buffet, dîner, cocktail…)", "Privatisation totale ou partielle selon vos besoins"),
            },
            {
              icon: "Liste", title: "Séminaire & Convention",
              subtitle: "Journée, demi-journée ou format hybride travail + sport · 8 à 120 personnes",
              description: rt("Un cadre qui change tout. Nos espaces de travail climatisés et équipés accueillent vos réunions stratégiques, kick-offs et conventions — avec la possibilité de couper sur les terrains pour recharger les équipes.\n\nLa restauration, pensée pour les pros : Petit-déjeuner d'accueil, déjeuner assis ou buffet/brunch, pause café gourmande"),
              includes: list("Salle privatisée & équipement AV complet", "Terrains privatisés entre les sessions", "Restauration complète sur toute la journée", "Coordination par nos équipes : zéro logistique pour vos équipes"),
            },
            {
              icon: "Étoile", title: "Réception & Événement Client",
              subtitle: "Entertainment externe : clients, partenaires, prospects · 8 à 120 personnes",
              description: rt("Recevez vos clients dans un lieu qui parle de vous. Padel premium, service haut de gamme, ambiance unique : offrez une expérience qui crée le lien.\n\nNous composons des menus adaptés à vos exigences : cocktail dinatoire, déjeuner d'affaires, offre BBQ, formule traiteur."),
              includes: list("Privatisation complète & accueil personnalisé", "Service en salle haut de gamme", "Menu sur mesure (cocktail, déjeuner, dîner)", "Expérience encadrée par des professionnels"),
            },
          ],
        }),
        clients(),
        slice("text_image", "default", {
          badge: "",
          title: heading("Demandez un devis"),
          body: blocks(
            rt("Décrivez votre projet et notre équipe revient vers vous sous 24h avec une proposition personnalisée."),
            list("Réponse sous 24h ouvrées", "Devis gratuit et sans engagement", "Formule entièrement sur-mesure"),
          ),
          buttons: [],
          image: img("/images/new-events/WhatsApp-Image-2026-09-15-at-15.32.55.webp", "Cocktail signature lors d'un événement Padel 15"),
          image_position: "Droite",
          image_format: "Portrait",
          anchor: "demande",
        }),
        widget("Formulaire de demande d'événement"),
      ],
      ...seo(
        "Team Building Paris 15 | Événements d'entreprise — Padel 15",
        "Organisez vos team buildings, afterworks et séminaires dans un lieu unique Paris 15ème. Terrains privatisables, restauration, coaching. BlackRock, BNP, BCG, Kering…",
        "/images/terrains/terrain-ext-jour.webp",
      ),
    },
  },

  {
    key: "page/le-club", type: "page", uid: "le-club", title: "Le Club",
    data: {
      title: heading("Le Club", "heading1"),
      subtitle: "115 rue Castagnary, Paris 15ème — bien plus qu'un club de padel",
      badge: "",
      hero_image: img("/images/restaurant/restaurant-horizontale-1.webp", "Padel 15 — Le Club"),
      slices: [
        slice("text_image", "default", {
          badge: "",
          title: heading("Notre histoire"),
          body: rt("Padel 15 est né d'une passion commune pour le padel et d'une vision : créer le club de référence du 15ème arrondissement, alliant sport de haut niveau, art de vivre et convivialité.\n\nInstallé au 115 rue Castagnary, notre espace de vie unique mêle terrains de padel panoramiques, restaurant à la cuisine généreuse et terrasse guinguette dépaysante — le tout dans un cadre végétalisé en plein cœur de Paris."),
          buttons: [],
          image: img("/images/restaurant/rest-inte-terrain.webp", "Ambiance Padel 15"),
          image_position: "Droite",
          image_format: "Paysage",
          anchor: "",
        }),
        slice("gallery", "captioned", {
          images: [
            { image: img("/images/autres/work-and-padel.webp", "Espace coworking Padel 15"), label: "Coworking", detail: "WiFi haut débit, cadre unique" },
            { image: img("/images/autres/raquettes-1.webp", "Équipements Padel 15"), label: "Équipements", detail: "Location de raquettes" },
            { image: img("/images/terrains/terrain-match-1.webp", "Terrain intérieur Padel 15"), label: "Terrains", detail: "2 courts panoramiques" },
          ],
        }),
        slice("feature_grid", "cards", {
          title: heading("Notre infrastructure"),
          items: [
            ["Trophée", "2 terrains de padel", "Couverts et extérieurs, panoramiques"],
            ["Couverts", "Restaurant & Bar", "Service continu 7j/7, produits frais"],
            ["Feuille", "Terrasse guinguette", "Végétalisée, pétanque, espaces lounge"],
            ["Ordinateur", "Espace coworking", "WiFi haut débit, cadre unique"],
            ["Douche", "Vestiaires & Douches", "Équipements modernes et propres"],
            ["Vélo", "Garage à vélo", "Sécurisé, gratuit"],
            ["Goutte d'eau", "Fontaine à eau", "En libre-service"],
            ["Accessibilité", "Accessibilité PMR", "Site entièrement accessible"],
          ].map(([icon, label, detail]) => ({ icon, label, detail })),
        }),
        slice("feature_grid", "values", {
          title: heading("Nos Valeurs"),
          items: [
            { icon: "Groupe", color: "Orange", label: "Communauté", detail: rt("Chez **Padel 15**, on ne vient pas juste jouer, on vient **vivre** quelque chose ensemble. Un lieu où les passionné·e·s de padel, les amateur·rice·s de détente et les ami·e·s de passage se croisent, partagent un moment et créent du lien.") },
            { icon: "Puzzle", color: "Vert", label: "Inclusif", detail: rt("Notre club est **ouvert à tou·te·s**, sans barrière. Terrains accessibles, services pensés pour le confort de chacun·e, lieux inclusifs et faciles d'accès — **en plein cœur de Paris.**") },
            { icon: "Sourire", color: "Orange", label: "Fair Play", detail: rt("Le jeu, toujours dans le respect. Que ce soit sur le terrain ou en terrasse, **l'esprit fair play, la bienveillance et la bonne humeur** sont les fondations de l'expérience Padel 15.") },
          ],
        }),
        slice("cta_banner", "default", {
          title: heading("Venez découvrir Padel 15"),
          text: [],
          buttons: [button(PLAYTOMIC, "Réserver un terrain"), outline("/contact", "Nous contacter")],
        }),
        widget("Archives des newsletters", { badge: "Actualités", title: heading("Nos newsletters") }),
        agenda(),
        newsletter(),
      ],
      ...seo(
        "Le Club | Padel 15 — Infrastructure, Valeurs, Coworking, Accessibilité",
        "Découvrez Padel 15 : club haut de gamme au 115 rue Castagnary, Paris 15ème. Terrains, restaurant, guinguette, coworking, vestiaires, accès PMR.",
        "/images/restaurant/rest-inte-grand-angle.webp",
      ),
    },
  },

  {
    key: "page/tarifs", type: "page", uid: "tarifs", title: "Tarifs",
    data: {
      title: heading("Tarifs", "heading1"),
      subtitle: "Réservation via Playtomic — pas d'abonnement obligatoire, payez à la séance.",
      badge: "",
      hero_image: img("/images/terrains/match.webp", "Courts Padel 15 Paris"),
      slices: [
        slice("pricing", "cards", {
          badge: "",
          title: heading("Location de terrains"),
          intro: rt("Prix par personne pour 1 heure. 4 joueurs par terrain."),
          items: [
            { label: "Heures creuses", detail: "Lun-Ven : 8h-12h et 14h-16h", price: "12,50 €", unit: "/ pers / heure", highlight: false, highlight_label: "" },
            { label: "Heures pleines", detail: "12h-14h, 16h-22h et week-end", price: "15 €", unit: "/ pers / heure", highlight: true, highlight_label: "Le plus populaire" },
          ],
          note: rt("Créneaux ouverts 5 jours à l'avance via Playtomic. Location de raquettes disponible sur place."),
          buttons: [button(PLAYTOMIC, "Réserver maintenant")],
        }),
        slice("pricing", "list", {
          title: heading("Coaching"),
          intro: rt("Tarifs sur demande selon la formule choisie. Contactez-nous pour un programme personnalisé."),
          items: [
            { label: "Cours particulier", detail: "1h avec un coach certifié", price: "Sur demande" },
            { label: "Cours collectif", detail: "Groupe 2-8 joueurs — 1h", price: "Sur demande" },
            { label: "Stage initiation", detail: "Formule découverte débutants", price: "Sur demande" },
          ],
          buttons: [outline("/coaching", "Réserver un cours")],
        }),
        slice("cta_banner", "dark", {
          title: heading("Événements d'entreprise"),
          text: rt("Formules sur-mesure pour vos team buildings, afterworks et séminaires. Devis personnalisé sous 24h."),
          buttons: [button(DEVIS, "Demander un devis")],
        }),
      ],
      ...seo(
        "Tarifs Padel 15 | Prix Terrains, Coaching & Événements Paris 15",
        "Grille tarifaire complète de Padel 15 : location de terrains (12,50€ ou 15€/pers/h), cours particuliers et collectifs, abonnements et forfaits entreprise.",
      ),
    },
  },

  {
    key: "page/contact", type: "page", uid: "contact", title: "Contact",
    data: {
      title: heading("Contact & Accès", "heading1"),
      subtitle: "115 rue Castagnary, 75015 Paris — 7j/7, 8h à 22h",
      badge: "",
      hero_image: img("/images/restaurant/gaspard-work.webp", "Padel 15 — Contact & Accès"),
      slices: [
        widget("Contact et plan d'accès", { title: heading("Contactez-nous") }),
        newsletter(),
      ],
      ...seo(
        "Contact & Accès | Padel 15 — 115 rue Castagnary Paris 15",
        "Contactez Padel 15 : 115 rue Castagnary, 75015 Paris. Tél : +33 1 45 31 58 76. Email : contact@padel15.fr. Plan d'accès Google Maps.",
      ),
    },
  },

  {
    key: "legal_page/mentions-legales", type: "legal_page", uid: "mentions-legales", title: "Mentions légales",
    data: {
      title: heading("Mentions légales", "heading1"),
      content: blocks(
        h2("1. Éditeur du site"),
        p("Le site **padel15.fr** est édité par :"),
        list(
          "**Raison sociale :** PADEL 15",
          "**Forme juridique :** Société par actions simplifiée (SAS)",
          "**Capital social :** 5 000,00 €",
          "**RCS :** 949 726 848 R.C.S. Paris",
          "**SIRET :** 949 726 848 (NIC à compléter)",
          "**Date d'immatriculation :** 29/11/2024",
          "**Siège social :** 115 rue Castagnary, 75015 Paris, France",
          "**Activité :** Exploitation de complexes sportifs et restauration",
          "**Téléphone :** +33 1 45 31 58 76",
          "**Email :** contact@padel15.fr",
        ),
        p("**Président :** BROK EVENT (SARL) — 52 rue Labrouste, 75015 Paris — RCS 988 151 643 Paris"),
        p("**Directeur général :** GM HOLDING (SARL) — 52 rue Labrouste, 75015 Paris — RCS 988 127 064 Paris"),
        h2("2. Hébergement"),
        p("Ce site est hébergé par :"),
        list(
          "**Vercel Inc.**",
          "340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis",
          "Site : [vercel.com](https://vercel.com)",
        ),
        h2("3. Propriété intellectuelle"),
        p("L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive de Padel 15 ou de ses partenaires, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite est interdite."),
        h2("4. Cookies"),
        p("Ce site utilise des cookies à des fins d'analyse d'audience (Google Analytics 4) et de publicité (Meta Pixel). Vous pouvez gérer vos préférences via notre bandeau de consentement ou en consultant notre [politique de confidentialité](/confidentialite)."),
        h2("5. Loi applicable"),
        p("Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront compétents."),
        p("*Dernière mise à jour : Juin 2026*"),
      ),
      meta_title: "Mentions légales — Padel 15",
      meta_description: "Mentions légales du site padel15.fr — Éditeur, hébergeur, propriété intellectuelle.",
      meta_image: {},
      noindex: true,
    },
  },

  {
    key: "legal_page/confidentialite", type: "legal_page", uid: "confidentialite", title: "Politique de confidentialité",
    data: {
      title: heading("Politique de confidentialité", "heading1"),
      content: blocks(
        h2("1. Responsable du traitement"),
        p("Padel 15 — 115 rue Castagnary, 75015 Paris — contact@padel15.fr"),
        h2("2. Données collectées"),
        p("Nous collectons les données suivantes :"),
        list(
          "Données de formulaire : nom, email, téléphone, message (formulaires de contact et devis)",
          "Données de navigation : pages visitées, durée de session (via Google Analytics 4, anonymisé)",
          "Données marketing : interactions publicitaires (via Meta Pixel, avec consentement préalable)",
          "Email pour newsletter (via Mailchimp, avec consentement explicite)",
        ),
        h2("3. Finalités du traitement"),
        list(
          "Répondre à vos demandes de contact et devis",
          "Envoyer notre newsletter (sur abonnement)",
          "Mesurer l'audience de notre site pour l'améliorer",
          "Diffuser de la publicité ciblée (avec votre consentement)",
        ),
        h2("4. Durée de conservation"),
        list(
          "Données de contact : 3 ans après le dernier contact",
          "Données newsletter : jusqu'à désabonnement",
          "Données analytiques : 14 mois (GA4 par défaut)",
        ),
        h2("5. Vos droits (RGPD)"),
        p("Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :"),
        list(
          "Droit d'accès à vos données",
          "Droit de rectification",
          "Droit à l'effacement (droit à l'oubli)",
          "Droit à la portabilité",
          "Droit d'opposition au traitement",
        ),
        p("Pour exercer ces droits : [contact@padel15.fr](mailto:contact@padel15.fr)"),
        h2("6. Cookies"),
        p("Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau affiché sur notre site. Le refus des cookies analytiques et marketing n'affecte pas votre navigation."),
        p("*Dernière mise à jour : Mai 2026*"),
      ),
      meta_title: "Politique de confidentialité — Padel 15",
      meta_description: "Politique de confidentialité et gestion des données personnelles de Padel 15.",
      meta_image: {},
      noindex: true,
    },
  },
];
