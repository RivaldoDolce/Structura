# STRUCTURA

> **L'ingénierie qui construit en confiance**

Plateforme digitale intégrée pour un professionnel à double compétence : **Génie
structural & Conduite de travaux**, avec deux activités complémentaires —
**Ébénisterie d'art** et **Plans & Immobilier**. Basé à Yaoundé, ciblage
prioritaire de la diaspora camerounaise.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Table des matières

- [Vision du produit](#vision-du-produit)
- [Les trois pôles d'activité](#les-trois-pôles-dactivité)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Arborescence](#arborescence)
- [Règles de dépendances](#règles-de-dépendances)
- [Getting started](#getting-started)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Références](#références)

---

## Vision du produit

STRUCTURA n'est pas un site vitrine. C'est un **outil commercial et opérationnel**
qui remplit quatre missions simultanées :

1. **Convaincre en 8 secondes** — Le site démontre la maîtrise technique du
   client, pas seulement l'affirme.
2. **Convertir sans friction** — Chaque page mène vers un acte mesurable : devis,
   achat, WhatsApp, RDV.
3. **Rassurer à distance** — La diaspora a les moyens mais pas la confiance.
   L'espace client répond à la peur n°1 : *« où va mon argent ? »*.
4. **Faire gagner du temps** — Le back-office chantier digitalise le quotidien
   terrain depuis un téléphone.

**Règle d'arbitrage** : Conversion > Crédibilité > Rapidité > Esthétique.

---

## Les trois pôles d'activité

| Pôle | Page racine | Monétisation |
|------|-------------|-------------|
| **Ingénierie & structure** | `/ingenierie` | Prestations par phase (étude → fondations → élévation → finitions) |
| **Ébénisterie d'art** | `/ebenisterie` | Vente directe + sur-mesure (acompte 50%) |
| **Plans & Immobilier** | `/plans`, `/immobilier` | Vente de plans (revenu passif) + commissions |

Ces trois pôles convergent vers un **espace client unique** et un **back-office
unique**.

---

## Stack technique

| Couche | Choix | Justification |
|--------|-------|---------------|
| Framework | Next.js 15 (App Router) | Rendu hybride, API intégrée, un seul déploiement |
| Langage | TypeScript strict | Bugs à la compilation, `strict: true` |
| UI | Tailwind CSS 4 + shadcn/ui | Vitesse, composants accessibles (Radix) |
| Animations | Motion + GSAP + Lenis | Reveals, scroll cinématique, défilement fluide |
| Formulaires | React Hook Form + Zod | Performance, validation partagée client/serveur |
| Base de données | PostgreSQL (Neon) | Relationnel solide, `JSONB` pour champs variables |
| ORM | Prisma 6.x | Migrations versionnées, types auto-générés |
| Auth | Auth.js v5 (NextAuth) | Email/mot de passe + Google prêt, sessions httpOnly |
| Stockage fichiers | Cloudflare R2 | Compatible S3, zéro frais de sortie |
| Paiement | CinetPay SDK JS | MTN MoMo + Orange Money + carte, agrément en place |
| Emails | Resend + React Email | Templates JSX, 100/jour gratuit |
| Cache | Upstash Redis | Serverless, rate limiting + cache |
| Monitoring | Sentry + Vercel Analytics | Erreurs en prod visibles immédiatement |
| Hébergement | Vercel | Déploiement auto, CDN mondial, previews par branche |
| Tests | Vitest + Playwright | Unitaires + E2E sur chemins critiques |
| Qualité | ESLint + Prettier + Husky | Style uniforme, commits bloqués si défectueux |

---

## Architecture du projet

Un seul projet Next.js avec séparation **physique stricte** frontend/backend
à l'intérieur du projet unique :

```
┌──────────────────────────────────────────────────────────────┐
│  UN SEUL PROJET NEXT.JS (un seul déploiement Vercel)         │
│                                                              │
│   src/app/       →  Chef d'orchestre (routes Next.js)        │
│   src/frontend/  →  Tout ce que le client VOIT               │
│   src/backend/   →  Toute la logique qui TOURNE               │
│   src/shared/    →  Le contrat entre les deux                │
│                                                              │
│   Règle : app/ importe depuis frontend/ et backend/          │
│           frontend/ n'appelle JAMAIS backend/ directement    │
│           (il passe par les Server Actions)                  │
└──────────────────────────────────────────────────────────────┘
```

| Dossier | Rôle | Contenu | Interdit |
|---------|------|---------|----------|
| `src/app/` | Chef d'orchestre | Routes, layouts, pages, API | Logique métier inline |
| `src/frontend/` | Ce que le client voit | Composants, hooks, styles, animations | Accès DB, logique métier |
| `src/backend/` | Ce qui tourne | Features, services, intégrations, jobs | Composants UI |
| `src/shared/` | Le contrat | Types, schémas Zod, constantes | Importer front ou back |

---

## Arborescence

```
structura/
│
├── .github/workflows/         # CI/CD (lint, tests, déploiement)
├── .opencode/skills/          # Skills IA pour agents de développement
├── docs/                      # Documentation de référence
│   ├── GUIDE_DEVELOPPEMENT_APP.md
│   ├── cahier_des_charges_technique.md
│   ├── wireframes/
│   ├── ui-maquettes/
│   └── mockups/
│
├── public/                    # Assets statiques
│   ├── branding/              # Logo, monogramme, OG image, icônes
│   ├── photos/                # Chantiers, essences, mobilier, immobilier
│   ├── illustrations/         # Isométries, timeline, 404, empty states
│   ├── textures/              # Fonds, overlays, motifs, grilles
│   ├── icons/                 # Icônes PWA
│   └── og/
│
├── src/
│   ├── app/                   # Routes Next.js (App Router)
│   │   ├── (public)/          # Vitrine publique
│   │   ├── (auth)/            # Authentification
│   │   ├── (compte)/          # Espace client
│   │   ├── (gestion)/         # Back-office chantier
│   │   ├── (admin)/           # Admin plateforme
│   │   ├── (conversion)/      # Devis, RDV, landing pages
│   │   ├── paiement/          # Confirmation paiement
│   │   └── api/               # Route Handlers + webhooks
│   │
│   ├── frontend/              # UI uniquement
│   │   ├── components/
│   │   │   ├── ui/            # Primitives shadcn/ui
│   │   │   ├── signature/     # 14 composants de marque
│   │   │   ├── sections/      # Blocs de pages composables
│   │   │   ├── forms/         # Composants formulaires
│   │   │   ├── admin/         # Composants admin denses
│   │   │   ├── chantier/      # Composants back-office chantier
│   │   │   ├── charts/        # Graphiques (recharts)
│   │   │   └── shared/        # Composants partagés divers
│   │   ├── hooks/             # Hooks custom
│   │   ├── lib/               # Utilitaires frontend
│   │   └── styles/            # Animations CSS, textures
│   │
│   ├── backend/               # Logique métier
│   │   ├── core/              # Fondations (db, auth, errors, guards)
│   │   ├── integrations/      # Adaptateurs externes (CinetPay, R2, mail)
│   │   ├── features/          # Logique métier par domaine
│   │   │   ├── auth/
│   │   │   ├── leads/
│   │   │   ├── quotes/
│   │   │   ├── plans/
│   │   │   ├── ebenisterie/
│   │   │   ├── immobilier/
│   │   │   ├── orders/
│   │   │   ├── payment/
│   │   │   ├── files/
│   │   │   ├── chantier/
│   │   │   ├── simulator/
│   │   │   ├── content/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── jobs/              # Handlers Cron Vercel
│   │   └── lib/               # Utilitaires backend
│   │
│   ├── shared/                # Contrat front ↔ back
│   │   ├── types/
│   │   ├── schemas/
│   │   └── constants/
│   │
│   └── middleware.ts          # Protection zones + headers sécurité
│
├── prisma/                    # Schema + migrations + seed
├── emails/                    # Templates React Email
├── messages/                  # i18n (FR actif, EN préparé)
├── scripts/                   # Scripts utilitaires hors app
└── tests/                     # Unitaires + intégration + E2E
```

---

## Règles de dépendances

```
src/app/  ──importe UI──────→  src/frontend/
src/app/  ──importe logique──→  src/backend/  (Server Actions)

src/frontend/  ──importe types──→  src/shared/
src/frontend/  ❌ JAMAIS de src/backend/

src/backend/  ──importe types──→  src/shared/
src/backend/  ❌ JAMAIS de src/frontend/

src/shared/  ❌ JAMAIS de frontend/ ni backend/
```

**Règle d'or** : un composant `frontend/` n'appelle jamais Prisma ni un
service `backend/` directement. Il appelle une **Server Action** (qui vit
dans `backend/features/*/actions/`).

---

## Getting started

### Prérequis

- Node.js >= 20.x
- pnpm (recommandé) ou npm
- Compte Neon (PostgreSQL managé)
- Compte Cloudflare R2
- Compte CinetPay
- Compte Resend

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-org/structura.git
cd structura

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Initialiser la base de données
pnpm db:generate
pnpm db:push
pnpm db:seed

# Lancer le serveur de développement
pnpm dev
```

L'app est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Variables d'environnement

Voir `.env.example` pour la liste complète. Variables critiques :

```env
# Base de données
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="..."
AUTH_URL="http://localhost:3000"

# CinetPay
CINETPAY_API_KEY="..."
CINETPAY_SECRET_KEY="..."

# Cloudflare R2
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="structura-files"

# Resend
RESEND_API_KEY="..."

# Sentry
SENTRY_DSN="..."
```

---

## Scripts disponibles

```bash
pnpm dev                    # Serveur de développement
pnpm build                  # Build de production
pnpm start                  # Démarrer en production
pnpm lint                   # ESLint
pnpm typecheck              # Vérification TypeScript
pnpm test                   # Tests unitaires (Vitest)
pnpm test:e2e               # Tests E2E (Playwright)
pnpm db:generate            # Générer le client Prisma
pnpm db:push                # Pousser le schéma en DB
pnpm db:seed                # Peupler la DB de démo
pnpm db:migrate             # Créer une migration
```

---

## Tests

```bash
# Tests unitaires
pnpm test

# Tests E2E
pnpm test:e2e

# Couverture
pnpm test:coverage
```

### Critères de couverture

- **Server Actions** : 100% des chemins critiques
- **Services métier** : > 90%
- **Utilitaires** : > 85%
- **E2E** : devis, paiement, téléchargement, isolation clients

---

## Déploiement

### Vercel (production)

```bash
# Déploiement automatique à chaque push sur main
vercel --prod
```

### Services externes

| Service | Rôle | URL |
|---------|------|-----|
| Vercel | Hébergement app | vercel.com |
| Neon | PostgreSQL managé | neon.tech |
| Cloudflare R2 | Stockage fichiers | cloudflare.com |
| CinetPay | Paiement Mobile Money | cinetpay.com |
| Resend | Emails transactionnels | resend.com |
| Sentry | Monitoring erreurs | sentry.io |

### Cron Jobs (Vercel)

| Job | Fréquence | Rôle |
|-----|-----------|------|
| `reconcile-paiements` | Toutes les 15 min | Réconciliation CinetPay |
| `verrouiller-rapports` | 06:00 UTC | Verrouiller rapports du jour |
| `digest-chantier` | 07:00 UTC | Digest email des chantiers |
| `relances-crm` | 08:00 UTC | Relances leads J+2 / J+7 |
| `purge-temp` | 02:00 UTC | Nettoyage fichiers temporaires |
| `rapport-patron` | 20:00 UTC | Résumé journalier patron |

---

## Références

- [GUIDE_DEVELOPPEMENT_APP.md](./docs/GUIDE_DEVELOPPEMENT_APP.md) — Spécifications
  complètes de développement (référence maître)
- [Cahier des charges technique](./docs/cahier_des_charges_technique.md) — Décisions
  d'architecture et schéma de données
- [Plan de digitalisation](./docs/plan_digitalisation_plateforme.md) — Vision
  produit et roadmap business
- [Écosystème design](./docs/ecosysteme_digitalisation_btp_design.md) — Direction
  artistique et stratégie de conversion

---

## Déviations

Toute entorse assumée à une règle du guide ou d'un skill est consignée ici, avec sa raison.
Une règle ignorée en silence serait une dette invisible.

1. **`JalonTimeline` horizontal à toutes les tailles.** Le skill 03 prévoit une timeline
   verticale sur mobile et horizontale sur desktop ; la maquette
   `docs/ui-maquettes/mobile/02-15_journal-chantier-diaspora.png` impose une timeline horizontale
   compacte à 360 px. La maquette prime, le défilement latéral remplace l'empilement.
2. **`<img>` plutôt que `next/image` dans `BeforeAfter` et `WatermarkPreview`.** Le voile du
   comparateur repose sur un `clip-path` animé et l'aperçu protégé sur un filigrane superposé :
   l'optimiseur de Next impose un conteneur et un `object-fit` qui cassent ces deux rendus.
   Les images concernées sont des aperçus, pas les visuels de contenu. Les trois avertissements
   ESLint correspondants sont assumés et visibles en CI.

---

## License

Propriétaire — Tous droits réservés.

*STRUCTURA — « L'ingénierie qui construit en confiance » · Yaoundé, Cameroun.*
