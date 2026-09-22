"use client";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ClavierEvenement, PointerEvent as PointeurEvenement } from "react";
import { cn } from "@/frontend/lib/cn";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

export interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

// Écart appliqué à chaque pression de flèche, assez fin pour un réglage précis.
const PAS_CLAVIER = 5;

/*
 * Démonstration automatique du geste (audit §7.3) : le curseur part à 30 %,
 * pousse à 65 % pour montrer la révélation, puis se repose à 45 % — un
 * équilibre où les deux états restent lisibles. Elle s'exécute une seule fois
 * à l'affichage, dure environ 1,2 s et cède la main dès la première
 * interaction. En mouvement réduit, le comparateur reste simplement à 50 %.
 */
const POSITION_REPOS = 50;
const DEMO_AMORCE = 30;
const DEMO_POUSSEE = 65;
const DEMO_EQUILIBRE = 45;
const DEMO_DELAI_POUSSEE = 400;
const DEMO_DELAI_EQUILIBRE = 780;

// Slider de comparaison avant/après : l'image après se révèle sous un voile
// rogné (clip-path), propriété animable côté GPU sans recalcul de mise en page.
export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "AVANT",
  afterLabel = "APRÈS",
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(POSITION_REPOS);
  const [glisse, setGlisse] = useState(false);
  const [demonstration, setDemonstration] = useState(true);
  const cadreRef = useRef<HTMLDivElement>(null);
  const aideId = useId();
  const mouvementReduit = useReducedMotion();

  // Chorégraphie d'ouverture : chaque étape est une minuterie, toutes
  // annulées dès que l'utilisateur agit ou que le composant est démonté.
  useEffect(() => {
    if (mouvementReduit || !demonstration) return;

    setPosition(DEMO_AMORCE);
    const minuteries = [
      window.setTimeout(() => setPosition(DEMO_POUSSEE), DEMO_DELAI_POUSSEE),
      window.setTimeout(() => setPosition(DEMO_EQUILIBRE), DEMO_DELAI_EQUILIBRE),
    ];
    return () => minuteries.forEach((minuterie) => window.clearTimeout(minuterie));
  }, [demonstration, mouvementReduit]);

  /** L'utilisateur a repris la main : la démonstration s'arrête pour de bon. */
  const reprendLaMain = useCallback(() => setDemonstration(false), []);

  const placeCurseur = useCallback((abscisseClient: number) => {
    const cadre = cadreRef.current;
    if (!cadre) return;
    const cadreBox = cadre.getBoundingClientRect();
    if (cadreBox.width === 0) return;
    const pourcentage = ((abscisseClient - cadreBox.left) / cadreBox.width) * 100;
    setPosition(Math.max(0, Math.min(100, pourcentage)));
  }, []);

  const debutGlisse = useCallback(
    (evenement: PointeurEvenement<HTMLDivElement>) => {
      reprendLaMain();
      setGlisse(true);
      placeCurseur(evenement.clientX);
    },
    [placeCurseur, reprendLaMain]
  );

  const pendantGlisse = useCallback(
    (evenement: PointeurEvenement<HTMLDivElement>) => {
      if (glisse) placeCurseur(evenement.clientX);
    },
    [glisse, placeCurseur]
  );

  const finGlisse = useCallback(() => setGlisse(false), []);

  const toucheClavier = useCallback(
    (evenement: ClavierEvenement<HTMLDivElement>) => {
      let cible = position;
      switch (evenement.key) {
        case "ArrowLeft":
        case "ArrowDown":
          cible = Math.max(0, position - PAS_CLAVIER);
          break;
        case "ArrowRight":
        case "ArrowUp":
          cible = Math.min(100, position + PAS_CLAVIER);
          break;
        case "Home":
          cible = 0;
          break;
        case "End":
          cible = 100;
          break;
        default:
          return;
      }
      evenement.preventDefault();
      reprendLaMain();
      setPosition(cible);
    },
    [position, reprendLaMain]
  );

  // La démonstration se lit à 0,36 s par étape ; dès que l'utilisateur pilote,
  // le voile redevient quasi instantané pour un retour direct sous le doigt.
  const transitionClip = mouvementReduit
    ? "none"
    : demonstration
      ? "clip-path 0.36s ease-out"
      : "clip-path 0.1s ease-out";

  return (
    <div className={cn("relative select-none", className)}>
      <div
        ref={cadreRef}
        onPointerDown={debutGlisse}
        onPointerMove={pendantGlisse}
        onPointerUp={finGlisse}
        onPointerLeave={finGlisse}
        onPointerCancel={finGlisse}
        className="rounded-card bg-surface relative aspect-[16/9] cursor-ew-resize touch-none overflow-hidden"
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          draggable={false}
          className="object-cover"
        />

        <div
          data-voile
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: transitionClip,
          }}
        >
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            draggable={false}
            className="object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
          <span className="rounded-control bg-fond/80 text-mono-xs text-ink px-3 py-1 font-mono uppercase backdrop-blur-sm">
            {beforeLabel}
          </span>
          <span className="rounded-control bg-fond/80 text-mono-xs text-ink px-3 py-1 font-mono uppercase backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{ left: `${position}%` }}
          className="bg-steel pointer-events-none absolute top-0 h-full w-0.5"
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparaison avant/après"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-describedby={aideId}
          aria-orientation="horizontal"
          onKeyDown={toucheClavier}
          style={{ left: `${position}%` }}
          className="border-steel bg-surface focus-visible:ring-blueprint absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:cursor-grabbing"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="text-ink"
          >
            <path
              d="M6 10H2m0 0l3-3m-3 3l3 3m8-3h4m0 0l-3-3m3 3l-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p id={aideId} className="sr-only">
        Utilisez les flèches gauche et droite pour ajuster la comparaison. Origine pour tout avant,
        Fin pour tout après.
      </p>
    </div>
  );
}
