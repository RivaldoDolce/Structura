import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kicker } from "../kicker";

describe("Kicker", () => {
  it("affiche le numéro et le libellé de section", () => {
    render(<Kicker number="01" label="STRUCTURA" />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("STRUCTURA")).toBeInTheDocument();
  });

  it("rend le libellé dans le style mono majuscule du sur-titre", () => {
    render(<Kicker label="ÉTUDE & PLANS" />);

    expect(screen.getByText("ÉTUDE & PLANS")).toBeInTheDocument();
    expect(screen.getByText("ÉTUDE & PLANS").parentElement).toHaveClass("font-mono", "uppercase");
  });

  it("fusionne les classes complémentaires", () => {
    render(<Kicker label="CHIFFRES" className="mb-4" />);

    expect(screen.getByText("CHIFFRES").parentElement).toHaveClass("mb-4");
  });

  it("accepte un rendu sans numéro", () => {
    render(<Kicker label="PORTFOLIO" />);

    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });
});
