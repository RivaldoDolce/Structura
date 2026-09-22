/**
 * Conversion du kit d'assets — audit §9.1.
 *
 * Le kit de textures (7,3 Mo de PNG) et les photos (15 Mo de PNG) sont les
 * seuls assets raster du projet : aucun upload utilisateur ne passe par ce
 * script, qui ne traite que des fichiers sous `public/`. Objectifs :
 *
 *   - textures  → AVIF qualité 60 + WebP qualité 75 (double format) ;
 *   - photos    → WebP qualité 78 (les photos gagnent peu en AVIF) ;
 *   - les SVG du kit sont ignorés (déjà vectoriels) ;
 *   - un rapport de réduction est écrit dans `Progression/`.
 *
 * Les PNG sources sont conservés : ce script est idempotent (il ne régénère
 * un AVIF/WebP que si le PNG source est plus récent que la conversion).
 *
 * Usage : `node scripts/convert-assets.mjs [--dry-run]`
 */

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const racineProjet = path.resolve(import.meta.dirname, "..");
const dossierPublic = path.join(racineProjet, "public");
const dossierRapports = path.join(racineProjet, "Progression");
const fichierRapport = path.join(dossierRapports, "rapport_conversion_assets.md");

const secDryRun = process.argv.includes("--dry-run");

/** Seuils de qualité par famille de dossiers. */
const RECETTES = [
  { motif: /textures/, formats: ["avif", "webp"], qualites: { avif: 60, webp: 75 } },
  { motif: /photos/, formats: ["webp"], qualites: { webp: 78 } },
];

/** Lister récursivement les fichiers d'un dossier. */
function listerFichiers(dossier) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier)
    .map((entree) => path.join(dossier, entree))
    .flatMap((chemin) => {
      const stats = statSync(chemin);
      return stats.isDirectory() ? listerFichiers(chemin) : [chemin];
    });
}

/** Trouver la recette de conversion applicable à un chemin. */
function recettePour(chemin) {
  return RECETTES.find((recette) => recette.motif.test(chemin.replace(/\\/g, "/")));
}

/** Formater un poids en octets de façon lisible. */
function formaterPoids(octets) {
  if (octets >= 1024 * 1024) return `${(octets / 1024 / 1024).toFixed(2)} Mo`;
  return `${Math.round(octets / 1024)} Ko`;
}

async function main() {
  if (!existsSync(dossierRapports)) mkdirSync(dossierRapports, { recursive: true });

  const pngs = listerFichiers(dossierPublic).filter(
    (chemin) => chemin.toLowerCase().endsWith(".png") && recettePour(chemin),
  );

  const lignesRapport = [
    "# Rapport de conversion des assets",
    "",
    `Date : ${new Date().toISOString()}`,
    secDryRun ? "Mode : simulation (--dry-run)" : "Mode : écriture",
    "",
    "| Fichier source | Poids PNG | Conversions | Poids total | Gain |",
    "|---|---|---|---|---|",
  ];

  let poidsAvant = 0;
  let poidsApres = 0;

  for (const png of pngs) {
    const tailleSource = statSync(png).size;
    poidsAvant += tailleSource;
    const relatif = path.relative(racineProjet, png);
    const conversions = [];
    let tailleConvertie = 0;

    const recette = recettePour(png);
    for (const format of recette.formats) {
      const cible = png.replace(/\.png$/i, `.${format}`);
      const dejaPresent = existsSync(cible);
      const plusRecentSource =
        !dejaPresent || statSync(png).mtimeMs > statSync(cible).mtimeMs;

      if (secDryRun) {
        conversions.push(`${path.basename(cible)} (simulation)`);
        continue;
      }
      if (dejaPresent && !plusRecentSource) {
        conversions.push(`${path.basename(cible)} (inchangé)`);
        tailleConvertie += statSync(cible).size;
        continue;
      }

      const instance = sharp(png)[format]({ quality: recette.qualites[format] });
      const { data } = await instance.toBuffer({ resolveWithObject: true });
      writeFileSync(cible, data);
      conversions.push(`${path.basename(cible)} (${formaterPoids(data.length)})`);
      tailleConvertie += data.length;
    }

    poidsApres += tailleConvertie;
    const gain =
      tailleConvertie > 0
        ? `${Math.max(0, Math.round((1 - tailleConvertie / tailleSource) * 100))} %`
        : "—";
    lignesRapport.push(
      `| \`${relatif}\` | ${formaterPoids(tailleSource)} | ${conversions.join(", ")} | ${formaterPoids(tailleConvertie)} | ${gain} |`,
    );
  }

  lignesRapport.push(
    "",
    `Total PNG sources : ${formaterPoids(poidsAvant)}`,
    `Total converti : ${formaterPoids(poidsApres)}`,
    poidsAvant > 0
      ? `Réduction globale : ${Math.round((1 - poidsApres / poidsAvant) * 100)} %`
      : "Aucun fichier converti.",
    "",
  );

  writeFileSync(fichierRapport, lignesRapport.join("\n"), "utf8");
  // Journal d'exécution : un script de build a le droit de parler, mais via
  // stderr pour rester compatible avec les pipelines qui captent stdout.
  console.error(`Rapport écrit : ${path.relative(racineProjet, fichierRapport)}`);
}

main().catch((erreur) => {
  console.error("Échec de la conversion des assets :", erreur);
  process.exit(1);
});
