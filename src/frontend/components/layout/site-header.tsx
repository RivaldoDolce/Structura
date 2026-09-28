"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/**
 * Sceau institutionnel (V3 §5.3) : le monogramme est détouré vers un PNG à
 * canal alpha par `scripts/convert-assets.mjs` — la planche du kit, opaque,
 * poserait son carré sombre sur les actes clairs. Décoratif : le lien porte
 * déjà son libellé complet, un `alt` textuel doublerait le nom de la marque.
 */
const SCEAU = { src: "/branding/monogramme-sceau.png", resolution: 168 } as const;

// Deux seuils de défilement (V3 §5.6), jamais simultanés : le fond se densifie
// dès que le titre du hero quitte le haut de l'écran, et l'en-tête ne se
// compacte qu'une fois le défilement engagé.
const SEUIL_FLOU = 24;
const SEUIL_COMPACT = 96;

/**
 * En-tête fixe : sceau + verrou de marque, navigation et CTA sur desktop,
 * hamburger en mobile. La page courante est signalée par `aria-current`, seul
 * état visuel du trait — `.st-lien` reste l'unique définition du soulignement.
 */
export function SiteHeader() {
  const [defile, setDefile] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const animationsReduites = useReducedMotion();
  const chemin = usePathname();

  useEffect(() => {
    const actualise = (): void => {
      setDefile(window.scrollY > SEUIL_FLOU);
      setCompact(window.scrollY > SEUIL_COMPACT);
    };
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
        data-compact={compact ? "true" : "false"}
        className={cn(
          "fixed top-0 right-0 left-0 z-40 border-b",
          compact ? "h-14 md:h-16" : "h-16 md:h-20",
          defile ? "border-line bg-fond/80 backdrop-blur-md" : "border-transparent",
          // Propriétés nommées, jamais `all` : la hauteur est animable sans
          // reflow du document, l'en-tête étant hors du flux.
          !animationsReduites &&
            "transition-[background-color,border-color,backdrop-filter,height] duration-standard ease-out-expo"
        )}
      >
        <div className="mx-auto h-full w-full max-w-[112rem] px-4 md:px-6">
          {/* Grille 3 zones : verrou à l'extrême gauche, navigation centrée,
              appel à l'action à l'extrême droite. `justify-between` seul
              recentrerait le menu par rapport à l'espace restant, pas à la
              page — la colonne centrale porte donc la navigation, centrée.
              Le conteneur est borné (`max-w-*`) et rempli (`w-full`) : sans
              cela, la grille s'étire sur toute la fenêtre large et le verrou
              de marque dérive de l'aplomb du contenu au lieu d'en être le
              point d'ancrage. */}
          <div
            data-barre
            className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4"
          >
            <Link
              href="/"
              aria-label="STRUCTURA - Accueil"
              className="rounded-control focus-visible:ring-steel group/verrou flex items-center gap-3 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image
                src={SCEAU.src}
                alt=""
                width={SCEAU.resolution}
                height={SCEAU.resolution}
                className={cn(
                  "h-8 w-8 shrink-0 md:h-9 md:w-9",
                  !animationsReduites && "transition-transform duration-standard ease-out-expo",
                  compact && "scale-90"
                )}
              />
              <span className="flex flex-col">
                <span className="font-display text-ink text-lg leading-none font-bold tracking-tight md:text-xl">
                  STRUCTURA
                </span>
                <span
                  className={cn(
                    "text-mono-xs text-ink-soft mt-1.5 hidden font-mono uppercase sm:block",
                    !animationsReduites && "transition-opacity duration-standard ease-out-expo",
                    compact && "opacity-0"
                  )}
                >
                  Ingénierie · Construction
                  <span className="hidden lg:inline"> · Yaoundé</span>
                </span>
              </span>
            </Link>

            <nav aria-label="Navigation principale" className="hidden items-center justify-center gap-8 md:flex">
              {LIENS_NAVIGATION.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  aria-current={chemin === lien.href ? "page" : undefined}
                  className="st-lien text-ink-soft hover:text-ink duration-micro focus-visible:text-ink text-sm font-medium transition-colors"
                >
                  {lien.label}
                </Link>
              ))}
            </nav>

            <div className="hidden justify-end md:block">
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
                // En dessous de `md`, la navigation et le CTA sont absents : le
                // bouton se retrouve seul dans la colonne centrale. Sans
                // `justify-self-end`, il s'y colle à gauche et le hamburger
                // quitte le bord droit qu'il occupe sur toutes les autres
                // pages mobiles.
                "justify-self-end",
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
