"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { easings } from "@/frontend/lib/tokens";

/** Espaces d'application : sobriété exigée, aucune animation de route. */
const ROUTES_APPLICATION = /^\/(compte|gestion|admin)/;

/**
 * Transition de route (plan V2 §6) : fondu de 150 ms, entrée de 10 px, et un
 * filet de lumière qui balaie le haut de l'écran pendant la couture. Quasi
 * imperceptible par conception : elle relie les pages au lieu d'annoncer un
 * chargement.
 *
 * Coupée en mouvement réduit et dans les espaces d'application (compte,
 * gestion, admin), où le mouvement doit rester réservé aux retours d'action.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduit = useReducedMotion();
  const chemin = usePathname();

  if (reduit || ROUTES_APPLICATION.test(chemin ?? "")) return <>{children}</>;

  return (
    <>
      {/* Filet de navigation : un trait de cote qui se trace sur toute la
          largeur en tête d'écran, puis s'efface — décoratif, hors flux. */}
      <motion.span
        aria-hidden="true"
        className="via-blueprint pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-transparent to-transparent"
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.9, ease: easings.outExpo }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: easings.outExpo }}
      >
        {children}
      </motion.div>
    </>
  );
}
