import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PriceTag } from "../price-tag";
import { PriceTag } from "../price-tag";

describe("PriceTag", () => {
  it("formate le montant au format français", () => {
    render(<PriceTag amount={2500000} />);

    expect(screen.getByText("2 500 000")).toBeInTheDocument();
    expect(screen.getByText("FCFA")).toBeInTheDocument();
  });

  it("n'affiche aucune action sans href", () => {
    render(<PriceTag amount={1800000} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("ajoute un appel à l'action quand href est fourni", () => {
    render(<PriceTag amount={3200000} unit="FCFA / m²" href="/contact" hrefLabel="Obtenir un devis" />);

    const lien = screen.getByRole("link", { name: /Obtenir un devis/ });
    expect(lien).toHaveAttribute("href", "/contact");
    expect(screen.getByText("FCFA / m²")).toBeInTheDocument();
  });
});