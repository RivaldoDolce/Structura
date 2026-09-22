import type { Metadata } from "next";
import Link from "next/link";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";

export const metadata: Metadata = {
  title: "Page introuvable — STRUCTURA",
  description: "Cette page n'existe pas ou a été déplacée.",
};

export default function PageNotFound() {
  return (
    <div className="max-w-content mx-auto flex min-h-[60vh] flex-col items-start justify-center px-4 py-24 md:px-6">
      <Kicker number="404" label="PLAN NON TROUVÉ" className="mb-4" />
      <h1 className="font-display text-h1 text-ink font-bold">
        Cette cote n&apos;est sur aucun plan.
      </h1>
      <p className="text-body text-ink-soft mt-4 max-w-xl">
        La page demandée n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil ou demandez
        un devis.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <ButtonTech asChild variant="primary" size="lg">
          <Link href="/">Retour à l&apos;accueil</Link>
        </ButtonTech>
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/devis">Demander un devis</Link>
        </ButtonTech>
      </div>
    </div>
  );
}
