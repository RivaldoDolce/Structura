import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MobileNav } from "../mobile-nav";

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

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/ingenierie", label: "Ingénierie" },
  { href: "/plans", label: "Plans" },
];

describe("MobileNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reste absent du DOM quand fermé", () => {
    render(<MobileNav isOpen={false} onClose={() => undefined} navLinks={liens} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("s'ouvre en dialogue modal nommé", () => {
    render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    const dialogue = screen.getByRole("dialog", { name: /menu de navigation/i });
    expect(dialogue).toBeInTheDocument();
    expect(dialogue).toHaveAttribute("aria-modal", "true");
  });

  it("affiche chaque lien et le CTA devis", () => {
    render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Ingénierie" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Plans" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute(
      "href",
      "/devis"
    );
  });

  it("donne le focus au bouton fermer à l'ouverture", async () => {
    render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /fermer le menu/i })).toHaveFocus()
    );
  });

  it("ferme via le bouton, un lien, l'overlay et Escape", async () => {
    const ferme = vi.fn();
    const utilisateur = userEvent.setup();
    const { rerender } = render(<MobileNav isOpen onClose={ferme} navLinks={liens} />);

    await utilisateur.click(screen.getByRole("button", { name: /fermer le menu/i }));
    expect(ferme).toHaveBeenCalledTimes(1);

    await utilisateur.click(screen.getByRole("link", { name: "Accueil" }));
    expect(ferme).toHaveBeenCalledTimes(2);

    await utilisateur.keyboard("{Escape}");
    expect(ferme).toHaveBeenCalledTimes(3);

    rerender(<MobileNav isOpen={false} onClose={ferme} navLinks={liens} />);
    // La sortie AnimatePresence est animée : le dialogue part après un cycle.
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("ignore Escape quand fermé", async () => {
    const ferme = vi.fn();
    const utilisateur = userEvent.setup();
    render(<MobileNav isOpen={false} onClose={ferme} navLinks={liens} />);

    await utilisateur.keyboard("{Escape}");

    expect(ferme).not.toHaveBeenCalled();
  });

  it("recycle le focus en boucle avec Tab et Shift+Tab", async () => {
    const utilisateur = userEvent.setup();
    render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    const fermer = screen.getByRole("button", { name: /fermer le menu/i });
    await waitFor(() => expect(fermer).toHaveFocus());

    // Dernier élément puis Tab : retour au premier (le logo).
    const logo = screen.getByRole("link", { name: "STRUCTURA" });
    const cta = screen.getByRole("link", { name: /demander un devis/i });
    cta.focus();
    await utilisateur.keyboard("{Tab}");
    expect(logo).toHaveFocus();

    // Premier élément puis Shift+Tab : saut au dernier.
    await utilisateur.keyboard("{Shift>}{Tab}{/Shift}");
    expect(cta).toHaveFocus();
  });
});
