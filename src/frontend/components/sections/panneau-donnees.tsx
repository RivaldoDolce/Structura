"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { estClaire, tonDe, type Lumiere } from "@/frontend/lib/lumieres";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";

export interface LigneDonnee {
  label: string;
  valeur: string;
}

/** Lumières admises : relevé sombre ou papier technique. */
export type LumierePanneau = Extract<Lumiere, "sombre" | "pale">;

export interface PanneauDonneesProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  /** Lignes du tableau technique. */
  lignes: LigneDonnee[];
  /** Lumière du panneau : `blueprint` par défaut, ivoire second en clair. */
  lumiere?: LumierePanneau;
  /** Contenu additionnel (CTA, note, galerie). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Composition C7 — le panneau de données (audit §6.3).
 *
 * `surface-blueprint` ou papier avec maille fine derrière : c'est ici, et
 * seulement ici (avec le hero et les fiches plans), que le quadrillage
 * technique est légitime — la donnée se lit sur un fond de relevé. Les valeurs
 * restent en mono, les termes reviennent en Inter : le mono est plafonné.
 */
export function PanneauDonnees({
  kicker,
  titre,
  accroche,
  lignes,
  lumiere = "sombre",
  children,
  className,
}: PanneauDonneesProps) {
  const ton = tonDe(lumiere);
  const clair = estClaire(lumiere);

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="C7"
      data-surface={clair ? "pale" : "blueprint"}
      data-lumiere={lumiere}
      className={cn(
        "relative overflow-hidden py-24 md:py-32",
        clair ? `${ton.fond} st-lisiere` : "bg-surface-blueprint",
        className
      )}
    >
      <div data-maille aria-hidden="true">
        <BlueprintGrid density="fine" fade="both" teinte={lumiere} className="absolute inset-0" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto px-4 md:px-6"
      >
        <motion.div variants={fadeUpItem}>
          <Kicker number={kicker.number} label={kicker.label} tone={ton.cartouche} className="mb-4" />
        </motion.div>

        <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2 font-bold", ton.titre)}>
          {titre}
        </motion.h2>

        {accroche ? (
          <motion.p variants={fadeUpItem} className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
            {accroche}
          </motion.p>
        ) : null}

        <motion.dl variants={fadeUpItem} className="mt-12 grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
          {lignes.map((ligne) => (
            <div
              key={ligne.label}
              className={cn("flex items-baseline justify-between gap-6 border-b py-4", ton.filet)}
            >
              <dt className={cn("text-body", ton.texte)}>{ligne.label}</dt>
              <dd className={cn("text-body font-mono", ton.titre)}>{ligne.valeur}</dd>
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
