"use client";

import { useState } from "react";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Textarea } from "@/frontend/components/ui/textarea";

const TELEPHONE_RE = /^6\d{8}$/;

export function FormulaireContact() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  function soumettre(evenement: React.FormEvent) {
    evenement.preventDefault();
    const chiffres = telephone.replace(/\D/g, "");
    if (nom.trim().length < 2) {
      setErreur("Indiquez votre nom (2 caractères minimum).");
      return;
    }
    if (!TELEPHONE_RE.test(chiffres)) {
      setErreur("Entrez un numéro à 9 chiffres, ex. 6 90 00 00 00.");
      return;
    }
    if (message.trim().length < 10) {
      setErreur("Décrivez votre besoin en quelques mots (10 caractères minimum).");
      return;
    }
    setErreur(null);
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <div role="status" className="rounded-card border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
        <p className="font-medium text-[var(--color-ink)]">Message bien reçu, {nom.trim()}.</p>
        <p className="mt-2 text-small text-[var(--color-ink-soft)]">
          Nous vous rappelons sous 24 h ouvrées au {telephone.replace(/\D/g, "")}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} noValidate className="rounded-card border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
      <div className="space-y-5">
        <div>
          <Label htmlFor="contact-nom">Nom</Label>
          <Input
            id="contact-nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            autoComplete="name"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="contact-telephone">Téléphone</Label>
          <Input
            id="contact-telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="6 90 00 00 00"
            inputMode="tel"
            autoComplete="tel"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Villa R+1 à Odza, terrain de 500 m²…"
            rows={5}
            className="mt-2"
          />
        </div>
        {erreur ? (
          <p role="alert" className="text-small text-[var(--color-danger)]">
            {erreur}
          </p>
        ) : null}
        <ButtonTech type="submit" variant="conversion" size="lg" className="w-full">
          Envoyer le message
        </ButtonTech>
      </div>
    </form>
  );
}
