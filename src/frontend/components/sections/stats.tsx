"use client";
// Compteurs déclenchés au scroll : animation donc rendu client.
import { motion } from "motion/react";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";
import { StatCounter } from "../signature/stat-counter";
import { TechDivider } from "../signature/tech-divider";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

const CHIFFRES = [
  { value: 150, label: "Projets livrés", suffix: "+" },
  { value: 12, label: "Années d'expérience", suffix: "" },
  { value: 98, label: "Clients satisfaits", suffix: "%" },
  { value: 24, label: "Chantiers en cours", suffix: "" },
] as const;

// Bandeau de preuve : 4 compteurs animés une fois visibles, sur fond
// blueprint discret. Deux colonnes sur mobile, quatre sur desktop.
export function Stats() {
  const animationsReduites = useReducedMotion();

  return (
    <section
      role="region"
      aria-label="Chiffres clés"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="low" fade="both" className="absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <motion.div
          initial="masquee"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            masquee: {},
            visible: { transition: { staggerChildren: animationsReduites ? 0 : 0.06 } },
          }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={{
              masquee: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <Kicker number="02" label="CHIFFRES" className="mb-4 justify-center" />
          </motion.div>

          <motion.h2
            variants={{
              masquee: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="font-heading text-3xl font-bold text-[var(--color-ink)] md:text-5xl"
          >
            Une expertise qui se{" "}
            <span className="bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] bg-clip-text text-transparent">
              mesure
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {CHIFFRES.map((chiffre) => (
            <StatCounter
              key={chiffre.label}
              value={chiffre.value}
              label={chiffre.label}
              suffix={chiffre.suffix}
            />
          ))}
        </div>

        <div className="mt-16">
          <TechDivider label="CERTIFIÉ" />
        </div>
      </div>
    </section>
  );
}
