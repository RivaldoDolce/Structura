import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...reste
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) => (
    <a href={href} {...reste}>
      {children}
    </a>
  ),
}));

describe("Button", () => {
  it("rend un bouton natif de type button par défaut", () => {
    render(<Button>Valider</Button>);

    const bouton = screen.getByRole("button", { name: "Valider" });
    expect(bouton).toHaveAttribute("type", "button");
  });

  it("applique la variante et la taille demandées", () => {
    render(
      <Button variant="destructive" size="icon" aria-label="Supprimer">
        <span aria-hidden="true">x</span>
      </Button>
    );

    const bouton = screen.getByRole("button", { name: "Supprimer" });
    expect(bouton).toHaveClass("bg-danger", "h-11", "w-11");
  });

  it("transmet l'enfant en mode asChild sans rendre de bouton imbriqué", () => {
    const { container } = render(
      <Button asChild>
        <Link href="/plans">Voir les plans</Link>
      </Button>
    );

    expect(screen.getByRole("link", { name: "Voir les plans" })).toHaveAttribute("href", "/plans");
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("reste inactif quand disabled est posé", async () => {
    const clic = vi.fn();
    const utilisateur = userEvent.setup();
    render(
      <Button disabled onClick={clic}>
        Envoyer
      </Button>
    );

    await utilisateur.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(clic).not.toHaveBeenCalled();
  });
});

describe("Card", () => {
  it("assemble l'en-tête, le titre, la description et le contenu", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Villa Iroko</CardTitle>
          <CardDescription>Plan architecte R+1</CardDescription>
        </CardHeader>
        <CardContent>240 m² habitables</CardContent>
      </Card>
    );

    expect(screen.getByRole("heading", { name: "Villa Iroko", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Plan architecte R+1")).toBeInTheDocument();
    expect(screen.getByText("240 m² habitables")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("applique la teinte sémantique demandée", () => {
    render(<Badge variant="safety">Paiement en attente</Badge>);

    expect(screen.getByText("Paiement en attente")).toHaveClass("bg-safety");
  });
});

describe("Separator", () => {
  it("rend un filet horizontal décoratif", () => {
    const { container } = render(<Separator />);

    expect(container.firstElementChild).toHaveAttribute("data-orientation", "horizontal");
  });

  it("devient sémantique quand il n'est pas décoratif", () => {
    render(<Separator decorative={false} aria-label="Séparation" />);

    expect(screen.getByRole("separator", { name: "Séparation" })).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("occupe l'espace et reste invisible aux lecteurs d'écran", () => {
    const { container } = render(<Skeleton className="h-10 w-40" />);

    const bloc = container.firstElementChild as HTMLElement;
    expect(bloc).toHaveAttribute("aria-hidden", "true");
    expect(bloc).toHaveClass("h-10", "w-40");
    expect(bloc.firstElementChild).toHaveClass("animate-sweep");
  });
});

describe("Table", () => {
  it("rend un tableau sémantique complet", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>PL-2025-014</TableCell>
            <TableCell>Payé</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Référence" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "PL-2025-014" })).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("affiche l'onglet actif et bascule au clic", async () => {
    const utilisateur = userEvent.setup();
    render(
      <Tabs defaultValue="facade">
        <TabsList aria-label="Vues du plan">
          <TabsTrigger value="facade">Façade</TabsTrigger>
          <TabsTrigger value="masse">Masse</TabsTrigger>
        </TabsList>
        <TabsContent value="facade">Vue façade</TabsContent>
        <TabsContent value="masse">Vue masse</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Façade" })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("Vue façade")).toBeInTheDocument();

    await utilisateur.click(screen.getByRole("tab", { name: "Masse" }));

    expect(screen.getByRole("tab", { name: "Masse" })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("Vue masse")).toBeInTheDocument();
  });
});
