import type { Metadata } from "next";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Conditions générales de vente — STRUCTURA",
  description: "Commande, paiement, livraison et garanties des prestations STRUCTURA.",
};

const ARTICLES = [
  ["Commande", "Toute commande est confirmée par écrit : devis signé ou acompte versé."],
  [
    "Paiement",
    "Acompte de 40 % à la commande, solde à la réception. Prix en FCFA, fermes 90 jours.",
  ],
  ["Délais", "Les délais courent à réception de l'acompte et des éléments du client."],
  ["Garanties", "Garantie décennale sur le gros œuvre, un an sur le second œuvre et le mobilier."],
  ["Litiges", "Règlement amiable recherché en priorité, juridictions de Yaoundé compétentes."],
] as const;

export default function PageCgv() {
  return (
    <div className="max-w-content mx-auto px-4 py-24 md:px-6">
      <FilAriane items={[{ label: "CGV" }]} className="mb-6" />
      <Kicker number="L2" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 text-ink font-bold">Conditions générales de vente</h1>
      <dl className="mt-8 max-w-2xl space-y-6">
        {ARTICLES.map(([titre, texte]) => (
          <div key={titre}>
            <dt className="font-display text-h3 text-ink font-semibold">{titre}</dt>
            <dd className="text-body text-ink-soft mt-2">{texte}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
