/**
 * Fonds du kit branchés (audit Phase 0, item 5) : les héros de pages portent
 * l'asset AVIF converti depuis le PNG source. Les chemins sont statiques et
 * vérifiés par le test de cohérence des données.
 */
export const FONDS_HEROS = {
  accueil: "/textures/fonds-heros/01-01_heros-accueil-desktop.avif",
  ingenierie: "/textures/fonds-heros/01-03_heros-ingenierie-desktop.avif",
  ebenisterie: "/textures/fonds-heros/01-04_heros-ebenisterie-desktop.avif",
  plans: "/textures/fonds-heros/01-05_heros-plans-desktop.avif",
  immobilier: "/textures/fonds-heros/01-06_heros-immobilier-desktop.avif",
  portfolio: "/textures/fonds-heros/01-08_heros-portfolio-desktop.avif",
} as const;

export type CleFondHero = keyof typeof FONDS_HEROS;
