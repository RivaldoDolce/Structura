import type { Metadata } from "next";
import Image from "next/image";
import { Stats } from "@/frontend/components/sections/stats";
import { Kicker } from "@/frontend/components/signature/kicker";
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
      <div className="mx-auto max-w-content px-4 pt-24 md:px-6">
        <Kicker number="07" label="MAISON" className="mb-4" />
        <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
          À propos de STRUCTURA
        </h1>
        <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
          Un bureau d&apos;ingénierie adossé à un atelier d&apos;ébénisterie : le calcul juste
          et la finition noble, sous le même toit à Yaoundé.
        </p>

        <section aria-label="Équipe" className="mt-12">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipe.map((membre) => (
              <li
                key={membre.id}
                className="overflow-hidden rounded-card border border-[var(--color-line)] bg-[var(--color-surface)]"
              >
                <div className="relative aspect-square">
                  <Image src={membre.photoUrl} alt={membre.nom} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-medium text-[var(--color-ink)]">{membre.nom}</p>
                  <p className="mt-1 text-small text-[var(--color-ink-soft)]">{membre.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Stats />
      <div className="mx-auto max-w-content px-4 pb-24 md:px-6">
        <TechDivider label="DEPUIS YAOUNDÉ" />
      </div>
    </>
  );
}
