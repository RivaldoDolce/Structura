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
      className={cn("rounded-control bg-elevated relative overflow-hidden", className)}
      {...props}
    >
      <span className="animate-sweep via-line-strong absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}

export { Skeleton };
