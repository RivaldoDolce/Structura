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
  it("rend la fiche pour une référence connue", async () => {
    const plan = PLANS[0] as Plan;
    render(
      (await PageFichePlan({
        params: Promise.resolve({ reference: plan.reference }),
      })) as React.ReactElement
    );

    expect(screen.getByText(plan.titre)).toBeInTheDocument();
    expect(trouverPlan(plan.reference)).toBeDefined();
  });

  it("appelle notFound pour une référence inconnue", async () => {
    const faux = notFound as unknown as ReturnType<typeof vi.fn>;

    await expect(
      PageFichePlan({ params: Promise.resolve({ reference: "INCONNU" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(faux).toHaveBeenCalled();
  });

  it("détaille le contenu du dossier livré", async () => {
    const plan = PLANS[0] as Plan;
    render(
      (await PageFichePlan({
        params: Promise.resolve({ reference: plan.reference }),
      })) as React.ReactElement
    );

    expect(screen.getByRole("heading", { name: /contenu du dossier/i })).toBeInTheDocument();
    expect(screen.getByText("Note de calcul")).toBeInTheDocument();
    expect(screen.getByText("Plans de ferraillage")).toBeInTheDocument();
  });

  it("propose l'adaptation au terrain et un WhatsApp pré-rempli", async () => {
    // Sans numéro valide, le bouton WhatsApp ne rend rien par conception.
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "237690000000");
    try {
      const plan = PLANS[0] as Plan;
      render(
        (await PageFichePlan({
          params: Promise.resolve({ reference: plan.reference }),
        })) as React.ReactElement
      );

      expect(
        screen.getByRole("heading", { name: /un terrain particulier/i })
      ).toBeInTheDocument();
      const whatsapp = screen.getByRole("link", { name: /question sur ce plan/i });
      expect(whatsapp.getAttribute("href")).toContain(plan.reference);
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("affiche la réassurance sous le prix", async () => {
    const plan = PLANS[0] as Plan;
    render(
      (await PageFichePlan({
        params: Promise.resolve({ reference: plan.reference }),
      })) as React.ReactElement
    );

    expect(screen.getByText(/facture OHADA/i)).toBeInTheDocument();
    expect(screen.getByText(/CinetPay/i)).toBeInTheDocument();
  });
});
