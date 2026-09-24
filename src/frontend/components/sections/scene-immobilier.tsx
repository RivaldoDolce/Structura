"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

export interface SceneImmobilierProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche: string;
  imageUrl: string;
  verifications: string[];
  actionPrincipale: { label: string; href: string };
  className?: string;
}

/**
 * Scène immobilier (plan V2 §5) : photographie immersive plein cadre, les
 * garanties dans un panneau translucide — le verre dépoli n'existe qu'ici,
 * flottant vraiment au-dessus de l'image. Retour au sombre assumé.
 */
export function SceneImmobilier({
  kicker,
  titre,
  accroche,
  imageUrl,
  verifications,
  actionPrincipale,
  className,
}: SceneImmobilierProps) {
  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-immobilier"
      data-scene="immobilier"
      data-lumiere="sombre"
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={imageUrl} alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="bg-fond/60 absolute inset-0" />
        <div className="from-fond via-fond/30 to-fond/60 absolute inset-0 bg-gradient-to-t" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto grid items-end gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <motion.div variants={fadeUpItem}>
            <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
          </motion.div>
          <motion.h2
            variants={fadeUpItem}
            className="font-display text-h2 text-ink max-w-xl font-bold"
          >
            {titre}
          </motion.h2>
          <motion.p variants={fadeUpItem} className="text-body text-ink-soft mt-4 max-w-xl">
            {accroche}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUpItem}
          className="rounded-card border-line bg-fond/70 border p-6 backdrop-blur-md md:p-8"
        >
          <ul className="space-y-4">
            {verifications.map((verification) => (
              <li key={verification} className="flex items-start gap-3">
                <Check aria-hidden="true" className="text-ok mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-body text-ink font-medium">{verification}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonTech asChild variant="conversion" size="lg" className="w-full sm:w-auto">
              <Link href={actionPrincipale.href}>{actionPrincipale.label}</Link>
            </ButtonTech>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
