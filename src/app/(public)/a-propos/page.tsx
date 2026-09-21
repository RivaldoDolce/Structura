import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stats } from "@/frontend/components/sections/stats";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { TechDivider } from "@/frontend/components/signature/tech-divider";
import { equipe } from "@/frontend/data/equipe";

export const metadata: Metadata = {
  title: "À propos — STRUCTURA",
  description:
    "Bureau d'ingénierie et atelier d'ébénisterie à Yaoundé : rigueur du calcul, noblesse de la finition.",
};

export default function PageAPropos() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 pt-24 md:px-6">
        <FilAriane items={[{ label: "À propos" }]} className="mb-6" />
        <Kicker number="07" label="MAISON" className="mb-4" />
        <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">À propos de STRUCTURA</h1>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">
          Un bureau d&apos;ingénierie adossé à un atelier d&apos;ébénisterie : le calcul juste et la
          finition noble, sous le même toit à Yaoundé.
        </p>

        <section aria-label="Équipe" className="mt-12">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipe.map((membre) => (
              <li
                key={membre.id}
                className="rounded-card border-line bg-surface overflow-hidden border"
              >
                <div className="relative aspect-square">
                  <Image
                    src={membre.photoUrl}
                    alt={membre.nom}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-ink font-medium">{membre.nom}</p>
                  <p className="text-small text-ink-soft mt-1">{membre.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Stats />
      <div className="max-w-content mx-auto px-4 pb-32 md:px-6 md:pb-24">
        <TechDivider label="DEPUIS YAOUNDÉ" />
        <div className="mt-10">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
        </div>
      </div>

      <StickyMobileCta label="Demander un devis" href="/devis" />
    </>
  );
}
