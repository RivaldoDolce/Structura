"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
import type { TypeBatiment } from "@/frontend/data/plans";
import { ButtonTech } from "../signature/button-tech";
import { IllustrationPlan } from "../signature/illustration-plan";
import { Kicker } from "../signature/kicker";
import { PriceTag } from "../signature/price-tag";
import { BlueprintGrid } from "../signature/blueprint-grid";

export interface PlanScene {
  reference: string;
  titre: string;
  prixFcfa: number;
  typeBatiment: TypeBatiment;
  /**
   * Photo du modèle livré, de face. Le catalogue ne vend pas un tracé : il vend
   * un bâtiment. Le tracé isométrique reste en fond de carte pour porter la
   * lecture technique de l'acte, mais c'est la façade qui fait la preuve.
   */
  imageUrl: string;
  imageAlt: string;
  /**
   * Nombre de vues photographiques du modèle livré, renseigné par la fiche
   * plan : la carte annonce la profondeur de la preuve disponible.
   */
  vuesLivrees?: number;
}

export interface ScenePlansProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche: string;
  plans: PlanScene[];
  href: string;
  hrefLabel: string;
  className?: string;
}

/**
 * Scène plans (plan V2 §5) : surface claire technique sur ivoire doux,
 * maille fine, cartes du catalogue en encre avec prix lisible. La donnée
 * respire sur papier au lieu de flotter sur noir.
 */
export function ScenePlans({
  kicker,
  titre,
  accroche,
  plans,
  href,
  hrefLabel,
  className,
}: ScenePlansProps) {
  const ton = tonDe("pale");

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-plans"
      data-scene="plans"
      data-lumiere="pale"
      className={cn("st-pale st-lisiere relative overflow-hidden py-24 md:py-32", className)}
    >
      <div data-blueprint-grid aria-hidden="true">
        <BlueprintGrid fade="both" teinte="pale" className="absolute inset-0 opacity-60" />
      </div>

      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto px-4 md:px-6"
      >
        <motion.div variants={fadeUpItem}>
          <Kicker
            number={kicker.number}
            label={kicker.label}
            tone={ton.cartouche}
            className="mb-4"
          />
        </motion.div>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2 max-w-2xl font-bold", ton.titre)}>
            {titre}
          </motion.h2>
          <motion.div variants={fadeUpItem}>
            <ButtonTech asChild variant={ton.bouton} size="default">
              <Link href={href}>{hrefLabel}</Link>
            </ButtonTech>
          </motion.div>
        </div>
        <motion.p variants={fadeUpItem} className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
          {accroche}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.reference}
              variants={fadeUpItem}
              // Carte catalogue : même grammaire de survol que les cartes
              // portfolio — soulèvement + halo sur la carte entière. Le visuel
              // étant une photo, c'est lui qui zoome au survol, tandis que le
              // tracé de fond se retire (voir plus bas).
              className={cn(
                "group rounded-card bg-paper overflow-hidden border transition-transform duration-reveal ease-out-expo hover:-translate-y-2 hover:shadow-glow",
                ton.filet,
                // Les cartes sortent légèrement de l'axe, en quinconce.
                index === 1 && "md:translate-y-8"
              )}
            >
              <Link
                href={`/plans/${plan.reference}`}
                aria-label={plan.titre}
                className="block focus-visible:outline-none"
              >
                {/*
                  Le visuel de la carte : la façade livrée (`data-vue-modele`),
                  posée sur le tracé isométrique qui reste en fond. Le décor
                  photo zoome au survol, le tracé se retire — c'est l'inverse de
                  la grammaire portfolio, et c'est volontaire : ici on part du
                  réel pour ouvrir la lecture technique.
                */}
                <span className="bg-surface-raised relative block aspect-[4/3] overflow-hidden">
                  <Image
                    data-vue-modele
                    src={plan.imageUrl}
                    alt={plan.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-reveal ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="from-surface-raised absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
                  />
                  <IllustrationPlan
                    type={plan.typeBatiment}
                    className="pointer-events-none absolute inset-0 h-full w-full p-6 opacity-20 transition-opacity duration-reveal ease-out-expo group-hover:opacity-0"
                  />
                </span>
                <span className="block p-5">
                  <span className={cn("text-mono-xs block font-mono uppercase", ton.texte)}>
                    Réf. {plan.reference}
                  </span>
                  <span className={cn("font-display text-h3 mt-2 block font-semibold", ton.titre)}>
                    {plan.titre}
                  </span>
                  {plan.vuesLivrees !== undefined && plan.vuesLivrees > 0 ? (
                    <span className={cn("text-mono-xs mt-2 block font-mono uppercase", ton.texte)}>
                      {plan.vuesLivrees} vue{plan.vuesLivrees > 1 ? "s" : ""} du modèle livré
                    </span>
                  ) : null}
                  <span className="mt-4 block">
                    <PriceTag amount={plan.prixFcfa} tone="clair" />
                  </span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
