import { cn } from "@/frontend/lib/cn";
import { estClaire, type Lumiere } from "@/frontend/lib/lumieres";
import { colors } from "@/frontend/lib/tokens";

/** Densité de la maille : fine (32 px) ou majeure (160 px). */
export type BlueprintDensity = "fine" | "major";

/** Fondu de masquage : vers le bas, ou dégradé aux deux extrémités. */
export type BlueprintFade = "none" | "bottom" | "both";

export interface BlueprintGridProps {
  density?: BlueprintDensity;
  fade?: BlueprintFade;
  /** Lumière de la bande hôte : la maille change d'encre sur papier. */
  teinte?: Lumiere;
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
const MAILLE_CROIX = 160;

/** Fond « papier millimétré », purement décoratif. */
export function BlueprintGrid({ density = "fine", fade = "none", teinte = "sombre", className }: BlueprintGridProps) {
  const maille = MAILLES[density];
  const masque = MASQUES[fade];
  // Sur papier, la maille s'encre en bleu de donnée (`steel-encre`, AA sur
  // ivoire) : le `steel-deep` historique reste réservé aux aplats sombres.
  const clair = estClaire(teinte);
  const trait = clair ? colors.lineEncre : colors.line;
  const croix = clair ? colors.steelEncre : colors.blueprint;
  const opaciteCroix = clair ? 0.18 : 0.3;

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
          backgroundImage: `linear-gradient(to right, ${trait} 1px, transparent 1px), linear-gradient(to bottom, ${trait} 1px, transparent 1px)`,
          backgroundSize: `${maille}px ${maille}px`,
        }}
      />

      {/* Croix de repérage */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: croix,
          opacity: opaciteCroix,
          maskImage: TUILE_CROIX,
          WebkitMaskImage: TUILE_CROIX,
          maskSize: `${MAILLE_CROIX}px ${MAILLE_CROIX}px`,
          WebkitMaskSize: `${MAILLE_CROIX}px ${MAILLE_CROIX}px`,
        }}
      />
    </div>
  );
}
