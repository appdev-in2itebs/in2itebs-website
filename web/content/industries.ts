import type { IndustryMeta } from "./types";

/** 13 industry pages. deckSectors drives which client logos appear (industry-client-map.md). */
export const industries: IndustryMeta[] = [
  {
    slug: "automobiles",
    name: "Automobiles",
    headline: "The race for automotive",
    accentWord: "transformation",
    subhead:
      "Carmakers, suppliers and dealerships transforming for a future of electric, connected and shared mobility.",
    deckSectors: ["Automotives"],
  },
  {
    slug: "fmcg",
    name: "FMCG / Food & Beverages",
    headline: "Consumer goods, reinvented for the",
    accentWord: "digital era",
    subhead:
      "Grow sustainably and profitably — using IoT and AI across product, manufacturing and consumer experience.",
    deckSectors: ["Food & Beverages"],
  },
  {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    headline: "End-to-end solutions for",
    accentWord: "healthcare",
    subhead: "Helping pharmaceutical and medical-device companies, providers and payers achieve measurable results.",
    deckSectors: ["Health & Pharma"],
  },
  {
    slug: "textiles-apparel",
    name: "Textiles & Apparel",
    headline: "Run textile and apparel businesses more",
    accentWord: "profitably",
    subhead: "Drive new growth, deliver digital services and become an intelligent enterprise.",
    deckSectors: ["Apparel & Fashion"],
  },
  {
    slug: "metals-mining",
    name: "Metals, Mining & Heavy Engineering",
    headline: "Smart, sustainable machinery and materials —",
    accentWord: "at scale",
    subhead: "Heavy engineering and industrial manufacturers facing the challenge of profitable sustainability.",
    deckSectors: ["Metals & Mining"],
  },
  {
    slug: "chemicals-fertilizers",
    name: "Chemicals & Fertilizers",
    headline: "Safe, sustainable chemicals through",
    accentWord: "digital transformation",
    subhead: "Keep pace with mergers, changing regulation and innovation with digital manufacturing and supply chain.",
    deckSectors: ["Chemicals"],
  },
  {
    slug: "engineering-construction",
    name: "Engineering & Construction (ECNO)",
    headline: "Build the intelligent enterprise across the",
    accentWord: "construction lifecycle",
    subhead: "RISE with SAP and S/4HANA bring best-practice automation across engineering and construction.",
    deckSectors: ["Infra & Housing"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "Remove operational barriers across the",
    accentWord: "real-estate lifecycle",
    subhead: "Intelligent ERP and asset-management solutions for developers, owners and operators.",
    deckSectors: ["Real Estate"],
  },
  {
    slug: "bfsi",
    name: "Banking, Financial Services & Insurance",
    headline: "Solutions that drive efficiency and",
    accentWord: "innovation",
    subhead: "A strategic vertical — application development, maintenance, product practices, interfaces and testing.",
    deckSectors: ["Services & BFSI"],
  },
  {
    slug: "government-psu",
    name: "Government & Public Enterprises (PSUs)",
    headline: "Smart governance that works for",
    accentWord: "every stakeholder",
    subhead: "Partnering with governments and public-sector entities on efficient, transparent IT-based governance.",
    deckSectors: ["PSUs"],
  },
  {
    slug: "professional-services",
    name: "IT & Professional Services",
    headline: "Run projects more",
    accentWord: "profitably",
    subhead: "Firms rethinking business models to drive growth and engage the best talent.",
    deckSectors: ["IT & Professional Services"],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    headline: "Operational excellence and new revenue for",
    accentWord: "energy",
    subhead: "RISE with SAP and S/4HANA bring best-practice automation to energy and utility businesses.",
    deckSectors: [],
  },
  {
    slug: "media-telecom",
    name: "Media & Telecommunications",
    headline: "Next-generation solutions for media and",
    accentWord: "telecom",
    subhead:
      "Large-scale engagements with flexible consulting, systems integration and rollout across sourcing models.",
    deckSectors: [],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
