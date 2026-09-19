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
      className={cn(
        "group relative overflow-hidden rounded-card bg-[var(--color-surface)]",
        className,
      )}
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
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/80 via-transparent to-transparent"
        />
      </div>

      <div className="relative p-6">
        <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{description}</p>

        {donnees.length > 0 ? (
          <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-mono-xs uppercase md:hidden">
            {donnees.map((entree) => (
              <div key={entree.terme}>
                <dt className="text-[var(--color-ink-mute)]">{entree.terme}</dt>
                <dd className="mt-1 text-[var(--color-blueprint)]">{entree.valeur}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {donnees.length > 0 ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full border-t border-[var(--color-line)] bg-[var(--color-elevated)] p-6 transition-transform duration-500 group-hover:translate-y-0 md:block">
            <dl className="grid grid-cols-2 gap-4 font-mono text-mono-xs uppercase">
              {donnees.map((entree) => (
                <div key={entree.terme}>
                  <dt className="text-[var(--color-ink-mute)]">{entree.terme}</dt>
                  <dd className="mt-1 text-[var(--color-blueprint)]">{entree.valeur}</dd>
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
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)]"
    >
      {contenu}
    </Link>
  );
}
