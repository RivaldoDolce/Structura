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
- Reste Sprint 1 : intégration `LenisProvider` au layout, page démo, test mobile réel.

## 2026-09-17 — Sprint 1 suite : 4 composants avancés en TDD

- `BeforeAfter` plus test : curseur `role=slider`, clavier complet, voile clip-path GPU, `useReducedMotion` créé pour l'occasion.
- `WatermarkPreview` plus test : filigrane diagonal répété, menu bloqué, appui long neutralisé. Vraie protection rappelée serveur, zoom fin reporté Sprint 2.
- `DevisWizard` plus test : 3 écrans d'après la maquette 02-05, validation par écran (correctif du plan proposé qui validait tout le formulaire), icônes Lucide au lieu des emojis, référence annuelle dynamique, boutons natifs en attendant `ButtonTech`.
- `LenisProvider` plus test : réutilise `useReducedMotion`, coupé sur `/devis`, `/contact` et animations réduites. Index `signature` et `providers` limités aux fichiers existants.
- Correctifs du plan proposé : `font-heading` du repo, statuts en texte plutôt qu'en classes, aucune indexation de tableau sous `noUncheckedIndexedAccess`.
