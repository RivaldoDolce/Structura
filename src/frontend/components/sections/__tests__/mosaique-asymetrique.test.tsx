import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { MosaiqueAsymetrique } from "../mosaique-asymetrique";
import type { MosaiqueItem } from "../mosaique-asymetrique";

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

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const quatre: MosaiqueItem[] = [
  {
    id: "1",
    title: "Coulage de dalle R+2",
    description: "Plancher béton armé de 180 m².",
    imageUrl: "/test/dalle.jpg",
    alt: "Coulage de dalle",
    href: "/portfolio/coulage-dalle-r2",
  },
  {
    id: "2",
    title: "Mobilier de bureau en padouk",
    description: "Table de réunion de douze places.",
    imageUrl: "/test/table.jpg",
    alt: "Table de réunion",
    href: "/portfolio/mobilier-bureau-padouk",
  },
  {
    id: "3",
    title: "Réparation structurelle Mokolo",
    description: "Reprise en sous-œuvre.",
    imageUrl: "/test/mokolo.jpg",
    alt: "Bâtiment réparé",
    href: "/portfolio/reparation-mokolo",
  },
  {
    id: "4",
    title: "Duplex Simbock",
    description: "Deux niveaux livrés.",
    imageUrl: "/test/duplex.jpg",
    alt: "Duplex livré",
    href: "/portfolio/duplex-simbock",
  },
];

describe("MosaiqueAsymetrique", () => {
  it("varie les ratios : une grande bande, deux moyennes, un portrait", () => {
    const { container } = render(<MosaiqueAsymetrique items={quatre} />);

    expect(container.querySelectorAll('[data-taille="grande"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-taille="moyenne"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-taille="portrait"]')).toHaveLength(1);
  });

  it("rend chaque projet cliquable vers sa fiche", () => {
    render(<MosaiqueAsymetrique items={quatre} />);

    expect(screen.getByRole("link", { name: /Coulage de dalle R\+2/ })).toHaveAttribute(
      "href",
      "/portfolio/coulage-dalle-r2"
    );
    expect(screen.getByRole("link", { name: /Duplex Simbock/ })).toBeInTheDocument();
  });

  it("n'exige pas exactement quatre projets mais leur ordonne les rôles", () => {
    const { container } = render(<MosaiqueAsymetrique items={quatre.slice(0, 2)} />);

    // Sous le seuil de quatre, tout devient moyenne : jamais de bande orpheline.
    expect(container.querySelectorAll('[data-taille="grande"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-taille="moyenne"]')).toHaveLength(2);
  });

  it("pose la mosaïque sur ivoire quand la page le demande", () => {
    const { container } = render(<MosaiqueAsymetrique items={quatre} />);

    const section = container.firstElementChild;
    expect(section).toHaveClass("st-ivoire", "st-lisiere");
    expect(section).toHaveAttribute("data-lumiere", "ivoire");
    // Les cartes restent sombres : sur papier, elles font office de
    // passe-partout — le contraste est voulu, pas un oubli de ton.
    expect(container.querySelectorAll("article")[0]).toHaveClass("bg-surface");
  });
});
