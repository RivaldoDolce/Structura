import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

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

import { SceneEbenisterie } from "../scene-ebenisterie";

vi.mock("next/image", () => ({
  // Simulacre de test, jamais servi en production : <img> volontaire.
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const props = {
  kicker: { number: "02", label: "ÉBÉNISTERIE" },
  essence: "Padouk",
  description: "Un veinage serré qui traverse les années sans faiblir.",
  imageUrl: "/photos/essences/04-05_macro-bois-padouk.png",
  imageAlt: "Veinage serré d'un plateau de padouk",
  badge: "Atelier Yaoundé",
  href: "/ebenisterie",
  hrefLabel: "Voir l'atelier",
};

describe("SceneEbenisterie", () => {
  it("compose une scène atelier chaude au nom d'essence en serif", () => {
    const { container } = render(<SceneEbenisterie {...props} />);

    const scene = screen.getByRole("region", { name: /padouk/i });
    expect(scene).toHaveAttribute("data-scene", "ebenisterie");
    expect(scene).toHaveAttribute("data-lumiere", "warm");
    expect(screen.getByAltText("Veinage serré d'un plateau de padouk")).toBeInTheDocument();
    expect(container.querySelector(".font-editorial")).toHaveTextContent("Padouk");
    expect(container.querySelector(".st-warm")).not.toBeNull();
  });

  it("affiche le badge cuivre et l'appel à l'action", () => {
    const { container } = render(<SceneEbenisterie {...props} />);

    expect(screen.getByText("Atelier Yaoundé")).toBeInTheDocument();
    expect(container.querySelector(".border-cuivre")).not.toBeNull();
    expect(screen.getByRole("link", { name: /voir l'atelier/i })).toHaveAttribute(
      "href",
      "/ebenisterie"
    );
  });
});
