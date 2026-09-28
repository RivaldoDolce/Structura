import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SceneSuiviReception, type SceneSuiviReceptionProps } from "../scene-suivi-reception";

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

const props: SceneSuiviReceptionProps = {
  numero: "04",
  titre: "Suivi et réception",
  accroche:
    "Visites à chaque phase sensible, contrôle d'enrobage et procès-verbal de réception à la remise des clés.",
  imageUrl: "/photos/chantiers/04-45_suivi-controle-enrobage.png",
  imageAlt: "Chantier R+2 sous suivi technique",
  suivi: [
    { label: "Phase", valeur: "Élévation" },
    { label: "Enrobage", valeur: "5 cm vérifié" },
    { label: "Visites", valeur: "6 à ce jour" },
  ],
  href: "/devis",
  hrefLabel: "Demander un suivi",
};

describe("SceneSuiviReception", () => {
  it("compose un acte immersif où le texte se pose sur la photographie", () => {
    render(<SceneSuiviReception {...props} />);

    const scene = screen.getByRole("region", { name: /suivi et réception/i });
    expect(scene).toHaveAttribute("data-scene", "suivi-reception");
    // Le texte vit dans la même couche que la photo : pas de colonne à côté,
    // pas de bande de couleur posée devant l'image.
    expect(scene.querySelector("[data-superpose]")).not.toBeNull();
  });

  it("garde un panneau de suivi léger, distinct du verre dépoli de l'immobilier", () => {
    const { container } = render(<SceneSuiviReception {...props} />);

    const panneau = container.querySelector("[data-panneau-suivi]");
    // Léger : un liseré et une surface translucide fine, sans le fond lourd
    // opaque de l'acte immobilier — le chantier doit rester visible dessous.
    expect(panneau?.className).toContain("backdrop-blur");
    expect(panneau?.className).not.toContain("bg-fond/70");
  });

  it("détaille les points de suivi au-dessus de la photo", () => {
    const { container } = render(<SceneSuiviReception {...props} />);

    expect(screen.getByText("Enrobage")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-point-suivi]")).toHaveLength(3);
  });
});
