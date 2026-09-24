import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ScenePlans } from "../scene-plans";

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

const props = {
  kicker: { number: "03", label: "PLANS" },
  titre: "Des modèles prêts à construire",
  accroche: "Adaptables à votre terrain, déposés pour le permis.",
  plans: [
    {
      reference: "ST-VILLA-R1-PAD",
      titre: "Villa R+1 patio padouk",
      prixFcfa: 4500000,
      imageUrl: "/photos/immobilier/04-15_villa-bastos-nuit.png",
    },
    {
      reference: "ST-DUPLEX-SIM",
      titre: "Duplex jumelé clé en main",
      prixFcfa: 3800000,
      imageUrl: "/photos/immobilier/04-17_duplex-simbock.png",
    },
    {
      reference: "ST-R4-ODZA-20",
      titre: "Immeuble R+4 vingt logements",
      prixFcfa: 12000000,
      imageUrl: "/photos/immobilier/04-16_immeuble-r4-odza.png",
    },
  ],
  href: "/plans",
  hrefLabel: "Explorer le catalogue",
};

describe("ScenePlans", () => {
  it("compose une scène technique claire à trois niveaux de cartes", () => {
    const { container } = render(<ScenePlans {...props} />);

    const scene = screen.getByRole("region", { name: /modèles prêts/i });
    expect(scene).toHaveAttribute("data-scene", "plans");
    expect(scene).toHaveAttribute("data-lumiere", "pale");
    expect(container.querySelector(".st-pale")).not.toBeNull();
  });

  it("affiche chaque plan avec son prix en encre et son lien fiche", () => {
    render(<ScenePlans {...props} />);

    for (const plan of props.plans) {
      // Nom exact : les références contiennent des "+" qui casseraient un RegExp.
      expect(screen.getByRole("link", { name: plan.titre })).toHaveAttribute(
        "href",
        `/plans/${plan.reference}`
      );
    }
    expect(screen.getByText("4 500 000")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explorer le catalogue/i })).toHaveAttribute(
      "href",
      "/plans"
    );
  });
});
