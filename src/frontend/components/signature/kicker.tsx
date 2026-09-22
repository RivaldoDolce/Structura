import { cn } from "@/frontend/lib/cn";

export interface KickerProps {
  number?: string;
  label: string;
  className?: string;
}

export function Kicker({ number, label, className }: KickerProps) {
  return (
    <p
      className={cn(
        "text-mono-xs tracking-annotation text-blueprint flex items-center gap-3 font-mono uppercase",
        className
      )}
    >
      <span aria-hidden="true" className="bg-blueprint h-px w-8" />
      {number ? <span>{number}</span> : null}
      <span className="text-ink-soft">{label}</span>
    </p>
  );
}
