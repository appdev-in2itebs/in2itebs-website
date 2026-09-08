/** Delivery model content — SOT-05, 06, 38, 39, 40, 41 */

export const tiers = [
  {
    n: 1,
    name: "Business Consulting & Advisory",
    items: ["Transformation strategy", "Business case", "Process re-engineering", "Change management", "Digital roadmap"],
  },
  {
    n: 2,
    name: "Platform Transformation Services",
    items: ["SAP S/4HANA & modules", "Workday", "Salesforce", "Custom application engineering"],
  },
  {
    n: 3,
    name: "Managed Services & Sustenance",
    items: ["AMS", "Application support", "Technical operations", "Continuous improvement"],
  },
];

export const engagementModels = [
  "Resource-Based", "Turnkey", "Managed Services", "Fixed Bid", "Partner Co-sourcing",
];

export const deliveryFootprints = [
  "Onsite (client)", "Near-shore centre", "Offshore Development Centre (India)",
];

export const fastForwardLayers = [
  {
    n: 1,
    name: "Pre-Built Assets",
    detail: "RDS accelerators, RICEFW templates, country localisations, integration patterns and pre-configured S/4HANA.",
  },
  {
    n: 2,
    name: "Single Delivery Team",
    detail: "The same team from Discover through Run — onsite leads + offshore factory + AMS bench. No handoffs.",
  },
  {
    n: 3,
    name: "Quality Gates",
    detail: "Stage-gate reviews at every Activate phase, signed off by client steering.",
  },
  {
    n: 4,
    name: "Outcome-Linked Pricing",
    detail: "Fixed-bid and outcome-based commercials alongside T&M. Risk shared, not pushed.",
  },
];

export const amsPhases = [
  { name: "Pre-Transition Planning", weeks: "Wks -4–0", activities: ["Governance setup", "Confirm transition plan", "Network connectivity", "Service-desk bonding"] },
  { name: "Planning", weeks: "Wks 1–2", activities: ["Team onboarding", "Detailed KT plan", "Access provisioning", "Phase completion criteria"] },
  { name: "Knowledge Acquisition", weeks: "Wks 3–7", activities: ["KT sessions", "Documentation drafts", "Application understanding doc", "Process & procedure doc"] },
  { name: "Shadow", weeks: "Wks 8–12", activities: ["Shadow live tickets", "Update documentation", "Operational readiness review"] },
  { name: "Reverse Shadow", weeks: "Wks 13–16", activities: ["Lead on ticket resolution", "Final documentation", "Service commencement"] },
];

export const factorySteps = [
  { name: "Plan", items: ["Strategy alignment", "Integrated app architecture", "Demand management", "Projectize"] },
  { name: "Build", items: ["Design", "Develop", "Testing", "Release", "Integrated delivery"] },
  { name: "Run", items: ["Test env", "Pre-prod env", "Prod env"] },
];
