import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CtaChaud } from "../cta-chaud";

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

describe("CtaChaud", () => {
  it("porte le titre de clôture et la double entrée devis / WhatsApp", () => {
    render(
      <CtaChaud
        kicker={{ number: "07", label: "DÉMARRER" }}
        titre="Le devis en deux minutes"
        accroche="Décrivez votre projet, nous revenons vers vous sous 24 h."
        actionPrincipale={{ label: "Demander un devis", href: "/devis" }}
        actionSecondaire={{ label: "Écrire sur WhatsApp", href: "https://wa.me/237690000000" }}
      />,
    );

    expect(screen.getByRole("region", { name: /démarrer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Demander un devis/ })).toHaveAttribute(
      "href",
      "/devis"
    );
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
      "href",
      "https://wa.me/237690000000"
    );
  });

  it("chauffe la clôture : surface warm et display court", () => {
    const { container } = render(
      <CtaChaud
        kicker={{ number: "07", label: "DÉMARRER" }}
        titre="Le devis en deux minutes"
        actionPrincipale={{ label: "Demander un devis", href: "/devis" }}
      />,
    );

    expect(container.firstElementChild).toHaveClass("st-warm");
  });

  it("se passe sans action secondaire", () => {
    render(
      <CtaChaud
        kicker={{ number: "07", label: "DÉMARRER" }}
        titre="Le devis en deux minutes"
        actionPrincipale={{ label: "Demander un devis", href: "/devis" }}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
