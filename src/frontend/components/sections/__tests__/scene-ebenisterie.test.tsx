import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

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

import { SceneEbenisterie } from "../scene-ebenisterie";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const props = {
  kicker: { number: "02", label: "ÉBÉNISTERIE" },
  essence: "Padouk",
  description: "Un veinage serré qui traverse les années sans faiblir.",
  imageUrl: "/photos/mobilier/04-78_atelier-ebenisterie-faconnage.png",
  imageAlt: "Ébéniste d'atelier rabotant une pièce de padouk",
  badge: "Atelier Yaoundé",
  href: "/ebenisterie",
  hrefLabel: "Voir l'atelier",
};

describe("SceneEbenisterie", () => {
  it("compose une scène atelier chaude au nom d'essence en serif", () => {
    const { container } = render(<SceneEbenisterie {...props} />);

    const scene = screen.getByRole("region", { name: /padouk/i });
    expect(scene).toHaveAttribute("data-scene", "ebenisterie");
    expect(scene).toHaveAttribute("data-lumiere", "warm");
    expect(
      screen.getByAltText("Ébéniste d'atelier rabotant une pièce de padouk"),
    ).toBeInTheDocument();
    expect(container.querySelector(".font-editorial")).toHaveTextContent("Padouk");
    expect(container.querySelector(".st-warm")).not.toBeNull();
  });

  it("affiche le badge cuivre et l'appel à l'action", () => {
    const { container } = render(<SceneEbenisterie {...props} />);

    expect(screen.getByText("Atelier Yaoundé")).toBeInTheDocument();
    expect(container.querySelector(".border-cuivre")).not.toBeNull();
    expect(screen.getByRole("link", { name: /voir l'atelier/i })).toHaveAttribute(
      "href",
      "/ebenisterie"
    );
  });

  /*
   * Régression « le texte s'entremelle à l'image » : la colonne éditoriale
   * chevauchait la photo par des marges négatives, sans surface de protection.
   * Le texte doit être posé sur un panneau opaque qui le sépare du visuel —
   * c'est la grammaire du panneau chevauché, pas un texte posé sur la photo.
   */
  it("pose le texte sur un panneau qui le sépare de la photo", () => {
    const { container } = render(<SceneEbenisterie {...props} />);

    const panneau = container.querySelector("[data-panneau-texte]");
    expect(panneau).not.toBeNull();
    // Surface de protection : sans fond, le texte repose sur la photo.
    expect(panneau).toHaveClass("bg-surface-deep");
    // Et il reste lisible : la photo ne doit pas déborder sous le texte.
    expect(panneau).toHaveClass("p-8", "lg:p-10");
  });

  // La photo de l'acte est celle de l'atelier : la macro d'essence ne montrait
  // ni la main ni la machine, c'est-à-dire ni le métier.
  it("illustre la scène par la photo d'atelier fournie", () => {
    render(<SceneEbenisterie {...props} />);

    expect(screen.getByAltText("Ébéniste d'atelier rabotant une pièce de padouk")).toHaveAttribute(
      "src",
      "/photos/mobilier/04-78_atelier-ebenisterie-faconnage.png"
    );
  });
});
