"use client";
// Lenis pilote le défilement du document : accès DOM obligatoire, rendu client.
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

export interface LenisProviderProps {
  children: ReactNode;
}

// Formulaires longs : le défilement fluide y gêne la saisie et le clavier virtuel.
const ROUTES_SANS_LENIS = ["/devis", "/contact"];

// Enveloppe unique du layout racine : fluide partout sauf formulaires et
// préférence de réduction des animations, où le défilement reste natif.
export function LenisProvider({ children }: LenisProviderProps) {
  const chemin = usePathname();
  const mouvementReduit = useReducedMotion();

  if (mouvementReduit || ROUTES_SANS_LENIS.some((route) => chemin.includes(route)))
    return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
