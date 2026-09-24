"use client";

import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce } from "@/frontend/lib/animations";
import { tonDe } from "@/frontend/lib/lumieres";
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
 * Bande ivoire : la galerie de projets est le seul acte où le papier porte
 * plusieurs photos à la fois. Les cartes restent sombres — elles font office
 * de passe-partout et font claquer les images, au lieu de flotter sans
 * contour sur le papier.
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
  const ton = tonDe("ivoire");

  return (
    <section
      role="region"
      aria-label={titre ?? "Réalisations"}
      data-composition="C3"
      data-surface="ivoire"
      data-lumiere="ivoire"
      className={cn("st-ivoire st-lisiere relative overflow-hidden py-24 md:py-32", className)}
    >
      <div className="max-w-content relative mx-auto px-4 md:px-6">
        {titre ? (
          <div className="mb-16">
            {kicker ? (
              <Kicker number={kicker.number} label={kicker.label} tone="clair" className="mb-4" />
            ) : null}
            <h2 className={cn("font-display text-h2 font-bold", ton.titre)}>{titre}</h2>
            {accroche ? <p className={cn("text-body mt-4 max-w-2xl", ton.texte)}>{accroche}</p> : null}
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
      </div>
    </section>
  );
}
