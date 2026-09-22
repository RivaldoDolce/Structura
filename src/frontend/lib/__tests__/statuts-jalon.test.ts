import { describe, expect, it } from "vitest";
import { LIBELLES_STATUT, STATUTS_JALON, presentationStatut } from "../statuts-jalon";

// Le contrat couleur de l'audit §5.3 est vérifié ici une fois pour toutes :
// « terminé » vert, « en retard » orange (attention), « bloqué » rouge, et
// jamais la couleur seule — chaque statut porte aussi son libellé écrit.
describe("Statuts de jalon", () => {
  it("déclare les six états du suivi de chantier", () => {
    expect([...STATUTS_JALON]).toEqual([
      "termine",
      "en-cours",
      "en-validation",
      "a-venir",
      "en-retard",
      "bloque",
    ]);
  });

  it("écrit chaque statut en toutes lettres", () => {
    expect(LIBELLES_STATUT.termine).toBe("Terminé");
    expect(LIBELLES_STATUT["en-cours"]).toBe("En cours");
    expect(LIBELLES_STATUT["en-validation"]).toBe("En validation");
    expect(LIBELLES_STATUT["a-venir"]).toBe("À venir");
    expect(LIBELLES_STATUT["en-retard"]).toBe("En retard");
    expect(LIBELLES_STATUT.bloque).toBe("Bloqué");
  });

  it("applique le contrat couleur : vert terminé, orange retard, rouge bloqué", () => {
    expect(presentationStatut("termine").classes).toContain("text-ok");
    expect(presentationStatut("en-retard").classes).toContain("text-safety");
    expect(presentationStatut("bloque").classes).toContain("text-danger");
  });

  it("distingue les étapes actives de celles qui ne mobilisent personne", () => {
    expect(presentationStatut("en-cours").actif).toBe(true);
    expect(presentationStatut("en-retard").actif).toBe(true);
    expect(presentationStatut("bloque").actif).toBe(true);
    expect(presentationStatut("en-validation").actif).toBe(true);
    expect(presentationStatut("termine").actif).toBe(false);
    expect(presentationStatut("a-venir").actif).toBe(false);
  });

  it("accompagne chaque statut d'un symbole, pour les daltoniens", () => {
    for (const statut of STATUTS_JALON) {
      expect(presentationStatut(statut).symbole.length).toBeGreaterThan(0);
    }
  });
});
