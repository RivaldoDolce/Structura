"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { scaleReveal, fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { estClaire, tonDe, type Lumiere } from "@/frontend/lib/lumieres";
import { Kicker } from "../signature/kicker";

export interface LigneFiche {
  label: string;
  valeur: string;
}

/** Lumières admises : sombre (fond), warm (matière) ou pâle (éditorial). */
export type LumiereEditorial = Extract<Lumiere, "sombre" | "warm" | "pale">;

interface CommunsEditorial {
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  /** Légende technique en mono, sous la photo : c'est une annotation. */
  legende: string;
  /** Fiche technique optionnelle, en couples terme/valeur. */
  fiche?: LigneFiche[];
  /** Lumière de la bande : sombre par défaut, chaude ou pâle selon l'acte. */
  lumiere?: LumiereEditorial;
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

/** Surface déclarée, pour la règle d'alternance lue sur le rendu. */
const SURFACES: Record<LumiereEditorial, string> = {
  sombre: "fond",
  warm: "warm",
  pale: "pale",
};

/**
 * Composition C6 — la pièce en pleine largeur (audit §6.3).
 *
 * Bande immersive `21/9` révélée en `scaleReveal`, légende technique en mono
 * sous la photo (c'est une annotation de plan, pas une phrase) et fiche
 * technique optionnelle. Sert aux pièces signature (lit bubinga) et aux
 * chantiers marquants ; la lumière suit l'acte — chaude pour la matière,
 * pâle pour la démonstration.
 */
export function PleinLargeurEditorial(props: PleinLargeurEditorialProps) {
  const { kicker, titre, accroche, legende, fiche, lumiere = "sombre", className } = props;
  const ton = tonDe(lumiere);
  const clair = estClaire(lumiere);

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="C6"
      data-surface={SURFACES[lumiere]}
      data-lumiere={lumiere}
      className={cn("relative py-24 md:py-32", ton.fond, clair && "st-lisiere overflow-hidden", className)}
    >
      <motion.div variants={staggerContainer} {...inViewOnce} className={cn(clair && "relative")}>
        <div className="max-w-content mx-auto px-4 md:px-6">
          <motion.div variants={fadeUpItem}>
            <Kicker
              number={kicker.number}
              label={kicker.label}
              tone={ton.cartouche}
              className="mb-4"
            />
          </motion.div>
          <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2 font-bold", ton.titre)}>
            {titre}
          </motion.h2>
          {accroche ? (
            <motion.p variants={fadeUpItem} className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
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
            <span className={cn("text-mono-xs font-mono uppercase", ton.accent)}>{legende}</span>
          </figcaption>
        </motion.figure>

        {fiche && fiche.length > 0 ? (
          <div className="max-w-content mx-auto px-4 md:px-6">
            <dl
              className={cn(
                "mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2 md:grid-cols-4",
                ton.filet
              )}
            >
              {fiche.map((ligne) => (
                <div key={ligne.label}>
                  <dt className={cn("text-small", clair ? ton.texte : "text-ink-mute")}>
                    {ligne.label}
                  </dt>
                  <dd className={cn("text-body mt-1 font-mono", ton.titre)}>{ligne.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
