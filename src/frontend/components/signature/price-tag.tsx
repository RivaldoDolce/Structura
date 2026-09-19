import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";

const formateurMontant = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export interface PriceTagProps {
  amount: number;
  unit?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}

/** Prix lisible au premier coup d'œil, suivi d'un appel à l'action facultatif. */
export function PriceTag({ amount, unit = "FCFA", href, hrefLabel, className }: PriceTagProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="font-display text-h2 font-semibold text-[var(--color-ink)]">
        <span>{formateurMontant.format(amount)}</span>
        <span className="ml-2 text-small font-medium text-[var(--color-ink-soft)]">{unit}</span>
      </p>
      {href ? (
        <Link
          href={href}
          className="group inline-flex h-11 w-fit items-center gap-2 rounded-control border border-[var(--color-line-strong)] px-5 text-small font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-blueprint)] hover:text-[var(--color-blueprint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]"
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