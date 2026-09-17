import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LenisProvider } from "../lenis-provider";

vi.mock("next/navigation", () => ({ usePathname: vi.fn(() => "/") }));
vi.mock("lenis/react", () => ({
  ReactLenis: ({ children }: { children: ReactNode }) => (
    <div data-lenis="actif">{children}</div>
  ),
}));

const cheminSimule = usePathname as Mock;

function simuleMatchMedia(reduit: boolean) {
  window.matchMedia = vi.fn().mockImplementation((requete: string) => ({
    matches: requete === "(prefers-reduced-motion: reduce)" ? reduit : false,
    media: requete,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  cheminSimule.mockReturnValue("/");
  simuleMatchMedia(false);
});

describe("LenisProvider", () => {
  it("rend les enfants sur une page publique avec défilement fluide", () => {
    const { container } = render(
      <LenisProvider>
        <p>Contenu de test</p>
      </LenisProvider>,
    );

    expect(screen.getByText("Contenu de test")).toBeInTheDocument();
    expect(container.querySelector('[data-lenis="actif"]')).toBeInTheDocument();
  });

  it("désactive le défilement fluide sur le tunnel de devis", () => {
    cheminSimule.mockReturnValue("/devis");
    const { container } = render(
      <LenisProvider>
        <p>Formulaire devis</p>
      </LenisProvider>,
    );

    expect(screen.getByText("Formulaire devis")).toBeInTheDocument();
    expect(container.querySelector('[data-lenis="actif"]')).not.toBeInTheDocument();
  });

  it("désactive le défilement fluide sur la page contact", () => {
    cheminSimule.mockReturnValue("/contact");
    const { container } = render(
      <LenisProvider>
        <p>Formulaire contact</p>
      </LenisProvider>,
    );

    expect(container.querySelector('[data-lenis="actif"]')).not.toBeInTheDocument();
  });

  it("désactive le défilement fluide si les animations sont réduites", () => {
    simuleMatchMedia(true);
    const { container } = render(
      <LenisProvider>
        <p>Contenu sobre</p>
      </LenisProvider>,
    );

    expect(screen.getByText("Contenu sobre")).toBeInTheDocument();
    expect(container.querySelector('[data-lenis="actif"]')).not.toBeInTheDocument();
  });
});
