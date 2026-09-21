import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "../site-header";

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
    // jsdom suit les href et pollue la sortie : on neutralise la navigation
    // réelle, le composant reçoit toujours son onClick (fermeture du menu).
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

// Parcours navigation complet : ouverture hamburger, choix d'un lien,
// fermeture et restauration du scroll. Couvre header + overlay ensemble.
describe("Navigation header et menu mobile", () => {
  it("navigue vers Ingénierie depuis le menu mobile puis restaure la page", async () => {
    const utilisateur = userEvent.setup();
    render(<SiteHeader />);

    await utilisateur.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    expect(document.body.style.overflow).toBe("hidden");

    // Le lien desktop homonyme est masqué en CSS mais présent au DOM :
    // on vise celui de l'overlay.
    const dialogue = screen.getByRole("dialog", { name: /menu de navigation/i });
    await utilisateur.click(within(dialogue).getByRole("link", { name: "Ingénierie" }));

    // La sortie AnimatePresence est animée : le dialogue part après un cycle.
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: /ouvrir le menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("garde la navigation desktop utilisable sans ouvrir l'overlay", async () => {
    const utilisateur = userEvent.setup();
    render(<SiteHeader />);

    const lienPlans = screen.getByRole("navigation", { name: /navigation principale/i });
    expect(lienPlans).toBeInTheDocument();

    await utilisateur.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    await utilisateur.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Plans" })).toHaveAttribute("href", "/plans");
  });
});
