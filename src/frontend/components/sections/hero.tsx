"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { fadeItem, fadeUpItem, staggerContainer, titleReveal } from "@/frontend/lib/animations";
import { PHOTO_HERO_ACCUEIL } from "@/frontend/data/fonds";
import { HeroScenario } from "./hero-scenario";
import { PlanDessin } from "./plan-dessin";

/**
 * Premières lignes du H1 (V3 §6.4). La rupture est intentionnelle : elle isole
 * le mot éditorial pour qu'il soit le dernier temps de la chorégraphie. Chaque
 * ligne se referme par un espace, sans quoi le titre ne serait plus une phrase
 * continue pour une technologie d'assistance, qui ignore la mise en page.
 */
const LIGNES_TITRE = ["L'ingénierie qui", "construit en"] as const;

/**
 * Premier écran de l'accueil (composition C1, V3 §6) : la photographie réelle
 * d'un chantier porte le titre sous une protection localisée, et le plan
 * isométrique — seul porteur du plan depuis que la maille blueprint a quitté le
 * hero — se dessine au défilement.
 */
export function Hero() {
  const racine = useRef<HTMLElement>(null);

  return (
    <section
      ref={racine}
      role="region"
      aria-label="Section d'accueil"
      data-composition="C1"
      data-surface="photo"
      data-lumiere="sombre"
      className="relative min-h-[calc(100svh-4rem)] overflow-hidden md:min-h-[calc(100svh-5rem)]"
    >
      {/* Élément LCP : la photo informe, elle n'illustre pas. Sa teinte sombre
          (luminance relative ≈ 0,03 sur sa moitié gauche, mesurée) est ce qui
          autorise un voile dégressif sans transformer la scène en aplat. */}
      <Image
        src={PHOTO_HERO_ACCUEIL.src}
        alt={PHOTO_HERO_ACCUEIL.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: PHOTO_HERO_ACCUEIL.position }}
        className="object-cover"
      />

      {/* Protection localisée (V3 §6.3) : dense sous le titre, légère sous le
          plan, ouverte au-delà. La recette porte la densité complète — aucun
          composant n'a de valeur d'assombrissement à calibrer. */}
      <div className="st-voile-photo pointer-events-none absolute inset-0" aria-hidden="true" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="max-w-content relative mx-auto flex min-h-[calc(100svh-4rem)] flex-col justify-center px-4 py-24 md:min-h-[calc(100svh-5rem)] md:px-6 md:py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div variants={fadeItem}>
              <Kicker number="01" label="STRUCTURA" className="mb-6" />
            </motion.div>

            <motion.h1
              variants={fadeItem}
              className="font-display text-hero text-ink text-balance font-bold"
            >
              {LIGNES_TITRE.map((ligne) => (
                <span key={ligne} data-ligne className="st-masque-titre overflow-hidden">
                  <motion.span variants={titleReveal} className="block">
                    {ligne}{" "}
                  </motion.span>
                </span>
              ))}
              <span data-ligne className="st-masque-titre overflow-hidden">
                <motion.span variants={titleReveal} className="block">
                  <em className="font-editorial font-normal italic">confiance</em>
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-body text-ink-soft mt-8 max-w-2xl md:text-lg"
            >
              De la rigueur du calcul de structure à la noblesse de la finition sur-mesure. Votre
              projet immobilier de A à Z au Cameroun.
            </motion.p>

            <motion.div variants={fadeUpItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonTech asChild variant="conversion" size="lg">
                <Link href="/devis">Demander un devis</Link>
              </ButtonTech>
              <ButtonTech asChild variant="ghost" size="lg">
                <Link href="/portfolio">Voir nos réalisations</Link>
              </ButtonTech>
            </motion.div>
          </div>

          {/* Un seul mouvement piloté par le défilement (V3 §6.5) : c'est le
              tracé qui porte le récit. Ni parallax, ni translation
              concurrente — le plan ne reçoit qu'un seul geste. */}
          <motion.div
            variants={fadeItem}
            data-motion="trace-scrub"
            className="relative mx-auto w-full max-w-xl"
          >
            <PlanDessin />
          </motion.div>
        </div>
      </motion.div>

      <HeroScenario racine={racine} />
    </section>
  );
}
