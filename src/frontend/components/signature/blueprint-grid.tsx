import { cn } from "@/frontend/lib/cn";
import { colors } from "@/frontend/lib/tokens";

/** Densité de la maille : fine (32 px) ou majeure (160 px). */
export type BlueprintDensity = "fine" | "major";

/** Fondu de masquage : vers le bas, ou dégradé aux deux extrémités. */
export type BlueprintFade = "none" | "bottom" | "both";

export interface BlueprintGridProps {
  density?: BlueprintDensity;
  fade?: BlueprintFade;
  className?: string;
}

const MAILLES: Record<BlueprintDensity, number> = { fine: 32, major: 160 };

const MASQUES: Record<BlueprintFade, string | undefined> = {
  none: undefined,
  bottom: "linear-gradient(to bottom, black 60%, transparent 100%)",
  both: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
};

/**
 * Tuile de croix de repérage (160 px, trait 16 px), utilisée en masque
 * alpha : un asset externe ne peut pas lire une variable CSS, la teinte passe
 * donc par `backgroundColor`.
 */
const TUILE_CROIX = "url(/textures/textures-overlays/05-03_texture-croix-160.svg)";
const OPACITE_CROIX = 0.3;
const MAILLE_CROIX = 160;

/** Fond « papier millimétré », purement décoratif. */
export function BlueprintGrid({ density = "fine", fade = "none", className }: BlueprintGridProps) {
  const maille = MAILLES[density];
  const masque = MASQUES[fade];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ maskImage: masque, WebkitMaskImage: masque }}
    >
      {/* Maille */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.line} 1px, transparent 1px), linear-gradient(to bottom, ${colors.line} 1px, transparent 1px)`,
          backgroundSize: `${maille}px ${maille}px`,
        }}
      />

      {/* Croix de repérage */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: colors.blueprint,
          opacity: OPACITE_CROIX,
          maskImage: TUILE_CROIX,
          WebkitMaskImage: TUILE_CROIX,
          maskSize: `${MAILLE_CROIX}px ${MAILLE_CROIX}px`,
          WebkitMaskSize: `${MAILLE_CROIX}px ${MAILLE_CROIX}px`,
        }}
      />
    </div>
  );
}
