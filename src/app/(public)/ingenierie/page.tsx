import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/frontend/components/signature/before-after";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";
import { Stats } from "@/frontend/components/sections/stats";

export const metadata: Metadata = {
  title: "Ingénierie structure — STRUCTURA",
  description:
    "Notes de calcul, plans de ferraillage et suivi de chantier à Yaoundé : la rigueur qui porte vos ouvrages.",
};

export default function PageIngenierie() {
  return (
    <>
      <div className="mx-auto max-w-content px-4 pt-24 md:px-6">
        <Kicker number="01" label="INGÉNIERIE" className="mb-4" />
        <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
          Ingénierie structure
        </h1>
        <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
          Descente de charges vérifiée, ferraillage contrôlé à chaque phase, réception
          technique documentée. Vos ouvrages tiennent parce qu&apos;ils sont calculés.
        </p>
        <div className="mt-8">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
        </div>
      </div>
      <Stats />
      <BeforeAfter
        beforeImage="/photos/avant-apres/04-19_avant-batiment-fissure-mokolo.png"
        afterImage="/photos/avant-apres/04-20_apres-batiment-repare-mokolo.png"
      />
    </>
  );
}
