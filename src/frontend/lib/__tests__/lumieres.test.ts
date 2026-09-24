import { describe, expect, it } from "vitest";
import { LUMIERES, alternanceRespectee, estClaire, tonDe } from "../lumieres";

/**
 * Le vocabulaire de lumière est le contrat du rééquilibre V2 : toute
 * composition claire ou sombre le consomme. Ces tests le verrouillent avant
 * qu'une page ne s'appuie dessus.
 */
describe("lumieres", () => {
  it("déclare les quatre lumières du récit, dans l'ordre du jour au chaud", () => {
    expect(LUMIERES).toEqual(["sombre", "ivoire", "pale", "warm"]);
  });

  it("classe ivoire et pâle comme lumières claires, jamais les deux autres", () => {
    expect(LUMIERES.filter(estClaire)).toEqual(["ivoire", "pale"]);
  });

  it("donne à chaque lumière un ton complet et cohérent", () => {
    for (const lumiere of LUMIERES) {
      const ton = tonDe(lumiere);

      for (const [role, classes] of Object.entries(ton)) {
        if (typeof classes === "string") {
          expect(classes, `${lumiere}.${role}`).not.toBe("");
        }
      }
      expect(ton.fond, `${lumiere} : fond`).not.toBe("");
      expect(ton.titre).toMatch(/^text-/);
      expect(ton.texte).toMatch(/^text-/);
      expect(ton.accent).toMatch(/^text-/);
      expect(ton.filet).toMatch(/^border-/);
    }
  });

  it("n'emploie aucun hexadécimal en dur : uniquement les tokens du thème", () => {
    for (const lumiere of LUMIERES) {
      for (const classes of Object.values(tonDe(lumiere))) {
        if (typeof classes === "string") {
          expect(classes).not.toMatch(/#[0-9a-f]{3,8}/i);
        }
      }
    }
  });

  it("réserve les tons clairs aux textes encre et les tons sombres à ink", () => {
    expect(tonDe("ivoire").titre).toContain("text-encre");
    expect(tonDe("pale").titre).toContain("text-encre");
    expect(tonDe("sombre").titre).toContain("text-ink");
    expect(tonDe("warm").titre).toContain("text-ink");
  });

  it("refuse deux lumières identiques côte à côte, accepte une alternance", () => {
    expect(alternanceRespectee(["sombre", "ivoire", "warm"])).toBe(true);
    expect(alternanceRespectee(["sombre", "ivoire", "ivoire"])).toBe(false);
    expect(alternanceRespectee([])).toBe(true);
    expect(alternanceRespectee(["sombre"])).toBe(true);
  });
});
