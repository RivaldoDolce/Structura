import { z } from "zod";

export const commandeSchema = {
  creer: z.object({
    type: z.enum(["PLAN", "MEUBLE", "ACOMPTE_CHANTIER"]),
    referenceArticle: z.string().optional(),
    montantTotalFcfa: z.number().positive("Le montant doit être positif"),
    details: z.record(z.unknown()).optional(),
  }),
};
