import type { Metadata } from "next";
import { Portfolio } from "@/frontend/components/sections/portfolio";
import { PROJETS_PORTFOLIO } from "@/frontend/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — STRUCTURA",
  description:
    "Villas, immeubles, mobilier et réparations structurelles livrés au Cameroun.",
};

export default function PagePortfolio() {
  return (
    <div className="pb-24">
      <Portfolio projects={PROJETS_PORTFOLIO} />
    </div>
  );
}
