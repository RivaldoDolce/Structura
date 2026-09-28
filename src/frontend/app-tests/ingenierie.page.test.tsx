import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { alternanceRespectee } from "@/frontend/lib/lumieres";
import PageIngenierie from "@/app/(public)/ingenierie/page";

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

describe("Page Ingénierie", () => {
  /*
   * V3 §7.7 : les quatre scènes de la méthode ne peuvent pas être quatre
   * bandeaux 50/50 alternés. Ce test lit la grille réelle de chaque acte —
   * pas une intention, le DOM rendu.
   */
  it("déroule quatre scènes distinctes, sans répétition mécanique", () => {
    const { container } = render(<PageIngenierie />);

    const scenes = [...container.querySelectorAll("[data-scene]")].map(
      (scene) => scene.getAttribute("data-scene")
    );

    expect(scenes).toEqual([
      "etude-prealable",
      "note-calcul",
      "ferraillage",
      "suivi-reception",
    ]);
    // Aucun `BandeauAlterne` ne doit subsister : c'est le motif que la refonte
    // interdit comme solution automatique (V3 §8.2).
    expect(container.querySelectorAll("[data-composition='C2']")).toHaveLength(0);
  });

  it("alterne les lumières et donne à chaque acte un rapport dominant distinct", () => {
    const { container } = render(<PageIngenierie />);

    const actes = [...container.querySelectorAll("[data-scene]")];
    const lumieres = actes.map((acte) => acte.getAttribute("data-lumiere") ?? "");

    expect(alternanceRespectee(lumieres)).toBe(true);

    // Un ratio dominant par acte : c'est la mesure objective de la variety.
    const rapports = actes.map((acte) => acte.getAttribute("data-ratio"));
    expect(new Set(rapports).size).toBe(rapports.length);
  });

  it("ne répète aucune photographie d'un acte à l'autre", () => {
    const { container } = render(<PageIngenierie />);

    const sources = [...container.querySelectorAll("img")].map((image) =>
      (image.getAttribute("src") ?? "").replace(/\.webp$/, ".png")
    );
    const repetees = sources.filter((source, index) => sources.indexOf(source) !== index);

    expect(repetees, `photographies répétées : ${[...new Set(repetees)].join(", ")}`).toEqual([]);
  });

  it("conserve les quatre livrables annoncés par la méthode", () => {
    render(<PageIngenierie />);

    expect(screen.getByText("Esquisse dimensionnée")).toBeInTheDocument();
    expect(screen.getByText("Procès-verbal de réception")).toBeInTheDocument();
  });
});
