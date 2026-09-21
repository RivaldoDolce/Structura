import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Étiquette d'état en annotation technique : mono, majuscules, teinte sémantique. */
const badgeVariantes = cva(
  "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-mono-xs uppercase",
  {
    variants: {
      variant: {
        default: "border-steel/40 bg-steel/15 text-steel",
        blueprint: "border-blueprint/40 bg-blueprint/15 text-blueprint",
        safety: "border-transparent bg-safety text-fond",
        ok: "border-ok/40 bg-ok/15 text-ok",
        danger: "border-danger/40 bg-danger/15 text-danger",
        outline: "border-line-strong text-ink-soft",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariantes> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariantes({ variant }), className)} {...props} />;
}

export { Badge, badgeVariantes };
