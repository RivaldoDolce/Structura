"use client";
import { motion } from "motion/react";
import { BlueprintGrid } from "../signature/blueprint-grid";
import { Kicker } from "../signature/kicker";
import { StatCounter } from "../signature/stat-counter";
import { TechDivider } from "../signature/tech-divider";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";

const CHIFFRES = [
  { value: 150, label: "Projets livrés", suffix: "+" },
  { value: 12, label: "Années d'expérience", suffix: "" },
  { value: 98, label: "Clients satisfaits", suffix: "%" },
  { value: 24, label: "Chantiers en cours", suffix: "" },
] as const;

// Bandeau de preuve : quatre compteurs animés une seule fois à l'entrée dans
// le viewport, sur une maille majeure (160 px) volontairement calme pour que
// les chiffres portent seuls. Deux colonnes sur mobile, quatre sur desktop.
export function Stats() {
  return (
    <section
      role="region"
      aria-label="Chiffres clés"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid density="major" fade="both" className="absolute inset-0" />
      </div>

      <div className="max-w-content relative mx-auto px-4 md:px-6">
        <motion.div variants={staggerContainer} {...inViewOnce} className="mb-16 text-center">
          <motion.div variants={fadeUpItem}>
            <Kicker number="02" label="CHIFFRES" className="mb-4 justify-center" />
          </motion.div>

          <motion.h2 variants={fadeUpItem} className="font-display text-h2 text-ink-soft font-bold">
            Une expertise qui se <span className="text-ink">mesure</span>
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
