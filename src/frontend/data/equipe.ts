export interface EssenceBois {
  id: string;
  nom: string;
  description: string;
  imageUrl: string;
}

export interface EntreeJournal {
  id: string;
  titre: string;
  date: string;
  extrait: string;
  imageUrl: string;
}

export interface MembreEquipe {
  id: string;
  nom: string;
  role: string;
  photoUrl: string;
}

export const essences: EssenceBois[] = [
  {
    id: "padouk",
    nom: "Padouk",
    description:
      "Bois rouge dense, stable et résistant, menuiseries intérieures et mobilier de prestige.",
    imageUrl: "/photos/essences/04-05_macro-bois-padouk.png",
  },
  {
    id: "iroko",
    nom: "Iroko",
    description: "Le « teck africain » : portes, terrasses et ouvrages exposés aux intempéries.",
    imageUrl: "/photos/essences/04-06_macro-essence-iroko.png",
  },
  {
    id: "bubinga",
    nom: "Bubinga",
    description:
      "Veinage profond et dureté remarquable, tables monumentales et pièces d'exception.",
    imageUrl: "/photos/essences/04-08_macro-essence-bubinga.png",
  },
  {
    id: "ebene",
    nom: "Ébène",
    description: "Bois noir précieux, boiseries fines et détails d'ébénisterie d'art.",
    imageUrl: "/photos/essences/04-09_macro-essence-ebene.png",
  },
  {
    id: "ayous",
    nom: "Ayous",
    description: "Bois clair et léger, coffrages, lambris et charpentes intérieures.",
    imageUrl: "/photos/essences/04-10_macro-essence-ayous.png",
  },
];

export const journal: EntreeJournal[] = [
  {
    id: "journal-fouille",
    titre: "Fouilles en rigole — villa Bastos",
    date: "2025-01-12",
    extrait:
      "Terrassement et contrôle des cotes avant coulage des semelles, réception du ferraillage en présence du client.",
    imageUrl: "/photos/journal/04-38_journal-fouille-rigole-matin.png",
  },
  {
    id: "journal-ferraillage",
    titre: "Ferraillage des semelles — R+2",
    date: "2025-02-03",
    extrait:
      "Nappes HA posées selon la note de calcul, enrobage vérifié au gabarit avant bétonnage.",
    imageUrl: "/photos/journal/04-39_journal-ferraillage-gabarit.png",
  },
  {
    id: "journal-plancher",
    titre: "Coulage du plancher — R+4 Odza",
    date: "2025-03-21",
    extrait: "180 m² coulés en une passe, vibration contrôlée et cure humide pendant sept jours.",
    imageUrl: "/photos/journal/04-40_journal-coulage-vibration.png",
  },
  {
    id: "journal-charpente",
    titre: "Pose de la charpente — duplex Simbock",
    date: "2025-05-08",
    extrait:
      "Fermes en bois local assemblées à l'atelier, levage et contreventement en une journée.",
    imageUrl: "/photos/journal/04-41_journal-charpente-levage.png",
  },
];

export const equipe: MembreEquipe[] = [
  {
    id: "ingenieur-structure",
    nom: "Ingénieur structure",
    role: "Calcul et suivi de chantier",
    photoUrl: "/photos/portraits/04-60_portrait-ingenieur-casque-plan.png",
  },
  {
    id: "atelier-ebenisterie",
    nom: "Ébéniste d'atelier",
    role: "Mobilier sur-mesure en essences locales",
    photoUrl: "/photos/portraits/04-61_portrait-ebeniste-rabot.png",
  },
  {
    id: "chef-chantier",
    nom: "Conductrice de travaux",
    role: "Exécution et réception des ouvrages",
    photoUrl: "/photos/portraits/04-62_portrait-conductrice-travaux.png",
  },
];
