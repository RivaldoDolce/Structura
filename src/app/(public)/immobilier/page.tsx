import type { Metadata } from "next";
import Link from "next/link";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { Portfolio } from "@/frontend/components/sections/portfolio";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";

export const metadata: Metadata = {
  title: "Immobilier — STRUCTURA",
  description:
    "Villas, immeubles et terrains vérifiés à Yaoundé : sélection, accompagnement, remise des clés.",
};

export default function PageImmobilier() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 pt-24 md:px-6">
        <FilAriane items={[{ label: "Immobilier" }]} className="mb-6" />
        <Kicker number="04" label="IMMOBILIER" className="mb-4" />
        <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">
          Immobilier clé en main
        </h1>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">
          Biens vérifiés — foncier, structure, finitions — puis accompagnement jusqu&apos;à la
          remise des clés.
        </p>
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/contact">Prendre contact</Link>
          </ButtonTech>
        </div>
      </div>
      <Portfolio projects={PROJETS_PORTFOLIO.filter((projet) => projet.surface !== undefined)} />
    </>
  );
}
