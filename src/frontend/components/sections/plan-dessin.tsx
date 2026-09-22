import { cn } from "@/frontend/lib/cn";

export interface PlanDessinProps {
  className?: string;
}

const TRAIT = "var(--color-ink)";
const TRAIT_SECONDAIRE = "var(--color-ink-soft)";
const TRAIT_TECHNIQUE = "var(--color-blueprint)";

/**
 * Villa isométrique dessinée en traits (projection 30°, unité 40 px).
 * Décorative pour les lecteurs d'écran ; le sens est porté par le titre du hero.
 *
 * Sans JavaScript — ou avant hydratation — chaque trait est affiché : le plan
 * est « déjà dessiné ». Le scénario GSAP pose `stroke-dasharray` au montage
 * puis rejoue le tracé au scroll, jamais l'inverse : aucun contenu caché.
 */
export function PlanDessin({ className }: PlanDessinProps) {
  return (
    <figure className={cn("relative", className)}>
      <svg
        viewBox="0 0 480 400"
        aria-hidden="true"
        className="h-auto w-full"
        focusable="false"
        stroke={TRAIT}
        strokeWidth="1.5"
        fill="none"
      >
        {/* Dalle en plan */}
        <polygon data-trace data-fill points="245,185 455,305 315,385 105,265" />
        <line data-trace x1="245" y1="185" x2="315" y2="285" />
        <line data-trace x1="315" y1="385" x2="245" y2="185" stroke={TRAIT_SECONDAIRE} />
        <line data-trace x1="105" y1="265" x2="315" y2="285" stroke={TRAIT_SECONDAIRE} />

        {/* Murs RDC */}
        <polygon data-trace data-fill points="245,185 455,305 455,205 245,85" />
        <polygon data-trace data-fill points="455,305 315,385 315,285 455,205" />
        <line data-trace x1="105" y1="265" x2="105" y2="165" stroke={TRAIT_SECONDAIRE} />
        <line data-trace x1="105" y1="165" x2="245" y2="85" stroke={TRAIT_SECONDAIRE} />

        {/* Murs étage */}
        <polygon data-trace data-fill points="245,85 455,205 455,125 245,5" />
        <polygon data-trace data-fill points="455,205 315,285 315,205 455,125" />
        <line data-trace x1="105" y1="165" x2="105" y2="85" stroke={TRAIT_SECONDAIRE} />
        <line data-trace x1="105" y1="85" x2="245" y2="5" stroke={TRAIT_SECONDAIRE} />

        {/* Toit-terrasse et acrotère */}
        <polygon data-trace data-fill points="245,5 455,125 315,205 105,85" />
        <polygon data-trace points="245,25 435,130 305,195 125,100" stroke={TRAIT_SECONDAIRE} />

        {/* Menuiseries */}
        <polyline
          data-trace
          points="315,225 357,249 357,177 315,153 315,225"
          stroke={TRAIT_SECONDAIRE}
        />
        <polyline
          data-trace
          points="273,109 308,127 308,77 273,59 273,109"
          stroke={TRAIT_SECONDAIRE}
        />
        <polyline
          data-trace
          points="360,171 417,200 417,150 360,121 360,171"
          stroke={TRAIT_SECONDAIRE}
        />
        <polyline
          data-trace
          points="322,257 360,276 360,242 322,223 322,257"
          stroke={TRAIT_SECONDAIRE}
        />

        {/* Garde-corps du balcon */}
        <polyline data-trace points="204,61 245,82 294,107 275,118" stroke={TRAIT_SECONDAIRE} />

        {/* Panneaux solaires */}
        <polygon data-trace points="160,80 245,123 230,140 145,97" stroke={TRAIT_TECHNIQUE} />
        <polygon data-trace points="258,129 330,165 315,182 243,146" stroke={TRAIT_TECHNIQUE} />

        {/* Cotes de chantier */}
        <line data-trace x1="150" y1="330" x2="465" y2="330" stroke={TRAIT_TECHNIQUE} />
        <line data-trace x1="150" y1="322" x2="150" y2="338" stroke={TRAIT_TECHNIQUE} />
        <line data-trace x1="465" y1="322" x2="465" y2="338" stroke={TRAIT_TECHNIQUE} />
        <line data-trace x1="440" y1="95" x2="440" y2="240" stroke={TRAIT_TECHNIQUE} />
        <line data-trace x1="432" y1="95" x2="448" y2="95" stroke={TRAIT_TECHNIQUE} />
        <line data-trace x1="432" y1="240" x2="448" y2="240" stroke={TRAIT_TECHNIQUE} />
        <g data-annotation>
          <text x="290" y="322" className="font-mono" fontSize="13" fill={TRAIT_TECHNIQUE}>
            12.00 m
          </text>
          <text x="452" y="170" className="font-mono" fontSize="13" fill={TRAIT_TECHNIQUE}>
            4.50 m
          </text>
        </g>

        {/* Croix de repérage */}
        <g data-trace stroke={TRAIT_TECHNIQUE}>
          <line x1="105" y1="258" x2="105" y2="272" strokeWidth="1" />
          <line x1="98" y1="265" x2="112" y2="265" strokeWidth="1" />
          <line x1="455" y1="298" x2="455" y2="312" strokeWidth="1" />
          <line x1="448" y1="305" x2="462" y2="305" strokeWidth="1" />
        </g>
      </svg>
    </figure>
  );
}
