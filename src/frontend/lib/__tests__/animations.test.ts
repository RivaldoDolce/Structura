import { describe, expect, it } from "vitest";
import {
  blurSettle,
  drawLine,
  fadeItem,
  fadeUpItem,
  inViewOnce,
  scaleReveal,
  staggerContainer,
  titleReveal,
} from "../animations";
import { durations, easings } from "../tokens";

// L'audit §7.1 fixe une hiérarchie à trois vitesses : fonctionnelle,
// exploratoire, narrative. Les variantes narratives doivent dériver des mêmes
// tokens que les autres — aucune courbe ni durée locale n'est tolérée, sans
// quoi la signature de mouvement du site se dilue.
describe("Variantes de mouvement", () => {
  it("expose la cascade et le fondu montant sur la vitesse exploratoire", () => {
    expect(staggerContainer.show).toMatchObject({
      transition: { staggerChildren: durations.stagger },
    });
    expect(fadeUpItem.show).toMatchObject({
      transition: { duration: durations.reveal, ease: easings.outExpo },
    });
  });

  it("fait durer les révélations narratives sur la vitesse cinématique", () => {
    for (const variante of [titleReveal, scaleReveal, drawLine, blurSettle]) {
      expect(variante.show).toMatchObject({
        transition: { duration: durations.cinematic, ease: easings.outExpo },
      });
    }
  });

  it("part d'un état masqué pour chaque variante d'apparition", () => {
    expect(fadeItem.hidden).toEqual({ opacity: 0 });
    expect(scaleReveal.hidden).toEqual({ opacity: 0, scale: 0.96 });
    expect(drawLine.hidden).toEqual({ pathLength: 0 });
    expect(blurSettle.hidden).toEqual({ opacity: 0, filter: "blur(8px)" });
  });

  it("revient à l'état neutre à l'arrivée, jamais au-delà", () => {
    expect(scaleReveal.show).toMatchObject({ opacity: 1, scale: 1 });
    expect(drawLine.show).toMatchObject({ pathLength: 1 });
    expect(blurSettle.show).toMatchObject({ opacity: 1, filter: "blur(0px)" });
  });

  it("déclenche les révélations une seule fois, à 25 % de visibilité", () => {
    expect(inViewOnce).toMatchObject({
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, amount: 0.25 },
    });
  });
});
