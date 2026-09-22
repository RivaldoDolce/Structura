import type { Metadata } from "next";
import Link from "next/link";
import { BandeauAlterne } from "@/frontend/components/sections/bandeau-alterne";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { HeroEnTete } from "@/frontend/components/sections/hero-en-tete";
import { PanneauDonnees } from "@/frontend/components/sections/panneau-donnees";
import { PleinLargeurEditorial } from "@/frontend/components/sections/plein-largeur-editorial";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { FONDS_HEROS } from "@/frontend/data/fonds";

export const metadata: Metadata = {
  title: "Ingénierie structure — STRUCTURA",
  description:
    "Notes de calcul, plans de ferraillage et suivi de chantier à Yaoundé : la rigueur qui porte vos ouvrages.",
};

/*
 * La méthode en quatre étapes : chacune annonce son livrable et sa durée
 * indicative. Les surfaces alternent bleu structure et relevé technique pour
 * que quatre bandeaux successifs ne se confondent pas.
 */
const ETAPES = [
  {
    id: "etude",
    number: "01",
    title: "Étude préalable",
    description:
      "Relevé sur site, analyse du sol et des contraintes d'usage : la structure se dessine avant de se calculer.",
    imageUrl: "/photos/journal/04-21_journal-fouille-rigole.png",
    imageAlt: "Fouilles en rigole et contrôle des cotes",
    deliverables: ["Visite technique", "Esquisse dimensionnée", "Devis ferme — 5 jours"],
    href: "/devis",
    surface: "fond",
  },
  {
    id: "note-calcul",
    number: "02",
    title: "Note de calcul",
    description:
      "Descente de charges, hypothèses sismiques et coefficients de sécurité : chaque valeur est justifiée et signée.",
    imageUrl: "/photos/chantiers/04-02_plan-3d-holographique.png",
    imageAlt: "Maquette structurelle calculée",
    deliverables: ["Descente de charges", "Note signée par l'ingénieur", "10 à 15 jours"],
    href: "/devis",
    surface: "blueprint",
  },
  {
    id: "ferraillage",
    number: "03",
    title: "Plans de ferraillage",
    description:
      "Section de béton, diamètres, espacements et recouvrements : les plans que l'équipe suit sur le terrain.",
    imageUrl: "/photos/journal/04-22_journal-ferraillage-semelles.png",
    imageAlt: "Ferraillage des semelles posé selon les plans",
    deliverables: ["Plans d'exécution", "Nomenclature acier", "5 jours après la note"],
    href: "/devis",
    surface: "fond",
  },
  {
    id: "suivi",
    number: "04",
    title: "Suivi et réception",
    description:
      "Visites à chaque phase sensible, contrôle d'enrobage et procès-verbal de réception à la remise des clés.",
    imageUrl: "/photos/chantiers/04-04_chantier-r2-yaounde.png",
    imageAlt: "Chantier R+2 sous suivi technique",
    deliverables: ["Visites de contrôle", "PV de réception", "Tout au long du chantier"],
    href: "/devis",
    surface: "blueprint",
  },
] satisfies Parameters<typeof BandeauAlterne>[0]["items"];

const CAS = [
  { label: "Ouvrage", valeur: "Immeuble R+2" },
  { label: "Surface", valeur: "620 m²" },
  { label: "Contrainte", valeur: "Terrain en pente" },
  { label: "Délai structure", valeur: "7 mois" },
];

const DOCUMENTS = [
  { label: "Note de calcul", valeur: "Signée et archivée" },
  { label: "Plans de ferraillage", valeur: "Format chantier A1" },
  { label: "Nomenclature acier", valeur: "Quantités vérifiées" },
  { label: "Procès-verbal de réception", valeur: "Remis à la livraison" },
];

export default function PageIngenierie() {
  return (
    <>
      <HeroEnTete
        ariane={<FilAriane items={[{ label: "Ingénierie" }]} />}
        kicker={{ number: "01", label: "INGÉNIERIE" }}
        titre="Ingénierie structure"
        accroche="Descente de charges vérifiée, ferraillage contrôlé à chaque phase, réception documentée. Vos ouvrages tiennent parce qu'ils sont calculés."
        image={FONDS_HEROS.ingenierie}
        alt="Structure en béton armé en cours de construction"
        annotation="NOTE DE CALCUL — BA"
      >
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
        </div>
      </HeroEnTete>

      <BandeauAlterne
        items={ETAPES}
        titre="La méthode, étape par étape"
        accroche="Quatre étapes, quatre livrables : vous savez toujours ce que vous recevez et quand."
        kicker={{ number: "02", label: "MÉTHODE" }}
      />

      <PleinLargeurEditorial
        kicker={{ number: "03", label: "ÉTUDE DE CAS" }}
        titre="Un R+2 sur terrain en pente, en zone sismique modérée"
        accroche="Semelles décalées et voiles repris au contreventement : la pente est devenue un atout structurel."
        image="/photos/chantiers/04-04_chantier-r2-yaounde.png"
        alt="Immeuble R+2 en construction sur terrain en pente"
        legende="CHANTIER R+2 — YAOUNDÉ, 2025"
        fiche={CAS}
      />

      <PanneauDonnees
        kicker={{ number: "04", label: "LIVRABLES" }}
        titre="Les documents que vous recevez"
        accroche="Rien ne reste dans un tiroir : chaque livrable est remis au maître d'ouvrage."
        lignes={DOCUMENTS}
      >
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/devis">Lancer mon étude</Link>
        </ButtonTech>
      </PanneauDonnees>

      <CtaChaud
        kicker={{ number: "05", label: "DÉMARRER" }}
        titre="Un calcul juste coûte moins cher qu'une reprise."
        accroche="Décrivez votre ouvrage : nous vous répondons sous 24 heures ouvrées avec une première estimation."
        actionPrincipale={{ label: "Demander un devis", href: "/devis" }}
      />
    </>
  );
}
