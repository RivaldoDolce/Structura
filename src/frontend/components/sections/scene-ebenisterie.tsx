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
  /**
   * Position du point d'intérêt de la photo (`object-position`) : la scène
   * porte des macros dont la matière utile occupe souvent le tiers supérieur —
   * le centrage géométrique y rognerait la preuve.
   */
  position?: string;
  badge: string;
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène ébénisterie (plan V2 §5, LOT 3A : média dominant chevauché).
 *
 * L'acte 04 répond à l'acte 03 par l'inverse : la matière porte (image large
 * en débordement, ratio vertical conservé comme signature), le texte se pose
 * en panneau chevauché. `data-ratio` et `data-motion` distinguent les deux
 * grammaires — V3 §3.3 exige deux dimensions variées minimum.
 */
export function SceneEbenisterie({
  kicker,
  essence,
  description,
  imageUrl,
  imageAlt,
  position = "50% 20%",
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
      data-ratio="media-dominant"
      data-motion="matiere"
      className={cn("st-warm relative overflow-hidden py-24 md:py-32", className)}
    >
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.25fr_1fr]"
      >
        <motion.div variants={scaleReveal} className="relative lg:-ml-10">
          <motion.div data-derive style={{ y: derive }} className="relative">
            <div className="rounded-card relative aspect-square w-full overflow-hidden lg:aspect-[4/5] lg:max-h-[560px]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 40vw"
                style={{ objectPosition: position }}
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

        {/*
          Panneau chevauché : le texte ne repose JAMAIS sur la photo. Les
          marges négatives (`-ml-16`) le font entrer sur le visuel — c'est la
          grammaire « média dominant » — mais la surface opaque et son filet
          garantissent le contraste au point de lecture. Sans elle, l'acte 04
          produisait exactement le défaut signalé : texte entremêlé à l'image.
        */}
        <div
          data-panneau-texte
          className="border-line bg-surface-deep relative z-10 min-w-[18rem] flex-1 rounded-card border p-8 lg:-mr-10 lg:-ml-16 lg:mt-8 lg:p-10"
        >
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
