import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCounter } from "../use-counter";

// Simule matchMedia avec ou sans préférence de réduction des animations.
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

describe("useCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    simuleMatchMedia(false);
  });

  it("retourne la valeur finale quand les animations sont réduites", () => {
    simuleMatchMedia(true);

    const { result } = renderHook(() => useCounter({ end: 150, duration: 1200 }));

    expect(result.current).toBe(150);
  });

  it("reste à zéro tant que la cible est nulle (hors viewport)", () => {
    const { result } = renderHook(() => useCounter({ end: 0, duration: 60 }));

    expect(result.current).toBe(0);
  });

  it("anime de zéro vers la cible quand visible", async () => {
    const { result } = renderHook(() => useCounter({ end: 150, duration: 60 }));

    expect(result.current).toBe(0);
    await waitFor(() => expect(result.current).toBe(150));
  });
});
