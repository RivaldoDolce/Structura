# État Frontend — STRUCTURA

Date : 2026-09-17. Branche : `feat/sprint1-frontend-components-avancees`. Sprint 1 en cours.

## Architecture

Séparation stricte skill 01 : `src/frontend/components/ui` (primitives shadcn), `signature` (marque), `sections` (pages), `hooks`, `lib` (cn, tokens, animations).

## État réel

- `lib/cn.ts` conforme. `lib/tokens.ts` à migrer vers `var(--*)`. `lib/animations.ts` à aligner sur la cascade skill 04.
- Dossiers `ui` encore vide. `signature` contient `JalonTimeline`, `BeforeAfter`, `WatermarkPreview`, `DevisWizard` avec tests, plus index limités à l'existant.
- `hooks` contient `useReducedMotion`. `providers` contient `LenisProvider` non encore branché au layout.
- Dépendances déclarées sans installation (connexion insuffisante) : motion, lenis, cva, Radix, sonner, Testing Library, jsdom seul.
- Sprint 1 : reste l'intégration layout, la page démo et les vérifications au retour du réseau.

## Références design

- Journal chantier : `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png` (timeline horizontale à 360px).
- Tunnel devis : `docs/ui-maquettes/mobile/02-05_tunnel-devis-4-ecrans.png` (3 étapes, cartes visuelles).
- Fiche plan : `docs/mockups/06-03_iphone15-fiche-plan-blueprint.png` (filigrane diagonal, tableau mono, barre sticky).
- Détail : `Progression/plan_sprint1.md`, `Progression/audit_sprint1.md`.
