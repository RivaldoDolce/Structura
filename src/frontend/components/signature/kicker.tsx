import { cn } from "@/frontend/lib/cn";

export interface KickerProps {
  number: string;
  label: string;
  className?: string;
}

// Sur-titre de section façon cartouche de plan : numéro + libellé mono,
// présentation purement visuelle gérée par le parent.
export function Kicker({ number, label, className }: KickerProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-blueprint)]",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-[var(--color-blueprint)]" />
      <span>{number}</span>
      <span className="text-[var(--color-ink-soft)]">{label}</span>
    </p>
  );
}
