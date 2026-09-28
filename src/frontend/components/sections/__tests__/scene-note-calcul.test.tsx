import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SceneNoteCalcul, type SceneNoteCalculProps } from "../scene-note-calcul";

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

const props: SceneNoteCalculProps = {
  numero: "02",
  titre: "Note de calcul",
  accroche:
    "Descente de charges, hypothèses sismiques et coefficients de sécurité : chaque valeur est justifiée et signée.",
  imageUrl: "/photos/chantiers/04-70_bureau-etude-conception-3d.png",
  imageAlt: "Maquette structurelle calculée",
  cotes: [
    { terme: "Charge permanente", valeur: "5,2 kN/m²" },
    { terme: "Charge d'exploitation", valeur: "2,5 kN/m²" },
    { terme: "Sécurité sismique", valeur: "1,15" },
    { terme: "Béton C25/30", valeur: "fc 25 MPa" },
  ],
  annotation: "NOTE DE CALCUL — BÂTIMENT R+2, ZONE II",
  href: "/devis",
  hrefLabel: "Demander une note de calcul",
};

describe("SceneNoteCalcul", () => {
  it("donne la measurements dominance à la scène et non au texte", () => {
    render(<SceneNoteCalcul {...props} />);

    const scene = screen.getByRole("region", { name: /note de calcul/i });
    expect(scene).toHaveAttribute("data-scene", "note-calcul");
    expect(scene).toHaveAttribute("data-lumiere", "pale");
    // Le média est le porteur dominant : il occupe plus que la moitié de la
    // scène. L'inversion du 50/50 précédent est ici structurelle.
    expect(scene.querySelector("[data-porteur]")).toHaveAttribute("data-porteur", "media");
  });

  it("chevauche le panneau de cotes sur le média plutôt que de le coller", () => {
    const { container } = render(<SceneNoteCalcul {...props} />);

    const panneau = container.querySelector("[data-panneau-cotes]");
    expect(panneau).not.toBeNull();
    // Le chevauchement est réel : le panneau empiète sur la grille média.
    expect(panneau?.getAttribute("data-chevauchement")).toBe("oui");
  });

  it("présente les cotes comme des données mono, pas comme des puces", () => {
    const { container } = render(<SceneNoteCalcul {...props} />);

    expect(screen.getByText("5,2 kN/m²")).toHaveClass("font-mono");
    expect(container.querySelectorAll("[data-cote]")).toHaveLength(4);
  });

  it("porte l'annotation technique de la note", () => {
    render(<SceneNoteCalcul {...props} />);

    expect(screen.getByText(props.annotation)).toBeInTheDocument();
  });
});
