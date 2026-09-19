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
 * `tailwind-merge` ignore les échelles de Tailwind personnalisées : nos
 * utilitaires de thème (`text-h2`, `shadow-card`…) seraient sinon conservés en
 * doublon ou supprimés à tort quand un appelant écrase une prop `className`.
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
      // `max-w-*` est une liste statique : le conteneur du projet doit y être
      // déclaré pour être dédoublonné.
      "max-w": [{ "max-w": ["content"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}