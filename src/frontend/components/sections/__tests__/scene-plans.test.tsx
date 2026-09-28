import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ScenePlans, type ScenePlansProps } from "../scene-plans";

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

// Le type est annoté : sans lui, TypeScript élargit les littéraux de
// `typeBatiment` en `string` et le test perdrait exactement la garantie que
// la scène vérifie — chaque modèle doit porter un tracé existant.
const props: ScenePlansProps = {
  kicker: { number: "03", label: "PLANS" },
  titre: "Des modèles prêts à construire",
  accroche: "Adaptables à votre terrain, déposés pour le permis.",
  plans: [
    {
      reference: "ST-VILLA-R1-PAD",
      titre: "Villa R+1 patio padouk",
      prixFcfa: 4500000,
      typeBatiment: "villa",
      imageUrl: "/photos/immobilier/04-79_villa-patio-padouk-facade.png",
      imageAlt: "Villa R+1 patio padouk — façade sur patio padouk",
    },
    {
      reference: "ST-DUPLEX-SIM",
      titre: "Duplex jumelé clé en main",
      prixFcfa: 3800000,
      typeBatiment: "duplex",
      imageUrl: "/photos/immobilier/04-80_duplex-jumele-facade.png",
      imageAlt: "Duplex jumelé clé en main — façade sur jardin",
    },
    {
      reference: "ST-R4-ODZA-20",
      titre: "Immeuble R+4 vingt logements",
      prixFcfa: 12000000,
      typeBatiment: "immeuble",
      imageUrl: "/photos/immobilier/04-81_immeuble-odza-facade.png",
      imageAlt: "Immeuble R+4 vingt logements — façade sur rue",
    },
  ],
  href: "/plans",
  hrefLabel: "Explorer le catalogue",
};

describe("ScenePlans", () => {
  it("compose une scène technique claire à trois niveaux de cartes", () => {
    const { container } = render(<ScenePlans {...props} />);

    const scene = screen.getByRole("region", { name: /modèles prêts/i });
    expect(scene).toHaveAttribute("data-scene", "plans");
    expect(scene).toHaveAttribute("data-lumiere", "pale");
    expect(container.querySelector(".st-pale")).not.toBeNull();
  });

  it("affiche chaque plan avec son prix en encre et son lien fiche", () => {
    render(<ScenePlans {...props} />);

    for (const plan of props.plans) {
      // Nom exact : les références contiennent des "+" qui casseraient un RegExp.
      expect(screen.getByRole("link", { name: plan.titre })).toHaveAttribute(
        "href",
        `/plans/${plan.reference}`
      );
    }
    expect(screen.getByText("4 500 000")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explorer le catalogue/i })).toHaveAttribute(
      "href",
      "/plans"
    );
  });

  /*
   * Une carte du catalogue porte la photo du modèle livré : la nouvelle vague
   * d'images (`04-79` → `04-81`) montre enfin le bâtiment de face, façade et
   * jardin, là où les clichés d'intérieur laissaient le visiteur sans preuve
   * extérieure. Le tracé dessiné reste en aplat discret derrière la photo — il
   * donne la grille technique de l'acte sans voler la vue au modèle réel.
   */
  it("présente chaque modèle par sa façade et conserve le tracé en fond", () => {
    const { container } = render(<ScenePlans {...props} />);

    // Une image par carte, dans l'ordre des plans. `next/image` sert une URL
    // d'optimiseur : c'est le chemin source, encodé dans `url`, qui identifie
    // le visuel — le lire via l'attribut src demanderait de décoder l'optimiseur.
    const sources = [...container.querySelectorAll("[data-vue-modele]")].map(
      (image) => decodeURIComponent(new URL(image.getAttribute("src")!, "http://x").searchParams.get("url") ?? "")
    );
    expect(sources).toEqual([
      "/photos/immobilier/04-79_villa-patio-padouk-facade.png",
      "/photos/immobilier/04-80_duplex-jumele-facade.png",
      "/photos/immobilier/04-81_immeuble-odza-facade.png",
    ]);
    // Le tracé reste présent : il porte la lecture « plan », pas la preuve.
    expect(
      [...container.querySelectorAll("[data-illustration]")].map(
        (illustration) => illustration.getAttribute("data-illustration")
      )
    ).toEqual(["villa", "duplex", "immeuble"]);
  });

  it("décrit la photo du modèle pour les technologies d'assistance", () => {
    render(<ScenePlans {...props} />);

    expect(
      screen.getByRole("img", { name: "Villa R+1 patio padouk — façade sur patio padouk" }),
    ).toBeInTheDocument();
  });

  it("affiche le nombre de vues du modèle livré quand la fiche plan en possède", () => {
    const avecVues = {
      ...props,
      plans: props.plans.map((plan, index) => ({
        ...plan,
        vuesLivrees: index === 0 ? 2 : undefined,
      })),
    };
    render(<ScenePlans {...avecVues} />);

    expect(screen.getByText("2 vues du modèle livré")).toBeInTheDocument();
  });
});
