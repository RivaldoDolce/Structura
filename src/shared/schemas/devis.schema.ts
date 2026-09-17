import { z } from "zod";

export const devisSchema = {
  creer: z.object({
    type: z.enum(["INGENIERIE", "EBENISTERIE", "IMMOBILIER"]),
    nom: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide").optional(),
    telephone: z.string().optional(),
    description: z.string().optional(),
    superficieM2: z.number().positive().optional(),
    nbNiveaux: z.number().int().positive().optional(),
    details: z.record(z.unknown()).optional(),
  }),
};
