"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square h-5 w-5 shrink-0 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)]",
        "after:absolute after:-inset-x-3 after:-inset-y-2.5",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]",
        "data-[state=checked]:border-[var(--color-blueprint)] data-[state=checked]:text-[var(--color-blueprint)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };