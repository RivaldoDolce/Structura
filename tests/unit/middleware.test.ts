import { describe, expect, it } from "vitest";
import { middleware } from "@/middleware";

// Simulacre minimal de NextRequest : le middleware ne lit que l'URL et les cookies.
function requete(chemin: string, cookies: Record<string, string> = {}) {
  const url = new URL(`https://structura.test${chemin}`);
  return {
    nextUrl: url,
    url: url.toString(),
    cookies: {
      get: (nom: string) => (nom in cookies ? { name: nom, value: cookies[nom] } : undefined),
    },
  } as unknown as Parameters<typeof middleware>[0];
}

describe("middleware d'authentification", () => {
  it("redirige vers la connexion avec callbackUrl quand une route protégée est anonyme", () => {
    const reponse = middleware(requete("/gestion/planning"));

    expect(reponse.status).toBe(307);
    expect(reponse.headers.get("location")).toBe(
      "https://structura.test/compte/connexion?callbackUrl=%2Fgestion%2Fplanning"
    );
  });

  it("laisse passer une session présente sur route protégée", () => {
    const reponse = middleware(requete("/admin", { "authjs.session-token": "jeton" }));

    expect(reponse.status).toBe(200);
  });

  it("laisse le tunnel de devis ouvert aux visiteurs", () => {
    const reponse = middleware(requete("/devis?plan=ST-VILLA-R1-PAD"));

    expect(reponse.status).toBe(200);
    expect(reponse.headers.get("location")).toBeNull();
  });

  it("renvoie un anonyme vers l'accueil depuis une page d'authentification", () => {
    const reponse = middleware(requete("/compte/connexion", { "authjs.session-token": "jeton" }));

    expect(reponse.headers.get("location")).toBe("https://structura.test/compte");
  });

  it("porte les en-têtes de sécurité sur toute réponse", () => {
    const reponse = middleware(requete("/portfolio"));

    expect(reponse.headers.get("x-frame-options")).toBe("DENY");
    expect(reponse.headers.get("x-content-type-options")).toBe("nosniff");
    expect(reponse.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(reponse.headers.get("permissions-policy")).toBe(
      "camera=(), microphone=(), geolocation=()"
    );
  });
});
