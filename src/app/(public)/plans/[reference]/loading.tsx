import { Skeleton } from "@/frontend/components/ui/skeleton";

/**
 * Chargement de la fiche plan : le relevé se trace aux dimensions exactes
 * de la mise en page (titre, visuel + colonne d'achat). N'apparaît qu'en
 * navigation cliente, pendant le streaming du segment dynamique.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement de la fiche plan"
      className="max-w-content mx-auto px-4 py-24 pb-32 md:px-6 md:pb-24"
    >
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-12 max-w-3xl" />
      <Skeleton className="mt-4 h-6 max-w-2xl" />
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
