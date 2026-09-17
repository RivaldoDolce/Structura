# Audit Sprint 1 — composants avancés vs design

Référentiels : `docs/ui-maquettes/mobile/02-05`, `02-15`, `02-04`, `docs/mockups/06-02`, `06-03`, `docs/wireframes/01-c`, skills 03, 04, 05, 06.

## Alignement design à imposer au code joint

- `JalonTimeline` : maquette 02-15 affiche 5 jalons horizontaux même à 360px (pastilles + coches, pointillés à venir, % global). Prévoir horizontal compact scrollable mobile, pas vertical strict. Labels mono majuscules.
- `DevisWizard` : maquette 02-05 impose cartes visuelles étape 1, barre phases chantier, bouton bleu plein bas. Remplacer emojis maquette par icônes Lucide (AGENTS.md interdit emojis code).
- `WatermarkPreview` : mockup 06-03 impose filigrane diagonal répété sur visuel + tags mono + tableau technique + pack checklist + barre sticky prix/CTA. Zoom ≤ 2x, contextmenu bloqué.
- `BeforeAfter` : poignée ≥ 44px, clavier flèches, labels mono. Aucune maquette dédiée : rester sobre, GPU only.

## Corrections sur le code JalonTimeline proposé

- `font-display` inexistant (repo : `font-heading`). `text-[var(--color-*)]` OK.
- Dates : `date-fns` déjà déclaré, `fr` OK sans internet. Format maquette `12 SEPT. 2026` : utiliser `d MMM yyyy` fr + `uppercase` CSS.
- `tabIndex={0}` sur chaque `li` : retirer, un seul point focus par timeline (trop de stops). Garder `role=list`, `aria-label`.
- Lignes de connexion : simplifier, éviter doubles divs mobile/desktop redondants.

## Manquants absolument nécessaires — à faire quand connexion revenue

- `npm install` (motion, lenis, radix, cva, sonner, testing-library, jsdom) puis `lint`, `typecheck`, `test`, `build`.
- `npx playwright install --with-deps chromium` pour E2E.
- `next/font` Space Grotesk, Inter, JetBrains Mono + `prisma generate` si schéma touché.
- Vérifications en ligne : contraste AA, Lighthouse CI, Rich Results, partage WhatsApp OG, securityheaders.
- Création branche `feat/sprint1-frontend-components-avancees` depuis `develop` à jour + push + PR (nécessite réseau). Rester sur `feat/frontend-setup` en attendant.
