import type { Metadata } from "next";
import Link from "next/link";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { HeroEnTete } from "@/frontend/components/sections/hero-en-tete";
import { PleinLargeurEditorial } from "@/frontend/components/sections/plein-largeur-editorial";
import { SceneGeste, type EtapeGeste } from "@/frontend/components/sections/scene-geste";
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
 * Le geste en trois temps (LOT 3B, V3 §8) : la conception se lit, la
 * fabrication se montre, la finition se touche. Trois grammaires au lieu de
 * trois `BandeauAlterne` 50/50 — le contenu (texte, livrables, photos)
 * reste identique, seule la mise en scène change, en attendant les images
 * premium du guide (`Progression/guide_images_premium_refonte_v3.md`).
 */
const GESTE: [EtapeGeste, EtapeGeste, EtapeGeste] = [
  {
    id: "conception",
    numero: "01",
    titre: "Conception 3D",
    description:
      "Plans, élévations et vues 3D : vous validez la pièce avant la première coupe, cotes et essences comprises.",
    imageUrl: "/photos/mobilier/04-72_selection-materiaux-design-interieur.png",
    imageAlt: "Échantillons d'essences et planche de matières présentés avant validation de la pièce",
    livrables: ["Dessin technique", "Vues 3D cotées", "Validation en 5 jours"],
    href: "/devis",
    hrefLabel: "Valider mon plan",
  },
  {
    id: "fabrication",
    numero: "02",
    titre: "Fabrication à l'atelier",
    description:
      "Débit, assemblages à tenons et mortaises, collage sous presse : la structure de la pièce est faite pour durer.",
    imageUrl: "/photos/mobilier/04-78_atelier-ebenisterie-faconnage.png",
    imageAlt: "Ébéniste d'atelier rabotant une pièce de padouk",
    livrables: ["Assemblages traditionnels", "Bois séché à l'air", "4 à 8 semaines"],
    href: "/devis",
    hrefLabel: "Suivre la fabrication",
  },
  {
    id: "finition",
    numero: "03",
    titre: "Finition et pose",
    description:
      "Ponçage progressif, huile dure ou mat profond, puis pose sur site : la matière reste touchable, jamais plastifiée.",
    imageUrl: "/photos/mobilier/04-03_finition-padouk-atelier.png",
    imageAlt: "Finition à la main d'un plateau de padouk",
    livrables: ["Finition mate ou huilée", "Pose et réglages", "Garantie deux ans"],
    href: "/devis",
    hrefLabel: "Commander la pièce",
  },
];

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

      <SceneGeste
        etapes={GESTE}
        kicker={{ number: "03", label: "LE GESTE" }}
        titre="Du croquis à la pièce posée"
        accroche="Trois temps, trois validations : vous suivez votre pièce comme un chantier."
      />

      <PleinLargeurEditorial
        kicker={{ number: "04", label: "PIÈCE SIGNATURE" }}
        titre="Lit king size en bubinga"
        accroche="Un plateau de deux mètres, un veinage continu et des assemblages visibles : la pièce assume sa matière."
        image="/photos/mobilier/04-59_lit-bubinga-chambre.png"
        alt="Lit king size en bubinga, veinage continu et linge de lin dans une chambre éclairée"
        legende="ASSEMBLAGE BUBINGA — FINITION HUILE DURE"
        fiche={FICHE_LIT}
        lumiere="pale"
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
