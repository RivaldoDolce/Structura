"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

/** Preuve de l'étude : un couple donnée/valeur, jamais une phrase. */
export interface PreuveEtude {
  label: string;
  valeur: string;
}

export interface SceneEtudePrealableProps {
  numero: string;
  titre: string;
  accroche: string;
  imageUrl: string;
  imageAlt: string;
  preuves: PreuveEtude[];
  livrables: string[];
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène 01 — l'étude préalable (V3 §7.3).
 *
 * Asymétrie franche : 40 % de texte, 60 % de photo, et l'image mord hors du
 * container éditorial pour casser l'axe. Le numéro est posé dans la colonne de
 * texte, au-dessus du titre — il fait partie de la composition au lieu de
 * flotter comme un badge.
 *
 * Les preuves sont un tableau dense terme/valeur : trois relevés ne méritent
 * pas trois cartes, qui transformeraient l'acte en mosaïque d'icônes.
 */
export function SceneEtudePrealable({
  numero,
  titre,
  accroche,
  imageUrl,
  imageAlt,
  preuves,
  livrables,
  href,
  hrefLabel,
  className,
}: SceneEtudePrealableProps) {
  const ton = tonDe("ivoire");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-etude"
      data-scene="etude-prealable"
      data-lumiere="ivoire"
      data-ratio="40-60"
      className={cn("st-ivoire st-lisiere relative overflow-hidden py-24 md:py-32", className)}
    >
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="mx-auto grid items-start gap-12 px-4 md:px-6 lg:grid-cols-[2fr_3fr] lg:gap-16"
      >
        <div data-colonne-texte className="relative">
          <motion.p
            data-numero-scene
            variants={fadeUpItem}
            className={cn(
              "font-display text-h2 text-line-encre-strong font-bold tabular-nums",
              ton.filet
            )}
          >
            {numero}
          </motion.p>

          <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2b font-bold", ton.titre)}>
            {titre}
          </motion.h2>
          <motion.p variants={fadeUpItem} className={cn("text-body mt-5", ton.texte)}>
            {accroche}
          </motion.p>

          {/* Relevés d'étude : un tableau, pas une galerie de cartes. */}
          <motion.dl variants={fadeUpItem} className={cn("mt-10 border-y", ton.filet)}>
            {preuves.map((preuve) => (
              <div key={preuve.label} data-preuve className="flex items-baseline justify-between gap-6 py-3">
                <dt className={cn("text-mono-xs font-mono uppercase", ton.texte)}>{preuve.label}</dt>
                <dd className={cn("text-small text-right font-medium", ton.accent)}>{preuve.valeur}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.ul variants={fadeUpItem} className="mt-8 space-y-2">
            {livrables.map((livrable) => (
              <li key={livrable} className={cn("flex items-start gap-3 text-small", ton.texte)}>
                <Check aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", ton.puce)} />
                {livrable}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUpItem} className="mt-10">
            <ButtonTech asChild variant={ton.bouton} size="lg">
              <Link href={href}>{hrefLabel}</Link>
            </ButtonTech>
          </motion.div>
        </div>

        {/* Le média déborde à droite : l'acte sort du cadre éditorial. */}
        <motion.figure
          data-hors-container
          variants={fadeUpItem}
          className="relative lg:-mr-[8vw] lg:pl-4"
        >
          <div className="bg-surface-raised relative aspect-[4/5] overflow-hidden rounded-card md:aspect-[3/4]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <Kicker
            label={`${numero} — ${titre.toUpperCase()}`}
            tone={ton.cartouche}
            className="mt-4 lg:pl-4"
          />
        </motion.figure>
      </motion.div>
    </section>
  );
}
