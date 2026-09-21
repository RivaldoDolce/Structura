"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";
import { durations, easings } from "@/frontend/lib/tokens";

/** Valeurs de remontée du panneau. */
const POSEE = { y: "0%" };
const MASQUEE = { y: "110%" };

export interface StickyMobileCtaProps {
  label: string;
  href: string;
  className?: string;
}

/**
 * Barre d'action fixe en bas d'écran, réservée au mobile. Elle s'efface
 * pendant le défilement vers le bas pour ne jamais masquer le contenu.
 * Les pages qui l'utilisent prévoient une réserve basse (pb-32 mobile).
 */
export function StickyMobileCta({ label, href, className }: StickyMobileCtaProps) {
  const pathname = usePathname();
  const [masquee, setMasquee] = React.useState(false);
  const dernierY = React.useRef(0);

  React.useEffect(() => {
    dernierY.current = window.scrollY;

    const surDefilement = () => {
      const y = window.scrollY;
      const delta = y - dernierY.current;

      if (Math.abs(delta) < 4) {
        return;
      }

      setMasquee(delta > 0);
      dernierY.current = y;
    };

    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  return (
    <motion.div
      initial={MASQUEE}
      animate={masquee ? MASQUEE : POSEE}
      transition={{ duration: durations.reveal, ease: easings.outExpo }}
      className={cn(
        "border-line bg-surface/90 fixed inset-x-0 bottom-0 z-40 border-t p-4 backdrop-blur-md md:hidden",
        className
      )}
    >
      <Link
        href={href}
        replace={pathname === href}
        className="rounded-control text-small bg-blueprint text-fond focus-visible:ring-blueprint focus-visible:ring-offset-surface flex h-11 items-center justify-center gap-2 font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
