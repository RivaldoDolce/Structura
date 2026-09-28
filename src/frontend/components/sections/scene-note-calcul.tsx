"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";

/** Cote de calcul : une valeur d'ingénierie, jamais une phrase. */
export interface CoteCalcul {
  terme: string;
  valeur: string;
}

export interface SceneNoteCalculProps {
  numero: string;
  titre: string;
  accroche: string;
  imageUrl: string;
  imageAlt: string;
  cotes: CoteCalcul[];
  /** Annotation de la note, en mono : c'est une référence de document. */
  annotation: string;
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène 02 — la note de calcul (V3 §7.4).
 *
 * Inversion assumée de l'acte 01 : ici le média est le porteur dominant et le
 * texte vient s'ancrer dans l'espace libre laissé par l'image, au lieu
 * d'occuper une colonne rigide. Le panneau de cotes chevauche le média au lieu
 * d'être posé à côté — le recouvrement crée la profondeur que l'alignement
 * bord à bord du 50/50 ne donnait pas.
 */
export function SceneNoteCalcul({
  numero,
  titre,
  accroche,
  imageUrl,
  imageAlt,
  cotes,
  annotation,
  href,
  hrefLabel,
  className,
}: SceneNoteCalculProps) {
  const ton = tonDe("pale");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-calcul"
      data-scene="note-calcul"
      data-lumiere="pale"
      data-ratio="60-40-chevauchement"
      className={cn("st-pale relative overflow-hidden py-24 md:py-32", className)}
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="major" fade="both" teinte="pale" className="absolute inset-0 opacity-50" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="relative mx-auto grid max-w-content items-center px-4 md:px-6 lg:grid-cols-[7fr_5fr]"
      >
        {/* Porteur dominant : le rendu structurel. */}
        <motion.div
          data-porteur="media"
          variants={fadeUpItem}
          className="relative lg:-ml-[8vw] lg:pr-6"
        >
          <div className="bg-surface relative aspect-[16/11] overflow-hidden rounded-card">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Panneau de cotes : il mord sur le média au lieu de s'aligner. */}
        <motion.div
          data-panneau-cotes
          data-chevauchement="oui"
          variants={fadeUpItem}
          className={cn(
            "bg-elevated rounded-card relative z-10 border p-6 shadow-xl lg:-ml-16 lg:mb-10",
            ton.filet
          )}
        >
          <Kicker number={numero} label="CALCUL" tone={ton.cartouche} className="mb-5" />
          <h2 className={cn("font-display text-h2b font-bold", ton.titre)}>{titre}</h2>
          <p className={cn("text-body mt-3", ton.texte)}>{accroche}</p>

          <dl className="mt-7 space-y-0">
            {cotes.map((cote) => (
              <div key={cote.terme} data-cote className={cn("flex items-baseline justify-between gap-4 border-b py-2.5", ton.filet)}>
                <dt className={cn("text-mono-xs font-mono uppercase", ton.texte)}>{cote.terme}</dt>
                <dd className={cn("text-mono-xs font-mono", ton.accent)}>{cote.valeur}</dd>
              </div>
            ))}
          </dl>

          <p className={cn("text-mono-xs mt-5 font-mono uppercase", ton.texte)}>{annotation}</p>

          <ButtonTech asChild variant={ton.bouton} size="lg" className="mt-7 w-full">
            <Link href={href}>{hrefLabel}</Link>
          </ButtonTech>
        </motion.div>
      </motion.div>
    </section>
  );
}
