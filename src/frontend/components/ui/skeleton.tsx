import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * Bloc de chargement « SkeletonTech » du guide §2.3.14.
 *
 * Jamais de spinner plein écran : on occupe exactement la place du contenu à
 * venir, avec un balayage lumineux lent de 1,4 s. Le balayage translate un
 * dégradé (donc `transform`) : aucun repaint pendant l'animation. Le bloc est
 * décoratif, les lecteurs d'écran reçoivent l'information par `aria-busy` ou
 * un texte de chargement explicite.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden rounded-control bg-[var(--color-elevated)]", className)}
      {...props}
    >
      <span className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent" />
    </div>
  );
}

export { Skeleton };