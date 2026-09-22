import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceCard } from "../service-card";

describe("ServiceCard", () => {
  it("affiche le numéro, le titre et la description", () => {
    render(
      <ServiceCard
        number="01"
        title="Ingénierie structure"
        description="Calculs et plans de structure"
        icon={<span data-testid="icone" />}
        deliverables={["Note de calcul", "Plans de ferraillage"]}
      />
    );

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Ingénierie structure")).toBeInTheDocument();
    expect(screen.getByText("Calculs et plans de structure")).toBeInTheDocument();
    expect(screen.getByTestId("icone")).toBeInTheDocument();
  });

  it("liste chaque livrable avec un marqueur", () => {
    render(
      <ServiceCard
        number="02"
        title="Ébénisterie d'art"
        description="Mobilier sur-mesure"
        icon={<span />}
        deliverables={["Conception 3D", "Fabrication"]}
      />
    );

    const liste = screen.getByRole("list");
    expect(liste).toHaveTextContent("Conception 3D");
    expect(liste).toHaveTextContent("Fabrication");
  });
});
