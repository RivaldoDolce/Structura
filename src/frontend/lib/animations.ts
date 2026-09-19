import type { Variants } from "motion/react";
import { durations, easings } from "./tokens";

/**
 * Variantes partagées par tous les composants animés du site.
 *
 * Objectif : une signature de mouvement unique (skill 04 §3.2). Toute
 * animation ponctuelle réutilise ces variantes ou dérive explicitement de
 * l'une d'elles : aucune courbe ni durée ne doit être réinventée localement.
 */

/**
 * Cascade parente : orchestre l'apparition décalée des enfants.
 * Le parent ne peint rien lui-même, il ne fait que rythmer.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: durations.stagger,
    },
  },
};

/** Enfant standard : fondu et montée de 16 px sur la courbe expo-out. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easings.outExpo },
  },
};

/** Enfant léger : fondu seul, pour les blocs déjà en place (lignes, filets). */
export const fadeItem: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: durations.standard, ease: easings.outExpo },
  },
};

/**
 * Révélation d'un titre par masque vertical.
 * À n'utiliser que dans un parent en `overflow-hidden`, sans quoi la ligne
 * reste visible pendant sa translation.
 */
export const titleReveal: Variants = {
  hidden: { y: "100%" },
  show: {
    y: 0,
    transition: { duration: durations.cinematic, ease: easings.outExpo },
  },
};

/**
 * Configuration standard d'un déclenchement au défilement : une seule fois,
 * à 25 % de visibilité. Jamais de rejeu, jamais de contenu invisible si
 * l'utilisateur revient en arrière.
 */
export const inViewOnce = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
} as const;