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

// Motion a besoin de requestAnimationFrame, absent de jsdom.
if (typeof globalThis.requestAnimationFrame !== "function") {
  globalThis.requestAnimationFrame = (rappel: FrameRequestCallback): number =>
    setTimeout(() => rappel(performance.now()), 0) as unknown as number;
  globalThis.cancelAnimationFrame = (id: number): void => clearTimeout(id);
}

// Motion whileInView repose sur IntersectionObserver, absent de jsdom :
// on signale tout observé comme visible pour tester le rendu final.
if (typeof globalThis.IntersectionObserver !== "function") {
  class ObservateurImmediat implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    private rappel: IntersectionObserverCallback;

    constructor(rappel: IntersectionObserverCallback) {
      this.rappel = rappel;
    }

    observe(cible: Element): void {
      this.rappel([{ isIntersecting: true, target: cible } as IntersectionObserverEntry], this);
    }

    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  globalThis.IntersectionObserver = ObservateurImmediat as unknown as typeof IntersectionObserver;
}
