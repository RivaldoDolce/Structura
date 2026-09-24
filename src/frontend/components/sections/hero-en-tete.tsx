"use client";

import Image from "next/image";
import { cn } from "@/frontend/lib/cn";
import { Kicker } from "../signature/kicker";

export interface HeroEnTeteProps {
  /** Cartouche numéroté au-dessus du titre. */
  kicker: { number: string; label: string };
  /** Titre principal de la page. */
  titre: string;
  /** Phrase d'accroche sous le titre. */
  accroche: string;
  /** Fond du kit, servi en AVIF (converti depuis le PNG source). */
  image: string;
  /** Description du fond pour les lecteurs d'écran. */
  alt: string;
  /** Annotation mono optionnelle, façon trait de cote. */
  annotation?: string;
  /** Fil d'Ariane, posé au-dessus du cartouche. */
  ariane?: React.ReactNode;
  /** Contenu additionnel rendu sous l'accroche (CTA, filtres…). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * En-tête immersif des pages intérieures (composition C1 de l'audit §6.3) :
 * le fond blueprint du kit, assombri par un voile, porte le kicker et le
 * titre display. Le fond est un `next/image` prioritaire : c'est l'élément
 * LCP de l'écran, servi en AVIF par le script de conversion.
 */
export function HeroEnTete({
  kicker,
  titre,
  accroche,
  image,
  alt,
  annotation,
  ariane,
  children,
  className,
}: HeroEnTeteProps) {
  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="C1"
      data-surface="photo"
      data-lumiere="sombre"
      className={cn("relative flex items-end overflow-hidden", className)}
    >
      {/* Fond du kit : prioritaire (LCP), couvrant, voilé pour garantir le
          contraste AA du titre par-dessus. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="bg-fond/60 absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fond" />
      </div>

      <div className="max-w-content relative mx-auto w-full px-4 pt-40 pb-16 md:px-6 md:pt-56 md:pb-20">
        {ariane ? <div className="mb-6">{ariane}</div> : null}
        <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
        <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">{titre}</h1>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">{accroche}</p>
        {children}
      </div>

      {annotation ? (
        <p className="text-mono-xs text-blueprint/70 absolute right-6 bottom-6 hidden items-center gap-2 font-mono uppercase md:flex">
          <span className="bg-blueprint/70 h-px w-8" />
          {annotation}
        </p>
      ) : null}
    </section>
  );
}
