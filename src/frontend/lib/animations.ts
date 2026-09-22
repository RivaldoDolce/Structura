import type { Variants } from "motion/react";
import { durations, easings } from "./tokens";

/**
 * Variantes de mouvement partagées : une seule signature d'animation pour tout
 * le site. Toute animation ponctuelle réutilise ces variantes ou en dérive
 * explicitement, aucune courbe ni durée ne doit être réinventée localement.
 */

/** Cascade parente : rythme l'apparition décalée des enfants. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: durations.stagger,
    },
  },
};

/** Fondu et montée de 16 px sur la courbe expo-out. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easings.outExpo },
  },
};

/** Fondu seul, pour les blocs déjà en place (filets, annotations). */
export const fadeItem: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: durations.standard, ease: easings.outExpo },
  },
};

/**
 * Révélation d'un titre par masque vertical. À n'utiliser que dans un parent
 * en `overflow-hidden`, sans quoi la ligne reste visible pendant sa translation.
 */
export const titleReveal: Variants = {
  hidden: { y: "100%" },
  show: {
    y: 0,
    transition: { duration: durations.cinematic, ease: easings.outExpo },
  },
};

/**
 * Déclenchement standard au défilement : une seule fois, à 25 % de
 * visibilité, jamais de rejeu.
 */
export const inViewOnce = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
} as const;

/* ------------------------------------------------------------------ */
/* Vitesse narrative (audit §7.2)                                      */
/*                                                                     */
/* Ces trois variantes dérivent des mêmes tokens que les précédentes : */
/* c'est le scroll qui les pilote, mais elles restent descriptibles et */
/* coupables en mouvement réduit. Elles ne s'utilisent que sur les      */
/* compositions narratives (hero, journal, pleine largeur).            */
/* ------------------------------------------------------------------ */

/** Révélation d'une photo pleine largeur : léger grossissement d'assise. */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.cinematic, ease: easings.outExpo },
  },
};

/** Tracé d'un trait de cote (SVG) : `pathLength` anime le contour. */
export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  show: {
    pathLength: 1,
    transition: { duration: durations.cinematic, ease: easings.outExpo },
  },
};

/** Photo du journal : elle se pose, du flou à net. */
export const blurSettle: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: durations.cinematic, ease: easings.outExpo },
  },
};
