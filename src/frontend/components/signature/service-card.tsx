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
        "group rounded-card border-line bg-surface hover:border-steel relative overflow-hidden border p-8 transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className="text-blueprint">
          {icon}
        </span>
        <span className="text-ink-mute font-mono text-sm">{number}</span>
      </div>

      <h3 className="font-display text-ink mt-6 text-2xl font-semibold">{title}</h3>
      <p className="text-ink-soft mt-3 text-sm leading-relaxed">{description}</p>

      <ul className="border-line mt-6 space-y-3 border-t pt-6">
        {deliverables.map((livrable) => (
          <li key={livrable} className="text-ink-soft flex items-center gap-3 text-sm">
            <Check aria-hidden="true" className="text-ok h-4 w-4 shrink-0" />
            {livrable}
          </li>
        ))}
      </ul>
    </article>
  );
}
