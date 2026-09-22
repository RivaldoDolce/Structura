import type { MetadataRoute } from "next";
import { PLANS } from "@/frontend/data/plans";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import { SITE_URL } from "@/shared/constants/site";

// Vitrine + conversion + tunnel devis : le sitemap ne liste que le public,
// jamais /compte, /gestion, /admin ni /api (voir robots.ts).
const ROUTES_STATIQUES = [
  "",
  "/ingenierie",
  "/ebenisterie",
  "/plans",
  "/portfolio",
  "/immobilier",
  "/a-propos",
  "/contact",
  "/devis",
  "/legal/mentions-legales",
  "/legal/cgv",
  "/legal/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  const statiques: MetadataRoute.Sitemap = ROUTES_STATIQUES.map((route) => ({
    url: `${SITE_URL}${route === "" ? "" : route}`,
    lastModified: maintenant,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const plans: MetadataRoute.Sitemap = PLANS.map((plan) => ({
    url: `${SITE_URL}/plans/${plan.reference}`,
    lastModified: maintenant,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const portfolio: MetadataRoute.Sitemap = PROJETS_PORTFOLIO.map((projet) => ({
    url: `${SITE_URL}/portfolio/${projet.slug}`,
    lastModified: maintenant,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...statiques, ...plans, ...portfolio];
}
