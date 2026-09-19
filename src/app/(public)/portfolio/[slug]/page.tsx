import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JalonTimeline } from "@/frontend/components/signature/jalon-timeline";
import { Kicker } from "@/frontend/components/signature/kicker";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";
import { equipe, journal } from "@/frontend/data/equipe";
import { JALONS_CHANTIER } from "@/frontend/data/jalons";

export function generateStaticParams() {
  return PROJETS_PORTFOLIO.map((projet) => ({ slug: projet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const projet = PROJETS_PORTFOLIO.find((item) => item.slug === params.slug);
  return {
    title: projet ? `${projet.title} — STRUCTURA` : "Réalisation introuvable — STRUCTURA",
    description: projet?.description,
  };
}

export default function PageDetailPortfolio({ params }: { params: { slug: string } }) {
  const projet = PROJETS_PORTFOLIO.find((item) => item.slug === params.slug);
  if (!projet) notFound();

  return (
    <div className="mx-auto max-w-content px-4 py-24 md:px-6">
      <Kicker number="03" label="RÉALISATION" className="mb-4" />
      <h1 className="max-w-3xl font-display text-h1 font-bold text-[var(--color-ink)]">
        {projet.title}
      </h1>
      <p className="mt-4 max-w-2xl text-body text-[var(--color-ink-soft)]">{projet.description}</p>
      {[projet.location, projet.year, projet.surface].filter(Boolean).length > 0 ? (
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">
          {projet.location ? (
            <div className="flex gap-2">
              <dt>Lieu</dt>
              <dd className="text-[var(--color-ink-soft)]">{projet.location}</dd>
            </div>
          ) : null}
          {projet.year ? (
            <div className="flex gap-2">
              <dt>Année</dt>
              <dd className="text-[var(--color-ink-soft)]">{projet.year}</dd>
            </div>
          ) : null}
          {projet.surface ? (
            <div className="flex gap-2">
              <dt>Surface</dt>
              <dd className="text-[var(--color-ink-soft)]">{projet.surface}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card">
        <Image
          src={projet.imageUrl}
          alt={projet.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <section aria-label="Journal de chantier" className="mt-16">
        <h2 className="font-display text-h2 font-bold text-[var(--color-ink)]">Journal de chantier</h2>
        <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {journal.map((entree) => (
            <li
              key={entree.id}
              className="overflow-hidden rounded-card border border-[var(--color-line)] bg-[var(--color-surface)]"
            >
              <div className="relative aspect-[16/10]">
                <Image src={entree.imageUrl} alt={entree.titre} fill sizes="50vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-mono text-mono-xs uppercase text-[var(--color-ink-mute)]">{entree.date}</p>
                <h3 className="mt-2 font-display text-h3 font-semibold text-[var(--color-ink)]">{entree.titre}</h3>
                <p className="mt-2 text-small text-[var(--color-ink-soft)]">{entree.extrait}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Progression du chantier" className="mt-16">
        <h2 className="font-display text-h2 font-bold text-[var(--color-ink)]">Progression</h2>
        <div className="mt-8">
          <JalonTimeline jalons={JALONS_CHANTIER} />
        </div>
      </section>

      <section aria-label="Équipe" className="mt-16">
        <h2 className="font-display text-h2 font-bold text-[var(--color-ink)]">Équipe</h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {equipe.map((membre) => (
            <li key={membre.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image src={membre.photoUrl} alt={membre.nom} fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-[var(--color-ink)]">{membre.nom}</p>
                <p className="text-small text-[var(--color-ink-soft)]">{membre.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
