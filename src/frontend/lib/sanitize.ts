/**
 * Assainissement des valeurs client utilisées pour construire des liens
 * externes (wa.me, tel, mailto) ou des étiquettes de provenance.
 *
 * Chaque fonction retourne `null` plutôt qu'une valeur fragilisée : c'est à
 * l'appelant de décider du repli, jamais ce module de deviner un contenu.
 */

/** Longueur maximale d'un message pré-rempli, au-delà le wa.me est refusé. */
const LONGUEUR_MESSAGE_MAX = 400;

/** Longueur maximale d'une référence de page (utile à la relecture des leads). */
const LONGUEUR_REFERENCE_MAX = 100;

/**
 * Normalise un numéro au format international attendu par wa.me : chiffres
 * seuls avec `+` initial si l'appelant le fournit. Tout autre caractère
 * (espaces, tirets, parenthèses) est éliminé.
 */
export function numeroInternational(valeur: string): string | null {
  const chiffres = valeur.replace(/\D/g, "");
  return chiffres ? `+${chiffres}` : null;
}

/**
 * Borde un texte destiné à un message pré-rempli. Le contenu reste libre
 * (apostrophes, accents, tirets) : l'encodage URL est fait par `encodeURIComponent`
 * au point d'usage, ce module garantit seulement la longueur.
 */
export function texteMessage(valeur: string, limite = LONGUEUR_MESSAGE_MAX): string {
  return valeur.slice(0, Math.max(0, limite));
}

/**
 * Étiquette de page passée dans un message de contact : une seule ligne,
 * longueur bornée, aucun caractère de contrôle. Retourne `null` si la valeur
 * ne peut pas être rendue sûre.
 */
export function etiquetePage(valeur: string): string | null {
  if (!valeur || valeur.length > LONGUEUR_REFERENCE_MAX) return null;
  if (/[\r\n\u0000-\u001f\u007f]/.test(valeur)) return null;
  return valeur;
}