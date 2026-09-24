/**
 * Mesure locale des contrastes de la lumière V2 (sans navigateur).
 *
 * Reprend la même formule WCAG que `scripts/audit-surfaces.mjs` mais lit les
 * hexadécimaux en dur : utile avant de toucher un token, pour trancher entre
 * « durcir la couleur » et « baisser le seuil ». Usage : `node scripts/contrastes-v2.mjs`.
 */

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const COUPLES = [
  ["encre → paper", "#1a1512", "#f1ece2", 12],
  ["encre-soft → paper", "#4a443b", "#f1ece2", 7],
  ["encre → paper-soft", "#1a1512", "#e3ddd0", 12],
  ["encre-soft → paper-soft", "#4a443b", "#e3ddd0", 7],
  // Accent de donnée des actes clairs : `steel-encre` durci en V2-1c car le
  // `steel-deep` historique plafonne à 5,69:1 (AA exigé ≥ 7:1 ici).
  ["steel-encre → paper", "#1a3fa0", "#f1ece2", 7],
];

// Rappel historique, informatif et hors verdict : `steel-deep` reste le bleu
// des aplats et bordures sombres — jamais un texte sur papier.
const RAPPELS = [["steel-deep → paper (historique, sombre uniquement)", "#1d4ed8", "#f1ece2", 7]];

let echecs = 0;
for (const [label, a, b, min] of COUPLES) {
  const valeur = ratio(a, b);
  const verdict = valeur >= min ? "OK" : "ÉCHEC";
  if (valeur < min) echecs += 1;
  console.log(`${verdict} — ${label} : ${valeur.toFixed(2)} (min ${min})`);
}
if (echecs > 0) process.exit(1);
for (const [label, a, b, min] of RAPPELS) {
  const valeur = ratio(a, b);
  console.log(`INFO — ${label} : ${valeur.toFixed(2)} (min ${min}, usage sombre uniquement)`);
}
console.log("Contrastes de la lumière V2 conformes.");
