import * as React from "react";
import { cn } from "@/frontend/lib/cn";

/** Conteneur de surface : fond `surface`, bordure de filet, ombre douce du thème. */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-card border-line bg-surface shadow-card border", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("font-display text-h3 text-ink font-semibold", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-small text-ink-soft", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-line flex items-center gap-3 border-t px-6 py-4", className)}
      {...props}
    />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
