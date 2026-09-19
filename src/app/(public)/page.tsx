import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/frontend/components/sections/hero";
import { Portfolio } from "@/frontend/components/sections/portfolio";
import { Services } from "@/frontend/components/sections/services";
import { Stats } from "@/frontend/components/sections/stats";
import { BeforeAfter } from "@/frontend/components/signature/before-after";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";

export const metadata: Metadata = {
  title: "STRUCTURA — L'ingénierie qui construit en confiance",
  description:
    "Ingénierie structure, ébénisterie d'art et immobilier à Yaoundé : calculs, plans, mobilier sur-mesure et réalisations livrées clé en main.",
};

const EXPERTISES: Parameters<typeof Services>[0]["services"] = [
  {
    id: "ingenierie",
    number: "01",
    title: "Ingénierie structure",
    description: "Notes de calcul, plans de ferraillage et suivi de chantier.",
    icon: "building",
    deliverables: ["Note de calcul", "Plans de ferraillage", "Réception technique"],
    href: "/ingenierie",
  },
  {
    id: "ebenisterie",
    number: "02",
    title: "Ébénisterie d'art",
    description: "Mobilier sur-mesure en essences locales, finition premium.",
    icon: "hammer",
    deliverables: ["Conception 3D", "Fabrication atelier", "Pose"],
    href: "/ebenisterie",
  },
  {
    id: "plans",
    number: "03",
    title: "Plans de construction",
    description: "Catalogue de plans prêts à construire, adaptables au terrain.",
    icon: "ruler",
    deliverables: ["Dossier complet", "Adaptation terrain", "Dépôt permis"],
    href: "/plans",
  },
  {
    id: "immobilier",
    number: "04",
    title: "Immobilier clé en main",
    description: "Villas, immeubles et terrains vérifiés, livrés à Yaoundé.",
    icon: "home",
    deliverables: ["Sélection vérifiée", "Accompagnement notaire", "Remise des clés"],
    href: "/immobilier",
  },
];

export default function PageAccueil() {
  return (
    <>
      <Hero />
      <Stats />
      <Services services={EXPERTISES} />
      <Portfolio projects={PROJETS_PORTFOLIO.slice(0, 3)} />
      <BeforeAfter
        beforeImage="/photos/avant-apres/04-19_avant-batiment-fissure-mokolo.png"
        afterImage="/photos/avant-apres/04-20_apres-batiment-repare-mokolo.png"
      />
      <section aria-label="Appel à l'action" className="mx-auto max-w-content px-4 py-24 md:px-6">
        <Kicker number="05" label="DÉMARRER" className="mb-4" />
        <h2 className="max-w-2xl font-display text-h2 font-bold text-[var(--color-ink)]">
          Votre projet mérite un calcul juste et une finition noble.
        </h2>
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis gratuit</Link>
          </ButtonTech>
        </div>
      </section>
    </>
  );
}
