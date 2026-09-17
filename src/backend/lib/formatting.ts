/**
 * Formater un montant en FCFA
 * @param montant - Montant en FCFA (Decimal ou number)
 * @returns String formaté : "150 000 FCFA"
 */
export function formatFcfa(montant: number | bigint): string {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(montant)
    .replace("FCFA", "FCFA");
}

/**
 * Formater un montant en euros
 * @param montantFcfa - Montant en FCFA
 * @returns String formaté : "≈ 229 €"
 */
export function formatEuros(montantFcfa: number): string {
  const taux = 653.855; // 1 EUR = 653.855 FCFA (XAF)
  const euros = montantFcfa / taux;
  return `≈ ${new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros)}`;
}

/**
 * Formater un numéro de téléphone camerounais
 * @param telephone - Numéro brut
 * @returns String formaté : "+237 6XX XXX XXX"
 */
export function formatTelephone(telephone: string): string {
  const cleaned = telephone.replace(/\D/g, "");
  if (cleaned.startsWith("237")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  return `+237 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
}

/**
 * Formater une date en heure d'Afrique Centrale (WAT, UTC+1)
 * @param date - Date à formater
 * @param options - Options de formatage
 */
export function formatDateCameroun(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-CM", {
    timeZone: "Africa/Douala",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  });
}

/**
 * Générer une référence unique
 * @param prefix - Préfixe (ex: "PL", "CMD", "DEV")
 * @param annee - Année
 * @param numero - Numéro séquentiel
 * @returns Référence au format "PL-2025-014"
 */
export function genererReference(prefix: string, annee: number, numero: number): string {
  return `${prefix}-${annee}-${String(numero).padStart(3, "0")}`;
}
