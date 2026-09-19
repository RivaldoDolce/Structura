import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Champ de saisie du thème : 44 px de haut sur mobile, état invalide explicite. */
function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-control border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-small text-[var(--color-ink)]",
        "placeholder:text-[var(--color-ink-mute)]",
        "transition-colors focus-visible:border-[var(--color-line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)]",
        "aria-invalid:border-[var(--color-danger)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };