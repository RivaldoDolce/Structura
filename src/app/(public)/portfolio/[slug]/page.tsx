import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { JalonTimeline } from "@/frontend/components/signature/jalon-timeline";
import { Kicker } from "@/frontend/components/signature/kicker";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import { equipe, journal } from "@/frontend/data/equipe";
import { JALONS_CHANTIER } from "@/frontend/data/jalons";

export function generateStaticParams() {
  return PROJETS_PORTFOLIO.map((projet) => ({ slug: projet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projet = PROJETS_PORTFOLIO.find((item) => item.slug === slug);
  return {
    title: projet ? `${projet.title} — STRUCTURA` : "Réalisation introuvable — STRUCTURA",
    description: projet?.description,
  };
}

export default async function PageDetailPortfolio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projet = PROJETS_PORTFOLIO.find((item) => item.slug === slug);
  if (!projet) notFound();

  return (
    <div className="max-w-content mx-auto px-4 pt-24 pb-32 md:px-6 md:pb-24">
      <FilAriane
        items={[{ label: "Portfolio", href: "/portfolio" }, { label: projet.title }]}
        className="mb-6"
      />
      <Kicker number="03" label="RÉALISATION" className="mb-4" />
      <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">{projet.title}</h1>
      <p className="text-body text-ink-soft mt-4 max-w-2xl">{projet.description}</p>
      {[projet.location, projet.year, projet.surface].filter(Boolean).length > 0 ? (
        <dl className="text-mono-xs text-ink-mute mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono uppercase">
          {projet.location ? (
            <div className="flex gap-2">
              <dt>Lieu</dt>
              <dd className="text-ink-soft">{projet.location}</dd>
            </div>
          ) : null}
          {projet.year ? (
            <div className="flex gap-2">
              <dt>Année</dt>
              <dd className="text-ink-soft">{projet.year}</dd>
            </div>
          ) : null}
          {projet.surface ? (
            <div className="flex gap-2">
              <dt>Surface</dt>
              <dd className="text-ink-soft">{projet.surface}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="rounded-card relative mt-10 aspect-[16/9] overflow-hidden">
        <Image
          src={projet.imageUrl}
          alt={projet.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <section aria-label="Journal de chantier" className="mt-16">
        <h2 className="font-display text-h2 text-ink font-bold">Journal de chantier</h2>
        <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {journal.map((entree) => (
            <li
              key={entree.id}
              className="rounded-card border-line bg-surface overflow-hidden border"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={entree.imageUrl}
                  alt={entree.titre}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-mono-xs text-ink-mute font-mono uppercase">{entree.date}</p>
                <h3 className="font-display text-h3 text-ink mt-2 font-semibold">{entree.titre}</h3>
                <p className="text-small text-ink-soft mt-2">{entree.extrait}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Progression du chantier" className="mt-16">
        <h2 className="font-display text-h2 text-ink font-bold">Progression</h2>
        <div className="mt-8">
          <JalonTimeline jalons={JALONS_CHANTIER} />
        </div>
      </section>

      <section aria-label="Équipe" className="mt-16">
        <h2 className="font-display text-h2 text-ink font-bold">Équipe</h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {equipe.map((membre) => (
            <li key={membre.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={membre.photoUrl}
                  alt={membre.nom}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-ink font-medium">{membre.nom}</p>
                <p className="text-small text-ink-soft">{membre.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <StickyMobileCta label="Un projet similaire ?" href="/devis" />
    </div>
  );
}
