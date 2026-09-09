import type { MetadataRoute } from "next";
import { sapChildren } from "@/content/nav";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { caseStudies } from "@/content/case-studies";
import { insightBodies } from "@/content/insight-bodies";
import { contentUpdated } from "@/content/site";
import { SITE_URL } from "@/lib/utils";

/** Canonical route inventory — three-pillar IA. All paths use trailing slashes. */
export default function sitemap(): MetadataRoute.Sitemap {

  const staticPaths = [
    "/",
    // What We Do — pillars
    "/what-we-do/",
    "/platform-services/",
    "/advisory/",
    "/digital-data-ai/",
    "/digital-data-ai/application-engineering/",
    "/digital-data-ai/ai-automation/",
    "/delivery-excellence/",
    // Platform practices
    "/sap-enterprise-solutions/",
    "/salesforce/",
    "/workday/",
    "/oracle/",
    "/microsoft/",
    "/ecc-prism/",
    // Proof & company
    "/industries/",
    "/case-studies/",
    "/partners/",
    "/why-in2it-ebs/",
    "/about/",
    "/insights/",
    "/careers/",
    "/contact/",
    "/legal/privacy-notice/",
    "/legal/privacy-policy/",
    "/legal/disclaimer/",
  ];

  const dynamicPaths = [
    ...sapChildren.map((c) => c.href), // SAP deep-dive sub-pages
    ...industries.map((i) => `/industries/${i.slug}/`),
    ...insights.map((p) => `/insights/${p.slug}/`),
    ...caseStudies.filter((c) => c.named).map((c) => `/case-studies/${c.slug}/`),
  ];

  const all = Array.from(new Set([...staticPaths, ...dynamicPaths]));

  const dateFor = (path: string) => {
    const slug = path.match(/^\/insights\/([^/]+)\/$/)?.[1];
    const articleDate = slug ? insightBodies[slug]?.date : "";
    return new Date(articleDate || contentUpdated);
  };

  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: dateFor(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
