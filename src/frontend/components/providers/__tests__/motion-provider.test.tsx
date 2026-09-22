import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "../motion-provider";

describe("MotionProvider", () => {
  it("rend son contenu sans le modifier", () => {
    render(
      <MotionProvider>
        <p>Contenu animé</p>
      </MotionProvider>
    );

    expect(screen.getByText("Contenu animé")).toBeInTheDocument();
  });
});
