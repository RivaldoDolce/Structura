"use client";
// Cascade d'apparition au scroll : animation donc rendu client.
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";
import { ProjectCard } from "../signature/project-card";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

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
  const animationsReduites = useReducedMotion();

  return (
    <section role="region" aria-label="Portfolio" className={cn("py-24 md:py-32", className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker number="03" label="PORTFOLIO" className="mb-4" />
            <h2 className="font-heading text-3xl font-bold text-[var(--color-ink)] md:text-5xl">
              Nos{" "}
              <span className="bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] bg-clip-text text-transparent">
                réalisations
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
              Chaque projet est une histoire de rigueur et de confiance, livrée
              quelque part au Cameroun.
            </p>
          </div>
          <ButtonTech asChild variant="ghost" icon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}>
            <Link href="/portfolio">Voir tout le portfolio</Link>
          </ButtonTech>
        </div>

        <motion.div
          initial="masquee"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            masquee: {},
            visible: { transition: { staggerChildren: animationsReduites ? 0 : 0.1 } },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {projects.map((projet) => (
            <motion.div
              key={projet.id}
              variants={{
                masquee: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
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
