import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";

const formateurMontant = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export interface PriceTagProps {
  amount: number;
  unit?: string;
  href?: string;
  hrefLabel?: string;
  /** Ton encre pour les scènes ivoire, ink par défaut sur fond sombre. */
  tone?: "sombre" | "clair";
  className?: string;
}

/** Prix lisible au premier coup d'œil, suivi d'un appel à l'action facultatif. */
export function PriceTag({
  amount,
  unit = "FCFA",
  href,
  hrefLabel,
  tone = "sombre",
  className,
}: PriceTagProps) {
  const clair = tone === "clair";
  const texte = clair ? "text-encre" : "text-ink";
  const secondaire = clair ? "text-encre-soft" : "text-ink-soft";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className={cn("font-display text-h2 font-semibold", texte)}>
        <span>{formateurMontant.format(amount)}</span>
        <span className={cn("text-small ml-2 font-medium", secondaire)}>{unit}</span>
      </p>
      {href ? (
        <Link
          href={href}
          className={cn(
            "group rounded-control border-line-strong text-small hover:border-blueprint hover:text-blueprint focus-visible:ring-blueprint focus-visible:ring-offset-fond inline-flex h-11 w-fit items-center gap-2 border px-5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            texte
          )}
        >
          {hrefLabel ?? "En savoir plus"}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
