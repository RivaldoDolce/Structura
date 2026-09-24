"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, scaleReveal, staggerContainer } from "@/frontend/lib/animations";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

export interface SceneEbenisterieProps {
  kicker: { number: string; label: string };
  /** Nom de l'essence, rendu en serif éditoriale. */
  essence: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  badge: string;
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène ébénisterie (plan V2 §5) : l'atelier se reconnaît à sa matière sans
 * lire un mot — fond warm, macro verticale, nom d'essence en serif, badge
 * cuivre. L'image dérive légèrement au scroll sur desktop (transform pur,
 * coupé par le contrat de mouvement réduit global).
 */
export function SceneEbenisterie({
  kicker,
  essence,
  description,
  imageUrl,
  imageAlt,
  badge,
  href,
  hrefLabel,
  className,
}: SceneEbenisterieProps) {
  const racine = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: racine,
    offset: ["start end", "end start"],
  });
  const derive = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={racine}
      role="region"
      aria-label={`Ébénisterie ${essence}`}
      data-composition="scene-ebenisterie"
      data-scene="ebenisterie"
      data-lumiere="warm"
      className={cn("st-warm relative overflow-hidden py-24 md:py-32", className)}
    >
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1fr]"
      >
        <motion.div variants={scaleReveal} className="relative">
          <motion.div data-derive style={{ y: derive }} className="relative">
            <div className="rounded-card relative aspect-[4/5] max-h-[560px] w-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeUpItem}
            className="rounded-pill border-cuivre text-sable bg-fond/70 text-mono-xs absolute top-4 left-4 border px-4 py-1.5 font-mono uppercase backdrop-blur-sm"
          >
            {badge}
          </motion.div>
        </motion.div>

        <div className="lg:pt-16">
          <motion.div variants={fadeUpItem}>
            <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
          </motion.div>
          <motion.p
            variants={fadeUpItem}
            className="font-editorial text-h1 text-ink font-normal italic"
          >
            {essence}
          </motion.p>
          <motion.p variants={fadeUpItem} className="text-body text-ink-soft mt-4 max-w-xl">
            {description}
          </motion.p>
          <motion.div variants={fadeUpItem} className="mt-10">
            <ButtonTech asChild variant="conversion" size="lg">
              <Link href={href}>{hrefLabel}</Link>
            </ButtonTech>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
