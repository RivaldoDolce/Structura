import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Hero } from "../hero";

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

describe("Hero", () => {
  it("affiche un H1 unique avec le message principal", () => {
    render(<Hero />);

    const titre = screen.getByRole("heading", { level: 1 });
    expect(titre).toHaveTextContent(/l'ingénierie qui/i);
    expect(titre).toHaveTextContent(/construit en confiance/i);
  });

  it("expose les deux CTA sans scroll", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute(
      "href",
      "/devis",
    );
    expect(screen.getByRole("link", { name: /voir nos réalisations/i })).toHaveAttribute(
      "href",
      "/portfolio",
    );
  });

  it("annonce le kicker numéroté et la grille blueprint", () => {
    const { container } = render(<Hero />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(container.querySelector("[data-blueprint-grid]")).toBeInTheDocument();
  });

  it("reste une région nommée en mobile-first", () => {
    const { container } = render(<Hero />);

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(container.querySelector(".px-4.md\\:px-6")).toBeInTheDocument();
  });
});
