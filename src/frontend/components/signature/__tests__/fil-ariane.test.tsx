import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { FilAriane } from "../fil-ariane";

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

describe("FilAriane", () => {
  it("ramène toujours à l'accueil puis suit le parcours", () => {
    render(<FilAriane items={[{ label: "Plans", href: "/plans" }, { label: "Villa R+1" }]} />);

    const fil = screen.getByRole("navigation", { name: /fil d'ariane/i });
    expect(fil).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Plans" })).toHaveAttribute("href", "/plans");
  });

  it("marque la page courante comme non cliquable", () => {
    render(<FilAriane items={[{ label: "Contact" }]} />);

    const courant = screen.getByText("Contact");
    expect(courant).toHaveAttribute("aria-current", "page");
    expect(courant.tagName).not.toBe("A");
  });

  it("reste discret sur mobile avec des libellés tronqués", () => {
    const { container } = render(
      <FilAriane items={[{ label: "Portfolio" }, { label: "Villa Bastos Yaoundé R+1" }]} />
    );

    expect(container.querySelector("nav")).toHaveClass("text-mono-xs");
  });
});
