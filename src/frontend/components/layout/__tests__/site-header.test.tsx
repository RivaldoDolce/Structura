import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "../site-header";

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

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    document.body.style.overflow = "";
  });

  it("expose le logo vers l'accueil et la navigation desktop", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /structura/i })).toHaveAttribute("href", "/");
    const nav = screen.getByRole("navigation", { name: /navigation principale/i });
    expect(nav).toHaveClass("hidden", "md:flex");
    expect(screen.getByRole("link", { name: /ingénierie/i })).toBeInTheDocument();
  });

  it("réserve le CTA devis au desktop et le hamburger au mobile", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /demander un devis/i }).parentElement).toHaveClass(
      "hidden",
      "md:block"
    );
    expect(screen.getByRole("button", { name: /ouvrir le menu/i })).toHaveClass("md:hidden");
  });

  /*
   * Exigence de barre : le verrou de marque (sceau + titre) à l'extrême gauche,
   * l'appel à l'action à l'extrême droite. `justify-between` seul garantit le bord
   * gauche du conteneur, pas celui de la page — la grille `auto 1fr auto`
   * impose donc des zones de largeur intrinsèque : le verrou ne peut pas
   *parties, le CTA ne peut pas flotter au centre. Ce test verrouille la
   * géométrie, pas seulement l'existence des liens.
   */
  it("épingle le verrou de marque à gauche et le CTA devis à droite", () => {
    const { container } = render(<SiteHeader />);

    const grille = container.querySelector("[data-barre]");
    expect(grille).not.toBeNull();
    // Trois zones de largeur intrinsèque : la colonne centrale absorbe l'écart.
    expect(grille).toHaveClass("grid-cols-[auto_1fr_auto]");

    const enfants = [...grille!.children];
    expect(enfants).toHaveLength(4);
    // Zone 1 : le verrou de marque.
    expect(enfants[0]).toContainElement(screen.getByRole("link", { name: /structura/i }));
    // Zone 3 : le CTA devis, collé au bord droit.
    expect(enfants[2]).toContainElement(screen.getByRole("link", { name: /demander un devis/i }));
    expect(enfants[2]).toHaveClass("justify-end");
  });

  // Le titre de marque n'est pas décoratif : c'est le seul signal d'identité
  // lorsque le sceau est discret. Il doit rester lisible au premier regard.
  it("affiche le titre de marque à côté du sceau", () => {
    render(<SiteHeader />);

    const verrou = screen.getByRole("link", { name: /structura/i });
    expect(verrou).toHaveTextContent("STRUCTURA");
  });

  // Le sceau est décoratif : le lien porte déjà son libellé complet. Un alt
  // textuel ferait doubler le nom accessible de la marque.
  it("porte le monogramme comme sceau institutionnel", () => {
    render(<SiteHeader />);

    const logo = screen.getByRole("link", { name: /structura/i });
    const sceau = logo.querySelector("img");
    expect(sceau).not.toBeNull();
    expect(sceau).toHaveAttribute("alt", "");
  });

  // Un seul trait de soulignement, défini par la recette `.st-lien` : la
  // définition locale précédente ne réagissait qu'au survol du trait lui-même
  // (1 px de haut, aria-hidden) et ne s'affichait donc jamais.
  it("unifie le soulignement des liens de navigation", () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: /navigation principale/i });
    expect(nav.querySelectorAll("a.st-lien").length).toBeGreaterThan(0);
    expect(nav.querySelector("span[aria-hidden='true']")).toBeNull();
  });

  it("reste transparent en haut puis floute après 24px de scroll", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("border-transparent");

    Object.defineProperty(window, "scrollY", { value: 30, writable: true, configurable: true });
    fireEvent.scroll(window);

    expect(header).toHaveClass("backdrop-blur-md", "border-line");
  });

  it("se compacte au scroll sans changer de structure", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-compact", "false");
    expect(header).toHaveClass("h-16");

    Object.defineProperty(window, "scrollY", { value: 120, writable: true, configurable: true });
    fireEvent.scroll(window);

    expect(header).toHaveAttribute("data-compact", "true");
    expect(header).toHaveClass("h-14", "md:h-16");
  });

  it("ouvre le menu mobile, bloque le scroll du body et referme via Escape", async () => {
    const utilisateur = userEvent.setup();
    render(<SiteHeader />);

    const hamburger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");

    await utilisateur.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: /menu de navigation/i })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await utilisateur.keyboard("{Escape}");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("porte un libellé d'en-tête pour les technologies d'assistance", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toHaveAttribute("aria-label", "En-tête du site STRUCTURA");
  });
});
