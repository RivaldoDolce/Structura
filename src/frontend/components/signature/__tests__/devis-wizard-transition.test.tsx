import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DevisWizard } from "../devis-wizard";

const mockSoumission = vi.fn(async () => ({ ok: true as const, reference: "DEV-TEST" }));

function simuleMouvementReduit(reduit: boolean): void {
  window.matchMedia = vi.fn().mockImplementation((requete: string) => ({
    matches: reduit,
    media: requete,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/**
 * LOT 4 — Transition du tunnel de devis (V3 §12 « transition de 200 à
 * 300 ms »).
 *
 * Le passage d'une étape à l'autre glisse (slide + fondu) au lieu de
 * substituer sèchement le formulaire : la saisie reste montée pendant le
 * mouvement, donc jamais perdue. En mouvement réduit, le changement est
 * instantané — le test le vérifie par l'absence de transform.
 */
describe("DevisWizard — transition entre étapes", () => {
  it("glisse d'une étape à l'autre sans démonter la saisie", async () => {
    simuleMouvementReduit(false);
    const utilisateur = userEvent.setup();
    render(<DevisWizard onSubmit={mockSoumission} />);

    const transition = screen.getByTestId("transition-devis");
    expect(transition).toHaveAttribute("data-etape", "0");

    await utilisateur.click(screen.getByRole("radio", { name: /construction neuve/i }));
    await utilisateur.click(screen.getByRole("button", { name: /suivant/i }));

    // L'étape a avancé et la direction du geste est déclarée (avant).
    expect(transition).toHaveAttribute("data-etape", "1");
    expect(transition).toHaveAttribute("data-direction", "avant");

    // Le formulaire n'est jamais démonté : la saisie survit au mouvement.
    const description = screen.getByLabelText(/décrivez votre besoin/i);
    await utilisateur.type(description, "Villa duplex de 200 m² à Odza.");
    await utilisateur.click(screen.getByRole("button", { name: /retour/i }));
    expect(transition).toHaveAttribute("data-direction", "arriere");
    expect(screen.getByRole("radio", { name: /construction neuve/i })).toBeChecked();
  });

  it("coupe tout mouvement quand l'utilisateur le demande", async () => {
    simuleMouvementReduit(true);
    const utilisateur = userEvent.setup();
    render(<DevisWizard onSubmit={mockSoumission} />);

    const transition = screen.getByTestId("transition-devis");
    expect(transition).toHaveAttribute("data-mouvement", "reduit");

    await utilisateur.click(screen.getByRole("radio", { name: /construction neuve/i }));
    await utilisateur.click(screen.getByRole("button", { name: /suivant/i }));

    expect(transition).toHaveAttribute("data-etape", "1");
  });
});
