// Asserts that the artefacts in .next match SITE_ENV. Runs automatically after `next build` (postbuild).
import {readFileSync, existsSync} from "node:fs";
const env = process.env.SITE_ENV;
if (env !== "production" && env !== "preview") { console.error(`check-build: SITE_ENV must be production or preview, got ${JSON.stringify(env)}`); process.exit(1); }
const robotsPath = ".next/server/app/robots.txt.body";
if (!existsSync(robotsPath)) { console.error(`check-build: ${robotsPath} not found`); process.exit(1); }
const robots = readFileSync(robotsPath, "utf8");
const manifest = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
const headerValues = (manifest.headers ?? []).flatMap((h) => h.headers.map((x) => `${x.key}: ${x.value}`));
const hasNoindex = headerValues.some((v) => /^x-robots-tag: .*noindex/i.test(v));
const failures = [];
if (env === "production") {
  if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots)) failures.push("production build has a robots.txt that blocks crawling");
  if (hasNoindex) failures.push("production build still sends X-Robots-Tag noindex");
} else {
  if (!/Disallow: \/\s*$/m.test(robots)) failures.push("preview build must disallow crawling in robots.txt");
  if (!hasNoindex) failures.push("preview build must send X-Robots-Tag noindex");
}
if (failures.length) { for (const f of failures) console.error(`check-build: ${f}`); process.exit(1); }
console.log(`check-build: ok (SITE_ENV=${env}, noindex=${hasNoindex})`);
