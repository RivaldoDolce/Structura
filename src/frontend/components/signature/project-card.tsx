"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { easings } from "@/frontend/lib/tokens";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  location?: string;
  year?: string;
  surface?: string;
  href?: string;
  className?: string;
}

// Carte réalisation : données techniques en ligne sur mobile, panneau
// coulissant au survol sur desktop.
export function ProjectCard({
  title,
  description,
  imageUrl,
  location,
  year,
  surface,
  href,
  className,
}: ProjectCardProps) {
  const donnees = [
    location ? { terme: "Localisation", valeur: location } : null,
    year ? { terme: "Année", valeur: year } : null,
    surface ? { terme: "Surface", valeur: surface } : null,
  ].filter((entree): entree is { terme: string; valeur: string } => entree !== null);

  const contenu = (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: easings.outExpo }}
      className={cn("group rounded-card bg-surface relative overflow-hidden", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="from-fond/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
        />
      </div>

      <div className="relative p-6">
        <h3 className="font-display text-ink text-xl font-semibold">{title}</h3>
        <p className="text-ink-soft mt-2 text-sm">{description}</p>

        {donnees.length > 0 ? (
          <dl className="text-mono-xs mt-4 grid grid-cols-2 gap-3 font-mono uppercase md:hidden">
            {donnees.map((entree) => (
              <div key={entree.terme}>
                <dt className="text-ink-mute">{entree.terme}</dt>
                <dd className="text-blueprint mt-1">{entree.valeur}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {donnees.length > 0 ? (
          <div className="border-line bg-elevated pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full border-t p-6 transition-transform duration-500 group-hover:translate-y-0 md:block">
            <dl className="text-mono-xs grid grid-cols-2 gap-4 font-mono uppercase">
              {donnees.map((entree) => (
                <div key={entree.terme}>
                  <dt className="text-ink-mute">{entree.terme}</dt>
                  <dd className="text-blueprint mt-1">{entree.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </motion.article>
  );

  if (!href) return contenu;

  return (
    <Link
      href={href}
      className="focus-visible:ring-steel block focus-visible:ring-2 focus-visible:outline-none"
    >
      {contenu}
    </Link>
  );
}
