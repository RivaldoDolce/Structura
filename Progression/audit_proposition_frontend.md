# Audit proposition jointe — Frontend

Référentiels : `AGENTS.md`, `docs/Guide/GUIDE_DEVELOPPEMENT_APP.md`, `.opencode/skills/SKILL.md` (01,02,03,04,05,06,14,15), `docs/ui-maquettes`, `docs/wireframes`, `docs/mockups`.

## Conforme à garder

- Arborescence `src/frontend/ui`, `signature`, `hooks`, `lib`. Nommage PascalCase, kebab-case.
- Import `motion/react`, cascade `stagger 0.06`, `expo [0.16,1,0.3,1]`, `item y 16 d 0.4`.
- Tokens via `var(--color-*)`, aucun hex. `aria-busy`, `alt`, `sizes` next/image.
- WhatsApp pré-rempli avec référence, StickyMobileCTA mobile, PriceTag FCFA + EUR.
- Skeleton 1.4s, LoaderCrane % + phase.

## Bloquant avant join

1. Dépendances : ne pas `npm install`, ne pas ajouter `happy-dom` (doublon jsdom). Fait dans `package.json` : jsdom seul, Radix complets, `sonner`, `test:e2e`.
2. TDD AGENTS.md : écrire tests Vitest jsdom avant composants, pas Sprint 2.
3. Commentaires français obligatoires dans code, pas d'emoji dans code.
4. `CardTitle` : `font-display`, `text-h3` inexistants (repo : `font-heading`). Corriger ou ajouter utilitaires.
5. `ButtonTech` : `asChild + motion` fuit `whileHover` vers DOM. Séparer cas Slot et cas motion.
6. `ProjectCard` : panneau technique absolu caché mobile. Mettre inline mobile, hover absolu desktop `md:` uniquement.
7. Chevauchement `WhatsAppFab bottom-6` + `StickyMobileCTA`. Mettre FAB `bottom-24 md:bottom-6`.
8. `StatCounter` : démarrer `useCounter` seulement si `isInView`, sinon compte hors écran.
9. `useInView` maison : préférer `whileInView once 0.25` Motion, garder hook seulement si nécessaire.
10. `PriceTag` EUR : taux depuis `settings`, pas prop libre. WhatsApp numéro depuis `settings` + UTM.
11. `StickyMobileCTA` : `next/link`, pas `<a>`. Lenis : import `lenis/react` vérifié, `destroy` formulaires + reduced-motion.
12. Découper le join en PR fonctionnelles (contrainte de lignes levée), Conventional Commits, `lint`, `typecheck`, `test` verts quand la connexion le permettra.

## Fichiers adéquats déjà mis

- `package.json`, `vitest.config.ts` (jsdom frontend), `tests/setup.ts`.
- `Progression/plan_frontend.md`, `evolution_frontend.md`, `etat_frontend.md`.
