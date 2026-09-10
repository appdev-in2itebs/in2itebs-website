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
  assert.match(light, /--color-gold-display:\s*58% 0\.085 84/);
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
