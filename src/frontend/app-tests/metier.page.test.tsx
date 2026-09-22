import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { essences } from "@/frontend/data/equipe";
import PageIngenierie from "@/app/(public)/ingenierie/page";
import PageEbenisterie from "@/app/(public)/ebenisterie/page";
import PageImmobilier from "@/app/(public)/immobilier/page";
import PageAPropos from "@/app/(public)/a-propos/page";
import PageContact from "@/app/(public)/contact/page";

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
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe("Pages métier", () => {
  it("présente l'ingénierie : méthode en quatre étapes et CTA devis", () => {
    render(<PageIngenierie />);

    expect(screen.getByRole("heading", { name: /ingénierie structure/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /la méthode, étape par étape/i })).toBeInTheDocument();

    const devis = screen.getAllByRole("link", { name: /demander un devis/i });
    expect(devis.length).toBeGreaterThanOrEqual(1);
    for (const lien of devis) {
      expect(lien).toHaveAttribute("href", "/devis");
    }
  });

  it("présente l'ébénisterie avec les essences du catalogue", () => {
    render(<PageEbenisterie />);

    expect(screen.getByRole("heading", { name: /ébénisterie/i })).toBeInTheDocument();
    for (const essence of essences) {
      expect(screen.getByText(essence.nom)).toBeInTheDocument();
    }
    const ctas = screen.getAllByRole("link", { name: /commander du sur-mesure/i });
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/devis");
    }
  });

  it("présente l'immobilier avec ses vérifications et le CTA contact", () => {
    render(<PageImmobilier />);

    expect(screen.getByRole("heading", { name: /immobilier/i })).toBeInTheDocument();
    expect(screen.getByText(/six contrôles avant toute proposition/i)).toBeInTheDocument();

    const contacts = screen.getAllByRole("link", { name: /prendre contact/i });
    expect(contacts.length).toBeGreaterThanOrEqual(1);
    for (const lien of contacts) {
      expect(lien).toHaveAttribute("href", "/contact");
    }
  });
});

describe("Pages institutionnelles", () => {
  it("présente l'équipe sur À propos", () => {
    render(<PageAPropos />);

    expect(screen.getByRole("heading", { name: /à propos/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /chiffres clés/i })).toBeInTheDocument();
  });

  it("expose le formulaire de contact et les coordonnées", () => {
    render(<PageContact />);

    expect(screen.getByRole("heading", { name: /parlons de votre projet/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument();
  });
});
