"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

/** Point de suivi : un relevé de chantier, pas un argument. */
export interface PointSuivi {
  label: string;
  valeur: string;
}

export interface SceneSuiviReceptionProps {
  numero: string;
  titre: string;
  accroche: string;
  imageUrl: string;
  imageAlt: string;
  suivi: PointSuivi[];
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène 04 — le suivi et la réception (V3 §7.6).
 *
 * Acte conclusif, en lumière chaude : c'est le seul endroit du récit où le
 * chantier reste visible pendant que le texte le commente. Le texte est
 * réellement posé sur la photographie — pas dans une colonne à côté, pas
 * derrière un bandeau de couleur — parce que la promesse du suivi est
 * précisément que le client voit ce que décrit son ingénieur.
 *
 * Le panneau de suivi est délibérément plus léger que le verre dépoli de
 * l'acte immobilier : là-bas il protège des garanties, ici il doit laisser
 * respirer l'ouvrage. Un fond opaque transformerait la preuve en affiche.
 */
export function SceneSuiviReception({
  numero,
  titre,
  accroche,
  imageUrl,
  imageAlt,
  suivi,
  href,
  hrefLabel,
  className,
}: SceneSuiviReceptionProps) {
  const ton = tonDe("warm");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-suivi"
      data-scene="suivi-reception"
      data-lumiere="warm"
      data-ratio="100-photo-superposee"
      className={cn("st-warm relative overflow-hidden", className)}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      {/* Voile dégressif : la lisibilité est maximale au ras du texte, en bas
          à gauche, et l'ouvrage reste intact en haut à droite. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-fond via-fond/55 to-fond/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-fond/80 via-transparent to-fond/40"
      />

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="relative mx-auto flex min-h-[80vh] max-w-content flex-col justify-end px-4 py-24 md:px-6 md:py-32"
      >
        <motion.div variants={fadeUpItem} className="max-w-2xl">
          <Kicker number={numero} label="SUIVI" tone={ton.cartouche} className="mb-5" />
          <h2 className={cn("font-display text-h2 font-bold", ton.titre)}>{titre}</h2>
          <p className={cn("text-body mt-4", ton.texte)}>{accroche}</p>
        </motion.div>

        {/* Panneau de suivi : posé sur la photo, léger, aligné sur la grille. */}
        <motion.div
          data-panneau-suivi
          data-superpose="oui"
          variants={fadeUpItem}
          className="border-line bg-fond/25 mt-10 w-full max-w-2xl border p-6 backdrop-blur-sm md:p-8"
        >
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
            {suivi.map((point) => (
              <div key={point.label} data-point-suivi>
                <dt className={cn("text-mono-xs font-mono uppercase", ton.accent)}>
                  {point.label}
                </dt>
                <dd className={cn("text-body mt-1.5 font-medium", ton.titre)}>{point.valeur}</dd>
              </div>
            ))}
          </dl>

          <ButtonTech asChild variant={ton.bouton} size="lg" className="mt-8">
            <Link href={href}>{hrefLabel}</Link>
          </ButtonTech>
        </motion.div>
      </motion.div>
    </section>
  );
}