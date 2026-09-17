# Plan Sprint 2 — Layouts & Sections

Date : 2026-09-17. Branche : `feat/sprint2-layouts-sections` (depuis `develop`, Sprint 1 mergé en fast-forward). Durée estimée : 1 jour.

## Contexte

Le Sprint 1 a livré 4 composants signature + LenisProvider (30 tests verts, toolchain stable). Le Sprint 2 construit la navigation responsive et les sections de la page d'accueil. La proposition reçue est adaptée ci-dessous à l'état réel du repo.

## Écarts relevés par l'audit senior (décisions)

1. Les primitifs « Phase 0 » (ButtonTech, BlueprintGrid, Kicker, TechDivider, ProjectCard, ServiceCard, StatCounter, useCounter, WhatsAppFab) n'existent pas : phase 1 = les créer en TDD, pas les « corriger ».
2. Tokens manquants dans `globals.css` (`--color-line`, `--color-line-strong`, `--color-safety-deep`, déjà utilisés au Sprint 1) : les ajouter au `@theme`.
3. `font-display`, `text-display`, `text-h2` n'existent pas : `font-heading` + tailles explicites (`text-5xl md:text-7xl` hero, `text-3xl md:text-5xl` sections).
4. `tailwind.config.ts` (fontSizes, animations) ignoré par Tailwind v4 sans `@config` : ne rien en attendre, tout passe par `@theme` et classes explicites.
5. jsdom + Motion : ajouter à `tests/setup.ts` un polyfill `requestAnimationFrame` et un simulacre `IntersectionObserver` (sinon `whileInView` ne se déclenche jamais en test).
6. Numéros : WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER`, contact footer via props avec défauts (jamais de hardcode dispersé).
7. `StickyMobileCTA` non créé : mort-né, le layout proposé ne l'utilise pas.

## Livrables

1. Tokens : 3 vars dans `globals.css`, setup.ts complété.
2. `signature/` : ButtonTech, BlueprintGrid, Kicker, TechDivider, ProjectCard, ServiceCard, StatCounter (+ `hooks/use-counter.ts`), WhatsAppFab — chacun avec son test, index étendu.
3. `layout/` : MobileNav, SiteHeader, SiteFooter + tests + index.
4. `sections/` : Hero, Stats, Portfolio, Services + tests + index.
5. `src/app/(public)/layout.tsx` : LenisProvider + SiteHeader + SiteFooter + WhatsAppFab.

## Règles (rappel plan Sprint 1)

Tokens `var(--*)` uniquement, Server Components par défaut, `"use client"` justifié, commentaires français sur le pourquoi, Lucide jamais d'emojis, strict sans `any`, TDD test-avant-code, pas de limite de lignes.

## Vérification

`npx vitest run`, `npx tsc --noEmit`, `npm run lint`, `npm run build`. Cible : 0 erreur, tests ≥ 85 au total, pas de régression Sprint 1.
