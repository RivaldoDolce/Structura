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
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.cinetpay.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' blob: data: https://*.r2.cloudflarestorage.com https://pub-*.r2.dev",
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
