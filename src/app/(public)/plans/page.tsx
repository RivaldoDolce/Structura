import type { Metadata } from "next";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { HeroEnTete } from "@/frontend/components/sections/hero-en-tete";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { FONDS_HEROS } from "@/frontend/data/fonds";
import { PLANS } from "@/frontend/data/plans";
import { CataloguePlans } from "./catalogue-plans";

export const metadata: Metadata = {
  title: "Catalogue de plans — STRUCTURA",
  description:
    "Plans de villas, immeubles et duplex prêts à construire, adaptables à votre terrain.",
};

export default function PagePlans() {
  return (
    <>
      <HeroEnTete
        ariane={<FilAriane items={[{ label: "Plans" }]} />}
        kicker={{ number: "01", label: "PLANS" }}
        titre="Catalogue de plans"
        accroche="Des modèles prêts à construire, calculés et adaptables à votre terrain — livrés avec leur dossier de permis."
        image={FONDS_HEROS.plans}
        alt="Plan architectural en cours de tracé"
        annotation="DOSSIER COMPLET"
      />

      <CataloguePlans plans={PLANS} />

      <CtaChaud
        kicker={{ number: "03", label: "ADAPTER" }}
        titre="Un plan n'est jamais posé sur le mauvais terrain."
        accroche="Envoyez la référence du plan et les dimensions de votre parcelle : nous chiffrons l'adaptation sous 24 heures ouvrées."
        actionPrincipale={{ label: "Demander l'adaptation", href: "/devis" }}
      />
    </>
  );
}
