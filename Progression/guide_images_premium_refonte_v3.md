# Guide images premium — Refonte V3 STRUCTURA

**Chemin de ce fichier : `Progression/guide_images_premium_refonte_v3.md`**
**Date :** 2026-09-27 · **Refonte :** V3 (`feat/refonte-design`) · **Réf :** `docs/Guide/refonte_structura_v3.md`, `Progression/plan_refonte_v3.md`
**État lu :** Lots 0 à 3 livrés (311 tests verts). Constats Lot 2 : 6 occurrences d'une même photo sur l'accueil, catalogue de plans illustré par des photos de bâtis vendus (corrigé par `IllustrationPlan`).

## 0. Cap visuel V3 (à imposer à chaque génération)

- **Positionnement :** « Cabinet d'ingénierie contemporain + architecture éditoriale + matière africaine noble ». Ni SaaS bleu, ni cyber/IA, ni template immobilier.
- **Lumière :** naturelle camerounaise (matin doré ou fin d'après-midi), ombres douces, vraie matière (béton, bois, latérite). Jamais de HDR agressif ni de néons.
- **Cadrage :** sujet lisible rogné en `object-cover`, tiers gauche (héros) ou centre (cartes) dégagé pour le texte. Aucun texte, logo, watermark ou personne reconnaissable de face dans l'image.
- **Interdits :** mains déformées, EPI incohérents (casque sur une macro bois), ciel cramé, pelouse américaine, mobilier scandinave blanc, voitures de luxe.
- **Traitement site (déjà en place) :** overlay lecture `05-10_overlay-photo-lecture`, voile `.st-voile-photo`, grain local. La photo arrive donc **claire et nette** : c'est le CSS qui assombrit, pas le fichier.

## 1. Format et méthode (valables pour toutes les fiches)

- **Maître :** PNG/JPG sRGB, grand côté **2400 px** (héros et pleines largeurs) ou **1600 px** (cartes, journal, portraits). Ratio imposé par fiche (`16:9`, `4:3`, `1:1`, `3:4`).
- **Livraison site :** `npm run assets` (`scripts/convert-assets.mjs`) génère `.avif` (q60) + `.webp` (q75). Cibles : héros ≤ 200 Ko AVIF, cartes ≤ 120 Ko, journal/portraits ≤ 80 Ko.
- **Nommage :** `NN-XX_description-kebab-case.png` (NN = lot actuel : `04` photos). Les remplacements premium prennent le numéro suivant libre **`04-30` → `04-68`** pour ne jamais écraser l'existant avant validation.
- **Prompt :** chaque fiche donne un prompt ANGLAIS copier-coller (les modèles d'image le comprennent mieux) + une variante négative commune : `no text, no watermark, no logo, no deformed hands, no oversaturated HDR, no neon, photorealistic, natural light`.
- **Remplacement type :** 1) générer le maître → 2) déposer dans `public/photos/<famille>/` → 3) `npm run assets` → 4) pointer le chemin `.webp` dans `src/frontend/data/*.ts` ou la page (voir fiche) → 5) `next/image` avec `sizes` + `priority` uniquement sur héros → 6) `npx vitest run src/frontend/data/__tests__/coherence.test.ts` (le test vérifie que le fichier existe) + contrôle visuel 390 px / 1440 px.

## 2. Inventaire global (actuel → cible)

| # | Page / section | Image actuelle | Verdict V3 | Fiche cible |
|---|---|---|---|---|
| 1 | Accueil hero | `photos/chantiers/04-04_chantier-r2-yaounde` (luminance ~0,13, chargée) | REMPLACER | IMG-HERO-01 |
| 2 | `/ingenierie` hero + acte 02 | `textures/fonds-heros/01-03` + `04-02_plan-3d-holographique` (rendu 3D froid) | REMPLACER acte 02, garder fond hero | IMG-HERO-02 |
| 3 | `/ebenisterie` hero + acte 01 | `01-04` + `04-02` réutilisé hors sujet | REMPLACER acte 01 | IMG-HERO-03 |
| 4 | `/plans` hero | `01-05_heros-plans-desktop` (fond vectoriel, OK) | GARDER + ajouter galerie | IMG-HERO-04 |
| 5 | `/immobilier` hero | `01-06` + `01-07` (OK) | GARDER | — |
| 6 | `/portfolio` hero | `01-08` (OK) | GARDER | — |
| 7 | `/a-propos` (sans hero photo) | portraits seuls | AJOUTER bandeau atelier | IMG-HERO-07 |
| 8 | `/contact` (sans photo) | aucune | AJOUTER vignette bureau | IMG-HERO-08 |
| 9–16 | Journal / jalons (4) + 2 jalons sans photo (élévation, finitions) + hero acte 08 | `04-21`→`04-24` (corrects mais plats) + doublons Lot 2 | AMÉLIORER + CRÉER 2 manquantes | IMG-CH-01 → 08 |
| 17–20 | Immobilier (4 biens) | `04-15`→`04-18` (nuit/froid, terrain vide) | REMPLACER les 4 | IMG-IM-01 → 04 |
| 21–30 | Ébénisterie (5 essences + 5 mobilier) | macros et meubles corrects mais inégaux (`04-13` console jamais affichée !) | REMPLACER 5 + AJOUTER console | IMG-EB-01 → 10 |
| 31–33 | Portraits équipe (3) | `04-25`→`04-27` (poses raides) | REMPLACER les 3 | IMG-PO-01 → 03 |
| 34–35 | Avant/après Mokolo | `04-19`/`04-20` (angles légèrement différents) | REPRENDRE paire même angle | IMG-AA-01/02 |
| 36–40 | Transverses : OG, 404, empty states, CTA warm, devis | `og/default-og`, `illustration-404-plan-perdu` (style daté) | REMPLACER/ AJOUTER | IMG-TX-01 → 05 |

## 3. Héros (1 image par page — le « vendeur » unique)

### IMG-HERO-01 — Accueil (PRIORITÉ 1, remplace `04-04` en hero)
- **Rôle :** `PHOTO_HERO_ACCUEIL` (`src/frontend/data/fonds.ts`), acte 01 sombre, `position: 50% 42%`.
- **Pourquoi remplacer :** la photo actuelle est documentaire mais chargée (sacs, désordre) et sombre (~0,13) : le voile la transforme en aplat. V3 veut la preuve + la lumière.
- **Fichier :** `public/photos/chantiers/04-30_hero-chantier-r2-matin-dore.png` — 2400×1350 (16:9), zone utile au tiers gauche.
- **Prompt :** `Photorealistic construction site in Yaounde Cameroon at golden morning hour, two-storey reinforced concrete frame (columns and beams cast, starter rebars upright), wooden formwork and scaffolding, red laterite ground, two workers in helmets seen from back at right third, soft warm sunlight from left, clear sky, shallow depth, editorial architectural photography, no text, no watermark, no logo, no deformed hands, no oversaturated HDR, no neon`
- **Intégration :** changer `src` dans `PHOTO_HERO_ACCUEIL`, garder `alt` (adapter si besoin), relancer `npm run assets`, `sizes="100vw" priority`.

### IMG-HERO-02 — Ingénierie acte 02 « Note de calcul » (remplace `04-02`)
- **Rôle :** `NOTE_CALCUL.imageUrl` (`src/app/(public)/ingenierie/page.tsx`), scène `pale`, panneau de cotes en chevauchement.
- **Fichier :** `public/photos/chantiers/04-31_bureau-controle-note-calcul.png` — 1600×1200 (4:3).
- **Prompt :** `Close-up over the shoulder of a structural engineer reviewing a printed calculation note and reinforcement drawing on a site table, hard hat beside the papers, blurred concrete columns in background, Yaounde construction site, natural daylight, shallow depth of field, documentary premium photography, no readable text, no watermark, no logo`
- **Intégration :** remplacer `imageUrl` + `imageAlt="Ingénieur vérifiant une note de calcul sur table de chantier"`. Ne pas toucher au hero (`FONDS_HEROS.ingenierie`, fond vectoriel conservé).

### IMG-HERO-03 — Ébénisterie acte 01 « Conception 3D » (remplace `04-02` hors sujet)
- **Rôle :** `GESTE[0].imageUrl` (`src/app/(public)/ebenisterie/page.tsx`).
- **Fichier :** `public/photos/mobilier/04-32_conception-atelier-plan-console.png` — 1600×1200 (4:3).
- **Prompt :** `Joinery workshop in Yaounde, craftsman hands unrolling a technical furniture drawing over a padouk wood board, caliper and pencil on the plan, warm workshop light, wood shavings, blurred finished console in background, premium craft photography, no readable text, no watermark`
- **Intégration :** remplacer `imageUrl` + `imageAlt="Plan technique déroulé sur un plateau de padouk à l'atelier"`.

### IMG-HERO-04 — Catalogue plans : galerie (AJOUT, le hero vectoriel `01-05` est gardé)
- **Rôle :** `PLANS[].galerie` (`src/frontend/data/plans.ts`) : aujourd'hui seule la villa a une galerie, avec la même image froide `04-02`.
- **Fichiers :** `04-33_galerie-villa-patio-jour.png`, `04-34_galerie-immeuble-facade-jour.png`, `04-35_galerie-duplex-cascade-jardin.png` — 1600×900 (16:9), rendus photo de jour (pas de nuit).
- **Prompt type :** `Photorealistic daytime exterior of [modern R+1 patio villa in red earth courtyard with padouk shutters / white R+4 apartment block with balconies / cascading duplex pair with small garden], Yaounde Cameroon, clear sky, a few tropical plants, architectural real-estate photography, no people in foreground, no text, no watermark`
- **Intégration :** renseigner `galerie` des 4 plans (ajouter aussi 1 vue pour duplex + terrain) ; la fiche plan utilise `WatermarkPreview` (filigrane déjà géré).

### IMG-HERO-07 — À propos : bandeau atelier (AJOUT, page sans photo)
- **Rôle :** nouveau bandeau plein cadre sous le H1 de `src/app/(public)/a-propos/page.tsx`.
- **Fichier :** `public/photos/portraits/04-36_atelier-equipe-établi-commun.png` — 2400×1200 (2:1).
- **Prompt :** `Wide shot of a joinery and engineering workshop in Yaounde, team of four artisans around a large workbench sharing a wood piece, tools on wall, warm window light with dust particles, authentic working atmosphere, premium editorial photography, faces not recognizable (backs and profiles), no text, no watermark`
- **Intégration :** `<Image fill sizes="100vw">` + `alt="Équipe STRUCTURA autour d'un établi à l'atelier de Yaoundé"`.

### IMG-HERO-08 — Contact : vignette bureau (AJOUT, page sans photo)
- **Rôle :** visuel colonne latérale `aside` de `src/app/(public)/contact/page.tsx`.
- **Fichier :** `public/photos/chantiers/04-37_bureau-accueil-dossier-plan.png` — 1200×1600 (3:4).
- **Prompt :** `Welcoming small architecture office reception in Yaounde, wood counter in padouk, rolled drawings and a scale model of a villa on the desk, warm light, green plant, interior photo, no text, no watermark`

## 4. Chantier et journal (le feuilleton preuve)

Regle Lot 2 : 1 jalon = 1 image unique, jamais de reemploi. Les 4 images actuelles sont reprises en version lumineuse ; les 2 jalons sans photo recoivent enfin leur cliche (`src/frontend/data/equipe.ts`, `jalons.ts`).

### IMG-CH-01 — Fouilles (`04-21`, vitrine + `SceneEtudePrealable`)
- **Fichier :** `public/photos/journal/04-38_journal-fouille-rigole-matin.png` — 1600x1000.
- **Prompt :** `Foundation trench excavation for a villa in red laterite soil, straight trench lines with string lines and stakes, worker with shovel seen from back, measuring tape along the edge, morning light, Yaounde Cameroon, documentary construction photography, no text, no watermark`
- **Integration :** remplacer `journal[0]`, `JALONS_CHANTIER[0]`, `ETUDE_PREALABLE.imageUrl` ensemble.

### IMG-CH-02 — Ferraillage (`04-22`, etude de cas ingenierie)
- **Fichier :** `public/photos/journal/04-39_journal-ferraillage-gabarit.png` — 1600x1000.
- **Prompt :** `Close-up of steel reinforcement mesh for concrete footings, HA10 rebars tied with wire, spacer blocks visible, gloved hand placing a bar, red earth and formwork around, sharp focus on steel, natural daylight, premium site photography, no text, no watermark`

### IMG-CH-03 — Coulage (`04-23`, portfolio coulage-dalle)
- **Fichier :** `public/photos/journal/04-40_journal-coulage-vibration.png` — 1600x1000.
- **Prompt :** `Concrete slab pouring on a construction site, wet concrete spreading with a vibrating poker, workers screeding in rubber boots, wooden formwork edges, daylight, Yaounde, premium documentary photography, no text, no watermark`

### IMG-CH-04 — Charpente (`04-24`)
- **Fichier :** `public/photos/journal/04-41_journal-charpente-levage.png` — 1600x1000.
- **Prompt :** `Traditional timber roof trusses being lifted onto a duplex under construction, carpenters guiding the frame, blue sky, red earth below, local wood structure, natural light, premium photography, no text, no watermark`

### IMG-CH-05/06 — Jalons sans photo (elevation + finitions)
- **Fichiers :** `04-42_jalon-elevation-murs.png`, `04-43_jalon-finitions-enduit.png` — 1600x1000.
- **Prompts :** `Masons laying concrete blocks on a first floor wall, plumb line and string level, door opening framed, daylight, Yaounde site, documentary photography, no text` / `Painter applying warm white plaster on an interior villa wall, roller and ochre accent patch, ladder and drop cloth, soft window light, premium interior site photography, no text`
- **Integration :** renseigner `JALONS_CHANTIER[3].images` et `[5].images`.

### IMG-CH-07 — Acte 08 fondu plan-photo (remplace `04-02`, 6e emploi)
- **Role :** `fondu.photoSrc` dans `src/app/(public)/page.tsx`.
- **Fichier :** `public/photos/chantiers/04-44_fondu-vue-aerienne-r2.png` — 2000x1125.
- **Prompt :** `Slight aerial view of a two-storey house construction site in Yaounde, concrete frame and red earth plot with material stockpiles, late afternoon light, geometric composition readable at small size, premium drone photography, no text, no watermark`

### IMG-CH-08 — Suivi reception (ameliore `04-04` reutilise du hero)
- **Role :** `SUIVI_RECEPTION.imageUrl` (`src/app/(public)/ingenierie/page.tsx`).
- **Fichier :** `public/photos/chantiers/04-45_suivi-controle-enrobage.png` — 1600x1200.
- **Prompt :** `Site supervisor checking concrete cover with a gauge on reinforcement bars, notebook in hand, blurred workers in background, Yaounde site, morning light, rigorous documentary photography, no readable text, no watermark`

## 5. Immobilier (PRIORITE 2 — `portfolio.ts` + `plans.ts`)

Defaut actuel : 3 vues nuit/froides + 1 terrain vide. Cible : jour clair, facade habitee (plantes, portail ouvert = deja vivant).

### IMG-IM-01 — Villa Bastos (remplace `04-15`)
- **Fichier :** `public/photos/immobilier/04-46_villa-bastos-jour.png` — 1600x900.
- **Prompt :** `Photorealistic modern two-storey villa in Bastos Yaounde at daytime, beige render and padouk wood shutters, paved courtyard with two tropical trees, open metal gate, clear blue sky, premium real-estate photography, no people in foreground, no cars, no text, no watermark`
- **Integration :** `PROJETS_PORTFOLIO[0]` + `PLANS[0]` (meme bien = meme photo).

### IMG-IM-02 — Immeuble Odza (remplace `04-16`)
- **Fichier :** `public/photos/immobilier/04-47_immeuble-odza-jour.png` — 1600x900.
- **Prompt :** `Photorealistic white four-storey apartment building with balconies, shops at ground floor, paved street in Odza Yaounde, daytime, blurred passers-by, premium real-estate photography, no text, no watermark`

### IMG-IM-03 — Duplex Simbock (remplace `04-17`)
- **Fichier :** `public/photos/immobilier/04-48_duplex-simbock-jardin.png` — 1600x900.
- **Prompt :** `Photorealistic pair of cascading duplex houses with small front gardens and hedges, ochre and white facades, late afternoon sun, Simbock Yaounde, premium real-estate photography, no text, no watermark`

### IMG-IM-04 — Terrain Nsimalen (remplace `04-18`, champ anonyme)
- **Fichier :** `public/photos/immobilier/04-49_terrain-nsimalen-bornes.png` — 1600x900.
- **Prompt :** `Fenced serviced land plot near Nsimalen road Cameroon, concrete boundary markers with red paint tops, young palm trees, graded red earth access track, blue sky, surveyed land photography, no text, no watermark`
- **Integration :** le bornage visible vend le descriptif dossier foncier verifie.

## 6. Ebenisterie (PRIORITE 3 — essences + mobilier)

Constat : `04-13_console-iroko` et `04-14_boiserie-ebene` existent mais ne sont affiches nulle part. Les macros sont correctes mais inegales (fonds, balance). Tout reprendre en serie coherente : fond ardoise sombre + lumiere laterale chaude = matiere premium.

### IMG-EB-01 a 05 — 5 macros (`04-05` padouk, `04-06` iroko, `04-08` bubinga, `04-09` ebene, `04-10` ayous)
- **Fichiers :** `04-50_macro-padouk-lumiere.png`, `04-51_macro-iroko-lumiere.png`, `04-52_macro-bubinga-lumiere.png`, `04-53_macro-ebene-lumiere.png`, `04-54_macro-ayous-lumiere.png` — 1200x1200 (1:1, cartes `AtelierEssences`).
- **Prompt type :** `Extreme macro of [red padouk / golden iroko / dark veined bubinga / black ebony / pale ayous] wood grain, polished surface with oil finish, warm side light revealing pores and veins, dark slate background, premium material photography, square composition, no text, no watermark`
- **Integration :** `essences[].imageUrl` dans `src/frontend/data/equipe.ts`.

### IMG-EB-06 — Fabrication (ameliore `04-26` atelier)
- **Fichier :** `public/photos/mobilier/04-55_fabrication-tenon-mortaise.png` — 1600x1200.
- **Prompt :** `Close-up of craftsman hands fitting a mortise and tenon joint on a padouk table leg, mallet and chisels nearby, wood shavings, warm workshop light, Yaounde joinery, premium craft photography, no face, no text, no watermark`
- **Integration :** `GESTE[1].imageUrl` (page ebenisterie).

### IMG-EB-07 — Finition (ameliore `04-03`)
- **Fichier :** `public/photos/mobilier/04-56_finition-huile-plateau.png` — 1600x1200.
- **Prompt :** `Hand applying hard oil with a cloth on a large padouk table top, satin sheen appearing, warm side light, blurred workshop background, premium craft photography, no face, no text, no watermark`
- **Integration :** `GESTE[2].imageUrl`.

### IMG-EB-08 — Table reunion (ameliore `04-11`)
- **Fichier :** `public/photos/mobilier/04-57_table-reunion-salle-bois.png` — 1600x1000.
- **Prompt :** `Twelve-seat padouk boardroom table in a warm meeting room with wood paneling, leather chairs, soft window light, Yaounde office, premium interior photography, empty room, no people, no text, no watermark`
- **Integration :** `PROJETS_PORTFOLIO table-reunion-padouk`.

### IMG-EB-09 — Console iroko (AJOUT : `04-13` existe mais jamais affiche)
- **Fichier :** `public/photos/mobilier/04-58_console-iroko-entree.png` — 1200x1600 (3:4, fiche produit `[produit]`).
- **Prompt :** `Elegant iroko wood console with four drawers in a bright entrance hall, vase with dried pampas grass on top, warm wall light, premium furniture photography, no people, no text, no watermark`
- **Integration :** creer la fiche produit console (page `ebenisterie/[produit]` vide aujourd hui) + vignette catalogue sur-mesure.

### IMG-EB-10 — Lit bubinga (ameliore `04-12`)
- **Fichier :** `public/photos/mobilier/04-59_lit-bubinga-chambre.png` — 1600x1000.
- **Prompt :** `King size bed in solid bubinga with continuous headboard grain, beige linen bedding, warm bedside lamps, wood floor, serene bedroom, premium furniture photography, no people, no text, no watermark`
- **Integration :** `PleinLargeurEditorial` piece signature (page ebenisterie).

## 7. Portraits + avant-apres (confiance)

### IMG-PO-01 a 03 — Equipe (remplace `04-25`, `04-26`, `04-27`)
- **Fichiers :** `04-60_portrait-ingenieur-casque-plan.png`, `04-61_portrait-ebeniste-rabot.png`, `04-62_portrait-chef-chantier-gilet.png` — 1200x1200 (1:1, cartes + ronds 64 px).
- **Prompt type :** `Portrait of a [structural engineer holding rolled drawings wearing white helmet / senior joiner planing a padouk board / site foreman with yellow vest and tablet] in Yaounde, neutral warm background, soft window light, confident natural pose, three-quarter view, premium corporate photography, no text, no watermark`
- **Integration :** `equipe[].photoUrl` (`equipe.ts`) : utilise sur `/a-propos` et fiches portfolio. Verifier `alt` = role, pas de nom invente.

### IMG-AA-01/02 — Mokolo avant/apres (reprendre la paire `04-19`/`04-20`)
- **Fichiers :** `public/photos/avant-apres/04-63_mokolo-avant-fissure.png`, `04-64_mokolo-apres-reprise.png` — 1600x1000, MEME angle, meme focale.
- **Prompt avant :** `Cracked concrete facade of a small urban building in Mokolo Yaounde, visible diagonal crack over a window, dull daylight, documentary expertise photography, no people, no text` ; **apres :** `Same building facade after structural repair, clean beige render, reinforced window frame, same angle and daylight, documentary expertise photography, no people, no text`
- **Integration :** `BeforeAfter` acte 09 accueil. Controler l alignement du curseur (meme cadrage obligatoire).

## 8. Transverses (OG, erreurs, vides, conversion)

### IMG-TX-01 — OG par defaut (remplace `og/default-og.png`, 26 Ko daté)
- **Fichier :** `public/og/04-65_og-structura-hero-chantier.png` — 1200x630 (ratio OG strict).
- **Prompt :** `Premium banner for STRUCTURA engineering studio Yaounde, golden-hour construction frame on the right, warm ivory gradient on the left third left empty for text overlay, subtle blueprint grid lines, no text, no logo, no watermark`
- **Integration :** `src/shared/constants/site.ts` + layout racine (OG/Twitter). Le texte OG est pose par Next, jamais dans l image.

### IMG-TX-02 — 404 (remplace `illustration-404-plan-perdu.png`)
- **Fichier :** `public/illustrations/04-66_404-plan-enroule-atelier.png` — 1600x1600 (1:1, `not-found.tsx` aujourd hui sans visuel : l ajouter).
- **Prompt :** `Rolled architectural drawing tied with string on a warm wooden table, compass and pencil beside, soft window light, minimal premium illustration style, warm ivory background, no text, no watermark`
- **Integration :** `<Image>` 320 px dans `not-found.tsx` + `alt="Plan enroulé : page introuvable"`.

### IMG-TX-03 — Empty states (remplace `empty-states.png`)
- **Fichier :** `public/illustrations/04-67_empty-compas-mire.png` — 1600x1000.
- **Prompt :** `Minimal line illustration of a compass and leveling staff on warm ivory background, thin copper lines, generous white space, premium UI empty state style, no text`
- **Integration :** catalogue vide, panier vide, journal vide (compte/gestion).

### IMG-TX-04 — CTA warm (fond de `CtaChaud`, actuellement uni)
- **Fichier :** `public/textures/fonds-sections/04-68_section-cta-matiere-bois.png` — 1920x640.
- **Prompt :** `Warm abstract background of padouk wood grain softly blurred with a dark gradient at the bottom third, premium web section background, no text, no watermark`
- **Integration :** fond `CtaChaud` en `cover` + overlay sombre pour AA du texte blanc.

### IMG-TX-05 — tunnel /devis (AJOUT, page sans image)
- **Fichier :** `public/photos/chantiers/04-69_devis-mains-plan-devis.png` — 1200x1200.
- **Prompt :** `Two hands exchanging a quotation folder over architectural drawings on a wood table, pen ready to sign, warm light, trust and commitment, premium photography, no readable text, no faces, no watermark`
- **Integration :** colonne laterale sticky du wizard desktop (`DevisWizard`), masquee sur mobile.

## 9. Ordre de production (40 images, 4 vagues)

- **Vague 1 (semaine 1, effet wow) :** HERO-01, IM-01 a 04, EB-08/10, CH-07. 8 images = accueil + immobilier transformes.
- **Vague 2 (preuve) :** CH-01 a 06 + CH-08, AA-01/02, PO-01 a 03. Le journal devient un vrai feuilleton.
- **Vague 3 (matiere) :** EB-01 a 07 + EB-09, HERO-02/03, HERO-04 (galerie plans).
- **Vague 4 (finition) :** HERO-07/08, TX-01 a 05. OG, 404, vides, CTA, devis.
- **A ne PAS regenerer :** fonds heros vectoriels `01-03/04/05/06/08`, motifs `06-*`, overlays `05-*`, branding/monogramme (sceau V3), `tampons-ingenieur`, textures `00/02/03/04` : le systeme est sain, seule la photo doit monter en gamme.

## 10. Checklist de validation par image (avant `git add`)

1. Grand cote et ratio conformes (§1), sRGB, < 3 Mo le maitre.
2. `npm run assets` passe ; AVIF hero ≤ 200 Ko, carte ≤ 120 Ko.
3. `next/image` : `alt` francais renseigne (ou `alt=""` si decoratif), `sizes` adapte, `priority` seulement hero.
4. Contraste texte/image AA (overlay `05-10` si texte blanc sur photo).
5. Aucun doublon (`grep -r "04-XX" src` ne doit montrer qu UN usage sauf bien=plan assume §5).
6. `npx vitest run src/frontend/data/__tests__/coherence.test.ts` vert + captures 390/1440 relues (critere §33 du cahier V3 : l oeil comprend ou commencer, le vide est volontaire).








