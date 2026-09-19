import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import {
  colorNames,
  easingNames,
  fontNames,
  radiusNames,
  shadowNames,
  textSizes,
  trackingNames,
} from "./tokens";

/**
 * Fusion de classes du projet.
 *
 * `tailwind-merge` ne connaît que les échelles de Tailwind par défaut : sans
 * déclaration, nos utilitaires de thème (`text-h2`, `shadow-card`…) seraient
 * soit conservés en doublon, soit supprimés à tort — une prop `className`
 * passée par un appelant écraserait alors la couleur ou la taille du composant.
 * Les échelles sont donc déclarées depuis `tokens.ts`, source unique.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [...colorNames],
      text: [...textSizes],
      radius: [...radiusNames],
      shadow: [...shadowNames],
      font: [...fontNames],
      tracking: [...trackingNames],
      ease: [...easingNames],
    },
    classGroups: {
      // `max-w-*` est une liste statique côté tailwind-merge : le conteneur du
      // projet doit y être déclaré nommément pour être dédoublonné.
      "max-w": [{ "max-w": ["content"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}