export const ROLES = {
  CLIENT: { label: "Client", description: "Accès à l'espace client" },
  CHEF_DE_PROJET: { label: "Chef de projet", description: "Gestion de chantiers" },
  ADMIN: { label: "Administrateur", description: "Gestion complète de la plateforme" },
  SUPER_ADMIN: { label: "Super administrateur", description: "Contrôle total" },
} as const;

export type RoleKey = keyof typeof ROLES;

export const ROLE_HIERARCHY: Record<RoleKey, number> = {
  CLIENT: 0,
  CHEF_DE_PROJET: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

export function hasMinimumRole(userRole: RoleKey, requiredRole: RoleKey): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
