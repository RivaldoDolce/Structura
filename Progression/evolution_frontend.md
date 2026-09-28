# Évolution Frontend — STRUCTURA

## 2026-09-28 — V3b : barre, acte 04, acte 05 et comparateur de l'acte 09

Quatre défauts de relecture traités en une passe, avec le lot photographique
`04-78` → `04-81` (Vague 4) optimisé dans la foulée : maîtres PNG sRGB
(`compressionLevel: 9`, aucun sur-échantillonnage) puis dérivés `.webp` par
`npm run assets` — gain de 71 % à 81 % par fichier.

- **Barre de navigation** : le conteneur est désormais borné et rempli
  (`w-full max-w-[112rem]`) au lieu de s'étirer sur toute la fenêtre large — le
  verrou de marque dérive de l'aplomb du contenu et le titre n'est plus à
  l'extrême gauche du cadre perçu. Grille `auto 1fr auto` conservée : c'est elle
  qui garantit verrou à gauche et CTA à l'indroite du *contenu*, là où
  `justify-between` ne ferait que répartir l'espace restant. Le CTA repasse en
  `md:block` (le test d'accessibilité le vérifiait déjà) et le hamburger gagne
  `justify-self-end` : en dessous de `md`, il était seul dans la colonne
  centrale et se collait à gauche.
- **Acte 04 (ébénisterie)** — « le texte s'entremelle à l'image » : les marges
  négatives de la colonne éditoriale la faisaient entrer sur la photo sans
  aucune surface de protection. Le texte est désormais posé sur un panneau
  opaque (`bg-surface-deep`, filet `border-line`, `p-8 lg:p-10`) qui le sépare
  du visuel — le chevauchement devient une grammaire assumée au lieu d'un
  défaut. Le visuel passe de la macro d'essence (`04-05`) à la photo d'atelier
  (`04-78_atelier-ebenisterie-faconnage`) : une macro de bois ne montre ni la
  main ni la machine, donc ni le métier. La même photo alimente l'étape 02
  (« Fabrication ») de la page ébénisterie, qui perdait son équipe au profit
  d'un groupe d'atelier à la mise en scène datée.
- **Acte 05 (plans)** — la carte ne montre plus un tracé mais **la façade du
  modèle livré** (`04-79` villa, `04-80` duplex, `04-81` immeuble). Le tracé
  isométrique reste en fond, à 20 % d'opacité, et se retire au survol : on part
  du réel pour ouvrir la lecture technique. `PlanScene` exige désormais
  `imageUrl` + `imageAlt` (typage, pas convention : impossible d'oublier
  l'alternative texte). Les mêmes images remplacent les couvertures dans les
  sous-menus — catalogue `/plans` et fiche `/plans/[reference]` — via la donnée
  `PLANS[].imageUrl`, sans duplication de source.
- **Donnée `altPhoto`** : la description d'une photo n'est plus un `alt` en
  dur dans le composant. `WatermarkPreview` accepte `imageAlt`, parce que son
  libellé par défaut — « Aperçu du plan » — devient un mensonge dès que la
  vignette est une façade. L'Open Graph de la fiche plan en profite aussi.
- **Acte 09** : les trois duos statiques (`MosaiqueAvantApres`) sont retirés.
  Ils répetaient la matière du journal (acte 08) et concurrençaient le seul
  geste que la bande doit enseigner ; montrer trois comparaisons fixes à côté
  d'une quatrième interactive apprend au visiteur qu'il n'a rien à faire. Le
  composant, devenu orphelin, est supprimé (pas de code mort). La section ne
  porte plus que le comparateur Mokolo, dont la logique est corrigée :
  - le repos de la démonstration automatique revient à **50 %** et non 45 % —
    à 45 %, le visiteur lit une valeur arbitraire comme l'état « correcte » ;
  - la poignée expose `aria-valuetext` (« 30 % de l'état après, 70 % de l'état
    avant ») : `aria-valuenow` seul est un nombre nu, inintelligible à l'oreille.
- TDD : 8 vérifications écrites avant implémentation (barre épinglée, panneau
  de l'acte 04, photo d'atelier, façades de l'acte 05, absence de duos statiques,
  repos à 50 %, poignée sur la coupe, proportion annoncée).
- Résultat : **333/333 tests**, `tsc --noEmit` propre, **ESLint 0 erreur**
  (6 avertissements pré-existants des scripts d'audit), `next build` 28/28.

## 2026-09-28 — V3 : intégration des lots d'images premium (Vague 1 à 3)

Catalogue photographique partiel (29 fichiers, 1376 à 1672 px) réceptionné et branché à
`Progression/plan_integration_images_v3.md` : maîtres PNG sRGB (≈ 500 Ko, < 3 Mo) nommés
`04-30` → `04-77`, ratios normalisés au guide (exact 16:9 / 16:10 / 4:3, portraits rognés sur la
saillance), dérivés `.webp` regénérés via le script `npm run assets` (ajouté : le guide le
référençait, il n'existait pas).

- Hero d'accueil : `fond_accueil.png` (choix utilisateur) devient `04-30_hero-accueil-chantier-matin-dore`,
  teinte suffisamment sombre pour conserver la recette `.st-voile-photo` (contraste mesuré :
  titre 13:1 à 18:1, cyan du plan 7,9:1 — commentaires `globals.css` et `hero.tsx` resynchronisés).
- Journal + jalons + étude préalable : 09 clichés du feuilleton (`04-38` → `04-43`) ; les jalons
  élévation et finitions, sans photo auparavant, sont enfin illustrés — la vitrine d'accueil
  affiche 4 jalons distincts au lieu de 3.
- Immobilier : jour clair et bornage visible (`04-46` → `04-49`) sur portfolio, plans et acte
  immobilier de l'accueil.
- Ébénisterie : conception (sélection des matières, `04-72`), pièce signature lit bubinga (`04-59`),
  table de réunion (`04-57`) ; contact : vignette bureau (`04-71`) ; à-propos : bandeau matières
  locales à 3 clichés (`04-73` → `04-75`) ; fiche plan : galerie « vues du modèle » rendue
  (`04-76`, `04-77`) au lieu d'être donnée morte.
- Écarts documentés au guide : `IMG-CH-03` fracture le journal (pas le portfolio, resté sur `04-01`
  pour éviter le double affichage) ; `IMG-HERO-01` alimente l'étude de cas d'ingénierie (`04-31`)
  au lieu d'être redondant avec le hero ; réemplois restants limités aux couples assumés
  (bien ↔ plan, jalon ↔ journal).
- Orphelins retirés : 18 maîtres remplacés et leurs dérivés (récupérables via git) ; lots
  `Vague 1|2|3` supprimés après optimisation.
- Résultat : **324/324 tests** (TDD : 4 vérifications ajoutées avant implémentation — galerie
  rendue, bandeau matières, vignette contact — + adaptation des fixtures aux nouveaux chemins),
  `tsc --noEmit` propre, **ESLint 0 erreur** (avertissements pré-existants du script d'audit).

## 2026-09-28 — Refonte accueil : actes 04, 05 et 09

- Acte 09 « La méthode » (`Le chantier, étape par étape`) : le comparateur unique devenait
  pauvre face aux 6 clichés du journal — `PleinLargeurEditorial` *média* porte désormais une
  `MosaiqueAvantApres` (`signature/`, 3 duos fouilles → élévation `04-38`/`04-42`, ferraillage →
  coulage `04-39`/`04-40`, charpente → finitions `04-41`/`04-43`) puis le comparateur interactif
  Mokolo (`04-63`/`04-64`). La paire `04-64` disparaît de `PROJETS_PORTFOLIO` au profit d'une
  entrée « Coulage de dalle » (`renovation-mokolo`) : le `BeforeAfter` retrouve le même cadrage
  des deux côtés.
- Acte 04 (ébénisterie) : la macro est cadrée `50% 20%` dans un carré contenu (plus de
  `max-h` fixe compressé), la colonne texte a une base intrinsèque — `SceneEbenisterie`
  accepte désormais une `position` optionnelle.
- Acte 05 (plans) : la scène reste sans photographie par conception (tracé unique, garde-fou
  conservé) mais annonce la preuve — chaque carte affiche « N vues du modèle livré » quand la
  fiche plan en possède (`vuesLivrees`, mono encre).
- TDD : `MosaiqueAvantApres` (ordre avant → après, légendes), garde-fou « jamais de photo »
  de `ScenePlans` conservé + annonce des vues, accueil (3 paires + comparateur), adaptation
  des fixtures de la page démo (données réelles, plus de projets fictifs).
- Résultat : **327/327 tests**, `tsc --noEmit` propre, **ESLint 0 erreur** (avertissements
  pré-existants du script d'audit).

## 2026-09-27 — V3 : Lot 3 ingénierie (quatre scènes différenciées) livré

`/ingenierie` empilait quatre fois le même `BandeauAlterne` 50/50 — la répétition
mécanique que la V3 §7.7 interdit. Quatre scènes aux grammaires distinctes :

- 01 `SceneEtudePrealable` (ivoire, 40/60, image débordante, tableau de preuves).
- 02 `SceneNoteCalcul` (pâle, média dominant, panneau de cotes en chevauchement).
- 03 `SceneFerraillage` (sombre, plan technique `PlanFerraillage` pleine largeur).
- 04 `SceneSuiviReception` (warm, photo plein cadre, panneau de suivi léger).

Chaque scène porte `data-composition` et `data-ratio` : le test de composition de
la page vérifie l'ordre des huit actes et l'absence de collision de lumières
(ivoire → pâle → sombre → warm → sombre → pâle → warm). Les tests `metier`
obsolètes (sélecteur `data-composition` seul, titre de méthode supprimé) ont été
alignés sur les nouveaux marqueurs.

## 2026-09-26 — V3 : Lot 2 (coutures et transitions entre actes) livré

Le lot a commencé par une vérification de la composition réelle de la page, et non
par une lecture du code. C'est cette mesure qui a révélé les trois défauts ci-dessous :
aucun n'était visible dans l'arborescence des composants.

### Coutures : la tache noire au milieu du papier

`.st-lisiere` fond systématiquement vers `--color-fond`. Entre deux bandes **claires**
jointives — accueil (acte 02 `pale` → acte 03 `ivoire`), ébénisterie (bandeau ivoire
→ pièce `pale`), catalogue de plans — cela dessinait une bande noire en plein milieu
d'une zone papier. Le dégradé n'a de sens qu'à l'entrée et à la sortie d'une zone
sombre ; entre deux papiers, il triche sur la continuité et crée au contraire une rupture.

La couture clair/clair est désormais un filet d'un pixel en `line-encre`, la lisière
du dessus renonçant à son fondu pour ne poser qu'un trait. La règle est vérifiée par
un test de CSS, seule façon d'attraper un comportement qui ne se manifeste qu'en assemblage.

### Recyclage photographique : six occurrences, quatre causes

Le test d'intégration vérifiait déjà l'absence de doublons, mais la règle avait été
affaiblie pour laisser passer ces cas. L'audit en a révélé les causes distinctes :

- l'acte 03 (ingénierie) et le fondu de l'acte 08 (journal) réutilisaient la photo
  du hero — un même cliché de chantier paraissait trois fois ;
- le quatrième jalon du journal n'a pas de photo et empruntait celle du premier,
  affichant deux fois la même image sous deux dates : le critère de sélection est
  désormais la présence d'un cliché, pas le rang ;
- le catalogue de plans ilustrait des **modèles à vendre** par les photos des
  immeubles déjà vendus, la même preuve revenant trois fois sur la page.

### Décision de composition : un plan se montre par son tracé

Le catalogue présentait chaque modèle par la photo d'un bâti déjà construit — ce
qui laisse croire que le modèle existe. Il est désormais présenté par
`IllustrationPlan`, dont le volume est calculé à partir du type. Cette décision a
donné un second bénéfice : le duplex, jusqu'ici indiscernable d'une villa, se
distingue par sa forme (deux volumes en cascade) et non par un étage de plus.

`typeBatiment` a été resserré de `string` à `TypeBatiment` à la source : sans cela,
un modèle mal typé retombait silencieusement sur la villa, et deux modèles distincts
se confondraient à l'écran. Le contrat du type est ici la garantie du tracé.

### Vérifications

292/292 tests Vitest passants (62 fichiers), `tsc --noEmit` propre, `next build`
réussi (103 kB de First Load JS partagé).

## 2026-09-26 — V3 : Lot 0 (garde-fous TDD) et Lot 1 (visage du site) livrés

Démarche TDD appliquée : les règles structurelles ont été écrites avant leur correction,
et chaque composant touché a été couvert par un test de rendu et d'intention.

### Lot 0 — Garde-fous transverses

- `app-tests/regles-v3.test.ts` : audit statique des sources de production. Ces règles
  sont invisibles à l'écran — un composant peut défaire une décision de finition sans
  qu'aucune casse — d'où un test de code source plutôt qu'un test de rendu.
  - `transition-all` interdit : chaque transition nomme ses propriétés.
  - Durées littérales (`duration-300`) interdites : toute durée sort d'un token.
  - Échelle CSS ⇄ JS (`--transition-duration-*` / `durations`) maintenue synchronisée,
    avec un garde-fou du garde-fou : si l'extraction ne trouve plus rien, c'est la règle
    qui est cassée, pas le code.
  - Hiérarchie des cinq crans de surface préservée.
- Découverte technique : les tokens `--dur-*` (namespace maison) ne produisaient aucun
  utilitaire. Bascule sur le namespace officiel `--transition-duration-*` de Tailwind v4,
  ce qui rend l'interdiction des durées littérales tenable sans perte de granularité.
- Conversion des durées : `button-tech`, `devis-wizard`, `site-header`, `price-tag`,
  `project-card`, `scene-plans`, `atelier-essences`. Attribution d'un `className`
  dupliqué dans l'icône de chargement de `ButtonTech` (avertissement esbuild).

## 2026-09-27 — Achèvement des Lots 3 & 4 (Compositions métiers, Mouvement V3 & CtaMagnetique)

### Composants Signature & Mouvement V3 (Lot 4)
- **CtaMagnetique (`src/frontend/components/signature/cta-magnetique.tsx`)** :
  - Conforme aux spécifications V3 (§12, Lot 4).
  - Déplacement fluide par micro-attraction vers le pointeur (`transform` pur, limité à 8px) avec rappel par spring physique.
  - Détection fine de l'environnement matériel via le hook `usePointeurFin` (`pointer: fine`) et respect absolu de `prefers-reduced-motion` : inerte sur mobile/tactile et au clavier.
  - Couverture TDD complète (`cta-magnetique.test.tsx`).
- **Transitions MobileNav & DevisWizard** :
  - `mobile-nav.tsx` : implémentation de la fermeture en miroir (stagger inversé), tokens temporels stricts (`durations.stagger`, `durations.reveal`), masque cascade (`data-reveal="masque-cascade"`).
  - `devis-wizard.tsx` : navigation par glissement horizontal unifié avec mode instantané en cas de mouvement réduit.

### Scénarisation Métier & Compositions Asymétriques (Lot 3)
- Consolidation des scènes d'ingénierie et d'ébénisterie (`SceneEtudePrealable`, `SceneFerraillage`, `SceneNoteCalcul`, `SceneSuiviReception`, `SceneGeste`).
- Intégration et exportation du module `CtaMagnetique` dans l'index des composants signature.

### Validation Globale
- **Vitest** : 100% vert sur l'ensemble de la suite (sections, signature, layout, app-tests, lib, hooks).
- **TypeScript** : `npx tsc --noEmit` zéro erreur.
- **Next.js Production Build** : `next build` validé avec succès (28 routes statiques/SSG générées, 103 kB First Load JS).


### Lot 1 — Header institutionnel

- Sceau : le monogramme du kit est opaque (3 canaux, sans alpha) et posait un carré
  sombre sur les actes clairs. `scripts/convert-assets.mjs` détoure désormais un PNG à
  canal alpha ; le sceau est décoratif (`alt=""`), le libellé restant porté par le lien.
- Deux seuils de défilement distincts (floutage 24 px, compactage 96 px) : le fond se
  densifie dès que le titre quitte l'écran, la hauteur ne se réduit qu'une fois le
  défilement engagé.
- Soulignement unifié sur `.st-lien` (la définition locale ne réagissait qu'au survol
  d'un trait de 1 px `aria-hidden`, donc jamais visible) et `aria-current` sur la page
  courante. Transitions conditionnées par `prefers-reduced-motion`.

### Lot 1 — Hero « un seul porteur du plan »

- La maille blueprint quitte le hero : superposée à `PlanDessin`, elle donnait deux
  représentations concurrentes de la même villa. Elle reste disponible pour les mini-heros
  métier via `FONDS_HEROS`.
- Fond photo réelle de chantier R+2 à Yaoundé, luminance mesurée (~0,13 au tiers
  gauche) — elle autorise un voile dégressif sans transformer la scène en aplat.
- Échelle `--text-hero` dédiée (max 72 px) : la colonne éditoriale fait ~617 px en 1440,
  trois lignes courtes y tiennent sans veuve, et le hero tient dans un écran portable.
- Cotes flottantes dupliquées retirées : elles doublonnaient les cotes réelles du plan.
- Parallax multi-couches supprimé : un seul mouvement scroll-driven (le tracé), conformément
  au principe « un seul élément narratif dominant par scène ».

### Vérifications

281/281 tests Vitest passants (61 fichiers), `tsc --noEmit` propre, `next build` réussi
(103 kB de First Load JS partagé). `Progression/etat_frontend.md` resynchronisé.

## 2026-09-25 — Alignement stratégique sur le Cahier de Refonte V3

- **Examen approfondi du référentiel V3** (`docs/Guide/refonte_structura_v3.md`) :
  - Validation du principe cardinal : **« Conserver le système, améliorer sa mise en scène »** (pas de réécriture, pas de design system bis ni de palette générique SaaS).
  - Validation de la structure en 10 actes narratifs de la page d'accueil (préservés depuis le sprint précédent) avec différenciation géométrique stricte (fin de l'alternance mécanique 50/50).
  - Validation des 7 chantiers prioritaires (Lots 0 à 6) :
    - Lot 0 : Garde-fous TDD (non-régression visuelle et structurelle).
    - Lot 1 : Visage du site (Header institutionnel compactable + underline, Hero « un seul porteur du plan » et photo valorisée, H1 text-wrap balance).
    - Lot 2 : Coutures intelligentes (`st-lisiere` tenant compte de `--st-voisin`, filet net sur clair→clair).
    - Lot 3 : Scénarisation des pages métier (priorité absolue à la refonte d'Ingénierie en 4 actes asymétriques).
    - Lot 4 : Mouvement narratif ciblé (pas de surenchère, devis slide 200-300ms, GSAP scrub cadencé).
    - Lot 5 : Matière, finition, placeholders d'images floutés/ton-sur-ton et footer institutionnel d'ingénierie.
    - Lot 6 : Progressive enhancement (View Transitions).
- **Mise à jour des documents de suivi** :
  - `Progression/etat_frontend.md` synchronisé sur la branche `feat/refonte-design` (268 tests verts, socle V2 validé, transition vers V3).
  - `Progression/plan_refonte_v3.md` initialisé pour séquencer l'implémentation par lots TDD.


## 2026-09-24 — Refonte V2 : socle lumière + contrastes + survols premium (V2-1c/V2-1d)

Périmètre `plan_refonte_v2.md` respecté : tokens, recettes et mouvement
uniquement, données/routes/API intactes.

- **Contrastes tranchés par la mesure** : `steel-deep` sur papier plafonne à
  5,69:1 — sous le seuil AA. Nouvel accent clair `steel-encre` (`#1a3fa0`,
  7,88:1) consommé par `Kicker`, `BlueprintGrid`, `WatermarkPreview`, légendes
  éditoriales et filtres du catalogue ; `steel-deep` reste le bleu des aplats
  et bordures sombres. `safety` historique restauré (`bg-safety` du bouton
  conversion ne résolvait plus). Script `scripts/contrastes-v2.mjs` vert
  (5 couples AA + rappel historique informatif).
- **Survols unifiés** (grammaire premium V2 §6) : carte `-translate-y-2` +
  halo `shadow-glow` + image `scale(1.03/1.04)` en `duration-500 ease-out-expo`
  — `ProjectCard` (test dédié), cartes catalogue `ScenePlans`, cartes essences
  `AtelierEssences`. `THEME_COLOR` réaligné sur `--color-fond` (`#060a12`).
- **Revue visuelle 390/1440** (build prod) : hero premium, lisières
  sombre→clair lisibles au scroll, rythme mobile varié. Deux défauts relevés
  et assumés : fond photo du hero invisible dans ce build (régression visuelle
  à trancher — asset `FONDS_HEROS.accueil` non résolu ou voile opaque) et
  barre CTA mobile qui masque l'accroche (hors périmètre V2, à traiter avec le
  tunnel de conversion).
- Résultat : **268/268 tests**, `tsc` propre, `eslint` propre sur les fichiers
  touchés, `next build` vert (28 pages, First Load ≤ 169 Ko).

## 2026-09-22 — Refonte frontend : Phase 3 (dossier projet, AA, build, revue)

Périmètre `plan_refonte.md` respecté : visuel et composition uniquement.

- **Fiche plan « dossier projet »** (TDD, 3 nouveaux tests) : colonne achat
  enrichie (prix EUR, CTA, réassurance CinetPay/facture OHADA/SAV, WhatsApp
  pré-rempli avec la référence — même garde que le FAB), tableau technique
  migré dans `PanneauDonnees` C7, section « Contenu du dossier » (6 pièces
  contractuelles), clôture `CtaChaud` adaptation terrain dès 75 000 FCFA.
- **Contrastes AA mesurés** (luminance relative sur les tokens réels) : ink
  15–17:1 sur les 3 nouvelles surfaces, ink-soft 7,29:1, WhatsApp 6,06:1.
  `ink-mute` (3,93:1) replié sur `ink-soft` pour les usages informatifs
  (sources chiffrées, aides devis, fil d'Ariane) ; token inchangé, usages
  décoratifs conservés.
- **`next build` vert — première fois du projet** : 28 pages statiques,
  First Load JS 144–188 Ko < budget 200 Ko. Cause des échecs précédents :
  `.next` partagé avec le dev — rebuild à froid, serveur coupé.
- **LCP lab** (Playwright, build prod) : 176 ms accueil, 228 ms fiche —
  marge énorme sous 2,5 s (localhost, à confirmer sur 4G réelle).
- **Revue visuelle** (captures Playwright 390/1440, build prod) : hero et
  fiche premium, rythme mobile varié. Un défaut trouvé et corrigé :
  l'annotation « 8.40 m » mordait le bouton conversion en desktop
  (repositionnée en zone basse).
- Résultat : **239/239 tests**, `tsc` propre, lint 0 erreur (3 warnings
  pré-existants sur `scripts/audit-surfaces.mjs`). Phase 3 soldée : refonte
  terminée, hors mesure terrain (360 px réel, clavier physique, 4G).

## 2026-09-22 — Refonte frontend : fin Phase 2 (crossfade + skeletons)

Périmètre `plan_refonte.md` respecté : visuel et mouvement uniquement,
données, routes, API et comportements intacts.

- **Garde partagée** `hooks/use-scenario-actif.ts` (TDD, 3 tests) + `HeroScenario`
  factorisé dessus (garde `matchMedia` partiel ajoutée, révélée par son test).
- **Crossfade plan→photo** (§8.2) : `FonduPlanPhoto` (TDD, 4 tests), scrub
  ScrollTrigger desktop, photo seule en repli. Emplacement `fondu` optionnel
  sur `TimelineHorizontale` (2 tests), branché en acte 5 de l'accueil.
- **Skeletons blueprint** (§7.3) : `ui/skeleton` retracé + `loading.tsx` des
  deux routes dynamiques (2 tests, `role="status"`).
- Preuve dev réel : `/`, fiche plan et fiche portfolio en 200, `data-fondu`
  présent, zéro erreur serveur.
- Résultat : **236/236 tests**, `tsc` propre, lint 0 erreur (3 warnings
  pré-existants sur `scripts/audit-surfaces.mjs`). Reste Phase 3.

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
  - CTA adaptation), `/immobilier` (mosaïque + 6 vérifications). Fil d'Ariane
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
