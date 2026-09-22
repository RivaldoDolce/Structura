"use client";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/frontend/lib/cn";
import { etiquetePage, numeroInternational, texteMessage } from "@/frontend/lib/sanitize";

export interface WhatsAppFabProps {
  phoneNumber: string;
  defaultMessage?: string;
  reference?: string;
  className?: string;
}

// Numéro assaini (chiffres seuls) car wa.me refuse les espaces et le « + ».
// Un numéro invalide ou une référence non sûre désactivent le bouton plutôt
// que de produire un lien forgé.
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

  const numero = numeroInternational(phoneNumber);
  const provenance = reference === undefined ? null : etiquetePage(reference);
  if (!numero || (reference !== undefined && provenance === null)) return null;

  const message = texteMessage(provenance ? `${defaultMessage} — ${provenance}` : defaultMessage);
  const url = `https://wa.me/${numero.slice(1)}?text=${encodeURIComponent(message)}`;

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
            "bg-whatsapp hover:bg-whatsapp-deep focus-visible:ring-whatsapp fixed right-6 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:bottom-6",
            className
          )}
        >
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
