export interface User {
  id: string;
  email: string;
  telephone?: string;
  nom: string;
  prenom?: string;
  role: "CLIENT" | "CHEF_DE_PROJET" | "ADMIN" | "SUPER_ADMIN";
  pays?: string;
  avatarUrl?: string;
}

export interface Plan {
  id: string;
  reference: string;
  titre: string;
  typeBatiment: string;
  superficieM2?: number;
  nbNiveaux?: number;
  nbChambres?: number;
  prixFcfa: number;
  description?: string;
  caracteristiques?: Record<string, unknown>;
  fichierApercuUrl?: string;
  images?: string[];
  publie: boolean;
  nbVentes: number;
}

export interface ProduitEbenisterie {
  id: string;
  reference: string;
  nom: string;
  essenceBois: string;
  prixBaseFcfa: number;
  options?: Record<string, unknown>;
  description?: string;
  dimensions?: Record<string, unknown>;
  images?: string[];
  publie: boolean;
}

export interface BienImmobilier {
  id: string;
  reference: string;
  titre: string;
  type: "VENTE" | "LOCATION";
  localisation: string;
  prixFcfa: number;
  surfaceM2?: number;
  nbPieces?: number;
  nbChambres?: number;
  documentsJuridiques?: Record<string, unknown>;
  description?: string;
  images?: string[];
  publie: boolean;
}

export interface Commande {
  id: string;
  reference: string;
  userId: string;
  type: "PLAN" | "MEUBLE" | "ACOMPTE_CHANTIER";
  montantTotalFcfa: number;
  montantPayeFcfa: number;
  statut: "EN_ATTENTE" | "PAYE" | "LIVRE" | "ANNULE" | "REMBOURSE";
  details?: Record<string, unknown>;
  creeLe: string;
}

export interface Chantier {
  id: string;
  reference: string;
  userId: string;
  titre: string;
  localisation: string;
  phaseActuelle: string;
  pourcentageAvancement: number;
  budgetTotal?: number;
  dateDebut?: string;
  dateFinPrevue?: string;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
