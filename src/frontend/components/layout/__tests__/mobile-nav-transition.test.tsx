import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { MobileNav } from "../mobile-nav";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
    ...reste
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    href: string;
    onClick?: (evenement: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      {...reste}
      onClick={(evenement) => {
        evenement.preventDefault();
        onClick?.(evenement);
      }}
    >
      {children}
    </a>
  ),
}));

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/ingenierie", label: "Ingénierie" },
  { href: "/plans", label: "Plans" },
];

/**
 * LOT 4 — Symétrie du menu mobile (V3 §12 « fermeture symétrique »).
 *
 * L'ouverture révèle par masque + cascade ; la fermeture rejoue le miroir
 * (même courbe, ordre inverse) au lieu de disparaître sèchement. Le contenu
 * reste monté pendant la sortie — un menu qui se vide avant de partir
 * donne l'impression d'un bug, pas d'une transition.
 */
describe("MobileNav — symétrie d'ouverture et de fermeture", () => {
  it("déclare son entrée par masque et sa sortie en miroir", () => {
    const { container } = render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    const dialogue = screen.getByRole("dialog", { name: /menu de navigation/i });
    expect(dialogue).toHaveAttribute("data-reveal", "masque-cascade");
    expect(container.querySelector("[data-sortie]")).not.toBeNull();
  });

  it("conserve les liens pendant la sortie animée", async () => {
    const { rerender } = render(<MobileNav isOpen onClose={() => undefined} navLinks={liens} />);

    rerender(<MobileNav isOpen={false} onClose={() => undefined} navLinks={liens} />);

    // AnimatePresence garde le dialogue monté le temps de la sortie : les
    // liens restent lisibles pendant le miroir, puis le menu part.
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("ferme par Escape même pendant l'animation d'entrée", async () => {
    const ferme = vi.fn();
    const utilisateur = userEvent.setup();
    render(<MobileNav isOpen onClose={ferme} navLinks={liens} />);

    await utilisateur.keyboard("{Escape}");
    expect(ferme).toHaveBeenCalledTimes(1);
  });
});
