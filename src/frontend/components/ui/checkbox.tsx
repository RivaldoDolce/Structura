"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-[4px] border border-[var(--color-line-strong)] bg-[var(--color-surface)]",
        // Zone cliquable portée à 44 px minimum sans agrandir le visuel.
        "after:absolute after:-inset-x-3 after:-inset-y-2.5",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]",
        "data-[state=checked]:border-[var(--color-blueprint)] data-[state=checked]:bg-[var(--color-blueprint)] data-[state=checked]:text-[var(--color-base)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };