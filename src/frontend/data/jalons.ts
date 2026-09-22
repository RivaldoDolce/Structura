import type { StatutJalon } from "@/frontend/lib/statuts-jalon";

export interface DocumentJalonDemo {
  id: string;
  libelle: string;
  href: string;
  valide: boolean;
}

export interface JalonChantier {
  id: string;
  label: string;
  date: string;
  dateReelle?: string;
  statut: StatutJalon;
  images?: string[];
  responsable?: string;
  duree?: string;
  ecartJours?: number;
  depenseFcfa?: number;
  notes?: string;
  documents?: DocumentJalonDemo[];
}

/**
 * Suivi d'un chantier R+2 à Yaoundé : la colonne vertébrale de la signature
 * produit (audit §8.1). Données de démonstration, mais plausibles et
 * exhaustives — elles couvrent les six états du suivi, du terminé validé au
 * blocage assumé.
 */
export const JALONS_CHANTIER: JalonChantier[] = [
  {
    id: "jalon-fouille",
    label: "Fouilles et fondations",
    date: "2025-01-12",
    dateReelle: "2025-01-13",
    statut: "termine",
    images: ["/photos/journal/04-21_journal-fouille-rigole.png"],
    responsable: "Équipe de 4",
    duree: "3 jours",
    ecartJours: 1,
    depenseFcfa: 850000,
    notes: "Terrassement contrôlé aux cotes, réception du ferraillage en présence du client.",
    documents: [{ id: "pv-fouille", libelle: "PV de réception", href: "/devis", valide: true }],
  },
  {
    id: "jalon-ferraillage",
    label: "Ferraillage des semelles",
    date: "2025-02-03",
    dateReelle: "2025-02-05",
    statut: "en-validation",
    images: ["/photos/journal/04-22_journal-ferraillage-semelles.png"],
    responsable: "Chef de chantier",
    duree: "4 jours",
    ecartJours: 2,
    depenseFcfa: 1200000,
    notes: "Nappes posées selon la note de calcul, enrobage vérifié au gabarit.",
    documents: [
      { id: "nomenclature", libelle: "Nomenclature acier", href: "/devis", valide: true },
      { id: "pv-ferraillage", libelle: "PV de réception", href: "/devis", valide: false },
    ],
  },
  {
    id: "jalon-plancher",
    label: "Coulage du plancher",
    date: "2025-03-21",
    statut: "en-cours",
    images: ["/photos/journal/04-23_journal-coulage-plancher.png"],
    responsable: "Équipe de 6",
    duree: "5 jours",
    depenseFcfa: 2400000,
    notes: "180 m² coulés en une passe, vibration contrôlée et cure humide pendant sept jours.",
  },
  {
    id: "jalon-elevation",
    label: "Élévation des murs",
    date: "2025-04-10",
    statut: "en-retard",
    responsable: "Équipe de 6",
    duree: "10 jours",
    ecartJours: 4,
    depenseFcfa: 1800000,
    notes: "Parpaings bloqués en douane : le fournisseur local prend le relais.",
  },
  {
    id: "jalon-charpente",
    label: "Charpente et couverture",
    date: "2025-05-08",
    statut: "bloque",
    images: ["/photos/journal/04-24_journal-pose-charpente.png"],
    responsable: "Charpentier",
    duree: "6 jours",
    notes: "Fermes assemblées à l'atelier, levage suspendu à la libération du plancher.",
  },
  {
    id: "jalon-finitions",
    label: "Second œuvre et finitions",
    date: "2025-07-01",
    statut: "a-venir",
    notes: "Plomberie, électricité, enduits et peinture.",
  },
];
