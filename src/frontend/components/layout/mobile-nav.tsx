"use client";
// Overlay animé, focus trap et Escape : interaction donc rendu client.
import { X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { durations, easings } from "@/frontend/lib/tokens";
import { ButtonTech } from "../signature/button-tech";

export interface NavLink {
  href: string;
  label: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

// Menu mobile plein écran : cascade 50ms par lien, focus piégé en boucle,
// fermeture par Escape, overlay, bouton ou lien. Les animations sont
// coupées si le système les réduit.
export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const animationsReduites = useReducedMotion();
  const boutonFermerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    boutonFermerRef.current?.focus();

    const gereClavier = (evenement: KeyboardEvent): void => {
      if (evenement.key === "Escape") {
        onClose();
        return;
      }
      if (evenement.key !== "Tab") return;

      const menu = document.getElementById("mobile-nav");
      if (!menu) return;
      const focusables = menu.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const premier = focusables[0] as HTMLElement;
      const dernier = focusables[focusables.length - 1] as HTMLElement;

      if (evenement.shiftKey && document.activeElement === premier) {
        evenement.preventDefault();
        dernier.focus();
      } else if (!evenement.shiftKey && document.activeElement === dernier) {
        evenement.preventDefault();
        premier.focus();
      }
    };

    document.addEventListener("keydown", gereClavier);
    return () => document.removeEventListener("keydown", gereClavier);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationsReduites ? 0 : 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[var(--color-base)]/95 backdrop-blur-md"
        >
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            onClick={(evenement) => evenement.stopPropagation()}
            className="flex h-full flex-col"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)]"
              >
                STRUCTURA
              </Link>
              <button
                ref={boutonFermerRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-control",
                  "text-[var(--color-ink)] transition-colors hover:bg-[var(--color-elevated)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)]",
                )}
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex-1 px-4 py-8">
              <motion.ul
                initial="masquee"
                animate="visible"
                variants={{
                  masquee: {},
                  visible: {
                    transition: { staggerChildren: animationsReduites ? 0 : 0.05 },
                  },
                }}
                className="space-y-6"
              >
                {navLinks.map((lien) => (
                  <motion.li
                    key={lien.href}
                    variants={{
                      masquee: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: animationsReduites ? 0 : durations.reveal,
                          ease: easings.outExpo,
                        },
                      },
                    }}
                  >
                    <Link
                      href={lien.href}
                      onClick={onClose}
                      className="block font-display text-3xl font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-blueprint)]"
                    >
                      {lien.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationsReduites ? 0 : 0.4,
                delay: animationsReduites ? 0 : navLinks.length * 0.05 + 0.2,
              }}
              className="px-4 pb-8"
            >
              <ButtonTech asChild variant="conversion" size="lg" className="w-full">
                <Link href="/devis" onClick={onClose}>
                  Demander un devis
                </Link>
              </ButtonTech>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
