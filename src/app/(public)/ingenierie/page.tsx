import type { Metadata } from "next";
import Link from "next/link";
import { SceneEtudePrealable } from "@/frontend/components/sections/scene-etude-prealable";
import { SceneFerraillage } from "@/frontend/components/sections/scene-ferraillage";
import { SceneNoteCalcul } from "@/frontend/components/sections/scene-note-calcul";
import { SceneSuiviReception } from "@/frontend/components/sections/scene-suivi-reception";
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
 * La méthode en quatre scènes différenciées (V3 §7.3 à §7.6). Chacune a sa
 * propre grammaire : la donnée ci-dessous est celle de la scène, pas un
 * générique réutilisé quatre fois. Chaque acte porte un rapport
 * dominant et une lumière distincts — c'est ce qui interdit la répétition
 * mécanique du 50/50 alterné, contrôlé par un test de composition.
 */
const ETUDE_PREALABLE = {
  numero: "02",
  titre: "Étude préalable",
  accroche:
    "Relevé sur site, analyse du sol et des contraintes d'usage : la structure se dessine avant de se calculer.",
  imageUrl: "/photos/journal/04-38_journal-fouille-rigole-matin.png",
  imageAlt: "Fouilles en rigole alignées au cordeau, cotes contrôlées avant coulage des semelles",
  preuves: [
    { label: "Contrainte", valeur: "Terrain en pente" },
    { label: "Sol", valeur: "Argile ferme, 2,1 m" },
    { label: "Zone sismique", valeur: "Modérée" },
  ],
  livrables: ["Visite technique", "Esquisse dimensionnée", "Devis ferme — 5 jours"],
  href: "/devis",
  hrefLabel: "Lancer mon étude",
} satisfies Parameters<typeof SceneEtudePrealable>[0];

const NOTE_CALCUL = {
  numero: "03",
  titre: "Note de calcul",
  accroche:
    "Descente de charges, hypothèses sismiques et coefficients de sécurité : chaque valeur est justifiée et signée.",
  imageUrl: "/photos/chantiers/04-70_bureau-etude-conception-3d.png",
  imageAlt: "Bureau d'études STRUCTURA : conception du modèle et des plans de ferraillage",
  cotes: [
    { terme: "Charge permanente", valeur: "12,4 kN/m²" },
    { terme: "Charge d'exploitation", valeur: "2,5 kN/m²" },
    { terme: "Séisme", valeur: "0,12 g" },
    { terme: "Béton", valeur: "C25/30" },
  ],
  annotation: "NOTE N° 2025-014 — SIGNÉE",
  href: "/devis",
  hrefLabel: "Consulter la note type",
} satisfies Parameters<typeof SceneNoteCalcul>[0];

const FERRAILLAGE = {
  numero: "04",
  phrase:
    "Semelles de 40 × 40, nappe inférieure HA10 tous les 15 cm, enrobage 5 cm au gabarit.",
  titre: "Plans de ferraillage",
  accroche:
    "Section de béton, diamètres, espacements et recouvrements : les plans que l'équipe suit sur le terrain.",
  cotes: ["Semelles 40×40", "HA10 @ 15 cm", "Enrobage 5 cm", "Recouvrement 50 Ø"],
} satisfies Parameters<typeof SceneFerraillage>[0];

const SUIVI_RECEPTION = {
  numero: "05",
  titre: "Suivi et réception",
  accroche:
    "Visites à chaque phase sensible, contrôle d'enrobage et procès-verbal de réception à la remise des clés.",
  imageUrl: "/photos/chantiers/04-45_suivi-controle-enrobage.png",
  imageAlt: "Contrôle de l'enrobage des aciers au gabarit, carnet de suivi à la main",
  suivi: [
    { label: "Phase", valeur: "Élévation" },
    { label: "Enrobage", valeur: "5 cm vérifié" },
    { label: "Visites", valeur: "6 à ce jour" },
  ],
  href: "/devis",
  hrefLabel: "Demander un suivi",
} satisfies Parameters<typeof SceneSuiviReception>[0];

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

      <SceneEtudePrealable {...ETUDE_PREALABLE} />

      <SceneNoteCalcul {...NOTE_CALCUL} />

      <SceneFerraillage {...FERRAILLAGE} />

      <SceneSuiviReception {...SUIVI_RECEPTION} />

      <PleinLargeurEditorial
        kicker={{ number: "06", label: "ÉTUDE DE CAS" }}
        titre="Un R+2 sur terrain en pente, en zone sismique modérée"
        accroche="Semelles décalées et voiles repris au contreventement : la pente est devenue un atout structurel."
        image="/photos/chantiers/04-31_chantier-r2-matin-dore.png"
        alt="Ossature R+2 au petit matin : poteaux coulés, coffrages et échafaudages en place"
        legende="CHANTIER R+2 — YAOUNDÉ, 2025"
        fiche={CAS}
        lumiere="sombre"
      />

      <PanneauDonnees
        kicker={{ number: "07", label: "LIVRABLES" }}
        titre="Les documents que vous recevez"
        accroche="Rien ne reste dans un tiroir : chaque livrable est remis au maître d'ouvrage."
        lignes={DOCUMENTS}
        lumiere="pale"
      >
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/devis">Lancer mon étude</Link>
        </ButtonTech>
      </PanneauDonnees>

      <CtaChaud
        kicker={{ number: "08", label: "DÉMARRER" }}
        titre="Un calcul juste coûte moins cher qu'une reprise."
        accroche="Décrivez votre ouvrage : nous vous répondons sous 24 heures ouvrées avec une première estimation."
        actionPrincipale={{ label: "Demander un devis", href: "/devis" }}
      />
    </>
  );
}
