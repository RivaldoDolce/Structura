import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Services } from "../services";
import type { ServiceItem } from "../services";

const expertises: ServiceItem[] = [
  {
    id: "1",
    number: "01",
    title: "Ingénierie structure",
    description: "Calculs et plans de structure",
    icon: "building",
    deliverables: ["Note de calcul", "Plans de ferraillage"],
    href: "/ingenierie",
  },
  {
    id: "2",
    number: "02",
    title: "Ébénisterie d'art",
    description: "Mobilier sur-mesure",
    icon: "hammer",
    deliverables: ["Conception 3D", "Fabrication"],
    href: "/ebenisterie",
  },
];

describe("Services", () => {
  it("affiche le kicker, le titre et chaque expertise avec ses livrables", () => {
    render(<Services services={expertises} />);

    expect(screen.getByRole("region", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByText("SERVICES")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/expertises/i);
    expect(screen.getByText("Ingénierie structure")).toBeInTheDocument();
    expect(screen.getByText("Ébénisterie d'art")).toBeInTheDocument();
    expect(screen.getByText("Note de calcul")).toBeInTheDocument();
  });

  it("grille les cartes en une colonne mobile et deux sur desktop", () => {
    const { container } = render(<Services services={expertises} />);

    expect(container.querySelector(".grid")).toHaveClass("grid-cols-1", "md:grid-cols-2");
  });
});
