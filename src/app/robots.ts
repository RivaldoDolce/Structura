import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/constants/site";

// Espaces privés et techniques exclus de l'indexation : comptes clients,
// back-office chantier, admin et API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/compte", "/gestion", "/admin", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
