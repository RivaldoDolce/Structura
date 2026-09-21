import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../sheet";
import { toast, Toaster } from "../toaster";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Dialog", () => {
  it("s'ouvre au déclencheur et se ferme via le bouton dédié", async () => {
    const utilisateur = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Demander un devis</DialogTrigger>
        <DialogContent>
          <DialogTitle>Devis express</DialogTitle>
          <DialogDescription>Réponse sous 48 h ouvrées.</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await utilisateur.click(screen.getByRole("button", { name: "Demander un devis" }));

    const boite = screen.getByRole("dialog", { name: "Devis express" });
    expect(boite).toBeInTheDocument();
    expect(screen.getByText("Réponse sous 48 h ouvrées.")).toBeInTheDocument();

    await utilisateur.click(screen.getByRole("button", { name: "Fermer" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("se ferme par la touche Echap", async () => {
    const utilisateur = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Ouvrir</DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await utilisateur.click(screen.getByRole("button", { name: "Ouvrir" }));
    await utilisateur.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Sheet", () => {
  it("s'ouvre côté droit et se referme avec Echap", async () => {
    const utilisateur = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Filtrer les plans</SheetTrigger>
        <SheetContent>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>Superficie, essence, budget.</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    await utilisateur.click(screen.getByRole("button", { name: "Filtrer les plans" }));

    expect(screen.getByRole("dialog", { name: "Filtres" })).toBeInTheDocument();
    expect(screen.getByText("Superficie, essence, budget.")).toBeInTheDocument();

    await utilisateur.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Toaster", () => {
  it("annonce un message de confirmation", async () => {
    render(<Toaster position="bottom-right" />);

    toast.success("Devis envoyé");

    expect(await screen.findByText("Devis envoyé")).toBeInTheDocument();
  });
});
