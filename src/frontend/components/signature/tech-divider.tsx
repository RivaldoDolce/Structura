import { cn } from "@/frontend/lib/cn";

export interface TechDividerProps {
  label?: string;
  className?: string;
}

// Filet technique avec cartouche central optionnel, façon trait de coupe.
// Le rôle separator expose la rupture de section aux technologies d'assistance.
export function TechDivider({ label, className }: TechDividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-4", className)}
    >
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-line)]" />
      {label ? (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          {label}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-line)]" />
    </div>
  );
}
