"use client";

import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";
import { StatCounter } from "../signature/stat-counter";
import { TechDivider } from "../signature/tech-divider";

export interface StatistiqueSourcee {
  value: number;
  label: string;
  suffix?: string;
  /** Origine du chiffre : sans source, un chiffre reste du marketing. */
  source: string;
}

export interface StatistiquesSourceesProps {
  chiffres: StatistiqueSourcee[];
  titre: string;
  accroche?: string;
  kicker?: { number: string; label: string };
  className?: string;
}

/**
 * Composition C4 — la preuve chiffrée (audit §6.1 acte 2).
 *
 * Bande `surface-deep` sur maille majeure : chaque compteur porte sa source en
 * Inter `text-small`, jamais en mono — le chiffre est la valeur, la source est
 * une phrase. C'est ce qui sépare la preuve de l'affirmation.
 */
export function StatistiquesSourcees({
  chiffres,
  titre,
  accroche,
  kicker = { number: "02", label: "CHIFFRES" },
  className,
}: StatistiquesSourceesProps) {
  return (
    <section
      role="region"
      aria-label="Chiffres clés"
      data-composition="C4"
      data-surface="deep"
      className={cn("bg-surface-deep relative overflow-hidden py-24 md:py-32", className)}
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="major" fade="both" className="absolute inset-0" />
      </div>

      <div className="max-w-content relative mx-auto px-4 md:px-6">
        <motion.div variants={staggerContainer} {...inViewOnce} className="mb-16 text-center">
          <motion.div variants={fadeUpItem}>
            <Kicker number={kicker.number} label={kicker.label} className="mb-4 justify-center" />
          </motion.div>
          <motion.h2 variants={fadeUpItem} className="font-display text-h2 text-ink-soft font-bold">
            {titre}
          </motion.h2>
          {accroche ? (
            <motion.p variants={fadeUpItem} className="text-body text-ink-soft mx-auto mt-4 max-w-2xl">
              {accroche}
            </motion.p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-12">
          {chiffres.map((chiffre) => (
            <div key={chiffre.label} className="flex flex-col items-center">
              <StatCounter
                value={chiffre.value}
                label={chiffre.label}
                suffix={chiffre.suffix ?? ""}
              />
              <p className="text-small text-ink-soft mt-3 max-w-[18rem] text-center">
                {chiffre.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <TechDivider label="CERTIFIÉ" />
        </div>
      </div>
    </section>
  );
}
