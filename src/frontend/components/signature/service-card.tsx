import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

export interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  deliverables: string[];
  className?: string;
}

// Carte de pôle d'expertise : pure présentation (le survol est CSS),
// donc Server Component. L'icône Lucide est fournie par le parent.
export function ServiceCard({
  number,
  title,
  description,
  icon,
  deliverables,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 transition-colors hover:border-[var(--color-steel)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className="text-[var(--color-blueprint)]">
          {icon}
        </span>
        <span className="font-mono text-sm text-[var(--color-ink-muted)]">{number}</span>
      </div>

      <h3 className="mt-6 font-heading text-2xl font-semibold text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        {description}
      </p>

      <ul className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
        {deliverables.map((livrable) => (
          <li
            key={livrable}
            className="flex items-center gap-3 text-sm text-[var(--color-ink-soft)]"
          >
            <Check
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--color-ok)]"
            />
            {livrable}
          </li>
        ))}
      </ul>
    </article>
  );
}
