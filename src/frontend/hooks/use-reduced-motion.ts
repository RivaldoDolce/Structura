import { useEffect, useState } from "react";

// Lecture initiale différée au client : le rendu serveur reste déterministe.
function litPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Expose la préférence système de réduction des animations (skill 04, loi 3).
export function useReducedMotion(): boolean {
  const [reduite, setReduite] = useState(litPreference);

  useEffect(() => {
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualise = (evenement: MediaQueryListEvent) => setReduite(evenement.matches);
    setReduite(requete.matches);
    requete.addEventListener("change", actualise);
    return () => requete.removeEventListener("change", actualise);
  }, []);

  return reduite;
}
