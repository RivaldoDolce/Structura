"use client";
// Animations Motion au survol et Slot Radix : interaction donc rendu client.
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/frontend/lib/cn";

export interface ButtonTechProps {
  variant?: "primary" | "conversion" | "ghost";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (evenement: React.MouseEvent<HTMLButtonElement>) => void;
}

const CLASSES_VARIANTES = {
  primary: "bg-[var(--color-steel)] text-white hover:bg-[var(--color-steel-deep)]",
  conversion:
    "bg-[var(--color-safety)] text-[var(--color-base)] font-semibold hover:bg-[var(--color-safety-deep)]",
  ghost:
    "border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:bg-[var(--color-elevated)]",
} as const;

const CLASSES_TAILLES = {
  sm: "h-10 px-6 text-xs",
  default: "h-12 px-8 text-sm",
  lg: "h-14 px-10 text-base",
} as const;

// Bouton de marque aux coins en L qui s'écartent au survol.
// Le cas asChild passe par Slot pur : les props Motion ne fuient jamais
// vers le DOM de l'enfant (Link, etc.), seul le style est appliqué.
export const ButtonTech = React.forwardRef<HTMLButtonElement, ButtonTechProps>(
  (
    {
      variant = "primary",
      size = "default",
      asChild = false,
      isLoading = false,
      icon,
      className,
      children,
      disabled,
      type = "button",
      onClick,
    },
    ref,
  ) => {
    const classes = cn(
      "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-control font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]",
      "disabled:pointer-events-none disabled:opacity-50",
      CLASSES_VARIANTES[variant],
      CLASSES_TAILLES[size],
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} aria-busy={isLoading || undefined}>
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        onClick={onClick}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-control"
        >
          <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-current opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-current opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-current opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:opacity-100" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-current opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-100" />
        </span>

        {isLoading ? (
          <>
            <svg
              aria-hidden="true"
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Chargement</span>
          </>
        ) : (
          <>
            {children}
            {icon ? (
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                {icon}
              </span>
            ) : null}
          </>
        )}
      </motion.button>
    );
  },
);
ButtonTech.displayName = "ButtonTech";
