export interface JalonChantier {
  id: string;
  label: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  images?: string[];
}

export const JALONS_CHANTIER: JalonChantier[] = [
  {
    id: "jalon-fouille",
    label: "Fouilles et fondations",
    date: "2025-01-12",
    status: "completed",
    images: ["/photos/journal/04-21_journal-fouille-rigole.png"],
  },
  {
    id: "jalon-ferraillage",
    label: "Ferraillage des semelles",
    date: "2025-02-03",
    status: "completed",
    images: ["/photos/journal/04-22_journal-ferraillage-semelles.png"],
  },
  {
    id: "jalon-plancher",
    label: "Coulage du plancher",
    date: "2025-03-21",
    status: "current",
    images: ["/photos/journal/04-23_journal-coulage-plancher.png"],
  },
  {
    id: "jalon-charpente",
    label: "Charpente et couverture",
    date: "2025-05-08",
    status: "upcoming",
    images: ["/photos/journal/04-24_journal-pose-charpente.png"],
  },
];
