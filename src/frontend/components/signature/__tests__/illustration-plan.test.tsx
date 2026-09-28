import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IllustrationPlan } from "../illustration-plan";
import type { TypeBatiment } from "@/frontend/data/plans";

/*
 * Un modèle de plan ne peut pas être illustré par la photo d'un bâtiment déjà
 * construit et vendu : cette image réapparaîtrait dans l'acte immobilier et
 * dans le portfolio, et le visiteur lirait deux fois la même preuve. Le tracé
 * prend sa place — il montre ce que STRUCTURA vend (un modèle), pas ce qu'il a
 * déjà livré. Ces tests verrouillent la variarion par type : sans elle, les
 * trois cartes du catalogue afficheraient le même dessin.
 */
describe("IllustrationPlan", () => {
  it("dessine un tracé distinct pour chaque type de bâtiment", () => {
    const tracés = (["villa", "immeuble", "duplex", "terrain"] as TypeBatiment[]).map((type) =>
      render(<IllustrationPlan type={type} />).container.querySelector("svg")?.innerHTML
    );

    expect(new Set(tracés).size).toBe(tracés.length);
  });

  it("porte le type en marqueur, pour l'audit de cohérence des scènes", () => {
    const { container } = render(<IllustrationPlan type="duplex" />);

    expect(container.firstElementChild).toHaveAttribute("data-illustration", "duplex");
  });

  it("est décorative : le sens reste porté par le titre de la carte", () => {
    const { container } = render(<IllustrationPlan type="villa" />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
  });

  it("retombe sur la villa pour un type inconnu plutôt que de casser", () => {
    const { container } = render(<IllustrationPlan type={"hangar" as TypeBatiment} />);

    expect(container.firstElementChild).toHaveAttribute("data-illustration", "villa");
  });

  it("n'emploie aucune couleur en dur, uniquement des tokens", () => {
    const { container } = render(<IllustrationPlan type="immeuble" />);

    expect(container.querySelector("svg")?.innerHTML).not.toMatch(/#[0-9a-f]{3,8}/i);
  });
});