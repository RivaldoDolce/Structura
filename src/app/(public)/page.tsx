import type { Metadata } from "next";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { FonduPlanPhoto } from "@/frontend/components/sections/fondu-plan-photo";
import { Hero } from "@/frontend/components/sections/hero";
import { MosaiqueAsymetrique } from "@/frontend/components/sections/mosaique-asymetrique";
import { PleinLargeurEditorial } from "@/frontend/components/sections/plein-largeur-editorial";
import { SceneEbenisterie } from "@/frontend/components/sections/scene-ebenisterie";
import { SceneImmobilier } from "@/frontend/components/sections/scene-immobilier";
import { SceneIngenierie } from "@/frontend/components/sections/scene-ingenierie";
import { ScenePlans } from "@/frontend/components/sections/scene-plans";
import { StatistiquesSourcees } from "@/frontend/components/sections/statistiques-sourcees";
import { TimelineHorizontale } from "@/frontend/components/sections/timeline-horizontale";
import { BeforeAfter } from "@/frontend/components/signature/before-after";
import { JALONS_CHANTIER } from "@/frontend/data/jalons";
import { PLANS } from "@/frontend/data/plans";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import { numeroInternational } from "@/frontend/lib/sanitize";

export const metadata: Metadata = {
  title: "STRUCTURA — L'ingénierie qui construit en confiance",
  description:
    "Ingénierie structure, ébénisterie d'art et immobilier à Yaoundé : calculs, plans, mobilier sur-mesure et réalisations livrées clé en main.",
  alternates: { canonical: "/" },
};

/*
 * Acte 2 — la preuve chiffrée. Chaque chiffre porte sa source : sans elle, un
 * chiffre reste une affirmation marketing (audit §6.1).
 */
const CHIFFRES = [
  {
    value: 150,
    suffix: "+",
    label: "Projets livrés",
    source: "Depuis 2014, à Yaoundé et dans sept régions",
  },
  {
    value: 12,
    label: "Années d'expérience",
    source: "Bureau d'études intégré, ingénieurs salariés",
  },
  {
    value: 98,
    suffix: " %",
    label: "Clients satisfaits",
    source: "Relevé à la réception des ouvrages, 2025",
  },
  {
    value: 24,
    label: "Chantiers en cours",
    source: "Suivi quotidien : photo, note et dépense",
  },
];

/*
 * Acte 3 — quatre métiers, quatre scènes : chacun sa lumière et sa géométrie
 * (plan V2 §5). Les contenus restent ceux des données et des pages métier,
 * seule la mise en scène change.
 */
const POINTS_INGENIERIE = [
  { valeur: "Calcul", label: "Note vérifiée" },
  { valeur: "Ferraillage", label: "Plans cotés" },
  { valeur: "Suivi", label: "Réception documentée" },
];

const VERIFICATIONS_IMMOBILIER = [
  "Titre foncier vérifié",
  "Structure calculée",
  "Permis de bâtir OK",
];

/*
 * Acte 5 — le chantier en direct : les quatre premiers jalons réels, dans
 * l'ordre du terrain. Le reste du suivi vit sur la fiche du projet.
 */
const JALONS_VITRINE = JALONS_CHANTIER.slice(0, 4).map((jalon) => ({
  id: jalon.id,
  label: jalon.label,
  date: jalon.date,
  statut: jalon.statut,
  imageUrl: jalon.images?.[0] ?? "/photos/journal/04-21_journal-fouille-rigole.png",
  alt: `${jalon.label} — photo de chantier`,
}));

/** Acte 4 — quatre projets, quatre morphologies de carte. */
const REALISATIONS = PROJETS_PORTFOLIO.slice(0, 4).map((projet) => ({
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

/**
 * Lien de discussion de la double entrée : construit depuis le numéro
 * d'environnement, assaini par le même utilitaire que le bouton flottant.
 * Sans numéro valide, l'action secondaire n'est simplement pas proposée —
 * jamais de lien « wa.me » tronqué.
 */
function lienWhatsApp(): string | null {
  const numero = numeroInternational(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
  if (!numero) return null;
  const message = encodeURIComponent("Bonjour, je souhaite un devis STRUCTURA");
  return `https://wa.me/${numero.slice(1)}?text=${message}`;
}

/*
 * Accueil en sept actes (audit §6.1) : chaque acte a sa morphologie, sa
 * surface et son ratio ; deux actes voisins ne se ressemblent jamais. L'ordre
 * est verrouillé par un test de composition.
 */
export default function PageAccueil() {
  const whatsapp = lienWhatsApp();

  return (
    <>
      {/* 1 — Le plan s'éveille : fond blueprint AVIF et tracé au scroll */}
      <Hero />

      {/* 2 — La preuve chiffrée : première respiration claire du récit */}
      <StatistiquesSourcees
        chiffres={CHIFFRES}
        titre="Une expertise qui se mesure"
        accroche="Nos chiffres viennent du terrain, pas d'une plaquette."
        lumiere="pale"
      />

      {/* 3 — Quatre métiers, quatre scènes : ivoire, warm, pâle, sombre */}
      <SceneIngenierie
        kicker={{ number: "03", label: "INGÉNIERIE" }}
        titre="Des ouvrages calculés, pas devinés"
        accroche="Descente de charges, notes de calcul et plans de ferraillage vérifiés avant le premier sac de ciment."
        imageUrl="/photos/chantiers/04-04_chantier-r2-yaounde.png"
        imageAlt="Chantier R+2 en cours d'élévation à Yaoundé"
        points={POINTS_INGENIERIE}
        href="/ingenierie"
        hrefLabel="Découvrir l'ingénierie"
      />
      <SceneEbenisterie
        kicker={{ number: "04", label: "ÉBÉNISTERIE" }}
        essence="Padouk"
        description="Mobilier sur-mesure en essences locales sélectionnées, assemblé et fini à l'atelier de Yaoundé."
        imageUrl="/photos/essences/04-05_macro-bois-padouk.png"
        imageAlt="Veinage serré d'un plateau de padouk"
        badge="Atelier Yaoundé"
        href="/ebenisterie"
        hrefLabel="Voir l'atelier"
      />
      <ScenePlans
        kicker={{ number: "05", label: "PLANS" }}
        titre="Des modèles prêts à construire"
        accroche="Adaptés à votre terrain, déposés pour le permis de bâtir."
        plans={PLANS.slice(0, 3).map((plan) => ({
          reference: plan.reference,
          titre: plan.titre,
          prixFcfa: plan.prixFcfa,
          imageUrl: plan.imageUrl,
        }))}
        href="/plans"
        hrefLabel="Explorer le catalogue"
      />
      <SceneImmobilier
        kicker={{ number: "06", label: "IMMOBILIER" }}
        titre="Des biens vérifiés, pas des promesses"
        accroche="Villas, immeubles et terrains contrôlés — foncier, structure, finitions — jusqu'à la remise des clés."
        imageUrl="/photos/immobilier/04-15_villa-bastos-nuit.png"
        verifications={VERIFICATIONS_IMMOBILIER}
        actionPrincipale={{ label: "Voir les biens", href: "/immobilier" }}
      />

      {/* 4 — Trois histoires construites */}
      <MosaiqueAsymetrique
        items={REALISATIONS}
        kicker={{ number: "07", label: "PORTFOLIO" }}
        titre="Trois histoires construites"
        accroche="Chaque projet est une contrainte résolue, livrée quelque part au Cameroun."
      />

      {/* 5 — Le chantier en direct : vitrine du suivi client */}
      <TimelineHorizontale
        jalons={JALONS_VITRINE}
        kicker={{ number: "08", label: "JOURNAL" }}
        titre="Le chantier en direct"
        accroche="Fouilles, ferraillage, coulage, charpente : chaque étape est datée et photographiée."
        promesse="Votre suivi, jour après jour — du premier coup de pioche à la remise des clés."
        fondu={
          <FonduPlanPhoto
            photoSrc="/photos/chantiers/04-04_chantier-r2-yaounde.png"
            photoAlt="Chantier R+2 en cours d'élévation à Yaoundé"
          />
        }
      />

      {/* 6 — La méthode, démontrée sur un cas réel : le papier revient avant la clôture */}
      <PleinLargeurEditorial
        kicker={{ number: "09", label: "MÉTHODE" }}
        titre="Réparation structurelle à Mokolo"
        accroche="Reprise en sous-œuvre d'un bâtiment fissuré, sans interrompre l'activité du rez-de-chaussée."
        legende="COTE PRÉVUE / RÉALISATION — MOKOLO, YAOUNDÉ"
        lumiere="pale"
        media={
          <BeforeAfter
            beforeImage="/photos/avant-apres/04-19_avant-batiment-fissure-mokolo.png"
            afterImage="/photos/avant-apres/04-20_apres-batiment-repare-mokolo.png"
            className="p-4 md:p-6"
          />
        }
      />

      {/* 7 — Le devis en deux minutes */}
      <CtaChaud
        kicker={{ number: "10", label: "DÉMARRER" }}
        titre="Votre projet mérite un calcul juste et une finition noble."
        accroche="Décrivez votre besoin en deux minutes : nous revenons vers vous sous 24 heures ouvrées."
        actionPrincipale={{ label: "Demander un devis gratuit", href: "/devis" }}
        actionSecondaire={whatsapp ? { label: "Écrire sur WhatsApp", href: whatsapp } : undefined}
      />
    </>
  );
}
