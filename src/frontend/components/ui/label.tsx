"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-small font-medium text-[var(--color-ink-soft)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };