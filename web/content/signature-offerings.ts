import type { SignatureOffering } from "./types";

/** SOT-24, SOT-14, SOT-27 */
export const signatureOfferings: SignatureOffering[] = [
  {
    slug: "packaged-s4hana",
    name: "Packaged S/4HANA",
    summary:
      "Business-ready, GST-compliant S/4HANA — pre-configured industry processes, embedded analytics and Fiori UX.",
    metric: "Live in 16 weeks, not 12–18 months",
    href: "/sap-enterprise-solutions/#core-erp-s4hana",
    cta: "See the packaged build",
  },
  {
    slug: "ai-hr-health-check",
    name: "AI-powered HR Health Check",
    summary:
      "An ML audit of your SuccessFactors tenant with a quantified $/FTE roadmap, benchmarked against 200+ peers.",
    metric: "4–6 week engagement",
    href: "/sap-enterprise-solutions/#ai-intelligence",
    cta: "Explore the diagnostic",
  },
  {
    slug: "converged-intelligence",
    name: "The Converged Intelligence Stack",
    summary:
      "SuccessFactors, Joule, BTP AI and extensions brought into one operating model — composable, intelligent, continuous.",
    metric: "Our point of view",
    href: "/why-in2it-ebs/",
    cta: "See our point of view",
  },
];
