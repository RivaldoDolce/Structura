import "@testing-library/jest-dom/vitest";

// jsdom ne fournit pas matchMedia : simulacre global, chaque test reste
// libre de le remplacer pour simuler les animations réduites.
Object.defineProperty(window, "matchMedia", {
  configurable: true,
  writable: true,
  value: (requete: string) => ({
    matches: false,
    media: requete,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});
