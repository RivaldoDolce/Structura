import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { essences } from "@/frontend/data/equipe";

export const metadata: Metadata = {
  title: "Ébénisterie d'art — STRUCTURA",
  description:
    "Mobilier sur-mesure en essences locales : padouk, iroko, bubinga, ébène. Conception, fabrication, pose.",
};

export default function PageEbenisterie() {
  return (
    <div className="max-w-content mx-auto px-4 pt-24 pb-32 md:px-6 md:pb-24">
      <FilAriane items={[{ label: "Ébénisterie" }]} className="mb-6" />
      <Kicker number="02" label="ÉBÉNISTERIE" className="mb-4" />
      <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">Ébénisterie d&apos;art</h1>
      <p className="text-body text-ink-soft mt-4 max-w-2xl">
        Tables, lits, consoles et boiseries : des essences locales selecting, une finition mate qui
        traverse les années.
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {essences.map((essence) => (
          <li
            key={essence.id}
            className="rounded-card border-line bg-surface overflow-hidden border"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={essence.imageUrl}
                alt={essence.nom}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-h3 text-ink font-semibold">{essence.nom}</h2>
              <p className="text-small text-ink-soft mt-2">{essence.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {/* La page sur-mesure dédiée (P1) n'existe pas encore : le tunnel
            de devis capte la demande en attendant, sans lien mort. */}
        <ButtonTech asChild variant="conversion" size="lg">
          <Link href="/devis">Commander du sur-mesure</Link>
        </ButtonTech>
      </div>

      <StickyMobileCta label="Commander du sur-mesure" href="/devis" />
    </div>
  );
}
