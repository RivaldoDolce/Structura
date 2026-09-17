import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StatCounter } from "../stat-counter";

function simuleMatchMedia(reduite: boolean): void {
  window.matchMedia = vi.fn().mockImplementation((requete: string) => ({
    matches: reduite && requete === "(prefers-reduced-motion: reduce)",
    media: requete,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe("StatCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    simuleMatchMedia(true);
  });

  it("affiche la valeur formatée en français avec préfixe, suffixe et libellé", () => {
    render(<StatCounter value={1500} label="Projets livrés" prefix="~" suffix="+" />);

    expect(screen.getByText("Projets livrés")).toBeInTheDocument();
    expect(screen.getByText(/1[\s\u202f]500/)).toBeInTheDocument();
    expect(screen.getByText(/[~+]/)).toBeInTheDocument();
  });

  it("affiche la valeur directe quand les animations sont réduites", () => {
    render(<StatCounter value={98} label="Clients satisfaits" suffix="%" />);

    expect(screen.getByText(/98/)).toBeInTheDocument();
  });

  it("reste lisible sans affolement quand la valeur est nulle", () => {
    render(<StatCounter value={0} label="Chantiers en cours" />);

    expect(screen.getByText("Chantiers en cours")).toBeInTheDocument();
  });
});
