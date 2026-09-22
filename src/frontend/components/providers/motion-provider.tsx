"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";

/**
 * Les animations Motion sont pilotées en JavaScript : la règle CSS
 * `prefers-reduced-motion` ne les atteint pas. Sans cette enveloppe, chaque
 * composant devrait vérifier la préférence lui-même et le moindre oubli
 * produirait un mouvement non désiré. `reducedMotion="user"` neutralise les
 * translations et les changements de mise en page, seules les opacités
 * subsistent.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
