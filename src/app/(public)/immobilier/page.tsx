import type { Metadata } from "next";
import Link from "next/link";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
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
      <div className="mx-auto max-w-content px-4 pt-24 md:px-6">
        <Kicker number="04" label="IMMOBILIER" className="mb-4" />
        <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
          Immobilier clé en main
        </h1>
        <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
          Biens vérifiés — foncier, structure, finitions — puis accompagnement jusqu&apos;à
          la remise des clés.
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
