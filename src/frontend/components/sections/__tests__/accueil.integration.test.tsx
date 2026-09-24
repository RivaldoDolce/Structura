import { render } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { alternanceRespectee } from "@/frontend/lib/lumieres";
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

const ACTES_ATTENDUS = [
  "C1",
  "C4",
  "scene-ingenierie",
  "scene-ebenisterie",
  "scene-plans",
  "scene-immobilier",
  "C3",
  "C5",
  "C6",
  "C8",
] as const;

/**
 * Règle d'alternance de l'audit §6.3 (plan V2 §5) : deux actes voisins ne
 * partagent ni morphologie, ni surface. Le test lit les marqueurs posés par
 * chaque composition et chaque scène sur la page réellement rendue.
 */
describe("Composition de la page d'accueil", () => {
  it("déroule les dix actes dans l'ordre prévu", () => {
    const { container } = render(<PageAccueil />);

    const compositions = [...container.querySelectorAll("[data-composition]")].map((section) =>
      section.getAttribute("data-composition")
    );

    expect(compositions).toEqual([...ACTES_ATTENDUS]);
  });

  it("présente les quatre scènes de métiers et les quatre jalons du suivi", () => {
    const { container } = render(<PageAccueil />);

    expect(container.querySelectorAll("[data-scene]").length).toBeGreaterThanOrEqual(4);
    expect(container.querySelectorAll("[data-jalon]")).toHaveLength(4);
  });

  it("change de lumière à chaque acte voisin", () => {
    const { container } = render(<PageAccueil />);

    // Les compositions historiques exposent une `data-surface`, les scènes V2
    // une `data-lumiere` : la règle porte sur la perception, pas sur le nom de
    // l'attribut, donc on lit les deux avec la même priorité.
    const lumieres = [...container.querySelectorAll("[data-composition]")].map(
      (acte) => acte.getAttribute("data-surface") ?? acte.getAttribute("data-lumiere")
    );

    expect(lumieres).toHaveLength(ACTES_ATTENDUS.length);
    expect(lumieres.every((lumiere) => lumiere !== null)).toBe(true);
    // Le rythme V2 est un contrat : sombre → papier → ivoire → warmth → relevé
    // → sombre → papier → profond → papier → warmth. Le changer, c'est changer
    // la perception de la page, donc ce test le fige.
    expect(lumieres).toEqual([
      "photo",
      "pale",
      "ivoire",
      "warm",
      "pale",
      "sombre",
      "ivoire",
      "deep",
      "pale",
      "warm",
    ]);
    expect(alternanceRespectee(lumieres as string[])).toBe(true);
  });
});
