import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stats } from "@/frontend/components/sections/stats";
import { ButtonTech } from "@/frontend/components/signature/button-tech";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Kicker } from "@/frontend/components/signature/kicker";
import { StickyMobileCta } from "@/frontend/components/signature/sticky-mobile-cta";
import { TechDivider } from "@/frontend/components/signature/tech-divider";
import { equipe } from "@/frontend/data/equipe";
import { cn } from "@/frontend/lib/cn";
import { tonDe } from "@/frontend/lib/lumieres";

export const metadata: Metadata = {
  title: "À propos — STRUCTURA",
  description:
    "Bureau d'ingénierie et atelier d'ébénisterie à Yaoundé : rigueur du calcul, noblesse de la finition.",
};

/*
 * Matières et savoir-faire locaux : ce que nous mettons dans les ouvrages se
 * prouve par l'image. Les trois clichés documentent une filière — terre
 * compressée, rotin tressé, terre cuite — sans laquelle la promesse
 * « essences locales » resterait une formule.
 */
const MATIERES = [
  {
    id: "terre-compressee",
    titre: "Blocs de terre compressée",
    detail: "Béton de terre stabilisé, dosage contrôlé et cure à l'ombre.",
    src: "/photos/chantiers/04-73_materiaux-locaux-btc.png",
    alt: "Mur en blocs de terre compressée hourdés au mortier sur un chantier de Yaoundé",
  },
  {
    id: "cannage",
    titre: "Cannage et rotin",
    detail: "Tressage à la main des assises, fil par fil, par nos ébénistes.",
    src: "/photos/mobilier/04-74_artisanat-cannage-rotin.png",
    alt: "Cannage de rotin tressé à la main sur une assise en bois de l'atelier",
  },
  {
    id: "claustra",
    titre: "Claustra de terre cuite",
    detail: "Ventilation et ombre portée, sans climatisation.",
    src: "/photos/chantiers/04-75_claustra-terre-cuite-ombres.png",
    alt: "Claustra de terre cuite filtrant la lumière sur une façade à Yaoundé",
  },
];

export default function PageAPropos() {
  const ton = tonDe("pale");

  return (
    <>
      <div className="max-w-content mx-auto px-4 pt-24 md:px-6">
        <FilAriane items={[{ label: "À propos" }]} className="mb-6" />
        <Kicker number="07" label="MAISON" className="mb-4" />
        <h1 className="font-display text-h1 text-ink max-w-3xl font-bold">À propos de STRUCTURA</h1>
        <p className="text-body text-ink-soft mt-4 max-w-2xl">
          Un bureau d&apos;ingénierie adossé à un atelier d&apos;ébénisterie : le calcul juste et la
          finition noble, sous le même toit à Yaoundé.
        </p>

        <section aria-label="Équipe" className="mt-12">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipe.map((membre) => (
              <li
                key={membre.id}
                className="rounded-card border-line bg-surface overflow-hidden border"
              >
                <div className="relative aspect-square">
                  <Image
                    src={membre.photoUrl}
                    alt={membre.nom}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-ink font-medium">{membre.nom}</p>
                  <p className="text-small text-ink-soft mt-1">{membre.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Bande de matière : fond papier second et filets nets, jamais de lisière
          — entre deux bandes claires, un fondu vers le noir creuserait une
          tache au milieu du papier (règle de couture V3). */}
      <section
        role="region"
        aria-label="Matières et savoir-faire locaux"
        data-surface="pale"
        className={cn("border-line-encre border-y py-20 md:py-24", ton.fond)}
      >
        <div className="max-w-content mx-auto px-4 md:px-6">
          <Kicker label="MATIÈRES" tone={ton.cartouche} className="mb-4" />
          <h2 className={cn("font-display text-h2 max-w-3xl font-bold", ton.titre)}>
            Matières et savoir-faire locaux
          </h2>
          <p className={cn("text-body mt-4 max-w-2xl", ton.texte)}>
            Terre compressée, rotin tressé, terre cuite : nous construisons et meublons avec ce que
            le pays produit, sélectionné pour durer.
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MATIERES.map((matiere) => (
              <li key={matiere.id} className="st-card rounded-card overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={matiere.src}
                    alt={matiere.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-ink font-medium">{matiere.titre}</p>
                  <p className="text-small text-ink-soft mt-1">{matiere.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Stats />
      <div className="max-w-content mx-auto px-4 pb-32 md:px-6 md:pb-24">
        <TechDivider label="DEPUIS YAOUNDÉ" />
        <div className="mt-10">
          <ButtonTech asChild variant="conversion" size="lg">
            <Link href="/devis">Demander un devis</Link>
          </ButtonTech>
        </div>
      </div>

      <StickyMobileCta label="Demander un devis" href="/devis" />
    </>
  );
}
