import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { redirects, goneSources } from "../content/redirects.mjs";

const required: [string, string][] = [
  [
    "/how-rise-with-sap-s-4hana-cloud-can-transform-your-business",
    "/insights/rise-with-sap-s4hana-cloud-transform-business/",
  ],
  [
    "/revolutionizing-hr-with-sap-successfactors-a-strategic-approach-to-modern-hcm-solutions",
    "/insights/revolutionizing-hr-with-sap-successfactors/",
  ],
  [
    "/igniting-organizational-potential-sap-successfactors-ai-innovations-revealed-at-sap-successconnect-las-vegas",
    "/insights/successfactors-ai-innovations-successconnect/",
  ],
  ["/grow-with-sap", "/sap-enterprise-solutions/rise-vs-grow/"],
  ["/grow-with-sap-leadership-forum-event", "/sap-enterprise-solutions/rise-vs-grow/"],
  ["/in2it-ebs-simplify-hiring", "/sap-enterprise-solutions/successfactors/"],
  ["/in2it-ebs-simplify-talent-2", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-successfactors-partner-in-india", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-success-factors-in-bangalore", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-successfactors-partner-in-mumbai", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-successfactors-partner-in-chennai", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-successfactors-partner-in-delhi", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-successfactors-partner-in-kolkata", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-success-factors-in-hyderabad", "/sap-enterprise-solutions/successfactors/"],
  ["/sap-success-factors-in-bhubaneswar", "/sap-enterprise-solutions/successfactors/"],
  ["/unlock-the-power-of-hr-technology-transformation", "/sap-enterprise-solutions/successfactors/"],
  ["/unlock-the-power-of-hr-technology-transformation-register-now", "/sap-enterprise-solutions/successfactors/"],
  ["/unlock-the-power-of-hr-technology-transformation-register-now1", "/sap-enterprise-solutions/successfactors/"],
  ["/join-our-team", "/careers/"],
  ["/apply-now", "/careers/"],
  ["/our-culture", "/careers/"],
  ["/sap-and-success-factor-consultant", "/careers/"],
  ["/events-celebrations-3", "/careers/"],
  ["/faq", "/contact/"],
  ["/dharmendra-sharma", "/about/"],
  ["/anil-kumar-soleti", "/about/"],
  ["/rajat-kapoor", "/about/"],
  ["/news/page/2", "/insights/"],
  ["/global-webinar", "/insights/"],
];
const gone = [
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

test("every required legacy URL redirects to its new home", () => {
  const map = new Map(redirects.map((r) => [r.source, r.destination]));
  for (const [source, destination] of required) assert.equal(map.get(source), destination, source);
});
test("redirect destinations resolve to a route directory", () => {
  for (const r of redirects) {
    const target = r.destination.replace(/#.*$/, "");
    assert.ok(target.endsWith("/"), `${r.destination} needs a trailing slash`);
    const dir = path.join(process.cwd(), "app", target);
    const dynamicParent = path.join(process.cwd(), "app", target.split("/").slice(0, -2).join("/"), "[slug]");
    assert.ok(
      existsSync(path.join(dir, "page.tsx")) || existsSync(dynamicParent),
      `${r.source} -> ${r.destination} has no page`,
    );
  }
  const sources = new Set(redirects.map((r) => r.source));
  for (const r of redirects)
    assert.ok(!sources.has(r.destination.replace(/\/$/, "")), `${r.source} chains into another redirect`);
});
test("theme-demo URLs are listed as gone, not redirected", () => {
  for (const g of gone) assert.ok(goneSources.includes(g), g);
  const sources = new Set(redirects.map((r) => r.source));
  for (const g of goneSources) assert.ok(!sources.has(g), `${g} is both gone and redirected`);
});
