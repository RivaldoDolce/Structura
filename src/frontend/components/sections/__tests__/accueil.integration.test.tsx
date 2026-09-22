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

const ACTES_ATTENDUS = ["C1", "C4", "C2", "C3", "C5", "C6", "C8"] as const;

/**
 * Règle d'alternance de l'audit §6.3 : deux sections consécutives ne partagent
 * ni morphologie, ni surface, ni ratio dominant. Le test lit les marqueurs
 * posés par chaque composition sur les sections réellement rendues.
 */
describe("Composition de la page d'accueil", () => {
  it("déroule les sept actes dans l'ordre prévu", () => {
    const { container } = render(<PageAccueil />);

    const compositions = [...container.querySelectorAll("[data-composition]")].map((section) =>
      section.getAttribute("data-composition")
    );

    expect(compositions).toEqual([...ACTES_ATTENDUS]);
  });

  it("n'aligne jamais deux actes voisins sur la même surface", () => {
    const { container } = render(<PageAccueil />);

    const surfaces = [...container.querySelectorAll("[data-composition]")].map((section) =>
      section.getAttribute("data-surface")
    );

    expect(surfaces).toHaveLength(ACTES_ATTENDUS.length);
    for (let index = 1; index < surfaces.length; index += 1) {
      expect(surfaces[index]).not.toBe(surfaces[index - 1]);
    }
  });

  it("présente les quatre métiers et les quatre jalons du suivi", () => {
    const { container } = render(<PageAccueil />);

    expect(container.querySelectorAll("[data-sens]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-jalon]")).toHaveLength(4);
  });
});

