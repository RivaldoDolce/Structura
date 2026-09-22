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
});
