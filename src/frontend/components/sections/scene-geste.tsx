"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { tonDe, type Lumiere } from "@/frontend/lib/lumieres";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

/** Un temps du geste : même contrat que les bandeaux, sans leur 50/50. */
export interface EtapeGeste {
  id: string;
  numero: string;
  titre: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  livrables: string[];
  href: string;
  hrefLabel: string;
}

export interface SceneGesteProps {
  etapes: [EtapeGeste, EtapeGeste, EtapeGeste];
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  className?: string;
}

/**
 * Séquence du geste ébéniste (LOT 3B, V3 §8).
 * Trois temps, trois grammaires : conception éditoriale 40/60, fabrication
 * en média dominant chevauché, finition en pleine largeur superposée.
 * Chaque acte porte data-acte-geste + data-ratio + data-motion : la séquence
 * est vérifiée par test, lumières comprises (ivoire → pâle → warm).
 */
export function SceneGeste({ etapes, kicker, titre, accroche, className }: SceneGesteProps) {
  const [conception, fabrication, finition] = etapes;

  return (
    <section
      role="region"
      aria-label={titre}
      data-composition="scene-geste"
      className={cn("relative", className)}
    >
      <div className="st-ivoire st-lisiere relative overflow-hidden py-24 md:py-32">
        <ActeConception etape={conception} kicker={kicker} titre={titre} accroche={accroche} />
      </div>
      <div className="st-pale relative overflow-hidden py-24 md:py-32">
        <ActeFabrication etape={fabrication} />
      </div>
      <div className="st-warm relative overflow-hidden">
        <ActeFinition etape={finition} />
      </div>
    </section>
  );
}


/* Acte 01 — le plan se lit : colonne éditoriale resserrée, média en retrait. */
function ActeConception({
  etape,
  kicker,
  titre,
  accroche,
}: {
  etape: EtapeGeste;
  kicker: SceneGesteProps["kicker"];
  titre: string;
  accroche?: string;
}) {
  const ton = tonDe("ivoire");

  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      data-acte-geste={etape.id}
      data-ratio="40-60"
      data-motion="editorial"
      data-lumiere="ivoire"
      className="max-w-content relative mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[2fr_3fr]"
    >
      <div>
        <motion.div variants={fadeUpItem}>
          <Kicker number={kicker.number} label={kicker.label} tone={ton.cartouche} className="mb-4" />
        </motion.div>
        <motion.h2 variants={fadeUpItem} className={cn("font-display text-h2 max-w-xl font-bold", ton.titre)}>
          {titre}
        </motion.h2>
        {accroche ? (
          <motion.p variants={fadeUpItem} className={cn("text-body mt-4 max-w-xl", ton.texte)}>
            {accroche}
          </motion.p>
        ) : null}
        <motion.p variants={fadeUpItem} className={cn("font-display text-h3 mt-10 font-semibold", ton.accent)}>
          <span className={cn("text-mono-xs mr-3 font-mono uppercase", ton.texte)}>{etape.numero}</span>
          {etape.titre}
        </motion.p>
        <motion.p variants={fadeUpItem} className={cn("text-body mt-3 max-w-xl", ton.texte)}>
          {etape.description}
        </motion.p>
        <Livrables livrables={etape.livrables} lumiere="ivoire" />
        <motion.div variants={fadeUpItem} className="mt-8">
          <ButtonTech asChild variant={ton.bouton} size="lg">
            <Link href={etape.href}>{etape.hrefLabel}</Link>
          </ButtonTech>
        </motion.div>
      </div>
      <motion.figure variants={fadeUpItem} className="relative lg:pl-4">
        <div className="bg-surface-raised relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src={etape.imageUrl}
            alt={etape.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        <figcaption className={cn("text-mono-xs mt-3 font-mono uppercase", ton.texte)}>
          {etape.numero} — {etape.titre.toUpperCase()}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
/* Acte 02 — l'atelier porte : média dominant, panneau de geste chevauché. */
function ActeFabrication({ etape }: { etape: EtapeGeste }) {
  // Ton de la CARTE, pas de la bande : `pale` décrit le papier, la carte est une
  // surface sombre posée dessus. Les deux ne partagent pas les mêmes textes.
  const ton = tonDe("warm");

  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      data-acte-geste={etape.id}
      data-ratio="60-40-chevauchement"
      data-motion="atelier"
      data-lumiere="pale"
      className="max-w-content relative mx-auto grid items-center px-4 md:px-6 lg:grid-cols-[7fr_5fr]"
    >
      <motion.div variants={fadeUpItem} className="relative lg:-ml-[8vw] lg:pr-6">
        <div className="bg-surface relative aspect-[16/11] overflow-hidden rounded-card">
          <Image
            src={etape.imageUrl}
            alt={etape.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      </motion.div>
      {/*
        La carte est une surface sombre posée sur la bande pâle. Elle prend
        donc SON ton, pas celui de la bande : le ton `pale` est calculé pour le
        papier et tombe à 1,3:1 sur ce fond, d'où un titre brun illisible.
        `warm` donne encre claire sur bleu, et son accent sable rattache la carte
        à la matière de l'atelier. La bande conserve son `pale` déclaré.
      */}
      <motion.div
        variants={fadeUpItem}
        data-carte
        data-lumiere-carte="warm"
        className={cn(
          "bg-elevated rounded-card relative z-10 border p-6 shadow-xl lg:-ml-16 lg:mb-10",
          ton.filet
        )}
      >
        <p className={cn("text-mono-xs font-mono uppercase", ton.texte)}>{etape.numero}</p>
        <h3 className={cn("font-display text-h2b mt-2 font-bold", ton.titre)}>{etape.titre}</h3>
        <p className={cn("text-body mt-3", ton.texte)}>{etape.description}</p>
        <Livrables livrables={etape.livrables} lumiere="warm" />
        <ButtonTech asChild variant={ton.bouton} size="lg" className="mt-7 w-full">
          <Link href={etape.href}>{etape.hrefLabel}</Link>
        </ButtonTech>
      </motion.div>
    </motion.div>
  );
}

/* Acte 03 — la matière conclut : photo plein cadre, geste posé dessus. */
function ActeFinition({ etape }: { etape: EtapeGeste }) {
  const ton = tonDe("warm");

  return (
    <div data-acte-geste={etape.id} data-ratio="100-photo-superposee" data-motion="matiere" data-lumiere="warm" className="relative overflow-hidden">
      <Image src={etape.imageUrl} alt={etape.imageAlt} fill sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-fond via-fond/55 to-fond/15" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-fond/80 via-transparent to-fond/40" />
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="relative mx-auto flex min-h-[70vh] max-w-content flex-col justify-end px-4 py-24 md:px-6 md:py-32"
      >
        <motion.div variants={fadeUpItem} className="max-w-2xl">
          <p className={cn("text-mono-xs font-mono uppercase", ton.accent)}>{etape.numero}</p>
          <h3 className={cn("font-display text-h2 mt-2 font-bold", ton.titre)}>{etape.titre}</h3>
          <p className={cn("text-body mt-4", ton.texte)}>{etape.description}</p>
        </motion.div>
        <motion.div
          variants={fadeUpItem}
          className="border-line bg-fond/25 mt-10 w-full max-w-2xl border p-6 backdrop-blur-sm md:p-8"
        >
          <Livrables livrables={etape.livrables} lumiere="warm" />
          <ButtonTech asChild variant={ton.bouton} size="lg" className="mt-8">
            <Link href={etape.href}>{etape.hrefLabel}</Link>
          </ButtonTech>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Livrables du temps : coches sobres, jamais une galerie d'icônes. */
function Livrables({ livrables, lumiere }: { livrables: string[]; lumiere: Lumiere }) {
  const ton = tonDe(lumiere);

  return (
    <ul className="mt-6 space-y-2">
      {livrables.map((livrable) => (
        <li key={livrable} className={cn("text-small flex items-start gap-3", ton.texte)}>
          <Check aria-hidden="true" className={cn("mt-0.5 h-4 w-4 shrink-0", ton.puce)} />
          {livrable}
        </li>
      ))}
    </ul>
  );
}
