import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SceneFerraillage, type SceneFerraillageProps } from "../scene-ferraillage";

const props: SceneFerraillageProps = {
  numero: "03",
  phrase: "Section de béton, diamètres, espacements et recouvrements.",
  titre: "Plans de ferraillage",
  accroche:
    "Les plans que l'équipe suit sur le terrain : chaque barre est positionnée, chaque recouvrement est justifié.",
  cotes: ["Ø12", "Ø16", "8.40 m", "R+2"],
};

describe("SceneFerraillage", () => {
  it("déroule un acte blueprint en pleine largeur, hors du container éditorial", () => {
    render(<SceneFerraillage {...props} />);

    const scene = screen.getByRole("region", { name: /plans de ferraillage/i });
    expect(scene).toHaveAttribute("data-scene", "ferraillage");
    expect(scene).toHaveAttribute("data-lumiere", "sombre");
    // Plein largeur : le plan et sa maille débordent la grille de lecture.
    expect(scene.querySelector("[data-pleine-largeur]")).not.toBeNull();
  });

  it("affiche le plan coté comme porteur unique de la scène", () => {
    const { container } = render(<SceneFerraillage {...props} />);

    // Aucun média photographique : c'est un acte de dessin, pas de reportage.
    expect(container.querySelectorAll("img")).toHaveLength(0);
    expect(container.querySelectorAll("[data-trace]").length).toBeGreaterThan(10);
  });

  it("ferme la scène sur une ligne de cotes, lisible comme un relevé", () => {
    const { container } = render(<SceneFerraillage {...props} />);

    const ligne = container.querySelector("[data-ligne-cotes]");
    expect(ligne?.textContent).toContain("Ø12");
    expect(ligne?.textContent).toContain("R+2");
    // Chaque cote est mono : c'est un relevé, pas une phrase. On vise le premier
    // span, le conteneur portant déjà la classe pour l'espacement.
    expect(ligne?.querySelector("span")).toHaveClass("font-mono");
  });

  it("ouvre la phrase sur la maille avant le titre, sans les hiérarchiser à l'inverse", () => {
    const { container } = render(<SceneFerraillage {...props} />);

    const sequence = [...container.querySelectorAll("[data-sequence]")].map((noeud) =>
      noeud.getAttribute("data-sequence")
    );
    expect(sequence).toEqual(["phrase", "titre"]);
  });
});
