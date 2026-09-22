import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StickyMobileCta } from "../sticky-mobile-cta";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("StickyMobileCta", () => {
  it("est invisible sur desktop", () => {
    render(<StickyMobileCta label="Demander un devis" href="/contact" />);

    expect(screen.getByRole("link", { name: "Demander un devis" }).parentElement).toHaveClass(
      "md:hidden"
    );
  });

  it("pointe vers la page demandée", () => {
    render(<StickyMobileCta label="Demander un devis" href="/contact" />);

    expect(screen.getByRole("link", { name: "Demander un devis" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("s'efface pendant le défilement vers le bas", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    render(<StickyMobileCta label="Demander un devis" href="/contact" />);

    Object.defineProperty(window, "scrollY", { value: 400, writable: true, configurable: true });
    fireEvent.scroll(window);

    expect(
      screen.getByRole("link", { name: "Demander un devis" }).parentElement
    ).toBeInTheDocument();
  });
});
