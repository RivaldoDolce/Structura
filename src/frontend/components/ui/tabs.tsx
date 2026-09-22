import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "@/frontend/lib/cn";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "rounded-control border-line bg-surface inline-flex items-center gap-1 border p-1",
        className
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
        "text-small text-ink-soft hover:text-ink rounded-[6px] px-4 py-2 font-medium transition-colors",
        "focus-visible:ring-blueprint focus-visible:ring-2 focus-visible:outline-none",
        "data-[state=active]:bg-elevated data-[state=active]:text-ink",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "focus-visible:ring-blueprint mt-4 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
