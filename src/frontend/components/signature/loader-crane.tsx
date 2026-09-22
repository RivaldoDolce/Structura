"use client";

import { motion } from "motion/react";
import type { Transition } from "motion/react";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

// Cycle unique pour le braquage de la flèche et la montée de la charge : les
// deux mouvements restent synchronisés et transform-only (aucun repaint).
const DUREE_CYCLE = 4.8;

const TRANSITION_CYCLE: Transition = {
  duration: DUREE_CYCLE,
  times: [0, 0.5, 1],
  ease: "easeInOut",
  repeat: Infinity,
};

const HACHURES = Array.from({ length: 25 }, (_, i) => ({
  x1: i * 15,
  x2: i * 15 - 6,
}));

export interface LoaderCraneProps {
  label?: string;
}

/** Écran de chargement : une grue braque sa flèche et hisse sa charge. */
export function LoaderCrane({ label = "Chargement" }: LoaderCraneProps) {
  const mouvementReduit = useReducedMotion();

  return (
    <div role="status" aria-live="polite" className="flex w-full flex-col items-center gap-8 py-16">
      <svg
        viewBox="0 0 360 260"
        className="h-56 w-full max-w-sm"
        aria-hidden="true"
        style={mouvementReduit ? { display: "none" } : undefined}
      >
        {/* Sol hachuré, façon dessin technique */}
        <g stroke="var(--color-ink-mute)" strokeWidth="1">
          <line x1="0" y1="250" x2="360" y2="250" />
          {HACHURES.map(({ x1, x2 }) => (
            <line key={x1} x1={x1} y1="250" x2={x2} y2="256" />
          ))}
        </g>

        {/* Mât en treillis */}
        <g stroke="var(--color-ink)" strokeWidth="2">
          <line x1="84" y1="60" x2="84" y2="250" />
          <line x1="96" y1="60" x2="96" y2="250" />
          <line x1="84" y1="120" x2="96" y2="120" strokeWidth="1" />
          <line x1="84" y1="185" x2="96" y2="185" strokeWidth="1" />
        </g>

        {/* Flèche, contrepoids et haubans pivotaient autour de la tête de mât */}
        <motion.g
          style={{ transformBox: "view-box", transformOrigin: "90px 60px" }}
          animate={{ rotate: [0, 12, 0] }}
          transition={TRANSITION_CYCLE}
        >
          <g stroke="var(--color-ink)" strokeWidth="2" fill="none">
            <line x1="96" y1="60" x2="212" y2="60" />
            <line x1="84" y1="60" x2="44" y2="60" />
            <line x1="90" y1="36" x2="212" y2="60" strokeWidth="1" />
            <line x1="90" y1="36" x2="44" y2="60" strokeWidth="1" />
          </g>
          <rect x="44" y="60" width="16" height="22" fill="var(--color-steel)" />

          <motion.g animate={{ y: [0, -34, 0] }} transition={TRANSITION_CYCLE}>
            <line
              x1="212"
              y1="60"
              x2="212"
              y2="182"
              stroke="var(--color-ink-soft)"
              strokeWidth="1"
            />
            <rect x="180" y="182" width="64" height="30" fill="var(--color-blueprint)" />
          </motion.g>
        </motion.g>
      </svg>

      <p className="text-mono-xs tracking-annotation text-ink-mute font-mono uppercase">{label}</p>
    </div>
  );
}
