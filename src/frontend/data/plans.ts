import { JALONS_CHANTIER, type JalonChantier } from "./jalons";

export function jalonsDuPlan(_reference: string): JalonChantier[] {
  return JALONS_CHANTIER.map((jalon) => ({ ...jalon }));
}

export interface Plan {
  reference: string;
  titre: string;
  typeBatiment: string;
  superficieM2?: number;
  nbNiveaux?: number;
  nbChambres?: number;
  nbSallesDeBain?: number;
  prixFcfa: number;
  description?: string;
  imageUrl: string;
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
    imageUrl: "/photos/immobilier/04-15_villa-bastos-nuit.png",
    galerie: ["/photos/chantiers/04-02_plan-3d-holographique.png"],
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
    imageUrl: "/photos/immobilier/04-16_immeuble-r4-odza.png",
    galerie: ["/photos/chantiers/04-04_chantier-r2-yaounde.png"],
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
    imageUrl: "/photos/immobilier/04-17_duplex-simbock.png",
  },
  {
    reference: "ST-TERRAIN-NSIM",
    titre: "Terrain viabilisé Nsimalen",
    typeBatiment: "terrain",
    superficieM2: 1000,
    prixFcfa: 15000000,
    description:
      "Parcelle viabilisée proche de l'axe Nsimalen, dossier foncier vérifié et bornage joint.",
    imageUrl: "/photos/immobilier/04-18_terrain-nsimalen.png",
  },
];

export const TYPES_BATIMENT = ["villa", "immeuble", "duplex", "terrain"] as const;

export type TypeBatiment = (typeof TYPES_BATIMENT)[number];

export function trouverPlan(reference: string): Plan | undefined {
  return PLANS.find((plan) => plan.reference === reference);
}
