import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { Kicker } from "@/frontend/components/signature/kicker";
import { PriceTag } from "@/frontend/components/signature/price-tag";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { WatermarkPreview } from "@/frontend/components/signature/watermark-preview";
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/frontend/components/ui/table";
import { PLANS, trouverPlan } from "@/frontend/data/plans";

export function generateStaticParams() {
  return PLANS.map((plan) => ({ reference: plan.reference }));
}

export async function generateMetadata({
  params,
}: {
  params: { reference: string };
}): Promise<Metadata> {
  const plan = trouverPlan(params.reference);
  return {
    title: plan ? `${plan.titre} — STRUCTURA` : "Plan introuvable — STRUCTURA",
    description: plan?.description,
  };
}

const TAUX_EUR = 655.957;

function caracteristiques(plan: NonNullable<ReturnType<typeof trouverPlan>>) {
  return [
    ["Référence", plan.reference],
    ["Type", plan.typeBatiment],
    plan.superficieM2 ? ["Surface", `${plan.superficieM2} m²`] : null,
    plan.nbNiveaux ? ["Niveaux", String(plan.nbNiveaux)] : null,
    plan.nbChambres ? ["Chambres", String(plan.nbChambres)] : null,
    plan.nbSallesDeBain ? ["Salles de bain", String(plan.nbSallesDeBain)] : null,
  ].filter((ligne): ligne is [string, string] => ligne !== null);
}

export default function PageFichePlan({ params }: { params: { reference: string } }) {
  const plan = trouverPlan(params.reference);
  if (!plan) notFound();

  const lignes = caracteristiques(plan);

  return (
    <div className="mx-auto max-w-content px-4 py-24 pb-32 md:px-6 md:pb-24">
      <Kicker number="04" label="FICHE PLAN" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        {plan.titre}
      </h1>
      {plan.description ? (
        <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">{plan.description}</p>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <WatermarkPreview imageUrl={plan.imageUrl} watermarkText="STRUCTURA" />
        <div>
          <Card>
            <CardContent>
              <Table>
                <TableBody>
                  {lignes.map(([libelle, valeur]) => (
                    <TableRow key={libelle}>
                      <TableCell className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
                        {libelle}
                      </TableCell>
                      <TableCell className="text-right font-medium">{valeur}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-4">
            <PriceTag amount={plan.prixFcfa} />
            <p className="text-small text-[var(--color-ink-soft)]">
              ≈ {new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(plan.prixFcfa / TAUX_EUR)} €
            </p>
            <ButtonTech asChild variant="conversion" size="lg" className="hidden md:inline-flex">
              <Link href={`/devis?plan=${plan.reference}`}>Acheter ce plan</Link>
            </ButtonTech>
          </div>
        </div>
      </div>

      <StickyMobileCta label="Acheter ce plan" href={`/devis?plan=${plan.reference}`} />
    </div>
  );
}
