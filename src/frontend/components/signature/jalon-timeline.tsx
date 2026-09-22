"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Clock, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { blurSettle, fadeUpItem, inViewOnce } from "@/frontend/lib/animations";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { presentationStatut, type StatutJalon } from "@/frontend/lib/statuts-jalon";
import { PriceTag } from "./price-tag";

export interface DocumentJalon {
  id: string;
  libelle: string;
  href: string;
  valide: boolean;
}

export interface ActionJalon {
  id: string;
  libelle: string;
  href: string;
}

export interface Jalon {
  id: string;
  label: string;
  /** Date prévue de l'étape, au format ISO. */
  date: string;
  /** Date réelle de réalisation, quand l'étape est faite. */
  dateReelle?: string;
  statut: StatutJalon;
  notes?: string;
  images?: string[];
  responsable?: string;
  duree?: string;
  /** Écart en jours : positif = retard, négatif = avance. */
  ecartJours?: number;
  depenseFcfa?: number;
  documents?: DocumentJalon[];
  actions?: ActionJalon[];
}

export interface JalonTimelineProps {
  jalons: Jalon[];
  className?: string;
}

// Seuil du passage en colonne éditoriale : le tracé animé n'a de sens que
// sur un écran où le rail et les cartes respirent côte à côte.
const SEUIL_COLONNE = "(min-width: 768px)";

/** Phrase l'écart entre le prévu et le réel, en langage de chantier. */
export function formuleEcart(jours: number): string {
  if (jours > 0) return `${jours} jour${jours > 1 ? "s" : ""} de retard`;
  if (jours < 0) {
    const avance = Math.abs(jours);
    return `${avance} jour${avance > 1 ? "s" : ""} d'avance`;
  }
  return "Réalisé dans les temps";
}

/**
 * Timeline de chantier vivante — signature produit, audit §8.1.
 *
 * Un rail central, un nœud par étape : chaque carte réunit date prévue et
 * réelle, photo en révélation différée, responsable, écart prévu-réel,
 * documents validés et dépense en FCFA. Les étapes actives se lisent par
 * l'écart de surface (carte élevée), pas par une bordure. Le rail se trace
 * au scroll sur desktop ; sous 768 px et en mouvement réduit, il reste figé.
 */
export function JalonTimeline({ jalons, className }: JalonTimelineProps) {
  const listeRef = useRef<HTMLOListElement>(null);
  const mouvementReduit = useReducedMotion();
  const [colonneEdito, setColonneEdito] = useState(false);

  useEffect(() => {
    const requete = window.matchMedia(SEUIL_COLONNE);
    const actualise = (): void => setColonneEdito(requete.matches);
    actualise();
    requete.addEventListener("change", actualise);
    return () => requete.removeEventListener("change", actualise);
  }, []);

  const { scrollYProgress } = useScroll({
    target: listeRef,
    offset: ["start 0.75", "end 0.45"],
  });
  const trace = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const traceAnime = colonneEdito && !mouvementReduit;

  return (
    <ol ref={listeRef} aria-label="Progression du chantier" className={cn("relative", className)}>
      {/* Rail : piste statique + trait tracé au scroll par-dessus. */}
      <div aria-hidden="true" className="absolute top-2 bottom-2 left-[21px] w-0.5 md:left-[27px]">
        <div className="bg-line absolute inset-0" />
        {traceAnime ? (
          <svg
            data-rail-trace
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
          >
            <motion.line
              data-rail-trait
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              pathLength={1}
              className="stroke-blueprint"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: trace }}
            />
          </svg>
        ) : (
          <div data-rail-trace className="bg-blueprint absolute inset-0" />
        )}
      </div>

      {jalons.map((jalon, index) => (
        <CarteJalon
          key={jalon.id}
          jalon={jalon}
          index={index}
          total={jalons.length}
        />
      ))}
    </ol>
  );
}


interface CarteJalonProps {
  jalon: Jalon;
  index: number;
  total: number;
}

/**
 * Carte d'un nœud : date prévue et date réelle à part, photo en révélation
 * différée, responsable, écart prévu-réel, documents et dépense. L'étape
 * active porte la carte élevée, les autres la carte ordinaire.
 */
function CarteJalon({ jalon, index, total }: CarteJalonProps) {
  const presentation = presentationStatut(jalon.statut);
  const photo = jalon.images?.[0];
  const quiEtCombien = [jalon.responsable, jalon.duree].filter(Boolean).join(" · ");

  return (
    <li
      data-statut={jalon.statut}
      className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-10 last:pb-0 md:grid-cols-[3.5rem_1fr] md:gap-8"
    >
      {/* Nœud : le symbole porte le sens, la couleur ne fait que l'habiller. */}
      <span
        aria-hidden="true"
        className={cn(
          "font-mono mt-6 flex h-11 w-11 items-center justify-center rounded-full border-2 text-base md:h-14 md:w-14",
          presentation.classesPoint
        )}
      >
        {presentation.symbole}
      </span>

      <motion.article
        variants={fadeUpItem}
        {...inViewOnce}
        aria-label={`Jalon ${index + 1} sur ${total} : ${jalon.label}, ${presentation.libelle.toLowerCase()}`}
        className={cn(
          "rounded-card max-w-3xl p-5 md:p-7",
          presentation.actif ? "st-raised" : "st-card"
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-mono-xs text-ink-mute font-mono uppercase">
              Jalon {String(index + 1).padStart(2, "0")} —{" "}
              <time dateTime={jalon.date}>
                {format(new Date(`${jalon.date}T00:00:00`), "d MMM yyyy", { locale: fr })}
              </time>
            </p>
            <h3 className="font-display text-h3 text-ink mt-2 font-semibold">{jalon.label}</h3>
          </div>
          <span
            className={cn(
              "rounded-pill text-mono-xs border px-3 py-1 font-mono uppercase",
              presentation.classes
            )}
          >
            {presentation.libelle}
          </span>
        </div>

        {jalon.dateReelle ? (
          <p className="text-small text-ink-soft mt-3">
            Réalisé le{" "}
            <time dateTime={jalon.dateReelle}>
              {format(new Date(`${jalon.dateReelle}T00:00:00`), "d MMM yyyy", { locale: fr })}
            </time>
            {jalon.ecartJours !== undefined ? ` — ${formuleEcart(jalon.ecartJours)}` : null}
          </p>
        ) : jalon.ecartJours !== undefined ? (
          <p className="text-small text-safety mt-3 font-medium">{formuleEcart(jalon.ecartJours)}</p>
        ) : null}

        {photo ? (
          <motion.div
            variants={blurSettle}
            {...inViewOnce}
            className="rounded-control relative mt-5 aspect-[16/10] overflow-hidden"
          >
            <Image
              src={photo}
              alt={`${jalon.label} — photo de chantier`}
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
            />
          </motion.div>
        ) : null}

        {quiEtCombien ? (
          <p className="text-small text-ink-soft mt-4">
            {jalon.responsable ? <span>Équipe — {jalon.responsable}</span> : null}
            {jalon.responsable && jalon.duree ? <span aria-hidden="true"> · </span> : null}
            {jalon.duree ? <span>Durée — {jalon.duree}</span> : null}
            <span className="sr-only">Fin des informations d&apos;équipe et de durée.</span>
          </p>
        ) : null}
        {jalon.notes ? <p className="text-small text-ink-soft mt-2">{jalon.notes}</p> : null}

        {jalon.documents && jalon.documents.length > 0 ? (
          <ul className="border-line mt-5 space-y-3 border-t pt-5">
            {jalon.documents.map((document) => (
              <li key={document.id} className="flex items-center justify-between gap-4">
                <Link
                  href={document.href}
                  className="text-small text-ink hover:text-blueprint focus-visible:ring-steel inline-flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <FileText aria-hidden="true" className="text-ink-mute h-4 w-4 shrink-0" />
                  {document.libelle}
                </Link>
                <span
                  className={cn(
                    "text-mono-xs inline-flex items-center gap-1 font-mono uppercase",
                    document.valide ? "text-ok" : "text-ink-mute"
                  )}
                >
                  {document.valide ? (
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                  {document.valide ? "Validé" : "En attente"}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {jalon.depenseFcfa !== undefined ? (
          <div className="mt-5">
            <p className="text-mono-xs text-ink-mute mb-2 font-mono uppercase">Dépense</p>
            <PriceTag amount={jalon.depenseFcfa} />
          </div>
        ) : null}

        {jalon.actions && jalon.actions.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {jalon.actions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="rounded-control border-line-strong text-small text-ink hover:border-blueprint hover:text-blueprint focus-visible:ring-steel inline-flex h-11 items-center border px-5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {action.libelle}
              </Link>
            ))}
          </div>
        ) : null}
      </motion.article>
    </li>
  );
}