import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * Relevé en cours de tracé : les lignes cyan se dessinent de gauche à droite
 * sur fond blueprint, façon plan qui se relève. Le balayage reste du
 * `transform` pur (aucun reflow) et l'animation hérite du contrat global
 * (une seule itération infinie autorisée : celle-ci).
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-surface-blueprint rounded-control relative overflow-hidden", className)}
      {...props}
    >
      <span
        className="animate-sweep absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 12px, rgba(34, 211, 238, 0.30) 12px 13px)",
        }}
      />
    </div>
  );
}

export { Skeleton };
