import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BeforeAfter } from "../before-after";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    draggable,
    className,
  }: {
    alt: string;
    src: string;
    draggable?: boolean;
    className?: string;
  }) => (
    // Simulacre volontaire : on vérifie le cadrage, pas l'optimiseur.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} draggable={draggable} className={className} />
  ),
}));

const props = { beforeImage: "/test/avant.jpg", afterImage: "/test/apres.jpg" };

describe("BeforeAfter", () => {
  it("affiche les deux images et les libellés par défaut", () => {
    render(<BeforeAfter {...props} />);

    expect(screen.getByAltText("AVANT")).toHaveAttribute("src", "/test/avant.jpg");
    expect(screen.getByAltText("APRÈS")).toHaveAttribute("src", "/test/apres.jpg");
    expect(screen.getByText("AVANT")).toBeInTheDocument();
    expect(screen.getByText("APRÈS")).toBeInTheDocument();
  });

  it("expose un curseur accessible à l'amorce de la démonstration", () => {
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider", { name: "Comparaison avant/après" });
    expect(curseur).toHaveAttribute("aria-valuenow", "30");
    expect(curseur).toHaveAttribute("aria-valuemin", "0");
    expect(curseur).toHaveAttribute("aria-valuemax", "100");
  });

  it("ajuste la comparaison au clavier, pas à pas", async () => {
    const utilisateur = userEvent.setup();
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider");
    curseur.focus();

    await utilisateur.keyboard("{ArrowRight}");
    expect(curseur).toHaveAttribute("aria-valuenow", "35");

    await utilisateur.keyboard("{Home}");
    expect(curseur).toHaveAttribute("aria-valuenow", "0");

    await utilisateur.keyboard("{End}");
    expect(curseur).toHaveAttribute("aria-valuenow", "100");
  });

  it("décrit l'aide clavier aux technologies d'assistance", () => {
    render(<BeforeAfter {...props} />);

    const aideId = screen.getByRole("slider").getAttribute("aria-describedby");
    if (!aideId) throw new Error("Aide clavier manquante sur le curseur.");
    expect(document.getElementById(aideId)).toHaveTextContent(/flèches/i);
  });

  it("positionne le voile à l'amorce de la démonstration", () => {
    const { container } = render(<BeforeAfter {...props} />);

    // La démonstration (§7.3 de l'audit) ouvre à 30 % : le geste est enseigné
    // sans interaction, l'utilisateur garde la main à tout moment.
    expect(container.querySelector("[data-voile]")).toHaveStyle({ clipPath: "inset(0 70% 0 0)" });
  });

  it("enseigne le geste par une démonstration automatique 30 → 65 → 50", () => {
    vi.useFakeTimers();
    try {
      render(<BeforeAfter {...props} />);
      const curseur = screen.getByRole("slider");

      expect(curseur).toHaveAttribute("aria-valuenow", "30");

      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(curseur).toHaveAttribute("aria-valuenow", "65");

      act(() => {
        vi.advanceTimersByTime(380);
      });
      // Le repos revient au centre : les deux états sont présentés à parts
      // égales, sans laisser croire que 65 % est la valeur « correcte ».
      expect(curseur).toHaveAttribute("aria-valuenow", "50");
    } finally {
      vi.useRealTimers();
    }
  });

  it("interrompt la démonstration dès que l'utilisateur reprend la main", () => {
    vi.useFakeTimers();
    try {
      render(<BeforeAfter {...props} />);
      const curseur = screen.getByRole("slider");

      fireEvent.keyDown(curseur, { key: "ArrowRight" });
      expect(curseur).toHaveAttribute("aria-valuenow", "35");

      act(() => {
        vi.advanceTimersByTime(800);
      });
      expect(curseur).toHaveAttribute("aria-valuenow", "35");
    } finally {
      vi.useRealTimers();
    }
  });

  it("reste immobile en mouvement réduit", () => {
    const matchMediaOrigine = window.matchMedia;
    window.matchMedia = ((requete: string) => ({
      matches: true,
      media: requete,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;

    try {
      render(<BeforeAfter {...props} />);
      expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
    } finally {
      window.matchMedia = matchMediaOrigine;
    }
  });

  it("accepte des libellés personnalisés", () => {
    render(<BeforeAfter {...props} beforeLabel="Chantier" afterLabel="Livré" />);

    expect(screen.getByText("Chantier")).toBeInTheDocument();
    expect(screen.getByText("Livré")).toBeInTheDocument();
  });

  /*
   * Logique de comparaison : le geste s'enseigne une seule fois, mais le repos
   * doit montrer les deux états à parts égales. Une démonstration qui se repose
   * à 45 % laisse le visiteur supposer que 45 % est la valeur « correcte » ;
   * l'équilibre vrai d'un comparateur est le centre, 50 %.
   */
  it("se repose au centre, l'état de référence de la comparaison", () => {
    vi.useFakeTimers();
    try {
      render(<BeforeAfter {...props} />);
      const curseur = screen.getByRole("slider");

      act(() => {
        vi.advanceTimersByTime(1200);
      });
      expect(curseur).toHaveAttribute("aria-valuenow", "50");
    } finally {
      vi.useRealTimers();
    }
  });

  // La poignée doit rester exactement sur la coupe et au-dessus du voile :
  // décalée d'un pixel, le geste devient imprécis là où il compte le plus —
  // aux deux extrêmes, où l'on vérifie que l'état « avant » et l'état « après »
  // sont bien entiers.
  it("expose une poignée centrée sur la coupe", () => {
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider");
    expect(curseur.style.left).toBe("30%");
    expect(curseur).toHaveClass("absolute", "-translate-x-1/2");
  });

  // Le nom accessible de la poignée doit dire ce que la coupe montre, pas
  // seulement « comparaison avant/après » : c'est la seule description que
  // reçoit un lecteur d'écran au moment du geste.
  it("annonce la proportion révélée dans le nom de la poignée", () => {
    render(<BeforeAfter {...props} />);

    const curseur = screen.getByRole("slider");
    // Amorce de démonstration : 30 % de l'état après révélé.
    expect(curseur).toHaveAccessibleName(/comparaison avant\/après/i);
    expect(curseur).toHaveAttribute("aria-valuetext", expect.stringMatching(/30\s*%/));
  });
});
