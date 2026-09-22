"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { scaleReveal, fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { Kicker } from "../signature/kicker";

export interface LigneFiche {
  label: string;
  valeur: string;
}

interface CommunsEditorial {
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  /** Légende technique en mono, sous la photo : c'est une annotation. */
  legende: string;
  /** Fiche technique optionnelle, en couples terme/valeur. */
  fiche?: LigneFiche[];
  className?: string;
}

/*
 * Deux médias possibles, jamais les deux : une photo 21/9 portée par le
 * composant, ou un média fourni (comparateur) qui impose son propre ratio.
 * Le discriminateur est la présence même de la clé, ce que TypeScript sait
 * affiner — inutile de dupliquer un champ `type`.
 */
export type PleinLargeurEditorialProps = CommunsEditorial &
  ({ image: string; alt: string } | { media: React.ReactNode });

/**
 * Composition C6 — la pièce en pleine largeur (audit §6.3).
 *
 * Bande immersive `21/9` révélée en `scaleReveal`, légende technique en mono
 * sous la photo (c'est une annotation de plan, pas une phrase) et fiche
 * technique optionnelle. Sert aux pièces signature (lit bubinga) et aux
 * chantiers marquants.
 */
export function PleinLargeurEditorial(props: PleinLargeurEditorialProps) {
  const { kicker, titre, accroche, legende, fiche, className } = props;

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="C6"
      data-surface="fond"
      className={cn("relative py-24 md:py-32", className)}
    >
      <motion.div variants={staggerContainer} {...inViewOnce}>
        <div className="max-w-content mx-auto px-4 md:px-6">
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
        </div>

        <motion.figure variants={scaleReveal} className="mt-12">
          {"image" in props ? (
            <div
              data-cadre
              className="st-photo-fusion relative aspect-[21/9] overflow-hidden"
            >
              <Image
                src={props.image}
                alt={props.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div data-cadre className="st-raised rounded-card overflow-hidden">
              {props.media}
            </div>
          )}
          <figcaption className="max-w-content mx-auto px-4 pt-4 md:px-6">
            <span className="text-mono-xs text-blueprint font-mono uppercase">{legende}</span>
          </figcaption>
        </motion.figure>

        {fiche && fiche.length > 0 ? (
          <div className="max-w-content mx-auto px-4 md:px-6">
            <dl className="border-line mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2 md:grid-cols-4">
              {fiche.map((ligne) => (
                <div key={ligne.label}>
                  <dt className="text-small text-ink-mute">{ligne.label}</dt>
                  <dd className="text-body text-ink mt-1 font-mono">{ligne.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
