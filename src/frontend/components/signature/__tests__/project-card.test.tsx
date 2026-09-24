import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectCard } from "../project-card";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const projet = {
  title: "Villa Moderne Douala",
  description: "Villa contemporaine de standing",
  imageUrl: "/test/villa.jpg",
  location: "Douala",
  year: "2024",
  surface: "320 m²",
};

describe("ProjectCard", () => {
  it("affiche le titre, la description et l'image", () => {
    render(<ProjectCard {...projet} />);

    expect(screen.getByText("Villa Moderne Douala")).toBeInTheDocument();
    expect(screen.getByText("Villa contemporaine de standing")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Villa Moderne Douala" })).toHaveAttribute(
      "src",
      "/test/villa.jpg"
    );
  });

  it("expose les données techniques en ligne sur mobile", () => {
    const { container } = render(<ProjectCard {...projet} />);

    const panneauMobile = container.querySelector("dl.md\\:hidden");
    expect(panneauMobile).toHaveTextContent("Douala");
    expect(panneauMobile).toHaveTextContent("2024");
    expect(panneauMobile).toHaveTextContent("320 m²");
  });

  it("enveloppe la carte d'un lien quand href est fourni", () => {
    render(<ProjectCard {...projet} href="/portfolio/villa" />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/portfolio/villa");
  });

  it("soulève la carte et zoome l'image au survol, sur la même courbe expo", () => {
    const { container } = render(<ProjectCard {...projet} />);

    const carte = container.querySelector("article");
    expect(carte).toHaveClass("group");
    expect(carte).toHaveClass("transition-transform", "duration-500", "ease-out-expo");
    expect(carte).toHaveClass("hover:-translate-y-2", "hover:shadow-glow");
  });

  it("omet les données absentes sans casser la grille", () => {
    render(<ProjectCard title="Studio" description="Petit budget" imageUrl="/test/studio.jpg" />);

    expect(screen.queryByText("Localisation")).not.toBeInTheDocument();
  });
});
