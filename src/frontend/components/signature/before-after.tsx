"use client";
import { useCallback, useId, useRef, useState } from "react";
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

// Slider de comparaison avant/après : l'image après se révèle sous un voile
// rogné (clip-path), propriété animable côté GPU sans recalcul de mise en page.
export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "AVANT",
  afterLabel = "APRÈS",
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [glisse, setGlisse] = useState(false);
  const cadreRef = useRef<HTMLDivElement>(null);
  const aideId = useId();
  const mouvementReduit = useReducedMotion();

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
      setGlisse(true);
      placeCurseur(evenement.clientX);
    },
    [placeCurseur],
  );

  const pendantGlisse = useCallback(
    (evenement: PointeurEvenement<HTMLDivElement>) => {
      if (glisse) placeCurseur(evenement.clientX);
    },
    [glisse, placeCurseur],
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
      setPosition(cible);
    },
    [position],
  );

  return (
    <div className={cn("relative select-none", className)}>
      <div
        ref={cadreRef}
        onPointerDown={debutGlisse}
        onPointerMove={pendantGlisse}
        onPointerUp={finGlisse}
        onPointerLeave={finGlisse}
        onPointerCancel={finGlisse}
        className="relative aspect-[16/9] cursor-ew-resize touch-none overflow-hidden rounded-card bg-[var(--color-surface)]"
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          data-voile
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: mouvementReduit ? "none" : "clip-path 0.1s ease-out",
          }}
        >
          <img
            src={afterImage}
            alt={afterLabel}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
          <span className="rounded-control bg-[var(--color-base)]/80 px-3 py-1 font-mono text-mono-xs uppercase text-[var(--color-ink)] backdrop-blur-sm">
            {beforeLabel}
          </span>
          <span className="rounded-control bg-[var(--color-base)]/80 px-3 py-1 font-mono text-mono-xs uppercase text-[var(--color-ink)] backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>

        <div
          aria-hidden="true"
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute top-0 h-full w-0.5 bg-[var(--color-steel)]"
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
          className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-[var(--color-steel)] bg-[var(--color-surface)] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 active:cursor-grabbing"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="text-[var(--color-ink)]"
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
        Utilisez les flèches gauche et droite pour ajuster la comparaison. Origine pour tout
        avant, Fin pour tout après.
      </p>
    </div>
  );
}
