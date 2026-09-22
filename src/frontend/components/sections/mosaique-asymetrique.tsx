"use client";

import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce } from "@/frontend/lib/animations";
import { Kicker } from "../signature/kicker";
import { ProjectCard } from "../signature/project-card";

export interface MosaiqueItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  location?: string;
  year?: string;
  surface?: string;
  href: string;
}

export interface MosaiqueAsymetriqueProps {
  items: MosaiqueItem[];
  titre?: string;
  kicker?: { number: string; label: string };
  accroche?: string;
  className?: string;
}

type TailleCarte = "grande" | "moyenne" | "portrait";

/** Rôle et ratio de chaque position : la grille raconte une hiérarchie. */
const ROLES: Array<{ taille: TailleCarte; ratio: string; classe: string }> = [
  { taille: "grande", ratio: "aspect-[21/9]", classe: "md:col-span-3" },
  { taille: "moyenne", ratio: "aspect-[4/3]", classe: "md:col-span-1" },
  { taille: "moyenne", ratio: "aspect-[4/3]", classe: "md:col-span-1" },
  { taille: "portrait", ratio: "aspect-[4/5]", classe: "md:col-span-1" },
];

/**
 * Composition C3 — la mosaïque asymétrique (audit §6.1 acte 4).
 *
 * Une bande immersive 21/9 en pleine largeur, puis trois cartes aux ratios
 * distincts (4/3, 4/3, 4/5). Aucune image au même ratio, aucune cellule de
 * même poids. En dessous de quatre projets, tout retombe en cartes moyennes —
 * jamais de bande orpheline qui écraserait une photo unique sur toute la
 * largeur.
 *
 * Les cartes sont celles du portfolio (`ProjectCard`) : zoom au survol et
 * panneau technique glissant sont déjà codés une seule fois, ici ils sont
 * enfin mis en scène.
 */
export function MosaiqueAsymetrique({
  items,
  titre,
  kicker,
  accroche,
  className,
}: MosaiqueAsymetriqueProps) {
  const assezDeProjets = items.length >= ROLES.length;

  return (
    <section
      role="region"
      aria-label={titre ?? "Réalisations"}
      data-composition="C3"
      data-surface="fond"
      className={cn("max-w-content mx-auto px-4 py-24 md:px-6 md:py-32", className)}
    >
      {titre ? (
        <div className="mb-16">
          {kicker ? <Kicker number={kicker.number} label={kicker.label} className="mb-4" /> : null}
          <h2 className="font-display text-h2 text-ink-soft font-bold">{titre}</h2>
          {accroche ? <p className="text-body text-ink-soft mt-4 max-w-2xl">{accroche}</p> : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
        {items.map((item, index) => {
          const role = assezDeProjets
            ? (ROLES[index] ?? ROLES[ROLES.length - 1])
            : { taille: "moyenne" as TailleCarte, ratio: "aspect-[4/3]", classe: "" };

          return (
            <motion.div
              key={item.id}
              data-taille={role.taille}
              variants={fadeUpItem}
              {...inViewOnce}
              className={role.classe}
            >
              <ProjectCard
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                location={item.location}
                year={item.year}
                surface={item.surface}
                href={item.href}
                imageAlt={item.alt}
                ratio={role.ratio}
                imageSizes={
                  role.taille === "moyenne"
                    ? "(max-width: 768px) 100vw, 33vw"
                    : "(max-width: 768px) 100vw, 90vw"
                }
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
