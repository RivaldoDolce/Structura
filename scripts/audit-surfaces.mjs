/**
 * Contrôle des recettes de profondeur et des contrastes — audit §5.1/§5.2 et
 * plan V2 §3.
 *
 * Vérifie sur la page rendue que :
 *   - les tokens de surfaces sont bien servis (5 crans + 2 contextes + papier) ;
 *   - la hiérarchie fond → fond-immergé → surface → raised → elevated est
 *     perceptible à l'œil nu (ratios de luminance minimaux) ;
 *   - les couples de la lumière claire (encre sur papier) tiennent l'exigence
 *     AA comme leurs équivalents sombres ;
 *   - la variante de contraste WhatsApp dépasse 4,5:1 sur texte sombre.
 *
 * Usage : `node scripts/audit-surfaces.mjs` (nécessite `npm run dev` ou un
 * serveur de production, défini par BASE_URL, http://localhost:3000 par défaut).
 */

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

/** Deux valeurs attendues en hexadécimal ; retourne leur ratio WCAG. */
function ratioContraste(hexA, hexB) {
  const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5]
      .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const la = luminance(hexA);
  const lb = luminance(hexB);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Normalise une valeur CSS (hex, rgb ou rgba) en hexadécimal à 6 chiffres. */
function versHex(valeurCss) {
  const valeur = valeurCss.trim();
  if (valeur.startsWith("#")) {
    const hex = valeur.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const triple = hex
        .slice(0, 3)
        .split("")
        .map((c) => c + c);
      return `#${triple.join("")}`;
    }
    return `#${hex.slice(0, 6)}`;
  }
  const parties = valeur.match(/[\d.]+/g);
  if (!parties || parties.length < 3) return "#000000";
  const [r, g, b] = parties.slice(0, 3).map(Number);
  const alpha = parties.length > 3 ? Number(parties[3]) : 1;
  if (alpha < 1) {
    // Approximation d'aplat : composite sur blanc pour estimer la teinte perçue.
    const compose = (c) => Math.round(c * alpha + 255 * (1 - alpha));
    return `#${[r, g, b].map((c) => compose(c).toString(16).padStart(2, "0")).join("")}`;
  }
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

const TOKENS = [
  "--color-fond",
  "--color-surface-deep",
  "--color-surface",
  "--color-surface-raised",
  "--color-elevated",
  "--color-surface-warm",
  "--color-surface-blueprint",
  "--color-whatsapp-contraste",
  "--color-paper",
  "--color-paper-soft",
  "--color-encre",
  "--color-encre-soft",
  "--color-steel-encre",
  "--color-steel-deep",
];

const EXIGENCES = [
  { label: "fond → surface-deep", min: 1.02, tokens: ["--color-fond", "--color-surface-deep"] },
  { label: "surface-deep → surface", min: 1.08, tokens: ["--color-surface-deep", "--color-surface"] },
  { label: "surface → surface-raised", min: 1.12, tokens: ["--color-surface", "--color-surface-raised"] },
  { label: "surface-raised → elevated", min: 1.08, tokens: ["--color-surface-raised", "--color-elevated"] },
];

/* Lumière V2 : les actes clairs doivent tenir le même niveau d'exigence que
   les actes sombres — un texte encre sur ivoire se lit comme un texte ink sur
   fond profond, sinon le rééquilibre serait cosmétique. `steel-encre` est
   l'accent de donnée des actes clairs (le `steel-deep` historique reste le
   bleu des bordures et des aplats sombres). */
const EXIGENCES_CLAIR = [
  { label: "encre → paper (AA large)", min: 12, tokens: ["--color-encre", "--color-paper"] },
  { label: "encre-soft → paper (AA)", min: 7, tokens: ["--color-encre-soft", "--color-paper"] },
  { label: "encre → paper-soft", min: 12, tokens: ["--color-encre", "--color-paper-soft"] },
  { label: "encre-soft → paper-soft", min: 7, tokens: ["--color-encre-soft", "--color-paper-soft"] },
  { label: "steel-encre → paper (accent)", min: 7, tokens: ["--color-steel-encre", "--color-paper"] },
];

const navigateur = await chromium.launch();
const page = await navigateur.newPage();
await page.goto(BASE_URL, { waitUntil: "networkidle" });

const valeurs = {};
for (const token of TOKENS) {
  valeurs[token] = await page.evaluate(
    (nom) => getComputedStyle(document.documentElement).getPropertyValue(nom).trim(),
    token,
  );
  if (!valeurs[token]) {
    console.error(`ÉCHEC — token non servi : ${token}`);
    process.exit(1);
  }
}

let echecs = 0;
for (const exigence of [...EXIGENCES, ...EXIGENCES_CLAIR]) {
  const [a, b] = exigence.tokens.map((t) => versHex(valeurs[t]));
  const ratio = ratioContraste(a, b);
  const verdict = ratio >= exigence.min ? "OK" : "ÉCHEC";
  if (ratio < exigence.min) echecs += 1;
  console.log(`${verdict} — ${exigence.label} : ${ratio.toFixed(3)} (min ${exigence.min})`);
}

const whatsapp = ratioContraste("#04150b", versHex(valeurs["--color-whatsapp-contraste"]));
if (whatsapp < 4.5) echecs += 1;
console.log(
  `${whatsapp >= 4.5 ? "OK" : "ÉCHEC"} — icône WhatsApp sur fond sombre : ${whatsapp.toFixed(2)} (min 4.5)`,
);

await navigateur.close();
if (echecs > 0) {
  console.error(`${echecs} contrôle(s) en échec.`);
  process.exit(1);
}
console.log("Toutes les recettes de profondeur sont conformes.");
