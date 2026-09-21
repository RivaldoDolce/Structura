"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer border-line-strong bg-surface h-5 w-5 shrink-0 rounded-[4px] border",
        // Zone cliquable portée à 44 px minimum sans agrandir le visuel.
        "after:absolute after:-inset-x-3 after:-inset-y-2.5",
        "focus-visible:ring-blueprint focus-visible:ring-offset-fond transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "data-[state=checked]:border-blueprint data-[state=checked]:bg-blueprint data-[state=checked]:text-fond",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
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
