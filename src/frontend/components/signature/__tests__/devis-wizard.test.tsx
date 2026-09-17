import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DevisWizard } from "../devis-wizard";

const mockSoumission = vi.fn();

beforeEach(() => {
  window.localStorage.clear();
  mockSoumission.mockReset();
});

function sauvegardeEtape(donnees: Record<string, unknown>) {
  window.localStorage.setItem("devis-wizard", JSON.stringify(donnees));
}

describe("DevisWizard", () => {
  it("annonce la première étape et une progression au tiers", () => {
    render(<DevisWizard onSubmit={mockSoumission} />);

    const progression = screen.getByRole("progressbar", { name: "Progression du devis" });
    expect(progression).toHaveAttribute("aria-valuenow", "33");
    expect(screen.getByRole("status")).toHaveTextContent(/étape 1 sur 3/i);
  });

  it("sélectionne un type de projet et le sauvegarde avant l'étape suivante", async () => {
    const utilisateur = userEvent.setup();
    render(<DevisWizard onSubmit={mockSoumission} />);

    await utilisateur.click(
      screen.getByRole("radio", { name: /construction neuve/i }),
    );
    await utilisateur.click(screen.getByRole("button", { name: /suivant/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/étape 2 sur 3/i);
    expect(window.localStorage.getItem("devis-wizard")).toContain(
      '"typeProjet":"construction-neuve"',
    );
  });

  it("signale une description trop courte au sortir du champ", async () => {
    const utilisateur = userEvent.setup();
    sauvegardeEtape({ typeProjet: "construction-neuve", etape: 1 });
    render(<DevisWizard onSubmit={mockSoumission} />);

    const description = screen.getByLabelText(/décrivez votre besoin/i);
    await utilisateur.click(description);
    await utilisateur.tab();

    expect(await screen.findByText(/10 caractères minimum/i)).toBeInTheDocument();

    await utilisateur.type(description, "Villa duplex de 200 m² à Odza.");
    await utilisateur.tab();
    expect(screen.queryByText(/10 caractères minimum/i)).not.toBeInTheDocument();
  });

  it("reprend une saisie interrompue avec téléphone requis et WhatsApp coché", async () => {
    sauvegardeEtape({
      typeProjet: "construction-neuve",
      description: "Villa duplex de 200 m² à Odza.",
      etape: 2,
    });
    render(<DevisWizard onSubmit={mockSoumission} />);

    expect(await screen.findByRole("status")).toHaveTextContent(/étape 3 sur 3/i);

    const telephone = screen.getByLabelText(/téléphone/i);
    expect(telephone).toBeRequired();
    expect(telephone).toHaveAttribute("inputMode", "tel");
    expect(screen.getByLabelText(/email/i)).not.toBeRequired();
    expect(screen.getByRole("checkbox", { name: /whatsapp/i })).toBeChecked();
  });

  it("refuse un téléphone invalide puis accepte un numéro camerounais", async () => {
    const utilisateur = userEvent.setup();
    sauvegardeEtape({
      typeProjet: "construction-neuve",
      description: "Villa duplex de 200 m² à Odza.",
      etape: 2,
    });
    render(<DevisWizard onSubmit={mockSoumission} />);

    const telephone = await screen.findByLabelText(/téléphone/i);
    await utilisateur.type(telephone, "123");
    await utilisateur.tab();
    expect(await screen.findByText(/9 chiffres/i)).toBeInTheDocument();

    await utilisateur.clear(telephone);
    await utilisateur.type(telephone, "690123456");
    await utilisateur.tab();
    expect(screen.queryByText(/9 chiffres/i)).not.toBeInTheDocument();
  });

  it("transmet la demande avec une référence puis affiche la promesse", async () => {
    const utilisateur = userEvent.setup();
    mockSoumission.mockResolvedValue({ ok: true, reference: "DV-2026-042" });
    sauvegardeEtape({
      typeProjet: "construction-neuve",
      description: "Villa duplex de 200 m² à Odza.",
      telephone: "690123456",
      whatsapp: true,
      etape: 2,
    });
    render(<DevisWizard onSubmit={mockSoumission} />);

    await utilisateur.click(await screen.findByRole("button", { name: /envoyer/i }));

    expect(mockSoumission).toHaveBeenCalledWith(
      expect.objectContaining({ reference: expect.stringMatching(/^DV-\d{4}-\d{3}$/) }),
    );
    expect(await screen.findByText("DV-2026-042")).toBeInTheDocument();
    expect(await screen.findByText(/sous 24 h ouvrées/i)).toBeInTheDocument();
  });

  it("conserve la sélection en revenant en arrière", async () => {
    const utilisateur = userEvent.setup();
    sauvegardeEtape({ typeProjet: "renovation", etape: 1 });
    render(<DevisWizard onSubmit={mockSoumission} />);

    await utilisateur.click(await screen.findByRole("button", { name: /retour/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/étape 1 sur 3/i);
    expect(screen.getByRole("radio", { name: /rénovation/i })).toHaveAttribute(
      "data-selected",
      "true",
    );
  });
});
