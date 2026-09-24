import { cn } from "@/frontend/lib/cn";

export interface KickerProps {
  number?: string;
  label: string;
  /** Ton encre pour les scènes ivoire, ink par défaut sur fond sombre. */
  tone?: "sombre" | "clair";
  className?: string;
}

export function Kicker({ number, label, tone = "sombre", className }: KickerProps) {
  const clair = tone === "clair";
  // Sur papier, l'accent suit l'encre de donnée (`steel-encre`, AA) : le
  // `steel-deep` historique n'y tient pas le contraste texte.
  const accent = clair ? "text-steel-encre" : "text-blueprint";
  const reglette = clair ? "bg-steel-encre" : "bg-blueprint";
  const texte = clair ? "text-encre-soft" : "text-ink-soft";

  return (
    <p
      className={cn(
        "text-mono-xs tracking-annotation flex items-center gap-3 font-mono uppercase",
        accent,
        className
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-8", reglette)} />
      {number ? <span>{number}</span> : null}
      <span className={texte}>{label}</span>
    </p>
  );
}
