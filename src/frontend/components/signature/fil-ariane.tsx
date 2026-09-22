import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import { cn } from "@/frontend/lib/cn";

export interface FilArianeItem {
  label: string;
  href?: string;
}

export interface FilArianeProps {
  items: FilArianeItem[];
  className?: string;
}

/**
 * Fil d'Ariane des pages intérieures : retour à l'accueil en un tap,
 * parcours lisible en mono. Le dernier élément est la page courante.
 */
export function FilAriane({ items, className }: FilArianeProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-mono-xs font-mono uppercase", className)}>
      <ol className="text-ink-soft flex flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-ink flex items-center gap-1.5 transition-colors">
            <House aria-hidden="true" className="h-3.5 w-3.5" />
            Accueil
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex min-w-0 items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-soft truncate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
