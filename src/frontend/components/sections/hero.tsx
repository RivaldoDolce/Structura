"use client";
// Chorégraphie d'entrée « le plan se dessine » : animation donc rendu client.
import Link from "next/link";
import { motion } from "motion/react";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { fadeItem, fadeUpItem, staggerContainer, titleReveal } from "@/frontend/lib/animations";

// Premier écran de l'accueil : titre et CTA rendus au serveur pour le SEO et
// pour l'utilisateur qui n'attend jamais, grille blueprint en fond, titre
// révélé par masque vertical, annotations techniques en cascade (GUIDE §3.3.1).
export function Hero() {
  const animationsReduites = useReducedMotion();

  return (
    <section
      role="region"
      aria-label="Section d'accueil"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden md:min-h-[calc(100vh-5rem)]"
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid fade="both" className="absolute inset-0" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-content flex-col justify-center px-4 py-24 md:min-h-[calc(100vh-5rem)] md:px-6 md:py-32"
      >
        <motion.div variants={fadeItem}>
          <Kicker number="01" label="STRUCTURA" className="mb-6" />
        </motion.div>

        <motion.h1
          variants={fadeItem}
          className="max-w-4xl font-display text-display font-bold text-[var(--color-ink)]"
        >
          <span className="block overflow-hidden">
            <motion.span variants={titleReveal} className="block">
              L&apos;ingénierie qui
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={titleReveal}
              className="block bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] bg-clip-text text-transparent"
            >
              construit en confiance
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUpItem}
          className="mt-8 max-w-2xl text-body text-[var(--color-ink-soft)] md:text-lg"
        >
          De la rigueur du calcul de structure à la noblesse de la finition sur-mesure. Votre projet
          immobilier de A à Z à Yaoundé.
        </motion.p>

        <motion.div variants={fadeUpItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
          <ButtonTech asChild variant="ghost" size="lg">
            <Link href="/portfolio">Voir nos réalisations</Link>
          </ButtonTech>
        </motion.div>

        {/* Annotations de plan : décoratives, donc absentes en animations réduites. */}
        {animationsReduites ? null : (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              variants={fadeItem}
              className="absolute right-8 top-32 hidden items-center gap-2 font-mono text-mono-xs uppercase text-[var(--color-blueprint)]/60 md:flex"
            >
              <span className="h-px w-8 bg-[var(--color-blueprint)]/60" />
              <span>POTEAU BA Ø20</span>
            </motion.div>
            <motion.div
              variants={fadeItem}
              className="absolute bottom-32 left-8 hidden items-center gap-2 font-mono text-mono-xs uppercase text-[var(--color-blueprint)]/60 md:flex"
            >
              <span>8.40 m</span>
              <span className="h-px w-8 bg-[var(--color-blueprint)]/60" />
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}