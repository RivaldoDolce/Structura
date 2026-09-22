import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { JALONS_CHANTIER } from "../jalons";
import { PLANS } from "../plans";
import { PROJETS_PORTFOLIO } from "../portfolio";
import { equipe, journal, essences } from "../equipe";
import { FONDS_HEROS } from "../fonds";

const racinePublic = join(process.cwd(), "public");

/** Liste récursive des fichiers d'un dossier. */
function listerFichiers(dossier: string): string[] {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier).flatMap((entree) => {
    const chemin = join(dossier, entree);
    return statSync(chemin).isDirectory() ? listerFichiers(chemin) : [chemin];
  });
}

/**
 * Chemins d'assets référencés en dur dans le code de rendu. Le typage ne peut
 * pas vérifier l'existence d'un fichier : cette lecture statique comble le
 * trou et attrape les coquilles de chemin, seul risque réel de la refonte.
 */
function cheminsAssets(dossier: string): Array<{ fichier: string; chemin: string }> {
  const motif = /["'`](\/(?:photos|textures)\/[^"'`\s]+\.(?:png|webp|avif|svg|jpg|jpeg))["'`]/g;

  return listerFichiers(dossier)
    .filter((fichier) => /\.(ts|tsx)$/.test(fichier))
    .flatMap((fichier) => {
      const contenu = readFileSync(fichier, "utf8");
      return [...contenu.matchAll(motif)].map((correspondance) => ({
        fichier: fichier.replace(`${process.cwd()}/`, ""),
        chemin: correspondance[1],
      }));
    });
}

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

  it("n'affiche aucun anglicisme parasite dans les textes français", () => {
    const anglicismes = ["selecting", "coming soon", "loading"];
    const textes = [
      ...PROJETS_PORTFOLIO.map((projet) => `${projet.title} ${projet.description}`),
      ...PLANS.map((plan) => `${plan.titre} ${plan.description ?? ""}`),
      ...essences.map((essence) => `${essence.nom} ${essence.description}`),
      ...journal.map((entree) => `${entree.titre} ${entree.extrait}`),
      ...equipe.map((membre) => `${membre.nom} ${membre.role}`),
    ];

    for (const texte of textes) {
      for (const anglicisme of anglicismes) {
        expect(texte.toLowerCase()).not.toContain(anglicisme);
      }
    }
  });

  it("branche uniquement des fonds de héros réellement convertis en AVIF", () => {
    for (const chemin of Object.values(FONDS_HEROS)) {
      expect(chemin.endsWith(".avif"), `Fond non converti : ${chemin}`).toBe(true);
      expect(existsSync(join(racinePublic, chemin)), `Fond manquant : ${chemin}`).toBe(true);
    }
  });

  it("ne référence, dans le rendu, que des assets réellement présents", () => {
    const references = [
      ...cheminsAssets(join(process.cwd(), "src", "app")),
      ...cheminsAssets(join(process.cwd(), "src", "frontend", "components")),
    ];

    expect(references.length).toBeGreaterThan(0);
    for (const { fichier, chemin } of references) {
      expect(
        existsSync(join(racinePublic, chemin)),
        `Asset introuvable, référencé par ${fichier} : ${chemin}`
      ).toBe(true);
    }
  });
});
