import type { Metadata } from "next";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Mentions légales — STRUCTURA",
  description: "Éditeur, hébergement et propriété intellectuelle du site STRUCTURA.",
};

export default function PageMentions() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="L1" label="LÉGAL" className="mb-4" />
      <h1 className="font-display text-h1 font-bold text-[var(--color-ink)]">Mentions légales</h1>
      <div className="prose-structura mt-8 max-w-2xl space-y-4 text-body text-[var(--color-ink-soft)]">
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
