/**
 * Tokens du design system, exposés en JavaScript typé pour tout ce qui ne peut
 * pas passer par une classe Tailwind : SVG, canvas, valeurs Motion,
 * métadonnées. Les couleurs restent des variables CSS, donc un changement de
 * thème dans `globals.css` se propage sans toucher au code.
 */
export const colors = {
  fond: "var(--color-fond)",
  "surface-deep": "var(--color-surface-deep)",
  surface: "var(--color-surface)",
  "surface-raised": "var(--color-surface-raised)",
  elevated: "var(--color-elevated)",
  "surface-warm": "var(--color-surface-warm)",
  "surface-blueprint": "var(--color-surface-blueprint)",
  line: "var(--color-line)",
  lineStrong: "var(--color-line-strong)",
  lineLight: "var(--color-line-light)",
  lineEncre: "var(--color-line-encre)",
  lineEncreStrong: "var(--color-line-encre-strong)",
  steelEncre: "var(--color-steel-encre)",
  steel: "var(--color-steel)",
  steelDeep: "var(--color-steel-deep)",
  blueprint: "var(--color-blueprint)",
  safety: "var(--color-safety)",
  safetyDeep: "var(--color-safety-deep)",
  whatsapp: "var(--color-whatsapp)",
  whatsappDeep: "var(--color-whatsapp-deep)",
  whatsappContraste: "var(--color-whatsapp-contraste)",
  cuivre: "var(--color-cuivre)",
  terre: "var(--color-terre)",
  sable: "var(--color-sable)",
  ink: "var(--color-ink)",
  inkSoft: "var(--color-ink-soft)",
  inkMute: "var(--color-ink-mute)",
  paper: "var(--color-paper)",
  paperSoft: "var(--color-paper-soft)",
  encre: "var(--color-encre)",
  encreSoft: "var(--color-encre-soft)",
  ok: "var(--color-ok)",
  okDeep: "var(--color-ok-deep)",
  warn: "var(--color-warn)",
  danger: "var(--color-danger)",
} as const;

const versKebab = (nom: string): string =>
  nom.replace(/[A-Z]/g, (lettre) => `-${lettre.toLowerCase()}`);

export const colorNames: readonly string[] = Object.keys(colors).map(versKebab);

export const textSizes: readonly string[] = [
  "display",
  "h1",
  "h2",
  "h2b",
  "h3",
  "body",
  "small",
  "mono-xs",
];

export const radiusNames: readonly string[] = ["card", "control", "modal", "pill"];
export const shadowNames: readonly string[] = ["card", "glow"];

export const fontNames: readonly string[] = ["display", "sans", "mono", "editorial"];
export const trackingNames: readonly string[] = ["annotation"];

/** Courbes d'animation, en tableaux prêts pour l'API Motion. */
export const easings = {
  outExpo: [0.16, 1, 0.3, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

export const easingNames: readonly string[] = ["out-expo", "spring"];

/** Durées en secondes, synchronisées avec les tokens `--dur-*` de `globals.css`. */
export const durations = {
  micro: 0.15,
  standard: 0.3,
  reveal: 0.4,
  cinematic: 0.7,
  stagger: 0.06,
} as const;

/**
 * Couleur de la barre du navigateur mobile.
 *
 * Seul hexadécimal légitime du code : une balise `<meta name="theme-color">`
 * n'accepte pas `var()`. La valeur doit rester celle de `--color-fond`.
 */
export const THEME_COLOR = "#060a12";
