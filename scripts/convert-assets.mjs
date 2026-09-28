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

/* ------------------------------------------------------------------ */
/* Dérivations de marque                                              */
/* ------------------------------------------------------------------ */

/**
 * Le monogramme du kit est une planche opaque : le glyphe est rendu sur un fond
 * bleu nuit parcouru d'une maille blueprint, sans canal alpha. Posée telle
 * quelle dans l'en-tête, la planche afficherait son carré sombre — un sticker,
 * pas un sceau.
 *
 * La dérivation reconstruit l'alpha par rampe sur la luminance : sous 26 le
 * pixel appartient au fond ou à la maille (qui plafonne vers 20), au-dessus de
 * 60 il appartient au trait plein. La teinte est ensuite ramenée à l'aplat de
 * marque : un sceau se lit par sa forme, jamais par un dégradé.
 */
const SCEAU = {
  source: "public/branding/monogramme-cyan.png",
  cible: "public/branding/monogramme-sceau.png",
  seuilFond: 26,
  seuilTrait: 60,
  /** `--color-blueprint` : le sceau ne porte pas sa propre teinte. */
  teinte: { r: 0x22, g: 0xd3, b: 0xee },
  /** Plus de trois fois la taille d'affichage en en-tête : net en densité double. */
  taille: 168,
};

/**
 * Détoure une planche de marque vers un PNG à canal alpha, rogné sur son
 * glyphe. Retourne le poids du fichier écrit, ou `null` si la source manque.
 */
async function deriverSceau({ source, cible, seuilFond, seuilTrait, teinte, taille }) {
  if (!existsSync(source)) return null;

  const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const depuis = (y * width + x) * channels;
      const luminance =
        0.2126 * data[depuis] + 0.7152 * data[depuis + 1] + 0.0722 * data[depuis + 2];
      const couverture = Math.min(
        1,
        Math.max(0, (luminance - seuilFond) / (seuilTrait - seuilFond)),
      );
      const alpha = Math.round(couverture * 255);

      const vers = (y * width + x) * 4;
      rgba[vers] = teinte.r;
      rgba[vers + 1] = teinte.g;
      rgba[vers + 2] = teinte.b;
      rgba[vers + 3] = alpha;

      // Le rognage suit l'alpha utile : l'anti-aliasing sous 8/255 ne décide pas
      // du cadre, sans quoi un voile résiduel suffirait à garder toute la planche.
      if (alpha > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;

  const { data: png, info: sortie } = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .resize(taille, taille, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  writeFileSync(cible, png);
  return { poids: png.length, cote: sortie.width };
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

  if (!secDryRun) {
    const sceau = await deriverSceau(SCEAU);
    if (sceau) {
      lignesRapport.push(
        "## Dérivations de marque",
        "",
        `- \`${SCEAU.cible}\` — sceau ${sceau.cote}×${sceau.cote} détouré depuis \`${SCEAU.source}\` (${formaterPoids(sceau.poids)}).`,
        "",
      );
    }
  }

  writeFileSync(fichierRapport, lignesRapport.join("\n"), "utf8");
  // Journal d'exécution : un script de build a le droit de parler, mais via
  // stderr pour rester compatible avec les pipelines qui captent stdout.
  console.error(`Rapport écrit : ${path.relative(racineProjet, fichierRapport)}`);
}

main().catch((erreur) => {
  console.error("Échec de la conversion des assets :", erreur);
  process.exit(1);
});
