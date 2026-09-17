import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ButtonTech } from "../button-tech";

describe("ButtonTech", () => {
  it("affiche un bouton avec ses enfants par défaut", () => {
    render(<ButtonTech>Demander un devis</ButtonTech>);

    const bouton = screen.getByRole("button", { name: "Demander un devis" });
    expect(bouton).toBeInTheDocument();
    expect(bouton).toHaveAttribute("type", "button");
  });

  it("applique la variante conversion demandée", () => {
    render(<ButtonTech variant="conversion">Devis</ButtonTech>);

    expect(screen.getByRole("button", { name: "Devis" })).toHaveClass(
      "bg-[var(--color-safety)]",
    );
  });

  it("rend l'enfant tel quel en mode asChild sans fuir de props Motion vers le DOM", () => {
    const { container } = render(
      <ButtonTech asChild variant="primary">
        <a href="/devis">Devis</a>
      </ButtonTech>,
    );

    const lien = screen.getByRole("link", { name: "Devis" });
    expect(lien).toHaveAttribute("href", "/devis");
    expect(lien).toHaveClass("bg-[var(--color-steel)]");
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("signale le chargement et bloque le clic", async () => {
    const clic = vi.fn();
    const utilisateur = userEvent.setup();
    render(
      <ButtonTech isLoading onClick={clic}>
        Envoyer
      </ButtonTech>,
    );

    const bouton = screen.getByRole("button", { name: /chargement/i });
    expect(bouton).toBeDisabled();
    expect(bouton).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Chargement")).toHaveClass("sr-only");

    await utilisateur.click(bouton);
    expect(clic).not.toHaveBeenCalled();
  });

  it("affiche l'icône fournie", () => {
    render(<ButtonTech icon={<span data-testid="icone" />}>Suivant</ButtonTech>);

    expect(screen.getByTestId("icone")).toBeInTheDocument();
  });
});
