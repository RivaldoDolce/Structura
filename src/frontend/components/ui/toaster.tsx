"use client";

import { CheckCircle2, Info, TriangleAlert, XCircle } from "lucide-react";
import * as React from "react";
import { Toaster as SonnerToaster, toast as toastSonner } from "sonner";

type TypeNotification = "success" | "error" | "info" | "warning";

const iconeParType = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: TriangleAlert,
} as const;

function notifier(type: TypeNotification, message: React.ReactNode) {
  const Icone = iconeParType[type];

  return toastSonner[type](message, {
    icon: React.createElement(Icone, {
      className: "h-4 w-4 text-[var(--color-blueprint)]",
      "aria-hidden": true,
    }),
    className:
      "!rounded-control !border !border-[var(--color-line)] !bg-[var(--color-surface)] !text-[var(--color-ink)] !shadow-elevated",
    descriptionClassName: "!text-[var(--color-ink-soft)]",
  });
}

export const toast = Object.assign((message: React.ReactNode) => notifier("info", message), {
  success: (message: React.ReactNode) => notifier("success", message),
  error: (message: React.ReactNode) => notifier("error", message),
  info: (message: React.ReactNode) => notifier("info", message),
  warning: (message: React.ReactNode) => notifier("warning", message),
});

export interface ToasterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export function Toaster({ position = "bottom-right" }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      duration={4000}
      visibleToasts={4}
      closeButton
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-control !border !border-[var(--color-line)] !bg-[var(--color-surface)] !text-[var(--color-ink)] !shadow-elevated",
          description: "!text-[var(--color-ink-soft)]",
          actionButton: "!bg-[var(--color-steel)] !text-white",
          cancelButton: "!bg-[var(--color-elevated)] !text-[var(--color-ink)]",
        },
      }}
    />
  );
}