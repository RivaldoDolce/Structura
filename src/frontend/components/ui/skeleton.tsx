import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * Bloc de chargement : occupe exactement la place du contenu à venir, avec un
 * balayage lumineux lent basé sur `transform`. Les lecteurs d'écran reçoivent
 * l'information de chargement par `aria-busy` ou un texte dédié.
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