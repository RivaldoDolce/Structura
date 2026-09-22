"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";

export interface LigneDonnee {
  label: string;
  valeur: string;
}

export interface PanneauDonneesProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  /** Lignes du tableau technique. */
  lignes: LigneDonnee[];
  /** Contenu additionnel (CTA, note, galerie). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Composition C7 — le panneau de données (audit §6.3).
 *
 * `surface-blueprint` avec maille fine derrière : c'est ici, et seulement ici
 * (avec le hero et les fiches plans), que le quadrillage technique est légitime
 * — la donnée se lit sur un fond de relevé. Les valeurs restent en mono, les
 * termes reviennent en Inter : le mono est plafonné.
 */
export function PanneauDonnees({
  kicker,
  titre,
  accroche,
  lignes,
  children,
  className,
}: PanneauDonneesProps) {
  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="C7"
      data-surface="blueprint"
      className={cn("bg-surface-blueprint relative overflow-hidden py-24 md:py-32", className)}
    >
      <div data-maille aria-hidden="true">
        <BlueprintGrid density="fine" fade="both" className="absolute inset-0" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto px-4 md:px-6"
      >
        <motion.div variants={fadeUpItem}>
          <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
        </motion.div>

        <motion.h2 variants={fadeUpItem} className="font-display text-h2 text-ink font-bold">
          {titre}
        </motion.h2>

        {accroche ? (
          <motion.p variants={fadeUpItem} className="text-body text-ink-soft mt-4 max-w-2xl">
            {accroche}
          </motion.p>
        ) : null}

        <motion.dl variants={fadeUpItem} className="mt-12 grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
          {lignes.map((ligne) => (
            <div
              key={ligne.label}
              className="border-line flex items-baseline justify-between gap-6 border-b py-4"
            >
              <dt className="text-body text-ink-soft">{ligne.label}</dt>
              <dd className="text-body text-ink font-mono">{ligne.valeur}</dd>
            </div>
          ))}
        </motion.dl>

        {children ? (
          <motion.div variants={fadeUpItem} className="mt-10">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
