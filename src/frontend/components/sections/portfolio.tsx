"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { estClaire, tonDe, type Lumiere } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { ProjectCard } from "../signature/project-card";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location?: string;
  year?: string;
  surface?: string;
  slug: string;
}

/** Lumières admises : sombre par défaut, ivoire pour la galerie de papier. */
export type LumierePortfolio = Extract<Lumiere, "sombre" | "ivoire">;

export interface PortfolioProps {
  projects: PortfolioProject[];
  /** Lumière de la bande : sombre par défaut, ivoire pour une galerie claire. */
  lumiere?: LumierePortfolio;
  className?: string;
}

/**
 * Sélection de réalisations : en-tête + CTA, puis grille de cartes
 * révélées en cascade. Une colonne sur mobile, trois sur desktop.
 *
 * Sur papier, les cartes restent sombres : elles agissent en passe-partout et
 * détachent les photos au lieu de les noyer dans l'ivoire.
 */
export function Portfolio({ projects, lumiere = "sombre", className }: PortfolioProps) {
  const ton = tonDe(lumiere);
  const clair = estClaire(lumiere);

  return (
    <section
      role="region"
      aria-label="Portfolio"
      data-surface={clair ? "ivoire" : "fond"}
      data-lumiere={lumiere}
      className={cn(
        "py-24 md:py-32",
        ton.fond,
        clair ? "st-lisiere relative overflow-hidden" : undefined,
        className
      )}
    >
      <div className="max-w-content relative mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker number="03" label="PORTFOLIO" tone={ton.cartouche} className="mb-4" />
            <h2 className={cn("font-display text-h2 font-bold", clair ? ton.titre : "text-ink-soft")}>
              Nos <span className={ton.titre}>réalisations</span>
            </h2>
            <p className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
              Chaque projet est une histoire de rigueur et de confiance, livrée quelque part au
              Cameroun.
            </p>
          </div>
          <ButtonTech
            asChild
            variant={clair ? "encre" : "ghost"}
            icon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
          >
            <Link href="/portfolio">Voir tout le portfolio</Link>
          </ButtonTech>
        </div>

        <motion.div
          variants={staggerContainer}
          {...inViewOnce}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {projects.map((projet) => (
            <motion.div key={projet.id} variants={fadeUpItem}>
              <ProjectCard
                title={projet.title}
                description={projet.description}
                imageUrl={projet.imageUrl}
                location={projet.location}
                year={projet.year}
                surface={projet.surface}
                href={`/portfolio/${projet.slug}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
