export const STATUTS_COMMANDE = {
  EN_ATTENTE: { label: "En attente", color: "text-safety" },
  PAYE: { label: "Payé", color: "text-ok" },
  LIVRE: { label: "Livré", color: "text-steel" },
  ANNULE: { label: "Annulé", color: "text-danger" },
  REMBOURSE: { label: "Remboursé", color: "text-ink-mute" },
} as const;

export const STATUTS_TACHE = {
  A_FAIRE: { label: "À faire", color: "text-ink-mute" },
  EN_COURS: { label: "En cours", color: "text-steel" },
  EN_ATTENTE: { label: "En attente", color: "text-safety" },
  TERMINEE: { label: "Terminée", color: "text-ok" },
  ANNULEE: { label: "Annulée", color: "text-danger" },
} as const;

export const PHASESCHANTIER = {
  ETUDE: { label: "Étude", ordre: 0 },
  FONDATIONS: { label: "Fondations", ordre: 1 },
  ELEVATION: { label: "Élévation", ordre: 2 },
  CHARPENTE: { label: "Charpente", ordre: 3 },
  COUVERTURE: { label: "Couverture", ordre: 4 },
  INSTALLATIONS: { label: "Installations", ordre: 5 },
  FINITIONS: { label: "Finitions", ordre: 6 },
  LIVRAISON: { label: "Livraison", ordre: 7 },
} as const;

export const STATUTS_PAIEMENT = {
  EN_ATTENTE: { label: "En attente", color: "text-safety" },
  SUCCES: { label: "Succès", color: "text-ok" },
  ECHEC: { label: "Échec", color: "text-danger" },
  REMBOURSE: { label: "Remboursé", color: "text-ink-mute" },
} as const;

export const MOYENS_PAIEMENT = {
  MTN_MOMO: { label: "MTN Mobile Money", icon: "smartphone" },
  ORANGE_MONEY: { label: "Orange Money", icon: "smartphone" },
  CARTE_BANCAIRE: { label: "Carte bancaire", icon: "credit-card" },
} as const;
