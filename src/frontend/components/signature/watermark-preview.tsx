"use client";
// Blocage du clic droit et du glisser-déposer : gestionnaires DOM donc rendu client obligatoire.
import { useCallback } from "react";
import type { DragEvent as GlisserEvenement, MouseEvent as SourisEvenement } from "react";
import { cn } from "@/frontend/lib/cn";

export interface WatermarkPreviewProps {
  imageUrl: string;
  watermarkText: string;
  className?: string;
}

// Répétitions du filigrane pour couvrir l'image quelle que soit sa taille.
const REPETITIONS_FILIGRANE = 5;

// Aperçu dissuasif affiché avant achat : la vraie protection reste serveur
// (fichiers privés R2, autorisation, URL signée). Le contrôle fin du zoom
// relèvera d'une visionneuse dédiée au Sprint 2.
export function WatermarkPreview({ imageUrl, watermarkText, className }: WatermarkPreviewProps) {
  const bloqueMenu = useCallback((evenement: SourisEvenement<HTMLDivElement>) => {
    evenement.preventDefault();
  }, []);

  const bloqueGlisse = useCallback((evenement: GlisserEvenement<HTMLImageElement>) => {
    evenement.preventDefault();
  }, []);

  return (
    <div
      data-apercu-protege
      role="group"
      aria-label="Aperçu protégé du plan. Le téléchargement nécessite un achat."
      onContextMenu={bloqueMenu}
      style={{ WebkitTouchCallout: "none", userSelect: "none", WebkitUserSelect: "none" }}
      className={cn("relative select-none", className)}
    >
      <div className="relative overflow-hidden rounded-[16px] bg-[var(--color-surface)]">
        <img
          src={imageUrl}
          alt="Aperçu du plan avec filigrane de protection"
          loading="lazy"
          decoding="async"
          draggable={false}
          onDragStart={bloqueGlisse}
          className="block h-full w-full object-contain"
        />

        <div
          data-filigrane
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 100px, rgba(34, 211, 238, 0.1) 100px, rgba(34, 211, 238, 0.1) 200px)",
            }}
          />
          <div className="-rotate-45 space-y-8 text-center">
            {Array.from({ length: REPETITIONS_FILIGRANE }).map((_, ligne) => (
              <p
                key={`filigrane-${ligne}`}
                className="whitespace-nowrap font-mono text-2xl font-bold uppercase tracking-[0.2em] text-[var(--color-blueprint)]/40"
              >
                {watermarkText}
              </p>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] border-2 border-[var(--color-line-strong)]"
        />
      </div>

      <div className="mt-3 flex items-center gap-2 text-[var(--color-ink-soft)]">
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <p className="font-mono text-xs uppercase tracking-[0.08em]">
          Aperçu protégé — Achat requis pour télécharger
        </p>
      </div>
    </div>
  );
}
