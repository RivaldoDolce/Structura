import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, FileText, Lock, MessageCircle } from "lucide-react";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { CtaChaud } from "@/frontend/components/sections/cta-chaud";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { PanneauDonnees } from "@/frontend/components/sections/panneau-donnees";
import { PriceTag } from "@/frontend/components/signature/price-tag";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { WatermarkPreview } from "@/frontend/components/signature/watermark-preview";
import { numeroInternational } from "@/frontend/lib/sanitize";
import { PLANS, trouverPlan } from "@/frontend/data/plans";

export function generateStaticParams() {
  return PLANS.map((plan) => ({ reference: plan.reference }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  const plan = trouverPlan(reference);
  return {
    title: plan ? `${plan.titre} — STRUCTURA` : "Plan introuvable — STRUCTURA",
    description: plan?.description,
    alternates: { canonical: `/plans/${reference}` },
    openGraph: plan
      ? {
          title: `${plan.titre} — STRUCTURA`,
          description: plan.description,
          images: [{ url: plan.imageUrl }],
        }
      : undefined,
  };
}

const TAUX_EUR = 655.957;

/*
 * Contenu contractuel du dossier : identique pour chaque plan, car c'est la
 * méthode STRUCTURA qui est vendue autant que le modèle. Toute pièce ajoutée
 * ici doit exister dans le livrable réel.
 */
const DOCUMENTS_DOSSIER = [
  {
    titre: "Plans d'architecture",
    detail: "Façades, coupes et plan masse en PDF et format A1.",
  },
  {
    titre: "Plans de ferraillage",
    detail: "Semelles, poteaux et planchers, armatures cotées.",
  },
  {
    titre: "Charpente et couverture",
    detail: "Débits, assemblages et sens de pose.",
  },
  {
    titre: "Devis quantitatif estimatif",
    detail: "Quantités par lot pour chiffrer avec les artisans.",
  },
  {
    titre: "Note de calcul",
    detail: "Descente de charges vérifiée par ingénieur diplômé.",
  },
  {
    titre: "Avis d'exécution",
    detail: "Recommandations de mise en œuvre phase par phase.",
  },
];

const REASSURANCE = [
  { icone: Lock, texte: "Paiement sécurisé MTN / Orange via CinetPay" },
  { icone: FileText, texte: "Facture OHADA automatique après paiement" },
  { icone: MessageCircle, texte: "SAV WhatsApp 7j/7, réponse sous 24 h" },
];

function caracteristiques(plan: NonNullable<ReturnType<typeof trouverPlan>>) {
  return [
    { label: "Référence", valeur: plan.reference },
    { label: "Type", valeur: plan.typeBatiment },
    ...(plan.superficieM2 ? [{ label: "Surface", valeur: `${plan.superficieM2} m²` }] : []),
    ...(plan.nbNiveaux ? [{ label: "Niveaux", valeur: String(plan.nbNiveaux) }] : []),
    ...(plan.nbChambres ? [{ label: "Chambres", valeur: String(plan.nbChambres) }] : []),
    ...(plan.nbSallesDeBain
      ? [{ label: "Salles de bain", valeur: String(plan.nbSallesDeBain) }]
      : []),
  ];
}

/*
 * WhatsApp pré-rempli avec la référence du plan (skill 06) : construit côté
 * serveur depuis le numéro d'environnement, jamais forgé. Sans numéro valide,
 * le bouton n'est pas proposé — comme le FAB flottant.
 */
function lienQuestionPlan(reference: string, titre: string): string | null {
  const numero = numeroInternational(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
  if (!numero) return null;
  const message = encodeURIComponent(`Bonjour, une question sur le plan ${reference} (${titre})`);
  return `https://wa.me/${numero.slice(1)}?text=${message}`;
}

export default async function PageFichePlan({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const plan = trouverPlan(reference);
  if (!plan) notFound();

  const lignes = caracteristiques(plan);
  const whatsapp = lienQuestionPlan(plan.reference, plan.titre);
  const prixEur = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
    plan.prixFcfa / TAUX_EUR
  );

  return (
    <>
      <div className="max-w-content mx-auto px-4 py-24 pb-24 md:px-6">
        <FilAriane
          items={[{ label: "Plans", href: "/plans" }, { label: plan.reference }]}
          className="mb-6"
        />
        <Kicker number="04" label="FICHE PLAN" className="mb-4" />
        <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">{plan.titre}</h1>
        {plan.description ? (
          <p className="text-body text-ink-soft mt-4 max-w-2xl">{plan.description}</p>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <WatermarkPreview imageUrl={plan.imageUrl} watermarkText="STRUCTURA" />
          <div>
            <PriceTag amount={plan.prixFcfa} />
            <p className="text-small text-ink-soft mt-2">≈ {prixEur} €</p>

            <div className="mt-6 flex flex-col gap-4">
              <ButtonTech asChild variant="conversion" size="lg" className="hidden md:inline-flex">
                <Link href={`/devis?plan=${plan.reference}`}>Acheter ce plan</Link>
              </ButtonTech>
              {whatsapp ? (
                <ButtonTech asChild variant="ghost" size="lg">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    Poser une question sur ce plan
                  </a>
                </ButtonTech>
              ) : null}
            </div>

            <ul aria-label="Réassurance" className="mt-8 space-y-3">
              {REASSURANCE.map((item) => (
                <li key={item.texte} className="text-small text-ink-soft flex items-start gap-3">
                  <item.icone
                    aria-hidden="true"
                    className="text-blueprint mt-0.5 h-4 w-4 shrink-0"
                  />
                  {item.texte}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <PanneauDonnees
        kicker={{ number: "04", label: "DOSSIER" }}
        titre="Caractéristiques vérifiées"
        accroche="Relevé technique du modèle : chaque valeur est issue de la note de calcul."
        lignes={lignes}
      />

      <section
        role="region"
        aria-label="Contenu du dossier"
        data-surface="surface"
        className="bg-surface py-24 md:py-32"
      >
        <div className="max-w-content mx-auto px-4 md:px-6">
          <Kicker number="04" label="LIVRABLES" className="mb-4" />
          <h2 className="font-display text-h2 text-ink max-w-3xl font-bold">Contenu du dossier</h2>
          <p className="text-body text-ink-soft mt-4 max-w-2xl">
            Six pièces, livrées en PDF après paiement. C&apos;est le dossier complet pour
            construire, pas un simple croquis.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DOCUMENTS_DOSSIER.map((document) => (
              <li key={document.titre} className="st-card rounded-card flex items-start gap-4 p-5">
                <span
                  aria-hidden="true"
                  className="rounded-control bg-blueprint/10 flex h-10 w-10 shrink-0 items-center justify-center"
                >
                  <Check className="text-blueprint h-5 w-5" />
                </span>
                <span>
                  <span className="font-display text-h3 text-ink block font-semibold">
                    {document.titre}
                  </span>
                  <span className="text-small text-ink-soft mt-1 block">{document.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaChaud
        kicker={{ number: "04", label: "ADAPTATION" }}
        titre="Un terrain particulier ?"
        accroche="Chaque parcelle a sa pente, son sol, son orientation. Nous adaptons ce plan à votre terrain à partir de 75 000 FCFA, note de calcul mise à jour."
        actionPrincipale={{
          label: "Demander l'adaptation",
          href: `/devis?plan=${plan.reference}`,
        }}
        actionSecondaire={
          whatsapp ? { label: "En parler sur WhatsApp", href: whatsapp } : undefined
        }
      />

      <div className="pb-32 md:pb-0">
        <StickyMobileCta label="Acheter ce plan" href={`/devis?plan=${plan.reference}`} />
      </div>
    </>
  );
}
