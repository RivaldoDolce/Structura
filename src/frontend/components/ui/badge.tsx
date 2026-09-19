import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Étiquette d'état en annotation technique : mono, majuscules, teinte sémantique. */
const badgeVariantes = cva(
  "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-mono-xs uppercase",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-steel)]/40 bg-[var(--color-steel)]/15 text-[var(--color-steel)]",
        blueprint:
          "border-[var(--color-blueprint)]/40 bg-[var(--color-blueprint)]/15 text-[var(--color-blueprint)]",
        safety: "border-transparent bg-[var(--color-safety)] text-[var(--color-base)]",
        ok: "border-[var(--color-ok)]/40 bg-[var(--color-ok)]/15 text-[var(--color-ok)]",
        danger:
          "border-[var(--color-danger)]/40 bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
        outline: "border-[var(--color-line-strong)] text-[var(--color-ink-soft)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariantes> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariantes({ variant }), className)} {...props} />;
}

export { Badge, badgeVariantes };