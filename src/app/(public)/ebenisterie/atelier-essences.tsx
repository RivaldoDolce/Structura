import Image from "next/image";
import { cn } from "@/frontend/lib/cn";
import { Kicker } from "@/frontend/components/signature/kicker";

export interface EssenceAtelier {
  id: string;
  nom: string;
  description: string;
  imageUrl: string;
}

export interface AtelierEssencesProps {
  essences: EssenceAtelier[];
}

/**
 * L'atelier en cinq essences — composition propre à la page ébénisterie
 * (audit §6.2). Le carré `1/1` met la matière à égalité : aucune essence
 * n'est mise en avant, c'est le veinage qui parle. Fond chaud, badge cuivre,
 * et la lumière vient du haut comme dans un atelier ouvert.
 */
export function AtelierEssences({ essences }: AtelierEssencesProps) {
  return (
    <section
      role="region"
      aria-label="Essences de l'atelier"
      data-composition="C3"
      data-surface="warm"
      className="st-warm relative overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-content mx-auto px-4 md:px-6">
        <Kicker number="02" label="ATELIER" className="mb-4" />
        <h2 className="font-display text-h2 text-ink font-bold">Cinq essences, cinq caractères</h2>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">
          Chaque bois a sa dureté, son veinage et son usage. Nous les travaillons verts ou secs,
          jamais masqués sous un vernis épais.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {essences.map((essence) => (
            <li key={essence.id} className="group">
              <div className="st-card rounded-card relative aspect-square overflow-hidden">
                <Image
                  src={essence.imageUrl}
                  alt={`Veinage du ${essence.nom.toLowerCase()}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  className={cn(
                    "rounded-pill absolute top-3 left-3 border border-cuivre/40 bg-fond/80 px-3 py-1",
                    "text-mono-xs text-sable font-mono uppercase backdrop-blur-sm"
                  )}
                >
                  {essence.nom}
                </span>
              </div>
              <p className="text-small text-ink-soft mt-3">{essence.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}