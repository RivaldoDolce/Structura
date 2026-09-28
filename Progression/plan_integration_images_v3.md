# Plan — Intégration des images premium V3 (lots Vague 1 à 3)

Branche : `feat/refonte-design`. Référentiel : `Progression/guide_images_premium_refonte_v3.md`,
`docs/Guide/README-visuels.md` (convention `NN-XX_description-kebab-case.png`).

## Contexte

Le catalogue livré est **partiel** : 29 fichiers déposés dans `public/photos/Vague 1|2|3`
(JPEG/PNG 1 700 px de large, 0,7 à 1,8 Mo). Le guide V3 réservait les numéros `04-30` → `04-68` ;
les visuels hors fiche guide (bureau d'études, matériaux, intérieurs) prennent `04-70` → `04-77`
pour ne jamais entrer en collision avec la numérotation réservée.

Décision utilisateur : `public/photos/Vague 1/fond_accueil.png` est le **fond du hero d'accueil**
(`PHOTO_HERO_ACCUEIL`), en remplacement de `04-04_chantier-r2-yaounde`.

## 1. Pipeline d'optimisation (fait avant le code)

- `sharp` : maître **PNG sRGB** (`compressionLevel: 9`, `effort: 10`) — même famille que les maîtres
  existants (≈ 500 Ko, très en deçà du plafond 3 Mo du guide), ratios du guide respectés
  (16:9 cartes, 4:3 chantier, 1:1 portraits avec rognage `attention` pour les sources non carrées).
- Aucun sur-échantillonnage : les sources sont conservées à leur résolution utile.
- `node scripts/convert-assets.mjs` génère les dérivés `.webp` (recette `photos` q78) — le script
  n'était pas exposé : ajout du script `npm run assets` manquant.

## 2. Table d'affectation (une image = un emplacement)

| Fichier livré | Cible | Emplacement |
|---|---|---|
| `fond_accueil.png` | `chantiers/04-30_hero-accueil-chantier-matin-dore.png` | `PHOTO_HERO_ACCUEIL` |
| `IMG-HERO-01` | `chantiers/04-31_chantier-r2-matin-dore.png` | `/ingenierie` étude de cas |
| `IMG-CH-07` | `chantiers/04-44_fondu-vue-aerienne-r2.png` | accueil, `FonduPlanPhoto` |
| `IMG-IM-01` | `immobilier/04-46_villa-bastos-jour.png` | portfolio villa + plan villa |
| `IMG-IM-02` | `immobilier/04-47_immeuble-odza-jour.png` | portfolio immeuble + plan R+4 |
| `IMG-IM-03` | `immobilier/04-48_duplex-simbock-jardin.png` | portfolio duplex + plan duplex |
| `IMG-IM-04` | `immobilier/04-49_terrain-nsimalen-bornes.png` | accueil immobilier + plan terrain |
| `MG-EB-08` | `mobilier/04-57_table-reunion-salle-bois.png` | portfolio mobilier de bureau |
| `IMG-EB-10` | `mobilier/04-59_lit-bubinga-chambre.png` | ébénisterie, pièce signature |
| `04-25_portrait-ingenieur.png` | `portraits/04-60_portrait-ingenieur-casque-plan.png` | accueil + fiche équipe |
| `IMG-PO-02` | `portraits/04-61_portrait-ebeniste-rabot.png` | équipe (atelier) |
| `IMG-PO-03` | `portraits/04-62_portrait-conductrice-travaux.png` | équipe (exécution) |
| `IMG-CH-01` | `journal/04-38_journal-fouille-rigole-matin.png` | journal + jalon 1 + étude préalable |
| `IMG-CH-02` | `journal/04-39_journal-ferraillage-gabarit.png` | journal + jalon 2 |
| `IMG-CH-03` | `journal/04-40_journal-coulage-vibration.png` | journal + jalon 3 |
| `IMG-CH-04` | `journal/04-41_journal-charpente-levage.png` | journal + jalon 5 |
| `IMG-CH-05` | `journal/04-42_jalon-elevation-murs.png` | jalon 4 (sans photo auparavant) |
| `IMG-CH-06` | `journal/04-43_jalon-finitions-enduit.png` | jalon 6 (sans photo auparavant) |
| `IMG-CH-08` | `chantiers/04-45_suivi-controle-enrobage.png` | `/ingenierie` suivi et réception |
| `IMG-AA-01` | `avant-apres/04-63_mokolo-avant-fissure.png` | accueil, `BeforeAfter` |
| `IMG-AA-02` | `avant-apres/04-64_mokolo-apres-reprise.png` | accueil + portfolio Mokolo |
| `IMG-SER-01` | `chantiers/04-70_bureau-etude-conception-3d.png` | `/ingenierie` note de calcul |
| `IMG-SER-02` | `chantiers/04-71_maquette-presentation-client.png` | `/contact` vignette */
| `IMG-SER-03` | `mobilier/04-72_selection-materiaux-design-interieur.png` | ébénisterie, conception 3D |
| `IMG-MAT-01` | `chantiers/04-73_materiaux-locaux-btc.png` | `/a-propos` bandeau matières |
| `IMG-MAT-02` | `mobilier/04-74_artisanat-cannage-rotin.png` | `/a-propos` bandeau matières |
| `IMG-MAT-03` | `chantiers/04-75_claustra-terre-cuite-ombres.png` | `/a-propos` bandeau matières |
| `IMG-EXT-01` | `immobilier/04-76_villa-achevee-integration-paysagere.png` | galerie du plan villa |
| `MG-INT-01` | `immobilier/04-77_sejour-contemporain-lumiere.png` | galerie du plan villa |

## 2 bis. Vague 4 — `04-78` → `04-81` (façades et atelier)

Quatre JPEG déposés directement dans `public/photos` (hors lot `Vague n`, donc
hors numérotation réservée) : trois façades de modèles et une photo d'atelier.
Normalisation dans la chaîne existante avant tout usage — un JPEG n'est pas une
source, c'est un dérivé.

| Source déposée | Maître sRGB | Poids | Emplacement |
|---|---|---|---|
| `mobilier/04-78_atelier-ebenisterie-faconnage.jpg` | `04-78_atelier-ebenisterie-faconnage.png` (1024×768) | 335 Ko | acte 04 accueil + étape 02 « Fabrication » de `/ebenisterie` |
| `immobilier/04-79_villa-patio-padouk-facade.jpg` | `04-79_villa-patio-padouk-facade.png` (739×415) | 153 Ko | `PLANS[ST-VILLA-R1-PAD].imageUrl` |
| `immobilier/04-80_duplex-jumele-facade.jpg` | `04-80_duplex-jumele-facade.png` (780×300) | 133 Ko | `PLANS[ST-DUPLEX-SIM].imageUrl` |
| `immobilier/04-81_immeuble-odza-facade.jpg` | `04-81_immeuble-odza-facade.png` (1600×1184) | 838 Ko | `PLANS[ST-R4-ODZA-20].imageUrl` |

Les dérivés `.webp` (44 à 200 Ko, gain 71 % à 81 %) sont produits par
`npm run assets` ; le rapport `rapport_conversion_assets.md` est régénéré.

Points d'attention :

- **Rasters non upscale.** `04-79` (739 px) et `04-80` (780 px) sont plus
  petits que les masters voisins. Aucune enlargement : le guide l'interdit et un
  agrandissement ne rend pas le détail qu'il n'a pas. Ces images servent de
  vignette de catalogue, pas de fond plein écran — la mise en page le respecte.
- **Ratios libres.** `04-80` est en 2,6:1 et `04-81` en 4:3, pas en 16:9. Le
  recadrage se fait en CSS (`object-cover`, cadre 4/3), donc la source n'est ni
  déformée ni rognée sur disque.
- **`PLANS[].imageUrl` devient la source unique** de la couverture du plan :
  l'acte 05, le catalogue `/plans` et la fiche `/plans/[reference]` lisent tous
  le même champ. Aucune duplication de chemin, aucune dérive possible entre les
  trois écrans.
- **`04-46` → `04-48` restent en service** sur le portfolio et l'acte
  immobilier : ce sont des clichés d'intérieur et d'intégration paysagère, la
  cohérence entre « bien vendu » et « modèle du catalogue » s'y joue.

## 3. Code

- Données : `fonds.ts`, `equipe.ts`, `jalons.ts`, `portfolio.ts`, `plans.ts`.
- Pages : accueil (hero, fondu, before/after, scènes), `/ingenierie`, `/ébénisterie`,
  `/contact` (vignette), `/a-propos` (bandeau matières), `/plans/[reference]` (galerie rendue).
- `src/app/demo/sections/page.tsx` et tests dont les fixtures pointent les chemins remplacés.
- Suppression des maîtres remplacés et devenus orphelins (récupérables par git).

## 5 bis. Réparations 2026-09-28 (2e passe) — barre, actes 04 / 05 / 09

Retour utilisateur après relecture visuelle : quatre points traités en une passe
(détail et justifications dans `evolution_frontend.md`).

- **Barre** : conteneur borné et rempli (`w-full max-w-[112rem]`) — le verrou de
  marque et le titre se recentrent sur l'aplomb du contenu au lieu de dériver sur
  fenêtre large. Grille `auto 1fr auto` inchangée (elle *est* la garantie
  « gauche / droite »), CTA en `md:block`, hamburger en `justify-self-end`.
- **Acte 04** : la colonne texte quitte le nu de la photo pour un panneau opaque
  (`bg-surface-deep` + filet + `p-8 lg:p-10`). Fin du défaut « texte
  entremêlé à l'image ». Visuel remplacé par `04-78` (atelier), propagé à
  l'étape 02 de `/ebenisterie`.
- **Acte 05** : la carte affiche **la façade livrée** (`04-79` → `04-81`), le
  tracé isométrique passant en fond discret. Le garde-fou « jamais de photo »
  sauté : il protégeait contre la redondance avec l'acte immobilier, pas contre
  l'absence de preuve — or c'est précisément la preuve qui manquait. `PlanScene`
  impose désormais `imageUrl` + `imageAlt`. La nouvelle donnée `PLANS[].altPhoto`
  alimente aussi `WatermarkPreview` (nouvelle prop `imageAlt`) et l'Open Graph de
  la fiche.
- **Acte 09** : `MosaiqueAvantApres` et ses trois duos statiques supprimés —
  redondants avec l'acte 08 et concurrents du geste unique. Composant et test
  retirés (pas de code mort). Logique du `BeforeAfter` corrigée : repos de la
  démonstration à 50 % (et non 45 %, qui se lisait comme une valeur « correcte »)
  et `aria-valuetext` sur la poignée.
- TDD : 8 vérifications écrites avant implémentation. Résultat **333/333 tests**,
  `tsc` propre, ESLint 0 erreur, `next build` 28/28.

Trois défauts constatés à la relecture visuelle (section 4 « affichage cassé », section 5
« sans image », section 9 « avant/après unique ») :

- **Acte 09 « La méthode »** : le journal (`JALONS_CHANTIER`) devient le feuilleton visuel du
  comparateur — un `PleinLargeurEditorial` *média* porte une `MosaiqueAvantApres` de 3 duos
  (fouilles → élévation `04-38`/`04-42`, ferraillage → coulage `04-39`/`04-40`, charpente →
  finitions `04-41`/`04-43`) puis le comparateur Mokolo (`04-63`/`04-64`) avec sa fiche. La paire
  `04-64` (portfolio) disparaît de `PROJETS_PORTFOLIO` au profit d'une entrée « Coulage de
  dalle » : le `BeforeAfter` retrouve enfin le même cadrage obligatoire des deux côtés.
- **Acte 04 (ébénisterie)** : `SceneEbenisterie` accepte une macro en position haute
  (`position="50% 20%"`) et réserve une colonne texte intrinsèque : la macro `04-05` reste
  cadrée sur son tiers supérieur (pas de flou), la colonne ne s'écrase plus sous 360 px
  (`baseline 18rem`).
- **Acte 05 (plans)** : `ScenePlans` reste sans photographie par conception (tracé unique,
  test verrouillé) mais gagne la preuve : chaque carte affiche le nombre de vues du modèle
  livré (`galerie.length`, mono clair, encre) et la fiche plan de la villa porte ce rappel —
  la preuve existe donc sans redondance visuelle.
- Verdicts guides ajustés : `BeforeAfter` reste le comparateur interactif unique, les duos
  secondaires vivent dans `JalonAvantApres` (accessibilité : `role="img"`, nom « avant / après »
  obligatoire). Le quatrième projet du portfolio (« Rénovation Mokolo ») est rattaché aux
  `JALONS_CHANTIER[0..1]` plutôt qu'au trio — la fiche du projet client reste un mini-chantier.

