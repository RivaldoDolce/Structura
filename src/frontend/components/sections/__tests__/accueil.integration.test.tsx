import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Hero } from "../hero";
import { Portfolio } from "../portfolio";
import type { PortfolioProject } from "../portfolio";
import { Services } from "../services";
import type { ServiceItem } from "../services";
import { Stats } from "../stats";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...reste
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) => (
    <a href={href} {...reste}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const projets: PortfolioProject[] = [
  {
    id: "1",
    title: "Villa Moderne Douala",
    description: "Villa contemporaine de standing",
    imageUrl: "/photos/chantiers/04-04_chantier-r2-yaounde.png",
    location: "Douala",
    year: "2024",
    surface: "320 m²",
    slug: "villa-moderne-douala",
  },
];

const expertises: ServiceItem[] = [
  {
    id: "1",
    number: "01",
    title: "Ingénierie structure",
    description: "Calculs et plans de structure",
    icon: "building",
    deliverables: ["Note de calcul"],
    href: "/ingenierie",
  },
];

// Assemblage type page d'accueil : les sections cohabitent sans conflit
// de région nommée et les CTA mènent aux tunnels de conversion.
describe("Assemblage page d'accueil", () => {
  it("compose Hero, Stats, Portfolio et Services avec des régions uniques", () => {
    render(
      <>
        <Hero />
        <Stats />
        <Portfolio projects={projets} />
        <Services services={expertises} />
      </>,
    );

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /services/i })).toBeInTheDocument();
  });

  it("relie chaque carte portfolio à sa page et le hero au tunnel devis", () => {
    render(
      <>
        <Hero />
        <Portfolio projects={projets} />
      </>,
    );

    expect(
      screen.getByRole("link", { name: /demander un devis/i }),
    ).toHaveAttribute("href", "/devis");
    const carte = screen.getByText("Villa Moderne Douala").closest("a");
    expect(carte).toHaveAttribute("href", "/portfolio/villa-moderne-douala");
  });
});
