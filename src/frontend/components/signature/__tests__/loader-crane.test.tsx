import { render, screen } from "@testing-library/react";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoaderCrane } from "../loader-crane";

vi.mock("@/frontend/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe("LoaderCrane", () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("annonce un chargement en cours pour les lecteurs d'écran", () => {
    render(<LoaderCrane />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Chargement")).toBeInTheDocument();
  });

  it("masque l'animation quand le mouvement réduit est demandé", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<LoaderCrane />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});