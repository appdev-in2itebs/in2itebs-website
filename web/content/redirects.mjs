// 301/308 redirect map: legacy in2itebs.com URLs -> three-pillar IA.
// Imported by next.config.mjs. Destinations point at the FINAL new-IA target
// (no redirect chains). Lorem/demo pages -> home.

const p = (source, destination) => ({ source, destination, permanent: true });

export const redirects = [
  p("/insights/grow-with-sap", "/sap-enterprise-solutions/rise-vs-grow/"),
  // --- Retired v1 hubs -> new pillar IA ---
  p("/services", "/what-we-do/"),
  p("/application-development-managed-services", "/digital-data-ai/application-engineering/"),

  // --- SAP cluster -> SAP deep-dive sub-pages ---
  p("/sap-rise-with-sap", "/sap-enterprise-solutions/rise-vs-grow/"),
  p("/sap-success-factors", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-concur", "/sap-enterprise-solutions/concur/"),
  p("/sap-concur-2", "/sap-enterprise-solutions/concur/"),
  p("/sap-sac", "/sap-enterprise-solutions/analytics-cloud/"),
  p("/sap-qualtrics", "/sap-enterprise-solutions/"),
  p("/simplifytalent", "/sap-enterprise-solutions/successfactors/"),
  p("/simplifyhiring", "/sap-enterprise-solutions/successfactors/"),
  // ECC Prism retained at /ecc-prism/

  // --- ADMS / app engineering ---
  p("/application-development-maintenance-services-adms", "/digital-data-ai/application-engineering/"),
  p("/application-development-maintenance-services-adms-2", "/digital-data-ai/application-engineering/"),
  p("/development-maintenance", "/digital-data-ai/application-engineering/"),
  p("/application-maintenance-support", "/digital-data-ai/application-engineering/"),
  p("/agile-devops", "/digital-data-ai/application-engineering/"),
  p("/agile-devops-2", "/digital-data-ai/application-engineering/"),

  // --- Digital services -> Digital, Data & AI ---
  p("/digital-services", "/digital-data-ai/"),
  p("/digital-transformation-services", "/digital-data-ai/"),
  p("/other-enterprise-solutions", "/what-we-do/"),

  // --- Cloud / infra / security (no dedicated page) -> nearest tech home ---
  p("/cloud-strategy", "/digital-data-ai/"),
  p("/cloud-strategy-2", "/digital-data-ai/"),
  p("/cloud-migration", "/digital-data-ai/"),
  p("/cloud-migration-2", "/digital-data-ai/"),
  p("/cloud-hosting-services", "/digital-data-ai/"),
  p("/cloud-and-infra-security", "/digital-data-ai/"),
  p("/cyber-security-services", "/digital-data-ai/"),
  p("/cyber-security-services-2", "/digital-data-ai/"),
  p("/security-and-risk-advisory", "/advisory/"),
  p("/security-and-risk-advisory-2", "/advisory/"),
  p("/identity-and-access-management", "/digital-data-ai/"),
  p("/identity-and-access-management-2", "/digital-data-ai/"),

  // --- Future platforms (Oracle / Microsoft) -> Platform Services ---
  p("/oracle-2", "/oracle/"),
  p("/oracle-3", "/oracle/"),
  p("/microsoft-2", "/microsoft/"),
  p("/ms-office-365", "/microsoft/#microsoft-365"),
  p("/microsoft-dynamics-365", "/microsoft/#dynamics-365"),

  // --- Data / AI / automation -> Digital, Data & AI ---
  p("/data-analytics-ai", "/digital-data-ai/"),
  p("/data-analytics-ai-2", "/digital-data-ai/"),
  p("/database-data-management", "/digital-data-ai/"),
  p("/database-data-management-2", "/digital-data-ai/"),
  p("/predictive-analysis", "/digital-data-ai/"),
  p("/ai-machine-learning", "/digital-data-ai/ai-automation/"),
  p("/ai-machine-learning-2", "/digital-data-ai/ai-automation/"),
  p("/big-data", "/digital-data-ai/"),
  p("/big-data-2", "/digital-data-ai/"),
  p("/blockchain", "/digital-data-ai/"),
  p("/robotic-process-automation", "/digital-data-ai/ai-automation/"),
  p("/robotic-process-automation-2", "/digital-data-ai/ai-automation/"),

  // --- Industries ---
  p("/fmcg", "/industries/fmcg/"),
  p("/fmcg-2", "/industries/fmcg/"),
  p("/manufacturing", "/industries/metals-mining/"),
  p("/heavy-engineering", "/industries/metals-mining/"),
  p("/heavy-engineering-2", "/industries/metals-mining/"),
  p("/textiles", "/industries/textiles-apparel/"),
  p("/textiles-2", "/industries/textiles-apparel/"),
  p("/retail-ecommerce", "/industries/textiles-apparel/"),
  p("/retail-ecommerce-2", "/industries/textiles-apparel/"),
  p("/professional-services", "/industries/professional-services/"),
  p("/professional-services-2", "/industries/professional-services/"),
  p("/chemical-fertilizers", "/industries/chemicals-fertilizers/"),
  p("/chemical-fertilizers-2", "/industries/chemicals-fertilizers/"),
  p("/energy-and-utilities", "/industries/energy-utilities/"),
  p("/banking", "/industries/bfsi/"),
  p("/government", "/industries/government-psu/"),
  p("/healthcare-life-science", "/industries/healthcare-life-sciences/"),
  p("/healthcare-life-science-2", "/industries/healthcare-life-sciences/"),
  p("/telecom", "/industries/media-telecom/"),
  p("/engineering-constructions-ecno", "/industries/engineering-construction/"),
  p("/engineering-constructions-ecno-2", "/industries/engineering-construction/"),
  p("/automobiles", "/industries/automobiles/"),

  // --- Partners ---
  p("/sap", "/partners/"),
  p("/open-text-2", "/partners/"),
  p("/ibm", "/partners/"),
  p("/newgen-2", "/partners/"),
  p("/hp-2", "/partners/"),
  p("/aws-2", "/partners/"),

  // --- About / people ---
  p("/who-we-are", "/about/"),
  p("/our-leadership", "/about/"),
  p("/out-leadership", "/about/"),
  p("/accreditation-awards", "/about/"),

  // --- Customer stories / case studies ---
  p("/customer-stories", "/case-studies/"),
  p("/welspun", "/case-studies/"),
  p("/ibg-goes-live-with-sap-successfactors", "/case-studies/"),
  p("/wework-rise-with-sap-s4hana", "/case-studies/"),
  p("/sharechat-rise-with-sap-s4hana", "/case-studies/"),

  // --- Lead funnel / news ---
  p("/expert-advice", "/contact/"),
  p("/news", "/insights/"),

  // --- Region / city pages -> home ---
  p("/home-kenya", "/"),
  p("/home-southafrica", "/"),
  p("/in2it-india", "/"),
  p("/in2it-singapore", "/"),
  p("/in2it-dubai", "/"),
  p("/in2it-melbourne", "/"),
  p("/in2it-manila", "/"),
  p("/in2it-malaysia", "/"),
  p("/in2it-bangkok", "/"),

  // --- Legal ---
  p("/privacy-notice", "/legal/privacy-notice/"),
  p("/privacy-policy", "/legal/privacy-policy/"),
  p("/privacy-policy-2", "/legal/privacy-policy/"),
  p("/disclaimer", "/legal/disclaimer/"),

  // --- Lorem / demo ---
  p("/slide-anything-popup-preview", "/"),
  p("/event-2024", "/insights/"),

  // --- Legacy blog posts with exact new equivalents (audit H4, 2026-09-08) ---
  p(
    "/how-rise-with-sap-s-4hana-cloud-can-transform-your-business",
    "/insights/rise-with-sap-s4hana-cloud-transform-business/",
  ),
  p(
    "/revolutionizing-hr-with-sap-successfactors-a-strategic-approach-to-modern-hcm-solutions",
    "/insights/revolutionizing-hr-with-sap-successfactors/",
  ),
  p(
    "/igniting-organizational-potential-sap-successfactors-ai-innovations-revealed-at-sap-successconnect-las-vegas",
    "/insights/successfactors-ai-innovations-successconnect/",
  ),
  p("/grow-with-sap", "/sap-enterprise-solutions/rise-vs-grow/"),
  p("/grow-with-sap-leadership-forum-event", "/sap-enterprise-solutions/rise-vs-grow/"),
  // --- SuccessFactors local landing pages and campaigns ---
  p("/in2it-ebs-simplify-hiring", "/sap-enterprise-solutions/successfactors/"),
  p("/in2it-ebs-simplify-talent-2", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-india", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-bangalore", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-mumbai", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-chennai", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-delhi", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-kolkata", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-hyderabad", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-bhubaneswar", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation-register-now", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation-register-now1", "/sap-enterprise-solutions/successfactors/"),
  // --- Careers, FAQ, leadership profiles, news archive ---
  p("/join-our-team", "/careers/"),
  p("/apply-now", "/careers/"),
  p("/our-culture", "/careers/"),
  p("/sap-and-success-factor-consultant", "/careers/"),
  p("/events-celebrations-3", "/careers/"),
  p("/faq", "/contact/"),
  p("/dharmendra-sharma", "/about/"),
  p("/anil-kumar-soleti", "/about/"),
  p("/rajat-kapoor", "/about/"),
  p("/news/page/2", "/insights/"),
  p("/global-webinar", "/insights/"),
];

/** WordPress theme-demo URLs that never held In2IT content: served as HTTP 410 via a rewrite to /api/gone/. */
export const goneSources = [
  "/attract-and-retain-quality-high-paying-customers",
  "/coronavirus-lockdown-leads-to-more-gaming-and-e-sports",
  "/future-where-technology-creates-good-jobs",
  "/live-stream-from-awwwards-showcasing-trends",
  "/solutions-for-all-small-and-large-business",
  "/what-you-do-today-improve-your-tomorrows",
  "/case",
  "/case/:path*",
  "/event",
  "/event/:path*",
];
