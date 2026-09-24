/**
 * Vocabulaire de lumière du rééquilibre V2 (« Atelier vivant »).
 *
 * Une section ne choisit pas des classes au hasard : elle déclare *où elle se
 * trouve dans la lumière* — sombre, ivoire, pâle ou chaude — et reçoit son ton
 * complet (fond, titres, textes, accent, filets, cartouche, bouton, puce).
 * C'est ce qui garantit qu'un acte clair reste lisible et cohérent partout,
 * sans qu'aucune composition ne réinvente ses couleurs.
 *
 * Contrats de contraste (mesurés sur les tokens réels de `globals.css`) :
 * `encre` sur `paper` ≥ 12:1, `encre-soft` sur `paper` ≥ 7:1,
 * `steel-encre` sur `paper` ≥ 7:1 (accent de donnée des actes clairs, un peu
 * plus appuyé que le `steel-deep` historique à ≈ 6,5:1), `cuivre` réservé aux
 * filets et badges, jamais au texte courant.
 */
export type Lumiere = "sombre" | "ivoire" | "pale" | "warm";

/** Variantes de `ButtonTech` lisibles sur une lumière donnée. */
export type VarianteBouton = "primary" | "conversion" | "ghost" | "encre";

/** Ton du cartouche (`Kicker`) et des étiquettes mono posées sur la lumière. */
export type TonCartouche = "sombre" | "clair";

export interface TonLumiere {
  /** Classes de fond de la section, avec sa couleur de texte racine. */
  fond: string;
  /** Titres, valeurs et chiffres. */
  titre: string;
  /** Texte secondaire, contraste AA garanti sur ce fond. */
  texte: string;
  /** Accent de donnée : cyan sur sombre, bleu profond sur clair. */
  accent: string;
  /** Filets internes (tableaux, séparateurs, bordures de bandeaux). */
  filet: string;
  /** Lien d'action en ligne, avec son survol. */
  lien: string;
  /** Symbole de livrable validé. */
  puce: string;
  /** Cartouche de section, adapté au fond. */
  cartouche: TonCartouche;
  /** Variante de bouton native de cette lumière. */
  bouton: VarianteBouton;
  /** Vrai si le fond est clair : les narrations photo s'y fusions différemment. */
  claire: boolean;
}

/**
 * Tons par lumière. `sombre` et `warm` partagent la famille ink (leurs fonds
 * sont sombres) mais pas leur accent ; `ivoire` et `pale` partagent la famille
 * encre et ne diffèrent que par la profondeur du papier.
 */
const TONS: Record<Lumiere, TonLumiere> = {
  sombre: {
    fond: "bg-fond",
    titre: "text-ink",
    texte: "text-ink-soft",
    accent: "text-blueprint",
    filet: "border-line",
    lien: "text-ink hover:text-blueprint",
    puce: "text-ok",
    cartouche: "sombre",
    bouton: "primary",
    claire: false,
  },
  ivoire: {
    fond: "st-ivoire text-encre",
    titre: "text-encre",
    texte: "text-encre-soft",
    accent: "text-steel-encre",
    filet: "border-line-encre",
    lien: "text-encre hover:text-steel-encre",
    puce: "text-ok-deep",
    cartouche: "clair",
    bouton: "encre",
    claire: true,
  },
  pale: {
    fond: "st-pale text-encre",
    titre: "text-encre",
    texte: "text-encre-soft",
    accent: "text-steel-encre",
    filet: "border-line-encre-strong",
    lien: "text-encre hover:text-steel-encre",
    puce: "text-ok-deep",
    cartouche: "clair",
    bouton: "encre",
    claire: true,
  },
  warm: {
    fond: "st-warm",
    titre: "text-ink",
    texte: "text-ink-soft",
    accent: "text-sable",
    filet: "border-line",
    lien: "text-ink hover:text-sable",
    puce: "text-ok",
    cartouche: "sombre",
    bouton: "conversion",
    claire: false,
  },
};

/** Ordre de référence du récit, du plus sombre au plus chaud. */
export const LUMIERES: readonly Lumiere[] = ["sombre", "ivoire", "pale", "warm"];

/** Ton complet d'une lumière, prêt à consommer dans un `cn()`. */
export const tonDe = (lumiere: Lumiere): TonLumiere => TONS[lumiere];

/** Vrai si la lumière est claire (papier), faux si son fond est sombre. */
export const estClaire = (lumiere: Lumiere): boolean => TONS[lumiere].claire;

/**
 * Garde d'alternance : deux bandes voisines ne partagent jamais la même
 * lumière. C'est la règle de perception du rééquilibre, vérifiée sur le rendu
 * réel de chaque page.
 */
export function alternanceRespectee(lumieres: readonly string[]): boolean {
  return lumieres.every((lumiere, index) => index === 0 || lumiere !== lumieres[index - 1]);
}
