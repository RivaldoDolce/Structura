import { useEffect, useState } from "react";

// Préférence lue côté client uniquement : le rendu serveur reste déterministe.
function litPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
