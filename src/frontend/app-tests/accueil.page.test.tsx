import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import PageAccueil from "@/app/(public)/page";

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

describe("Page d'accueil", () => {
  it("assemble Hero, chiffres, services, portfolio et CTA devis", () => {
    render(<PageAccueil />);

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /demander un devis gratuit/i })).toHaveAttribute(
      "href",
      "/devis"
    );
  });

  it("n'expose que des projets présents dans les données", () => {
    render(<PageAccueil />);

    for (const projet of PROJETS_PORTFOLIO.slice(0, 3)) {
      expect(screen.getByText(projet.title)).toBeInTheDocument();
    }
  });
});
