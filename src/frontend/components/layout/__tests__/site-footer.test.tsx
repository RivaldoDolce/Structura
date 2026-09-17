import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SiteFooter } from "../site-footer";

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

describe("SiteFooter", () => {
  it("expose la marque, sa baseline et les contacts", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo", { name: /pied de page structura/i })).toBeInTheDocument();
    expect(screen.getByText(/l'ingénierie qui construit en confiance/i)).toBeInTheDocument();
    expect(screen.getByText(/cameroun/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /690 000 000/ })).toHaveAttribute(
      "href",
      expect.stringContaining("tel:"),
    );
  });

  it("structure les 4 colonnes de navigation", () => {
    render(<SiteFooter />);

    for (const colonne of ["Services", "Entreprise", "Ressources", "Légal"]) {
      expect(screen.getByRole("heading", { name: colonne })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /mentions légales/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cgv/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /confidentialité/i })).toBeInTheDocument();
  });

  it("signe avec l'année courante et une grille responsive", () => {
    const { container } = render(<SiteFooter />);
    const annee = new Date().getFullYear();

    expect(screen.getByText(new RegExp(`© ${annee} STRUCTURA`))).toBeInTheDocument();
    expect(container.querySelector(".grid")).toHaveClass("grid-cols-1", "md:grid-cols-5");
  });

  it("laisse le porteur surcharger les coordonnées", () => {
    render(<SiteFooter telephone="+237699999999" email="bonjour@exemple.cm" />);

    expect(screen.getByRole("link", { name: /699 999 999/ })).toHaveAttribute(
      "href",
      "tel:+237699999999",
    );
    expect(screen.getByRole("link", { name: /bonjour@exemple.cm/ })).toHaveAttribute(
      "href",
      "mailto:bonjour@exemple.cm",
    );
  });
});
