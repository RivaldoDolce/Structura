"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Valeurs de remontée du panneau. */
const POSEE = { y: "0%" };
const MASQUEE = { y: "110%" };

export interface StickyMobileCtaProps {
  label: string;
  href: string;
  className?: string;
}

/**
 * Barre d'action fixe en bas d'écran, réservée au mobile. Elle se masque
 * pendant le défilement pour ne jamais masquer le contenu et laisse une
 * réserve de 80 px en bas de page via une variable CSS.
 */
export function StickyMobileCta({ label, href, className }: StickyMobileCtaProps) {
  const pathname = usePathname();
  const [defilementVersBas, setDefilementVersBas] = React.useState(false);
  const [monte, setMonte] = React.useState(false);
  const dernierY = React.useRef(0);
  const affiche = !defilementVersBas || monte;

  React.useEffect(() => {
    dernierY.current = window.scrollY;
    setMonte(true);

    const surDefilement = () => {
      const y = window.scrollY;
      const delta = y - dernierY.current;

      if (Math.abs(delta) < 4) {
        return;
      }

      setDefilementVersBas(delta > 0);
      setMonte(y < dernierY.current);
      dernierY.current = y;
    };

    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--barre-cta-mobile", "80px");
    return () => {
      document.documentElement.style.removeProperty("--barre-cta-mobile");
    };
  }, []);

  return (
    <motion.div
      initial={MASQUEE}
      animate={affiche ? POSEE : MASQUEE}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-surface)]/90 p-4 backdrop-blur-md md:hidden",
        className,
      )}
    >
      <Link
        href={href}
        replace={pathname === href}
        className="flex h-11 items-center justify-center gap-2 rounded-control bg-[var(--color-blueprint)] text-small font-semibold text-[var(--color-base)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}