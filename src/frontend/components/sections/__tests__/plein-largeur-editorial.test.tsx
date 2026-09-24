import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PleinLargeurEditorial } from "../plein-largeur-editorial";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe("PleinLargeurEditorial", () => {
  it("met la pièce en scène avec son titre et sa légende technique", () => {
    render(
      <PleinLargeurEditorial
        kicker={{ number: "03", label: "PIÈCE SIGNATURE" }}
        titre="Lit en bubinga"
        accroche="Une pièce d'exception, taillée et assemblée à l'atelier."
        image="/test/lit-bubinga.jpg"
        alt="Lit monumental en bubinga"
        legende="ASSEMBLAGE — BUBINGA, FINITION MATE"
        fiche={[
          { label: "Essence", valeur: "Bubinga" },
          { label: "Dimensions", valeur: "200 × 180 cm" },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Lit en bubinga/);
    expect(screen.getByText("ASSEMBLAGE — BUBINGA, FINITION MATE")).toBeInTheDocument();
    expect(screen.getByText("Bubinga")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Lit monumental en bubinga/ })).toBeInTheDocument();
  });

  it("cadre la photo en bande immersive 21/9", () => {
    const { container } = render(
      <PleinLargeurEditorial
        kicker={{ number: "03", label: "CHANTIER" }}
        titre="Coulage de dalle"
        image="/test/dalle.jpg"
        alt="Coulage de dalle"
        legende="PLANCHER BA — 180 M²"
      />,
    );

    expect(container.querySelector("[data-cadre]")).toHaveClass("aspect-[21/9]");
  });

  it("reste valide sans fiche technique", () => {
    render(
      <PleinLargeurEditorial
        kicker={{ number: "03", label: "CHANTIER" }}
        titre="Coulage de dalle"
        image="/test/dalle.jpg"
        alt="Coulage de dalle"
        legende="PLANCHER BA — 180 M²"
      />,
    );

    expect(screen.queryByRole("definition")).not.toBeInTheDocument();
  });

  it("accueille un comparateur à la place de la photo, sans lui imposer de ratio", () => {
    const { container } = render(
      <PleinLargeurEditorial
        kicker={{ number: "06", label: "MÉTHODE" }}
        titre="Réparation structurelle Mokolo"
        legende="COTE PRÉVUE / RÉALISATION"
        media={<div data-comparateur>Comparateur avant/après</div>}
      />,
    );

    const cadre = container.querySelector("[data-cadre]");
    expect(cadre).not.toHaveClass("aspect-[21/9]");
    expect(cadre).toHaveClass("st-raised");
    expect(container.querySelector("[data-comparateur]")).toBeInTheDocument();
  });

  it("chauffe la bande en warm, la légende passe au sable", () => {
    const { container } = render(
      <PleinLargeurEditorial
        kicker={{ number: "04", label: "PIÈCE SIGNATURE" }}
        titre="Lit en bubinga"
        image="/test/lit.jpg"
        alt="Lit en bubinga"
        legende="ASSEMBLAGE BUBINGA"
        lumiere="warm"
      />,
    );

    expect(container.firstElementChild).toHaveClass("st-warm");
    expect(container.firstElementChild).toHaveAttribute("data-lumiere", "warm");
    expect(screen.getByText("ASSEMBLAGE BUBINGA")).toHaveClass("text-sable");
  });

  it("pose la bande sur ivoire second, légende et fiche en encre", () => {
    const { container } = render(
      <PleinLargeurEditorial
        kicker={{ number: "08", label: "MÉTHODE" }}
        titre="Réparation structurelle Mokolo"
        legende="COTE PRÉVUE / RÉALISATION"
        fiche={[{ label: "Ouvrage", valeur: "Bâtiment R+1" }]}
        media={<div data-comparateur>Comparateur avant/après</div>}
        lumiere="pale"
      />,
    );

    const bande = container.firstElementChild;
    expect(bande).toHaveClass("st-pale", "st-lisiere");
    expect(container.querySelector("[data-cadre]")).toHaveClass("st-raised");
    expect(screen.getByText("COTE PRÉVUE / RÉALISATION")).toHaveClass("text-steel-encre");
    expect(screen.getByText("Bâtiment R+1")).toHaveClass("text-encre");
    expect(screen.getByText("Ouvrage")).toHaveClass("text-encre-soft");
  });
});
