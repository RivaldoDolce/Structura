# Plan Sprint 1 — composants signature avancés

Date : 2026-09-17. Branche : `feat/sprint1-frontend-components-avancees`. Durée estimée : 2 jours.

## Contexte

Le setup déclare les dépendances sans les installer (connexion insuffisante). Le Sprint 1 implémente les 4 composants signature complexes et le provider Lenis, en TDD strict : test Vitest jsdom avant chaque composant.

## Livrables

1. `JalonTimeline` (`signature/jalon-timeline.tsx`) : Étude, Fondations, Élévation, Finitions, Livraison. États terminé (cyan, coche), en cours (pulse 2s), à venir (pointillé). Horizontal avec défilement mobile d'après la maquette 02-15, pas vertical. Dates format fr, notes optionnelles.
2. `BeforeAfter` : slider avant/après, poignée 44px minimum, souris plus clavier (flèches), labels mono AVANT/APRÈS.
3. `WatermarkPreview` : filigrane diagonal répété d'après le mockup 06-03, menu contextuel bloqué, zoom limité à 2x.
4. `DevisWizard` : 3 étapes maximum d'après la maquette 02-05, barre phases de chantier, sauvegarde localStorage, validation onBlur, téléphone requis, email optionnel, WhatsApp coché par défaut.
5. `LenisProvider` (`components/providers/lenis-provider.tsx`) : défilement fluide global, désactivé sur `/devis` et `/contact`, coupé si reduced-motion.

## Règles

- Tokens `var(--*)` uniquement, Server Components par défaut, `"use client"` justifié par interaction.
- Commentaires français portant sur le pourquoi. Icônes Lucide, jamais d'emojis dans le code.
- TypeScript strict sans `any`. Erreurs de validation requalifiées côté serveur, jamais de message système au visiteur.
- Pas de limite de lignes par fichier (exigence levée). Découpage par lots fonctionnels.

## Vérification reportée au retour de la connexion

`npm install`, `lint`, `typecheck`, `test`, `build`, navigateurs Playwright, Lighthouse, contraste AA, lecteur d'écran.
