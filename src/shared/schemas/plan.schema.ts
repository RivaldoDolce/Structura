import { z } from "zod";

export const planSchema = {
  creer: z.object({
    reference: z.string().min(1, "La référence est requise"),
    titre: z.string().min(1, "Le titre est requis"),
    typeBatiment: z.string().min(1, "Le type de bâtiment est requis"),
    superficieM2: z.number().positive().optional(),
    nbNiveaux: z.number().int().positive().optional(),
    nbChambres: z.number().int().positive().optional(),
    nbSallesDeBain: z.number().int().positive().optional(),
    prixFcfa: z.number().positive("Le prix doit être positif"),
    description: z.string().optional(),
    caracteristiques: z.record(z.unknown()).optional(),
  }),

  modifier: z.object({
    id: z.string().uuid(),
    titre: z.string().min(1).optional(),
    typeBatiment: z.string().min(1).optional(),
    superficieM2: z.number().positive().optional(),
    nbNiveaux: z.number().int().positive().optional(),
    nbChambres: z.number().int().positive().optional(),
    prixFcfa: z.number().positive().optional(),
    description: z.string().optional(),
    caracteristiques: z.record(z.unknown()).optional(),
    publie: z.boolean().optional(),
  }),
};
