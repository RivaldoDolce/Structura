import type { Metadata } from "next";
import { FilAriane } from "@/frontend/components/signature/fil-ariane";
import { Portfolio } from "@/frontend/components/sections/portfolio";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — STRUCTURA",
  description: "Villas, immeubles, mobilier et réparations structurelles livrés au Cameroun.",
};

export default function PagePortfolio() {
  return (
    <>
      <div className="max-w-content mx-auto px-4 pt-24 md:px-6">
        <FilAriane items={[{ label: "Portfolio" }]} />
      </div>
      <div className="pb-24">
        <Portfolio projects={PROJETS_PORTFOLIO} className="pt-10 md:pt-14" />
      </div>
    </>
  );
}
