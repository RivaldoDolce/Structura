import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Portfolio } from "../portfolio";
import type { PortfolioProject } from "../portfolio";

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
    imageUrl: "/test/villa.jpg",
    location: "Douala",
    year: "2024",
    surface: "320 m²",
    slug: "villa-moderne-douala",
  },
  {
    id: "2",
    title: "Immeuble R+4 Yaoundé",
    description: "Immeuble résidentiel",
    imageUrl: "/test/immeuble.jpg",
    location: "Yaoundé",
    year: "2023",
    surface: "800 m²",
    slug: "immeuble-yaounde",
  },
];

describe("Portfolio", () => {
  it("affiche le kicker, le titre et chaque carte liée à sa page", () => {
    render(<Portfolio projects={projets} />);

    expect(screen.getByRole("region", { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/réalisations/i);
    expect(screen.getByText("Villa Moderne Douala")).toBeInTheDocument();
    expect(screen.getByText("Immeuble R+4 Yaoundé")).toBeInTheDocument();
  });

  it("propose la page portfolio complète et une grille responsive", () => {
    const { container } = render(<Portfolio projects={projets} />);

    expect(screen.getByRole("link", { name: /voir tout le portfolio/i })).toHaveAttribute(
      "href",
      "/portfolio"
    );
    expect(container.querySelector(".grid")).toHaveClass("grid-cols-1", "md:grid-cols-3");
  });
});
