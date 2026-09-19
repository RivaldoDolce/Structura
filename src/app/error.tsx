"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";

export default function PageErreur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-start justify-center px-4 py-24 md:px-6">
      <Kicker number="500" label="INCIDENT DE CHANTIER" className="mb-4" />
      <h1 className="font-display text-h1 font-bold text-[var(--color-ink)]">
        Un imprévu, on reprend les travaux.
      </h1>
      <p className="mt-4 max-w-xl text-body text-[var(--color-ink-soft)]">
        La page n&apos;a pas pu s&apos;afficher. Réessayez, ou revenez à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <ButtonTech type="button" variant="primary" size="lg" onClick={reset}>
          Réessayer
        </ButtonTech>
        <ButtonTech asChild variant="ghost" size="lg">
          <Link href="/">Retour à l&apos;accueil</Link>
        </ButtonTech>
      </div>
    </div>
  );
}
