"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce } from "@/frontend/lib/animations";
import { tonDe, estClaire, type Lumiere } from "@/frontend/lib/lumieres";
import { Kicker } from "../signature/kicker";

/** Surface contextuelle du bandeau : chaque métier a sa matière. */
export type SurfaceBandeau = "fond" | "deep" | "warm" | "blueprint" | "ivoire" | "pale";

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

/** Lumières admises pour le cadre de la section (titre, accroche). */
export type LumiereBandeau = Extract<Lumiere, "sombre" | "ivoire">;

export interface BandeauAlterneProps {
  items: BandeauAlterneItem[];
  /** Titre de la section ; sans lui, la région reste nommée « expertises ». */
  titre?: string;
  accroche?: string;
  kicker?: { number: string; label: string };
  /** Lumière du cadre : sombre par défaut, ivoire pour un acte clair. */
  lumiere?: LumiereBandeau;
  className?: string;
}

/**
 * La surface n'est pas une décoration : elle raconte la matière du métier et
 * fixe la lumière lue par la règle d'alternance.
 */
const LUMIERE_SURFACE: Record<SurfaceBandeau, Lumiere> = {
  fond: "sombre",
  deep: "sombre",
  warm: "warm",
  blueprint: "sombre",
  ivoire: "ivoire",
  pale: "pale",
};

/**
 * Recettes de fond : elles portent aussi la surface de fusion des photos, donc
 * un bandeau sombre inséré dans un acte ivoire garde ses photos accordées.
 */
const CLASSES_SURFACE: Record<SurfaceBandeau, string> = {
  fond: "st-fond",
  deep: "st-deep",
  warm: "st-warm",
  blueprint: "st-blueprint",
  ivoire: tonDe("ivoire").fond,
  pale: tonDe("pale").fond,
};

/**
 * Composition C2 — quatre métiers, quatre matières (audit §6.1 acte 3).
 *
 * Chaque pôle occupe un bandeau pleine largeur : photo 45 % d'un côté, texte
 * 55 % de l'autre, sens alterné d'un bandeau à l'autre pour rompre la
 * répétition de grille. Le titre de section est optionnel : sur l'accueil, les
 * bandeaux portent seuls le récit.
 *
 * Depuis la V2, la section déclare sa lumière (`lumiere`) et chaque bandeau la
 * sienne (`surface`) : un acte ivoire garde son encre et ses filets sur papier,
 * sans qu'aucune page n'ait à réécrire ces classes.
 */
export function BandeauAlterne({
  items,
  titre,
  accroche,
  kicker,
  lumiere = "sombre",
  className,
}: BandeauAlterneProps) {
  const tonSection = tonDe(lumiere);

  return (
    <section
      role="region"
      aria-label={titre ?? "Expertises"}
      data-composition="C2"
      data-surface="alternee"
      data-lumiere={lumiere}
      className={cn(
        "relative overflow-hidden",
        tonSection.fond,
        estClaire(lumiere) && "st-lisiere",
        className
      )}
    >
      {titre ? (
        <div className="max-w-content relative mx-auto px-4 pt-24 md:px-6 md:pt-32">
          {kicker ? (
            <Kicker
              number={kicker.number}
              label={kicker.label}
              tone={tonSection.cartouche}
              className="mb-4"
            />
          ) : null}
          <h2 className={cn("font-display text-h2 max-w-3xl font-bold", tonSection.titre)}>{titre}</h2>
          {accroche ? (
            <p className={cn("text-body mt-4 max-w-2xl", tonSection.texte)}>{accroche}</p>
          ) : null}
        </div>
      ) : null}

      <div className={titre ? "mt-16" : undefined}>
        {items.map((item, index) => {
          const imageAGauche = index % 2 === 0;
          const lumiereBandeau = LUMIERE_SURFACE[item.surface];
          const ton = tonDe(lumiereBandeau);

          return (
            <motion.article
              key={item.id}
              data-sens={imageAGauche ? "image-gauche" : "image-droite"}
              data-surface={item.surface}
              data-lumiere={lumiereBandeau}
              variants={fadeUpItem}
              {...inViewOnce}
              className={cn("border-t", ton.filet, CLASSES_SURFACE[item.surface])}
            >
              <div
                className={cn(
                  "max-w-content mx-auto grid items-stretch gap-0 px-0 md:grid-cols-[45fr_55fr] md:px-6",
                )}
              >
                {/* Photo pleine hauteur, fusionnée à la surface hôte : sur
                    papier, la photo fond vers le papier, pas vers le noir. */}
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
                  <span className={cn("text-mono-xs font-mono uppercase", ton.accent)}>
                    {item.number}
                  </span>
                  <h3 className={cn("font-display text-h2b mt-4 font-bold", ton.titre)}>
                    {item.title}
                  </h3>
                  <p className={cn("text-body mt-4 max-w-xl", ton.texte)}>{item.description}</p>

                  <ul className="mt-6 space-y-3">
                    {item.deliverables.map((livrable) => (
                      <li
                        key={livrable}
                        className={cn("text-small flex items-center gap-3", ton.texte)}
                      >
                        <Check aria-hidden="true" className={cn("h-4 w-4 shrink-0", ton.puce)} />
                        {livrable}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={item.href}
                      className={cn(
                        "st-lien focus-visible:ring-steel inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                        ton.lien
                      )}
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
