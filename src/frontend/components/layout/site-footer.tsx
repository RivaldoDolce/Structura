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
      { href: "/plans", label: "Catalogue de plans" },
      { href: "/contact", label: "Poser une question" },
    ],
  },
  {
    titre: "Légal",
    liens: [
      { href: "/legal/mentions-legales", label: "Mentions légales" },
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
  // Composition d'affichage : indicatif puis groupes de trois ; un numéro
  // hors gabarit est affiché brut, jamais bloqué.
  const telephoneAffiche = telephone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer
      role="contentinfo"
      aria-label="Pied de page STRUCTURA"
      className={cn("border-line bg-surface border-t", className)}
    >
      <div className="max-w-content mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-ink text-2xl font-bold tracking-tight">
              STRUCTURA
            </Link>
            <p className="text-ink-soft mt-4 text-sm">
              L&apos;ingénierie qui construit en confiance.
            </p>

            <div className="text-ink-soft mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="text-blueprint mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Yaoundé
                  <br />
                  Cameroun
                </span>
              </p>
              <a
                href={`tel:${telephone}`}
                className="hover:text-ink flex items-center gap-2 transition-colors"
              >
                <Phone aria-hidden="true" className="text-blueprint h-4 w-4" />
                <span>{telephoneAffiche}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="hover:text-ink flex items-center gap-2 transition-colors"
              >
                <Mail aria-hidden="true" className="text-blueprint h-4 w-4" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {COLONNES.map((colonne) => (
            <nav key={colonne.titre} aria-label={`Pied de page — ${colonne.titre}`}>
              <h3 className="text-mono-xs text-ink-mute font-mono uppercase">{colonne.titre}</h3>
              <ul className="mt-4 space-y-3">
                {colonne.liens.map((lien) => (
                  <li key={`${lien.href}-${lien.label}`}>
                    <Link
                      href={lien.href}
                      className="text-ink-soft hover:text-ink text-sm transition-colors"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-line mt-16 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-ink-mute text-sm">© {annee} STRUCTURA. Tous droits réservés.</p>
            <p className="text-mono-xs text-ink-mute font-mono uppercase">
              Fait avec rigueur à Yaoundé
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
