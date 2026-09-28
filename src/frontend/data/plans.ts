import { JALONS_CHANTIER, type JalonChantier } from "./jalons";

export function jalonsDuPlan(_reference: string): JalonChantier[] {
  return JALONS_CHANTIER.map((jalon) => ({ ...jalon }));
}

/** Silhouettes dessinables du catalogue : une liste fermée, jamais `string`. */
export const TYPES_BATIMENT = ["villa", "immeuble", "duplex", "terrain"] as const;

export type TypeBatiment = (typeof TYPES_BATIMENT)[number];

export interface Plan {
  reference: string;
  titre: string;
  /**
   * Type de volume. Le déclarer en `string` ferait perdre au catalogue la
   * garantie que chaque modèle possède un tracé : le composant retomberait
   * alors en silence sur la villa, et deux modèles distincts se confondraient
   * à l'écran.
   */
  typeBatiment: TypeBatiment;
  superficieM2?: number;
  nbNiveaux?: number;
  nbChambres?: number;
  nbSallesDeBain?: number;
  prixFcfa: number;
  description?: string;
  imageUrl: string;
  /**
   * Description de la photo de couverture. Elle est distincte de `imageUrl`
   * parce qu'elle n'est pas décorative : c'est elle que l'on lit à l'oreille
   * pour savoir ce que le modèle montre. Le catalogue, le comparateur et les
   * cartes de scène s'en servent aussi.
   */
  altPhoto: string;
  galerie?: string[];
}

export const PLANS: Plan[] = [
  {
    reference: "ST-VILLA-R1-PAD",
    titre: "Villa R+1 patio padouk",
    typeBatiment: "villa",
    superficieM2: 340,
    nbNiveaux: 2,
    nbChambres: 5,
    nbSallesDeBain: 4,
    prixFcfa: 4500000,
    description:
      "Villa contemporaine R+1 : structure béton armé, menuiseries en padouk et patio ventilé.",
    imageUrl: "/photos/immobilier/04-79_villa-patio-padouk-facade.png",
    altPhoto: "Villa R+1 patio padouk — façade sur patio padouk",
    /*
     * Deux vues réelles du modèle livré : l'extérieur intégré au terrain et le
     * séjour que découvre le visiteur. C'est la preuve que le plan décrit un
     * bâtiment construit, pas une intention.
     */
    galerie: [
      "/photos/immobilier/04-76_villa-achevee-integration-paysagere.png",
      "/photos/immobilier/04-77_sejour-contemporain-lumiere.png",
    ],
  },
  {
    reference: "ST-R4-ODZA-20",
    titre: "Immeuble R+4 vingt logements",
    typeBatiment: "immeuble",
    superficieM2: 1850,
    nbNiveaux: 5,
    nbChambres: 40,
    nbSallesDeBain: 20,
    prixFcfa: 12000000,
    description:
      "Résidence de 20 logements : descente de charges vérifiée, planchers à corps creux, fondations profondes.",
    imageUrl: "/photos/immobilier/04-81_immeuble-odza-facade.png",
    altPhoto: "Immeuble R+4 vingt logements — façade sur rue",
  },
  {
    reference: "ST-DUPLEX-SIM",
    titre: "Duplex jumelé clé en main",
    typeBatiment: "duplex",
    superficieM2: 210,
    nbNiveaux: 2,
    nbChambres: 4,
    nbSallesDeBain: 3,
    prixFcfa: 3800000,
    description:
      "Duplex jumelé livré clé en main : gros œuvre, charpente bois et second œuvre en onze mois.",
    imageUrl: "/photos/immobilier/04-80_duplex-jumele-facade.png",
    altPhoto: "Duplex jumelé clé en main — façade sur jardin",
  },
  {
    reference: "ST-TERRAIN-NSIM",
    titre: "Terrain viabilisé Nsimalen",
    typeBatiment: "terrain",
    superficieM2: 1000,
    prixFcfa: 15000000,
    description:
      "Parcelle viabilisée proche de l'axe Nsimalen, dossier foncier vérifié et bornage joint.",
    imageUrl: "/photos/immobilier/04-49_terrain-nsimalen-bornes.png",
    altPhoto: "Terrain viabilisé Nsimalen — bornage et voie d'accès",
  },
];

export function trouverPlan(reference: string): Plan | undefined {
  return PLANS.find((plan) => plan.reference === reference);
}
