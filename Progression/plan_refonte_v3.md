# Plan d'Exécution Refonte V3 — STRUCTURA

**Date :** 2026-09-25  
**Branche cible :** `feat/refonte-design`  
**Référence :** `docs/Guide/refonte_structura_v3.md`  
**Socle de départ :** V2 livrée (commit `1f358b3`), 268/268 tests passants, `tsc` propre.

---

## 1. Vision et Principes Directeurs V3

1. **Conserver le système existant, sublimer sa mise en scène** : aucun abandon de l'architecture (`globals.css`, `tokens.ts`, `lumieres.ts`, composants `signature`, `sections`).
2. **Règle de retenue & autorité technique** : identité « Cabinet d'ingénierie contemporain + architecture éditoriale + matière africaine noble ». Ni SaaS bleuâtre, ni cyber/IA, ni fioritures superflues.
3. **Deux grilles complémentaires** :
   - *Grille éditoriale contrainte* (titres, paragraphes, CTA, formulaires).
   - *Grille architecturale respirante* (plans blueprint, cotes, débordements photo, transitions asymétriques).
4. **Un seul « vendeur » par scène** : hiérarchie univoque de conversion (cuivre/safety pour l'action principale, cyan pour la rigueur technique, bleu steel pour l'information, WhatsApp comme contact).
5. **Développement TDD strict** : tests avant implémentation, zéro régression, respect de `prefers-reduced-motion` et AA.

---

## 2. Feuille de Route par Lots

### LOT 0 — Garde-fous et tests de non-régression
Test livré : `src/frontend/app-tests/regles-v3.test.ts` (audit statique des sources de production).

- [x] Interdiction de `transition-all` — chaque transition nomme ses propriétés.
- [x] Interdiction des durées littérales (`duration-300`) : toute durée sort d'un token.
- [x] Cohérence CSS ⇄ JS de l'échelle `--transition-duration-*` / `durations`.
- [x] Hiérarchie des cinq crans de surface conservée.
- [ ] Tests structurels sur l'alternance géométrique (`data-composition` et `data-motion`) — LOT 3.
- [ ] Vérification du format tabulaire (`tabular-nums`) sur compteurs et prix — LOT 5.
- [ ] Vérification du comportement `asChild` de `ButtonTech` — LOT 4.

**Décision technique vérifiée empiriquement (compilation PostCSS/Tailwind 4.1)**

Le namespace `--transition-duration-*` génère bien les utilitaires `duration-micro`,
`duration-standard`, `duration-cinematic`. Les tokens `--dur-*` (namespace maison,
non relié à l'utilitaire `duration-*`) disparaissent donc au profit du namespace
officiel : c'est ce qui rend possible l'interdiction des durées littérales sans
perdre la granularité de l'échelle.

**Cibles des remplacements de durées (mapping retenu)**

| Littéral | Token | Raison |
|---|---|---|
| `duration-200` | `duration-micro` (150 ms) | survols : la réactivité prime, 50 ms de moins se ressent |
| `duration-300` | `duration-standard` (300 ms) | barres de progression, panneaux, header |
| `duration-500` | `duration-reveal` (400 ms) | élévations de carte et zooms photo (geste ample) |

Fichiers concernés : `button-tech`, `devis-wizard`, `site-header`, `price-tag`,
`project-card`, `scene-plans`, `atelier-essences`.

### LOT 1 — Le visage du produit (Header & Hero)
- [x] **Header** :
  - Intégration du monogramme comme sceau institutionnel (asset à canal alpha, détouré par le script).
  - Soulignement actif `.st-lien` unifié (suppression de la définition locale).
  - Remplacement de `transition: all` par des transitions ciblées et tokenisées.
  - Comportement compact au scroll (état `data-compact`, hauteur 56/64 px).
  - Hiérarchie CTA header (secondaire par rapport au hero).
- [x] **Hero homepage** :
  - Un seul porteur du plan : la maille `BlueprintGrid` quitte le hero, `PlanDessin` reste seul.
  - Fond photo réelle (`04-04_chantier-r2-yaounde`) au lieu de la planche blueprint du kit.
  - Voile localisé (`.st-voile-photo`) : protection haute côté texte, photo lisible côté opposé.
  - H1 en trois lignes masquées, mot Fraunces en dernier temps de la chorégraphie.
  - Mouvement scroll-driven unique : tracé du plan (`data-motion="trace-scrub"`), parallax multi-couches retiré.

**Décisions de composition du hero (calibrées, pas dogmatiques)**

1. Le fond blueprint `01-01_heros-accueil-desktop` est écarté : le guide §6.1 identifie
   précisément cette configuration comme double représentation du plan. Il reste
   disponible pour les mini-heros métier via `FONDS_HEROS`.
2. La photo retenue est un chantier réel R+2 à Yaoundé : matière locale, échafaudages,
   attentes d'armatures — elle prouve la conduite de travaux au lieu de la suggérer.
   Sa luminance (0.146 / 0.124 / 0.103 en tiers gauche / centre / droite) autorise un
   voile dégressif : ~0.94 à gauche (contraste du H1 ≈ 14:1) tombant à ~0.10 à droite,
   zone où le plan cyan garde sa lisibilité.
3. Le H1 quitte `text-display` (96 px, conçu pour un hero pleine largeur) au profit d'une
   échelle dédiée `--text-hero` (max 72 px) : la colonne éditoriale fait ~617 px en 1440,
   et trois lignes courtes y tiennent sans veuve. La quarantaine de pixels gagnés en
   hauteur rend le hero tenant dans un écran portable 900 px.
4. Les cotes flottantes dupliquées (`POTEAU BA Ø20`, `8.40 m`) disparaissent : elles
   doublonnaient les cotes réelles de `PlanDessin` (`12.00 m`, `4.50 m`). Il ne reste
   qu'une annotation, factuelle et située : le chantier d'où vient la photo.

### LOT 2 — Coutures & Transitions entre Actes
- [x] Évolution de `st-lisiere` pour prendre en compte `--st-voisin` (transition contextuelle selon la nature de l'acte suivant).
- [x] Coutures claires nettes : `border-top: 1px solid var(--color-line-encre)` sans flou ni ombre sale.
- [x] Continuité naturelle des séquences sombres.

**Diagnostic appliqué (mesuré sur le rendu, pas supposé)**

1. **Défaut de fond** — `.st-lisiere` fond *toujours* vers `--color-fond`, y compris
   entre deux bandes claires jointives. Sur l'accueil (acte 02 `pale` → acte 03
   `ivoire`), sur l'ébénisterie (bandeau ivoire → pièce `pale`) et sur le
   catalogue, cela dessinait une **tache noire en plein milieu du papier** : le
   fondu n'est justifié qu'à l'entrée et à la sortie d'une zone sombre, jamais
   entre deux papiers.
2. **Couture** — le filet clair d'un pixel remplace le dégradé pour toute jonction
   clair/clair, la lisière du dessus renonçant à son fondu pour ne poser qu'un trait.
3. **Recyclage photographique** — l'audit de composition a révélé six occurrences
   du même cliché sur l'accueil. Origines distinctes, pas un défaut de rendu :
   - l'acte 03 réutilisait la photo du hero (corrigé : portrait d'ingénieur) ;
   - le fondu de l'acte 08 réutilisait la même photo (corrigé : coulage de dalle) ;
   - le quatrième jalon, sans photo, empruntait celle du premier : le critère de
     sélection est désormais la *présence d'un cliché*, pas le rang ;
   - le catalogue de plans illustrait des **plans à vendre** par les photos des
     immeubles déjà vendus — la même preuve servait trois fois sur la même page.
     Remplacées par le tracé `IllustrationPlan`, qui rend le modèle lui-même.

**Décisions de composition**

- Un plan se montre par son **tracé**, pas par la photo d'un bâti construit : la
  photo pouvait laisser croire que le modèle existe déjà.
- `typeBatiment` resserré de `string` à `TypeBatiment` à la source : sans cela, un
  modèle mal typé retombait silencieusement sur la villa, et deux modèles
  distincts se confondaient à l'écran.
- Le duplex se distingue par sa **forme** (deux volumes en cascade) et non par un
  étage de plus, qui le rendait indiscernable d'une villa.

### LOT 3 — Composition asymétrique & Scénarisation des Pages Métier
- [x] **Ingénierie** (priorité absolue) — quatre scènes différenciées au lieu de quatre
  `BandeauAlterne` 50/50 :
  - 01 `SceneEtudePrealable` (ivoire, 40/60, tableau de preuves terme/valeur).
  - 02 `SceneNoteCalcul` (pâle, média dominant, panneau de cotes en chevauchement).
  - 03 `SceneFerraillage` (sombre, plan technique `PlanFerraillage` pleine largeur).
  - 04 `SceneSuiviReception` (warm, photo large, panneau de suivi léger).
  - Séquence de lumières sans collision : ivoire → pâle → sombre → warm → sombre →
    pâle → warm (vérifiée par test de composition).
- [ ] **Accueil (10 actes)** : briser l'alternance 50/50 mécanique ; introduire des scènes asymétriques, débordements, et colonnes secondaires à haute valeur informative.
  - [ ] **A — Actes 03/04 asymétriques (sans images)** : `SceneIngenierie` 40/60 éditorial + `SceneEbenisterie` média dominant chevauché ; `data-composition` + `data-ratio` + `data-motion` vérifiés par test (V3 §3.3 : deux dimensions variées minimum).
  - [ ] **B — Ébénisterie scénique (sans images)** : remplacer les 3 `BandeauAlterne` 50/50 par 3 scènes (conception / fabrication / finition) aux grammaires distinctes.
  - [ ] **C — Colonnes secondaires utiles** : cotes et données réelles dans les gouttières, jamais de vide sans raison (V3 §3.4).
- [ ] Autres pages métier (Ébénisterie, Plans, Immobilier) : déclinaison de la logique scénique.

### LOT 4 — Motion narratif & Micro-interactions
- [ ] Révélations éditoriales par masques discrets.
- [ ] Transition fluide du wizard devis (slide 200–300 ms sans re-render sec).
  - Test : `src/frontend/components/signature/__tests__/devis-wizard-transition.test.tsx` — les trois étapes partagent un conteneur `data-transition-devis` avec `data-etape` + `data-direction` (avant/arrière), slide `translateX` + fondu sans démontage du formulaire (saisie préservée), coupé en mouvement réduit.
- [ ] Menu mobile : reveal dynamique et fermeture symétrique.
  - Test : `src/frontend/components/layout/__tests__/mobile-nav-transition.test.tsx` — sortie `exit` en miroir de l'entrée (masque + cascade inverse, même courbe `outExpo`), overlay synchronisé, contenu conservé pendant la sortie.
- [ ] Bouton magnétique léger sur le CTA desktop principal uniquement.
  - Test : `src/frontend/components/signature/__tests__/cta-magnetique.test.tsx` — `CtaMagnetique` (nouveau, `hidden lg:block`, `pointer:fine` uniquement) : attraction ≤ 8 px vers le curseur en `transform` pur, retour spring, zéro effet au clavier/tactile/mouvement réduit, CTA enfant intact (href + nom accessible).

### LOT 5 — Matière, Finition & Footer
- [ ] Placeholders images : matière / skeleton ton-sur-ton (zéro rectangle noir).
- [ ] Footer institutionnel de prestige (grille architecturale, coordonnées dynamiques, mentions).
- [ ] Cohérence `color-scheme` et focus-visible adapté à la clarté du fond hôte.

### LOT 6 — Progressive Enhancement
- [ ] Support des `View Transitions` (catalogue plan → fiche plan).

---

## 3. Critères d'Acceptation (Definition of Done)

- 100% des tests passants (vitest) en TDD continu.
- `tsc --noEmit` sans erreur.
- `next build` propre avec First Load JS sous contrôle.
- Contrastes mesurés et conformes WCAG AA.
- Zéro régression responsive (390 px et 1440 px).
