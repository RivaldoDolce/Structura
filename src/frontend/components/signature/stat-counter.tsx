"use client";
// Compteur déclenché au scroll via Motion : interaction donc rendu client.
import * as React from "react";
import { motion } from "motion/react";
import { useCounter } from "@/frontend/hooks/use-counter";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem } from "@/frontend/lib/animations";

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
      variants={fadeUpItem}
      initial="hidden"
      whileInView="show"
      // Seuil porté à 40 % : un compteur doit démarrer quand il est vraiment lu
      // dans son ensemble (GUIDE §2.3.4), contrairement au reste des cascades.
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={() => setVisible(true)}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <span className="font-display text-5xl font-bold tracking-tight text-[var(--color-ink)] md:text-6xl">
        {prefix}
        {formate}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-mono-xs uppercase text-[var(--color-ink-soft)]">
        {label}
      </span>
    </motion.div>
  );
}
