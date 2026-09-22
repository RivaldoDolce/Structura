import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

// Seuil commun aux scénarios narratifs GSAP (hero, fondu plan→photo) :
// jamais sous 768 px (audit §7.4), jamais en mouvement réduit.
const SEUIL_DESKTOP = "(min-width: 768px)";

/**
 * Interrupteur unique des scénarios cinématiques au scroll. Sans lui, chaque
 * composant GSAP réinventerait la même garde (largeur + mouvement réduit).
 */
export function useScenarioActif(): boolean {
  const reduit = useReducedMotion();
  const [large, setLarge] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const requete = window.matchMedia(SEUIL_DESKTOP);
    const actualise = () => setLarge(requete.matches);
    actualise();
    // Garde pour les implémentations partielles (tests, vieux navigateurs).
    if (typeof requete.addEventListener !== "function") return;
    requete.addEventListener("change", actualise);
    return () => requete.removeEventListener("change", actualise);
  }, []);

  return large && !reduit;
}
