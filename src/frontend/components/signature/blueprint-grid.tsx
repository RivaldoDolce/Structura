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
 * Tuile de croix de repérage du kit (160 px, trait de 16 px).
 *
 * Elle sert de masque alpha : un asset externe ne peut pas lire une variable
 * CSS, la teinte est donc appliquée par `backgroundColor`. Le kit dessine la
 * croix à 30 % d'alpha ; l'opacité reprend cette valeur pour rester fidèle au
 * visuel livré tout en laissant la couleur au token.
 */
const TUILE_CROIX = "url(/textures/textures-overlays/05-03_texture-croix-160.svg)";
const OPACITE_CROIX = 0.3;
const MAILLE_CROIX = 160;

/**
 * Fond « papier millimétré » du design system.
 *
 * Rendu en CSS pur (dégradés croisés) et en masque d'asset pour les croix :
 * aucune image de fond chargée dynamiquement, aucun coût de layout. Le filet
 * reprend exactement le tracé du kit (`rgba(148,163,184,.14)`, soit
 * `--color-line`), la croix reprend `--color-blueprint`.
 *
 * Purement décoratif : jamais porteur d'information, d'où `aria-hidden`.
 */
export function BlueprintGrid({ density = "fine", fade = "none", className }: BlueprintGridProps) {
  const maille = MAILLES[density];
  const masque = MASQUES[fade];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ maskImage: masque, WebkitMaskImage: masque }}
    >
      {/* Maille principale */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.line} 1px, transparent 1px), linear-gradient(to bottom, ${colors.line} 1px, transparent 1px)`,
          backgroundSize: `${maille}px ${maille}px`,
        }}
      />

      {/* Croix de repérage aux intersections majeures */}
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