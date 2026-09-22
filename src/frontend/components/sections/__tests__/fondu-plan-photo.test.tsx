import { render, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/frontend/hooks/use-reduced-motion";
import { FonduPlanPhoto } from "../fondu-plan-photo";

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
vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const PHOTO = "/photos/chantiers/04-04_chantier-r2-yaounde.png";

async function viderFiletEffets() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
  });
}

describe("FonduPlanPhoto", () => {
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

  it("superpose le plan et la photo, photo visible sans scénario", () => {
    // Sans match desktop, le scénario ne s'arme jamais : état du rendu serveur.
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({ matches: false })),
      configurable: true,
    });
    const { container } = render(<FonduPlanPhoto photoSrc={PHOTO} photoAlt="Chantier R+2" />);

    expect(container.querySelector("[data-plan]")).toBeInTheDocument();
    const photo = container.querySelector("[data-photo]") as HTMLElement;
    expect(photo).toHaveStyle({ opacity: "1" });
    expect(container.querySelector("[data-plan]")).toHaveStyle({ opacity: "0" });
  });

  it("rejoue le fondu plan vers photo au scroll sur desktop", async () => {
    const { unmount } = render(<FonduPlanPhoto photoSrc={PHOTO} photoAlt="Chantier R+2" />);

    await waitFor(() => expect(registerStub).toHaveBeenCalled());
    expect(timelineStub).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({ scrub: 0.5 }),
      })
    );
    // Le plan s'efface pendant que la photo apparaît.
    expect(fromToStub).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 1 }),
      expect.objectContaining({ opacity: 0 }),
      expect.any(Number)
    );
    expect(fromToStub).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0 }),
      expect.objectContaining({ opacity: 1 }),
      expect.any(Number)
    );
    unmount();
    await viderFiletEffets();
  });

  it("ne charge jamais GSAP en mouvement réduit", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { unmount } = render(<FonduPlanPhoto photoSrc={PHOTO} photoAlt="Chantier R+2" />);

    expect(registerStub).not.toHaveBeenCalled();
    expect(timelineStub).not.toHaveBeenCalled();
    unmount();
  });

  it("reste une photo fixe sous 768 px", () => {
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({ matches: false })),
      configurable: true,
    });
    const { container, unmount } = render(
      <FonduPlanPhoto photoSrc={PHOTO} photoAlt="Chantier R+2" />
    );

    expect(registerStub).not.toHaveBeenCalled();
    expect(container.querySelector("[data-photo]")).toHaveStyle({ opacity: "1" });
    unmount();
  });
});
