import type { PortfolioProject } from "@/frontend/components/sections/portfolio";

/**
 * Réalisations affichées dans le portfolio et sur l'accueil.
 * Données de démonstration : remplacées par la base au branchement backend,
 * les formes sont déjà celles des sections du design system.
 */
export const PROJETS_PORTFOLIO: PortfolioProject[] = [
  {
    id: "villa-bastos",
    title: "Villa Bastos",
    description:
      "Villa contemporaine R+1, structure béton armé calculée en zone sismique modérée, menuiseries sur-mesure en padouk.",
    imageUrl: "/photos/immobilier/04-15_villa-bastos-nuit.png",
    location: "Bastos, Yaoundé",
    year: "2025",
    surface: "340 m²",
    slug: "villa-bastos-yaounde",
  },
  {
    id: "immeuble-odza",
    title: "Immeuble R+4 Odza",
    description:
      "Résidence de 20 logements, descente de charges vérifiée, planchers à corps creux et fondations profondes.",
    imageUrl: "/photos/immobilier/04-16_immeuble-r4-odza.png",
    location: "Odza, Yaoundé",
    year: "2024",
    surface: "1 850 m²",
    slug: "immeuble-r4-odza",
  },
  {
    id: "duplex-simbock",
    title: "Duplex Simbock",
    description:
      "Duplex jumelé livré clé en main : gros œuvre, charpente bois et second œuvre en onze mois.",
    imageUrl: "/photos/immobilier/04-17_duplex-simbock.png",
    location: "Simbock, Yaoundé",
    year: "2024",
    surface: "210 m²",
    slug: "duplex-simbock",
  },
  {
    id: "coulage-dalle",
    title: "Coulage de dalle — R+2",
    description:
      "Plancher béton armé de 180 m² contrôlé à chaque phase : ferraillage, reprise de bétonnage, cure.",
    imageUrl: "/photos/chantiers/04-01_coulage-dalle-beton.png",
    location: "Yaoundé",
    year: "2025",
    surface: "180 m²",
    slug: "coulage-dalle-r2",
  },
  {
    id: "reparation-mokolo",
    title: "Réparation structurelle Mokolo",
    description:
      "Reprise en sous-œuvre et confinement d'un bâtiment fissuré, sans interrompre l'activité du rez-de-chaussée.",
    imageUrl: "/photos/avant-apres/04-20_apres-batiment-repare-mokolo.png",
    location: "Mokolo, Yaoundé",
    year: "2023",
    slug: "reparation-mokolo",
  },
  {
    id: "table-reunion-padouk",
    title: "Mobilier de bureau en padouk",
    description:
      "Table de réunion de douze places et console d'accueil, essences locales selecting et finition mate.",
    imageUrl: "/photos/mobilier/04-11_table-reunion-padouk.png",
    location: "Atelier, Yaoundé",
    year: "2024",
    slug: "mobilier-bureau-padouk",
  },
];
