import type { Metadata } from "next";
import { Kicker } from "@/frontend/components/signature/kicker";
import { FormulaireContact } from "./formulaire-contact";

export const metadata: Metadata = {
  title: "Contact — STRUCTURA",
  description:
    "Parlez-nous de votre projet : réponse sous 24 h ouvrées, par téléphone, WhatsApp ou formulaire.",
};

const COORDONNEES = [
  { libelle: "Téléphone", valeur: "+237 6 90 00 00 00", href: "tel:+237690000000" },
  { libelle: "WhatsApp", valeur: "+237 6 90 00 00 00", href: "https://wa.me/237690000000" },
  { libelle: "Email", valeur: "contact@structura.cm", href: "mailto:contact@structura.cm" },
  { libelle: "Atelier", valeur: "Yaoundé, Cameroun", href: undefined },
] as const;

export default function PageContact() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="09" label="CONTACT" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        Parlons de votre projet
      </h1>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">
        Réponse garantie sous 24 h ouvrées. Décrivez le besoin, nous préparons le reste.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <FormulaireContact />
        <aside aria-label="Coordonnées" className="h-fit rounded-card border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <ul className="space-y-5">
            {COORDONNEES.map((coordonnee) => (
              <li key={coordonnee.libelle}>
                <p className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
                  {coordonnee.libelle}
                </p>
                {coordonnee.href ? (
                  <a
                    href={coordonnee.href}
                    className="mt-1 block font-medium text-[var(--color-ink)] hover:text-[var(--color-blueprint)]"
                  >
                    {coordonnee.valeur}
                  </a>
                ) : (
                  <p className="mt-1 font-medium text-[var(--color-ink)]">{coordonnee.valeur}</p>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
