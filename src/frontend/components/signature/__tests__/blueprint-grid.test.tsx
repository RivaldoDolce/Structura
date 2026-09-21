import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlueprintGrid } from "../blueprint-grid";

const RACINE = 0;
const GRILLE = 0;
const CROIX = 1;

// Repères du kit : maille fine 32 px, croix de repérage 160 px.
const TUILE_CROIX = "05-03_texture-croix-160.svg";

function racine(container: HTMLElement): HTMLElement {
  return container.children[RACINE] as HTMLElement;
}

function calque(container: HTMLElement, index: number): HTMLElement {
  return racine(container).children[index] as HTMLElement;
}

describe("BlueprintGrid", () => {
  it("dessine une grille de 32 px par défaut, purement décorative", () => {
    const { container } = render(<BlueprintGrid />);

    expect(racine(container)).toHaveAttribute("aria-hidden", "true");
    expect(racine(container)).toHaveClass("pointer-events-none");
    expect(calque(container, GRILLE).style.backgroundSize).toBe("32px 32px");
  });

  it("élargit la maille à 160 px en densité majeure", () => {
    const { container } = render(<BlueprintGrid density="major" />);

    expect(calque(container, GRILLE).style.backgroundSize).toBe("160px 160px");
  });

  it("superpose les croix de repérage tous les 160 px, peintes par token", () => {
    const { container } = render(<BlueprintGrid />);

    const croix = calque(container, CROIX);
    expect(croix.style.maskImage).toContain(TUILE_CROIX);
    expect(croix.style.maskSize).toBe("160px 160px");
    expect(croix.style.backgroundColor).toBe("var(--color-blueprint)");
  });

  it("applique le dégradé de masquage demandé sur toute la composition", () => {
    const { container } = render(<BlueprintGrid fade="both" />);

    expect(racine(container).style.maskImage).toContain("linear-gradient");
    expect(racine(container).style.maskImage).toContain("transparent");
  });

  it("ne masque rien sans option de fondu", () => {
    const { container } = render(<BlueprintGrid />);

    expect(racine(container).style.maskImage).toBe("");
  });

  it("fusionne les classes complémentaires sans perdre son positionnement", () => {
    const { container } = render(<BlueprintGrid className="absolute inset-0" />);

    expect(racine(container)).toHaveClass("absolute", "inset-0", "pointer-events-none");
  });
});
