import type { Metadata } from "next";
import { PLANS } from "@/frontend/data/plans";
import { CataloguePlans } from "./catalogue-plans";

export const metadata: Metadata = {
  title: "Catalogue de plans — STRUCTURA",
  description:
    "Plans de villas, immeubles et duplex prêts à construire, adaptables à votre terrain.",
};

export default function PagePlans() {
  return <CataloguePlans plans={PLANS} />;
}
