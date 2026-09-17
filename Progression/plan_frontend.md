# Plan Frontend — STRUCTURA

Branche : `feat/frontend-setup` (depuis `develop`).
Référentiels : `AGENTS.md`, `docs/Guide/GUIDE_DEVELOPPEMENT_APP.md`, `.opencode/skills/SKILL.md` + skills `01,02,03,04,05,06,14,15`.

## Objectif Sprint 0-1

Fondations frontend prêtes production : primitives shadcn re-thémées, 14 composants signature, hooks, lib, sans dette.

## Étapes

1. Déclarer dépendances sans installer (fait : `package.json`, `vitest.config.ts`, `tests/setup.ts`).
2. TDD : écrire tests Vitest frontend (jsdom) avant composants.
3. Implémenter par lots fonctionnels (pas de limite de lignes par fichier — exigence levée) :
   - Lot A : `lib` existants à aligner (`tokens.ts` vers `var(--*)`, `animations.ts` vers cascade expo 0.06 + `motion/react`).
   - Lot B : `ui/` (button, input, label, card, badge, skeleton, separator, checkbox, textarea + dialog, select, tabs manquants).
   - Lot C : `signature/` (12 proposés + `JalonTimeline`, `BeforeAfter`, `WatermarkPreview`, `DevisWizard` manquants).
   - Lot D : `hooks/` (5 proposés) + `providers/lenis-provider.tsx`.
4. Valider : `lint`, `typecheck`, `test`, Lighthouse ≥ 90, 360px→1440px, clavier, reduced-motion.

## Règles bloquantes

- Tokens uniquement, aucun hex en dur. Server Components par défaut, `"use client"` justifié.
- Imports `motion/react`, pas `framer-motion`. `lenis/react` via provider, détruit sur `/devis`, `/contact`.
- Commentaires français, pourquoi uniquement. Pas d'emoji dans le code (icônes Lucide, même si les maquettes montrent des emojis).
- WhatsApp numéro en `settings`, jamais hardcodé. Prix via `PriceTag` FCFA + EUR.
