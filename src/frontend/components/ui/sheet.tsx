"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

// Panneaux latéraux uniquement (droite sur desktop, bas sur mobile) : les
// variantes gauche et haut restent à créer si un écran les réclame.
const coteVariants = cva("fixed z-50 flex flex-col bg-surface shadow-elevated", {
  variants: {
    side: {
      right:
        "inset-y-0 right-0 h-full w-[min(28rem,100vw)] border-l border-line data-[state=open]:animate-sheet-in-right",
      bottom:
        "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-card border-t border-line data-[state=open]:animate-sheet-in-bottom",
    },
  },
  defaultVariants: { side: "right" },
});

export interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>, VariantProps<typeof coteVariants> {}

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="bg-overlay data-[state=open]:animate-overlay-in fixed inset-0 z-50 backdrop-blur-[2px]" />
      <SheetPrimitive.Content
        className={cn(coteVariants({ side }), "focus-visible:outline-none", className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="rounded-control text-ink-soft hover:bg-elevated hover:text-ink focus-visible:ring-blueprint absolute top-4 right-4 p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none">
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
      className={cn("font-display text-h3 text-ink font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description className={cn("text-small text-ink-soft", className)} {...props} />
  );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger };
