"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { fadeUpItem, inViewOnce, staggerContainer } from "@/frontend/lib/animations";
import { ButtonTech } from "../signature/button-tech";
import { Kicker } from "../signature/kicker";

export interface ActionCta {
  label: string;
  href: string;
}

export interface CtaChaudProps {
  kicker: { number: string; label: string };
  titre: string;
  accroche?: string;
  actionPrincipale: ActionCta;
  /** Double entrée : WhatsApp à côté du devis, jamais à sa place. */
  actionSecondaire?: ActionCta;
  className?: string;
}

/**
 * Composition C8 — la clôture chaude (audit §6.1 acte 7).
 *
 * `st-warm` : la chaleur du bois invite au dialogue là où le bleu froid
 * clôture. Titre court, bouton conversion, et la double entrée — devis d'un
 * côté, WhatsApp de l'autre — parce qu'au Cameroun la conversation précède
 * souvent le formulaire. Sur mobile, le FAB de discussion suffit.
 */
export function CtaChaud({
  kicker,
  titre,
  accroche,
  actionPrincipale,
  actionSecondaire,
  className,
}: CtaChaudProps) {
  return (
    <section
      role="region"
      aria-label={kicker.label.toLowerCase()}
      data-composition="C8"
      data-surface="warm"
      className={cn("st-warm relative overflow-hidden py-24 md:py-32", className)}
    >
      <motion.div
        variants={staggerContainer}
        {...inViewOnce}
        className="max-w-content relative mx-auto px-4 md:px-6"
      >
        <motion.div variants={fadeUpItem}>
          <Kicker number={kicker.number} label={kicker.label} className="mb-4" />
        </motion.div>

        <motion.h2
          variants={fadeUpItem}
          className="font-display text-h2 text-ink max-w-2xl font-bold"
        >
          {titre}
        </motion.h2>

        {accroche ? (
          <motion.p variants={fadeUpItem} className="text-body text-ink-soft mt-4 max-w-2xl">
            {accroche}
          </motion.p>
        ) : null}

        <motion.div variants={fadeUpItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href={actionPrincipale.href}>{actionPrincipale.label}</Link>
          </ButtonTech>

          {actionSecondaire ? (
            <ButtonTech
              asChild
              variant="ghost"
              size="lg"
              className="hidden sm:inline-flex"
              icon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
            >
              <Link href={actionSecondaire.href}>{actionSecondaire.label}</Link>
            </ButtonTech>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
