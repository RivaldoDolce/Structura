# Évolution Frontend — STRUCTURA

## 2026-09-22 — Refonte frontend : Phases 1 et 2 (compositions + signature)

Périmètre : `Progression/plan_refonte.md` respecté — tokens, styles et composition
visuelle uniquement ; **données, routes, API, tunnel, sanitize et sécurité intacts**
(les jalons s'enrichissent en démo, sans schéma ni route touchés).

- **Mouvement** : `scaleReveal` / `drawLine` / `blurSettle` dans `animations.ts`
  (tokens `cinematic` + `outExpo`, zéro courbe locale), 5 tests.
- **Compositions C2–C8** créées + testées (TDD) : `BandeauAlterne` (sens alterné,
  surface contextuelle par métier), `MosaiqueAsymetrique` (21/9 + 2×4/3 + 4/5 via
  `ProjectCard` étendu — `ratio`, `imageSizes`, `imageAlt`), `StatistiquesSourcees`
  (sources en Inter, jamais en mono), `TimelineHorizontale` (scroll-snap, statuts
  écrits, promesse de suivi), `PleinLargeurEditorial` (photo 21/9 ou média fourni),
  `PanneauDonnees` (maille fine, valeurs mono, enfants libres), `CtaChaud`
  (secondaire WhatsApp masquée sur mobile).
- **Marqueurs de composition** : `data-composition` + `data-surface` sur chaque
  section — le test d'alternance (§6.3) lit la vraie page d'accueil.
- **Accueil en 7 actes** : C1→C4→C2→C3→C5→C6→C8, chiffres sourcés, quatre métiers
  sur leurs surfaces, mosaïque, journal vitrine (4 premiers jalons), méthode
  Mokolo mise en scène, clôture chaude ; WhatsApp assaini depuis l'environnement
  (jamais de lien forgé).
- **4 pages métier** : `/ingenierie` (méthode 4 étapes + étude de cas + livrables),
  `/ebenisterie` (`atelier-essences.tsx` local : 5 cartes 1/1, badge cuivre, fond
  warm + geste 3 temps + lit bubinga), `/plans` (catalogue C7 sans `h1` dupliqué
  + CTA adaptation), `/immobilier` (mosaïque + 6 vérifications). Fil d'Ariane
  conservé via l'emplacement `ariane` de `HeroEnTete`.
- **Mise en scène de `BeforeAfter`** : auto-démo 30→65→45 en 1,2 s, interrompue à
  la première interaction, immobile en mouvement réduit (9 tests).
- **Signature `JalonTimeline`** (§8.1) : rail tracé au scroll (`motion.line` +
  `useScroll`, figé < 768 px / réduit), 6 états à symbole + libellé (contrat
  couleur centralisé dans `lib/statuts-jalon.ts`, partagé avec la vitrine),
  dates prévue/réelle, photos `blurSettle`, responsable/durée étiquetés, écart
  prévu-réel, documents validés, dépenses `PriceTag`, actions ; cartes actives
  en `st-raised`. Données de suivi enrichies (6 jalons, 6 états). Preuve en dev
  réel : fiches portfolio en 200 avec la timeline complète.
- **Verrous** : test de références d'assets en dur (aucune image absente),
  anti-anglicismes maintenu, `app-tests` réalignés. Directive `"use client"`
  restaurée sur le composant signature (500 corrigé sur les fiches portfolio).
- Résultat : **225/225 tests**, `tsc` propre, **ESLint 0 problème**. Reste :
  crossfade plan→photo (§8.2), skeletons blueprint (§7.3), Phase 3 (polish,
  `next build`, revue comparative) — voir `plan_refonte.md`.

## 2026-09-22 — Refonte frontend : Phase 0 « Révélation » (audit apply)

Périmètre figé au préalable dans `Progression/plan_refonte.md` : la refonte ne
touche que tokens, styles et composition visuelle ; **données, routes, API,
comportements du tunnel, sanitize et sécurité restent intacts**.

- **Assets convertis** : nouveau `scripts/convert-assets.mjs` (sharp, idempotent,
  `--dry-run`) — 68 AVIF (qualité 60, textures) + 68 WebP (75 photos / 75
  textures) ; 21,88 Mo de PNG → 5,45 Mo de convertis (**−75 %**). Rapport
  commité : `Progression/rapport_conversion_assets.md`. PNG sources conservés.
- **Tokens v2** (`globals.css` + `tokens.ts`) : surfaces `fond → surface-deep →
  surface → surface-raised → elevated`, contextes `surface-warm` (bois) et
  `surface-blueprint` (données), `line-light`, `h2b`, `whatsapp-contraste`,
  palette matière `cuivre/terre/sable`. `cn.ts` reste exact après extension des
  listes (`text-h2b`, nouvelles couleurs) — 19 tests lib verts.
- **Recettes de profondeur** : `.st-card`, `.st-raised`, `.st-warm`,
  `.st-photo-fusion` — une recette par rôle, jamais cumulées (§5.2).
- **Contrat couleur** : dégradés de titre `from-steel to-blueprint` supprimés
  (hero → accent cyan plein ; stats/services/portfolio → `ink-soft` + mot en
  `ink`) ; barre de progression du tunnel en cyan plein ; FAB WhatsApp en
  `whatsapp-contraste` (AA 6,06:1, test verrouillé) avec halo profond + filet.
- **Fonds branchés** : `HeroEnTete` (composition C1, 3 tests TDD) porte
  l'AVIF prioritaire du kit sur `/ingenierie`, `/ebenisterie`, `/plans`,
  `/immobilier` ; fond photo voilé ajouté sous la maille du hero accueil.
  `FONDS_HEROS` (nouveau `data/fonds.ts`) est verrouillé par test (existence +
  extension AVIF).
- **Hygiène** : « selecting » ×2 corrigées + verrou anti-anglicismes dans
  `coherence.test.ts` (rouge → vert) ; test des fonds AVIF ajouté (185 tests).
- **Audit live des profondeurs** : nouveau `scripts/audit-surfaces.mjs`
  (Playwright) vérifiant sur la page rendue les ratios inter-surfaces (seuils
  1,02/1,08/1,12) et le contraste WhatsApp ; valeurs des surfaces resserrées
  en conséquence (tous contrôles OK).
- Résultat : **185/185 tests**, `tsc` propre, toutes les pages publiques en 200
  en dev réel. Phases 1–3 (compositions, accueil en 7 actes, timeline chantier,
  polish + `next build`) restent à livrer — voir `plan_refonte.md`.

## 2026-09-21 — Images et audit Manus (optimisation)

- **`sharp` réparé** : binaire natif absent (postinstall bloqué) + paquet
  libvips incomplet. Épinglé `@img/sharp-libvips-linux-x64@1.0.4` (version exacte
  exigée par sharp 0.33.5, la 1.3.3 ne fournit plus le `.so.42` attendu).
  Preuve runtime : 449 Ko PNG → 21 Ko AVIF via `/_next/image` (−95 %).
- **`next/image` partout** : `BeforeAfter` (fill + voile clip-path conservé,
  le rognage porte sur le parent donc l'optimiseur ne le casse pas) et
  `WatermarkPreview` (largeur fluide, ratio intrinsèque gardé) migrés.
  Zéro `<img>` restant hors mocks — **lint à 0 problème**.
- **LCP et `sizes`** : hero fiche portfolio en `priority`, grilles journal et
  essences corrigées en `100vw` sur mobile (elles servaient du `50vw`/`33vw`).
- **Prop `replace`** : `sticky-mobile-cta` transmet `undefined` au lieu de
  `false` — DOM propre même avec `next/link` simulé.
- **Bruit jsdom** : mocks `next/link` des tests de navigation avec
  `preventDefault` (le clic ferme le menu, jsdom ne tente plus de naviguer).
- **Audit npm trié, sans `--force`** : `npm audit fix` compatible appliqué
  (prisma 6.19.3 → 6.12.0, seule correction non cassante). Restent des
  montées majeures refusées à raison : next 16 (postcss, build-time, sources
  propres uniquement), vitest 5/esbuild (dev local uniquement), sharp 0.35
  (ne parse que nos assets statiques, aucun upload utilisateur ne passe
  par sharp aujourd'hui). À rejouer avec réseau en CI.
- Résultat : **179/179 tests**, `tsc` propre, **ESLint 0 problème**.

## 2026-09-21 — Correctifs relevés en dev réel (production)

- **Environnement** : `npm run dev` plantait en `Bus error` — binaire
  `@next/swc-linux-x64-gnu` corrompu (6,9 Mo, plantage au simple `require`).
  Réinstallé proprement (`SWC OK`). `postcss.config.js` passée en CommonJS
  (`module.exports`, le projet n'a pas `"type": "module"`) : Next 15 refusait
  la config ESM et toutes les pages répondaient 500.
- **APIs dynamiques Next 15** : `params` des routes `/plans/[reference]` et
  `/portfolio/[slug]` (pages + `generateMetadata`) passés en `Promise` +
  `await`. Les erreurs `sync-dynamic-apis` des logs disparaissent, tests
  `app-tests` alignés sur l'asynchrone.
- **Collision `tailwind-merge`** : `text-base` (taille) mangeait toute couleur
  de texte précédente car la couleur `base` partageait son nom — le bouton
  fantôme du hero perdait `text-ink` (invisible), les boutons orange/bleu
  perdaient leur texte sombre. Token couleur renommé `base` → `fond`
  (`globals.css`, `tokens.ts`), 435 classes migrées vers les utilitaires
  sémantiques (`text-[var(--color-ink)]` → `text-ink`), garde-fou ajouté à
  `cn.test.ts`. Vérifié dans le HTML servi : les deux CTA gardent leurs couleurs.
- **Voile inexistant** : `--color-overlay` utilisé par Dialog/Sheet mais jamais
  défini → modales sans fond. Token ajouté (`rgba(2,6,23,.72)`).
- **Liens morts** : `/blog` retiré de la nav et du footer (page P1 inexistante),
  `/ebenisterie/sur-mesure` → `/devis` (test verrouillé),
  `/legal/mentions` → `/legal/mentions-legales`. `favicon.ico` et
  `apple-touch-icon.png` générés depuis le monogramme (les 404 parasites des
  logs disparaissent).
- **Navigation retour** : nouveau `FilAriane` (TDD, 3 tests, `aria-current`,
  tronqué mobile) déployé sur les 12 pages intérieures. `StickyMobileCta`
  ajouté à `/portfolio/[slug]`, `/ebenisterie`, `/a-propos` (avec réserve basse
  `pb-32` mobile) ; le menu mobile portait déjà le CTA devis.
- Normalisation prettier sur `src/` (les commits précédents avaient contourné
  lint-staged) : diff large mais mécanique, tout reste vert.
- Résultat : **179/179 tests**, `tsc --noEmit` propre, ESLint 0 erreur,
  toutes les pages en 200 sans erreur `params` en dev réel.

## 2026-09-19 — Sprint 4 : chantier E (hero GSAP + SEO)

- `PlanDessin` (`sections/plan-dessin.tsx`) : villa isométrique en traits, ~30 tracés
  `data-trace`, entièrement visible sans JS (le scénario GSAP pose les pointillés au montage,
  jamais l'inverse). `HeroScenario` (`sections/hero-scenario.tsx`) : `import()` GSAP +
  ScrollTrigger au montage (hors chemin critique), tracé au scroll en scrub, remplissages à
  8 %, annotations révélées, parallax 3 couches (0.94/1.0/1.06 via `data-parallax-vitesse`),
  coupé sous 768 px et en mouvement réduit. Décalage des tracés repris de `durations.stagger`.
- `Hero` câblé : grille (0.94) + plan (1.0) + annotations (1.06), grille 2 colonnes sur
  desktop, empilé sur mobile. `gsap` déclaré en dépendance (import dynamique uniquement).
- SEO : `src/app/sitemap.ts` (vitrine + 4 plans + 6 projets), `src/app/robots.ts`
  (prive `/compte`, `/gestion`, `/admin`, `/api`), JSON-LD `Organization` + `WebSite` dans
  `src/app/layout.tsx`, `metadataBase` + canoniques (accueil, fiche plan) + OG fiche plan.
  Constantes factorisées dans `src/shared/constants/site.ts` (`SITE_URL` sur
  `NEXT_PUBLIC_APP_URL` avec repli prod).
- Correctifs de robustesse : `/devis` sorti des routes protégées du middleware (tunnel public,
  test dédié), `StickyMobileCta` simplifié (un seul état, durées du design system, variable
  CSS morte supprimée), tests `hero-scenario` réparés (import `afterEach`, stubs morts
  retirés, `useReducedMotion` réarmé à chaque test), `structure.test` passé sur `next/link`.
- Arbitrage documenté : fond photo du kit écarté du hero (512 Ko de PNG pour 2 fichiers,
  incompatible avec le budget LCP C1 < 120 Ko). La grille + l'isométrie portent déjà la
  signature « plan qui se dessine », sans alourdir le premier écran.
- Résultat : **175/175 tests**, `tsc --noEmit` propre, ESLint 0 erreur sur le périmètre.

## 2026-09-19 — Sprint 4 : chantier D (pages publiques)

- Données de démonstration `src/frontend/data/` : `portfolio.ts` (6 projets, slugs uniques),
  `plans.ts` (4 plans, références uniques, prix et surfaces positifs), `jalons.ts` (4 jalons avec
  images journal), `equipe.ts` (5 essences, 4 entrées journal, 3 portraits). Test de cohérence :
  chaque image référencée existe dans `public/`.
- Pages livrées : accueil (Hero → Stats → Services → Portfolio → avant/après → CTA devis),
  catalogue `/plans` (filtres par type côté client), fiche `/plans/[reference]`
  (`generateStaticParams`, `notFound()`, tableau `ui/table`, prix FCFA + ≈ EUR, StickyMobileCta),
  `/portfolio` + `/portfolio/[slug]` (galerie journal, jalons, équipe), `/ingenierie`,
  `/ebenisterie` (grille essences), `/immobilier`, `/a-propos`, `/contact` (formulaire validé :
  nom, téléphone camerounais 9 chiffres, message), `/devis` (tunnel `DevisWizard`), légal
  (mentions, CGV, confidentialité), `not-found.tsx` et `error.tsx` style blueprint.
- Tests des pages isolés dans `src/frontend/app-tests/` (jsdom) : 17 tests couvrant titres, CTA,
  régions uniques et cas 200/404 des routes dynamiques.
- Résultat : **164/164 tests**, `tsc --noEmit` propre, ESLint 0 erreur sur le périmètre.

## 2026-09-19 — Sprint 4 : chantier C (sécurité et partagé)

- `src/frontend/lib/sanitize.ts` créé en TDD : `numeroInternational`, `texteMessage`,
  `etiquetePage`. `WhatsAppFab` consomme le module et refuse de rendre un lien wa.me si
  le numéro est inexploitable ou la référence non sûre (jamais de lien forgé).
- `(public)/layout.tsx` : fallback `+237690000000` supprimé — sans
  `NEXT_PUBLIC_WHATSAPP_NUMBER`, le bouton ne rend rien plutôt qu'afficher un faux numéro.
- `site-header.tsx` : la liste de liens locale disparaît, `NAVIGATION.public`
  (`src/shared/constants/navigation.ts`) devient la source unique, filtrée sur les pages
  métier (accueil via logo, contact via CTA).
- `src/middleware.ts` : `Permissions-Policy` manquant ajouté (écart révélé par le test),
  première suite de tests unitaires du middleware (4 : redirection anonyme avec
  `callbackUrl`, session OK, page d'auth + session, en-têtes de sécurité).
- `next.config.ts` : `unsafe-eval` de la CSP conditionné au développement (React Refresh),
  supprimé en production. Sources CinetPay conservées, aucun script chargé à ce jour.
- Abandon documenté au plan : la partie « UTM » — aucun `searchParams` consommé dans tout
  `src/`, coder un assainissement sans consommateur serait du code mort.
- `tests/setup.ts` : garde `typeof window !== "undefined"` pour que la suite passe aussi
  en environnement node (tests middleware).
- Résultat : **144/144 tests** (133 + 11), `tsc --noEmit` propre, ESLint 0 erreur
  (3 warnings `<img>` assumés). Commit : chantier C complet.

## 2026-09-19 — Sprint 4 : chantier B livré puis hygiène des commentaires (A + B)

- Primitives `ui/` complètes : button, input, textarea, label, checkbox, radio-group, select,
  dialog, sheet, tabs, table, badge, card, separator, skeleton, toaster (sonner). Toutes thémées
  par tokens, `cn()` sur chaque prop `className`, focus visible, aucune classe ad hoc.
- Signature complétée : `PriceTag` (badge orange « vendu » ou prix formaté fr-FR),
  `StickyMobileCTA` (pastille fixe bas, masquée ≥ md, padding `pb-20` à prévoir sur les pages),
  `LoaderCrane` (flèche qui braque + charge qui hisse sur un même cycle 4,8 s, `role=status`,
  SVG masqué si `prefers-reduced-motion`).
- `Kicker` réaligné sur la maquette (crochets `//`, séparateur `·`), `TechDivider` avec croix
  aux extrémités, `ButtonTech` : focus cyan visible, effet magnétique desktop, variantes
  `conversion`/`primary`/`ghost` avec coins en L qui s'écartent au survol.
- Tests : `form-controls`, `overlays`, `structure` (primitives), `price-tag`, `sticky-mobile-cta`,
  `loader-crane` (signature). Total sprint : **133/133 tests verts**, `tsc --noEmit` propre,
  ESLint 0 erreur (3 warnings `<img>` assumés, cf. README).
- Hygiène sur A + B : tous les commentaires « narratifs » supprimés (`"use client"` explicatif,
  répétitions de code, références GUIDE/skill/maquette), chaque commentaire restant justifie une
  décision non visible dans le code. `toaster.tsx` : prop `limit` inexistante et `unstyled`
  mal typé retirés ; grue : transition typée `Transition` (le `as const` ne passe pas sur `ease`).

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

## 2026-09-17 — Sprint 3 `feat/sprint3-demo-integration` : démo & intégration

- Proposition reçue non appliquée : décrivait le Sprint 2 déjà livré et régressait les corrections senior (`font-display`, hex, `StickyMobileCTA`).
- `src/app/demo/sections/page.tsx` : galerie Hero + Stats + Portfolio + Services + JalonTimeline + BeforeAfter + WatermarkPreview avec photos réelles de `public/photos`, `noindex`.
- Intégration TDD : `navigation.integration.test.tsx` (hamburger → lien overlay → fermeture + body restauré, lien scopé au dialogue), `accueil.integration.test.tsx` (régions uniques, carte vers slug, hero vers `/devis`).
- Props réelles vérifiées avant usage (`Jalon.status/notes`, `BeforeAfter.beforeImage/afterImage`).
- Résultat : 88/88 tests, typecheck propre, lint 0 erreur.

## 2026-09-19 — Sprint 4 `feat/sprint4-frontend-completion` : Chantier A (design fixes)

- Branche créée depuis `develop` (`83fbb9f`, et non `ca35e2a` qui est un ancêtre déjà mergé).
- `globals.css` : bordures en `rgba` conformes au guide, `--color-ink-mute`, `--color-warn`,
  échelle typographique fluide complète (`text-display/h1/h2/h3/body/small/mono-xs`),
  `--tracking-annotation`, `--container-content`, rayons, ombres, easings, durées (dont `reveal`).
  Les utilitaires morts `.st-grain` et `.st-bg-blueprint` disparaissent : le grain 3 % du kit est
  désormais appliqué globalement par `body::after`, et `html.lenis` cède le défilement à Lenis.
- `tokens.ts` réécrit : variables CSS au lieu d'hexadécimaux, listes de noms pour la fusion de
  classes, `THEME_COLOR` pour la seule valeur hexadécimale légitime (balise meta).
- `animations.ts` réécrit sur la cascade du skill 04 (stagger 0.06, `y 16`, 0.4 s, expo,
  `once` à 25 %) et consommé par `hero`, `stats`, `portfolio`, `services` et `stat-counter` :
  un seul vocabulaire de mouvement, plus aucune courbe locale.
- **Découverte bloquante** : `tailwind-merge` 2.x ignore le thème du projet
  (`cn("text-body","text-ink")` supprimait la taille ; `shadow-card` et `shadow-none` survivaient
  en conflit). Passage à `tailwind-merge` 3 (version alignée sur Tailwind 4) et `cn.ts` déclaré
  avec les échelles de `tokens.ts` ; 12 tests verrouillent la fusion, dont un garde-fou anti-dérive.
- `BlueprintGrid` : API alignée sur le guide (`density: fine|major`) et croix de repérage
  réellement rendues (tuile du kit en masque alpha, peinte par `--color-blueprint`, 160 px).
- `MotionProvider` (`MotionConfig reducedMotion="user"`) : les animations JavaScript respectent
  enfin `prefers-reduced-motion`, ce que la règle CSS ne peut pas faire.
- Migrations mécaniques vérifiées par grep : `font-heading` → `font-display` (20), `ink-muted` →
  `ink-mute` (19), `max-w-[1200px]` → `max-w-content` (7), rayons tokenisés (21),
  annotations mono → `text-mono-xs`/`tracking-annotation`. `layout.tsx` réaligne les variables
  next/font (`--font-space-grotesk`, `--font-inter`, `--font-jetbrains-mono`).
- Code mort supprimé : `tailwind.config.ts` (inerté sous Tailwind 4) et `components.json` réaligné
  (`cssVariables: true`, `config: ""`).
- README §Déviations corrigé : il annonçait « aucune déviation » alors que deux étaient documentées.
- Résultat : **103/103 tests** (88 + 15), `tsc --noEmit` propre, lint 0 erreur (3 warnings `<img>`
  assumés).

## 2026-09-19 — Sprint 4 : Chantier B (primitives et signature complétées)

- 16 primitives dans `ui/` (button, input, textarea, label, card, badge, separator, skeleton,
  checkbox, radio-group, select, tabs, dialog, sheet, table, toaster) : toutes re-thémées sur les
  tokens (`rounded-control`, `var(--color-*)`, focus-visible cyan), radix pour les comportements,
  animations `transform/opacity` uniquement. `toaster.tsx` branché sur sonner (déjà dépendance).
- 3 composants signature manquants : `PriceTag` (prix FCFA/EUR, cartouche technique),
  `StickyMobileCTA` (barre fixe mobile, `safe-area-inset-bottom`, seuil de scroll),
  `LoaderCrane` (grue SVG : flèche qui braque, charge qui hisse, transform-only, masquée en
  mouvement réduit). `toaster` et skeleton partagés entre `ui/` et les usages signature.
- Tests TDD : `form-controls` (6), `overlays` (4), `structure` (4), `price-tag` (4),
  `sticky-mobile-cta` (2), `loader-crane` (2). Accessibilité vérifiée au test (rôles,
  `aria-hidden`, libellés).
- Résultat : **133/133 tests**, `tsc --noEmit` propre, lint 0 erreur.

## 2026-09-19 — Sprint 4 : Chantier C (sécurité et partagé)

- `NAVIGATION` (`src/shared/constants/navigation.ts`) devient la source unique des liens publics :
  `site-header` et `site-footer` la consomment, la liste locale dupliquée disparaît. Le footer
  conserve ses regroupements éditoriaux en référençant les mêmes constantes.
- `src/frontend/lib/sanitize.ts` (TDD, 6 tests) : `numeroInternational` (wa.me n'accepte que des
  chiffres), `texteMessage` (borne le pré-remplissage), `etiquetePage` (référence courte sans
  caractère de contrôle, `null` sinon). `WhatsAppFab` consomme le module et refuse de rendre un
  lien `wa.me` si le numéro ou la référence sont inexploitables — jamais de lien forgé.
- Le fallback de numéro en dur disparaît du layout public : sans
  `NEXT_PUBLIC_WHATSAPP_NUMBER`, le bouton ne rend rien plutôt qu'afficher un faux numéro.
- En-têtes de sécurité consolidés : `Permissions-Policy` posé à la fois dans `next.config.ts`
  et le middleware (écart détecté par le test), CSP sans `unsafe-eval` en production (conditionné
  au dev pour React Refresh), middleware couvert par 4 tests unitaires (redirections et en-têtes).
- Résultat : **144/144 tests**, `tsc --noEmit` propre, lint 0 erreur.
