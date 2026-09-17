# État Frontend — STRUCTURA

Date : 2026-09-17. Branche : `feat/sprint2-layouts-sections` (depuis `develop`). Sprint 2 terminé, en attente de merge.

## Architecture

Séparation stricte skill 01 : `src/frontend/components/ui` (primitives shadcn), `signature` (marque), `sections` (pages), `hooks`, `lib` (cn, tokens, animations).

## État réel

- `lib/cn.ts` conforme. `lib/tokens.ts` à migrer vers `var(--*)`. `lib/animations.ts` à aligner sur la cascade skill 04.
- Dossiers `ui` encore vide. `signature` contient `JalonTimeline`, `BeforeAfter`, `WatermarkPreview`, `DevisWizard` avec tests, plus index limités à l'existant.
- `hooks` contient `useReducedMotion`, `useCounter`. `providers` contient `LenisProvider` branché au layout public.
- `layout` contient `SiteHeader`, `MobileNav`, `SiteFooter`. `sections` contient `Hero`, `Stats`, `Portfolio`, `Services`.
- Tokens `@theme` complets : line, line-strong, safety-deep, whatsapp-deep ajoutés.
- Dépendances installées via npm (gestionnaire officiel, lockfile committé) : motion, lenis, cva, Radix, sonner, Testing Library, jsdom, playwright, plugin TS ESLint.
- Vérifications vertes : 84/84 tests Vitest, typecheck propre, lint 0 erreur (3 avertissements `<img>` assumés), Prisma généré. Build à rejouer hors sandbox (SWC natif pendu ici).
- Sprint 3 : assembler la page d'accueil (Hero + Stats + Portfolio + Services + témoignages, FAQ, CTA final), page `/devis` avec DevisWizard, tests E2E Playwright.

## Références design

- Journal chantier : `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png` (timeline horizontale à 360px).
- Tunnel devis : `docs/ui-maquettes/mobile/02-05_tunnel-devis-4-ecrans.png` (3 étapes, cartes visuelles).
- Fiche plan : `docs/mockups/06-03_iphone15-fiche-plan-blueprint.png` (filigrane diagonal, tableau mono, barre sticky).
- Détail : `Progression/plan_sprint1.md`, `Progression/audit_sprint1.md`.
