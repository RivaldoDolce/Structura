import { render, screen, within } from "@testing-library/react";
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
  it("assemble les dix actes et le tunnel de devis", () => {
    render(<PageAccueil />);

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /ouvrages calculés/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /ébénisterie padouk/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /modèles prêts/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /biens vérifiés/i })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /trois histoires construites/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /journal de chantier/i })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /le chantier, étape par étape/i })
    ).toBeInTheDocument();
    /*
     * Acte 09 : un seul comparateur interactif, le geste du feuilleton.
     * Les duos statiques (`MosaiqueAvantApres`) ont été retirés — trois paires
     * d'images fixes répètent la preuve déjà portée par le journal (acte 08) et
     * concurrencent le seul geste que la page doit enseigner. La régression
     * serait invisible à l'œil : ce décompte la verrouille.
     */
    const methode = screen.getByRole("region", { name: /le chantier, étape par étape/i });
    expect(methode.querySelectorAll('[role="img"]')).toHaveLength(0);
    expect(
      within(methode).getByRole("slider", { name: /comparaison avant\/après/i }),
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
