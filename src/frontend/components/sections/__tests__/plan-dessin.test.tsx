import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlanDessin } from "../plan-dessin";

describe("PlanDessin", () => {
  it("porte une vingtaine de tracés destinés au scrub GSAP", () => {
    const { container } = render(<PlanDessin />);
    const traces = container.querySelectorAll("[data-trace]");

    expect(traces.length).toBeGreaterThanOrEqual(20);
  });

  it("garde chaque tracé visible au rendu serveur : sans JS, le plan est déjà dessiné", () => {
    const { container } = render(<PlanDessin />);

    for (const trace of Array.from(container.querySelectorAll("[data-trace]"))) {
      expect(trace).not.toHaveAttribute("stroke-dasharray");
      expect(trace).not.toHaveAttribute("stroke-dashoffset");
    }
  });

  it("reste décoratif pour les lecteurs d'écran", () => {
    const { container } = render(<PlanDessin />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
