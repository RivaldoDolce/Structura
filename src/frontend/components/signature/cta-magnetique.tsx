"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { useReducedMotion, usePointeurFin } from "@/frontend/hooks/use-reduced-motion";
import { durations, easings } from "@/frontend/lib/tokens";

export interface CtaMagnetiqueProps {
  /** CTA unique porté par la zone (ButtonTech recommandé). */
  children: React.ReactNode;
  className?: string;
}

/** Course maximale de l'attraction : le magnétisme reste un frôlement. */
const COURSE_MAX_PX = 8;

/**
 * CTA magnétique léger (LOT 4, V3 §12 : CTA desktop principal uniquement).
 *
 * La zone attire son contenu vers le curseur en `transform` pur puis le
 * relâche au repos par un retour spring. Bonus de pointeur fin uniquement :
 * inerte au clavier, au tactile et en mouvement réduit — le CTA enfant garde
 * son href et son nom accessible dans tous les cas.
 */
export function CtaMagnetique({ children, className }: CtaMagnetiqueProps) {
  const mouvementReduit = useReducedMotion();
  const pointeurFin = usePointeurFin();
  const cadreRef = React.useRef<HTMLDivElement>(null);
  const [decalage, setDecalage] = React.useState({ x: 0, y: 0 });

  const actif = pointeurFin && !mouvementReduit;

  const gereMouvement = React.useCallback(
    (evenement: React.MouseEvent<HTMLDivElement>) => {
      if (!actif) return;
      const cadre = cadreRef.current?.getBoundingClientRect();
      if (!cadre) return;
      const centreX = cadre.left + cadre.width / 2;
      const centreY = cadre.top + cadre.height / 2;
      // Vecteur curseur → centre, amorti pour rester un frôlement.
      const dx = (evenement.clientX - centreX) / 4;
      const dy = (evenement.clientY - centreY) / 4;
      const norme = Math.hypot(dx, dy) || 1;
      const facteur = Math.min(1, COURSE_MAX_PX / norme);
      setDecalage({ x: dx * facteur, y: dy * facteur });
    },
    [actif]
  );

  const relache = React.useCallback(() => setDecalage({ x: 0, y: 0 }), []);

  return (
    <div
      data-testid="cta-magnetique"
      data-magnetique={actif ? "actif" : "inerte"}
      onMouseMove={gereMouvement}
      onMouseLeave={relache}
      className={cn("hidden lg:block", className)}
    >
      <motion.div
        ref={cadreRef}
        animate={{ x: actif ? decalage.x : 0, y: actif ? decalage.y : 0 }}
        transition={
          decalage.x === 0 && decalage.y === 0
            ? { type: "spring", stiffness: 260, damping: 22 }
            : { duration: durations.micro, ease: easings.outExpo }
        }
        className="inline-block"
      >
        {children}
      </motion.div>
    </div>
  );
}
