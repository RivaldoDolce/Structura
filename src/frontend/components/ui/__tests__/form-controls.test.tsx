import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Textarea } from "../textarea";

describe("Input", () => {
  it("rend un champ texte relié à son libellé", () => {
    render(
      <>
        <Label htmlFor="telephone">Téléphone</Label>
        <Input id="telephone" placeholder="+237 6 90 00 00 00" />
      </>
    );

    const champ = screen.getByLabelText("Téléphone");
    expect(champ).toHaveAttribute("type", "text");
    expect(champ).toHaveAttribute("placeholder", "+237 6 90 00 00 00");
  });

  it("signale un champ invalide aux technologies d'assistance", () => {
    render(<Input aria-invalid aria-label="Email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("Textarea", () => {
  it("accepte un texte multiligne", async () => {
    const utilisateur = userEvent.setup();
    render(<Textarea aria-label="Description" />);

    await utilisateur.type(screen.getByLabelText("Description"), "Dalle R+1");

    expect(screen.getByLabelText("Description")).toHaveValue("Dalle R+1");
  });
});

describe("Checkbox", () => {
  it("bascule son état au clic", async () => {
    const utilisateur = userEvent.setup();
    render(
      <>
        <Checkbox id="cgv" />
        <Label htmlFor="cgv">J&apos;accepte les conditions</Label>
      </>
    );

    const caseACocher = screen.getByRole("checkbox");
    expect(caseACocher).toHaveAttribute("data-state", "unchecked");

    await utilisateur.click(caseACocher);

    expect(caseACocher).toHaveAttribute("data-state", "checked");
  });
});

describe("RadioGroup", () => {
  it("ne retient qu'un choix à la fois", async () => {
    const utilisateur = userEvent.setup();
    render(
      <RadioGroup aria-label="Type de projet" defaultValue="villa">
        <RadioGroupItem value="villa" aria-label="Villa" />
        <RadioGroupItem value="immeuble" aria-label="Immeuble" />
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Villa" })).toHaveAttribute("data-state", "checked");

    await utilisateur.click(screen.getByRole("radio", { name: "Immeuble" }));

    expect(screen.getByRole("radio", { name: "Immeuble" })).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(screen.getByRole("radio", { name: "Villa" })).toHaveAttribute("data-state", "unchecked");
  });
});

describe("Select", () => {
  // L'ouverture d'un Select Radix repose sur la capture de pointeur, absente de
  // jsdom : le parcours de choix est couvert par les tests de bout en bout.
  it("affiche l'invite et l'état de sélection", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Essence">
          <SelectValue placeholder="Choisir une essence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="padouk">Padouk</SelectItem>
        </SelectContent>
      </Select>
    );

    const declencheur = screen.getByLabelText("Essence");
    expect(declencheur).toHaveAttribute("role", "combobox");
    expect(screen.getByText("Choisir une essence")).toBeInTheDocument();
  });
});
