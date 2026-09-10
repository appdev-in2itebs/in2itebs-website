import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (file: string) => readFileSync(path.join(process.cwd(), file), "utf8");
const css = () => read("app/globals.css");

/** Returns the body of the first CSS block whose selector list contains `selector`. */
function block(source: string, selector: string): string {
  const start = source.indexOf(selector);
  assert.ok(start >= 0, `${selector} block missing`);
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    if (source[i] === "}") depth--;
    if (depth === 0) return source.slice(open + 1, i);
  }
  throw new Error(`unterminated block for ${selector}`);
}

test("gold and glass tokens exist in both theme blocks", () => {
  const source = css();
  const light = block(source, ".theme-light {");
  const dark = block(source, ".theme-dark {");
  for (const token of [
    "--color-gold:",
    "--color-gold-display:",
    "--color-gold-on-brand:",
    "--color-gold-soft:",
    "--color-glass:",
    "--color-glass-line:",
    "--shadow-glass:",
    "--shadow-glass-hover:",
    "--glow-gold:",
    "--glass-alpha:",
    "--glass-alpha-elevated:",
    "--glass-blur:",
    "--gradient-heading:",
    "--gradient-heading-on-brand:",
    "--gradient-numeral:",
  ]) {
    assert.ok(light.includes(token), `light theme lacks ${token}`);
    assert.ok(dark.includes(token), `dark theme lacks ${token}`);
  }
  assert.match(light, /--color-gold:\s*51\.14% 0\.082 83\.6/);
  assert.match(light, /--color-gold-display:\s*57% 0\.085 84/);
  assert.match(dark, /--color-bg-canvas:\s*12\.87% 0\.008 268\.5/);
  // Prettier normalises the authored `0.100` chroma to `0.1`; the numeric value is unchanged.
  assert.match(dark, /--color-gold:\s*72\.45% 0\.1 82\.3/);
});

test("the on-brand scope remaps gold to the champagne tone", () => {
  const onBrand = block(css(), ".theme-on-brand {");
  assert.match(onBrand, /--color-gold:\s*var\(--color-gold-on-brand\)/);
  assert.match(onBrand, /--color-gold-display:\s*var\(--color-gold-on-brand\)/);
});

test("tailwind exposes the gold and glass roles", () => {
  const config = read("tailwind.config.ts");
  // Prettier leaves `gold` and `glass` unquoted and quotes the hyphenated keys, so the quotes are optional here.
  for (const role of ["gold", "gold-display", "gold-on-brand", "gold-soft", "glass", "glass-line"])
    assert.ok(new RegExp(`"?${role}"?:\\s*"oklch\\(var\\(--color-${role}\\) / <alpha-value>\\)"`).test(config), role);
  for (const shadow of ["glass:", '"glass-hover":', '"glow-gold":']) assert.ok(config.includes(shadow), shadow);
});

test("three.js is pinned exactly", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies.three, "0.186.0");
  assert.equal(pkg.devDependencies["@types/three"], "0.185.4");
});

test("every glass, gradient and motion utility the components use is defined", () => {
  const source = css();
  for (const hook of [
    "glass",
    "glass-elevated",
    "glass-card",
    "glass-card-selected",
    "glass-pill",
    "glass-gold",
    "rule-gold",
    "hero-ambient",
    "reveal",
    "stagger",
    "text-gradient-heading",
    "text-gradient-numeral",
    "text-gold",
    "heading-plain",
    "nav-link",
    "btn-shimmer",
    "icon-tile",
  ])
    assert.ok(new RegExp(`\\.${hook}(?![\\w-])`).test(source), `.${hook} is not defined in globals.css`);
});

test("headings inside main carry the gradient and can opt out", () => {
  const source = css();
  assert.match(source, /main h1,\s*main h2\s*\{[^}]*background-image:\s*var\(--gradient-heading\)/);
  assert.match(
    source,
    /main \.theme-on-brand h1,\s*main \.theme-on-brand h2\s*\{[^}]*var\(--gradient-heading-on-brand\)/,
  );
  assert.match(source, /\.heading-plain\s*\{[^}]*background-image:\s*none/);
});

test("reveals hide content only after hydration and never while paused or reduced", () => {
  const source = css();
  const hidden = source.match(/([^\n{}]*)\{\s*opacity:\s*0;\s*transform:\s*translateY\(18px\);\s*\}/);
  assert.ok(hidden, "no reveal hiding rule");
  assert.equal(
    hidden![1].trim(),
    'html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"])',
  );
  const reduced = block(source, "@media (prefers-reduced-motion: reduce)");
  assert.match(reduced, /\.reveal\s*\{[^}]*opacity:\s*1 !important/);
});

test("Reveal, Stagger and StaggerItem render the reveal hooks", () => {
  const source = read("components/motion/reveal.tsx");
  assert.match(source, /"reveal"/);
  assert.match(source, /"stagger"/);
  assert.match(source, /--reveal-delay/);
  assert.match(source, /Math\.min\(index, 8\) \* 70/);
  // `Reveal` honours its own `delay` prop (seconds at the call sites) through the same custom property.
  assert.match(source, /Math\.round\(delay \* 1000\)/);
});

test("MotionObserver is mounted before main and MotionControls declares ownership", () => {
  const layout = read("app/layout.tsx");
  const observerAt = layout.indexOf("<MotionObserver />");
  assert.ok(observerAt >= 0, "MotionObserver is not mounted in the root layout");
  assert.ok(observerAt < layout.indexOf('<main id="main">'), "MotionObserver must precede main");
  const controls = read("components/sections/motion-controls.tsx");
  assert.match(controls, /dataset\.motionOwner = "controls"/);
  assert.match(controls, /delete document\.documentElement\.dataset\.motionOwner/);
  const observer = read("components/motion/motion-observer.tsx");
  assert.match(observer, /IntersectionObserver/);
  assert.match(observer, /dataset\.reveal = "in"/);
  assert.match(observer, /motionOwner/);
});

test("the hero scene imports three by named specifiers and the loader defers it", () => {
  const scene = read("components/hero/hero-3d.tsx");
  assert.ok(!/import \* as/.test(scene), "namespace import defeats tree-shaking");
  assert.match(scene, /from "three"/);
  assert.match(scene, /TorusKnotGeometry/);
  const loader = read("components/hero/hero-3d-loader.tsx");
  assert.match(loader, /import\("\.\/hero-3d"\)/);
  assert.match(loader, /ssr: false/);
  for (const reason of ["viewport", "reduced-motion", "save-data", "no-webgl", "hidden"])
    assert.ok(loader.includes(`"${reason}"`), `loader lacks reason ${reason}`);
});

test("check-build enforces the three.js chunk budget", () => {
  const script = read("scripts/check-build.mjs");
  assert.match(script, /TorusKnotGeometry/);
  assert.match(script, /app-build-manifest\.json/);
  assert.match(script, /700000|700_000/);
});
