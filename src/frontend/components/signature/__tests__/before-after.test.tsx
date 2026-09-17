import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BeforeAfter } from "../before-after";

const props = { beforeImage: "/test/avant.jpg", afterImage: "/test/apres.jpg" };

describe("BeforeAfter", () => {
  it("affiche les deux images et les libellés par défaut", () => {
    render(<BeforeAfter {...props} />);

    expect(screen.getByAltText("AVANT")).toHaveAttribute("src", "/test/avant.jpg");
    expect(screen.getByAltText("APRÈS")).toHaveAttribute("src", "/test/apres.jpg");
    expect(screen.getByText("AVANT")).toBeInTheDocument();
    expect(screen.getByText("APRÈS")).toBeInTheDocument();
  });

  it("expose un curseur accessible réglé à 50 %", () => {
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider", { name: "Comparaison avant/après" });
    expect(curseur).toHaveAttribute("aria-valuenow", "50");
    expect(curseur).toHaveAttribute("aria-valuemin", "0");
    expect(curseur).toHaveAttribute("aria-valuemax", "100");
  });

  it("ajuste la comparaison au clavier", async () => {
    const utilisateur = userEvent.setup();
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider");
    curseur.focus();

    await utilisateur.keyboard("{ArrowRight}");
    expect(curseur).toHaveAttribute("aria-valuenow", "55");

    await utilisateur.keyboard("{Home}");
    expect(curseur).toHaveAttribute("aria-valuenow", "0");

    await utilisateur.keyboard("{End}");
    expect(curseur).toHaveAttribute("aria-valuenow", "100");
  });

  it("décrit l'aide clavier aux technologies d'assistance", () => {
    render(<BeforeAfter {...props} />);

    const aideId = screen.getByRole("slider").getAttribute("aria-describedby");
    if (!aideId) throw new Error("Aide clavier manquante sur le curseur.");
    expect(document.getElementById(aideId)).toHaveTextContent(/flèches/i);
  });

  it("positionne le voile à 50 % au départ", () => {
    const { container } = render(<BeforeAfter {...props} />);

    expect(container.querySelector("[data-voile]")).toHaveStyle({ clipPath: "inset(0 50% 0 0)" });
  });

  it("accepte des libellés personnalisés", () => {
    render(<BeforeAfter {...props} beforeLabel="Chantier" afterLabel="Livré" />);

    expect(screen.getByText("Chantier")).toBeInTheDocument();
    expect(screen.getByText("Livré")).toBeInTheDocument();
  });
});
