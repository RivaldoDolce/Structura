"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/frontend/lib/cn";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { NAVIGATION } from "@/shared/constants/navigation";
import { MobileNav } from "./mobile-nav";
import type { NavLink } from "./mobile-nav";
import { ButtonTech } from "../signature/button-tech";

// Le header vitrine met en avant les pages métier ; l'accueil est atteint via
// le logo, le tunnel de conversion via le CTA dédié.
const LIENS_NAVIGATION: NavLink[] = NAVIGATION.public.filter(
  (lien) => lien.href !== "/" && lien.href !== "/contact"
);

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
          "fixed top-0 right-0 left-0 z-40 border-b",
          defile ? "border-line bg-fond/80 backdrop-blur-md" : "border-transparent",
          !animationsReduites && "transition-all duration-300"
        )}
      >
        <div className="max-w-content mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link
              href="/"
              aria-label="STRUCTURA - Accueil"
              className="font-display text-ink text-xl font-bold tracking-tight md:text-2xl"
            >
              STRUCTURA
            </Link>

            <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
              {LIENS_NAVIGATION.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className="text-ink-soft hover:text-ink relative text-sm font-medium transition-colors"
                >
                  {lien.label}
                  <span
                    aria-hidden="true"
                    className="bg-blueprint absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-200 hover:scale-x-100"
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
                "rounded-control flex h-11 w-11 items-center justify-center",
                "text-ink hover:bg-elevated transition-colors",
                "focus-visible:ring-steel focus-visible:ring-2 focus-visible:outline-none",
                "md:hidden"
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
