import type { Metadata } from "next";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Conditions générales de vente — STRUCTURA",
  description: "Commande, paiement, livraison et garanties des prestations STRUCTURA.",
};

const ARTICLES = [
  ["Commande", "Toute commande est confirmée par écrit : devis signé ou acompte versé."],
  ["Paiement", "Acompte de 40 % à la commande, solde à la réception. Prix en FCFA, fermes 90 jours."],
  ["Délais", "Les délais courent à réception de l'acompte et des éléments du client."],
  ["Garanties", "Garantie décennale sur le gros œuvre, un an sur le second œuvre et le mobilier."],
  ["Litiges", "Règlement amiable recherché en priorité, juridictions de Yaoundé compétentes."],
] as const;

export default function PageCgv() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="L2" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 font-bold text-[var(--color-ink)]">
        Conditions générales de vente
      </h1>
      <dl className="mt-8 max-w-2xl space-y-6">
        {ARTICLES.map(([titre, texte]) => (
          <div key={titre}>
            <dt className="font-display text-h3 font-semibold text-[var(--color-ink)]">{titre}</dt>
            <dd className="mt-2 text-body text-[var(--color-ink-soft)]">{texte}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
