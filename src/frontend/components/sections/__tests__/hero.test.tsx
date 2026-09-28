import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { PHOTO_HERO_ACCUEIL } from "@/frontend/data/fonds";
import { Hero } from "../hero";

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

describe("Hero", () => {
  it("affiche un H1 unique avec le message principal", () => {
    render(<Hero />);

    const titre = screen.getByRole("heading", { level: 1 });
    expect(titre).toHaveTextContent(/l'ingénierie/i);
    expect(titre).toHaveTextContent(/construit en confiance/i);
  });

  // Le titre est découpé en lignes masquées : chaque ligne est révélée par une
  // translation verticale (variante `titleReveal`). Le mot éditorial doit rester
  // le dernier temps de la chorégraphie, donc seul sur la dernière ligne.
  it("répartit le H1 en trois lignes masquées, le mot éditorial en dernier", () => {
    render(<Hero />);

    const titre = screen.getByRole("heading", { level: 1 });
    const lignes = Array.from(titre.querySelectorAll("[data-ligne]"));
    expect(lignes).toHaveLength(3);
    for (const ligne of lignes) {
      expect(ligne).toHaveClass("overflow-hidden");
    }

    const derniere = lignes[lignes.length - 1];
    expect(derniere.querySelector("em")).not.toBeNull();
    expect(derniere.textContent?.trim().toLowerCase()).toBe("confiance");
  });

  // Règle V3 §6.2 « un seul porteur du plan » : la maille blueprint quitte le
  // hero, sinon deux représentations du même plan se superposent.
  it("ne conserve qu'un seul porteur du plan", () => {
    const { container } = render(<Hero />);

    expect(container.querySelector("[data-blueprint-grid]")).toBeNull();
    expect(container.querySelectorAll("figure")).toHaveLength(1);
    expect(container.querySelectorAll("[data-trace]").length).toBeGreaterThanOrEqual(20);
  });

  it("porte une photo réelle de chantier, jamais la planche blueprint du kit", () => {
    const { container } = render(<Hero />);

    const photo = container.querySelector("img");
    expect(photo).not.toBeNull();
    // next/image encode le chemin dans `/_next/image?url=…` : on décode avant
    // de comparer pour que l'assertion reste vraie avec ou sans optimisation.
    const source = decodeURIComponent(photo?.getAttribute("src") ?? "");
    expect(source).toContain(PHOTO_HERO_ACCUEIL.src);
    expect(source).not.toContain("fonds-heros");

    // Protection localisée du texte : sans elle, la photo serait soit illisible
    // sous le titre, soit noyée sous un voile opaque plein cadre.
    expect(container.querySelector(".st-voile-photo")).not.toBeNull();
  });

  it("expose les deux CTA sans scroll", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute(
      "href",
      "/devis"
    );
    expect(screen.getByRole("link", { name: /voir nos réalisations/i })).toHaveAttribute(
      "href",
      "/portfolio"
    );
  });

  it("annonce le kicker numéroté", () => {
    render(<Hero />);

    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("reste une région nommée en mobile-first", () => {
    const { container } = render(<Hero />);

    expect(screen.getByRole("region", { name: /section d'accueil/i })).toBeInTheDocument();
    expect(container.querySelector(".px-4.md\\:px-6")).toBeInTheDocument();
    expect(container.querySelector('[data-lumiere="sombre"]')).toBeInTheDocument();
  });

  it("affiche le plan isométrique déjà dessiné sans JavaScript", () => {
    const { container } = render(<Hero />);

    const traces = container.querySelectorAll("[data-trace]");
    expect(traces.length).toBeGreaterThanOrEqual(20);
    for (const trace of Array.from(traces)) {
      expect(trace).not.toHaveAttribute("stroke-dasharray");
    }
  });

  // Règle V3 §6.5 : un seul mouvement piloté par le scroll. La grille et les
  // annotations flottantes ayant disparu, le tracé du plan reste le seul
  // geste — ni parallax, ni translation concurrente sur le même élément.
  it("ne déclare qu'un seul mouvement piloté par le scroll", () => {
    const { container } = render(<Hero />);

    expect(container.querySelector('[data-motion="trace-scrub"]')).not.toBeNull();
    expect(container.querySelectorAll("[data-parallax]")).toHaveLength(0);
  });
});
