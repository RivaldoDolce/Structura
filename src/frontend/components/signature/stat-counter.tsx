"use client";
// Compteur déclenché au scroll via Motion : interaction donc rendu client.
import * as React from "react";
import { motion } from "motion/react";
import { useCounter } from "@/frontend/hooks/use-counter";
import { cn } from "@/frontend/lib/cn";

export interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

// Compteur animé une seule fois à l'entrée dans le viewport.
// Le hook ne démarre que lorsque hasBeenVisible bascule, jamais avant.
export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: StatCounterProps) {
  const [visible, setVisible] = React.useState(false);
  const compte = useCounter({ end: visible ? value : 0, duration: 1200, delay: 100, decimals });

  const formate = compte.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setVisible(true)}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <span className="font-heading text-5xl font-bold tracking-tight text-[var(--color-ink)] md:text-6xl">
        {prefix}
        {formate}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
        {label}
      </span>
    </motion.div>
  );
}
