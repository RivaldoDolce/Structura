import type { Metadata } from "next";
import { Hero } from "@/frontend/components/sections/hero";
import { Portfolio } from "@/frontend/components/sections/portfolio";
import type { PortfolioProject } from "@/frontend/components/sections/portfolio";
import { Services } from "@/frontend/components/sections/services";
import type { ServiceItem } from "@/frontend/components/sections/services";
import { Stats } from "@/frontend/components/sections/stats";
import { BeforeAfter } from "@/frontend/components/signature/before-after";
import { JalonTimeline } from "@/frontend/components/signature/jalon-timeline";
import type { Jalon } from "@/frontend/components/signature/jalon-timeline";
import { WatermarkPreview } from "@/frontend/components/signature/watermark-preview";

// Galerie interne de validation visuelle : jamais indexée.
export const metadata: Metadata = {
  title: "Démonstration des sections",
  robots: { index: false, follow: false },
};

const PROJETS_DEMO: PortfolioProject[] = [
  {
    id: "demo-villa",
    title: "Villa Moderne Douala",
    description: "Villa contemporaine de standing, gros œuvre et finitions.",
    imageUrl: "/photos/chantiers/04-04_chantier-r2-yaounde.png",
    location: "Douala",
    year: "2024",
    surface: "320 m²",
    slug: "villa-moderne-douala",
  },
  {
    id: "demo-dalle",
    title: "Coulage de dalle",
    description: "Plancher béton armé contrôlé à chaque phase.",
    imageUrl: "/photos/chantiers/04-01_coulage-dalle-beton.png",
    location: "Yaoundé",
    year: "2024",
    surface: "180 m²",
    slug: "coulage-dalle",
  },
  {
    id: "demo-hologramme",
    title: "Maquette 3D",
    description: "Projection holographique du projet avant travaux.",
    imageUrl: "/photos/chantiers/04-02_plan-3d-holographique.png",
    location: "Yaoundé",
    year: "2025",
    surface: "—",
    slug: "maquette-3d",
  },
];

const EXPERTISES_DEMO: ServiceItem[] = [
  {
    id: "demo-ingenierie",
    number: "01",
    title: "Ingénierie structure",
    description: "Notes de calcul, plans de ferraillage et suivi de chantier.",
    icon: "building",
    deliverables: ["Note de calcul", "Plans de ferraillage", "Réception technique"],
    href: "/ingenierie",
  },
  {
    id: "demo-ebenisterie",
    number: "02",
    title: "Ébénisterie d'art",
    description: "Mobilier sur-mesure en essences locales, finition premium.",
    icon: "hammer",
    deliverables: ["Conception 3D", "Fabrication", "Pose"],
    href: "/ebenisterie",
  },
];

const JALONS_DEMO: Jalon[] = [
  { id: "etude", label: "Étude", date: "2025-01-15", status: "completed", notes: "Plans validés" },
  { id: "fondations", label: "Fondations", date: "2025-03-02", status: "current" },
  { id: "elevation", label: "Élévation", date: "2025-06-20", status: "upcoming" },
];

// Page d'atelier : assemblage réel des sections et primitifs avec des
// visuels existants, pour valider le rendu avant les pages publiques.
export default function DemoSectionsPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Portfolio projects={PROJETS_DEMO} />
      <Services services={EXPERTISES_DEMO} />

      <section
        aria-label="Démonstration des primitifs"
        className="max-w-content mx-auto space-y-16 px-4 py-24 md:px-6"
      >
        <JalonTimeline jalons={JALONS_DEMO} />
        <BeforeAfter
          beforeImage="/photos/avant-apres/04-19_avant-batiment-fissure-mokolo.png"
          afterImage="/photos/avant-apres/04-20_apres-batiment-repare-mokolo.png"
        />
        <WatermarkPreview
          imageUrl="/photos/chantiers/04-04_chantier-r2-yaounde.png"
          watermarkText="STRUCTURA DÉMO"
        />
      </section>
    </>
  );
}
