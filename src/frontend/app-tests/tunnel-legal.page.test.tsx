import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PageDevis from "@/app/(conversion)/devis/page";
import PageMentions from "@/app/(public)/legal/mentions-legales/page";
import PageCgv from "@/app/(public)/legal/cgv/page";
import PageConfidentialite from "@/app/(public)/legal/confidentialite/page";
import PageNotFound from "@/app/not-found";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...reste
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...reste}>
      {children}
    </a>
  ),
}));

describe("Tunnel devis", () => {
  it("affiche le tunnel en 3 étapes", () => {
    render(<PageDevis />);

    expect(screen.getByRole("heading", { name: /demander un devis/i })).toBeInTheDocument();
  });
});

describe("Pages légales", () => {
  it("rend mentions, CGV et confidentialité avec un titre unique", () => {
    render(<PageMentions />);
    expect(screen.getByRole("heading", { name: /mentions légales/i })).toBeInTheDocument();
    render(<PageCgv />);
    expect(screen.getByRole("heading", { name: /conditions générales/i })).toBeInTheDocument();
    render(<PageConfidentialite />);
    expect(screen.getByRole("heading", { name: /confidentialité/i })).toBeInTheDocument();
  });
});

describe("Page 404", () => {
  it("propose un retour à l'accueil", () => {
    render(<PageNotFound />);

    expect(screen.getByRole("link", { name: /retour à l'accueil/i })).toHaveAttribute("href", "/");
  });
});
