"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useCounter } from "@/frontend/hooks/use-counter";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem } from "@/frontend/lib/animations";
import { tonDe, type TonCartouche } from "@/frontend/lib/lumieres";

export interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  /** Ton du compteur : encre sur les bandes claires, ink par défaut. */
  tone?: TonCartouche;
  className?: string;
}

/**
 * Compteur animé, déclenché une seule fois à l'entrée dans le viewport.
 * Seuil porté à 40 % pour démarrer seulement quand le bloc est réellement lu.
 */
export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  tone = "sombre",
  className,
}: StatCounterProps) {
  const [visible, setVisible] = React.useState(false);
  const compte = useCounter({ end: visible ? value : 0, duration: 1200, delay: 100, decimals });
  const ton = tonDe(tone === "clair" ? "ivoire" : "sombre");

  const formate = compte.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      variants={fadeUpItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={() => setVisible(true)}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <span className={cn("font-display text-5xl font-bold tracking-tight md:text-6xl", ton.titre)}>
        {prefix}
        {formate}
        {suffix}
      </span>
      <span className={cn("text-mono-xs mt-2 font-mono uppercase", ton.texte)}>{label}</span>
    </motion.div>
  );
}
