"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

// Panneaux latéraux uniquement (droite sur desktop, bas sur mobile) : les
// variantes gauche et haut restent à créer si un écran les réclame.
const coteVariants = cva("fixed z-50 flex flex-col bg-[var(--color-surface)] shadow-elevated", {
  variants: {
    side: {
      right: "inset-y-0 right-0 h-full w-[min(28rem,100vw)] border-l border-[var(--color-line)] data-[state=open]:animate-sheet-in-right",
      bottom:
        "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-card border-t border-[var(--color-line)] data-[state=open]:animate-sheet-in-bottom",
    },
  },
  defaultVariants: { side: "right" },
});

export interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof coteVariants> {}

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--color-overlay)] backdrop-blur-[2px] data-[state=open]:animate-overlay-in" />
      <SheetPrimitive.Content
        className={cn(coteVariants({ side }), "focus-visible:outline-none", className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-control p-2 text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-elevated)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)]">
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Fermer</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("font-display text-h3 font-semibold text-[var(--color-ink)]", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn("text-small text-[var(--color-ink-soft)]", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};