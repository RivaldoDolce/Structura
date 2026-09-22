import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatistiquesSourcees } from "../statistiques-sourcees";
import type { StatistiqueSourcee } from "../statistiques-sourcees";

const chiffres: StatistiqueSourcee[] = [
  {
    value: 150,
    suffix: "+",
    label: "Projets livrés",
    source: "Depuis 2014, Yaoundé et 7 régions",
  },
  { value: 12, label: "Années d'expérience", source: "Bureau d'études interne" },
];

describe("StatistiquesSourcees", () => {
  it("associe chaque chiffre à sa source", () => {
    render(<StatistiquesSourcees chiffres={chiffres} titre="La preuve chiffrée" />);

    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByText("Projets livrés")).toBeInTheDocument();
    expect(screen.getByText("Depuis 2014, Yaoundé et 7 régions")).toBeInTheDocument();
    expect(screen.getByText("Bureau d'études interne")).toBeInTheDocument();
  });

  it("rend les sources en Inter, jamais en mono", () => {
    render(<StatistiquesSourcees chiffres={chiffres} titre="La preuve chiffrée" />);

    const source = screen.getByText("Depuis 2014, Yaoundé et 7 régions");
    expect(source).toHaveClass("text-small");
    expect(source.className).not.toMatch(/\bfont-mono\b/);
  });

  it("pose la bande sur la surface profonde du thème", () => {
    const { container } = render(<StatistiquesSourcees chiffres={chiffres} titre="La preuve" />);

    expect(container.firstElementChild).toHaveClass("bg-surface-deep");
  });
});
