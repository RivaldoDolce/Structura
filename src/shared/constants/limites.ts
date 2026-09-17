export const LIMITES = {
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    maxFiles: 10,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  },
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  plan: {
    maxTelechargements: 3,
    dureeLienExpiry: 24 * 60 * 60 * 1000, // 24 hours in ms
  },
  devis: {
    dureeValidite: 30, // days
  },
} as const;
