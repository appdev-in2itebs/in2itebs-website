// Asserts that the artefacts in .next match SITE_ENV. Runs automatically after `next build` (postbuild).
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
const env = process.env.SITE_ENV;
if (env !== "production" && env !== "preview") {
  console.error(`check-build: SITE_ENV must be production or preview, got ${JSON.stringify(env)}`);
  process.exit(1);
}
const robotsPath = ".next/server/app/robots.txt.body";
if (!existsSync(robotsPath)) {
  console.error(`check-build: ${robotsPath} not found`);
  process.exit(1);
}
const robots = readFileSync(robotsPath, "utf8");
const manifest = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
const headerValues = (manifest.headers ?? []).flatMap((h) => h.headers.map((x) => `${x.key}: ${x.value}`));
const hasNoindex = headerValues.some((v) => /^x-robots-tag: .*noindex/i.test(v));
const failures = [];
if (env === "production") {
  if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots))
    failures.push("production build has a robots.txt that blocks crawling");
  if (hasNoindex) failures.push("production build still sends X-Robots-Tag noindex");
  if (!/Disallow: \/api\//.test(robots) || !/Disallow: \/thank-you\//.test(robots))
    failures.push("production robots.txt must disallow /api/ and /thank-you/");
  if (/^Host:/m.test(robots)) failures.push("robots.txt must not use the non-standard Host directive");
} else {
  if (!/Disallow: \/\s*$/m.test(robots)) failures.push("preview build must disallow crawling in robots.txt");
  if (!hasNoindex) failures.push("preview build must send X-Robots-Tag noindex");
}
const prerender = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const prerenderedPages = Object.keys(prerender.routes).filter(
  (r) => !/\.(xml|txt)$/.test(r) && r !== "/opengraph-image",
);
if (prerenderedPages.length < 60)
  failures.push(
    `only ${prerenderedPages.length} pages are prerendered; expected at least 60 (is cookies()/headers() used in a layout?)`,
  );
// Premium restyle: three.js must stay in one lazily loaded chunk.
// Recursive: a static `import "three"` lands in .next/static/chunks/app/<route>/page-<hash>.js, which a
// top-level-only scan would miss entirely — the budget would pass while three.js shipped as initial JS.
const chunkDir = ".next/static/chunks";
const chunkFiles = existsSync(chunkDir)
  ? readdirSync(chunkDir, { recursive: true })
      .map((f) => f.replaceAll("\\", "/"))
      .filter((f) => f.endsWith(".js"))
  : [];
const withThree = chunkFiles.filter((f) => readFileSync(`${chunkDir}/${f}`, "utf8").includes("TorusKnotGeometry"));
if (withThree.length !== 1) {
  failures.push(`expected exactly one chunk containing three.js, found ${withThree.length}: ${withThree.join(", ")}`);
} else {
  const [threeChunk] = withThree;
  const appManifest = readFileSync(".next/app-build-manifest.json", "utf8");
  if (appManifest.includes(threeChunk))
    failures.push(`three.js chunk ${threeChunk} is referenced as initial JavaScript`);
  const size = statSync(`${chunkDir}/${threeChunk}`).size;
  if (size > 700_000) failures.push(`three.js chunk ${threeChunk} is ${size} bytes, budget is 700000`);
  console.log(`three.js chunk ${threeChunk}: ${size} bytes, lazy only`);
}
if (failures.length) {
  for (const f of failures) console.error(`check-build: ${f}`);
  process.exit(1);
}
console.log(`check-build: ok (SITE_ENV=${env}, noindex=${hasNoindex})`);
