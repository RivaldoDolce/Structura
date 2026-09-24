# Plan Refonte V2 — « Atelier vivant » (vision fusionnée)

Date : 2026-09-22. Branche : `feat/refonte-design` (on y reste).
Référentiels : audit `docs/Guide/STRUCTURA-audit-refonte-frontend.md`,
`Progression/plan_refonte.md` (V1, Phases 0–3 livrées).

## 0. Point de retour

Commit de référence avant V2 : **`88e635a`**
(`docs(progression): bilan phase 3, refonte terminée hors mesure terrain`).
Arbre propre, 239/239 tests, `next build` vert. En cas de dérive :
`git reset --hard 88e635a` (ou branche de secours depuis ce commit).
La V2 ne supprime aucun acquis V1 : elle rééquilibre et met en scène.

## 1. Thèse fusionnée

Deux diagnostics convergent. Ma vision (émotion, confiance, lumière :
le blueprint parle aux ingénieurs, pas aux clients) et celle de Manus
(le site empile des sections au lieu de raconter des scènes) donnent la
même conclusion : **la refonte V1 a enrichi le kit sans changer la logique
de composition, et le sombre est resté le fond psychologique permanent.**

La V2 ne touche donc ni aux composants ni aux tokens V1 : elle change la
**lumière, la typographie d'accent et la grammaire des actes**. Le site
devient un atelier numérique premium qui alterne rigueur et émotion.

## 2. Lumière — la règle 45 / 30 / 25

Cible de perception (ni dark intégral, ni clair plat) :

- **45 % sombre architectural** : hero, journal, données, footer, conversion.
- **30 % ivoire éditorial** : services ingénierie, méthode, catalogue, stats,
  confiance. Ivoire papier (`paper`), jamais blanc pur.
- **25 % chaud matière** : ébénisterie, pièces signature, clôtures humaines.

Règle : le changement de lumière se perçoit au scroll sans lire un titre.
Deux actes voisins ne partagent jamais la même lumière.

## 3. Palette V2 (ajouts, rien n'est retiré)

```css
--color-paper: #f1ece2; /* ivoire papier, fond clair */
--color-paper-soft: #e3ddd0; /* ivoire second, cartes claires */
--color-encre: #1a1512; /* texte sur ivoire */
--color-encre-soft: #575046; /* texte secondaire sur ivoire */
--color-cuivre: #b0703c; /* badges, filets chauds */
```

Contrats : `encre` sur `paper` ≥ 12:1 ; `encre-soft` sur `paper` ≥ 7:1 ;
`steel-encre` sur `paper` ≥ 7:1 (accent de donnée des actes clairs, durci car
le `steel-deep` historique plafonne à 5,69:1 — réservé aux aplats sombres) ;
`paper` sur sombre ≥ 13:1 ;
`cuivre` réservé aux filets/badges (jamais au texte courant) ;
le cyan reste données/états, l'orange reste actions. Tokens exposés dans
`tokens.ts` (listes `cn.ts` étendues, tests du garde-fou mis à jour).

## 4. Typographie — quatrième voix, usage parcimonieux

**Fraunces italique** (Google Fonts, `next/font`, variable
`--font-editorial`, utilitaire `font-editorial`) pour : un mot du hero,
les noms d'essences, une citation, le message final. Tout le reste reste
Space Grotesk / Inter / JetBrains Mono. Exemple : « L'ingénierie qui
construit en *confiance* » — *confiance* en serif italique ivoire.

## 5. Scènes, pas sections (accueil d'abord)

Les quatre `BandeauAlterne` de l'accueil deviennent quatre scènes à
géométrie propre, dans `sections/` (TDD, `data-scene` + `data-lumiere`) :

| Scène | Lumière | Géométrie |
|---|---|---|
| `SceneIngenierie` | ivoire technique | éditorial vertical, photo chantier débordante, mini-plan cyan, CTA encre |
| `SceneEbenisterie` | warm atelier | image bois verticale 4/5, nom d'essence en serif, badge cuivre, dérive au scroll |
| `ScenePlans` | blueprint pâle | cartes sur trois niveaux, tableau, filtres (existants, conservés) |
| `SceneImmobilier` | sombre immersif | photo pleine largeur, panneau translucide (`backdrop-blur`, métadonnées + CTA uniquement) |

Rythme d'accueil V2 : hero sombre → stats ivoire → 4 scènes (ivoire →
warm → blueprint pâle → sombre) → journal sombre → méthode ivoire →
clôture warm. Test d'alternance étendu aux scènes et lumières.

## 6. Mouvement par scène (chorégraphie V2)

- Hero : titre par masque (mot serif en dernier) → plan → photo fond
  quasi immobile → CTA.
- Ingénierie : lignes du mini-plan qui s'étirent (`drawLine`), photo
  révélée par découpe (`scaleReveal`), données une à une.
- Ébénisterie : image qui sort d'un cadre étroit, dérive horizontale
  légère au scroll (desktop), titre en retard lent.
- Plans : réorganisation animée de la grille (`layout`), cartes qui
  sortent de l'axe au survol (`scale(1.03)`, +8 px).
- Immobilier : zoom photo très lent au scroll, panneau qui glisse.
- Journal : inchangé (rail + `blurSettle` déjà livrés).
- **Transition de route** (`app/template.tsx`, nouveau) : fondu + voile
  120–180 ms + entrée 8–12 px, focus préservé. Quasi imperceptible.
- Survols : image `scale(1.03)`, panneau +8 px, icône qui glisse.
  Interdits maintenus (§7.4) : aucune rotation, aucun halo permanent,
  aucune animation infinie hors sweep skeleton.

Toutes les narratives sont coupées < 768 px et en mouvement réduit
(tests verrouillés, comme en V1).

## 7. Frontière de non-régression (inchangée depuis V1)

Données, routes, API, tunnel, sanitize, sécurité, comportements :
intacts. `BandeauAlterne` conservé (pages métier l'utilisent encore
jusqu'à la Phase 2 V2). Aucune route créée ni renommée.

## 8. Phases V2

- **V2-1 (accueil)** : tokens lumière + Fraunces, 4 scènes TDD, hero mot
  serif, transition de route, test d'alternance étendu, captures.
- **V2-2 (pages)** : ingénierie, ébénisterie, plans, immobilier, portfolio,
  devis recomposés avec les scènes (contenu existant, nouvelle lumière).
- **V2-3 (polish)** : AA sur ivoire/warm, clavier, reduced-motion émulé,
  `next build`, budgets, revue comparative V1→V2.

## 9. Acceptation V2

Clair/warm perceptibles dès le premier scroll sans lire ; aucune scène
ne ressemble à sa voisine ; serif limitée aux 5 usages ; photo hero
prioritaire ; 239+ tests verts et croissants ; `tsc` + lint propres ;
`next build` vert ; revue visuelle ≥ 8/10.

## 10. Journal

### V2-1 — Accueil : en cours

Livré : tokens ivoire (`paper`, `paper-soft`, `encre`, `encre-soft`), quatrième
voix Fraunces (`--font-editorial`), quatre scènes TDD (`SceneIngenierie`,
`SceneEbenisterie`, `ScenePlans`, `SceneImmobilier`), mot serif du hero,
transition de route (`app/template.tsx`), règle d'alternance étendue aux scènes
(10 actes, 251 tests verts). Socle lumière extrait (`lib/lumieres.ts` +
`__tests__/lumieres.test.ts`), recettes `.st-ivoire`/`.st-pale`/`.st-lisiere`/
`.st-lien`, compositions claires branchées (`StatistiquesSourcees`,
`MosaiqueAsymetrique`, `PleinLargeurEditorial`, `BandeauAlterne`,
`PanneauDonnees`, `StatCounter`, `Kicker`, `BlueprintGrid`, `WatermarkPreview`,
`PriceTag`, filtres catalogue), `THEME_COLOR` réaligné sur `--color-fond`
(`#060a12`).

### V2-1c — Socle « lumière » : en cours dans ce chantier (TDD d'abord)

Le rééquilibre ne tient pas si chaque composition réinvente ses classes claires.
Un vocabulaire unique est donc extrait avant toute recomposition de page :
livré partiellement dans l'arbre (non commité), à verrouiller par les tests
avant d'étendre les animations premium.

- `lib/lumieres.ts` (déjà présent, non commité) : type `Lumiere` (`sombre`,
  `ivoire`, `pale`, `warm`), tons complets par lumière (fond, titre, texte,
  accent, filet, lien, puce, cartouche, bouton) et gardes pures (`estClaire`,
  `alternanceRespectee`). Une seule source pour toutes les compositions,
  testée par `lib/__tests__/lumieres.test.ts`.
- `globals.css` (déjà présent, non commité) : filets clairs (`line-encre`,
  `line-encre-strong`), vert profond `ok-deep` (AA sur ivoire), recettes
  `.st-ivoire`/`.st-pale` (fusion photo vers la surface hôte claire),
  `.st-lisiere` (bords estompés vers la base sombre), `.st-lien`
  (soulignement scaleX 200 ms).
- Contrats AA documentés et vérifiés : `encre`/`paper` ≥ 12:1,
  `encre-soft`/`paper` ≥ 7:1, `steel-encre`/`paper` ≥ 7:1 (durci car le
  `steel-deep` historique plafonne à 5,69:1 — réservé aux aplats sombres),
  `cuivre` réservé aux filets et badges.
- Écarts relevés en relecture, corrigés en TDD : `plein-largeur-editorial.test.tsx`
  attendait encore `text-steel-deep` là où la légende claire utilise
  `text-steel-encre` ; `Kicker`, `BlueprintGrid`, `WatermarkPreview` et les
  filtres du catalogue utilisaient `steel-deep` sur papier (≤ 5,7:1) —
  basculés sur `steel-encre` (7,88:1 mesuré, script `contrastes-v2.mjs` vert).
  Token `safety` historique restauré dans `globals.css` (supprimé par mégarde :
  `bg-safety` du bouton conversion ne résolvait plus).

### V2-1d — Animations premium équilibrées : en cours (TDD d'abord)

Le système de couleur étant posé, le mouvement premium s'étend sans changer
la grammaire des actes — uniquement `transform`/`opacity`, coupé < 768 px et
en mouvement réduit, jamais d'animation infinie hors sweep skeleton :

- Survols unifiés (livré, testé) : carte `-translate-y-2` + halo `shadow-glow`
  + image `scale(1.03/1.04)`, le tout en `duration-500 ease-out-expo` —
  `ProjectCard` (test dédié), cartes catalogue `ScenePlans`, cartes essences
  `AtelierEssences`. `ProjectCard` conserve son panneau technique glissant.
- Filet de navigation en tête de page (`template.tsx`, déjà présent non
  commité) + liens à soulignement progressif (`.st-lien`, déjà consommé par
  `BandeauAlterne`).
- Révélations : `scaleReveal` / `drawLine` / `blurSettle` (déjà en
  `animations.ts`), cascade unique du skill 04, compteurs `once: true`.
- Vérifications V2-1d (fait sur ce chantier) : 268/268 tests, `next build`
  vert, `contrastes-v2.mjs` vert (5 couples AA + rappel `steel-deep`
  informatif). Reste : `tsc`, `eslint`, captures 390/1440, revue ≥ 8/10,
  puis V2-2 (rythme des pages métier) et V2-3.

### V2-2 — Pages métier : à faire dans ce chantier

- Compositions dotées d'une variante de lumière : `StatistiquesSourcees`
  (pâle), `MosaiqueAsymetrique` (ivoire) et `ProjectCard` (ton clair),
  `PleinLargeurEditorial` (warm/pâle), `BandeauAlterne` (surfaces ivoire/pâle),
  `PanneauDonnees` (pâle), `StatCounter` (ton clair).
- Accueil : rythme V2 appliqué — hero sombre → chiffres pâle → scènes
  ivoire/warm/pâle/sombre → portfolio ivoire → journal sombre → méthode pâle →
  clôture warm (aucun acte voisin ne partage sa lumière).
- Pages métier : mêmes lumières, contenus existants inchangés (données, routes,
  API et tunnel intacts).
- Mouvement : filet de navigation en tête de page (`template.tsx`), liens à
  soulignement progressif, survols déjà cadrés (§6, aucune animation infinie).
- Vérifications : tests + `tsc` + `eslint` + `next build` verts, captures
  390/1440, contrastes recalculés sur les tokens réels.
