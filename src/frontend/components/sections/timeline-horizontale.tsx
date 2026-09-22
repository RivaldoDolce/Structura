"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { blurSettle, fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { presentationStatut, type StatutJalon } from "@/frontend/lib/statuts-jalon";
import { Kicker } from "../signature/kicker";

export interface JalonVitrine {
  id: string;
  label: string;
  date: string;
  statut: StatutJalon;
  imageUrl: string;
  alt: string;
  note?: string;
}

export interface TimelineHorizontaleProps {
  jalons: JalonVitrine[];
  kicker: { number: string; label: string };
  titre: string;
  accroche: string;
  /** Phrase de promesse affichée sous la piste — prépare l'espace client. */
  promesse: string;
  className?: string;
}

/**
 * Composition C5 — le journal de chantier (audit §6.1 acte 5), section pivot.
 *
 * Piste horizontale en scroll-snap : à une main, chaque jalon défile d'un seul
 * geste. Les photos se posent en `blurSettle` et les dates restent en mono —
 * ce sont des valeurs datées. C'est la vitrine de la signature produit : elle
 * annonce l'espace de suivi client sans promettre une fonctionnalité absente.
 */
export function TimelineHorizontale({
  jalons,
  kicker,
  titre,
  accroche,
  promesse,
  className,
}: TimelineHorizontaleProps) {
  return (
    <section
      role="region"
      aria-label="Journal de chantier"
      data-composition="C5"
      data-surface="deep"
      className={cn("bg-surface-deep overflow-hidden py-24 md:py-32", className)}
    >
      <div className="max-w-content mx-auto px-4 md:px-6">
        <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
        <h2 className="font-display text-h2 text-ink-soft max-w-3xl font-bold">{titre}</h2>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">{accroche}</p>
      </div>

      <motion.ol
        data-piste
        variants={staggerContainer}
        {...inViewOnce}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:px-6"
      >
        {jalons.map((jalon, index) => {
          const presentation = presentationStatut(jalon.statut);

          return (
            <motion.li
              key={jalon.id}
              data-jalon
              data-statut={jalon.statut}
              variants={fadeUpItem}
              className="st-card rounded-card w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[22rem]"
            >
              <div className="relative aspect-[4/3]">
                <motion.div variants={blurSettle} className="absolute inset-0">
                  <Image
                    src={jalon.imageUrl}
                    alt={jalon.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, 22rem"
                    className="object-cover"
                  />
                </motion.div>
                <span
                  className={cn(
                    "rounded-pill bg-fond/80 text-mono-xs absolute top-3 left-3 border px-3 py-1 font-mono uppercase backdrop-blur-sm",
                    presentation.classes
                  )}
                >
                  {presentation.libelle}
                </span>
              </div>

              <div className="p-5">
                <p className="text-mono-xs text-ink-mute font-mono uppercase">
                  Jalon {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-h3 text-ink mt-2 font-semibold">{jalon.label}</h3>
                <time
                  dateTime={jalon.date}
                  className="text-mono-xs text-blueprint mt-2 block font-mono uppercase"
                >
                  {format(new Date(`${jalon.date}T00:00:00`), "d MMMM yyyy", { locale: fr })}
                </time>
                {jalon.note ? <p className="text-small text-ink-soft mt-3">{jalon.note}</p> : null}
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <p className="text-body text-safety mx-auto mt-8 max-w-content px-4 font-medium md:px-6">
        {promesse}
      </p>
    </section>
  );
}
