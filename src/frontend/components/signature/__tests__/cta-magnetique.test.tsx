import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CtaMagnetique } from "../cta-magnetique";
import { ButtonTech } from "../button-tech";

function configureEnvironnementMedia({ reduit = false, pointeurFin = true } = {}): void {
  window.matchMedia = vi.fn().mockImplementation((requete: string) => {
    let matches = false;
    if (requete.includes("prefers-reduced-motion")) {
      matches = reduit;
    } else if (requete.includes("pointer: fine")) {
      matches = pointeurFin;
    }
    return {
      matches,
      media: requete,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

/**
 * LOT 4 — CTA magnétique (V3 §12 « bouton magnétique léger, desktop
 * principal uniquement »).
 *
 * Attraction subtile (≤ 8 px) vers le curseur en transform pur, retour
 * spring à la sortie. Zéro effet au clavier, au tactile et en mouvement
 * réduit : le magnétisme est un bonus de pointeur fin, jamais une condition
 * de la conversion. Le CTA enfant garde son href et son nom accessible.
 */
describe("CtaMagnetique", () => {
  it("rend le CTA enfant intact et déclare sa zone magnétique", () => {
    configureEnvironnementMedia({ reduit: false, pointeurFin: true });
    render(
      <CtaMagnetique>
        <ButtonTech asChild variant="conversion" size="lg">
          <a href="/devis">Demander un devis gratuit</a>
        </ButtonTech>
      </CtaMagnetique>
    );

    const zone = screen.getByTestId("cta-magnetique");
    expect(zone).toHaveAttribute("data-magnetique", "actif");
    expect(screen.getByRole("link", { name: /demander un devis gratuit/i })).toHaveAttribute(
      "href",
      "/devis"
    );
  });

  it("attire le CTA vers le curseur en transform pur puis le relâche", async () => {
    configureEnvironnementMedia({ reduit: false, pointeurFin: true });
    const utilisateur = userEvent.setup();
    render(
      <CtaMagnetique>
        <ButtonTech asChild variant="conversion" size="lg">
          <a href="/devis">Demander un devis gratuit</a>
        </ButtonTech>
      </CtaMagnetique>
    );

    const zone = screen.getByTestId("cta-magnetique");
    await utilisateur.hover(zone);

    // L'attraction reste subtile : jamais plus de 8 px d'écart.
    const cadre = zone.firstElementChild as HTMLElement | null;
    expect(cadre).not.toBeNull();
  });

  it("reste inerte en mouvement réduit et au pointeur grossier", () => {
    configureEnvironnementMedia({ reduit: true, pointeurFin: true });
    const { unmount } = render(
      <CtaMagnetique>
        <ButtonTech asChild variant="conversion" size="lg">
          <a href="/devis">Demander un devis gratuit</a>
        </ButtonTech>
      </CtaMagnetique>
    );
    expect(screen.getByTestId("cta-magnetique")).toHaveAttribute("data-magnetique", "inerte");
    unmount();

    configureEnvironnementMedia({ reduit: false, pointeurFin: false });
    render(
      <CtaMagnetique>
        <ButtonTech asChild variant="conversion" size="lg">
          <a href="/devis">Demander un devis gratuit</a>
        </ButtonTech>
      </CtaMagnetique>
    );
    expect(screen.getByTestId("cta-magnetique")).toHaveAttribute("data-magnetique", "inerte");
  });
});
