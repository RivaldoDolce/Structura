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

/**
 * Photographie du hero d'accueil (V3 §6.2 « un seul porteur du plan »).
 *
 * Le kit fournit un fond blueprint pour l'accueil : superposé au plan dessiné,
 * il donnait deux représentations concurrentes de la même villa. La photo d'un
 * chantier R+2 réel ouvre le récit sur la preuve — poteaux coulés, armatures en
 * attente — et laisse `PlanDessin` seul porteur du plan.
 *
 * `position` cadre la bande utile (structure montée) plutôt que le ciel et la
 * terre : le sujet reste lisible quand le cadre est rogné par `object-cover`.
 */
export const PHOTO_HERO_ACCUEIL = {
  src: "/photos/chantiers/04-30_hero-accueil-chantier-matin-dore.png",
  alt: "Chantier d'un immeuble R+2 à Yaoundé au petit matin : poteaux coulés, armatures en attente, coffrages et échafaudages en bois sur une terre latéritique.",
  position: "50% 42%",
} as const;
