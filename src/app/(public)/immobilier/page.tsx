import type { Metadata } from "next";
import Link from "next/link";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { HeroEnTete } from "@/frontend/components/sections/hero-en-tete";
import { MosaiqueAsymetrique } from "@/frontend/components/sections/mosaique-asymetrique";
import { PanneauDonnees } from "@/frontend/components/sections/panneau-donnees";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { FONDS_HEROS } from "@/frontend/data/fonds";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";

export const metadata: Metadata = {
  title: "Immobilier — STRUCTURA",
  description:
    "Villas, immeubles et terrains vérifiés à Yaoundé : sélection, accompagnement, remise des clés.",
};

/* Les biens livrés portent leur surface : c'est le critère de sélection. */
const BIENS = PROJETS_PORTFOLIO.filter((projet) => projet.surface !== undefined).map((projet) => ({
  id: projet.id,
  title: projet.title,
  description: projet.description,
  imageUrl: projet.imageUrl,
  alt: projet.title,
  location: projet.location,
  year: projet.year,
  surface: projet.surface,
  href: `/portfolio/${projet.slug}`,
}));

/*
 * Ce que nous vérifions avant de proposer un bien : chaque contrôle engage
 * notre responsabilité, il est donc écrit noir sur blanc.
 */
const VERIFICATIONS = [
  { label: "Titre foncier", valeur: "Vérifié au cadastre" },
  { label: "Structure", valeur: "Contrôle visuel et calculs" },
  { label: "Second œuvre", valeur: "Plomberie, électricité, étanchéité" },
  { label: "Environnement", valeur: "Accès, pente, drainage du terrain" },
  { label: "Charges et taxes", valeur: "Estimées avant l'offre" },
  { label: "Transcription", valeur: "Accompagnement chez le notaire" },
];

export default function PageImmobilier() {
  return (
    <>
      <HeroEnTete
        ariane={<FilAriane items={[{ label: "Immobilier" }]} />}
        kicker={{ number: "01", label: "IMMOBILIER" }}
        titre="Immobilier clé en main"
        accroche="Biens vérifiés — foncier, structure, finitions — puis accompagnement jusqu'à la remise des clés."
        image={FONDS_HEROS.immobilier}
        alt="Villa contemporaine de nuit à Yaoundé"
        annotation="SÉLECTION VÉRIFIÉE"
      >
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/contact">Prendre contact</Link>
          </ButtonTech>
        </div>
      </HeroEnTete>

      <MosaiqueAsymetrique
        items={BIENS}
        kicker={{ number: "02", label: "BIENS DISPONIBLES" }}
        titre="Des biens que nous avons visités avant vous"
        accroche="Villas, immeubles et duplex livrés : chaque bien présenté ici a été contrôlé sur place."
      />

      <PanneauDonnees
        kicker={{ number: "03", label: "VÉRIFICATION" }}
        titre="Six contrôles avant toute proposition"
        accroche="Un bien qui ne passe pas ces six contrôles ne vous est jamais présenté."
        lignes={VERIFICATIONS}
        lumiere="pale"
      >
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/contact">Faire vérifier un bien</Link>
        </ButtonTech>
      </PanneauDonnees>

      <CtaChaud
        kicker={{ number: "04", label: "ACHETER" }}
        titre="Acheter en confiance, ou ne pas acheter du tout."
        accroche="Dites-nous ce que vous cherchez : nous vous répondons sous 24 heures ouvrées."
        actionPrincipale={{ label: "Prendre contact", href: "/contact" }}
      />
    </>
  );
}
