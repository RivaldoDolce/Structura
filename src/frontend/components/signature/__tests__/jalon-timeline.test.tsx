import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JalonTimeline, type Jalon } from "../jalon-timeline";

// Données figées hors tableau pour rester compatibles avec noUncheckedIndexedAccess.
const jalonEtude: Jalon = {
  id: "etude",
  label: "Étude",
  date: "2025-01-15",
  status: "completed",
  notes: "Plans validés",
};

const jalonFondations: Jalon = {
  id: "fondations",
  label: "Fondations",
  date: "2025-02-01",
  status: "current",
  notes: "En cours de coulage",
};

const jalonElevation: Jalon = {
  id: "elevation",
  label: "Élévation",
  date: "2025-03-01",
  status: "upcoming",
};

const jalons: Jalon[] = [jalonEtude, jalonFondations, jalonElevation];

describe("JalonTimeline", () => {
  it("affiche les jalons dans l'ordre du chantier", () => {
    render(<JalonTimeline jalons={jalons} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Étude");
    expect(items[1]).toHaveTextContent("Fondations");
    expect(items[2]).toHaveTextContent("Élévation");
  });

  it("formate les dates en français avec la référence calendaire", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByText("15 janv. 2025")).toBeInTheDocument();
    expect(screen.getByText("1 févr. 2025")).toBeInTheDocument();
    expect(screen.getByText("15 janv. 2025").tagName).toBe("TIME");
  });

  it("affiche les notes quand elles sont renseignées", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByText("Plans validés")).toBeInTheDocument();
    expect(screen.getByText("En cours de coulage")).toBeInTheDocument();
  });

  it("signale le jalon terminé par une coche et un statut lisible", () => {
    render(<JalonTimeline jalons={jalons} />);

    const item = screen.getByText("Étude").closest("li");
    expect(item).toHaveAttribute("data-status", "completed");
    // La coche Lucide rend un svg à l'intérieur du jalon terminé.
    expect(within(item as HTMLElement).getByText("terminé")).toBeInTheDocument();
  });

  it("signale le jalon en cours par un marqueur pulsé", () => {
    const { container } = render(<JalonTimeline jalons={jalons} />);

    const item = screen.getByText("Fondations").closest("li");
    expect(item).toHaveAttribute("data-status", "current");
    expect(item?.querySelector(".animate-pulse")).toBeInTheDocument();
    expect(container).toHaveTextContent("en cours");
  });

  it("signale le jalon à venir par un contour pointillé", () => {
    render(<JalonTimeline jalons={jalons} />);

    const item = screen.getByText("Élévation").closest("li");
    expect(item).toHaveAttribute("data-status", "upcoming");
    expect(item?.querySelector(".border-dashed")).toBeInTheDocument();
    expect(screen.getByText("à venir")).toBeInTheDocument();
  });

  it("expose un intitulé accessible pour la progression", () => {
    render(<JalonTimeline jalons={jalons} />);

    expect(screen.getByRole("list", { name: "Progression du chantier" })).toBeInTheDocument();
  });
});
