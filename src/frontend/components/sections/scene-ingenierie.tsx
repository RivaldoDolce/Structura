"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import {
  drawLine,
  fadeUpItem,
  inViewOnce,
  scaleReveal,
  staggerContainer,
} from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

export interface PointIngenierie {
  valeur: string;
  label: string;
}

export interface SceneIngenierieProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche: string;
  imageUrl: string;
  imageAlt: string;
  points: PointIngenierie[];
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène ingénierie (plan V2 §5) : éditorial vertical sur ivoire, photo de
 * chantier débordante, mini-plan qui s'étire et données une à une. Le seul
 * endroit clair où le bleu structure reste légitime en grand : la donnée.
 */
export function SceneIngenierie({
  kicker,
  titre,
  accroche,
  imageUrl,
  imageAlt,
  points,
  href,
  hrefLabel,
  className,
}: SceneIngenierieProps) {
  const ton = tonDe("ivoire");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-ingenierie"
      data-scene="ingenierie"
      data-lumiere="ivoire"
      className={cn("st-ivoire st-lisiere relative overflow-hidden py-24 md:py-32", className)}
    >
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.1fr]"
      >
        <div>
          <motion.div variants={fadeUpItem}>
            <Kicker
              number={kicker.number}
              label={kicker.label}
              tone={ton.cartouche}
              className="mb-4"
            />
          </motion.div>
          <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2 max-w-xl font-bold", ton.titre)}>
            {titre}
          </motion.h2>
          <motion.p variants={fadeUpItem} className={cn("text-body mt-4 max-w-xl", ton.texte)}>
            {accroche}
          </motion.p>

          <motion.dl variants={fadeUpItem} className="mt-10 grid grid-cols-3 gap-6">
            {points.map((point) => (
              <div key={point.label}>
                <dd className={cn("font-display text-h3 font-bold", ton.accent)}>{point.valeur}</dd>
                <dt className={cn("text-mono-xs mt-1 font-mono uppercase", ton.texte)}>
                  {point.label}
                </dt>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUpItem} className="mt-10">
            <ButtonTech asChild variant={ton.bouton} size="lg">
              <Link href={href}>{hrefLabel}</Link>
            </ButtonTech>
          </motion.div>
        </div>

        <motion.div variants={scaleReveal} className="relative">
          <div className="rounded-card shadow-card overflow-hidden lg:-mr-10">
            <div className="relative aspect-[4/5] max-h-[560px] w-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            data-mini-plan
            className={cn(
              "rounded-control bg-paper/90 shadow-card absolute -bottom-6 left-4 border px-4 py-3 backdrop-blur-sm md:left-8",
              ton.filet
            )}
          >
            <svg
              viewBox="0 0 120 40"
              aria-hidden="true"
              className={cn("h-8 w-28", ton.accent)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <motion.line variants={drawLine} x1="4" y1="32" x2="116" y2="32" />
              <motion.line variants={drawLine} x1="4" y1="32" x2="4" y2="8" />
              <motion.line variants={drawLine} x1="60" y1="32" x2="60" y2="16" />
              <motion.line variants={drawLine} x1="116" y1="32" x2="116" y2="8" />
            </svg>
            <p className={cn("text-mono-xs mt-1 font-mono uppercase", ton.texte)}>
              Cote R+2 · 8,40 m
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
