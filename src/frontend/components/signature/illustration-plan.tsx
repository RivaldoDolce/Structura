import { cn } from "@/frontend/lib/cn";
import type { TypeBatiment } from "@/frontend/data/plans";

export interface IllustrationPlanProps {
  type: TypeBatiment;
  className?: string;
}

const TRAIT = "var(--color-encre)";
const TRAIT_SECONDAIRE = "var(--color-encre-soft)";
const TRAIT_ACCENT = "var(--color-steel-encre)";

/**
 * Silhouettes isométriques par type de bâtiment, dans la projection à 30°
 * déjà établie par `PlanDessin`.
 *
 * Elles ponctuent la photo du modèle dans la carte du catalogue : le tracé
 * reste en filigrane (opacité réduite) et disparaît au survol. Un modèle se
 * montre d'abord par son bâti réel, ensuite par sa lecture de plan — l'inverse
 * (tracé seul) ne prouvait rien.
 *
 * Le volume est calculé, pas dessiné à la main : `etages` empile des étages
 * de hauteur constante, ce qui garantit qu'un immeuble à cinq niveaux reste
 * géométriquement juste. Le duplex se distingue par sa forme — deux volumes
 * décalés, non par un étage de plus, qui le ferait ressembler à une villa.
 * Un type inconnu retombe sur la villa : la vignette reste une illustration,
 * jamais une erreur.
 */
export function IllustrationPlan({ type, className }: IllustrationPlanProps) {
  const volumes: Record<TypeBatiment, { etages: number; trame: boolean; volumes?: number }> = {
    villa: { etages: 2, trame: false },
    immeuble: { etages: 5, trame: true },
    duplex: { etages: 2, trame: false, volumes: 2 },
    terrain: { etages: 1, trame: false },
  };

  const { etages, trame, volumes: nbVolumes = 1 } = volumes[type] ?? volumes.villa;
  const typeDessine = (type in volumes ? type : "villa") satisfies TypeBatiment;

  // Projection isométrique : une marche de 40 px suit l'axe duoko, une montée
  // de 40 px l'axe vertical. Le volume est ancré sur son plancher bas.
  const LARGEUR = 210;
  const PROFONDEUR = 120;
  const HAUTEUR_ETAGE = 40;
  const x0 = 240 - LARGEUR / 2;
  const y0 = 340 - PROFONDEUR / 2;

  return (
    <figure
      data-illustration={typeDessine}
      className={cn("relative grid h-full w-full place-items-center", className)}
    >
      <svg
        viewBox="0 0 480 380"
        aria-hidden="true"
        focusable="false"
        className="h-auto w-full"
        fill="none"
        strokeWidth="1.5"
      >
        {Array.from({ length: etages }, (_, niveau) => {
          const yDalle = y0 - niveau * HAUTEUR_ETAGE;
          const yToit = yDalle - HAUTEUR_ETAGE;

          return (
            <g key={niveau} data-niveau={niveau + 1}>
              {/* Faces latérales : les deux plans visibles de la maçonnerie */}
              <polygon
                points={`${x0},${yDalle} ${x0 + LARGEUR},${yDalle - PROFONDEUR} ${x0 + LARGEUR},${
                  yToit - PROFONDEUR
                } ${x0},${yToit}`}
                stroke={TRAIT}
              />
              <polygon
                points={`${x0 + LARGEUR},${yDalle - PROFONDEUR} ${x0 + LARGEUR - PROFONDEUR / 2},${
                  yDalle
                } ${x0 + LARGEUR - PROFONDEUR / 2},${yToit} ${x0 + LARGEUR},${
                  yToit - PROFONDEUR
                }`}
                stroke={TRAIT}
              />

              {/* Trame de plancher : la dalle de l'étage, lisible en coupe */}
              <polygon
                points={`${x0},${yToit} ${x0 + LARGEUR},${yToit - PROFONDEUR} ${
                  x0 + LARGEUR - PROFONDEUR / 2
                },${yToit - PROFONDEUR / 2} ${x0 - PROFONDEUR / 2},${yToit - PROFONDEUR / 2}`}
                stroke={TRAIT_SECONDAIRE}
                strokeDasharray={trame ? undefined : "4 4"}
              />

              {/* Ouverture : une menuiserie par étage, à l'échelle du volume */}
              <polyline
                points={`${x0 + 46},${yDalle - 12} ${x0 + 86},${yDalle - 32} ${x0 + 86},${
                  yDalle - 58
                } ${x0 + 46},${yDalle - 38} ${x0 + 46},${yDalle - 12}`}
                stroke={TRAIT_SECONDAIRE}
              />
            </g>
          );
        })}

        {/* Toiture : la dernière dalle referme le volume */}
        <polygon
          points={`${x0},${y0 - etages * HAUTEUR_ETAGE} ${x0 + LARGEUR},${
            y0 - etages * HAUTEUR_ETAGE - PROFONDEUR
          } ${x0 + LARGEUR - PROFONDEUR / 2},${
            y0 - etages * HAUTEUR_ETAGE - PROFONDEUR / 2
          } ${x0 - PROFONDEUR / 2},${y0 - etages * HAUTEUR_ETAGE - PROFONDEUR / 2}`}
          stroke={TRAIT}
        />

        {/* Volume secondaire : le duplex se reconnaît à sa cascade, pas à sa
            hauteur — deux masses désolidarisées valent mieux qu'un étage de
            plus, qui le ferait ressembler à une villa. */}
        {Array.from({ length: Math.max(nbVolumes - 1, 0) }, (_, index) => {
          // Le second volume recule le long de l'axe duoko et perd un étage :
          // c'est la signature du plan en duplex.
          const decalage = (index + 1) * 74;
          const xBloc = x0 + decalage;
          const yBloc = y0 - (index + 1) * PROFONDEUR / 2;
          const etagesBloc = etages - 1;

          return (
            <g key={`volume-${index}`} data-volume={index + 2}>
              <polygon
                points={`${xBloc},${yBloc} ${xBloc + LARGEUR / 2},${yBloc - PROFONDEUR / 2} ${
                  xBloc + LARGEUR / 2
                },${yBloc - PROFONDEUR / 2 - etagesBloc * HAUTEUR_ETAGE} ${xBloc},${
                  yBloc - etagesBloc * HAUTEUR_ETAGE
                }`}
                stroke={TRAIT}
              />
              <polygon
                points={`${xBloc + LARGEUR / 2},${yBloc - PROFONDEUR / 2} ${
                  xBloc + LARGEUR
                },${yBloc - PROFONDEUR} ${xBloc + LARGEUR},${
                  yBloc - PROFONDEUR - etagesBloc * HAUTEUR_ETAGE
                } ${xBloc + LARGEUR / 2},${
                  yBloc - PROFONDEUR / 2 - etagesBloc * HAUTEUR_ETAGE
                }`}
                stroke={TRAIT}
              />
              <polygon
                points={`${xBloc},${yBloc - etagesBloc * HAUTEUR_ETAGE} ${xBloc + LARGEUR / 2},${
                  yBloc - PROFONDEUR / 2 - etagesBloc * HAUTEUR_ETAGE
                } ${xBloc + LARGEUR},${
                  yBloc - PROFONDEUR - etagesBloc * HAUTEUR_ETAGE
                } ${xBloc + LARGEUR / 2},${yBloc - PROFONDEUR / 2}`}
                stroke={TRAIT_SECONDAIRE}
              />
            </g>
          );
        })}

        {/* Cote de niveau, donnée et non décoration */}
        <line
          x1={x0 - PROFONDEUR / 2 - 24}
          y1={y0}
          x2={x0 - PROFONDEUR / 2 - 24}
          y2={y0 - etages * HAUTEUR_ETAGE}
          stroke={TRAIT_ACCENT}
        />
        {[...Array(etages + 1)].map((_, index) => {
          const yTrait = y0 - index * HAUTEUR_ETAGE;
          return (
            <line
              key={index}
              x1={x0 - PROFONDEUR / 2 - 30}
              y1={yTrait}
              x2={x0 - PROFONDEUR / 2 - 18}
              y2={yTrait}
              stroke={TRAIT_ACCENT}
            />
          );
        })}
        <text
          x={x0 - PROFONDEUR / 2 - 44}
          y={y0 - (etages * HAUTEUR_ETAGE) / 2}
          className="font-mono"
          fontSize="13"
          textAnchor="middle"
          fill={TRAIT_ACCENT}
          stroke="none"
        >
          {`R+${etages - 1}`}
        </text>
      </svg>
    </figure>
  );
}