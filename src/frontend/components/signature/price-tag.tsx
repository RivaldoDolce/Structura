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
      <p className="font-display text-h2 text-ink font-semibold">
        <span>{formateurMontant.format(amount)}</span>
        <span className="text-small text-ink-soft ml-2 font-medium">{unit}</span>
      </p>
      {href ? (
        <Link
          href={href}
          className="group rounded-control border-line-strong text-small text-ink hover:border-blueprint hover:text-blueprint focus-visible:ring-blueprint focus-visible:ring-offset-fond inline-flex h-11 w-fit items-center gap-2 border px-5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
