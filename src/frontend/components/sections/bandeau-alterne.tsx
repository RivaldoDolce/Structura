"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce } from "@/frontend/lib/animations";
import { Kicker } from "../signature/kicker";

/** Surface contextuelle du bandeau : chaque métier a sa matière. */
export type SurfaceBandeau = "fond" | "warm" | "blueprint" | "deep";

export interface BandeauAlterneItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  deliverables: string[];
  href: string;
  surface: SurfaceBandeau;
}

export interface BandeauAlterneProps {
  items: BandeauAlterneItem[];
  /** Titre de la section ; sans lui, la région reste nommée « expertises ». */
  titre?: string;
  accroche?: string;
  kicker?: { number: string; label: string };
  className?: string;
}

// La surface n'est pas une décoration : elle raconte la matière du métier.
// `st-warm` porte la chaleur bois, `surface-blueprint` la donnée technique.
const CLASSES_SURFACE: Record<SurfaceBandeau, string> = {
  fond: "bg-fond",
  warm: "st-warm",
  blueprint: "bg-surface-blueprint",
  deep: "bg-surface-deep",
};

/**
 * Composition C2 — quatre métiers, quatre matières (audit §6.1 acte 3).
 *
 * Chaque pôle occupe un bandeau pleine largeur : photo 45 % d'un côté, texte
 * 55 % de l'autre, sens alterné d'un bandeau à l'autre pour rompre la
 * répétition de grille. Le titre de section est optionnel : sur l'accueil, les
 * bandeaux portent seuls le récit.
 */
export function BandeauAlterne({ items, titre, accroche, kicker, className }: BandeauAlterneProps) {
  return (
    <section
      role="region"
      aria-label={titre ?? "Expertises"}
      data-composition="C2"
      data-surface="alternee"
      className={cn("overflow-hidden", className)}
    >
      {titre ? (
        <div className="max-w-content mx-auto px-4 pt-24 md:px-6 md:pt-32">
          {kicker ? <Kicker number={kicker.number} label={kicker.label} className="mb-4" /> : null}
          <h2 className="font-display text-h2 text-ink-soft max-w-3xl font-bold">
            {titre}
          </h2>
          {accroche ? <p className="text-body text-ink-soft mt-4 max-w-2xl">{accroche}</p> : null}
        </div>
      ) : null}

      <div className={titre ? "mt-16" : undefined}>
        {items.map((item, index) => {
          const imageAGauche = index % 2 === 0;

          return (
            <motion.article
              key={item.id}
              data-sens={imageAGauche ? "image-gauche" : "image-droite"}
              data-surface={item.surface}
              variants={fadeUpItem}
              {...inViewOnce}
              className={cn(
                "border-line border-t",
                CLASSES_SURFACE[item.surface],
              )}
            >
              <div
                className={cn(
                  "max-w-content mx-auto grid items-stretch gap-0 px-0 md:grid-cols-[45fr_55fr] md:px-6",
                )}
              >
                {/* Photo pleine hauteur, fusionnée à la surface hôte. */}
                <div
                  className={cn(
                    "st-photo-fusion relative aspect-[4/3] md:aspect-auto md:min-h-[26rem]",
                    imageAGauche ? "md:order-1" : "md:order-2",
                  )}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={cn(
                    "flex flex-col justify-center px-4 py-12 md:px-12 md:py-16",
                    imageAGauche ? "md:order-2" : "md:order-1",
                  )}
                >
                  <span className="text-mono-xs text-blueprint font-mono uppercase">
                    {item.number}
                  </span>
                  <h3 className="font-display text-h2b text-ink mt-4 font-bold">{item.title}</h3>
                  <p className="text-body text-ink-soft mt-4 max-w-xl">{item.description}</p>

                  <ul className="mt-6 space-y-3">
                    {item.deliverables.map((livrable) => (
                      <li key={livrable} className="text-small text-ink-soft flex items-center gap-3">
                        <Check aria-hidden="true" className="text-ok h-4 w-4 shrink-0" />
                        {livrable}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={item.href}
                      className="text-ink hover:text-blueprint focus-visible:ring-steel inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Découvrir {item.title}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
