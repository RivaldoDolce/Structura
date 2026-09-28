import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SceneEtudePrealable, type SceneEtudePrealableProps } from "../scene-etude-prealable";

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

const props: SceneEtudePrealableProps = {
  numero: "01",
  titre: "Étude préalable",
  accroche:
    "Relevé sur site, analyse du sol et des contraintes d'usage : la structure se dessine avant de se calculer.",
  imageUrl: "/photos/journal/04-38_journal-fouille-rigole-matin.png",
  imageAlt: "Fouilles en rigole et contrôle des cotes",
  preuves: [
    { label: "Sol", valeur: "Essai de portance" },
    { label: "Contrainte", valeur: "Zone sismique II" },
    { label: "Pente", valeur: "8 %" },
  ],
  livrables: ["Visite technique", "Esquisse dimensionnée", "Devis ferme — 5 jours"],
  href: "/devis",
  hrefLabel: "Lancer mon étude",
};

describe("SceneEtudePrealable", () => {
  it("pose une scène claire asymétrique, l'image débordant du container", () => {
    render(<SceneEtudePrealable {...props} />);

    const scene = screen.getByRole("region", { name: /étude préalable/i });
    expect(scene).toHaveAttribute("data-scene", "etude-prealable");
    expect(scene).toHaveAttribute("data-lumiere", "ivoire");
    // Image débordante : elle mord hors du container éditorial, signature de
    // l'acte. Une image confinée à la grille ferait un 50/50 de plus.
    expect(scene.querySelector("[data-hors-container]")).not.toBeNull();
  });

  it("intègre le numéro dans la grille plutôt que de l'isoler en cartouche", () => {
    const { container } = render(<SceneEtudePrealable {...props} />);

    // Le numéro vit dans la même colonne que le titre : il fait partie de la
    // composition, il n'est pas une étiquette flottante.
    const numero = container.querySelector("[data-numero-scene]");
    expect(numero).toHaveTextContent("01");
    expect(numero?.closest("[data-colonne-texte]")).not.toBeNull();
  });

  it("regroupe les preuves en lignes de relevé, sans carte ni icône par preuve", () => {
    const { container } = render(<SceneEtudePrealable {...props} />);

    expect(screen.getByText("Zone sismique II")).toBeInTheDocument();

    const preuves = container.querySelectorAll("[data-preuve]");
    expect(preuves).toHaveLength(3);
    // Chaque preuve est une ligne terme/valeur, pas une carte : deux enfants
    // sémantiques et rien d'autre — pas de figure ni d'icône à l'intérieur.
    for (const preuve of preuves) {
      expect(preuve.children).toHaveLength(2);
      expect([...preuve.children].map((enfant) => enfant.tagName)).toEqual(["DT", "DD"]);
    }
  });

  it("liste les livrables et conclut sur une action", () => {
    render(<SceneEtudePrealable {...props} />);

    expect(screen.getByText("Esquisse dimensionnée")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: props.hrefLabel })).toHaveAttribute("href", "/devis");
  });
});
