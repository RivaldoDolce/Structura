import { cn } from "@/frontend/lib/cn";
import type { TonCartouche } from "@/frontend/lib/lumieres";

export interface TechDividerProps {
  label?: string;
  /** Ton du cartouche : encre sur les bandes claires, ink sur les sombres. */
  tone?: TonCartouche;
  className?: string;
}

// Filet technique avec cartouche central optionnel, façon trait de coupe.
// Le rôle separator expose la rupture de section aux technologies d'assistance.
export function TechDivider({ label, tone = "sombre", className }: TechDividerProps) {
  const clair = tone === "clair";

  return (
    <div role="separator" aria-label={label} className={cn("flex items-center gap-4", className)}>
      <span aria-hidden="true" className={cn("h-px flex-1", clair ? "bg-line-encre-strong" : "bg-line")} />
      {label ? (
        <span
          className={cn(
            "text-mono-xs tracking-annotation font-mono uppercase",
            clair ? "text-encre-soft" : "text-ink-mute"
          )}
        >
          {label}
        </span>
      ) : null}
      <span aria-hidden="true" className={cn("h-px flex-1", clair ? "bg-line-encre-strong" : "bg-line")} />
    </div>
  );
}
