import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import PagePortfolio from "@/app/(public)/portfolio/page";
import PageDetailPortfolio from "@/app/(public)/portfolio/[slug]/page";

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
  usePathname: () => "/portfolio",
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe("Portfolio", () => {
  it("affiche toutes les réalisations avec des slugs uniques", () => {
    render(<PagePortfolio />);

    for (const projet of PROJETS_PORTFOLIO) {
      expect(screen.getByText(projet.title)).toBeInTheDocument();
    }
    const slugs = PROJETS_PORTFOLIO.map((projet) => projet.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("rend le détail d'un projet connu avec sa galerie", async () => {
    const projet = PROJETS_PORTFOLIO[0];
    if (!projet) throw new Error("Jeu de démonstration vide");
    render(
      (await PageDetailPortfolio({
        params: Promise.resolve({ slug: projet.slug }),
      })) as React.ReactElement
    );

    expect(screen.getByRole("heading", { level: 1, name: projet.title })).toBeInTheDocument();
  });

  it("signale un slug inconnu", async () => {
    await expect(
      PageDetailPortfolio({ params: Promise.resolve({ slug: "introuvable" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
