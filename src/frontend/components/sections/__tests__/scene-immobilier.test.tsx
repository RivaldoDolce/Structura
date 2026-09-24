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

import { SceneImmobilier } from "../scene-immobilier";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const props = {
  kicker: { number: "04", label: "IMMOBILIER" },
  titre: "Des biens vérifiés, pas des promesses",
  accroche: "Foncier, structure, finitions : chaque bien est contrôlé avant mise en vente.",
  imageUrl: "/photos/immobilier/04-15_villa-bastos-nuit.png",
  verifications: ["Titre foncier vérifié", "Structure calculée", "Permis de bâtir OK"],
  actionPrincipale: { label: "Voir les biens", href: "/immobilier" },
};

describe("SceneImmobilier", () => {
  it("compose une scène immersive sombre au panneau translucide", () => {
    const { container } = render(<SceneImmobilier {...props} />);

    const scene = screen.getByRole("region", { name: /biens vérifiés/i });
    expect(scene).toHaveAttribute("data-scene", "immobilier");
    expect(scene).toHaveAttribute("data-lumiere", "sombre");
    // Fond immersif décoratif : le sens est porté par le titre.
    expect(container.querySelector('img[alt=""]')).not.toBeNull();
    expect(container.querySelector(".backdrop-blur-md")).not.toBeNull();
  });

  it("liste les vérifications et l'appel à l'action", () => {
    render(<SceneImmobilier {...props} />);

    for (const verification of props.verifications) {
      expect(screen.getByText(verification)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /voir les biens/i })).toHaveAttribute(
      "href",
      "/immobilier"
    );
  });
});
