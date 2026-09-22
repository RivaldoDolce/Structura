/**
 * Vocabulaire unique des statuts de jalon, partagé par le suivi de chantier
 * (signature) et sa vitrine d'accueil. Le contrat couleur de l'audit §5.3 est
 * centralisé ici : « terminé » vert, « en retard » orange (attention),
 * « bloqué » rouge. Le libellé et le symbole voyagent toujours avec la
 * couleur, une information ne repose jamais sur la seule teinte.
 */
export const STATUTS_JALON = [
  "termine",
  "en-cours",
  "en-validation",
  "a-venir",
  "en-retard",
  "bloque",
] as const;

export type StatutJalon = (typeof STATUTS_JALON)[number];

export interface PresentationStatut {
  /** Libellé écrit, jamais remplacé par la couleur. */
  libelle: string;
  /** Symbole textuel : lisible sans distinguer les teintes. */
  symbole: string;
  /** Classes de texte et de bordure. */
  classes: string;
  /** Classe du nœud sur le rail. */
  classesPoint: string;
  /** Vrai quand l'étape mobilise encore l'équipe ou le client. */
  actif: boolean;
}

const PRESENTATIONS: Record<StatutJalon, PresentationStatut> = {
  termine: {
    libelle: "Terminé",
    symbole: "✓",
    classes: "text-ok border-ok/40",
    classesPoint: "border-ok bg-ok text-fond",
    actif: false,
  },
  "en-cours": {
    libelle: "En cours",
    symbole: "▶",
    classes: "text-steel border-steel/40",
    classesPoint: "border-steel bg-steel text-white",
    actif: true,
  },
  "en-validation": {
    libelle: "En validation",
    symbole: "?",
    classes: "text-blueprint border-blueprint/40",
    classesPoint: "border-blueprint bg-surface-blueprint text-blueprint",
    actif: true,
  },
  "a-venir": {
    libelle: "À venir",
    symbole: "○",
    classes: "text-ink-mute border-line",
    classesPoint: "border-line-strong bg-surface text-ink-mute",
    actif: false,
  },
  "en-retard": {
    libelle: "En retard",
    symbole: "!",
    classes: "text-safety border-safety/40",
    classesPoint: "border-safety bg-safety text-fond",
    actif: true,
  },
  bloque: {
    libelle: "Bloqué",
    symbole: "×",
    classes: "text-danger border-danger/40",
    classesPoint: "border-danger bg-danger text-white",
    actif: true,
  },
};

export const LIBELLES_STATUT: Record<StatutJalon, string> = Object.fromEntries(
  STATUTS_JALON.map((statut) => [statut, PRESENTATIONS[statut].libelle]),
) as Record<StatutJalon, string>;

export function presentationStatut(statut: StatutJalon): PresentationStatut {
  return PRESENTATIONS[statut];
}
