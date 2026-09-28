import { render, screen, within } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

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

import { SceneGeste } from "../scene-geste";

const GESTE = {
  etapes: [
    {
      id: "conception",
      numero: "01",
      titre: "Conception 3D",
      description: "Plans, élévations et vues 3D avant la première coupe.",
      imageUrl: "/photos/mobilier/04-72_selection-materiaux-design-interieur.png",
      imageAlt: "Maquette 3D d'un mobilier sur-mesure",
      livrables: ["Dessin technique", "Vues 3D cotées"],
      href: "/devis",
      hrefLabel: "Valider mon plan",
    },
    {
      id: "fabrication",
      numero: "02",
      titre: "Fabrication à l'atelier",
      description: "Débit, assemblages à tenons et mortaises.",
      imageUrl: "/photos/portraits/04-26_equipe-atelier-ebenisterie.png",
      imageAlt: "Équipe d'atelier en cours d'assemblage",
      livrables: ["Assemblages traditionnels", "Bois séché à l'air"],
      href: "/devis",
      hrefLabel: "Suivre la fabrication",
    },
    {
      id: "finition",
      numero: "03",
      titre: "Finition et pose",
      description: "Ponçage progressif, huile dure, pose sur site.",
      imageUrl: "/photos/mobilier/04-03_finition-padouk-atelier.png",
      imageAlt: "Finition à la main d'un plateau de padouk",
      livrables: ["Finition mate ou huilée", "Garantie deux ans"],
      href: "/devis",
      hrefLabel: "Commander la pièce",
    },
  ],
} satisfies Pick<
  Parameters<typeof SceneGeste>[0],
  "etapes"
>;

/**
 * LOT 3B — Scénarisation du geste ébéniste (V3 §8 « une page = une séquence
 * de compositions »).
 *
 * Trois temps, trois grammaires : conception éditoriale 40/60 (le plan se
 * lit), fabrication en média dominant chevauché (l'atelier porte), finition
 * en pleine largeur superposée (la matière conclut). Un seul `BandeauAlterne`
 * 50/50 répété trois fois est exactement la répétition mécanique interdite.
 */
describe("SceneGeste", () => {
  it("scénarise les trois temps en trois grammaires distinctes", () => {
    const { container } = render(
      <SceneGeste
        etapes={GESTE.etapes}
        kicker={{ number: "03", label: "LE GESTE" }}
        titre="Du croquis à la pièce posée"
        accroche="Trois temps, trois validations."
      />
    );

    const actes = [...container.querySelectorAll("[data-acte-geste]")];
    expect(actes).toHaveLength(3);

    expect(actes[0]).toHaveAttribute("data-ratio", "40-60");
    expect(actes[0]).toHaveAttribute("data-motion", "editorial");
    expect(actes[1]).toHaveAttribute("data-ratio", "60-40-chevauchement");
    expect(actes[1]).toHaveAttribute("data-motion", "atelier");
    expect(actes[2]).toHaveAttribute("data-ratio", "100-photo-superposee");
    expect(actes[2]).toHaveAttribute("data-motion", "matiere");

    // Taille réelle différenciée : l'acte final respire en pleine largeur.
    expect(actes[2].tagName.toLowerCase()).toBe("div");
    for (const etape of GESTE.etapes) {
      expect(screen.getByText(etape.titre)).toBeInTheDocument();
    }
  });

  it("garde la séquence des lumières sans collision", () => {
    const { container } = render(
      <SceneGeste
        etapes={GESTE.etapes}
        kicker={{ number: "03", label: "LE GESTE" }}
        titre="Du croquis à la pièce posée"
      />
    );

    const lumieres = [...container.querySelectorAll("[data-acte-geste]")].map((acte) =>
      acte.getAttribute("data-lumiere")
    );
    expect(lumieres).toEqual(["ivoire", "pale", "warm"]);
  });

  /*
   * Régression « texte marron sur carte bleue » : l'acte 02 pose une carte
   * sombre (bg-elevated) au-dessus de la bande pâle, mais l'habillait du ton
   * `pale`. Ses textes, calculés pour le papier, tombent alors à 1,3:1 sur
   * cette surface — le titre devient littéralement illisible.
   *
   * Un ton décrit la surface sur laquelle il est posé, pas la bande qui
   * l'accueille : la bande garde sa lumière pale, la carte flottante prend
   * celle de sa propre surface. Le test verrouille les deux, pour qu'on ne
   * puisse plus réintroduire l'appariement incorrect.
   */
  it("habille la carte flottante d'un ton lisible sur fond sombre", () => {
    const { container } = render(
      <SceneGeste
        etapes={GESTE.etapes}
        kicker={{ number: "03", label: "LE GESTE" }}
        titre="Du croquis à la pièce posée"
      />
    );

    const carte = container.querySelector('[data-acte-geste="fabrication"] [data-carte]');
    expect(carte).not.toBeNull();
    expect(carte).toHaveClass("bg-elevated");
    // La bande reste pâle, la carte déclare la sienne.
    expect(carte).toHaveAttribute("data-lumiere-carte", "warm");

    // Un ton sombre : encre claire, jamais l'encre du papier.
    const titre = within(carte as HTMLElement).getByRole("heading", { level: 3 });
    expect(titre.className).toContain("text-ink");
    expect(titre.className).not.toContain("text-encre");

    const description = within(carte as HTMLElement).getByText(
      GESTE.etapes[1].description
    );
    expect(description.className).toContain("text-ink-soft");
    expect(description.className).not.toContain("text-encre");
  });
});
