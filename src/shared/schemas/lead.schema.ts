import { z } from "zod";

export const leadSchema = {
  creer: z.object({
    nom: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide").optional(),
    telephone: z.string().optional(),
    source: z.enum([
      "SITE_WEB",
      "WHATSAPP",
      "TELEPHONE",
      "RESEAUX_SOCIAUX",
      "REFERENCE",
      "BOUTIQUE",
    ]),
    notes: z.string().optional(),
  }),

  ajouterActivite: z.object({
    leadId: z.string().uuid(),
    type: z.string().min(1, "Le type est requis"),
    contenu: z.string().min(1, "Le contenu est requis"),
    auteur: z.string().optional(),
  }),
};
