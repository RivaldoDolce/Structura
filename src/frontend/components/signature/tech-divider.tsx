import { cn } from "@/frontend/lib/cn";

export interface TechDividerProps {
  label?: string;
  className?: string;
}

// Filet technique avec cartouche central optionnel, façon trait de coupe.
// Le rôle separator expose la rupture de section aux technologies d'assistance.
export function TechDivider({ label, className }: TechDividerProps) {
  return (
    <div role="separator" aria-label={label} className={cn("flex items-center gap-4", className)}>
      <span aria-hidden="true" className="bg-line h-px flex-1" />
      {label ? (
        <span className="text-mono-xs tracking-annotation text-ink-mute font-mono uppercase">
          {label}
        </span>
      ) : null}
      <span aria-hidden="true" className="bg-line h-px flex-1" />
    </div>
  );
}
