import type { Metadata } from "next";
import { DevisWizard } from "@/frontend/components/signature/devis-wizard";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Demander un devis — STRUCTURA",
  description:
    "Tunnel en 3 écrans : type de projet, besoin, coordonnées. Réponse garantie sous 24 h ouvrées.",
};

async function deposerDevis(donnees: { reference: string }) {
  "use server";
  return { ok: true, reference: donnees.reference };
}

export default function PageDevis() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="10" label="DEVIS" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        Demander un devis
      </h1>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
        Trois écrans, deux minutes, zéro engagement. Votre saisie reste sur cet appareil
        jusqu&apos;à l&apos;envoi.
      </p>
      <div className="mt-10">
        <DevisWizard onSubmit={deposerDevis} />
      </div>
    </div>
  );
}
