"use client";
// Cascade d'apparition au scroll : animation donc rendu client.
import { Building2, Hammer, Home, Ruler } from "lucide-react";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { Kicker } from "../signature/kicker";
import { ServiceCard } from "../signature/service-card";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "building" | "hammer" | "ruler" | "home";
  deliverables: string[];
  href: string;
}

export interface ServicesProps {
  services: ServiceItem[];
  className?: string;
}

// Icônes Lucide uniquement, jamais d'emojis : le parent ne passe qu'un nom.
const ICONES: Record<ServiceItem["icon"], React.ReactNode> = {
  building: <Building2 aria-hidden="true" className="h-8 w-8" />,
  hammer: <Hammer aria-hidden="true" className="h-8 w-8" />,
  ruler: <Ruler aria-hidden="true" className="h-8 w-8" />,
  home: <Home aria-hidden="true" className="h-8 w-8" />,
};

// Pôles d'expertise : fond contrasté, cartes révélées en cascade.
// Le href servira aux pages détaillées du Sprint 3.
export function Services({ services, className }: ServicesProps) {
  const animationsReduites = useReducedMotion();

  return (
    <section
      role="region"
      aria-label="Services"
      className={cn("bg-[var(--color-surface)] py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-16 text-center">
          <Kicker number="04" label="SERVICES" className="mb-4 justify-center" />
          <h2 className="font-heading text-3xl font-bold text-[var(--color-ink)] md:text-5xl">
            Nos{" "}
            <span className="bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] bg-clip-text text-transparent">
              expertises
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-ink-soft)]">
            Trois pôles d&apos;expertise pour accompagner votre projet de A à Z,
            de l&apos;étude à la livraison.
          </p>
        </div>

        <motion.div
          initial="masquee"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            masquee: {},
            visible: { transition: { staggerChildren: animationsReduites ? 0 : 0.1 } },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                masquee: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.description}
                icon={ICONES[service.icon]}
                deliverables={service.deliverables}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
