# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> homepage — Google rating visible
- Location: tests/smoke.spec.ts:42:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=4,8')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=4,8')

```

```yaml
- navigation:
    - link "Padel 15":
        - /url: /
        - img "Padel 15"
    - link "Terrains":
        - /url: /terrains
    - link "Restaurant":
        - /url: /restaurant
    - link "Coaching":
        - /url: /coaching
    - link "Événements":
        - /url: /evenements
    - link "Tarifs":
        - /url: /tarifs
    - link "Le Club":
        - /url: /le-club
    - link "Réserver un terrain":
        - /url: https://playtomic.com/clubs/padel-15
        - button "Réserver un terrain"
    - link "Organiser un événement":
        - /url: /evenements
        - button "Organiser un événement"
    - link "Instagram Padel 15":
        - /url: https://www.instagram.com/padel15club/?hl=fr
        - img
    - img "Padel 15"
    - button "Fermer le menu"
    - link "Terrains":
        - /url: /terrains
    - link "Restaurant":
        - /url: /restaurant
    - link "Coaching":
        - /url: /coaching
    - link "Événements":
        - /url: /evenements
    - link "Tarifs":
        - /url: /tarifs
    - link "Le Club":
        - /url: /le-club
    - link "Réserver un terrain":
        - /url: https://playtomic.com/clubs/padel-15
    - link "Organiser un événement":
        - /url: /evenements
    - link "@padel15club":
        - /url: https://www.instagram.com/padel15club/?hl=fr
        - img
        - text: "@padel15club"
- main:
    - img "Terrains Padel 15"
    - img "Terrains Padel 15"
    - img "Terrains Padel 15"
    - img "Terrains Padel 15"
    - img
    - img
    - img
    - img
    - img
    - text: 4,6 · 112 avis Google
    - img "Padel 15"
    - heading "L'art de Vivre Le Padel" [level=1]
    - paragraph: L'art de vivre le padel à Paris. Un club d'exception où sport, élégance et convivialité se rencontrent. Dans un écrin végétalisé en plein cœur de la capitale, jouez, partagez, détendez-vous… et savourez chaque instant. Terrains couvert et haut de gamme, terrasse guinguette, pétanque, fléchettes, bar et restaurant
    - link "Organiser un événement pro ou perso":
        - /url: /entreprises
    - paragraph: Réservation
    - paragraph: Aujourd'hui
    - paragraph: Créneaux pas encore ouverts
    - button "Semaine précédente" [disabled]:
        - img
    - button "Jeu 11"
    - button "Ven 12"
    - button "Sam 13"
    - button "Dim 14"
    - button "Lun 15"
    - button "Mar 16"
    - button "Mer 17"
    - button "Semaine suivante":
        - img
    - text: 8h 9h 10h 11h 12h 13h 14h 15h 16h 17h 18h 19h 20h 21h Disponible Complet
    - link "Voir les créneaux en temps réel":
        - /url: https://playtomic.com/clubs/padel-15?date=2026-06-11
        - img
        - text: Voir les créneaux en temps réel
    - button "Photo 1"
    - button "Photo 2"
    - button "Photo 3"
    - button "Photo 4"
    - img
    - img
    - paragraph: 7j/7 · 8h–22h
    - paragraph: Ouvert toute l'année
    - img
    - paragraph: Créneaux en temps réel
    - paragraph: Ouverts 5 jours à l'avance
    - link "Réserver sur Playtomic":
        - /url: https://playtomic.com/clubs/padel-15
    - text: Équipements
    - heading "Tout est prévu" [level=2]
    - paragraph: "Un club pensé pour que vous n'ayez à vous occuper que d'une chose : jouer."
    - list:
        - listitem:
            - img
            - text: Raquettes en location + balles
        - listitem:
            - img
            - text: Vestiaires & douches
        - listitem:
            - img
            - text: Espace détente
        - listitem:
            - img
            - text: Coworking WiFi
        - listitem:
            - img
            - text: Fontaine à eau
        - listitem:
            - img
            - text: Garage à vélo
        - listitem:
            - img
            - text: Accès PMR total
        - listitem:
            - img
            - text: Terrain de pétanque
        - listitem:
            - img
            - text: Fléchettes
        - listitem:
            - img
            - text: Molki
    - text: Tarifs & Horaires
    - heading "Jouez à votre rythme" [level=2]
    - paragraph: Heures creuses
    - text: 12,50 € / pers / h
    - paragraph: "Lun–Ven : 8h–12h et 14h–16h"
    - paragraph: Heures pleines
    - text: 15 € / pers / h
    - paragraph: 12h–14h, 16h–22h et week-end
    - paragraph: 4 joueurs par terrain · Raquettes et balles disponibles sur place · Créneaux ouverts 5 jours à l'avance
    - link "Voir tous les tarifs":
        - /url: /tarifs
    - text: Agenda
    - heading "Prochains tournois" [level=2]
    - link "Voir sur Playtomic":
        - /url: https://playtomic.com/clubs/padel-15
        - text: Voir sur Playtomic
        - img
    - link "18 juin Tournoi · Mixte P50 Tous niveaux · 60 € / équipe":
        - /url: https://app.playtomic.io/tournament/3f89e0e1-e261-459c-addf-4396a07ae7d8
        - text: 18 juin
        - img
        - text: Tournoi · Mixte
        - heading "P50" [level=3]
        - paragraph: Tous niveaux · 60 € / équipe
    - img
    - paragraph: Organiser un événement entreprise ?
    - paragraph: Team building, tournoi corporate, soirée privée — sur-mesure.
    - link "Demander un devis":
        - /url: "mailto:contact@padel15.fr?subject=Demande de devis événement&body=Bonjour, je souhaite obtenir un devis pour :"
    - img "Restaurant intérieur Padel 15"
    - img "Ambiance dîner au restaurant Padel 15"
    - img "Plats du restaurant Padel 15 — cuisine fraîche et de saison"
    - text: Restaurant & Bar
    - heading "Le plaisir du Padel, le plaisir de La table" [level=2]
    - paragraph: Service continu du petit-déjeuner au dîner, 7j/7. Cuisine généreuse avec des produits frais et de saison. Terrasse guinguette végétalisée, terrain de pétanque et espaces lounge — l'après-padel parfait, ou un déjeuner en plein air en semaine.
    - link "Voir la carte":
        - /url: https://canva.link/4bq0jlgzxkljl6x
        - img
        - text: Voir la carte
    - link "Réserver une table":
        - /url: tel:+33145315876
        - img
        - text: Réserver une table
    - link "En savoir plus sur le restaurant":
        - /url: /restaurant
        - text: En savoir plus sur le restaurant
        - img
    - heading "Ce que disent nos membres" [level=2]
    - paragraph: Avis vérifiés sur Google My Business
    - text: 4,6
    - img
    - img
    - img
    - img
    - img
    - paragraph: 112 avis
    - text: 5 4 3 2 1 TL
    - paragraph: Thomas L.
    - paragraph: Il y a 2 semaines
    - img
    - img
    - img
    - img
    - img
    - img
    - paragraph: Super club ! Les terrains sont impeccables, bien entretenus et lumineux. L'équipe est top et très accueillante. Le bar après le match, c'est vraiment un plus.
    - text: CM
    - paragraph: Claire M.
    - paragraph: Il y a 1 mois
    - img
    - img
    - img
    - img
    - img
    - img
    - paragraph: Notre team building ici était un franc succès. Formule très bien organisée, coachs professionnels et repas au restaurant délicieux. On recommande vivement !
    - text: AR
    - paragraph: Antoine R.
    - paragraph: Il y a 3 semaines
    - img
    - img
    - img
    - img
    - img
    - img
    - paragraph: Cadre magnifique en plein Paris. La guinguette est vraiment dépaysante. Cours particuliers au top, j'ai vraiment progressé en quelques séances seulement.
    - text: Partenaires premium
    - heading "Nos partenaires" [level=2]
    - link "Logo ASICS ASICS Équipementier officiel — accessoires de padel disponibles sur place.":
        - /url: https://www.asics.com/fr/fr-fr/padel/
        - img "Logo ASICS"
        - heading "ASICS" [level=3]
        - paragraph: Équipementier officiel — accessoires de padel disponibles sur place.
    - link "Logo CUPRA CUPRA Partenaire automobile — l'esprit performance et élégance, sur le terrain comme sur la route.":
        - /url: https://www.cupraofficial.fr/
        - img "Logo CUPRA"
        - heading "CUPRA" [level=3]
        - paragraph: Partenaire automobile — l'esprit performance et élégance, sur le terrain comme sur la route.
    - link "Logo HEAD HEAD Équipementier racket sport — raquettes et balles de padel disponibles sur nos courts, à l'achat comme à la location.":
        - /url: https://www.head.com/fr-FR/sports/padel/
        - img "Logo HEAD"
        - heading "HEAD" [level=3]
        - paragraph: Équipementier racket sport — raquettes et balles de padel disponibles sur nos courts, à l'achat comme à la location.
    - text: Coaching & Progression
    - heading "Réservez votre cours de Padel" [level=2]
    - paragraph: Débutant ou confirmé, nos coaches certifiés vous accompagnent pour progresser rapidement et prendre encore plus de plaisir sur le terrain.
    - button "🎾 Cours Particulier"
    - button "👥 Cours Collectif"
    - paragraph: Un coach dédié, un programme sur mesure. Progressez à votre rythme avec un suivi personnalisé.
    - list:
        - listitem:
            - img
            - text: Suivi individuel et technique personnalisée
        - listitem:
            - img
            - text: Horaires flexibles selon vos disponibilités
        - listitem:
            - img
            - text: Tous niveaux, de débutant à confirmé
        - listitem:
            - img
            - text: Pack de séances ou séance à l'unité
    - text: 5+ Coachs certifiés 100% Satisfaction Tous niveaux Accueillis
    - heading "Demande de cours" [level=3]
    - paragraph: Remplissez le formulaire, notre équipe vous contacte sous 24h.
    - iframe
    - heading "Vivez l'expérience Padel15" [level=2]
    - link "@padel15club Voir sur Instagram":
        - /url: https://www.instagram.com/padel15club/?hl=fr
        - img
        - paragraph: "@padel15club"
        - paragraph: Voir sur Instagram
    - text: Entreprises & Groupes
    - heading "Team Building & Événements" [level=2]
    - paragraph: Renforcez la cohésion de vos équipes dans un lieu atypique au cœur de Paris.
    - img
    - heading "Événements d'entreprise" [level=3]
    - paragraph: Formules sur-mesure pour vos team buildings, afterworks ou séminaires, avec restauration et espaces privatifs.
    - img
    - heading "Coaching privé en groupe" [level=3]
    - paragraph: Sessions encadrées pour vos collaborateurs, tous niveaux. Coaching, initiation ou perfectionnement.
    - img
    - heading "Tournois & challenges" [level=3]
    - paragraph: Organisez votre tournoi privé entre collègues ou partenaires dans une ambiance dynamique clé-en-main.
    - paragraph: “Le team building le plus réussi qu'on ait organisé — tout le monde est reparti avec l'envie de revenir.”
    - paragraph: Marie D. — BNP Paribas
    - link "Organiser mon événement":
        - /url: "mailto:contact@padel15.fr?subject=Demande de devis événement&body=Bonjour, je souhaite obtenir un devis pour :"
    - heading "Ils nous font confiance" [level=2]
    - img "Logo Club Med"
    - img "Logo AXA"
    - img "Logo Big Mamma"
    - img "Logo Sander & Partners"
    - img "Logo BlackRock"
    - img "Logo MUFG"
    - img "Logo BNP Paribas"
    - img "Logo Boston Consulting Group"
    - img "Logo ASICS"
    - img "Logo Cupra"
    - img "Logo Club Med"
    - img "Logo AXA"
    - img "Logo Big Mamma"
    - img "Logo Sander & Partners"
    - img "Logo BlackRock"
    - img "Logo MUFG"
    - img "Logo BNP Paribas"
    - img "Logo Boston Consulting Group"
    - img "Logo ASICS"
    - img "Logo Cupra"
    - img "Logo EDF"
    - img "Logo Air Liquide"
    - img "Logo Siemens"
    - img "Logo Linkt"
    - img "Logo DEEL"
    - img "Logo HubSpot"
    - img "Logo American Vintage"
    - img "Logo HEC"
    - img "Logo Pompiers de Paris"
    - img "Logo Kering"
    - img "Logo LFP"
    - img "Logo EDF"
    - img "Logo Air Liquide"
    - img "Logo Siemens"
    - img "Logo Linkt"
    - img "Logo DEEL"
    - img "Logo HubSpot"
    - img "Logo American Vintage"
    - img "Logo HEC"
    - img "Logo Pompiers de Paris"
    - img "Logo Kering"
    - img "Logo LFP"
    - img
    - heading "Restez au cœur du jeu." [level=2]
    - paragraph: Tournois, offres exclusives et actus du club — avant tout le monde. 2× par mois, zéro spam.
    - textbox "votre@email.com"
    - button "S'inscrire" [disabled]:
        - text: S'inscrire
        - img
    - paragraph:
        - text: En vous inscrivant, vous acceptez notre
        - link "politique de confidentialité":
            - /url: /confidentialite
        - text: . Désabonnement en 1 clic.
- contentinfo:
    - link "Padel 15":
        - /url: /
        - img "Padel 15"
    - paragraph: Le club de padel haut de gamme du 15ème arrondissement de Paris.
    - text: PADEL 15 115 rue Castagnary 75015 Paris
    - link "Instagram Padel 15":
        - /url: https://www.instagram.com/padel15club/
        - img "Instagram"
    - heading "Le Club" [level=3]
    - list:
        - listitem:
            - link "Nos terrains":
                - /url: /terrains
        - listitem:
            - link "Restaurant & Guinguette":
                - /url: /restaurant
        - listitem:
            - link "Coaching":
                - /url: /coaching
        - listitem:
            - link "Événements entreprise":
                - /url: /evenements
        - listitem:
            - link "Tarifs":
                - /url: /tarifs
        - listitem:
            - link "Le Club":
                - /url: /le-club
    - heading "Pratique" [level=3]
    - list:
        - listitem:
            - link "Contact & Accès":
                - /url: /contact
        - listitem:
            - link "Réserver (Playtomic)":
                - /url: https://playtomic.com/clubs/padel-15
    - paragraph: 7j/7
    - paragraph: 8h – 22h
    - link "+33 1 45 31 58 76":
        - /url: tel:+33145315876
    - link "contact@padel15.fr":
        - /url: mailto:contact@padel15.fr
    - heading "Newsletter" [level=3]
    - paragraph: Actu du club, tournois et offres exclusives.
    - textbox "votre@email.com"
    - button "S'inscrire" [disabled]:
        - text: S'inscrire
        - img
    - paragraph: © 2026 PADEL 15 — SAS au capital de 5 000 € — RCS Paris 949 726 848 — 115 rue Castagnary 75015 Paris
    - link "Mentions légales":
        - /url: /mentions-legales
    - text: ·
    - link "Politique de confidentialité":
        - /url: /confidentialite
- dialog "Gestion des cookies":
    - paragraph:
        - text: Nous utilisons des cookies pour améliorer votre expérience et mesurer notre audience.
        - link "Politique de confidentialité":
            - /url: /confidentialite
        - text: ·
        - link "Mentions légales":
            - /url: /mentions-legales
    - button "Personnaliser"
    - button "Refuser"
    - button "Accepter"
- button "Open Next.js Dev Tools":
    - img
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  |
  3  | const PAGES = [
  4  |   { path: "/", title: "Padel 15" },
  5  |   { path: "/terrains", title: "Terrains" },
  6  |   { path: "/restaurant", title: "Restaurant" },
  7  |   { path: "/evenements", title: "Événements" },
  8  |   { path: "/coaching", title: "Coaching" },
  9  |   { path: "/le-club", title: "Club" },
  10 |   { path: "/tarifs", title: "Tarifs" },
  11 |   { path: "/contact", title: "Contact" },
  12 | ];
  13 |
  14 | for (const page of PAGES) {
  15 |   test(`${page.path} — loads without errors`, async ({ page: p }) => {
  16 |     const errors: string[] = [];
  17 |     p.on("pageerror", (err) => errors.push(err.message));
  18 |
  19 |     await p.goto(page.path);
  20 |     await p.waitForLoadState("networkidle");
  21 |
  22 |     // No JS console errors
  23 |     expect(errors).toHaveLength(0);
  24 |
  25 |     // Page has correct title
  26 |     await expect(p).toHaveTitle(new RegExp(page.title, "i"));
  27 |
  28 |     // Navbar is visible
  29 |     await expect(p.locator("nav")).toBeVisible();
  30 |
  31 |     // Footer is visible
  32 |     await expect(p.locator("footer")).toBeVisible();
  33 |   });
  34 | }
  35 |
  36 | test("homepage — dual CTA buttons present", async ({ page }) => {
  37 |   await page.goto("/");
  38 |   await expect(page.getByRole("link", { name: /réserver un terrain/i }).first()).toBeVisible();
  39 |   await expect(page.getByRole("link", { name: /organiser un événement/i }).first()).toBeVisible();
  40 | });
  41 |
  42 | test("homepage — Google rating visible", async ({ page }) => {
  43 |   await page.goto("/");
> 44 |   await expect(page.locator("text=4,8")).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  45 | });
  46 |
  47 | test("terrains — Playtomic CTA link present", async ({ page }) => {
  48 |   await page.goto("/terrains");
  49 |   const playtomicLinks = page.getByRole("link", { name: /playtomic/i });
  50 |   await expect(playtomicLinks.first()).toBeVisible();
  51 | });
  52 |
  53 | test("coaching — Tally form iframe present", async ({ page }) => {
  54 |   await page.goto("/coaching");
  55 |   const iframe = page.frameLocator('iframe[src*="tally.so"]');
  56 |   // Just check the iframe element exists in DOM
  57 |   await expect(page.locator('iframe[src*="tally.so"]')).toBeAttached();
  58 | });
  59 |
```
