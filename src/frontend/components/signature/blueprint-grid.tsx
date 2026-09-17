import { cn } from "@/frontend/lib/cn";

export interface BlueprintGridProps {
  density?: "low" | "medium" | "high";
  fade?: "none" | "top" | "bottom" | "both";
  className?: string;
}

const MAILLES = { low: 64, medium: 32, high: 16 } as const;

const MASQUES = {
  none: undefined,
  top: "linear-gradient(to bottom, transparent, black 30%)",
  bottom: "linear-gradient(to bottom, black 70%, transparent)",
  both: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
} as const;

// Fond de plan technique en pur CSS : deux dégradés croisés forment la
// maille, sans dépendre d'une texture PNG. Toujours décoratif.
export function BlueprintGrid({ density = "medium", fade = "none", className }: BlueprintGridProps) {
  const maille = MAILLES[density];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={{
        backgroundImage:
          "linear-gradient(rgba(34, 211, 238, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.07) 1px, transparent 1px)",
        backgroundSize: `${maille}px ${maille}px`,
        maskImage: MASQUES[fade],
        WebkitMaskImage: MASQUES[fade],
      }}
    />
  );
}
