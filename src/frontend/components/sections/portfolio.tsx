"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
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

export interface PortfolioProps {
  projects: PortfolioProject[];
  className?: string;
}

// Sélection de réalisations : en-tête + CTA, puis grille de cartes
// révélées en cascade. Une colonne sur mobile, trois sur desktop.
export function Portfolio({ projects, className }: PortfolioProps) {
  return (
    <section role="region" aria-label="Portfolio" className={cn("py-24 md:py-32", className)}>
      <div className="max-w-content mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker number="03" label="PORTFOLIO" className="mb-4" />
            <h2 className="font-display text-h2 text-ink-soft font-bold">
              Nos <span className="text-ink">réalisations</span>
            </h2>
            <p className="text-body text-ink-soft mt-4 max-w-2xl">
              Chaque projet est une histoire de rigueur et de confiance, livrée quelque part au
              Cameroun.
            </p>
          </div>
          <ButtonTech
            asChild
            variant="ghost"
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
