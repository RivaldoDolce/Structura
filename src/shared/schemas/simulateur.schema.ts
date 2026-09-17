import { z } from "zod";

export const simulateurSchema = {
  estimer: z.object({
    superficieM2: z.number().positive("La superficie doit être positive"),
    nbNiveaux: z.number().int().min(1, "Au moins 1 niveau").max(10, "Maximum 10 niveaux"),
    typeBatiment: z.enum(["villa", "immeuble", "duplex", "commerce", "autre"]),
    typeStructure: z.enum(["beton_arme", "charpente_metal", "bois", "mixte"]).optional(),
  }),
};
