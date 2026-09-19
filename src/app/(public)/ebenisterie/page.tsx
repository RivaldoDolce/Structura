import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";
import { essences } from "@/frontend/data/equipe";

export const metadata: Metadata = {
  title: "Ébénisterie d'art — STRUCTURA",
  description:
    "Mobilier sur-mesure en essences locales : padouk, iroko, bubinga, ébène. Conception, fabrication, pose.",
};

export default function PageEbenisterie() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="02" label="ÉBÉNISTERIE" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        Ébénisterie d&apos;art
      </h1>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
        Tables, lits, consoles et boiseries : des essences locales selecting, une finition
        mate qui traverse les années.
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {essences.map((essence) => (
          <li
            key={essence.id}
            className="overflow-hidden rounded-card border border-[var(--color-line)] bg-[var(--color-surface)]"
          >
            <div className="relative aspect-[16/10]">
              <Image src={essence.imageUrl} alt={essence.nom} fill sizes="33vw" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="font-display text-h3 font-semibold text-[var(--color-ink)]">{essence.nom}</h2>
              <p className="mt-2 text-small text-[var(--color-ink-soft)]">{essence.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/ebenisterie/sur-mesure">Commander du sur-mesure</Link>
        </ButtonTech>
      </div>
    </div>
  );
}
