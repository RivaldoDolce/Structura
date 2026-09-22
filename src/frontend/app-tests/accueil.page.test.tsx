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
  it("assemble les sept actes et le tunnel de devis", () => {
    render(<PageAccueil />);

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /expertises/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /trois histoires construites/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /journal de chantier/i })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /réparation structurelle à mokolo/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /démarrer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /demander un devis gratuit/i })).toHaveAttribute(
      "href",
      "/devis"
    );
  });

  it("n'expose que des projets présents dans les données", () => {
    render(<PageAccueil />);

    for (const projet of PROJETS_PORTFOLIO.slice(0, 4)) {
      expect(screen.getByText(projet.title)).toBeInTheDocument();
    }
  });
});
