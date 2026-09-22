import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { useScenarioActif } from "../use-scenario-actif";

vi.mock("@/frontend/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

function simuleLargeur(large: boolean) {
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn(() => ({
      matches: large,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
    configurable: true,
  });
}

describe("useScenarioActif", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    simuleLargeur(true);
  });

  it("active le scénario sur desktop sans mouvement réduit", () => {
    const { result } = renderHook(() => useScenarioActif());

    expect(result.current).toBe(true);
  });

  it("coupe le scénario en mouvement réduit", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { result } = renderHook(() => useScenarioActif());

    expect(result.current).toBe(false);
  });

  it("coupe le scénario sous 768 px", () => {
    simuleLargeur(false);

    const { result } = renderHook(() => useScenarioActif());

    expect(result.current).toBe(false);
  });
});
