import { PLANS, TYPES_BATIMENT, trouverPlan, type Plan } from "@/frontend/data/plans";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CataloguePlans } from "@/app/(public)/plans/catalogue-plans";
import PageFichePlan from "@/app/(public)/plans/[reference]/page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...reste
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) => (
    <a href={href} {...reste}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  usePathname: () => "/plans",
}));

describe("Catalogue des plans", () => {
  it("affiche chaque plan avec son prix et sa référence unique", () => {
    render(<CataloguePlans plans={PLANS} />);

    for (const plan of PLANS) {
      expect(screen.getByText(plan.titre)).toBeInTheDocument();
    }
    const references = PLANS.map((plan: Plan) => plan.reference);
    expect(new Set(references).size).toBe(references.length);
  });

  it("propose un filtre par type de bâtiment", () => {
    render(<CataloguePlans plans={PLANS} />);

    for (const type of TYPES_BATIMENT) {
      expect(screen.getByRole("button", { name: new RegExp(type, "i") })).toBeInTheDocument();
    }
  });
});

describe("Fiche plan", () => {
  it("rend la fiche pour une référence connue", () => {
    const plan = PLANS[0] as Plan;
    render(PageFichePlan({ params: { reference: plan.reference } }) as React.ReactElement);

    expect(screen.getByText(plan.titre)).toBeInTheDocument();
    expect(trouverPlan(plan.reference)).toBeDefined();
  });

  it("appelle notFound pour une référence inconnue", () => {
    const faux = notFound as unknown as ReturnType<typeof vi.fn>;

    expect(() =>
      render(PageFichePlan({ params: { reference: "INCONNU" } }) as React.ReactElement),
    ).toThrow("NEXT_NOT_FOUND");
    expect(faux).toHaveBeenCalled();
  });
});
