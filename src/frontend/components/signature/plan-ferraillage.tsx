import { cn } from "@/frontend/lib/cn";

export interface PlanFerraillageProps {
  className?: string;
}

const TRAIT = "var(--color-ink)";
const TRAIT_FIN = "var(--color-ink-soft)";
const TRAIT_COTE = "var(--color-blueprint)";

/** Barres du ferraillage : `{ x, y, largeur, hauteur, diametre }`. */
const BARRES = [
  { x: 90, y: 60, largeur: 300, hauteur: 14, diametre: 12 },
  { x: 90, y: 96, largeur: 300, hauteur: 14, diametre: 12 },
  { x: 90, y: 250, largeur: 300, hauteur: 14, diametre: 16 },
  { x: 90, y: 286, largeur: 300, hauteur: 14, diametre: 16 },
  { x: 130, y: 74, largeur: 12, hauteur: 208, diametre: 12 },
  { x: 250, y: 74, largeur: 12, hauteur: 208, diametre: 12 },
  { x: 350, y: 74, largeur: 12, hauteur: 208, diametre: 16 },
];

/**
 * Plan de ferraillage —|Title 3 de la méthode.
 *
 * Schéma d'exécution en traits, pas une photographie : le document que
 * l'équipe suit sur le terrain se montre comme un plan coté, avec ses barres
 * en nappe, ses recouvrements et ses Chainage. Décorative — le sens est porté
 * par le titre de la scène.
 */
export function PlanFerraillage({ className }: PlanFerraillageProps) {
  return (
    <figure className={cn("relative", className)}>
      <svg
        viewBox="0 0 480 360"
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeWidth="1.5"
        className="h-auto w-full"
      >
        {/* Enrobage : le périmètre du béton, tracé en pointillé */}
        <rect data-trace x="70" y="40" width="340" height="280" stroke={TRAIT_FIN} strokeDasharray="6 6" />

        {/* Fondations : les deux semelles, avec leur armature en nappe */}
        {BARRES.map((barre, index) => (
          <rect
            key={`barre-${index}`}
            data-trace
            x={barre.x}
            y={barre.y}
            width={barre.largeur}
            height={barre.hauteur}
            stroke={barre.diametre >= 16 ? TRAIT : TRAIT_FIN}
          />
        ))}

        {/* Poteaux : chainage vertical, avec les cadres de confinement */}
        {[0, 1, 2].map((rangee) => {
          const x = 80 + rangee * 145;
          return (
            <g key={`poteau-${rangee}`}>
              <line data-trace x1={x} y1="40" x2={x} y2="320" stroke={TRAIT} />
              <line data-trace x1={x + 110} y1="40" x2={x + 110} y2="320" stroke={TRAIT} />
              {Array.from({ length: 6 }, (_, niveau) => (
                <line
                  key={niveau}
                  data-trace
                  x1={x}
                  y1={70 + niveau * 42}
                  x2={x + 110}
                  y2={70 + niveau * 42}
                  stroke={TRAIT_FIN}
                />
              ))}
            </g>
          );
        })}

        {/* Poutre de chainage : la liaison continue, exigence sismique */}
        <line data-trace x1="70" y1="180" x2="410" y2="180" stroke={TRAIT} />
        <line data-trace x1="70" y1="188" x2="410" y2="188" stroke={TRAIT_FIN} />

        {/* Cotes : chaîne des travées, altitude des niveaux */}
        <g>
          <line data-trace x1="70" y1="345" x2="410" y2="345" stroke={TRAIT_COTE} />
          {[70, 225, 410].map((x) => (
            <line key={x} data-trace x1={x} y1="339" x2={x} y2="351" stroke={TRAIT_COTE} />
          ))}
          <text x="140" y="358" fill="var(--color-blueprint)" fontSize="11" fontFamily="var(--font-mono)">
            4,20 m
          </text>
          <text x="300" y="358" fill="var(--color-blueprint)" fontSize="11" fontFamily="var(--font-mono)">
            5,10 m
          </text>
        </g>
        <g>
          <line data-trace x1="430" y1="40" x2="430" y2="320" stroke={TRAIT_COTE} />
          {[40, 180, 320].map((y) => (
            <line key={y} data-trace x1="424" y1={y} x2="436" y2={y} stroke={TRAIT_COTE} />
          ))}
          <text x="440" y="114" fill="var(--color-blueprint)" fontSize="11" fontFamily="var(--font-mono)">
            +3,20
          </text>
          <text x="440" y="254" fill="var(--color-blueprint)" fontSize="11" fontFamily="var(--font-mono)">
            +0,00
          </text>
        </g>
      </svg>
    </figure>
  );
}
