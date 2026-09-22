import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimelineHorizontale } from "../timeline-horizontale";
import type { JalonVitrine } from "../timeline-horizontale";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const jalons: JalonVitrine[] = [
  {
    id: "fouille",
    label: "Fouilles et fondations",
    date: "2025-01-12",
    statut: "termine",
    imageUrl: "/test/fouille.jpg",
    alt: "Fouilles en rigole",
  },
  {
    id: "ferraillage",
    label: "Ferraillage des semelles",
    date: "2025-02-03",
    statut: "termine",
    imageUrl: "/test/ferraillage.jpg",
    alt: "Ferraillage posé",
  },
  {
    id: "plancher",
    label: "Coulage du plancher",
    date: "2025-03-21",
    statut: "en-cours",
    imageUrl: "/test/plancher.jpg",
    alt: "Coulage du plancher",
  },
  {
    id: "charpente",
    label: "Charpente et couverture",
    date: "2025-05-08",
    statut: "a-venir",
    imageUrl: "/test/charpente.jpg",
    alt: "Pose de charpente",
  },
];

describe("TimelineHorizontale", () => {
  it("affiche le titre, l'accroche et la promesse de suivi", () => {
    render(
      <TimelineHorizontale
        jalons={jalons}
        kicker={{ number: "05", label: "JOURNAL" }}
        titre="Le chantier en direct"
        accroche="Chaque étape, documentée et datée."
        promesse="Votre suivi, jour après jour."
      />,
    );

    expect(screen.getByRole("region", { name: /journal de chantier/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/chantier en direct/i);
    expect(screen.getByText("Votre suivi, jour après jour.")).toBeInTheDocument();
  });

  it("défile en scroll-snap horizontal, une carte par jalon", () => {
    const { container } = render(
      <TimelineHorizontale
        jalons={jalons}
        kicker={{ number: "05", label: "JOURNAL" }}
        titre="Le chantier en direct"
        accroche="Chaque étape, documentée et datée."
        promesse="Votre suivi, jour après jour."
      />,
    );

    const piste = container.querySelector("[data-piste]");
    expect(piste).toHaveClass("snap-x", "overflow-x-auto");
    expect(container.querySelectorAll("[data-jalon]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-jalon]")[0]).toHaveClass("snap-start");
  });

  it("expose le statut en toutes lettres, jamais par la seule couleur", () => {
    render(
      <TimelineHorizontale
        jalons={jalons}
        kicker={{ number: "05", label: "JOURNAL" }}
        titre="Le chantier en direct"
        accroche="Chaque étape, documentée et datée."
        promesse="Votre suivi, jour après jour."
      />,
    );

    // Deux jalons terminés, un en cours, un à venir : les libellés sont
    // écrits, la couleur ne porte jamais l'information seule.
    expect(screen.getAllByText("Terminé")).toHaveLength(2);
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("À venir")).toBeInTheDocument();
    expect(screen.getByText("21 mars 2025")).toBeInTheDocument();
  });
});
