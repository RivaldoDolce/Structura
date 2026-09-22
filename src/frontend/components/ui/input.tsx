import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Champ de saisie du thème : 44 px de haut sur mobile, état invalide explicite. */
function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "rounded-control border-line bg-surface text-small text-ink h-11 w-full border px-3",
        "placeholder:text-ink-mute",
        "focus-visible:border-line-strong focus-visible:ring-blueprint transition-colors focus-visible:ring-2 focus-visible:outline-none",
        "aria-invalid:border-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
