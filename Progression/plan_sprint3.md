# Plan Sprint 3 — Démo & Intégration

Date : 2026-09-17. Branche : `feat/sprint3-demo-integration` (depuis `develop`, Sprint 2 mergé). Durée estimée : 0,5 jour.

## Contexte

Sprint 2 livré : 84 tests verts, layouts + sections + layout public sur `develop`. Reste du Jour 2 : galerie de démonstration, tests d'intégration, documentation. La proposition reçue décrivait le Sprint 2 déjà livré : non appliquée (elle régressait `font-heading`, tokens et supprimait les corrections senior).

## Livrables

1. `src/app/demo/sections/page.tsx` : galerie des sections et primitifs avec photos réelles de `public/photos`, métadonnées `noindex`.
2. `src/frontend/components/layout/__tests__/navigation.integration.test.tsx` : parcours hamburger → lien → fermeture + body restauré.
3. `src/frontend/components/sections/__tests__/accueil.integration.test.tsx` : composition Hero + Stats + Portfolio + Services avec données mock.
4. Docs : `evolution_frontend.md`, `etat_frontend.md` à jour.

## Règles

TDD, tokens `var(--*)`, Server Components par défaut, commentaires français sur le pourquoi, strict sans `any`. Pas de `"use client"` sur la page démo (assemblage seul).

## Vérification

`npx vitest run`, `npx tsc --noEmit`, `npm run lint`. Cible : 0 erreur, ≥ 88 tests, pas de régression. Build rejoué hors sandbox.
