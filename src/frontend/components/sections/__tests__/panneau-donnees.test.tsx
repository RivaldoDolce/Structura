import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PanneauDonnees } from "../panneau-donnees";

describe("PanneauDonnees", () => {
  it("présente chaque donnée en couple terme/valeur", () => {
    render(
      <PanneauDonnees
        kicker={{ number: "03", label: "FICHE TECHNIQUE" }}
        titre="Villa F4 — 180 m²"
        lignes={[
          { label: "Superficie", valeur: "180 m²" },
          { label: "Niveaux", valeur: "2" },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Villa F4/);
    expect(screen.getByText("Superficie")).toBeInTheDocument();
    expect(screen.getByText("180 m²")).toBeInTheDocument();
  });

  it("pose le panneau sur la surface blueprint, maille fine derrière", () => {
    const { container } = render(
      <PanneauDonnees
        kicker={{ number: "03", label: "FICHE TECHNIQUE" }}
        titre="Villa F4"
        lignes={[{ label: "Superficie", valeur: "180 m²" }]}
      />,
    );

    expect(container.firstElementChild).toHaveClass("bg-surface-blueprint");
    expect(container.querySelector("[data-maille]")).toBeInTheDocument();
  });

  it("accepte un contenu additionnel sous le tableau", () => {
    render(
      <PanneauDonnees
        kicker={{ number: "03", label: "FICHE" }}
        titre="Villa F4"
        lignes={[{ label: "Superficie", valeur: "180 m²" }]}
      >
        <p>Dossier de permis inclus.</p>
      </PanneauDonnees>,
    );

    expect(screen.getByText("Dossier de permis inclus.")).toBeInTheDocument();
  });

  it("retourne le panneau sur papier quand la page demande la lumière claire", () => {
    const { container } = render(
      <PanneauDonnees
        kicker={{ number: "03", label: "VÉRIFICATION" }}
        titre="Six contrôles"
        lignes={[{ label: "Titre foncier", valeur: "Vérifié au cadastre" }]}
        lumiere="pale"
      />,
    );

    const panneau = container.firstElementChild;
    expect(panneau).toHaveClass("st-pale", "st-lisiere");
    expect(panneau).toHaveAttribute("data-lumiere", "pale");
    expect(screen.getByText("Titre foncier")).toHaveClass("text-encre-soft");
    expect(screen.getByText("Vérifié au cadastre")).toHaveClass("text-encre");
    expect(container.querySelector("[data-maille]")).toBeInTheDocument();
  });
});
