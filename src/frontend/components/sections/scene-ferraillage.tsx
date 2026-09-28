"use client";

import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";
import { PlanFerraillage } from "../signature/plan-ferraillage";

export interface SceneFerraillageProps {
  numero: string;
  /** Phrase d'ouverture, volontairement avant le titre. */
  phrase: string;
  titre: string;
  accroche: string;
  /** Ligne de cotes du plan, lue comme un relevé de chantier. */
  cotes: string[];
  className?: string;
}

/**
 * Scène 03 — les plans de ferraillage (V3 §7.5).
 *
 * Acte de dessin : la maille blueprint passe en fond sombre et le plan coté
 * occupe toute la largeur, au-delà du container éditorial. La phrase
 * s'ouvre avant le titre — ici on entre dans le document avant d'annoncer
 * sa section, comme on feuilleterait une liasse de plans.
 *
 * Aucun média photographique : la preuve est le plan, et une photo de chantier
 * à cette place ne ferait que répéter les actes voisins.
 */
export function SceneFerraillage({
  numero,
  phrase,
  titre,
  accroche,
  cotes,
  className,
}: SceneFerraillageProps) {
  const ton = tonDe("sombre");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-ferraillage"
      data-scene="ferraillage"
      data-lumiere="sombre"
      data-ratio="100-bleuprint"
      className={cn("st-fond relative overflow-hidden py-24 md:py-32", className)}
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="fine" fade="both" teinte="sombre" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="relative mx-auto max-w-content px-4 text-center md:px-6"
      >
        <motion.p
          data-sequence="phrase"
          variants={fadeUpItem}
          className={cn("text-body mx-auto max-w-2xl", ton.texte)}
        >
          {phrase}
        </motion.p>
        <motion.div data-sequence="titre" variants={fadeUpItem}>
          <h2 className={cn("font-display text-h2 mt-6 font-bold", ton.titre)}>{titre}</h2>
        </motion.div>
        <motion.p variants={fadeUpItem} className={cn("text-small mt-4 max-w-2xl mx-auto", ton.texte)}>
          {accroche}
        </motion.p>
        <motion.div variants={fadeUpItem}>
          <Kicker
            number={numero}
            label="PLANS D'EXÉCUTION"
            tone={ton.cartouche}
            className="mt-6 justify-center"
          />
        </motion.div>
      </motion.div>

      {/* Le plan déborde le container : c'est un document de chantier, il
          s'affiche à l'échelle du chantier. */}
      <motion.div
        data-pleine-largeur
        variants={fadeUpItem}
        {...inViewOnce}
        className="relative mx-auto mt-14 w-full max-w-[90rem] px-4 md:px-10"
      >
        <div className="bg-surface border-line rounded-card border p-6 md:p-10">
          <PlanFerraillage className="mx-auto w-full max-w-4xl" />
        </div>

        <p
          data-ligne-cotes
          className={cn(
            "text-mono-xs mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono uppercase",
            ton.accent
          )}
        >
          {cotes.map((cote) => (
            <span key={cote} className="font-mono">
              {cote}
            </span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
