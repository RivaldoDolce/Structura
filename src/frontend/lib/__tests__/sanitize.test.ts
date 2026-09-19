import { describe, expect, it } from "vitest";
import {
  etiquetePage,
  numeroInternational,
  texteMessage,
} from "../sanitize";

describe("numeroInternational", () => {
  it("conserve les chiffres et un indicatif explicite", () => {
    expect(numeroInternational("+237 6 90 00 00 00")).toBe("+237690000000");
    expect(numeroInternational("237 690-00-00-00")).toBe("+237690000000");
  });

  it("retourne null si rien n'est exploitable", () => {
    expect(numeroInternational("abc")).toBeNull();
    expect(numeroInternational("")).toBeNull();
  });
});

describe("texteMessage", () => {
  it("borne le message et échappe ce qui passerait dans une URL", () => {
    const texte = texteMessage("Bonjour — étude & plans #1", 80);
    expect(texte).toBe("Bonjour — étude & plans #1");
    expect(texte.length).toBeLessThanOrEqual(80);
  });

  it("tronque sans jamais dépasser la limite", () => {
    const texte = texteMessage("x".repeat(300), 100);
    expect(texte).toHaveLength(100);
  });
});

describe("etiquetePage", () => {
  it("ne conserve qu'une référence courte et sûre", () => {
    expect(etiquetePage("/plans/villa-moderne-3d")).toBe("/plans/villa-moderne-3d");
  });

  it("écrase tout caractère trompeur ou hors borne", () => {
    expect(etiquetePage("ligne1\nligne2")).toBeNull();
    expect(etiquetePage("contrôle\u0000nul")).toBeNull();
    expect(etiquetePage("x".repeat(120))).toBeNull();
  });
});