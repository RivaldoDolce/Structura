import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check } from "lucide-react";
import { cn } from "@/frontend/lib/cn";

export interface Jalon {
  id: string;
  label: string;
  date?: string;
  status: "completed" | "current" | "upcoming";
  notes?: string;
}

export interface JalonTimelineProps {
  jalons: Jalon[];
  className?: string;
}

// Statut restitué en texte pour les lecteurs d'écran, la couleur seule ne suffit jamais.
const libelleStatut = {
  completed: "terminé",
  current: "en cours",
  upcoming: "à venir",
} as const;

// Mise en page horizontale imposée par la maquette du journal (02-15),
// identique à 360 px et au bureau, avec défilement sur petit écran.
export function JalonTimeline({ jalons, className }: JalonTimelineProps) {
  return (
    <ol
      aria-label="Progression du chantier"
      className={cn("flex flex-row gap-4 overflow-x-auto pb-2", className)}
    >
      {jalons.map((jalon, index) => (
        <li
          key={jalon.id}
          data-status={jalon.status}
          className="relative flex min-w-[7.5rem] flex-1 flex-col items-center text-center"
        >
          {index < jalons.length - 1 ? (
            <div
              aria-hidden="true"
              className={cn(
                "absolute left-full top-6 z-0 h-px w-4",
                jalon.status === "completed"
                  ? "bg-[var(--color-blueprint)]"
                  : "bg-[var(--color-line)]",
              )}
            />
          ) : null}

          <div
            className={cn(
              "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
              jalon.status === "completed" &&
                "border-[var(--color-blueprint)] bg-[var(--color-blueprint)] text-white",
              jalon.status === "current" &&
                "animate-pulse border-[var(--color-steel)] bg-[var(--color-surface)] [animation-duration:2s]",
              jalon.status === "upcoming" &&
                "border-dashed border-[var(--color-line-strong)] bg-[var(--color-surface)]",
            )}
          >
            {jalon.status === "completed" ? <Check aria-hidden="true" className="h-5 w-5" /> : null}
            {jalon.status === "current" ? (
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[var(--color-steel)]" />
            ) : null}
          </div>

          <div className="mt-3">
            <p
              className={cn(
                "font-heading text-sm font-semibold",
                jalon.status === "completed" && "text-[var(--color-blueprint)]",
                jalon.status === "current" && "text-[var(--color-ink)]",
                jalon.status === "upcoming" && "text-[var(--color-ink-soft)]",
              )}
            >
              {jalon.label} <span className="sr-only">{libelleStatut[jalon.status]}</span>
            </p>

            {jalon.date ? (
              <time
                dateTime={jalon.date}
                className="mt-1 block font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-ink-muted)]"
              >
                {format(new Date(`${jalon.date}T00:00:00`), "d MMM yyyy", { locale: fr })}
              </time>
            ) : null}

            {jalon.notes ? (
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{jalon.notes}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
