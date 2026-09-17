import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stats } from "../stats";

describe("Stats", () => {
  it("affiche les 4 libellés de chiffres clés", () => {
    render(<Stats />);

    for (const libelle of [
      "Projets livrés",
      "Années d'expérience",
      "Clients satisfaits",
      "Chantiers en cours",
    ]) {
      expect(screen.getByText(libelle)).toBeInTheDocument();
    }
  });

  it("structure la section : région, kicker, titre et grille responsive", () => {
    const { container } = render(<Stats />);

    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByText("CHIFFRES")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/mesure/i);
    expect(container.querySelector("[data-blueprint-grid]")).toBeInTheDocument();
    expect(container.querySelector(".grid")).toHaveClass("grid-cols-2", "md:grid-cols-4");
  });
});
