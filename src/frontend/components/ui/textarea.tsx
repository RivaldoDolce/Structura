import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "rounded-control border-line bg-surface text-small text-ink min-h-28 w-full resize-y border px-3 py-3 leading-relaxed",
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

export { Textarea };
