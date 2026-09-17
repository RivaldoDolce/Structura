# Évolution Frontend — STRUCTURA

## 2026-09-17 — Initialisation `feat/frontend-setup`

- Branche créée depuis `develop`, propre.
- Dépendances déclarées sans installation : `motion`, `lenis`, `class-variance-authority`, 9 Radix, `sonner`, Testing Library + `jsdom`.
- Config adéquate : `test:e2e` ajouté, `vitest.config.ts` avec `environmentMatchGlobs` frontend/jsdom, `tests/setup.ts`.
- Existant relevé : `cn.ts` OK, `tokens.ts` à migrer vers `var(--*)`, `animations.ts` à aligner cascade skill 04, `ui/` et `signature/` vides.
## 2026-09-17 — Sprint 1 `feat/sprint1-frontend-components-avancees`

- Branche créée depuis `feat/frontend-setup` (contient le setup déclaré).
- `JalonTimeline` implémenté en TDD avec son test Vitest jsdom, d'après la maquette 02-15 : horizontal partout, défilement mobile, `font-heading` du repo, statut en texte pour lecteurs d'écran, aucun point de focus sur les items non interactifs.
- Déviation documentée : skill 03 prévoyait vertical mobile, la maquette impose horizontal compact.
- Non vérifié faute de connexion : `npm install` puis `lint`, `typecheck`, `test`, `build` à rejouer au retour du réseau.
- Reste Sprint 1 : `BeforeAfter`, `WatermarkPreview`, `DevisWizard`, `LenisProvider`.
