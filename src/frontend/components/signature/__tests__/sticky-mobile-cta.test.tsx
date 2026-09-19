import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StickyMobileCta } from "../sticky-mobile-cta";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("StickyMobileCta", () => {
  it("est invisible sur desktop", () => {
    render(<StickyMobileCta label="Demander un devis" href="/contact" />);

    expect(screen.getByRole("link", { name: "Demander un devis" }).parentElement).toHaveClass(
      "md:hidden",
    );
  });

  it("pointe vers la page demandée et réserve 80 px en bas de page", async () => {
    const utilisateur = userEvent.setup();
    const retirer = vi.fn();
    vi.spyOn(document.documentElement.style, "setProperty");
    vi.spyOn(document.documentElement.style, "removeProperty").mockImplementation(retirer);

    const { unmount } = render(<StickyMobileCta label="Demander un devis" href="/contact" />);
    await utilisateur.click(screen.getByRole("link", { name: "Demander un devis" }));
    unmount();

    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
      "--barre-cta-mobile",
      "80px",
    );
    expect(retirer).toHaveBeenCalledWith("--barre-cta-mobile");
  });
});