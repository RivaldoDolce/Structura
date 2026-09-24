import { fireEvent, render, screen } from "@testing-library/react";
import type { DragEventHandler } from "react";
import { describe, expect, it, vi } from "vitest";
import { WatermarkPreview } from "../watermark-preview";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    draggable,
    onDragStart,
  }: {
    alt: string;
    src: string;
    draggable?: boolean;
    onDragStart?: DragEventHandler<HTMLImageElement>;
  }) => (
    // Simulacre volontaire : on vérifie le cadrage, pas l'optimiseur.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} draggable={draggable} onDragStart={onDragStart} />
  ),
}));

const props = { imageUrl: "/test/plan.jpg", watermarkText: "STRUCTURA APERCU" };

describe("WatermarkPreview", () => {
  it("affiche l'image avec un texte de protection et sans glisser-déposer", () => {
    render(<WatermarkPreview {...props} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test/plan.jpg");
    expect(image).toHaveAttribute("alt", "Aperçu du plan avec filigrane de protection");
    expect(image).toHaveAttribute("draggable", "false");
  });

  it("répète le filigrane en diagonale", () => {
    const { container } = render(<WatermarkPreview {...props} />);

    const filigrane = container.querySelector("[data-filigrane]");
    expect(filigrane).toBeInTheDocument();
    expect(filigrane).toHaveTextContent("STRUCTURA APERCU");
  });

  it("bloque le menu contextuel", () => {
    render(<WatermarkPreview {...props} />);

    const evenement = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    const espion = vi.spyOn(evenement, "preventDefault");
    fireEvent(screen.getByRole("img"), evenement);
    expect(espion).toHaveBeenCalled();
  });

  it("neutralise l'appui long et la sélection sur mobile", () => {
    const { container } = render(<WatermarkPreview {...props} />);

    // jsdom n'interprète pas le CSS : on vérifie les classes utilitaires.
    const apercu = container.querySelector("[data-apercu-protege]");
    expect(apercu).toHaveClass("select-none");
    expect(apercu).toHaveClass("[-webkit-touch-callout:none]");
  });

  it("annonce la protection aux lecteurs d'écran", () => {
    render(<WatermarkPreview {...props} />);

    expect(screen.getByRole("group", { name: /aperçu protégé du plan/i })).toBeInTheDocument();
    expect(screen.getByText(/aperçu protégé/i)).toBeInTheDocument();
  });

  it("affiche chaque texte de filigrane personnalisé", () => {
    render(<WatermarkPreview {...props} watermarkText="CLIENT 123" />);

    expect(screen.getAllByText("CLIENT 123").length).toBeGreaterThan(1);
  });

  it("passe le cadre et l'avertissement en encre sur une bande claire", () => {
    render(<WatermarkPreview {...props} tone="clair" />);

    // La teinte est posée sur le bloc d'avertissement : le cadenas en hérite
    // par `currentColor`, la phrase par la couleur de texte.
    expect(screen.getByText(/aperçu protégé/i).parentElement).toHaveClass("text-encre-soft");
  });
});
