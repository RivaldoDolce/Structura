import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center gap-1 rounded-control border border-[var(--color-line)] bg-[var(--color-surface)] p-1",
        className,
      )}
      {...props}
    />
  );
}

// L'état actif est un fond qui apparaît en fondu via `transition-colors`.
// Un indicateur glissant exigerait d'instrumenter la mise en page Radix pour
// deux pixels de gain : le coût ne le justifie pas ici.
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded-[6px] px-4 py-2 text-small font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)]",
        "data-[state=active]:bg-[var(--color-elevated)] data-[state=active]:text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)]",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };