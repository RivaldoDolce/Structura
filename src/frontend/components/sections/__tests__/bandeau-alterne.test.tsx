import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { BandeauAlterne } from "../bandeau-alterne";
import type { BandeauAlterneItem } from "../bandeau-alterne";

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

const metiers: BandeauAlterneItem[] = [
  {
    id: "ingenierie",
    number: "01",
    title: "Ingénierie structure",
    description: "Notes de calcul et suivi de chantier.",
    imageUrl: "/test/structure.jpg",
    imageAlt: "Structure en béton armé",
    deliverables: ["Note de calcul", "Plans de ferraillage"],
    href: "/ingenierie",
    surface: "fond",
  },
  {
    id: "ebenisterie",
    number: "02",
    title: "Ébénisterie d'art",
    description: "Mobilier sur-mesure en essences locales.",
    imageUrl: "/test/padouk.jpg",
    imageAlt: "Plateau en padouk",
    deliverables: ["Conception 3D", "Pose"],
    href: "/ebenisterie",
    surface: "warm",
  },
];

describe("BandeauAlterne", () => {
  it("affiche chaque métier avec son numéro, ses livrables et son lien", () => {
    render(<BandeauAlterne items={metiers} />);

    expect(screen.getByRole("region", { name: /expertises/i })).toBeInTheDocument();
    expect(screen.getByText("Ingénierie structure")).toBeInTheDocument();
    expect(screen.getByText("Note de calcul")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Découvrir Ingénierie structure" })).toHaveAttribute(
      "href",
      "/ingenierie"
    );
  });

  it("alterne le sens des bandeaux pour rompre la répétition", () => {
    const { container } = render(<BandeauAlterne items={metiers} />);
    const bandeaux = container.querySelectorAll("[data-sens]");

    expect(bandeaux).toHaveLength(2);
    expect(bandeaux[0]).toHaveAttribute("data-sens", "image-gauche");
    expect(bandeaux[1]).toHaveAttribute("data-sens", "image-droite");
  });

  it("donne à chaque métier sa surface contextuelle", () => {
    const { container } = render(<BandeauAlterne items={metiers} />);
    // Le sélecteur croise les deux marqueurs pour ne pas confondre la surface
    // de section (« alternee ») avec celle, contextuelle, de chaque bandeau.
    const bandeaux = container.querySelectorAll("[data-sens][data-surface]");

    expect(bandeaux[0]).toHaveAttribute("data-surface", "fond");
    expect(bandeaux[1]).toHaveAttribute("data-surface", "warm");
    expect(bandeaux[1]).toHaveClass("st-warm");
  });

  it("éclaire toute la section quand la page demande ivoire", () => {
    const { container } = render(
      <BandeauAlterne
        items={[
          { ...metiers[0], surface: "ivoire" },
          { ...metiers[1], surface: "pale" },
        ]}
        titre="La méthode, étape par étape"
        accroche="Quatre étapes, quatre livrables."
        kicker={{ number: "02", label: "MÉTHODE" }}
        lumiere="ivoire"
      />,
    );

    const section = container.firstElementChild;
    const bandeaux = container.querySelectorAll("[data-sens][data-surface]");

    expect(section).toHaveClass("st-ivoire", "st-lisiere");
    expect(section).toHaveAttribute("data-lumiere", "ivoire");
    expect(bandeaux[0]).toHaveClass("st-ivoire");
    expect(bandeaux[0]).toHaveAttribute("data-lumiere", "ivoire");
    expect(bandeaux[1]).toHaveClass("st-pale");
    expect(screen.getByText("Ingénierie structure")).toHaveClass("text-encre");
    // La coche de livrable passe au vert profond : le vert vif du thème ne
    // tient pas le contraste sur papier.
    expect(container.querySelector("li svg")).toHaveClass("text-ok-deep");
    expect(container.querySelector("h2")).toHaveClass("text-encre");
  });
});
