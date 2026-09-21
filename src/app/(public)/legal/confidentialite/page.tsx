import type { Metadata } from "next";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Politique de confidentialité — STRUCTURA",
  description: "Données collectées, finalités, durée de conservation et droits des personnes.",
};

export default function PageConfidentialite() {
  return (
    <div className="max-w-content mx-auto px-4 py-24 md:px-6">
      <FilAriane items={[{ label: "Confidentialité" }]} className="mb-6" />
      <Kicker number="L3" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 text-ink font-bold">Politique de confidentialité</h1>
      <div className="text-body text-ink-soft mt-8 max-w-2xl space-y-4">
        <p>
          Nous collectons le strict nécessaire : nom, téléphone, description du projet. Ces données
          servent uniquement à établir votre devis et à vous recontacter.
        </p>
        <p>Conservation de 3 ans, jamais de revente à des tiers. Suppression sur simple demande.</p>
        <p>Contact : contact@structura.cm — réponse sous 30 jours.</p>
      </div>
    </div>
  );
}
