"use client";

import { useEffect, type RefObject } from "react";
import { useScenarioActif } from "@/frontend/hooks/use-scenario-actif";
import { durations } from "@/frontend/lib/tokens";

export interface HeroScenarioProps {
  racine: RefObject<HTMLElement | null>;
}

const AMPLITUDE_PARALLAX = 120;
const DUREE_TRACE = 0.6;

/**
 * Scénario cinématique du hero : GSAP + ScrollTrigger rejouent le tracé de
 * l'isométrique au scroll (scrub), remplissent les volumes, révèlent les
 * cotes et animent le parallax en trois couches.
 *
 * GSAP n'entre dans le bundle que par `import()` au montage : rien dans le
 * chemin critique de l'hydratation. Désactivé sous 768 px et en mouvement
 * réduit — le plan reste alors affiché complet, comme sans JavaScript.
 */
export function HeroScenario({ racine }: HeroScenarioProps) {
  const actif = useScenarioActif();

  useEffect(() => {
    const section = racine.current;
    if (!section || !actif) return;

    let annule = false;
    let nettoyage: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (annule) return;

      gsap.registerPlugin(ScrollTrigger);

      const traces = Array.from(section.querySelectorAll<SVGGeometryElement>("[data-trace]"));
      const remplissages = Array.from(section.querySelectorAll<SVGElement>("[data-fill]"));
      const annotations = Array.from(section.querySelectorAll<SVGElement>("[data-annotation]"));
      const couches = Array.from(section.querySelectorAll<HTMLElement>("[data-parallax]"));

      const longueurs = traces.map((trace) =>
        typeof trace.getTotalLength === "function" ? trace.getTotalLength() : 0
      );
      for (const trace of traces) {
        trace.style.willChange = "stroke-dashoffset";
      }

      const duree = traces.length * durations.stagger + DUREE_TRACE;
      const chronologie = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 },
      });

      traces.forEach((trace, index) => {
        const longueur = longueurs[index];
        chronologie.fromTo(
          trace,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: DUREE_TRACE },
          index * durations.stagger
        );
      });

      chronologie.fromTo(
        remplissages,
        { fill: "var(--color-blueprint)", fillOpacity: 0 },
        { fillOpacity: 0.08, duration: duree * 0.4 },
        duree * 0.3
      );

      chronologie.fromTo(
        annotations,
        { opacity: 0 },
        { opacity: 1, duration: duree * 0.15 },
        duree * 0.85
      );

      for (const couche of couches) {
        const vitesse = Number(couche.dataset.parallaxVitesse ?? "1");
        chronologie.fromTo(
          couche,
          { y: 0 },
          { y: (vitesse - 1) * AMPLITUDE_PARALLAX, duration: duree },
          0
        );
      }

      nettoyage = () => {
        chronologie.kill();
        for (const trace of traces) {
          trace.style.willChange = "";
        }
      };
    })();

    return () => {
      annule = true;
      nettoyage?.();
    };
  }, [racine, actif]);

  return null;
}
