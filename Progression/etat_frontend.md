# État Frontend — STRUCTURA

Date : 2026-09-21. Branche : `feat/sprint4-frontend-completion` (depuis `develop`, `83fbb9f`).
Sprint 4 terminé + correctifs dev réel — en attente de PR vers `develop`.

## Architecture

Séparation stricte du skill 01 : `src/frontend/components/{ui,signature,sections,layout,providers}`,
`src/frontend/{lib,hooks}`. `ui/` porte les 16 primitives, `signature/` les 14 composants de
marque, `sections/` compose les pages.

## État réel

- **Tokens** : `globals.css` est la source unique (palette `rgba` conforme au guide, échelle
  typographique fluide, conteneur 1200 px, rayons, ombres, easings et durées, grain 3 %).
  `tokens.ts` n'expose que des `var(--*)` et les listes de noms consommées par `cn.ts`.
- **Fusion de classes** : `tailwind-merge` 3 + `cn.ts` déclaré avec les échelles du thème.
  Sans cette déclaration, un `className` appelant écraserait silencieusement la taille ou la couleur.
- **Mouvement** : `animations.ts` (cascade skill 04) consommé par `hero`, `stats`, `portfolio`,
  `services`, `stat-counter`. `MotionProvider` applique `prefers-reduced-motion` aux animations
  JavaScript ; `LenisProvider` reste actif sur les routes publiques seulement.
- **Signature** : 14/14 — `PriceTag`, `StickyMobileCTA` et `LoaderCrane` livrés au chantier B
  (le « SkeletonTech » du plan est la primitive `ui/skeleton`).
- **Primitives** : 16 composants dans `ui/` (button, input, textarea, label, card, badge,
  separator, skeleton, checkbox, radio-group, select, tabs, dialog, sheet, table, toaster),
  chacun avec ses tests (`form-controls`, `overlays`, `structure`).
- **Layout** : `SiteHeader`, `MobileNav`, `SiteFooter`, `LenisProvider`, `WhatsAppFab` branchés sur
  `(public)/layout.tsx`. `next/font` alimente `--font-space-grotesk/--font-inter/--font-jetbrains-mono`.
- **Sécurité (chantier C)** : `src/frontend/lib/sanitize.ts` assainit les valeurs client passées
  dans des liens externes (`numeroInternational`, `texteMessage`, `etiquetePage` — TDD, 6 tests).
  `WhatsAppFab` refuse de rendre un lien `wa.me` si le numéro ou la référence de page sont
  inexploitables ; le fallback de numéro en dur a disparu du layout public (sans variable
  d'environnement, le bouton ne rend rien). `src/shared/constants/navigation.ts` est la source
  unique des liens publics consommés par le header et le footer. En-têtes de sécurité consolidés
  (`Permissions-Policy`, CSP sans `unsafe-eval` en production), middleware couvert par tests.
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
- **Refonte frontend (Phases 0–2 livrées, voir `plan_refonte.md` + `evolution_frontend.md`)** :
  périmètre strict respecté (données, routes et API intacts). Après la Phase 0
  (tokens v2, recettes de profondeur, fonds AVIF branchés, FAB AA), la Phase 1 a
  livré les compositions C2–C8 testées en TDD, l'accueil en 7 actes avec règle
  d'alternance verrouillée, les 4 pages métier recomposées, l'auto-démo de
  `BeforeAfter` et le verrou de références d'assets ; la Phase 2 a livré la
  signature `JalonTimeline` (rail tracé au scroll, 6 états à symbole, dates,
  photos, documents, dépenses, actions), visible sur les fiches portfolio.
  **225/225 tests**, `tsc` propre, **ESLint 0 problème**. Reste Phase 3 :
  crossfade plan→photo, skeletons blueprint, `next build`, revue comparative.

## Références design

- Accueil mobile : `docs/ui-maquettes/mobile/02-01_accueil-page-scrollee.png` (kicker à crochets,
  trois portes numérotées, barre CTA fixe sous le FAB WhatsApp).
- Fiche plan : `docs/mockups/06-03_iphone15-fiche-plan-blueprint.png` et
  `docs/ui-maquettes/mobile/02-04_fiche-plan-achat-sticky.png` (filigrane diagonal, tableau mono,
  prix double FCFA/EUR, barre d'achat).
- Journal chantier : `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png`.
- Tunnel devis : `docs/ui-maquettes/mobile/02-05_tunnel-devis-4-ecrans.png`.
- Détail : `Progression/plan_sprint4.md`, `Progression/evolution_frontend.md`.
