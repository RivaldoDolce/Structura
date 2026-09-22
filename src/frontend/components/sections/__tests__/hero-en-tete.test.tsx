import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroEnTete } from "../hero-en-tete";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // Représentation minimale du composant Next : les attributs clés du fond
    // (priorité, tailles serviess) sont exposés au test.
    const { priority, sizes, ...reste } = props;
    return (
      <div
        data-testid="image-next"
        data-priority={String(priority)}
        data-sizes={String(sizes)}
        {...reste}
      />
    );
  },
}));

describe("HeroEnTete", () => {
  it("branche le fond du kit avec la priorité de chargement et les tailles servies", () => {
    render(
      <HeroEnTete
        kicker={{ number: "02", label: "ÉBÉNISTERIE" }}
        titre="Ébénisterie d'art"
        accroche="Des essences locales sélectionnées."
        image="/textures/fonds-heros/01-04_heros-ebenisterie-desktop.avif"
        alt="Atelier d'ébénisterie STRUCTURA"
      />,
    );

    const image = screen.getByTestId("image-next");
    expect(image.getAttribute("data-priority")).toBe("true");
    expect(image.getAttribute("src")).toContain("fonds-heros");
    expect(image.getAttribute("data-sizes")).toBe("100vw");
  });

  it("n'affiche pas la pastille d'annotation quand elle n'est pas fournie", () => {
    render(
      <HeroEnTete
        kicker={{ number: "03", label: "IMMOBILIER" }}
        titre="Immobilier"
        accroche="Acheter en confiance."
        image="/textures/fonds-heros/01-06_heros-immobilier-desktop.avif"
        alt="Villa à Yaoundé"
      />,
    );

    expect(screen.queryByText(/APPEL D'OFFRE/)).not.toBeInTheDocument();
  });

  it("rend le kicker numéroté et le titre demandé", () => {
    render(
      <HeroEnTete
        kicker={{ number: "04", label: "PLANS" }}
        titre="Catalogue de plans"
        accroche="Choisissez votre modèle."
        image="/textures/fonds-heros/01-05_heros-plans-desktop.avif"
        alt="Plans architecturaux"
      />,
    );

    expect(screen.getByText("PLANS")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: /Catalogue de plans/ })).toBeInTheDocument();
  });
});
