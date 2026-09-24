import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechDivider } from "../tech-divider";

describe("TechDivider", () => {
  it("rend un séparateur accessible avec son libellé", () => {
    render(<TechDivider label="CERTIFIÉ" />);

    const separateur = screen.getByRole("separator", { name: "CERTIFIÉ" });
    expect(separateur).toBeInTheDocument();
    expect(screen.getByText("CERTIFIÉ")).toBeInTheDocument();
  });

  it("rend un filet simple sans libellé", () => {
    render(<TechDivider />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("trace ses filets et son cartouche en encre sur une bande claire", () => {
    const { container } = render(<TechDivider label="CERTIFIÉ" tone="clair" />);

    expect(screen.getByText("CERTIFIÉ")).toHaveClass("text-encre-soft");
    expect(container.querySelectorAll(".bg-line-encre-strong")).toHaveLength(2);
  });
});
