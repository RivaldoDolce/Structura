# État Frontend — STRUCTURA

Date : 2026-09-19. Branche : `feat/sprint4-frontend-completion` (depuis `develop`, `83fbb9f`).
Sprint 4 en cours — Chantiers A, B, C et D livrés.

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
- **Pages** : accueil, `/plans` + `/plans/[reference]`, `/portfolio` + `/portfolio/[slug]`,
  `/ingenierie`, `/ebenisterie`, `/immobilier`, `/a-propos`, `/contact`, `/devis`, légal
  (mentions, CGV, confidentialité), `not-found.tsx`, `error.tsx`. Données de démonstration
  isolées dans `src/frontend/data/`, tests des pages dans `src/frontend/app-tests/`.
- **Vérifications vertes** : 164/164 tests Vitest, `tsc --noEmit` propre, lint 0 erreur (3 warnings
  `<img>` assumés et documentés au README). Build à rejouer hors sandbox (`next build` se plante
  par « Bus error » dans l'environnement actuel).
- **Prochain chantier (E)** : hero GSAP et SEO — chorégraphie « le plan se dessine » (fond photo,
  grille, croix en cascade, titre par masque, isométrie au scroll, parallax), `sitemap.ts`,
  `robots.ts`, JSON-LD, OG.

## Références design

- Accueil mobile : `docs/ui-maquettes/mobile/02-01_accueil-page-scrollee.png` (kicker à crochets,
  trois portes numérotées, barre CTA fixe sous le FAB WhatsApp).
- Fiche plan : `docs/mockups/06-03_iphone15-fiche-plan-blueprint.png` et
  `docs/ui-maquettes/mobile/02-04_fiche-plan-achat-sticky.png` (filigrane diagonal, tableau mono,
  prix double FCFA/EUR, barre d'achat).
- Journal chantier : `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png`.
- Tunnel devis : `docs/ui-maquettes/mobile/02-05_tunnel-devis-4-ecrans.png`.
- Détail : `Progression/plan_sprint4.md`, `Progression/evolution_frontend.md`.