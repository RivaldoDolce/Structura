"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { fadeItem, fadeUpItem, staggerContainer, titleReveal } from "@/frontend/lib/animations";
import { HeroScenario } from "./hero-scenario";
import { PlanDessin } from "./plan-dessin";

/** Premier écran de l'accueil : titre et CTA côté serveur, plan rejoué au scroll sur desktop. */
export function Hero() {
  const racine = useRef<HTMLElement>(null);
  const animationsReduites = useReducedMotion();

  return (
    <section
      ref={racine}
      role="region"
      aria-label="Section d'accueil"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden md:min-h-[calc(100vh-5rem)]"
    >
      <div data-blueprint-grid data-parallax="" data-parallax-vitesse="0.94" aria-hidden="true">
        <BlueprintGrid fade="both" className="absolute inset-0" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="max-w-content relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col justify-center px-4 py-24 md:min-h-[calc(100vh-5rem)] md:px-6 md:py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div variants={fadeItem}>
              <Kicker number="01" label="STRUCTURA" className="mb-6" />
            </motion.div>

            <motion.h1
              variants={fadeItem}
              className="font-display text-display text-ink max-w-4xl font-bold"
            >
              <span className="block overflow-hidden">
                <motion.span variants={titleReveal} className="block">
                  L&apos;ingénierie qui
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={titleReveal}
                  className="from-steel to-blueprint block bg-gradient-to-r bg-clip-text text-transparent"
                >
                  construit en confiance
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-body text-ink-soft mt-8 max-w-2xl md:text-lg"
            >
              De la rigueur du calcul de structure à la noblesse de la finition sur-mesure. Votre
              projet immobilier de A à Z à Yaoundé.
            </motion.p>

            <motion.div variants={fadeUpItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonTech asChild variant="conversion" size="lg">
                <Link href="/devis">Demander un devis</Link>
              </ButtonTech>
              <ButtonTech asChild variant="ghost" size="lg">
                <Link href="/portfolio">Voir nos réalisations</Link>
              </ButtonTech>
            </motion.div>
          </div>

          <motion.div
            variants={fadeItem}
            data-parallax=""
            data-parallax-vitesse="1"
            className="relative mx-auto w-full max-w-xl"
          >
            <PlanDessin />
          </motion.div>
        </div>

        {animationsReduites ? null : (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              variants={fadeItem}
              data-parallax=""
              data-parallax-vitesse="1.06"
              className="text-mono-xs text-blueprint/60 absolute top-32 right-8 hidden items-center gap-2 font-mono uppercase md:flex"
            >
              <span className="bg-blueprint/60 h-px w-8" />
              <span>POTEAU BA Ø20</span>
            </motion.div>
            <motion.div
              variants={fadeItem}
              data-parallax=""
              data-parallax-vitesse="1.06"
              className="text-mono-xs text-blueprint/60 absolute bottom-32 left-8 hidden items-center gap-2 font-mono uppercase md:flex"
            >
              <span>8.40 m</span>
              <span className="bg-blueprint/60 h-px w-8" />
            </motion.div>
          </div>
        )}
      </motion.div>

      <HeroScenario racine={racine} />
    </section>
  );
}
