"use client";
// Scroll flouté, menu mobile et blocage du body : interaction donc client.
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/frontend/lib/cn";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { MobileNav } from "./mobile-nav";
import type { NavLink } from "./mobile-nav";
import { ButtonTech } from "../signature/button-tech";

// Liens partagés entre la barre desktop et l'overlay mobile.
const LIENS_NAVIGATION: NavLink[] = [
  { href: "/ingenierie", label: "Ingénierie" },
  { href: "/ebenisterie", label: "Ébénisterie" },
  { href: "/plans", label: "Plans" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
];

// En-tête fixe : logo + nav + CTA sur desktop, logo + hamburger sur mobile.
// Le fond se floute après 24px de scroll pour garder le hero lisible.
export function SiteHeader() {
  const [defile, setDefile] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const animationsReduites = useReducedMotion();

  useEffect(() => {
    const actualise = (): void => setDefile(window.scrollY > 24);
    actualise();
    window.addEventListener("scroll", actualise, { passive: true });
    return () => window.removeEventListener("scroll", actualise);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOuvert]);

  return (
    <>
      <header
        role="banner"
        aria-label="En-tête du site STRUCTURA"
        className={cn(
          "fixed left-0 right-0 top-0 z-40 border-b",
          defile
            ? "border-[var(--color-line)] bg-[var(--color-base)]/80 backdrop-blur-md"
            : "border-transparent",
          !animationsReduites && "transition-all duration-300",
        )}
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link
              href="/"
              aria-label="STRUCTURA - Accueil"
              className="font-heading text-xl font-bold tracking-tight text-[var(--color-ink)] md:text-2xl"
            >
              STRUCTURA
            </Link>

            <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
              {LIENS_NAVIGATION.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className="relative text-sm font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {lien.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--color-blueprint)] transition-transform duration-200 hover:scale-x-100"
                  />
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <ButtonTech asChild variant="primary" size="sm">
                <Link href="/devis">Demander un devis</Link>
              </ButtonTech>
            </div>

            <button
              type="button"
              onClick={() => setMenuOuvert((ouvert) => !ouvert)}
              aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOuvert}
              aria-controls="mobile-nav"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-[10px]",
                "text-[var(--color-ink)] transition-colors hover:bg-[var(--color-elevated)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)]",
                "md:hidden",
              )}
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={menuOuvert}
        onClose={() => setMenuOuvert(false)}
        navLinks={LIENS_NAVIGATION}
      />
    </>
  );
}
