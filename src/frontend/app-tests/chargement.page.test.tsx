import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingPlan from "@/app/(public)/plans/[reference]/loading";
import LoadingProjet from "@/app/(public)/portfolio/[slug]/loading";

describe("Chargements des routes dynamiques", () => {
  it("trace le relevé de la fiche plan aux bonnes dimensions", () => {
    const { container } = render(<LoadingPlan />);

    expect(screen.getByRole("status", { name: /fiche plan/i })).toBeInTheDocument();
    // Titre, visuel 4/3, colonne d'achat : le relevé occupe la vraie place.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(5);
  });

  it("trace le relevé de l'étude de cas aux bonnes dimensions", () => {
    const { container } = render(<LoadingProjet />);

    expect(screen.getByRole("status", { name: /réalisation/i })).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(4);
  });
});
