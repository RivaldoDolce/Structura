import { z } from "zod";

export const demandeAchatSchema = {
  creer: z.object({
    chantierId: z.string().uuid(),
    materiel: z.string().min(1, "Le matériel est requis"),
    quantite: z.string().min(1, "La quantité est requise"),
    unite: z.string().min(1, "L'unité est requise"),
    fournisseur: z.string().optional(),
    coutEstime: z.number().positive().optional(),
    urgence: z.enum(["BASSE", "NORMALE", "HAUTE", "CRITIQUE"]).default("NORMALE"),
    notes: z.string().optional(),
  }),
};
