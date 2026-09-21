import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

export interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {}

/**
 * Filet de séparation du thème.
 *
 * Décoratif par défaut : il ne structure pas l'information pour les lecteurs
 * d'écran. Le composant signature `TechDivider` reste la version « ligne de
 * cote » avec croix d'extrémité et cote en mono.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-line shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
