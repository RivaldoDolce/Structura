import { z } from "zod";

export const rapportSchema = {
  creer: z.object({
    chantierId: z.string().uuid(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    meteo: z.string().optional(),
    effectif: z.number().int().positive("L'effectif doit être positif"),
    avancement: z.string().optional(),
    travaux: z.string().min(1, "La description des travaux est requise"),
    observations: z.string().optional(),
    mediaUrls: z.array(z.string().url()).optional(),
  }),
};
