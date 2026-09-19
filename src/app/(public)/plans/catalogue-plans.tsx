"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
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
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="04" label="CATALOGUE" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        Plans prêts à construire
      </h1>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
        Dossier complet, adaptable à votre terrain. Aperçu filigrané avant achat.
      </p>

      <div role="group" aria-label="Filtrer par type de bâtiment" className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFiltre(null)}
          aria-pressed={filtre === null}
          className={cn(
            "h-11 rounded-control border px-5 text-small font-medium transition-colors",
            filtre === null
              ? "border-[var(--color-blueprint)] text-[var(--color-blueprint)]"
              : "border-[var(--color-line-strong)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
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
              "h-11 rounded-control border px-5 text-small font-medium transition-colors",
              filtre === type
                ? "border-[var(--color-blueprint)] text-[var(--color-blueprint)]"
                : "border-[var(--color-line-strong)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
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
            className="overflow-hidden rounded-card border border-[var(--color-line)] bg-[var(--color-surface)]"
          >
            <WatermarkPreview imageUrl={plan.imageUrl} watermarkText="STRUCTURA" />
            <div className="p-6">
              <p className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
                Réf. {plan.reference}
              </p>
              <h2 className="mt-2 font-display text-h3 font-semibold text-[var(--color-ink)]">
                <Link href={`/plans/${plan.reference}`} className="hover:text-[var(--color-blueprint)]">
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
