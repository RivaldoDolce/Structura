"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Calculator, Ruler, Wrench, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/frontend/lib/cn";

// Règles alignées sur le tunnel : téléphone d'abord, email facultatif.
const schemaDevis = z.object({
  typeProjet: z.string().min(1, "Sélectionnez un type de projet."),
  description: z
    .string()
    .min(10, "Décrivez votre projet en quelques mots (10 caractères minimum).")
    .max(2000, "Description trop longue, contactez-nous directement."),
  telephone: z.string().regex(/^6\d{8}$/, "Entrez un numéro à 9 chiffres, ex. 6 90 00 00 00."),
  email: z.string().email("Entrez un email valide.").optional().or(z.literal("")),
  whatsapp: z.boolean(),
});

type DonneesDevis = z.infer<typeof schemaDevis>;

export interface DevisWizardProps {
  onSubmit: (
    donnees: DonneesDevis & { reference: string }
  ) => Promise<{ ok: boolean; reference?: string }>;
  className?: string;
}

interface DonneesSauvegardees {
  typeProjet?: unknown;
  description?: unknown;
  telephone?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  etape?: unknown;
}

const CLE_STOCKAGE = "devis-wizard";
const NOMS_ETAPES = ["Type de projet", "Besoin", "Coordonnées"] as const;

const TYPES_PROJET: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  icone: LucideIcon;
}> = [
  {
    id: "construction-neuve",
    label: "Construction neuve",
    description: "Villa, immeuble, bâtiment commercial",
    icone: Building2,
  },
  {
    id: "renovation",
    label: "Rénovation",
    description: "Réhabilitation, extension, mise aux normes",
    icone: Wrench,
  },
  {
    id: "extension",
    label: "Extension",
    description: "Agrandissement, surélévation",
    icone: Ruler,
  },
  {
    id: "etude-structure",
    label: "Étude de structure",
    description: "Calculs, ferraillage, diagnostic",
    icone: Calculator,
  },
];

// Tunnel de devis en 3 écrans : la référence définitive est attribuée par le
// serveur, le client n'émet qu'un brouillon horodaté.
export function DevisWizard({ onSubmit, className }: DevisWizardProps) {
  const [etape, setEtape] = useState(0);
  const [envoi, setEnvoi] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, trigger, formState } = useForm<DonneesDevis>({
    resolver: zodResolver(schemaDevis),
    mode: "onBlur",
    defaultValues: { typeProjet: "", description: "", telephone: "", email: "", whatsapp: true },
  });
  const { errors } = formState;
  const typeProjet = watch("typeProjet");
  const nomEtape = NOMS_ETAPES[etape] ?? "";

  // Reprise d'une saisie interrompue, sans jamais faire échouer le rendu.
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(CLE_STOCKAGE);
      if (!brut) return;
      const donnees = JSON.parse(brut) as DonneesSauvegardees;
      if (typeof donnees.typeProjet === "string") setValue("typeProjet", donnees.typeProjet);
      if (typeof donnees.description === "string") setValue("description", donnees.description);
      if (typeof donnees.telephone === "string") setValue("telephone", donnees.telephone);
      if (typeof donnees.email === "string") setValue("email", donnees.email);
      if (typeof donnees.whatsapp === "boolean") setValue("whatsapp", donnees.whatsapp);
      if (typeof donnees.etape === "number")
        setEtape(Math.max(0, Math.min(2, Math.floor(donnees.etape))));
    } catch {
      // Stockage indisponible ou corrompu : le visiteur recommence à l'étape 1.
    }
  }, [setValue]);

  const memorise = useCallback((donnees: Partial<DonneesDevis>, etapeCourante: number) => {
    try {
      window.localStorage.setItem(
        CLE_STOCKAGE,
        JSON.stringify({
          typeProjet: donnees.typeProjet,
          description: donnees.description,
          telephone: donnees.telephone,
          email: donnees.email,
          whatsapp: donnees.whatsapp,
          etape: etapeCourante,
        })
      );
    } catch {
      // Navigation privée ou quota atteint : la saisie continue sans reprise.
    }
  }, []);

  const allerAEtape = useCallback(
    (suivante: number) => {
      setEtape(suivante);
      memorise(watch(), suivante);
    },
    [memorise, watch]
  );

  // Chaque écran ne valide que ses propres champs, sinon l'étape 1 resterait bloquée.
  const suivant = useCallback(async () => {
    const valide = await trigger(etape === 0 ? "typeProjet" : "description");
    if (valide) allerAEtape(etape + 1);
  }, [allerAEtape, etape, trigger]);

  const retour = useCallback(() => allerAEtape(etape - 1), [allerAEtape, etape]);

  const transmet = useCallback(
    async (donnees: DonneesDevis) => {
      setEnvoi(true);
      try {
        const annee = new Date().getFullYear();
        const brouillon = `DV-${annee}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`;
        const resultat = await onSubmit({ ...donnees, reference: brouillon });
        if (resultat.ok) {
          setReference(resultat.reference ?? brouillon);
          try {
            window.localStorage.removeItem(CLE_STOCKAGE);
          } catch {
            // Nettoyage facultatif, l'envoi a déjà réussi.
          }
        }
      } finally {
        setEnvoi(false);
      }
    },
    [onSubmit]
  );

  if (reference) {
    return (
      <div className={cn("mx-auto max-w-lg text-center", className)}>
        <div className="rounded-card border-ok bg-surface border p-8">
          <div
            aria-hidden="true"
            className="bg-ok/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-ok h-8 w-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-display text-ink text-2xl font-bold">Devis envoyé avec succès !</h2>
          <p className="text-ink-soft mt-4">
            Votre référence :{" "}
            <span className="text-blueprint font-mono font-semibold">{reference}</span>
          </p>
          <p className="text-ink-soft mt-4">
            Nous vous répondrons <strong>sous 24 h ouvrées</strong> par WhatsApp ou téléphone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-2xl", className)}>
      <p role="status" className="sr-only">
        Étape {etape + 1} sur 3 : {nomEtape}
      </p>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-mono-xs text-ink-mute font-mono uppercase">
            Étape {etape + 1} sur 3
          </span>
          <span className="text-blueprint font-mono text-xs uppercase">{nomEtape}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Progression du devis"
          aria-valuenow={Math.round(((etape + 1) / 3) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="bg-elevated h-2 w-full overflow-hidden rounded-full"
        >
          <div
            aria-hidden="true"
            style={{ width: `${((etape + 1) / 3) * 100}%` }}
            className="from-steel to-blueprint h-full bg-gradient-to-r transition-all duration-300"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(transmet)} className="space-y-6">
        {etape === 0 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-ink text-xl font-semibold">
                Quel est votre projet ?
              </h2>
              <p className="text-ink-soft mt-2 text-sm">
                Sélectionnez le type qui correspond le mieux à votre besoin.
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Type de projet"
              className="grid gap-4 sm:grid-cols-2"
            >
              {TYPES_PROJET.map((type) => {
                const selectionne = typeProjet === type.id;
                const Icone = type.icone;
                return (
                  <button
                    key={type.id}
                    type="button"
                    role="radio"
                    aria-checked={selectionne}
                    data-selected={selectionne}
                    onClick={() => setValue("typeProjet", type.id, { shouldValidate: true })}
                    className={cn(
                      "rounded-card focus-visible:ring-blueprint relative border-2 p-6 text-left transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                      selectionne
                        ? "border-blueprint bg-blueprint/10"
                        : "border-line bg-surface hover:border-steel"
                    )}
                  >
                    <Icone aria-hidden="true" className="text-blueprint h-8 w-8" />
                    <span className="font-display text-ink mt-3 block text-lg font-semibold">
                      {type.label}
                    </span>
                    <span className="text-ink-soft mt-1 block text-sm">{type.description}</span>
                  </button>
                );
              })}
            </div>
            {errors.typeProjet ? (
              <p role="alert" className="text-danger text-sm">
                {errors.typeProjet.message}
              </p>
            ) : null}
          </div>
        ) : null}

        {etape === 1 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-ink text-xl font-semibold">Décrivez votre besoin</h2>
              <p className="text-ink-soft mt-2 text-sm">
                Plus vous êtes précis, plus notre réponse sera adaptée.
              </p>
            </div>
            <div>
              <label
                htmlFor="devis-description"
                className="text-ink mb-2 block text-sm font-medium"
              >
                Décrivez votre besoin
              </label>
              <textarea
                id="devis-description"
                rows={4}
                aria-required="true"
                aria-invalid={Boolean(errors.description)}
                aria-describedby="devis-description-aide"
                placeholder="Ex : villa duplex de 200 m² à Odza, terrain déjà acquis."
                {...register("description")}
                className={cn(
                  "rounded-control bg-surface text-ink placeholder:text-ink-mute focus-visible:ring-steel w-full border px-4 py-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  errors.description ? "border-danger" : "border-line-strong"
                )}
              />
              <p id="devis-description-aide" className="text-ink-mute mt-2 text-xs">
                Bâtiment, surface, localisation, contraintes particulières.
              </p>
              {errors.description ? (
                <p role="alert" className="text-danger mt-2 text-sm">
                  {errors.description.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="devis-fichiers" className="text-ink mb-2 block text-sm font-medium">
                Documents complémentaires (optionnel)
              </label>
              <input
                id="devis-fichiers"
                type="file"
                multiple
                accept="image/*,.pdf"
                className="rounded-control border-line-strong bg-surface text-ink-soft file:rounded-control file:bg-elevated file:text-ink w-full border border-dashed px-4 py-3 text-sm file:mr-3 file:border-0 file:px-3 file:py-1 file:text-sm"
              />
              <p className="text-ink-mute mt-2 text-xs">Plans, photos du terrain, croquis.</p>
            </div>
          </div>
        ) : null}

        {etape === 2 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-ink text-xl font-semibold">Vos coordonnées</h2>
              <p className="text-ink-soft mt-2 text-sm">Nous vous répondrons sous 24 h ouvrées.</p>
            </div>
            <div>
              <label htmlFor="devis-telephone" className="text-ink mb-2 block text-sm font-medium">
                Téléphone
              </label>
              <input
                id="devis-telephone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="6 90 00 00 00"
                aria-required="true"
                aria-invalid={Boolean(errors.telephone)}
                aria-describedby="devis-telephone-aide"
                {...register("telephone")}
                className={cn(
                  "rounded-control bg-surface text-ink placeholder:text-ink-mute focus-visible:ring-steel w-full border px-4 py-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  errors.telephone ? "border-danger" : "border-line-strong"
                )}
              />
              <p id="devis-telephone-aide" className="text-ink-mute mt-2 text-xs">
                Numéro camerounais à 9 chiffres commençant par 6.
              </p>
              {errors.telephone ? (
                <p role="alert" className="text-danger mt-2 text-sm">
                  {errors.telephone.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="devis-email" className="text-ink mb-2 block text-sm font-medium">
                Email (optionnel)
              </label>
              <input
                id="devis-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="votre@email.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
                className={cn(
                  "rounded-control bg-surface text-ink placeholder:text-ink-mute focus-visible:ring-steel w-full border px-4 py-3 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  errors.email ? "border-danger" : "border-line-strong"
                )}
              />
              {errors.email ? (
                <p role="alert" className="text-danger mt-2 text-sm">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="flex items-start gap-3">
              <input
                id="devis-whatsapp"
                type="checkbox"
                {...register("whatsapp")}
                className="border-line-strong accent-whatsapp mt-1 h-5 w-5 shrink-0 rounded"
              />
              <div>
                <label htmlFor="devis-whatsapp" className="text-ink text-sm font-medium">
                  Me contacter par WhatsApp
                </label>
                <p className="text-ink-mute mt-1 text-xs">
                  Canal privilégié pour le Cameroun et la diaspora.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-6">
          {etape > 0 ? (
            <button
              type="button"
              onClick={retour}
              className="rounded-control border-line-strong text-ink hover:bg-elevated focus-visible:ring-blueprint inline-flex h-12 items-center border px-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Retour
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          {etape < 2 ? (
            <button
              type="button"
              onClick={suivant}
              className="rounded-control bg-steel hover:bg-steel-deep focus-visible:ring-blueprint inline-flex h-12 items-center px-8 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              disabled={envoi}
              aria-busy={envoi}
              className="rounded-control bg-safety text-fond hover:bg-safety-deep focus-visible:ring-blueprint inline-flex h-12 items-center px-8 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50"
            >
              {envoi ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </form>

      <div className="rounded-control bg-elevated mt-8 p-4">
        <p className="text-ink-soft text-sm">
          Vos données restent confidentielles. Réponse garantie sous 24 h ouvrées.
        </p>
      </div>
    </div>
  );
}
