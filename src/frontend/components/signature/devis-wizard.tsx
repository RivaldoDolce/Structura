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
    donnees: DonneesDevis & { reference: string },
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

  const { register, handleSubmit, watch, setValue, trigger, formState } =
    useForm<DonneesDevis>({
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

  const memorise = useCallback(
    (donnees: Partial<DonneesDevis>, etapeCourante: number) => {
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
          }),
        );
      } catch {
        // Navigation privée ou quota atteint : la saisie continue sans reprise.
      }
    },
    [],
  );

  const allerAEtape = useCallback(
    (suivante: number) => {
      setEtape(suivante);
      memorise(watch(), suivante);
    },
    [memorise, watch],
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
    [onSubmit],
  );

  if (reference) {
    return (
      <div className={cn("mx-auto max-w-lg text-center", className)}>
        <div className="rounded-card border border-[var(--color-ok)] bg-[var(--color-surface)] p-8">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ok)]/20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-8 w-8 text-[var(--color-ok)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)]">
            Devis envoyé avec succès !
          </h2>
          <p className="mt-4 text-[var(--color-ink-soft)]">
            Votre référence :{" "}
            <span className="font-mono font-semibold text-[var(--color-blueprint)]">
              {reference}
            </span>
          </p>
          <p className="mt-4 text-[var(--color-ink-soft)]">
            Nous vous répondrons <strong>sous 24 h ouvrées</strong> par WhatsApp ou
            téléphone.
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
          <span className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
            Étape {etape + 1} sur 3
          </span>
          <span className="font-mono text-xs uppercase text-[var(--color-blueprint)]">
            {nomEtape}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Progression du devis"
          aria-valuenow={Math.round(((etape + 1) / 3) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-elevated)]"
        >
          <div
            aria-hidden="true"
            style={{ width: `${((etape + 1) / 3) * 100}%` }}
            className="h-full bg-gradient-to-r from-[var(--color-steel)] to-[var(--color-blueprint)] transition-all duration-300"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(transmet)} className="space-y-6">
        {etape === 0 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Quel est votre projet ?
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Sélectionnez le type qui correspond le mieux à votre besoin.
              </p>
            </div>
            <div role="radiogroup" aria-label="Type de projet" className="grid gap-4 sm:grid-cols-2">
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
                      "relative rounded-card border-2 p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2",
                      selectionne
                        ? "border-[var(--color-blueprint)] bg-[var(--color-blueprint)]/10"
                        : "border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-steel)]",
                    )}
                  >
                    <Icone aria-hidden="true" className="h-8 w-8 text-[var(--color-blueprint)]" />
                    <span className="mt-3 block font-display text-lg font-semibold text-[var(--color-ink)]">
                      {type.label}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--color-ink-soft)]">
                      {type.description}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.typeProjet ? (
              <p role="alert" className="text-sm text-[var(--color-danger)]">
                {errors.typeProjet.message}
              </p>
            ) : null}
          </div>
        ) : null}

        {etape === 1 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Décrivez votre besoin
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Plus vous êtes précis, plus notre réponse sera adaptée.
              </p>
            </div>
            <div>
              <label
                htmlFor="devis-description"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
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
                  "w-full rounded-control border bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)] focus-visible:ring-offset-2",
                  errors.description
                    ? "border-[var(--color-danger)]"
                    : "border-[var(--color-line-strong)]",
                )}
              />
              <p id="devis-description-aide" className="mt-2 text-xs text-[var(--color-ink-mute)]">
                Bâtiment, surface, localisation, contraintes particulières.
              </p>
              {errors.description ? (
                <p role="alert" className="mt-2 text-sm text-[var(--color-danger)]">
                  {errors.description.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="devis-fichiers"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
                Documents complémentaires (optionnel)
              </label>
              <input
                id="devis-fichiers"
                type="file"
                multiple
                accept="image/*,.pdf"
                className="w-full rounded-control border border-dashed border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink-soft)] file:mr-3 file:rounded-control file:border-0 file:bg-[var(--color-elevated)] file:px-3 file:py-1 file:text-sm file:text-[var(--color-ink)]"
              />
              <p className="mt-2 text-xs text-[var(--color-ink-mute)]">
                Plans, photos du terrain, croquis.
              </p>
            </div>
          </div>
        ) : null}

        {etape === 2 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Vos coordonnées
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Nous vous répondrons sous 24 h ouvrées.
              </p>
            </div>
            <div>
              <label
                htmlFor="devis-telephone"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
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
                  "w-full rounded-control border bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)] focus-visible:ring-offset-2",
                  errors.telephone
                    ? "border-[var(--color-danger)]"
                    : "border-[var(--color-line-strong)]",
                )}
              />
              <p id="devis-telephone-aide" className="mt-2 text-xs text-[var(--color-ink-mute)]">
                Numéro camerounais à 9 chiffres commençant par 6.
              </p>
              {errors.telephone ? (
                <p role="alert" className="mt-2 text-sm text-[var(--color-danger)]">
                  {errors.telephone.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="devis-email"
                className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
              >
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
                  "w-full rounded-control border bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] transition-colors placeholder:text-[var(--color-ink-mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)] focus-visible:ring-offset-2",
                  errors.email ? "border-[var(--color-danger)]" : "border-[var(--color-line-strong)]",
                )}
              />
              {errors.email ? (
                <p role="alert" className="mt-2 text-sm text-[var(--color-danger)]">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="flex items-start gap-3">
              <input
                id="devis-whatsapp"
                type="checkbox"
                {...register("whatsapp")}
                className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--color-line-strong)] accent-[var(--color-whatsapp)]"
              />
              <div>
                <label htmlFor="devis-whatsapp" className="text-sm font-medium text-[var(--color-ink)]">
                  Me contacter par WhatsApp
                </label>
                <p className="mt-1 text-xs text-[var(--color-ink-mute)]">
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
              className="inline-flex h-12 items-center rounded-control border border-[var(--color-line-strong)] px-8 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2"
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
              className="inline-flex h-12 items-center rounded-control bg-[var(--color-steel)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--color-steel-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              disabled={envoi}
              aria-busy={envoi}
              className="inline-flex h-12 items-center rounded-control bg-[var(--color-safety)] px-8 text-sm font-semibold text-[var(--color-base)] transition-colors hover:bg-[var(--color-safety-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {envoi ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 rounded-control bg-[var(--color-elevated)] p-4">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Vos données restent confidentielles. Réponse garantie sous 24 h ouvrées.
        </p>
      </div>
    </div>
  );
}
