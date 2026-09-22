import { render, screen, within } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { JalonTimeline, type Jalon } from "../jalon-timeline";

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

// jsdom ne connaît pas la largeur d'écran : le simulacre répond vrai aux
// seuils de colonne éditoriale et faux au mouvement réduit, sauf les tests
// qui le remplacent pour ce dernier cas.
const fabriqueMatchMedia = (): typeof window.matchMedia =>
  ((requete: string) => ({
    matches: /min-width/.test(requete),
    media: requete,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

beforeEach(() => {
  window.matchMedia = fabriqueMatchMedia();
});

/*
 * Signature produit (audit §8.1) : la timeline de chantier vivante. Les
 * jalons couvrent l'éventail réel d'un chantier et portent les données du
 * suivi — responsable, durée, écart prévu-réel, documents et dépense.
 */
const jalonFouille: Jalon = {
  id: "fouille",
  label: "Fouille et rigole",
  date: "2025-02-12",
  dateReelle: "2025-02-15",
  statut: "termine",
  notes: "Cotes vérifiées avant coulage",
  images: ["/photos/journal/04-21_journal-fouille-rigole.png"],
  responsable: "Équipe de 4",
  duree: "2 jours",
  ecartJours: 3,
  depenseFcfa: 850000,
  documents: [{ id: "pv-fouille", libelle: "PV de réception", href: "/devis", valide: true }],
};

const jalonFerraillage: Jalon = {
  id: "ferraillage",
  label: "Ferraillage des semelles",
  date: "2025-02-28",
  statut: "en-retard",
  notes: "Béton attendu, deux jours de retard",
  images: ["/photos/journal/04-22_journal-ferraillage-semelles.png"],
  responsable: "Chef de chantier",
  duree: "4 jours",
  ecartJours: 2,
  depenseFcfa: 1200000,
  documents: [{ id: "plan-acier", libelle: "Nomenclature acier", href: "/devis", valide: false }],
  actions: [{ id: "question", libelle: "Poser une question", href: "/contact" }],
};

const jalonPlancher: Jalon = {
  id: "plancher",
  label: "Coulage du plancher",
  date: "2025-03-21",
  statut: "en-cours",
  images: ["/photos/journal/04-23_journal-coulage-plancher.png"],
};

const jalonCharpente: Jalon = {
  id: "charpente",
  label: "Charpente et couverture",
  date: "2025-05-08",
  statut: "a-venir",
};

const jalons: Jalon[] = [jalonFouille, jalonFerraillage, jalonPlancher, jalonCharpente];

describe("JalonTimeline", () => {
  it("dresse le rail vertical, un nœud par jalon", () => {
    const { container } = render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByRole("list", { name: "Progression du chantier" })).toBeInTheDocument();
    // Les cartes portent l'attribut de statut : les puces de documents,
    // imbriquées plus bas, ne sont jamais comptées comme des jalons.
    expect(container.querySelectorAll("[data-statut]")).toHaveLength(4);
    // Le rail se trace au scroll : c'est un trait SVG, pas une bordure CSS.
    expect(container.querySelector("[data-rail-trait]")).toBeInTheDocument();
  });

  it("ordonne les jalons comme le chantier, du premier au dernier", () => {
    const { container } = render(<JalonTimeline jalons={jalons} />);

    const items = [...container.querySelectorAll("[data-statut]")];
    expect(items[0]).toHaveTextContent("Fouille et rigole");
    expect(items[1]).toHaveTextContent("Ferraillage des semelles");
    expect(items[3]).toHaveTextContent("Charpente et couverture");
  });

  it("écrit le statut en toutes lettres, jamais par la seule couleur", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByText("Terminé")).toBeInTheDocument();
    expect(screen.getByText("En retard")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("À venir")).toBeInTheDocument();
  });

  it("sépare la date prévue de la date réelle de réalisation", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByText("12 févr. 2025")).toBeInTheDocument();
    // « Réalisé le » et la date sont deux nœuds : le paragraphe porte le sens.
    const realise = screen.getByText("15 févr. 2025");
    expect(realise.tagName).toBe("TIME");
    expect(realise.closest("p")).toHaveTextContent(/réalisé le/i);
  });

  it("met l'étape active en avant par l'écart de surface, pas par une bordure", () => {
    render(<JalonTimeline jalons={jalons} />);

    // La surface habille la carte (article), pas le nœud de rail (li) :
    // l'élévation se lit par l'écart entre surfaces voisines.
    const actif = screen.getByText("Ferraillage des semelles").closest("article");
    const termine = screen.getByText("Fouille et rigole").closest("article");

    expect(actif).toHaveClass("st-raised");
    expect(termine).toHaveClass("st-card");
    expect(termine).not.toHaveClass("st-raised");
  });

  it("chiffre l'écart prévu-réel et la dépense engagée", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByText(/2 jours de retard/i)).toBeInTheDocument();
    expect(screen.getByText(/3 jours de retard/i)).toBeInTheDocument();
    expect(screen.getByText("1 200 000")).toBeInTheDocument();
    expect(screen.getAllByText("FCFA").length).toBeGreaterThanOrEqual(2);
  });

  it("liste les documents du jalon avec leur état de validation", () => {
    render(<JalonTimeline jalons={jalons} />);

    const fouille = screen.getByText("Fouille et rigole").closest("li") as HTMLElement;
    expect(within(fouille).getByText("PV de réception")).toBeInTheDocument();
    expect(within(fouille).getByText(/validé/i)).toBeInTheDocument();

    const ferraillage = screen.getByText("Ferraillage des semelles").closest("li") as HTMLElement;
    expect(within(ferraillage).getByText(/en attente/i)).toBeInTheDocument();
  });

  it("pose la photo du jalon et nomme son responsable", () => {
    render(<JalonTimeline jalons={jalons} />);

    // L'alternative décrit la scène, pas le titre : la photo reste trouvable
    // par le nom de l'étape qu'elle documente.
    expect(screen.getByAltText(/fouille et rigole/i)).toBeInTheDocument();
    expect(screen.getByText(/Équipe — Chef de chantier/)).toBeInTheDocument();
  });

  it("propose l'action de contact portée par le jalon", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByRole("link", { name: /poser une question/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("n'affiche que ce qui est renseigné", () => {
    render(<JalonTimeline jalons={[jalonCharpente]} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText("FCFA")).not.toBeInTheDocument();
  });
});
