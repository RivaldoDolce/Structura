import { render, waitFor } from "@testing-library/react";
import { createRef, act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { HeroScenario } from "../hero-scenario";

const { fromToStub, registerStub, timelineStub } = vi.hoisted(() => {
  const chronologie = {
    fromTo: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  };
  return {
    fromToStub: chronologie.fromTo,
    killStub: chronologie.kill,
    registerStub: vi.fn(),
    timelineStub: vi.fn(() => chronologie),
  };
});

vi.mock("gsap", () => ({
  gsap: { registerPlugin: registerStub, timeline: timelineStub },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { name: "ScrollTrigger" } }));
vi.mock("@/frontend/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const DECOR = (
  <svg>
    <polygon data-trace data-fill points="0,0 10,0 10,10" />
    <g data-annotation>
      <text>12.00 m</text>
    </g>
  </svg>
);

function rendAvecDecor() {
  const racine = createRef<HTMLDivElement>();
  const decor = (
    <div ref={racine}>
      {DECOR}
      <div data-parallax data-parallax-vitesse="1.06" />
    </div>
  );

  render(decor);
  const trace = racine.current!.querySelector("[data-trace]") as SVGPolygonElement;
  trace.getTotalLength = () => 120;

  const vue = render(<HeroScenario racine={racine} />);
  return { racine, vue };
}

async function viderFiletEffets() {
  // Force le vidage des microtâches et macrotâches en attente
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
  });
}

describe("HeroScenario", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
      configurable: true,
    });
  });

  afterEach(async () => {
    await viderFiletEffets();
  });

  it("prépare les tracés puis rejoue le dessin au scroll (scrub)", async () => {
    const { vue } = rendAvecDecor();

    await waitFor(() => {
      expect(registerStub).toHaveBeenCalled();
    });

    expect(timelineStub).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({ scrub: 0.5 }),
      })
    );
    expect(fromToStub).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ strokeDashoffset: 120 }),
      expect.objectContaining({ strokeDashoffset: 0 }),
      expect.any(Number)
    );
    expect(fromToStub).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ fillOpacity: 0 }),
      expect.objectContaining({ fillOpacity: 0.08 }),
      expect.any(Number)
    );
    vue.unmount();
  });

  it("anima la couche de parallax à sa vitesse", async () => {
    const { vue } = rendAvecDecor();

    await waitFor(() => expect(fromToStub).toHaveBeenCalled());
    const appelParallax = fromToStub.mock.calls.find(([, fin]) => fin && "y" in fin);
    expect(appelParallax?.[1]).toMatchObject({ y: expect.any(Number) });
    vue.unmount();
  });

  it("ne charge jamais GSAP quand le mouvement est réduit", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { vue } = rendAvecDecor();

    expect(registerStub).not.toHaveBeenCalled();
    expect(timelineStub).not.toHaveBeenCalled();
    vue.unmount();
  });

  it("reste éteint sous 768 px", () => {
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({ matches: false })),
      configurable: true,
    });
    const { vue } = rendAvecDecor();

    expect(registerStub).not.toHaveBeenCalled();
    expect(timelineStub).not.toHaveBeenCalled();
    vue.unmount();
  });
});
