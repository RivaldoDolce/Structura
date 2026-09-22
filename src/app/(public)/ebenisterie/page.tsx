import type { Metadata } from "next";
import Link from "next/link";
import { BandeauAlterne } from "@/frontend/components/sections/bandeau-alterne";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { HeroEnTete } from "@/frontend/components/sections/hero-en-tete";
import { PleinLargeurEditorial } from "@/frontend/components/sections/plein-largeur-editorial";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { essences } from "@/frontend/data/equipe";
import { FONDS_HEROS } from "@/frontend/data/fonds";
import { AtelierEssences } from "./atelier-essences";

export const metadata: Metadata = {
  title: "Ébénisterie d'art — STRUCTURA",
  description:
    "Mobilier sur-mesure en essences locales : padouk, iroko, bubinga, ébène. Conception, fabrication, pose.",
};

/*
 * Le geste en trois temps : la conception se valide avant la première coupe,
 * la finition se décide avant la pose. Les surfaces restent sobres — c'est la
 * photo d'atelier qui porte la chaleur, pas la section.
 */
const GESTE = [
  {
    id: "conception",
    number: "01",
    title: "Conception 3D",
    description:
      "Plans, élévations et vues 3D : vous validez la pièce avant la première coupe, cotes et essences comprises.",
    imageUrl: "/photos/chantiers/04-02_plan-3d-holographique.png",
    imageAlt: "Maquette 3D d'un mobilier sur-mesure",
    deliverables: ["Dessin technique", "Vues 3D cotées", "Validation en 5 jours"],
    href: "/devis",
    surface: "fond",
  },
  {
    id: "fabrication",
    number: "02",
    title: "Fabrication à l'atelier",
    description:
      "Débit, assemblages à tenons et mortaises, collage sous presse : la structure de la pièce est faite pour durer.",
    imageUrl: "/photos/portraits/04-26_equipe-atelier-ebenisterie.png",
    imageAlt: "Équipe d'atelier en cours d'assemblage",
    deliverables: ["Assemblages traditionnels", "Bois séché à l'air", "4 à 8 semaines"],
    href: "/devis",
    surface: "deep",
  },
  {
    id: "finition",
    number: "03",
    title: "Finition et pose",
    description:
      "Ponçage progressif, huile dure ou mat profond, puis pose sur site : la matière reste touchable, jamais plastifiée.",
    imageUrl: "/photos/mobilier/04-03_finition-padouk-atelier.png",
    imageAlt: "Finition à la main d'un plateau de padouk",
    deliverables: ["Finition mate ou huilée", "Pose et réglages", "Garantie deux ans"],
    href: "/devis",
    surface: "fond",
  },
] satisfies Parameters<typeof BandeauAlterne>[0]["items"];

const FICHE_LIT = [
  { label: "Essence", valeur: "Bubinga massif" },
  { label: "Dimensions", valeur: "200 × 180 cm" },
  { label: "Assemblage", valeur: "Tenons et mortaises" },
  { label: "Finition", valeur: "Huile dure mate" },
];

export default function PageEbenisterie() {
  return (
    <>
      <HeroEnTete
        ariane={<FilAriane items={[{ label: "Ébénisterie" }]} />}
        kicker={{ number: "01", label: "ÉBÉNISTERIE" }}
        titre="Ébénisterie d'art"
        accroche="Tables, lits, consoles et boiseries : des essences locales sélectionnées, une finition mate qui traverse les années."
        image={FONDS_HEROS.ebenisterie}
        alt="Atelier d'ébénisterie, bois nobles en cours de façonnage"
        annotation="ATELIER — SUR-MESURE"
      >
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Commander du sur-mesure</Link>
          </ButtonTech>
        </div>
      </HeroEnTete>

      <AtelierEssences essences={essences} />

      <BandeauAlterne
        items={GESTE}
        titre="Du croquis à la pièce posée"
        accroche="Trois temps, trois validations : vous suivez votre pièce comme un chantier."
        kicker={{ number: "03", label: "LE GESTE" }}
      />

      <PleinLargeurEditorial
        kicker={{ number: "04", label: "PIÈCE SIGNATURE" }}
        titre="Lit king size en bubinga"
        accroche="Un plateau de deux mètres, un veinage continu et des assemblages visibles : la pièce assume sa matière."
        image="/photos/mobilier/04-12_lit-king-bubinga.png"
        alt="Lit king size en bubinga dans une chambre"
        legende="ASSEMBLAGE BUBINGA — FINITION HUILE DURE"
        fiche={FICHE_LIT}
      />

      <CtaChaud
        kicker={{ number: "05", label: "SUR-MESURE" }}
        titre="Une pièce unique se dessine en une conversation."
        accroche="Envoyez vos dimensions et vos envies : nous vous proposons un plan et un prix sous 24 heures ouvrées."
        actionPrincipale={{ label: "Commander du sur-mesure", href: "/devis" }}
      />

      <StickyMobileCta label="Commander du sur-mesure" href="/devis" />
    </>
  );
}
