"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
import { tonDe } from "@/frontend/lib/lumieres";
import { BlueprintGrid } from "@/frontend/components/signature/blueprint-grid";
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

/**
 * Catalogue filtrable des plans (composition C7 — panneau de données).
 *
 * Le titre de page appartient à l'en-tête immersif : ce composant ne porte que
 * les filtres et la grille des fiches. La bande est en papier (ivoire second)
 * avec maille fine : la donnée se lit mieux sur un relevé clair, et les fiches
 * gardent leur cadre sombre — un plan blanc s'y détache comme sous verre.
 */
export function CataloguePlans({ plans }: CataloguePlansProps) {
  const [filtre, setFiltre] = useState<string | null>(null);
  const visibles = filtre ? plans.filter((plan) => plan.typeBatiment === filtre) : plans;
  const ton = tonDe("pale");

  return (
    <section
      role="region"
      aria-label="Catalogue de plans"
      data-composition="C7"
      data-surface="pale"
      data-lumiere="pale"
      className="st-pale st-lisiere relative overflow-hidden py-20 md:py-28"
    >
      <div data-maille aria-hidden="true">
        <BlueprintGrid density="fine" fade="both" teinte="pale" className="absolute inset-0 opacity-60" />
      </div>

      <div className="max-w-content relative mx-auto px-4 md:px-6">
        <Kicker number="02" label="CATALOGUE" tone={ton.cartouche} className="mb-4" />
        <h2 className={cn("font-display text-h2 font-bold", ton.titre)}>Plans prêts à construire</h2>
        <p className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
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
                ? "border-steel-encre text-steel-encre"
                : "border-line-encre-strong text-encre-soft hover:text-encre"
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
                  ? "border-steel-encre text-steel-encre"
                  : "border-line-encre-strong text-encre-soft hover:text-encre"
              )}
            >
              {ETIQUETTES_TYPE[type] ?? type}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visibles.map((plan) => (
            <li key={plan.reference} className="st-card rounded-card overflow-hidden">
              <WatermarkPreview imageUrl={plan.imageUrl} watermarkText="STRUCTURA" />
              <div className="p-6">
                <p className="text-mono-xs text-ink-mute font-mono uppercase">
                  Réf. {plan.reference}
                </p>
                <h3 className="font-display text-h3 text-ink mt-2 font-semibold">
                  <Link href={`/plans/${plan.reference}`} className="hover:text-blueprint">
                    {plan.titre}
                  </Link>
                </h3>
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
    </section>
  );
}
