# Plan Refonte Frontend — STRUCTURA

Date : 2026-09-22. Branche : `feat/sprint4-frontend-completion`.
Référentiel unique : `docs/Guide/STRUCTURA-audit-refonte-frontend.md` (ci-après « l'audit »).

## 0. Thèse de la refonte

La refonte ne jette rien et ne régénère pas d'assets : elle **révèle ce qui existe déjà**.
Le dépôt a un socle exemplaire (179 tests verts, tokens CSS-first, mouvement unique,
accessibilité réelle) habillé par seulement trois niveaux de surface, un kit de fonds
premium de 7,3 Mo non branché, une composition unique répétée partout et un cyan dilué.
La transformation est donc **incrémentale, par phases livrables et réversibles**,
sans jamais casser tests, routes, données ni API.

## 1. Périmètre — la frontière avant tout

### 1.1 Ce qui change (visuel et mouvement uniquement)

- **Tokens de surface et de contexte** (`globals.css`, `tokens.ts`) : passage de 3 à
  5 surfaces (`surface-deep`, `surface`, `surface-raised`, `surface-warm`,
  `surface-blueprint`), 2 contextes (`fond-immerge`, `fond-focus`), plus `line-light`
  et `h2b`. Migration des occurrences `bg-surface` / `bg-elevated` selon la table
  d'attribution de l'audit (§5.1).
- **Recettes de profondeur** : utilitaires uniques `.st-card`, `.st-raised`,
  `.st-warm`, `.st-photo-fusion` dans `globals.css` — jamais cumulés.
- **Couleur — contrat d'usage** (§5.3) : suppression des dégradés de titre
  `from-steel to-blueprint` (5 fichiers), rééquilibrage cyan/orange/chaleur,
  correctif de contraste WhatsApp (`#1DA851` sur texte sombre).
- **Typographie** (§5.4) : display du hero `clamp(3rem, 7vw + 1rem, 6rem)`, échelle
  intermédiaire `--text-h2b`, mono plafonné aux valeurs et annotations.
- **Fonds du kit branchés** (§4.1) : hero accueil + en-têtes des pages métier,
  en AVIF/WebP convertis, `fetchpriority` maîtrisé, LCP respecté.
- **Direction photographique** (§5.5) : classes de traitement (voile chaud ébénisterie,
  assombrissement héros), fusion dégradée vers la surface hôte, ratios variés
  (`21/9`, `4/5`, `1/1`).
- **Compositions C1–C8** (§6.3) : huit morphologies de section nommées, typées et
  testées, en `sections/`. Accueil en 7 actes, en-têtes métier recomposés,
  tunnel `/devis` remis en scène (structure inchangée).
- **Mouvement** (§7) : hiérarchie à trois vitesses (fonctionnelle, exploratoire,
  narrative), extensions de variants (`scaleReveal`, `drawLine`, `blurSettle`),
  auto-démo `BeforeAfter` (30→65→45 %), rail de timeline tracé au scroll.
- **Signature principale** (§8.1) : `TimelineChantier` vivante (mobile-first, 6 états,
  photos `blurSettle`, documents, dépenses, actions), version vitrine sur l'accueil.
- **Hygiène** (§9.3) : coquilles « selecting » corrigées, test anti-anglicismes,
  chiffres de stats sourcés, grain en `mix-blend-mode: overlay`, README documenté
  avec la table d'attribution des surfaces.

### 1.2 Ce qui ne change pas — la frontière de non-régression

- **Données** : `src/frontend/data/*` et leurs tests de cohérence restent la source
  unique (seuls contenus *éditoriaux* des pages métier complétés, hors schémas).
- **Routes** : aucune route créée, supprimée ou renommée ; `sitemap.ts` et `robots.ts`
  intacts.
- **API et backend** : aucun import `backend/`, aucune route `app/api`, aucun schéma
  Prisma modifié (le skill 01 reste la loi).
- **Comportements** : logique du `DevisWizard` (localStorage, validation, référence),
  `sanitize.ts` et ses gardes, middleware et en-têtes de sécurité, `NAVIGATION`,
  seuils du `StickyMobileCTA`, rôles ARIA du `BeforeAfter`.
- **Architecture** : séparation `ui/` / `signature/` / `sections/` du skill 01,
  `globals.css` source unique des tokens, vocabulaire de mouvement unique
  (`animations.ts`), GSAP uniquement en `import()` dynamique.
- **Accessibilité** : `prefers-reduced-motion` aux deux niveaux, focus visible cyan,
  focus trap, alternances de texte ; toute nouvelle animation est coupée sous
  768 px et en mouvement réduit.

### 1.3 Frontière technique explicite

| Domaine | Statut |
|---|---|
| `globals.css` | étendu (tokens v2, recettes de profondeur) — jamais remplacé |
| `tokens.ts` | étendu (exposition des nouveaux `var(--*)`) |
| `animations.ts` | étendu (3 variants dérivés, zéro courbe locale) |
| `cn.ts` | inchangé (échelles déjà déclarées ; extension testée si besoin) |
| Données, routes, API | intacts |
| Assets | PNG sources conservés, conversions AVIF/WebP commitées |

## 2. Phases — chacune livrable, testée, réversible

### Phase 0 — Révélation (impact immédiat, risque nul)

1. `scripts/convert-assets.mjs` (sharp, déjà dépendance) : textures → AVIF 60 + WebP 75,
   photos → WebP 78, rapport de réduction commité dans `Progression/`.
2. Correction des coquilles « selecting » (×2) + test anti-anglicismes dans
   `coherence.test.ts`.
3. Tokens v2 : 5 surfaces + 2 contextes + `line-light` + `h2b` + migration des
   occurrences par table d'attribution.
4. Recettes `.st-card` / `.st-raised` / `.st-warm` + suppression du dégradé de titre
   (5 fichiers).
5. Fonds du kit branchés : hero accueil + en-têtes métier.

### Phase 1 — Compositions

1. Composants C1–C8 dans `sections/`, typés et testés (TDD).
2. Accueil en 7 actes (§6.1) — dont la vitrine du journal en scroll-snap.
3. Refonte éditoriale des 4 pages métier (§6.2).
4. Contraste WhatsApp corrigé + FAB encapsulé (§5.3).
5. Mise en scène de `BeforeAfter` (auto-démo).

### Phase 2 — Signature

1. `TimelineChantier` complète (§8.1) : rail tracé au scroll, 6 états, photos
   `blurSettle`, documents, dépenses, actions.
2. Vitrine sur l'accueil + composant autonome prêt pour l'espace client.
3. Crossfade plan → photo sur desktop (§8.2).
4. Skeletons blueprint sur catalogue + journal (§7.3).

### Phase 3 — Polish et validation

1. Fiche plan en « dossier projet » (C7 enrichi).
2. Contrastes AA sur les nouvelles surfaces, navigation clavier,
   `prefers-reduced-motion` émulé sur les nouvelles chorégraphies.
3. `next build` validé, budgets LCP/CLS/INP contrôlés (§9.2).
4. Revue comparative avant/après documentée dans `Progression/`.

## 3. Critères d'acceptation (les 12 points de l'audit, §11)

La refonte est terminée quand : aucune page ne porte deux sections adjacentes de même
morphologie/surface/ratio ; le hero affiche son fond AVIF sous 2,5 s LCP ; les cinq
surfaces se distinguent à l'œil nu ; l'orange n'habille que les actions ; le cyan a
disparu des titres et bordures décoratives ; l'ébénisterie se reconnaît à sa matière ;
la timeline fonctionne à une main ; les animations narratives sont coupées sous
reduced-motion et 768 px ; aucun anglicisme parasite ; les chiffres sont sourcés ;
tous les tests sont verts et croissants ; la revue visuelle dépasse 7,5/10.

## 4. Journal d'avancement

### Phase 0 — Révélation : livrée (tests 184 verts)

- **Assets** : `scripts/convert-assets.mjs` opérationnel (idempotent, `--dry-run`
  disponible) ; 68 AVIF + 68 WebP générés depuis les PNG sources ; 21,88 Mo → 5,45 Mo
  de convertis (**−75 %**), rapport complet dans `Progression/rapport_conversion_assets.md`.
- **Coquilles** : « selecting » ×2 corrigées (page ébénisterie, portfolio) ;
  verrou anti-anglicismes ajouté à `coherence.test.ts` (rouge → vert, TDD).
- **Tokens v2** : 5 surfaces + 2 contextes + `line-light` + `h2b` + `whatsapp-contraste`
  + palette matière (cuivre/terre/sable) dans `globals.css` et `tokens.ts`.
- **Recettes de profondeur** : `.st-card`, `.st-raised`, `.st-warm`, `.st-photo-fusion`
  ; appliquées aux cartes d'essences. Dégradés de titre supprimés dans les 5 fichiers
  concernés (hero accent cyan plein, titres secondaires en `ink-soft`/`ink`).
- **Audit live** : `scripts/audit-surfaces.mjs` (Playwright) — ratios de profondeur
  inter-surfaces et contraste WhatsApp vérifiés sur la page rendue ; valeurs des
  surfaces resserrées en conséquence (tous contrôles OK, WhatsApp 6,06:1).
- **Fonds branchés** : `HeroEnTete` (C1) créé + testé ; en-têtes des pages
  `/ingenierie`, `/ebenisterie`, `/plans`, `/immobilier` recomposés sur fond AVIF
  prioritaire ; fond photo ajouté sous la maille du hero accueil (LCP AVIF).
- **WhatsApp FAB** : fond `whatsapp-contraste`, halo profond + filet de lumière,
  test de contraste verrouillé.

Reste à faire : Phase 3 (polish, `next build`, revue comparative).

### Phase 1 — Compositions : livrée (tests 217 verts)

- **Mouvement** : test `animations.test.ts` + `scaleReveal` / `drawLine` /
  `blurSettle` dérivés des tokens (zéro courbe locale).
- **Compositions C2–C8** créées + testées (TDD) en `sections/` : `BandeauAlterne`,
  `MosaiqueAsymetrique` (réemploi de `ProjectCard`, ratio + `imageSizes` + `imageAlt`
  ajoutés), `StatistiquesSourcees` (sources en Inter), `TimelineHorizontale`
  (scroll-snap, statuts écrits), `PleinLargeurEditorial` (photo 21/9 ou média
  fourni via union discriminée), `PanneauDonnees` (maille fine), `CtaChaud`
  (double entrée devis/WhatsApp, secondaire masquée sur mobile).
- **Marqueurs de composition** `data-composition` + `data-surface` sur chaque
  section : test de la règle d'alternance sur la vraie page d'accueil.
- **Accueil en 7 actes** (C1→C4→C2→C3→C5→C6→C8) : chiffres sourcés, quatre
  métiers sur leurs surfaces, mosaïque asymétrique, journal vitrine (4 premiers
  jalons réels), méthode Mokolo mise en scène, clôture chaude avec WhatsApp
  assaini depuis l'environnement.
- **4 pages métier recomposées** : `/ingenierie` (méthode 4 étapes + étude de
  cas + livrables + CTA), `/ebenisterie` (atelier 5 essences 1/1 badge cuivre +
  geste 3 temps + lit bubinga + CTA), `/plans` (catalogue C7 + CTA adaptation),
  `/immobilier` (mosaïque de biens + 6 vérifications + CTA). Fil d'Ariane
  conservé via l'emplacement `ariane` de `HeroEnTete` ; catalogue sans titre
  dupliqué (`h2` au lieu du second `h1`).
- **Mise en scène de `BeforeAfter`** : auto-démo 30→65→45 en 1,2 s, interruption
  à la première interaction, immobile en mouvement réduit.
- **Verrous** : test de références d'assets (aucune image absente tolérée),
  tests `app-tests` réalignés sur les nouvelles compositions.

### Phase 2 — Signature : livrée (tests 225 verts)

- **Vocabulaire partagé** `lib/statuts-jalon.ts` (6 états, libellés, contrat
  couleur, symbole non coloré) — `JalonTimeline` et `TimelineHorizontale` le
  consomment, zéro duplication.
- **`JalonTimeline` devenue la signature** : rail vertical tracé au scroll
  (`motion.line` + `useScroll`, figé sous 768 px / réduit), 6 états à symbole,
  dates prévue/réelle, photos `blurSettle`, responsable/durée étiquetés,
  écart prévu-réel, documents validés/en attente, dépenses `PriceTag`, actions.
  Surface active = `st-raised`, les autres `st-card`.
- **Données de suivi enrichies** : `JalonChantier` porte dates réelles, écarts,
  dépenses, notes, documents ; 6 jalons couvrant les 6 états (finit par le
  second œuvre à venir ; charpente bloquée assumée).
- **Preuve en production** : fiches `/portfolio/[slug]` affichent la timeline
  complète (6 `data-statut` vérifiés en dev réel, 200) ; vitrine d'accueil sur
  les 4 premiers jalons.
- Reste Phase 2 : crossfade plan→photo (§8.2), skeletons blueprint (§7.3).