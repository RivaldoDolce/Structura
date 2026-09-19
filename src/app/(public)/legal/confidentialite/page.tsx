import type { Metadata } from "next";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Politique de confidentialité — STRUCTURA",
  description: "Données collectées, finalités, durée de conservation et droits des personnes.",
};

export default function PageConfidentialite() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="L3" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 font-bold text-[var(--color-ink)]">
        Politique de confidentialité
      </h1>
      <div className="mt-8 max-w-2xl space-y-4 text-body text-[var(--color-ink-soft)]">
        <p>
          Nous collectons le strict nécessaire : nom, téléphone, description du projet.
          Ces données servent uniquement à établir votre devis et à vous recontacter.
        </p>
        <p>Conservation de 3 ans, jamais de revente à des tiers. Suppression sur simple demande.</p>
        <p>Contact : contact@structura.cm — réponse sous 30 jours.</p>
      </div>
    </div>
  );
}
