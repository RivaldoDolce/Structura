import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { durations } from "@/frontend/lib/tokens";

/*
 * Garde-fous transverses de la refonte V3 (plan §LOT 0).
 *
 * Ces règles ne se voient pas dans une capture d'écran : elles protègent des
 * décisions de finition qu'un composant peut défaire sans que rien ne casse.
 * Elles s'appliquent donc au code source, pas au rendu — un test de rendu
 * n'aurait aucun moyen de repérer une propriété animée en trop.
 */

const RACINE_SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const CHEMIN_CSS = path.join(RACINE_SRC, "app", "globals.css");

/** Extensions de production uniquement : un test n'est pas un composant. */
function sourcesProduction(dossier: string): string[] {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) return sourcesProduction(chemin);
    if (!/\.tsx?$/.test(entree.name) || /\.test\.tsx?$/.test(entree.name)) return [];
    return [chemin];
  });
}

const CSS = readFileSync(CHEMIN_CSS, "utf8");

const SOURCES = sourcesProduction(RACINE_SRC).map(
  (chemin) => [path.relative(RACINE_SRC, chemin), readFileSync(chemin, "utf8")] as const
);

/** Durées déclarées dans les tokens, ramenées en secondes pour comparaison. */
const DUREES_CSS = new Map(
  [...CSS.matchAll(/--transition-duration-([a-z-]+):\s*(\d+)ms;/g)].map(([, nom, valeur]) => [
    nom,
    Number(valeur) / 1000,
  ])
);

describe("Règles structurelles V3", () => {
  it("interdit `transition-all` : chaque transition nomme ses propriétés", () => {
    const fautifs = SOURCES.filter(([, code]) => /\btransition-all\b/.test(code)).map(
      ([chemin]) => chemin
    );

    expect(fautifs).toEqual([]);
  });

  it("interdit les durées littérales : toute durée sort d'un token", () => {
    const fautifs = SOURCES.flatMap(([chemin, code]) =>
      [...code.matchAll(/\bduration-(?:\d|\[[^\]]*\])/g)].map(
        (trouvee) => `${chemin} → ${trouvee[0]}`
      )
    );

    expect(fautifs).toEqual([]);
  });

  it("n'emploie que des durées déclarées par l'échelle de tokens", () => {
    const employees = new Set(
      SOURCES.flatMap(([, code]) =>
        [...code.matchAll(/\bduration-([a-z][a-z-]*)\b/g)].map(([, nom]) => nom)
      )
    );

    expect([...employees].filter((nom) => !DUREES_CSS.has(nom))).toEqual([]);
    // Garde-fou du garde-fou : si l'extraction ne trouve plus rien, c'est la
    // règle qui est cassée, pas le code.
    expect(employees.size).toBeGreaterThan(0);
  });

  it("garde l'échelle de durées CSS et JavaScript synchronisée", () => {
    for (const [nom, secondes] of Object.entries(durations)) {
      expect(DUREES_CSS.get(nom), `--transition-duration-${nom}`).toBeCloseTo(secondes, 5);
    }
  });

  it("conserve la hiérarchie à cinq niveaux de surfaces", () => {
    for (const nom of ["fond", "surface-deep", "surface", "surface-raised", "elevated"]) {
      expect(CSS).toContain(`--color-${nom}:`);
    }
  });

  /*
   * La lisière vit dans la zone de respiration : le fondu ne doit jamais
   * atteindre la première ligne de contenu. C'est pourquoi sa hauteur est
   * bornée par la plus petite respiration du site — sans cette borne, une
   * bande peu aérée verrait son premier texte se noyer dans le dégradé.
   */
  it("borne la lisière à la plus petite respiration du site", () => {
    // py-20 (5rem) est la plus faible respiration des bandes portant une
    // lisière ; au-delà, le dégradé mordrait sur le contenu.
    const hauteur = CSS.match(/\.st-lisiere::before,\s*\.st-lisiere::after\s*\{[^}]*height:\s*([^;]+);/)?.[1];
    expect(hauteur, "hauteur de la lisière").toBeDefined();

    // Un clamp est borné par ses deux extrêmes : c'est le plus grand qui
    // détermine la zone réellement occupée, pas le premier rencontré.
    const bornes = [...(hauteur?.match(/([\d.]+)rem/g) ?? [])].map((valeur) =>
      Number(valeur.replace("rem", ""))
    );
    expect(bornes.length, "la hauteur de la lisière est un clamp en rem").toBeGreaterThanOrEqual(2);
    expect(Math.max(...bornes), "la lisière doit rester sous la respiration minimale").toBeLessThanOrEqual(5);
  });

  /*
   * Coutures entre actes. Ces règles portent sur la recette CSS elle-même : une
   * couture ne se voit pas dans une arborescence de composants, elle ne se voit
   * qu'en assemblage — d'où un contrôle sur la feuille de style.
   */
  it("sépare deux bandes claires par un filet net, jamais par un fondu au noir", () => {
    // Le bandeau supérieur renonce à son fondu, le bandeau inférieur pose le
    // filet : un seul trait d'un pixel, quelle que soit la couture.
    expect(CSS).toMatch(/\.st-lisiere:has\(\+ \.st-lisiere\)::after\s*\{[^}]*display:\s*none/);
    expect(CSS).toMatch(/\.st-lisiere \+ \.st-lisiere::before\s*\{[^}]*height:\s*1px/);
    // Un fond clair ne se sépare jamais de lui-même par un dégradé vers le noir.
    expect(CSS).not.toMatch(/\.st-lisiere::after\s*\{[^}]*--color-fond/);
  });

  it("n'emploie aucun hexadécimal hors du bloc @theme", () => {
    const horsTheme = CSS.replace(CSS.match(/@theme\s*\{[^}]*\}/)?.[0] ?? "", "");

    expect(horsTheme.match(/#[0-9a-f]{3,8}\b/gi) ?? []).toEqual([]);
  });
});
