"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { PriceTag } from "@/frontend/components/signature/price-tag";
import { WatermarkPreview } from "@/frontend/components/signature/watermark-preview";
import { TYPES_BATIMENT, type Plan } from "@/frontend/data/plans";

export interface CataloguePlansProps {
  plans: Plan[];
}

const ETIQUETTES_TYPE: Record<string, string> = {
  villa: "Villas",
  immeuble: "Immeubles",
  duplex: "Duplex",
  terrain: "Terrains",
};

export function CataloguePlans({ plans }: CataloguePlansProps) {
  const [filtre, setFiltre] = useState<string | null>(null);
  const visibles = filtre ? plans.filter((plan) => plan.typeBatiment === filtre) : plans;

  return (
    <div className="max-w-content mx-auto px-4 py-24 md:px-6">
      <FilAriane items={[{ label: "Plans" }]} className="mb-6" />
      <Kicker number="04" label="CATALOGUE" className="mb-4" />
      <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">
        Plans prêts à construire
      </h1>
      <p className="text-body text-ink-soft mt-4 max-w-2xl">
        Dossier complet, adaptable à votre terrain. Aperçu filigrané avant achat.
      </p>

      <div
        role="group"
        aria-label="Filtrer par type de bâtiment"
        className="mt-8 flex flex-wrap gap-3"
      >
        <button
          type="button"
          onClick={() => setFiltre(null)}
          aria-pressed={filtre === null}
          className={cn(
            "rounded-control text-small h-11 border px-5 font-medium transition-colors",
            filtre === null
              ? "border-blueprint text-blueprint"
              : "border-line-strong text-ink-soft hover:text-ink"
          )}
        >
          Tous
        </button>
        {TYPES_BATIMENT.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFiltre(filtre === type ? null : type)}
            aria-pressed={filtre === type}
            className={cn(
              "rounded-control text-small h-11 border px-5 font-medium transition-colors",
              filtre === type
                ? "border-blueprint text-blueprint"
                : "border-line-strong text-ink-soft hover:text-ink"
            )}
          >
            {ETIQUETTES_TYPE[type] ?? type}
          </button>
        ))}
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {visibles.map((plan) => (
          <li
            key={plan.reference}
            className="rounded-card border-line bg-surface overflow-hidden border"
          >
            <WatermarkPreview imageUrl={plan.imageUrl} watermarkText="STRUCTURA" />
            <div className="p-6">
              <p className="text-mono-xs text-ink-mute font-mono uppercase">
                Réf. {plan.reference}
              </p>
              <h2 className="font-display text-h3 text-ink mt-2 font-semibold">
                <Link href={`/plans/${plan.reference}`} className="hover:text-blueprint">
                  {plan.titre}
                </Link>
              </h2>
              <div className="mt-4">
                <PriceTag
                  amount={plan.prixFcfa}
                  href={`/plans/${plan.reference}`}
                  hrefLabel="Voir la fiche"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
