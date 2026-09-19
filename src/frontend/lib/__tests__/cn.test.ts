import { describe, expect, it } from "vitest";
import { cn } from "../cn";
import { colorNames, radiusNames, shadowNames, textSizes } from "../tokens";

// Le thème du projet repose sur des noms d'utilitaires personnalisés (text-h2,
// rounded-card, shadow-card…). `tailwind-merge` ne les dédoublonne correctement
// que s'ils lui sont déclarés : ces tests verrouillent cette configuration, car
// une classe non reconnue est soit conservée en doublon, soit supprimée à tort.
describe("cn", () => {
  it("ignore les valeurs conditionnelles fausses", () => {
    expect(cn("px-4", false && "hidden", undefined, null, "py-2")).toBe("px-4 py-2");
  });

  it("résout un conflit d'utilitaire standard au profit du dernier", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("conserve la famille d'une couleur et la taille, qui sont deux groupes distincts", () => {
    expect(cn("text-body", "text-ink")).toBe("text-body text-ink");
  });

  it("remplace la taille de texte par la dernière demandée", () => {
    expect(cn("text-body", "text-h2")).toBe("text-h2");
  });

  it("remplace la couleur de texte par la dernière demandée", () => {
    expect(cn("text-ink", "text-ink-soft")).toBe("text-ink-soft");
  });

  it("conserve une taille du thème et une couleur arbitraire sur variable CSS", () => {
    expect(cn("text-mono-xs", "text-[var(--color-blueprint)]")).toBe(
      "text-mono-xs text-[var(--color-blueprint)]",
    );
  });

  it("remplace un rayon puis une ombre du thème", () => {
    expect(cn("rounded-control", "rounded-card")).toBe("rounded-card");
    expect(cn("shadow-card", "shadow-none")).toBe("shadow-none");
  });

  it("remplace une courbe d'animation du thème", () => {
    expect(cn("ease-out-expo", "ease-linear")).toBe("ease-linear");
  });

  it("remplace une largeur maximale et une famille de police du thème", () => {
    expect(cn("max-w-4xl", "max-w-content")).toBe("max-w-content");
    expect(cn("font-display", "font-mono")).toBe("font-mono");
  });

  it("traite les modificateurs séparément des classes de base", () => {
    expect(cn("hover:bg-base", "bg-surface", "hover:bg-surface")).toBe(
      "bg-surface hover:bg-surface",
    );
  });

  it("laisse intactes les classes hors thème", () => {
    expect(cn("group", "aria-hidden:pointer-events-none", "grid-cols-2")).toBe(
      "group aria-hidden:pointer-events-none grid-cols-2",
    );
  });

  // Garde-fou anti-dérive : chaque couleur exposée par tokens.ts doit être
  // reconnue par la fusion, sinon une primitive écraserait silencieusement
  // la couleur de fond de son appelant.
  it("reconnaît toutes les couleurs et échelles déclarées dans tokens.ts", () => {
    const taillesFusionnees = textSizes.map((taille) => cn(`text-${taille}`, "text-h3"));
    expect(taillesFusionnees.every((fusion) => fusion === "text-h3")).toBe(true);

    const rayonsFusionnes = radiusNames.map((rayon) => cn(`rounded-${rayon}`, "rounded-pill"));
    expect(rayonsFusionnes.every((fusion) => fusion === "rounded-pill")).toBe(true);

    const ombresFusionnees = shadowNames.map((ombre) => cn(`shadow-${ombre}`, "shadow-none"));
    expect(ombresFusionnees.every((fusion) => fusion === "shadow-none")).toBe(true);

    const couleursFusionnees = colorNames.map((couleur) => cn(`bg-${couleur}`, "bg-base"));
    expect(couleursFusionnees.every((fusion) => fusion === "bg-base")).toBe(true);
  });
});