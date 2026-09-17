import { z } from "zod";

export const incidentSchema = {
  declarer: z.object({
    chantierId: z.string().uuid(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    type: z.string().min(1, "Le type d'incident est requis"),
    description: z.string().min(1, "La description est requise"),
    gravite: z.string().min(1, "La gravité est requise"),
    blesses: z.number().int().min(0).default(0),
    mesures: z.string().optional(),
    mediaUrls: z.array(z.string().url()).optional(),
  }),
};
