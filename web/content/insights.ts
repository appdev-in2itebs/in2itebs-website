import type { Insight } from "./types";
import {insightBodies} from './insight-bodies';

/** Additive — ported from old /news/ (titles real; dates to refresh from live data at launch). */
const archivedEntries: Insight[] = [
  {
    slug: "rise-with-sap-s4hana-cloud-transform-business",
    title: "How RISE with SAP S/4HANA Cloud can transform your business",
    date: "",
    category: "SAP",
    excerpt: "A business-process-led path to the Intelligent Enterprise — and how to choose between RISE, GROW and PCE.",
  },
  {
    slug: "revolutionizing-hr-with-sap-successfactors",
    title: "Revolutionising HR with SAP SuccessFactors",
    date: "",
    category: "SuccessFactors / HR",
    excerpt: "Full-suite SuccessFactors, from Core HR and payroll to Talent Intelligence and Joule for HR.",
  },
  {
    slug: "successfactors-ai-innovations-successconnect",
    title: "SAP SuccessFactors AI innovations from SuccessConnect",
    date: "",
    category: "AI",
    excerpt: "Joule, Talent Intelligence and the AI features reshaping the human-experience suite.",
  },
  {
    slug: "grow-with-sap",
    title: "GROW with SAP: public cloud ERP, fast",
    date: "2024-08-20",
    category: "SAP",
    excerpt: "Pre-configured best-practice processes on S/4HANA Cloud Public Edition for faster-moving units.",
  },
  {
    slug: "top-benefits-of-crm-for-your-business",
    title: "Top benefits of implementing a CRM for your business",
    date: "2024-07-05",
    category: "Industry",
    excerpt: "Why a single view of the customer is the foundation of modern sales, service and marketing.",
  },
  {
    slug: "how-erp-software-identifies-business-inefficiencies",
    title: "How ERP software identifies business inefficiencies",
    date: "2024-06-12",
    category: "Industry",
    excerpt: "Turning enterprise data into operational insight across finance, supply chain and HR.",
  },
];

// Only source-backed articles are discoverable. Unknown publication years are omitted.
export const insights = archivedEntries.filter(entry => insightBodies[entry.slug]).map(entry => ({
  ...entry, date: insightBodies[entry.slug].date,
}));
