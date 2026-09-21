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

// Disposition horizontale identique à toutes les tailles d'écran, avec
// défilement sur petit écran.
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
                "absolute top-6 left-full z-0 h-px w-4",
                jalon.status === "completed" ? "bg-blueprint" : "bg-line"
              )}
            />
          ) : null}

          <div
            className={cn(
              "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
              jalon.status === "completed" && "border-blueprint bg-blueprint text-white",
              jalon.status === "current" &&
                "border-steel bg-surface animate-pulse [animation-duration:2s]",
              jalon.status === "upcoming" && "border-line-strong bg-surface border-dashed"
            )}
          >
            {jalon.status === "completed" ? <Check aria-hidden="true" className="h-5 w-5" /> : null}
            {jalon.status === "current" ? (
              <span aria-hidden="true" className="bg-steel h-3 w-3 rounded-full" />
            ) : null}
          </div>

          <div className="mt-3">
            <p
              className={cn(
                "font-display text-sm font-semibold",
                jalon.status === "completed" && "text-blueprint",
                jalon.status === "current" && "text-ink",
                jalon.status === "upcoming" && "text-ink-soft"
              )}
            >
              {jalon.label} <span className="sr-only">{libelleStatut[jalon.status]}</span>
            </p>

            {jalon.date ? (
              <time
                dateTime={jalon.date}
                className="text-mono-xs text-ink-mute mt-1 block font-mono uppercase"
              >
                {format(new Date(`${jalon.date}T00:00:00`), "d MMM yyyy", { locale: fr })}
              </time>
            ) : null}

            {jalon.notes ? <p className="text-ink-soft mt-1 text-sm">{jalon.notes}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
