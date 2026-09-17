"use client";
// Chorégraphie d'entrée « le plan se dessine » : animation donc client.
import Link from "next/link";
import { motion } from "motion/react";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

// Premier écran de l'accueil : H1 et CTA rendus au SSR pour le SEO,
// grille blueprint en fondu, titre révélé par masque vertical, annotations
// techniques en cascade. Tout est coupé si les animations sont réduites.
export function Hero() {
  const animationsReduites = useReducedMotion();

  return (
    <section
      role="region"
      aria-label="Section d'accueil"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden md:min-h-[calc(100vh-5rem)]"
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="medium" fade="both" className="absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1200px] flex-col justify-center px-4 py-24 md:min-h-[calc(100vh-5rem)] md:px-6 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationsReduites ? 0 : 0.4, delay: animationsReduites ? 0 : 0.1 }}
        >
          <Kicker number="01" label="STRUCTURA" className="mb-6" />
        </motion.div>

        <motion.h1
          initial="masque"
          animate="visible"
          variants={{
            masque: {},
            visible: { transition: { staggerChildren: animationsReduites ? 0 : 0.1 } },
          }}
          className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] text-[var(--color-ink)] md:text-7xl"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                masque: { y: "100%" },
                visible: {
                  y: 0,
                  transition: {
                    duration: animationsReduites ? 0 : 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="block"
            >
              L&apos;ingénierie qui
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                masque: { y: "100%" },
                visible: {
                  y: 0,
                  transition: {
                    duration: animationsReduites ? 0 : 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="block bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] bg-clip-text text-transparent"
            >
              construit en confiance
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationsReduites ? 0 : 0.5, delay: animationsReduites ? 0 : 0.4 }}
          className="mt-8 max-w-2xl text-lg text-[var(--color-ink-soft)] md:text-xl"
        >
          De la rigueur du calcul de structure à la noblesse de la finition sur-mesure.
          Votre projet immobilier de A à Z à Yaoundé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationsReduites ? 0 : 0.5, delay: animationsReduites ? 0 : 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
          <ButtonTech asChild variant="ghost" size="lg">
            <Link href="/portfolio">Voir nos réalisations</Link>
          </ButtonTech>
        </motion.div>

        {animationsReduites ? null : (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute right-8 top-32 hidden font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-blueprint)]/60 md:block"
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-[var(--color-blueprint)]/60" />
                <span>POTEAU BA Ø20</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute bottom-32 left-8 hidden font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-blueprint)]/60 md:block"
            >
              <div className="flex items-center gap-2">
                <span>8.40 m</span>
                <span className="h-px w-8 bg-[var(--color-blueprint)]/60" />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
