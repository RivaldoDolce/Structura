import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Content-Security-Policy",
          // Les sources de paiement sont déjà prévues mais aucun script n'est
          // chargé aujourd'hui : elles restent référencées pour le tunnel prévu.
          value: [
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"
            } https://js.cinetpay.com`,
            "style-src 'self' 'unsafe-inline'",
            // Joker CSP uniquement en préfixe de domaine : `pub-*.r2.dev` est
            // une source invalide que le navigateur ignore silencieusement.
            "img-src 'self' blob: data: https://*.r2.cloudflarestorage.com https://*.r2.dev",
            "font-src 'self'",
            "connect-src 'self' https://api.cinetpay.com https://*.upstash.io",
            "frame-src https://api.cinetpay.com",
          ].join("; "),
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: "/compte",
      destination: "/compte/connexion",
      permanent: false,
    },
  ],
};

export default nextConfig;
