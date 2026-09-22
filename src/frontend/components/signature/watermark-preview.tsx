"use client";
import Image from "next/image";
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
      className={cn("relative select-none [-webkit-touch-callout:none]", className)}
    >
      <div className="rounded-card bg-surface relative overflow-hidden">
        <Image
          src={imageUrl}
          alt="Aperçu du plan avec filigrane de protection"
          width={0}
          height={0}
          sizes="(max-width: 1200px) 100vw, 1200px"
          draggable={false}
          onDragStart={bloqueGlisse}
          style={{ width: "100%", height: "auto" }}
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
                className="tracking-annotation text-blueprint/40 font-mono text-2xl font-bold whitespace-nowrap uppercase"
              >
                {watermarkText}
              </p>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rounded-card border-line-strong pointer-events-none absolute inset-0 border-2"
        />
      </div>

      <div className="text-ink-soft mt-3 flex items-center gap-2">
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
        <p className="text-mono-xs font-mono uppercase">
          Aperçu protégé — Achat requis pour télécharger
        </p>
      </div>
    </div>
  );
}
