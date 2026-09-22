import type { Metadata } from "next";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Mentions légales — STRUCTURA",
  description: "Éditeur, hébergement et propriété intellectuelle du site STRUCTURA.",
};

export default function PageMentions() {
  return (
    <div className="max-w-content mx-auto px-4 py-24 md:px-6">
      <FilAriane items={[{ label: "Mentions légales" }]} className="mb-6" />
      <Kicker number="L1" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 text-ink font-bold">Mentions légales</h1>
      <div className="prose-structura text-body text-ink-soft mt-8 max-w-2xl space-y-4">
        <p>STRUCTURA — ingénierie, ébénisterie et immobilier. Yaoundé, Cameroun.</p>
        <p>Directeur de la publication : la direction de STRUCTURA.</p>
        <p>Hébergement : infrastructure cloud, données stockées dans l&apos;Union européenne.</p>
        <p>
          Les visuels et plans présentés restent la propriété de STRUCTURA jusqu&apos;au paiement
          intégral. Toute reproduction sans autorisation est interdite.
        </p>
      </div>
    </div>
  );
}
