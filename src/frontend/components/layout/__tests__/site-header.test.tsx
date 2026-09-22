import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "../site-header";

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

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    document.body.style.overflow = "";
  });

  it("expose le logo vers l'accueil et la navigation desktop", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /structura/i })).toHaveAttribute("href", "/");
    const nav = screen.getByRole("navigation", { name: /navigation principale/i });
    expect(nav).toHaveClass("hidden", "md:flex");
    expect(screen.getByRole("link", { name: /ingénierie/i })).toBeInTheDocument();
  });

  it("réserve le CTA devis au desktop et le hamburger au mobile", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /demander un devis/i }).parentElement).toHaveClass(
      "hidden",
      "md:block"
    );
    expect(screen.getByRole("button", { name: /ouvrir le menu/i })).toHaveClass("md:hidden");
  });

  it("reste transparent en haut puis floute après 24px de scroll", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("border-transparent");

    Object.defineProperty(window, "scrollY", { value: 30, writable: true, configurable: true });
    fireEvent.scroll(window);

    expect(header).toHaveClass("backdrop-blur-md", "border-line");
  });

  it("ouvre le menu mobile, bloque le scroll du body et referme via Escape", async () => {
    const utilisateur = userEvent.setup();
    render(<SiteHeader />);

    const hamburger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");

    await utilisateur.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: /menu de navigation/i })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await utilisateur.keyboard("{Escape}");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("porte un libellé d'en-tête pour les technologies d'assistance", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "En-tête du site STRUCTURA");
  });
});
