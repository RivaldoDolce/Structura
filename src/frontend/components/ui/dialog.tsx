"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

// Le centrage passe par une grille sur le voile, pas par des transformations
// sur le contenu : l'animation d'entrée reste un simple scale sans conflit.
function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-overlay data-[state=open]:animate-overlay-in fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 backdrop-blur-[2px]">
        <DialogPrimitive.Content
          className={cn(
            "rounded-card border-line bg-fond shadow-elevated relative z-50 w-full max-w-md border p-6",
            "data-[state=open]:animate-content-in focus-visible:outline-none",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="rounded-control text-ink-soft hover:bg-elevated hover:text-ink focus-visible:ring-blueprint absolute top-4 right-4 p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none">
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Fermer</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4 flex flex-col gap-2", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-6 flex flex-wrap justify-end gap-3", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-h3 text-ink font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={cn("text-small text-ink-soft", className)} {...props} />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
