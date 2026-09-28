# État Frontend — STRUCTURA

Date : 2026-09-28. Branche : `feat/refonte-design` (alignée sur `origin/feat/refonte-design`).
Refonte V3 en cours — Lots 0 à 3 livrés (garde-fous TDD, header institutionnel, hero « un seul porteur du plan », coutures et transitions entre actes, quatre scènes ingénierie différenciées), 333 tests verts.
Cahier des charges actif : `docs/Guide/refonte_structura_v3.md` (roadmap par lots 0 à 6, `Progression/plan_refonte_v3.md` + `Progression/plan_integration_images_v3.md` : lots Vague 1 à 4 intégrés, `npm run assets`, maîtres `04-30` → `04-81`).

## Architecture

Séparation stricte du skill 01 : `src/frontend/components/{ui,signature,sections,layout,providers}`,
`src/frontend/{lib,hooks}`, `src/frontend/data/`. `ui/` porte les 16 primitives, `signature/` les 19 composants de
marque, `sections/` compose les pages et les scènes métier.

## État réel

- **Tokens & Lumières** : `globals.css` est la source unique (`rgba`, palette de marque sombre + socle V2 ivoire/warm :
  `paper`, `paper-soft`, `encre`, `encre-soft`, `cuivre`, `ok-deep`, `steel-encre`).
  Contrats AA vérifiés (`contrastes-v2.mjs`) : `encre` sur `paper` ≥ 12:1, `encre-soft` sur `paper` ≥ 7:1,
  `steel-encre` sur `paper` ≥ 7,88:1. `tokens.ts` n'expose que des `var(--*)` et les listes consommées par `cn.ts`.
  `lib/lumieres.ts` formalise les 4 lumières (`sombre`, `ivoire`, `pale`, `warm`) et leurs tons.
- **Fusion de classes** : `tailwind-merge` 3 + `cn.ts` déclaré avec toutes les échelles étendues du thème.
- **Typographie** : Space Grotesk (titres/structure), Inter (lecture/corps), JetBrains Mono (cotes/données),
  et Fraunces italique (`--font-editorial`, `font-editorial`) réservée aux 5 usages d'émotion/matière (hero, bois, citation, clôture).
- **Mouvement & Transitions** : cascade GSAP + `motion/react` unifiée (`animations.ts`).
  Survols unifiés : `-translate-y-2` + `shadow-glow` + `scale(1.03/1.04)` en `duration-reveal ease-out-expo`.
  V3 : plus aucun `transition-all` ni durée littérale dans les sources de production — toute durée
  sort de l'échelle `--transition-duration-*` (`micro` 150 ms → `cinematic` 700 ms), vérifié par
  `app-tests/regles-v3.test.ts`.
  Transition de route subtile via `src/app/template.tsx` (voile + translation légère, sans casser le focus).
  Garde systématique : coupure sous 768 px et respect strict de `prefers-reduced-motion` (`useScenarioActif`, `MotionProvider`).
- **Signature & Primitives** : 19 composants signature et 16 primitives UI fonctionnels et testés en TDD.
  `ButtonTech` gère les coins en L et variantes (`conversion`, `primary`, `ghost`, `encre`).
  `JalonTimeline` sur fiches portfolio avec rail tracé au scroll.
  `BeforeAfter` avec auto-démo 30 → 65 → **50** (repos au centre : 45 % se lisait
  comme une valeur « correcte »), `aria-valuetext` annonçant la part visible de
  chaque état, et contrôle clavier complet.
- **Layout & Navigation** : `SiteHeader` (sceau institutionnel, double seuil de défilement — floutage à 24 px, compactage à 96 px —
  `data-compact` 56/64 px, soulignement actif unique `.st-lien`, `aria-current` sur la page courante, transitions ciblées conditionnées
  par `prefers-reduced-motion`). Conteneur borné et rempli (`w-full max-w-[112rem]`) sur grille `auto 1fr auto` :
  verrou de marque (sceau + titre) à l'extrême gauche, appel à l'action à
  l'indroite du contenu, hamburger `justify-self-end` en dessous de `md`.
  `MobileNav` (dialogue modal accessible A11y),
  `SiteFooter` (4 colonnes de navigation + mentions), `WhatsAppFab` (sécurisé, numéro assaini).
- **Sécurité & Données** : `sanitize.ts` assainit tous les liens externes. Données isolées dans `data/` et vérifiées par `coherence.test.ts`.
- **Pages & Scènes** :
  - Accueil en 10 actes narratifs alternant les lumières (hero sombre → stats pâle → ingénierie ivoire → ébénisterie warm → plans pâle → immobilier sombre → portfolio ivoire → journal sombre → méthode pâle → conversion warm).
  - Hero d'accueil V3 : photographie réelle de chantier R+2 à Yaoundé (`PHOTO_HERO_ACCUEIL`, luminance
    mesurée ~0,13 au tiers gauche) sous voile dégressif `.st-voile-photo`, H1 sur l'échelle `--text-hero`
    (max 72 px) en trois lignes masquées avec « confiance » en dernier temps, et `PlanDessin` seul porteur
    du plan (la maille blueprint et le parallax multi-couches ont quitté le hero : un seul mouvement
    scroll-driven, le tracé `data-motion="trace-scrub"`).
  - Pages métier : `/ingenierie` (quatre scènes différenciées Lot 3 : étude 40/60 ivoire,
    note de calcul pâle en chevauchement, ferraillage blueprint pleine largeur, suivi
    warm sur photo), `/ebenisterie`, `/plans` + `[reference]`, `/immobilier`, `/portfolio` + `[slug]`.
  - Tunnel `/devis` en 3 étapes avec réassurance, `/contact`, pages légales.
  - **Coutures (Lot 2)** : `.st-lisiere` ne fond plus vers le noir entre deux bandes
    claires — la jonction clair/clair est un filet d'un pixel en `line-encre`, le
    dégradé n'étant réservé qu'à l'entrée et à la sortie d'une zone sombre.
  - **Aucune photographie recyclée sur l'accueil** : le hero, l'acte 03, le fondu
    de l'acte 08, les jalons du journal, le portfolio et le catalogue de plans
    présentent chacun un cliché distinct (garde dans `accueil.integration.test.tsx`).
  - **Catalogue de plans** : chaque modèle est présenté par son tracé
    `IllustrationPlan` (villa / duplex en cascade / immeuble R+4), jamais par la photo
    d'un bâti déjà vendu. `typeBatiment` resserré de `string` à `TypeBatiment` à la source.
- **Vérifications vertes** :
  - **100% des suites de tests Vitest passantes** (unitaires, composants signature dont CtaMagnetique & DevisWizard, sections, intégration, layout MobileNav cascade/miroir, pages métier, règles V3).
  - `tsc --noEmit` propre (zéro erreur TypeScript).
  - `next build` réussi avec 28 pages statiques et SSG générées.
  - Scripts d'audit : `contrastes-v2.mjs` vert.

## Référence stratégique : Cahier de refonte V3 (`docs/Guide/refonte_structura_v3.md`)

Le projet entre dans la mise en œuvre de la V3 structurée en 7 lots (Lots 0 à 6) :
- **Lot 0** : Garde-fous TDD (non-régression composition, surfaces, kickers, CTA, tabulaires).
- **Lot 1** : Visage du site (Header institutionnel avec monogramme + underline + transitions ciblées ; Hero avec un seul porteur de plan, H1 équilibré sans veuve, lisibilité photo).
- **Lot 2** : Coutures entre actes (`st-lisiere` contextuelle au voisin, séparation clair→clair nette).
- **Lot 3** : Compositions asymétriques & scènes métier (refonte de `/ingenierie` en 4 actes différenciés, colonnes secondaires utiles).
- **Lot 4** : Motion narrative ciblée (title reveal, devis sans flash, spring/mask mobile).
- **Lot 5** : Matière, finition & footer (grain local, light warm, placeholders image, footer institutionnel).
- **Lot 6** : Progressive enhancement (View Transitions facultatives).

  Le tunnel `/devis` reste public : le réserver aux connectés tuerait la conversion.
- **Pages** : accueil, `/plans` + `/plans/[reference]`, `/portfolio` + `/portfolio/[slug]`,
  `/ingenierie`, `/ebenisterie`, `/immobilier`, `/a-propos`, `/contact`, `/devis`, légal
  (mentions, CGV, confidentialité), `not-found.tsx`, `error.tsx`. Données de démonstration
  isolées dans `src/frontend/data/`, tests des pages dans `src/frontend/app-tests/`.
- **Hero GSAP + SEO (chantier E)** : `PlanDessin` (isométrie SVG statique sans JS, ~30 tracés
  `data-trace`) rejoué au scroll par `HeroScenario` (`import()` GSAP + ScrollTrigger, scrub,
  parallax 3 couches 0.94/1.0/1.06, coupé sous 768 px et en mouvement réduit). SEO :
  `sitemap.ts` (vitrine + plans + portfolio), `robots.ts` (prive `/compte`, `/gestion`,
  `/admin`, `/api`), JSON-LD `Organization` + `WebSite` dans le layout racine, `metadataBase`
  - canoniques (accueil, fiche plan) + OG fiche plan. Constantes dans
    `src/shared/constants/site.ts`.
- **Vérifications vertes** : 185/185 tests Vitest, `tsc --noEmit` propre, **ESLint 0 problème**
  (plus aucun `<img>` hors mocks de test). Dev réel OK : optimiseur d'images vérifié
  (449 Ko → 21 Ko AVIF), toutes les pages en 200. Correctifs détaillés dans
  `evolution_frontend.md`. `next build` reste à valider en CI.
- **Refonte frontend (Phases 0–2 livrées, voir `plan_refonte.md` + `evolution_frontend.md`)** : périmètre strict respecté (données, routes et API intacts). Après la Phase 0
  (tokens v2, recettes de profondeur, fonds AVIF branchés, FAB AA), la Phase 1 a
  livré les compositions C2–C8 testées en TDD, l'accueil en 7 actes avec règle
  d'alternance verrouillée, les 4 pages métier recomposées, l'auto-démo de
  `BeforeAfter` et le verrou de références d'assets ; la Phase 2 a livré la
  signature `JalonTimeline` (rail tracé au scroll, 6 états à symbole, dates,
  photos, documents, dépenses, actions), visible sur les fiches portfolio.
  Phase 2 terminée ensuite : garde `use-scenario-actif` partagée, crossfade
  plan→photo en acte 5, skeletons blueprint + `loading.tsx` des routes
  dynamiques. Phase 3 soldée le 2026-09-22 : fiche plan « dossier projet »,
  AA mesuré (ink-mute informatif replié sur ink-soft), `next build` vert
  (28 pages, First Load < 200 Ko), LCP lab 176/228 ms, revue visuelle avec
  un défaut corrigé (annotation hero).
  **239/239 tests**, `tsc` propre, **ESLint 0 erreur** (3 warnings pré-existants
  sur le script d'audit). Reste : mesure terrain (mobile réel, clavier
  physique, 4G) puis merge vers `develop`.

## Références design

- Accueil mobile : `docs/ui-maquettes/mobile/02-01_accueil-page-scrollee.png` (kicker à crochets,
  trois portes numérotées, barre CTA fixe sous le FAB WhatsApp).
- Fiche plan : `docs/mockups/06-03_iphone15-fiche-plan-blueprint.png` et
  `docs/ui-maquettes/mobile/02-04_fiche-plan-achat-sticky.png` (filigrane diagonal, tableau mono,
  prix double FCFA/EUR, barre d'achat).
- Journal chantier : `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png`.
- Tunnel devis : `docs/ui-maquettes/mobile/02-05_tunnel-devis-4-ecrans.png`.
- Détail : `Progression/plan_sprint4.md`, `Progression/evolution_frontend.md`.
