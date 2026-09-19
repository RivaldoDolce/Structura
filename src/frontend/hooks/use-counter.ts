import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface UseCounterOptions {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

// Démarre seulement quand `end > 0` : l'appelant garde 0 tant que le compteur
// est hors viewport, puis bascule sur la valeur cible.
export function useCounter({ end, duration = 1200, delay = 0, decimals = 0 }: UseCounterOptions): number {
  const [compte, setCompte] = useState(0);
  const animationsReduites = useReducedMotion();

  useEffect(() => {
    if (end === 0) {
      setCompte(0);
      return;
    }

    if (animationsReduites) {
      setCompte(end);
      return;
    }

    let origine: number | null = null;
    let cadre = 0;
    const assouplit = (progression: number): number =>
      progression === 1 ? 1 : 1 - Math.pow(2, -10 * progression);

    const planifie =
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : (rappel: FrameRequestCallback): number =>
            setTimeout(() => rappel(performance.now()), 16) as unknown as number;
    const annule =
      typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : clearTimeout;

    const anime = (instant: number): void => {
      if (origine === null) origine = instant;
      const ecoule = instant - origine - delay;

      if (ecoule < 0) {
        cadre = planifie(anime);
        return;
      }

      const progression = Math.min(ecoule / duration, 1);
      setCompte(Number((assouplit(progression) * end).toFixed(decimals)));

      if (progression < 1) cadre = planifie(anime);
    };

    cadre = planifie(anime);
    return () => annule(cadre);
  }, [end, duration, delay, decimals, animationsReduites]);

  return compte;
}
