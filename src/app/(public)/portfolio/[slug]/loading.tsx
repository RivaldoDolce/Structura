import { Skeleton } from "@/frontend/components/ui/skeleton";

/**
 * Chargement de l'étude de cas : le relevé se trace aux dimensions exactes
 * de la mise en page (titre, hero 16/9, journal). N'apparaît qu'en
 * navigation cliente, pendant le streaming du segment dynamique.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement de la réalisation"
      className="max-w-content mx-auto px-4 pt-24 pb-32 md:px-6 md:pb-24"
    >
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-12 max-w-3xl" />
      <Skeleton className="mt-10 aspect-[16/9] w-full" />
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Skeleton className="aspect-[16/10] w-full" />
        <Skeleton className="aspect-[16/10] w-full" />
      </div>
    </div>
  );
}
