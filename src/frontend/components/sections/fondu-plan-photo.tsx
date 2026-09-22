"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/frontend/lib/cn";
import { useScenarioActif } from "@/frontend/hooks/use-scenario-actif";
import { PlanDessin } from "./plan-dessin";

export interface FonduPlanPhotoProps {
  photoSrc: string;
  photoAlt: string;
  className?: string;
}

/**
 * Acte 2-3 de la narration d'accueil (audit §8.2) : le plan filaire hérité
 * du hero se dissout vers la photo de chantier au fil du scroll, en scrub
 * GSAP sur desktop uniquement. Sans JavaScript, sur mobile ou en mouvement
 * réduit, la photo reste affichée seule : c'est elle qui informe.
 */
export function FonduPlanPhoto({ photoSrc, photoAlt, className }: FonduPlanPhotoProps) {
  const racine = useRef<HTMLDivElement>(null);
  const actif = useScenarioActif();

  useEffect(() => {
    const conteneur = racine.current;
    if (!conteneur || !actif) return;

    let annule = false;
    let nettoyage: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (annule) return;

      gsap.registerPlugin(ScrollTrigger);

      const plan = conteneur.querySelector("[data-plan]");
      const photo = conteneur.querySelector("[data-photo]");
      if (!plan || !photo) return;

      const chronologie = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: conteneur, start: "top 80%", end: "top 20%", scrub: 0.5 },
      });
      chronologie.fromTo(plan, { opacity: 1 }, { opacity: 0, duration: 1 }, 0);
      chronologie.fromTo(photo, { opacity: 0 }, { opacity: 1, duration: 1 }, 0);

      nettoyage = () => chronologie.kill();
    })();

    return () => {
      annule = true;
      nettoyage?.();
    };
  }, [actif]);

  return (
    <div
      ref={racine}
      data-fondu
      className={cn("rounded-card relative aspect-[16/10] overflow-hidden", className)}
    >
      <div data-photo className="absolute inset-0" style={{ opacity: actif ? 0 : 1 }}>
        <Image
          src={photoSrc}
          alt={photoAlt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
      <div
        data-plan
        aria-hidden="true"
        className="bg-surface-deep absolute inset-0"
        style={{ opacity: actif ? 1 : 0 }}
      >
        <PlanDessin className="h-full w-full" />
      </div>
    </div>
  );
}
