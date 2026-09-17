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

## 2026-09-17 — Stabilisation de la toolchain (npm installé, réseau de retour)

- `npm install` exécuté par le porteur (587 paquets, 11 vulnérabilités connues à traiter plus tard). Choix entériné : on reste sur npm, le lockfile existe déjà.
- Bloqueurs réparés : `tsconfig.json` corrompu ligne 33 (include invalide), schéma Prisma (`@db.Int` interdit sur postgres, relation `Visite.user` sans opposé → `User.visites` ajouté), `@playwright/test` manquant installé pour le script `test:e2e`.
- Tests Vitest : `jsx: automatic` ajouté à la config esbuild (fini `React is not defined`), simulacre global `matchMedia` dans `tests/setup.ts`, `WatermarkPreview` passé en classes (`select-none`, `[-webkit-touch-callout:none]`) car jsdom n'interprète pas le CSS, test devis recentré sur `role=alert` unique.
- Résultat : 30/30 tests verts, `tsc --noEmit` propre, `prisma generate` OK.
- Lint migré : `next lint` déprécié et en crash, remplacé par `eslint.config.mjs` plat (FlatCompat + plugin TS explicite), script `lint` sur la CLI, `.eslintrc.json` supprimé. 0 erreur, 3 avertissements `<img>` assumés (`next/image` casserait le voile clip-path).
- Décision : gestionnaire officiel = npm (lockfile committé).

## 2026-09-17 — Sprint 2 `feat/sprint2-layouts-sections` : layouts & sections

- Sprint 1 mergé en fast-forward dans `develop`, branche Sprint 2 créée depuis `develop`.
- Écarts senior vs proposition : primitifs Phase 0 inexistants donc créés (pas corrigés), tokens `--color-line/line-strong/safety-deep/whatsapp-deep` ajoutés au `@theme`, `font-heading` + tailles explicites (`font-display/text-h2` inexistants), `tailwind.config.ts` ignoré par Tailwind v4, `StickyMobileCTA` non créé (mort-né), coordonnées footer en props + env.
- Fondations : `tests/setup.ts` + polyfill rAF et simulacre IntersectionObserver (Motion/jsdom).
- Primitifs TDD (9 + tests) : ButtonTech (Slot pur en asChild, coins en L), BlueprintGrid (CSS pur), Kicker, TechDivider, ProjectCard (panneau inline mobile / absolu desktop), ServiceCard (RSC), StatCounter + useCounter (whileInView once, expo-out), WhatsAppFab (wa.me assaini, bottom-24 mobile).
- Layouts TDD (3 + tests) : MobileNav (focus trap bouclé, Escape, cascade 50ms), SiteHeader (flou après 24px, body bloqué), SiteFooter (4 colonnes, année dynamique).
- Sections TDD (4 + tests) : Hero (masque H1, annotations), Stats (2→4 colonnes), Portfolio (1→3), Services (1→2, Lucide).
- `src/app/(public)/layout.tsx` : LenisProvider + header + main compensé + footer + WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Résultat : 84/84 tests, typecheck propre, lint 0 erreur, 3 warnings `<img>` assumés + 2 mocks exemptés.
- Build impossible dans ce sandbox (binding natif SWC pendu, `next --version` OK) : à rejouer sur poste/CI.
