import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * Variantes du bouton applicatif (formulaires, back-office, dialogues).
 *
 * Les CTA de marque du site passent par `ButtonTech`, qui porte les coins en L,
 * la flèche et l'état de chargement. Cette primitive couvre le reste sans
 * dupliquer ces comportements.
 */
const boutonVariantes = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-fond disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-steel text-white hover:bg-steel-deep",
        secondary:
          "border border-line bg-surface text-ink hover:border-line-strong hover:bg-elevated",
        outline: "border border-line-strong bg-transparent text-ink hover:bg-elevated",
        ghost: "text-ink-soft hover:bg-elevated hover:text-ink",
        destructive: "bg-danger text-white hover:opacity-90",
        link: "text-blueprint underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-small",
        default: "h-11 px-5 text-small",
        lg: "h-12 px-8 text-body",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof boutonVariantes> {
  /** Rend l'enfant fourni à la place du bouton (lien, lien Next, etc.). */
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const classes = cn(boutonVariantes({ variant, size }), className);

  // En mode asChild, l'élément appartient à l'appelant : aucune prop propre au
  // bouton (`type`, `disabled`) ne doit lui être imposée.
  if (asChild) {
    return <Slot className={classes} {...props} />;
  }

  return <button type="button" className={classes} {...props} />;
}

export { Button, boutonVariantes };
