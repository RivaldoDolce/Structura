import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { WhatsAppFab } from "../whatsapp-fab";

describe("WhatsAppFab", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("reste masqué en haut de page", () => {
    render(<WhatsAppFab phoneNumber="+237690000000" />);

    expect(screen.queryByRole("link", { name: /whatsapp/i })).not.toBeInTheDocument();
  });

  it("apparaît après 400px de scroll avec un lien wa.me assaini", () => {
    render(
      <WhatsAppFab
        phoneNumber="+237690000000"
        defaultMessage="Bonjour STRUCTURA"
        reference="DV-2026-042"
      />,
    );

    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    fireEvent.scroll(window);

    const lien = screen.getByRole("link", { name: /whatsapp/i });
    expect(lien).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/237690000000?text="),
    );
    expect(lien).toHaveAttribute("target", "_blank");
    expect(lien).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("se positionne au-dessus du CTA mobile (bottom-24, bottom-6 desktop)", () => {
    render(<WhatsAppFab phoneNumber="237690000000" />);

    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveClass(
      "bottom-24",
      "md:bottom-6",
    );
  });
});
