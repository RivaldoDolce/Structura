import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlueprintGrid } from "../blueprint-grid";

describe("BlueprintGrid", () => {
  it("dessine une grille 32px par défaut", () => {
    const { container } = render(<BlueprintGrid />);

    const grille = container.firstElementChild as HTMLElement;
    expect(grille.style.backgroundSize).toBe("32px 32px");
    expect(grille).toHaveAttribute("aria-hidden", "true");
  });

  it("adapte la maille à la densité demandée", () => {
    const { container } = render(<BlueprintGrid density="low" />);

    expect((container.firstElementChild as HTMLElement).style.backgroundSize).toBe(
      "64px 64px",
    );
  });

  it("applique un fondu en masque quand demandé", () => {
    const { container } = render(<BlueprintGrid fade="both" />);

    expect((container.firstElementChild as HTMLElement).style.maskImage).toContain(
      "linear-gradient",
    );
  });

  it("fusionne les classes complémentaires", () => {
    const { container } = render(<BlueprintGrid className="absolute inset-0" />);

    expect(container.firstElementChild).toHaveClass("absolute", "inset-0");
  });
});
