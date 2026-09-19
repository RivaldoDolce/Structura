import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";

export interface SiteFooterProps {
  telephone?: string;
  email?: string;
  className?: string;
}

interface ColonnePied {
  titre: string;
  liens: { href: string; label: string }[];
}

const COLONNES: ColonnePied[] = [
  {
    titre: "Services",
    liens: [
      { href: "/ingenierie", label: "Ingénierie structure" },
      { href: "/ebenisterie", label: "Ébénisterie d'art" },
      { href: "/plans", label: "Plans de construction" },
      { href: "/immobilier", label: "Immobilier" },
      { href: "/devis", label: "Devis gratuit" },
    ],
  },
  {
    titre: "Entreprise",
    liens: [
      { href: "/a-propos", label: "À propos" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    titre: "Ressources",
    liens: [
      { href: "/blog", label: "Blog" },
      { href: "/plans", label: "Catalogue de plans" },
      { href: "/contact", label: "Questions fréquentes" },
    ],
  },
  {
    titre: "Légal",
    liens: [
      { href: "/legal/mentions", label: "Mentions légales" },
      { href: "/legal/cgv", label: "CGV" },
      { href: "/legal/confidentialite", label: "Confidentialité" },
    ],
  },
];

export function SiteFooter({
  telephone = "+237690000000",
  email = "contact@structura-cm.com",
  className,
}: SiteFooterProps) {
  const annee = new Date().getFullYear();
  const telephoneAffiche = telephone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer
      role="contentinfo"
      aria-label="Pied de page STRUCTURA"
      className={cn("border-t border-[var(--color-line)] bg-[var(--color-surface)]", className)}
    >
      <div className="mx-auto max-w-content px-4 py-16 md:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]"
            >
              STRUCTURA
            </Link>
            <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
              L&apos;ingénierie qui construit en confiance.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[var(--color-ink-soft)]">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-blueprint)]" />
                <span>
                  Yaoundé
                  <br />
                  Cameroun
                </span>
              </p>
              <a
                href={`tel:${telephone}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-[var(--color-blueprint)]" />
                <span>{telephoneAffiche}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-[var(--color-blueprint)]" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {COLONNES.map((colonne) => (
            <nav key={colonne.titre} aria-label={`Pied de page — ${colonne.titre}`}>
              <h3 className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
                {colonne.titre}
              </h3>
              <ul className="mt-4 space-y-3">
                {colonne.liens.map((lien) => (
                  <li key={`${lien.href}-${lien.label}`}>
                    <Link
                      href={lien.href}
                      className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--color-line)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[var(--color-ink-mute)]">
              © {annee} STRUCTURA. Tous droits réservés.
            </p>
            <p className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
              Fait avec rigueur à Yaoundé
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
