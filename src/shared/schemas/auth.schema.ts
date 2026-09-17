import { z } from "zod";

export const authSchema = {
  inscription: z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().optional(),
    email: z.string().email("Adresse email invalide"),
    telephone: z.string().optional(),
    motDePasse: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    pays: z.string().optional(),
  }),

  connexion: z.object({
    email: z.string().email("Adresse email invalide"),
    motDePasse: z.string().min(1, "Mot de passe requis"),
  }),

  resetPassword: z.object({
    email: z.string().email("Adresse email invalide"),
  }),

  newPassword: z.object({
    token: z.string(),
    motDePasse: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  }),
};
