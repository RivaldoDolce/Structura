import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WatermarkPreview } from "../watermark-preview";

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

    expect(container.querySelector("[data-apercu-protege]")).toHaveStyle({
      WebkitTouchCallout: "none",
      userSelect: "none",
    });
  });

  it("annonce la protection aux lecteurs d'écran", () => {
    render(<WatermarkPreview {...props} />);

    expect(
      screen.getByRole("group", { name: /aperçu protégé du plan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/aperçu protégé/i)).toBeInTheDocument();
  });

  it("affiche chaque texte de filigrane personnalisé", () => {
    render(<WatermarkPreview {...props} watermarkText="CLIENT 123" />);

    expect(screen.getAllByText("CLIENT 123").length).toBeGreaterThan(1);
  });
});
