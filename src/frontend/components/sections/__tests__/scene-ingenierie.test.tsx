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

import { SceneIngenierie } from "../scene-ingenierie";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const props = {
  kicker: { number: "01", label: "INGÉNIERIE" },
  titre: "Des ouvrages calculés, pas devinés",
  accroche: "Chaque structure est dimensionnée avant le premier sac de ciment.",
  imageUrl: "/photos/chantiers/04-04_chantier-r2-yaounde.png",
  imageAlt: "Chantier R+2 en cours d'élévation",
  points: [
    { valeur: "340 m²", label: "Surface calculée" },
    { valeur: "R+2", label: "Niveaux vérifiés" },
    { valeur: "11 mois", label: "Délai tenu" },
  ],
  href: "/ingenierie",
  hrefLabel: "Découvrir l'ingénierie",
};

describe("SceneIngenierie", () => {
  it("compose une scène ivoire éditoriale avec photo débordante", () => {
    const { container } = render(<SceneIngenierie {...props} />);

    const scene = screen.getByRole("region", { name: /ouvrages calculés/i });
    expect(scene).toHaveAttribute("data-scene", "ingenierie");
    expect(scene).toHaveAttribute("data-lumiere", "ivoire");
    expect(screen.getByAltText("Chantier R+2 en cours d'élévation")).toBeInTheDocument();
    expect(container.querySelector(".st-ivoire")).not.toBeNull();
  });

  it("épelle les trois données puis l'appel à l'action", () => {
    render(<SceneIngenierie {...props} />);

    for (const point of props.points) {
      expect(screen.getByText(point.valeur)).toBeInTheDocument();
      expect(screen.getByText(point.label)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /découvrir l'ingénierie/i })).toHaveAttribute(
      "href",
      "/ingenierie"
    );
  });

  it("trace le mini-plan de repérage technique", () => {
    const { container } = render(<SceneIngenierie {...props} />);

    expect(container.querySelector("[data-mini-plan]")).toBeInTheDocument();
  });
});
