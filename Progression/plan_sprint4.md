# Plan Sprint 4 — Achèvement du frontend

Date : 2026-09-19. Branche : `feat/sprint4-frontend-completion` (depuis `develop`, commit `83fbb9f`).
Référentiels : `AGENTS.md`, `docs/Guide/GUIDE_DEVELOPPEMENT_APP.md` (§2, §3, §4), `.opencode/skills`
(01, 03, 04, 05, 06, 10, 14, 15), `docs/ui-maquettes`, `docs/wireframes`, `docs/mockups`.

## Contexte

Le Sprint 3 a livré la démo interne et les tests d'intégration : 88 tests verts, `typecheck` propre,
`lint` sans erreur. Le frontend reste inachevé sur cinq points structurels, relevés par l'audit :

1. `lib/tokens.ts` expose des hexadécimaux en dur et `lib/animations.ts` une cascade hors spec ;
2. `src/frontend/components/ui/` est vide (aucune primitive re-thémée) ;
3. 4 des 14 composants signature manquent : `PriceTag`, `StickyMobileCTA`, `SkeletonTech`, `LoaderCrane` ;
4. aucune page publique n'existe hors `/devis` et `/demo/sections` ;
5. le hero reste un titre statique, sans la chorégraphie « le plan se dessine » ni le fond photo du kit.

## État réel à corriger (vérifié le 2026-09-19)

| Constat | Preuve |
|---|---|
| `--color-ink-muted` utilisé 16 fois + 3 fois dans `shared/constants/statuts.ts` | `grep -rn ink-muted src/` |
| `--font-heading` utilisé 20 fois et posé par `next/font` | `src/app/layout.tsx:7` |
| `BlueprintGrid` sans croix de repérage et API `low/medium/high` hors doc | `blueprint-grid.tsx` vs guide §2.3.1 |
| `tailwind.config.ts` inerte (Tailwind 4 CSS-first, aucun `@config`) | `postcss.config.js` |
| `.st-grain` et `.st-bg-blueprint` déclarés mais jamais consommés | `globals.css:67-86` |
| `--color-line` / `--color-line-strong` en aplat `#1E293B` / `#334155` au lieu de `rgba` | guide §2.2.1 |
| `tokens.ts` et `animations.ts` : 0 import dans tout `src/` | `grep -rn "lib/tokens\|lib/animations"` |
| `gsap` absent des dépendances alors que le guide §3.2 l'exige pour le hero | `package.json` |
| README §Déviations affirme « aucune déviation » | `README.md:379` |

## Décisions d'architecture (arbitrées en amont du code)

1. **Renommages de tokens alignés sur la source de vérité** : `--color-ink-mute` et
   `--font-display` / `--font-sans` / `--font-mono`. La migration est faite dans le même lot que
   l'ajout des tokens, sinon les classes deviennent silencieusement inexistantes (aucun outil ne
   détecte une classe Tailwind morte).
2. **`layout.tsx` aligné en conséquence** : `--font-space-grotesk`, `--font-inter`,
   `--font-jetbrains-mono`, et `font-sans` explicite sur `body`.
3. **Échelle typographique fluide** ajoutée au `@theme` (`text-display/h1/h2/h3/body/small/mono-xs`) :
   le guide §2.2.2 et le skill 03 la définissent ; sans elle, chaque composant inventerait sa taille.
4. **Conteneur et rayons tokenisés** : `--container-content: 1200px` → `max-w-content`,
   `--radius-card/control/modal/pill` → `rounded-card/control/modal/pill`.
5. **Annotations mono tokenisées** : `text-mono-xs` (0,75 rem, interligne 1.4, tracking 0.08em) et
   `--tracking-annotation: 0.2em` pour les kickers et séparateurs.
6. **Grain de bruit conservé et câblé réellement** : `body::after`, 3 % d'opacité, asset du kit
   (`05-07_texture-grain.png`). Le guide §2.2.3 l'impose ; les deux utilitaires morts
   (`.st-grain`, `.st-bg-blueprint`) sont supprimés au profit de cette implémentation unique.
7. **`tailwind.config.ts` supprimé** et `components.json` réaligné : le `@theme` de `globals.css`
   est l'unique source, une config inerte ne peut que dériver.
8. **`BlueprintGrid` : croix de repérage livrées**, peintes par token via l'asset du kit
   (`05-03_texture-croix-160.svg`) utilisé en masque alpha et colorié par `--color-blueprint`
   (le kit définit la croix en `rgba(34,211,238,.30)`). API : `density: "fine" | "major"`,
   `fade: "none" | "bottom" | "both"`. `density` suit le guide (`fine` 32 px, `major` 160 px) et
   `fade` conserve la valeur `"both"` déjà consommée — aucune régression d'appel.
9. **`tokens.ts` expose en plus `THEME_COLOR`** : une balise `<meta name="theme-color">` n'accepte
   pas `var()`, l'hexadécimal doit donc exister en un seul endroit et être justifié.
10. **`spacing` supprimé de `tokens.ts`** (aucun consommateur) : le rythme de section vit dans les
    classes de section, pas dans un objet mort.
11. **`motion` (12.43.0) et `motion/react`** restent la seule librairie d'animation du frontend ;
    `gsap` sera déclaré au chantier E, en import dynamique et pour un seul scénario épinglé.

## Chantiers et ordre d'exécution

Chaque chantier est un commit autoportant : `typecheck`, `lint` et `vitest` doivent être verts
avant de passer au suivant, et `evolution_frontend.md` est mis à jour à la fin de chacun.

### Chantier A — Design fixes et hygiène des tokens
1. `src/app/globals.css` : palette conforme au guide, échelle typo, conteneur, rayons, ombres,
   easings et durées, grain, focus cyan, `prefers-reduced-motion`.
2. `src/frontend/lib/tokens.ts` : `var(--color-*)` + `THEME_COLOR`, easings, durées, rayons, breakpoints.
3. `src/frontend/lib/animations.ts` : cascade skill 04 (`stagger 0.06`, `y 16`, `0.4 s`, expo,
   `once`, seuil 0.25), variantes masque et traits de cote.
4. `src/frontend/components/signature/blueprint-grid.tsx` : croix de repérage, API alignée.
5. Migrations mécaniques : `font-heading` → `font-display`, `ink-muted` → `ink-mute`,
   `max-w-[1200px]` → `max-w-content`, `rounded-[10px|16px|20px]` → `rounded-control|card|modal`,
   annotations mono → `text-mono-xs`.
6. Suppression de `tailwind.config.ts`, `components.json` réaligné, README §Déviations corrigé.
7. Tests : réécriture de `blueprint-grid.test.tsx`, nouveau `lib/__tests__/cn.test.ts`.

### Chantier B — Primitives UI et composants signature manquants
1. `ui/` : 16 primitives re-thémées par tokens (button, input, textarea, label, card, badge,
   skeleton, separator, checkbox, radio-group, select, tabs, dialog, sheet, table, toaster).
2. `signature/` : `PriceTag`, `StickyMobileCTA`, `SkeletonTech`, `LoaderCrane`.
3. Réalignement de `Kicker` (crochets et séparateur `·` de la maquette), `TechDivider` (croix aux
   extrémités), `ButtonTech` (focus cyan, effet magnétique desktop).
4. Tests de chaque primitive et composant, `demo/sections` complété.

### Chantier C — Sécurité et partagé (périmètre frontend strict)

Vérifications préalables faites le 2026-09-19 :

- `src/shared/constants/` existe (roles, navigation, statuts, limites), typé `as const`,
  mais aucun import dans le frontend : le header et le footer maintiennent chacun leur
  propre liste de liens (dé double source de vérité).
- Aucun usage d'UTM/searchParams dans `src/` : la partie « UTM » du plan est abandonnée
  (pas de code mort).
- Un seul lien externe dans le frontend : `WhatsAppFab` (déjà `rel="noopener noreferrer"`),
  le numéro est assaini localement. `tel:`/`mailto:` du footer non bordés.
- En-têtes : `next.config.ts` et le middleware se recouvrent partiellement, le middleware
  n'applique pas `Permissions-Policy` ; `unsafe-eval` en production inutile aujourd'hui
  (aucun script CinetPay chargé côté frontend).

Arbitrages :

1. **`NAVIGATION` devient la source unique des liens publics** consommée par `site-header`
   (filtre sur les pages métier). Le footer garde ses regroupements éditoriaux mais
   importe les mêmes constantes quand les colonnes coïncident.
2. **`src/frontend/lib/sanitize.ts`** (TDD) : `numeroInternational` (wa.me n'accepte que
   des chiffres), `texteMessage` (borne le message pré-rempli), `etiquetePage` (référence
   courte sans caractère de contrôle, `null` sinon). `WhatsAppFab` refuse de rendre un
   lien wa.me si le numéro ou la référence sont inexploitables — jamais de lien forgé.
3. **Le fallback `+237690000000` disparaît du layout** : sans `NEXT_PUBLIC_WHATSAPP_NUMBER`
   le bouton ne rend rien, plutôt qu'un faux numéro. Le footer garde sa prop mais la valeur
   par défaut est assumée comme donnée de démonstration, à surcharger par l'environnement.
4. **Middleware testé unitairement** (simulacre NextRequest, environnement node) : redirection
   anonyme → `/compte/connexion?callbackUrl=…`, session présente → pass, page d'auth +
   session → `/compte`, et les quatre en-têtes de sécurité alignés sur `next.config.ts`.
   `Permissions-Policy` ajouté au middleware (écart réel détecté par le test).
5. **CSP : `unsafe-eval` conditionné au développement** (React Refresh l'exige en dev) ;
   les sources CinetPay restent référencées, aucun script n'étant chargé aujourd'hui.
   `callbackUrl` : le middleware ne transmet que le chemin d'origine (jamais la query),
   donc aucune ouverture à un callback externe tant qu'Auth.js n'est pas branché.

Livrables : `sanitize.test.ts` (6), `whatsapp-fab.test.tsx` (4, +1 cas invalide),
`middleware.test.ts` (4). Tout le reste est consolidation, pas de code mort.

### Chantier D — Pages publiques
Routes P0 du guide §4.1-4.2 : `/`, `/ingenierie`, `/plans`, `/plans/[reference]`, `/portfolio`,
`/portfolio/[slug]`, `/a-propos`, `/contact`, `/devis`, légal, 404/500. Données de démonstration
isolées dans `src/frontend/data/` et documentées comme provisoires (skill 01 : `frontend/`
n'importe jamais `backend/`).

### Chantier E — Hero GSAP et SEO
Chorégraphie complète du guide §3.3.1 (fond photo du kit, grille fondu 400 ms, croix en cascade,
titre par masque, isométrie `stroke-dashoffset` au scroll, annotations, parallax 3 couches
désactivé sous 768 px), `sitemap.ts`, `robots.ts`, JSON-LD, OG.

## Vérification de fin de sprint

- `npx vitest run` : aucune régression, ≥ 88 tests au chantier A puis croissance à chaque lot.
- `npx tsc --noEmit` : 0 erreur.
- `npm run lint` : 0 erreur (warnings `<img>` assumés et documentés).
- Contrôle 360 px → 1440 px sur `demo/sections` et les pages publiques, clavier, focus visible,
  `prefers-reduced-motion` émulé.
- `README.md` §Déviations à jour, `evolution_frontend.md` et `etat_frontend.md` à jour.
- Merge sur `develop` via une PR unique en fin de sprint.