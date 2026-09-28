import { render } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import PageAccueil from "@/app/(public)/page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...reste
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) => (
    <a href={href} {...reste}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

// GSAP n'entre jamais dans un test : le scénario du hero est un effet de
// scroll, hors du périmètre de composition. Le composant reste rendu.
vi.mock("@/frontend/components/sections/hero-scenario", () => ({
  HeroScenario: () => null,
}));

/**
 * LOT 3A — Asymétrie des actes 03/04 (V3 §3.3 « interdiction de la répétition
 * géométrique »).
 *
 * Chaque acte varie au moins DEUX dimensions (ratio, position, hauteur,
 * profondeur, relation au container, densité, type d'image, motion, lumière,
 * vide). Ici : l'acte 03 ingénierie devient éditorial 40/60 (texte porteur)
 * et l'acte 04 ébénisterie devient média dominant chevauché (image porteuse).
 * Les marqueurs `data-ratio` et `data-motion` posés par les scènes rendent la
 * décision lisible par ce test — sans eux, une régression vers le 50/50
 * serait invisible.
 */
describe("LOT 3A — Asymétrie des actes métiers de l'accueil", () => {
  it("différencie les actes 03 et 04 par leur ratio et leur motion", () => {
    const { container } = render(<PageAccueil />);

    const ingenierie = container.querySelector('[data-scene="ingenierie"]');
    const ebenisterie = container.querySelector('[data-scene="ebenisterie"]');

    expect(ingenierie).not.toBeNull();
    expect(ebenisterie).not.toBeNull();

    // Acte 03 : éditorial 40/60, le texte porte.
    expect(ingenierie).toHaveAttribute("data-ratio", "40-60");
    expect(ingenierie).toHaveAttribute("data-motion", "editorial");
    // Acte 04 : média dominant chevauché, l'image porte.
    expect(ebenisterie).toHaveAttribute("data-ratio", "media-dominant");
    expect(ebenisterie).toHaveAttribute("data-motion", "matiere");

    // Deux dimensions variées minimum : ni le même ratio, ni le même motion.
    expect(ingenierie?.getAttribute("data-ratio")).not.toBe(
      ebenisterie?.getAttribute("data-ratio")
    );
    expect(ingenierie?.getAttribute("data-motion")).not.toBe(
      ebenisterie?.getAttribute("data-motion")
    );
  });
});
