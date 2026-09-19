import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-y rounded-control border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-3 text-small leading-relaxed text-[var(--color-ink)]",
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

export { Textarea };