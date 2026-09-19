"use client";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/frontend/lib/cn";

export interface WhatsAppFabProps {
  phoneNumber: string;
  defaultMessage?: string;
  reference?: string;
  className?: string;
}

// Bouton flottant WhatsApp : apparaît après 400px de scroll, message
// pré-rempli avec la référence de page. Le numéro est assaini (chiffres
// seuls) car wa.me refuse les espaces et le « + ».
export function WhatsAppFab({
  phoneNumber,
  defaultMessage = "Bonjour, je suis intéressé par vos services",
  reference,
  className,
}: WhatsAppFabProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const actualise = (): void => setVisible(window.scrollY > 400);
    actualise();
    window.addEventListener("scroll", actualise, { passive: true });
    return () => window.removeEventListener("scroll", actualise);
  }, []);

  const numero = phoneNumber.replace(/\D/g, "");
  const message = reference ? `${defaultMessage} — ${reference}` : defaultMessage;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter STRUCTURA sur WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-lg transition-colors hover:bg-[var(--color-whatsapp-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-whatsapp)] focus-visible:ring-offset-2 md:bottom-6",
            className,
          )}
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
