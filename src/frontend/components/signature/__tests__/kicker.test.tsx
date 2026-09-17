import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kicker } from "../kicker";

describe("Kicker", () => {
  it("affiche le numéro et le libellé de section", () => {
    render(<Kicker number="01" label="STRUCTURA" />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("STRUCTURA")).toBeInTheDocument();
  });

  it("fusionne les classes complémentaires", () => {
    render(<Kicker number="02" label="CHIFFRES" className="mb-4" />);

    expect(screen.getByText("CHIFFRES").parentElement).toHaveClass("mb-4");
  });
});
