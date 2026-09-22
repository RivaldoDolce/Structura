import * as React from "react";
import { SiteFooter, SiteHeader } from "@/frontend/components/layout";
import { LenisProvider } from "@/frontend/components/providers/lenis-provider";
import { WhatsAppFab } from "@/frontend/components/signature/whatsapp-fab";

// Gabarit des pages vitrines : en-tête fixe, pied de page, défilement
// fluide global (coupé sur les tunnels et en animations réduites) et
// bouton WhatsApp. Le numéro vient de l'environnement, jamais en dur.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  // Le numéro tombe sur une chaîne vide plutôt qu'une valeur fabriquée :
  // WhatsAppFab refuse alors de rendre un lien wa.me incomplet.
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <LenisProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <SiteFooter />
        <WhatsAppFab
          phoneNumber={whatsapp}
          defaultMessage="Bonjour, je suis intéressé par vos services STRUCTURA"
        />
      </div>
    </LenisProvider>
  );
}
