import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { JALONS_CHANTIER } from "../jalons";
import { PLANS } from "../plans";
import { PROJETS_PORTFOLIO } from "../portfolio";
import { equipe, journal, essences } from "../equipe";

const racinePublic = join(process.cwd(), "public");

describe("Données de démonstration", () => {
  it("n'utilise que des images réellement présentes dans public/", () => {
    const toutes = [
      ...PLANS.flatMap((plan) => [plan.imageUrl, ...(plan.galerie ?? [])]),
      ...PROJETS_PORTFOLIO.map((projet) => projet.imageUrl),
      ...JALONS_CHANTIER.flatMap((jalon) => jalon.images ?? []),
      ...essences.map((essence) => essence.imageUrl),
      ...journal.map((entree) => entree.imageUrl),
      ...equipe.map((membre) => membre.photoUrl),
    ];

    for (const chemin of toutes) {
      expect(existsSync(join(racinePublic, chemin)), `Image manquante : ${chemin}`).toBe(true);
    }
  });

  it("porte des slugs et références uniques", () => {
    const slugs = PROJETS_PORTFOLIO.map((projet) => projet.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    const references = PLANS.map((plan) => plan.reference);
    expect(new Set(references).size).toBe(references.length);
  });

  it("garde des prix et surfaces strictement positifs", () => {
    for (const plan of PLANS) {
      expect(plan.prixFcfa).toBeGreaterThan(0);
      if (plan.superficieM2 !== undefined) {
        expect(plan.superficieM2).toBeGreaterThan(0);
      }
    }
  });
});
