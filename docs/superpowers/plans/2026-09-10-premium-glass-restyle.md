# Premium Glass Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every page of the In2IT EBS site the reference prototype's premium glassmorphism look — a three.js 3D hero on the homepage, frosted-glass surfaces, gold-tinted text, gradient headings, entrance reveals and hover micro-interactions — without changing any content, image, route, accessibility or performance guarantee.

**Architecture:** All styling flows through the existing semantic OKLCH token system in `web/app/globals.css` and `web/tailwind.config.ts`, extended with gold and glass roles and a small set of component-layer utilities (`glass*`, `text-gradient-*`, `reveal`, `hero-ambient`). Shared primitives (`Button`, `Card`, `Eyebrow`, `Header`, `Footer`, `PageHero`, `CtaSection`, `FeatureGrid`…) adopt the utilities so the 39 routes change through a handful of files, followed by a mechanical sweep of the inner pages that still carry legacy palette classes. The 3D hero is a client-only three.js scene behind the existing service carousel, imported lazily by a loader that enforces viewport, reduced-motion, save-data, WebGL and idle-time rules and reports its state on a `data-hero-3d` attribute. A single `MotionObserver` client component drives scroll-in reveals and owns the motion flags on pages that lack the homepage's pause control.

**Tech Stack:** Next.js 15.5 App Router, React 19, TypeScript, Tailwind 3.4, three.js 0.186.0 (+ `@types/three` 0.185.4), node:test via tsx, Playwright 1.63 + axe, Prettier, ESLint 9.

**Spec:** `docs/superpowers/specs/2026-09-10-premium-glass-restyle-design.md` (read it first; it is the authority, this plan argues from it).

## Global Constraints

Copied from spec §2. Every task's requirements include these.

1. No file under `web/content/` or `web/public/` is modified, added or removed.
2. Contrast: normal text ≥ 4.5:1, large text and meaningful boundaries ≥ 3:1, both themes. `tests/browser/theme-contrast.spec.ts` pairs are extended, never relaxed.
3. Essential text is visible before hydration. `.reveal` may hide content only under `html[data-motion-ready]:not([data-motion-paused="true"])`.
4. Decorative motion (including the WebGL hero) pauses under the "Pause page animation" control, `prefers-reduced-motion`, hidden tabs and offscreen state. Existing `.ambient-orb`/`.system-halo` `animation: none !important` kill rules stay.
5. No dynamic APIs (`cookies()`, `headers()`) in server components; the prerender floor in `scripts/check-build.mjs` holds.
6. `next.config.mjs` and the CSP are untouched; three.js is bundled, no `eval`.
7. Existing unit and browser tests keep passing; a test changed on purpose carries a comment saying why.
8. Pinned layout facts stay true: region combobox visible in the header at ≥ 1280px; `#desktop-nav-0` inside a 1280px viewport; carousel mounts exactly previous/active/next `img[srcset]`; `client-ribbon*` hooks and its pause/expand buttons; `#quick-contact-panel` and footer-proximity hiding; theme cookie contract.
9. three.js lives in exactly one lazily loaded chunk ≤ 700 000 bytes that no route references as initial JavaScript.
10. `npm run check` (Prettier, ESLint, TypeScript, unit tests) is green after every task. Commit after every task with the `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` trailer.
11. Class hooks used by markup must be Tailwind utilities or defined in `globals.css` (the foundations test enforces a sample; keep it true generally).
12. All work happens in `web/` on branch `restyle/2026-09-10-premium-glass`. Run commands from `web/`. A preview server may be running on 127.0.0.1:3107; browser specs reuse it, so rebuild (`npm run build`) and restart it (`SITE_ENV=preview npm start` on port 3107, detached) before running browser specs against changed code.

---

## File structure

| File | Responsibility |
|---|---|
| `web/app/globals.css` | tokens (light, dark, on-brand remap), glass/gradient/reveal/nav utilities, heading gradient rules |
| `web/tailwind.config.ts` | expose gold/glass colours and glass shadows |
| `web/components/motion/reveal.tsx` | `Reveal`, `Stagger`, `StaggerItem` markup hooks (server-safe) |
| `web/components/motion/motion-observer.tsx` | client: IntersectionObserver reveals, motion flags when no controls are mounted |
| `web/components/hero/hero-3d-loader.tsx` | client: decides whether/when to mount the scene, reports `data-hero-3d` |
| `web/components/hero/hero-3d.tsx` | client: the three.js scene, theme presets, pause/resume, cleanup |
| `web/components/ui/*` | Button, Card, typography, SAP badge adopt glass/gold |
| `web/components/layout/*` | Header (glass, scroll state, nav underline), Footer (gold rule), QuickContact (glass) |
| `web/components/sections/*` | heroes, CTA, cards, grids, tables, tiles adopt glass/gold |
| `web/components/forms/demo-form.tsx`, `web/components/interactive/rise-grow-chooser.tsx` | glass fields and option cards |
| `web/app/page.tsx`, `web/app/**/page.tsx`, `web/app/not-found.tsx` | homepage sections and the legacy-class sweep |
| `web/scripts/check-build.mjs` | three chunk budget assertions |
| `web/tests/design-system.test.ts` | unit tests for tokens, utilities, reveal rules, three imports |
| `web/tests/foundations.test.ts` | class-hook list extended; legacy-palette regression test |
| `web/tests/browser/theme-contrast.spec.ts` | gold pairs |
| `web/tests/browser/hero.spec.ts` | loader states, fallback, pause |
| `DESIGN.md` (root), `docs/REMEDIATION_RUNBOOK.md`, `web/WORKLOG.md` | documentation |

---

## Phase 0 — Foundation

### Task 1: Dependencies, gold and glass tokens, Tailwind roles, contrast pairs

**Files:**
- Modify: `web/package.json`, `web/package-lock.json` (via npm)
- Modify: `web/app/globals.css` (the `:root, .theme-light` and `.theme-dark` blocks, `.theme-on-brand`)
- Modify: `web/tailwind.config.ts`
- Modify: `web/tests/browser/theme-contrast.spec.ts`
- Create: `web/tests/design-system.test.ts`

**Interfaces:**
- Produces CSS custom properties: `--color-gold`, `--color-gold-display`, `--color-gold-on-brand`, `--color-gold-soft`, `--color-glass`, `--color-glass-line`, `--shadow-glass`, `--shadow-glass-hover`, `--glow-gold`, `--glass-alpha`, `--glass-alpha-elevated`, `--glass-blur`, `--gradient-heading`, `--gradient-heading-on-brand`, `--gradient-numeral`.
- Produces Tailwind colours `gold`, `gold-display`, `gold-on-brand`, `gold-soft`, `glass`, `glass-line`; shadows `glass`, `glass-hover`, `glow-gold`.
- Produces dependencies `three@0.186.0`, `@types/three@0.185.4` (dev).

- [ ] **Step 1: Install three.js**

Run from `web/`:

```bash
npm install three@0.186.0 && npm install --save-dev @types/three@0.185.4
```

Expected: `package.json` gains `"three": "0.186.0"` under dependencies and `"@types/three": "0.185.4"` under devDependencies (exact pins; edit the caret away if npm added one).

- [ ] **Step 2: Write the failing token tests**

Create `web/tests/design-system.test.ts`:

```ts
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
  assert.match(dark, /--color-gold:\s*72\.45% 0\.100 82\.3/);
});

test("the on-brand scope remaps gold to the champagne tone", () => {
  const onBrand = block(css(), ".theme-on-brand {");
  assert.match(onBrand, /--color-gold:\s*var\(--color-gold-on-brand\)/);
  assert.match(onBrand, /--color-gold-display:\s*var\(--color-gold-on-brand\)/);
});

test("tailwind exposes the gold and glass roles", () => {
  const config = read("tailwind.config.ts");
  for (const role of ["gold", "gold-display", "gold-on-brand", "gold-soft", "glass", "glass-line"])
    assert.ok(new RegExp(`"${role}":\\s*"oklch\\(var\\(--color-${role}\\) / <alpha-value>\\)"`).test(config), role);
  for (const shadow of ["glass:", '"glass-hover":', '"glow-gold":']) assert.ok(config.includes(shadow), shadow);
});

test("three.js is pinned exactly", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies.three, "0.186.0");
  assert.equal(pkg.devDependencies["@types/three"], "0.185.4");
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx tsx --test tests/design-system.test.ts`
Expected: FAIL — `.theme-light {` block lacks the gold tokens (first assertion), and the tailwind and package assertions fail.

- [ ] **Step 4: Add the light tokens**

In `web/app/globals.css`, inside the `:root, .theme-light {` block, after the `--color-feedback-error` line, add:

```css
    /* Premium restyle (2026-09-10): gold roles and glass surfaces. */
    --color-gold: 51.14% 0.082 83.6;
    --color-gold-display: 58% 0.085 84;
    --color-gold-on-brand: 72.45% 0.100 82.3;
    --color-gold-soft: 83.98% 0.085 91.0;
    --color-glass: 99.2% 0.003 255;
    --color-glass-line: 100% 0 0;
    --shadow-glass: 0 1px 2px rgb(21 33 61 / 0.04), 0 20px 50px -24px rgb(21 33 61 / 0.28);
    --shadow-glass-hover: 0 2px 4px rgb(21 33 61 / 0.05), 0 30px 60px -24px rgb(21 33 61 / 0.34);
    --glow-gold: 0 0 36px -8px oklch(var(--color-gold-soft) / 0.55);
    --glass-alpha: 0.62;
    --glass-alpha-elevated: 0.78;
    --glass-blur: 18px;
    --gradient-heading: linear-gradient(
      135deg,
      oklch(var(--color-fg-primary)) 0%,
      oklch(var(--color-fg-primary)) 48%,
      oklch(var(--color-gold-display)) 100%
    );
    --gradient-heading-on-brand: linear-gradient(
      135deg,
      oklch(var(--color-fg-on-brand)) 0%,
      oklch(var(--color-fg-on-brand)) 45%,
      oklch(var(--color-gold-on-brand)) 100%
    );
    --gradient-numeral: linear-gradient(180deg, oklch(var(--color-fg-primary)) 0%, oklch(var(--color-gold-display)) 100%);
```

In the same block change the three radius lines to:

```css
    --radius-control: 0.75rem;
    --radius-surface: 1rem;
    --radius-feature: 1.5rem;
```

- [ ] **Step 5: Re-base the dark theme and add its tokens**

Replace these lines inside `.theme-dark {`:

```css
    --color-bg-canvas: 12.87% 0.008 268.5;
    --color-bg-surface: 15.51% 0.013 270.4;
    --color-bg-subtle: 21.09% 0.025 270.0;
    --color-bg-brand: 15.51% 0.013 270.4;
    --color-fg-primary: 96.83% 0.007 247.9;
    --color-fg-secondary: 86.90% 0.020 252.9;
    --color-border-subtle: 31.26% 0.043 269.1;
```

(keep `--color-border-strong: 62% 0.052 258;` and every other existing dark role as it is) and append after `--color-feedback-error`:

```css
    --color-gold: 72.45% 0.100 82.3;
    --color-gold-display: 83.98% 0.085 91.0;
    --color-gold-on-brand: 72.45% 0.100 82.3;
    --color-gold-soft: 83.98% 0.085 91.0;
    --color-glass: 17.90% 0.019 270.1;
    --color-glass-line: 100% 0 0;
    --shadow-glass: 0 20px 50px -15px rgb(0 0 0 / 0.7);
    --shadow-glass-hover: 0 30px 60px -15px rgb(0 0 0 / 0.9);
    --glow-gold: 0 0 35px -5px oklch(var(--color-gold) / 0.25);
    --glass-alpha: 0.65;
    --glass-alpha-elevated: 0.78;
    --glass-blur: 24px;
    --gradient-heading: linear-gradient(
      135deg,
      #ffffff 0%,
      oklch(var(--color-fg-secondary)) 55%,
      oklch(var(--color-gold-display)) 100%
    );
    --gradient-heading-on-brand: linear-gradient(
      135deg,
      #ffffff 0%,
      oklch(var(--color-fg-secondary)) 55%,
      oklch(var(--color-gold-display)) 100%
    );
    --gradient-numeral: linear-gradient(180deg, #ffffff 0%, oklch(var(--color-gold)) 100%);
```

Also change the dark shadows to `--shadow-navigation: 0 18px 48px rgb(0 0 0 / 0.55);` and `--shadow-interactive: 0 22px 56px rgb(0 0 0 / 0.6);`.

- [ ] **Step 6: Remap gold inside the on-brand scope**

In the `@layer components` block, extend `.theme-on-brand {` with two lines:

```css
  .theme-on-brand {
    --color-legacy-white: var(--color-fg-on-brand);
    --color-legacy-blue-light: var(--color-fg-brand-muted);
    --color-legacy-blue-pale: var(--color-fg-brand-muted);
    --color-gold: var(--color-gold-on-brand);
    --color-gold-display: var(--color-gold-on-brand);
  }
```

- [ ] **Step 7: Expose the roles in Tailwind**

In `web/tailwind.config.ts` `theme.extend.colors`, after the `error` entry add:

```ts
        gold: "oklch(var(--color-gold) / <alpha-value>)",
        "gold-display": "oklch(var(--color-gold-display) / <alpha-value>)",
        "gold-on-brand": "oklch(var(--color-gold-on-brand) / <alpha-value>)",
        "gold-soft": "oklch(var(--color-gold-soft) / <alpha-value>)",
        glass: "oklch(var(--color-glass) / <alpha-value>)",
        "glass-line": "oklch(var(--color-glass-line) / <alpha-value>)",
```

In `boxShadow` add:

```ts
        glass: "var(--shadow-glass)",
        "glass-hover": "var(--shadow-glass-hover)",
        "glow-gold": "var(--glow-gold)",
```

- [ ] **Step 8: Extend the contrast pairs**

In `web/tests/browser/theme-contrast.spec.ts`, inside the `pairs.push(` call, add before `["border-strong", "bg-surface", 3],`:

```ts
        // Premium restyle: gold text roles must clear the same floor as every other text role.
        ["gold", "bg-canvas", 4.5],
        ["gold", "bg-surface", 4.5],
        ["gold", "bg-subtle", 4.5],
        ["gold-display", "bg-canvas", 3.5],
        ["gold-display", "bg-surface", 3.5],
        ["gold-display", "bg-subtle", 3.5],
        ["gold-on-brand", "bg-brand", 4.5],
```

- [ ] **Step 9: Run the unit tests and the check suite**

Run: `npx tsx --test tests/design-system.test.ts` → PASS (4 tests).
Run: `npm run check` → all green (Prettier may reformat the CSS you added; run `npm run format` first if `format:check` complains, then re-run).

- [ ] **Step 10: Verify the contrast spec against a rebuilt server**

Run: `npm run build` then restart the preview server on 3107, then `npx playwright test tests/browser/theme-contrast.spec.ts`.
Expected: PASS for both themes. If `gold-display` on `bg-subtle` is below 3.5 in light, lower `--color-gold-display` lightness by one point at a time (57%, 56%) until it passes and update the exact value in the unit test.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json app/globals.css tailwind.config.ts tests/design-system.test.ts tests/browser/theme-contrast.spec.ts
git commit -m "feat(design): gold and glass tokens, noir dark theme, three.js dependency"
```

---

### Task 2: Glass, gradient, reveal and nav utilities

**Files:**
- Modify: `web/app/globals.css` (`@layer components`, `@layer utilities`, the top-level motion rules)
- Modify: `web/tests/design-system.test.ts`
- Modify: `web/tests/foundations.test.ts` (class-hook list)

**Interfaces:**
- Produces CSS classes: `glass`, `glass-elevated`, `glass-card`, `glass-pill`, `glass-gold`, `rule-gold`, `hero-ambient`, `reveal`, `stagger`, `text-gradient-heading`, `text-gradient-numeral`, `text-gold`, `heading-plain`, `nav-link`, `btn-shimmer`, `icon-tile`.
- Produces the site-wide `main h1, main h2` gradient rule.

- [ ] **Step 1: Write the failing utility tests**

Append to `web/tests/design-system.test.ts`:

```ts
test("every glass, gradient and motion utility the components use is defined", () => {
  const source = css();
  for (const hook of [
    "glass",
    "glass-elevated",
    "glass-card",
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
  assert.match(source, /main \.theme-on-brand h1,\s*main \.theme-on-brand h2\s*\{[^}]*var\(--gradient-heading-on-brand\)/);
  assert.match(source, /\.heading-plain\s*\{[^}]*background-image:\s*none/);
});

test("reveals hide content only after hydration and never while paused or reduced", () => {
  const source = css();
  const hidden = source.match(/([^\n{}]*)\{\s*opacity:\s*0;\s*transform:\s*translateY\(18px\);\s*\}/);
  assert.ok(hidden, "no reveal hiding rule");
  assert.equal(hidden![1].trim(), 'html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"])');
  const reduced = block(source, "@media (prefers-reduced-motion: reduce)");
  assert.match(reduced, /\.reveal\s*\{[^}]*opacity:\s*1 !important/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx tsx --test tests/design-system.test.ts`
Expected: the three new tests FAIL (utilities undefined).

- [ ] **Step 3: Add the component-layer utilities**

In `web/app/globals.css`, inside `@layer components {` after `.rule-sand`, add:

```css
  /* ---- Premium restyle: glass surfaces ---- */
  .glass {
    background: oklch(var(--color-glass) / var(--glass-alpha));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
    backdrop-filter: blur(var(--glass-blur)) saturate(140%);
    border: 1px solid oklch(var(--color-glass-line) / var(--glass-line-alpha, 0.55));
    border-top-color: oklch(var(--color-glass-line) / var(--glass-top-alpha, 0.9));
    box-shadow: var(--shadow-glass);
  }
  .theme-dark .glass,
  .theme-dark .glass-elevated,
  .theme-dark .glass-card,
  .theme-dark .glass-pill {
    --glass-line-alpha: 0.07;
    --glass-top-alpha: 0.14;
  }
  .glass-elevated {
    background: oklch(var(--color-glass) / var(--glass-alpha-elevated));
    -webkit-backdrop-filter: blur(24px) saturate(150%);
    backdrop-filter: blur(24px) saturate(150%);
    border: 1px solid oklch(var(--color-glass-line) / var(--glass-line-alpha, 0.55));
    border-top-color: oklch(var(--color-glass-line) / var(--glass-top-alpha, 0.9));
    box-shadow:
      var(--shadow-glass),
      inset 0 1px 0 0 oklch(var(--color-glass-line) / var(--glass-inset-alpha, 0.6));
  }
  .theme-dark .glass-elevated {
    --glass-inset-alpha: 0.12;
  }
  .glass-card {
    background: oklch(var(--color-glass) / var(--glass-alpha));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
    backdrop-filter: blur(var(--glass-blur)) saturate(140%);
    border: 1px solid oklch(var(--color-glass-line) / var(--glass-line-alpha, 0.55));
    border-top-color: oklch(var(--color-glass-line) / var(--glass-top-alpha, 0.9));
    box-shadow: var(--shadow-glass);
    transition:
      transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
      border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
      background-color 350ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .glass-card:focus-within {
    border-color: oklch(var(--color-gold-soft) / 0.7);
    box-shadow:
      var(--shadow-glass-hover),
      var(--glow-gold);
  }
  @media (hover: hover) and (pointer: fine) {
    .glass-card:hover {
      transform: translateY(-3px);
      border-color: oklch(var(--color-gold-soft) / 0.7);
      box-shadow:
        var(--shadow-glass-hover),
        var(--glow-gold);
    }
    .theme-dark .glass-card:hover {
      border-color: oklch(var(--color-gold) / 0.45);
    }
  }
  .glass-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: oklch(var(--color-glass) / var(--glass-alpha-elevated));
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    border: 1px solid oklch(var(--color-glass-line) / var(--glass-line-alpha, 0.55));
    border-top-color: oklch(var(--color-glass-line) / var(--glass-top-alpha, 0.9));
    border-radius: 9999px;
    padding: 0.375rem 0.875rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .glass-gold {
    background: linear-gradient(135deg, oklch(var(--color-gold-soft) / 0.28) 0%, oklch(var(--color-gold-soft) / 0.08) 100%);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    border: 1px solid oklch(var(--color-gold) / 0.35);
    border-top-color: oklch(var(--color-gold) / 0.55);
    color: oklch(var(--color-gold));
  }
  .rule-gold {
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      oklch(var(--color-gold-soft) / 0.9) 20%,
      oklch(var(--color-gold) / 0.9) 50%,
      oklch(var(--color-gold-soft) / 0.9) 80%,
      transparent
    );
  }
  @supports not (backdrop-filter: blur(1px)) {
    .glass,
    .glass-card,
    .glass-elevated,
    .glass-pill {
      --glass-alpha: 0.94;
      --glass-alpha-elevated: 0.96;
    }
  }

  /* ---- Premium restyle: text ---- */
  .text-gold {
    color: oklch(var(--color-gold));
  }
  .text-gradient-heading,
  main h1,
  main h2 {
    background-image: var(--gradient-heading);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
  main .theme-on-brand h1,
  main .theme-on-brand h2 {
    background-image: var(--gradient-heading-on-brand);
  }
  .text-gradient-numeral {
    background-image: var(--gradient-numeral);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
  .heading-plain {
    background-image: none;
    color: inherit;
    -webkit-text-fill-color: currentColor;
  }

  /* ---- Premium restyle: interaction ---- */
  .nav-link {
    position: relative;
  }
  .nav-link::after {
    content: "";
    position: absolute;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.35rem;
    height: 2px;
    border-radius: 9999px;
    background: oklch(var(--color-gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nav-link[aria-current="page"]::after {
    transform: scaleX(1);
  }
  @media (hover: hover) and (pointer: fine) {
    .nav-link:hover::after,
    .nav-link:focus-visible::after {
      transform: scaleX(1);
    }
  }
  .btn-shimmer {
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }
  .btn-shimmer::after {
    content: "";
    position: absolute;
    inset: -40% -60%;
    z-index: -1;
    background: linear-gradient(115deg, transparent 35%, oklch(var(--color-gold-soft) / 0.55) 50%, transparent 65%);
    transform: translateX(-120%);
    opacity: 0;
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .btn-shimmer:hover::after {
      opacity: 0.35;
      animation: btn-shimmer 650ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  }
  .icon-tile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid oklch(var(--color-border-subtle));
    background: oklch(var(--color-glass) / var(--glass-alpha-elevated));
    color: oklch(var(--color-gold));
    transition:
      background-color 200ms ease-out,
      color 200ms ease-out,
      border-color 200ms ease-out,
      box-shadow 200ms ease-out;
  }
  @media (hover: hover) and (pointer: fine) {
    .group:hover .icon-tile,
    a:hover > .icon-tile {
      background: oklch(var(--color-action));
      color: oklch(var(--color-fg-on-action));
      border-color: oklch(var(--color-action));
      box-shadow: 0 0 0 1px oklch(var(--color-gold-soft) / 0.8);
    }
  }
```

- [ ] **Step 4: Add the reveal and hero-ambient rules**

In `@layer utilities {` after `.hero-enter-4 { … }` add:

```css
  /* ---- Premium restyle: scroll-in reveals (visible-first; hidden only after hydration) ---- */
  .reveal {
    transition:
      opacity 600ms ease-out,
      transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--reveal-delay, 0ms);
  }
  html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"]) {
    opacity: 0;
    transform: translateY(18px);
  }
  .stagger {
    --stagger-step: 70ms;
  }
  .hero-ambient {
    background-image:
      radial-gradient(circle at 15% 20%, oklch(var(--color-action) / 0.1), transparent 40%),
      radial-gradient(circle at 82% 30%, oklch(var(--color-gold-soft) / 0.22), transparent 38%),
      radial-gradient(circle at 50% 100%, oklch(var(--color-fg-brand-muted) / 0.12), transparent 45%);
  }
  .theme-dark .hero-ambient {
    background-image:
      radial-gradient(circle at 50% 0%, rgb(255 255 255 / 0.04) 0%, transparent 60%),
      radial-gradient(circle at 10% 30%, oklch(var(--color-gold) / 0.06) 0%, transparent 50%),
      radial-gradient(circle at 90% 40%, rgb(255 255 255 / 0.02) 0%, transparent 50%);
  }
  @keyframes btn-shimmer {
    to {
      transform: translateX(120%);
    }
  }
```

Then in the existing top-level `@media (prefers-reduced-motion: reduce) {` block (the one containing `.client-ribbon`), add:

```css
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
```

And extend the existing "Pausing decorative loops must never freeze essential entrance content" rule so it reads:

```css
html[data-motion-paused="true"] .hero-enter,
html[data-motion-paused="true"] .reveal {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
}
```

- [ ] **Step 5: Extend the class-hook list in the foundations test**

In `web/tests/foundations.test.ts`, in the test `"class names used in markup are either Tailwind utilities or defined in globals.css"`, extend the `for (const hook of [...])` array to:

```ts
  for (const hook of [
    "content-reveal",
    "cta-light",
    "flow-line",
    "metric-grid",
    // Premium restyle utilities must exist in globals.css wherever a component uses them.
    "glass",
    "glass-card",
    "glass-elevated",
    "glass-pill",
    "glass-gold",
    "hero-ambient",
    "reveal",
    "text-gradient-numeral",
    "nav-link",
    "btn-shimmer",
    "icon-tile",
  ]) {
```

and extend the `used` file list to include `"components/ui/button.tsx"`, `"components/ui/card.tsx"`, `"components/layout/header.tsx"`, `"components/sections/service-hero.tsx"`.

- [ ] **Step 6: Run tests and check**

Run: `npx tsx --test tests/design-system.test.ts` → PASS (7 tests).
Run: `npm run check` → green (format first if needed).

- [ ] **Step 7: Commit**

```bash
git add app/globals.css tests/design-system.test.ts tests/foundations.test.ts
git commit -m "feat(design): glass, gradient heading, reveal and nav utilities"
```

---

## Phase 1 — Motion and primitives

### Task 3: Reveal markup hooks and the MotionObserver

**Files:**
- Modify: `web/components/motion/reveal.tsx`
- Create: `web/components/motion/motion-observer.tsx`
- Modify: `web/components/sections/motion-controls.tsx`
- Modify: `web/app/layout.tsx`
- Modify: `web/tests/design-system.test.ts`

**Interfaces:**
- `Reveal` renders `class="reveal"`; `Stagger` renders `class="stagger"` and injects `index` into `StaggerItem` children; `StaggerItem` renders `class="reveal"` with `style="--reveal-delay: <min(index,8)*70>ms"`.
- `MotionObserver` (client) sets `data-reveal="in"` on intersecting `.reveal` elements; owns `html[data-motion-ready]` and `html[data-motion-paused]` while `html[data-motion-owner]` is absent.
- `MotionControls` sets `html[data-motion-owner="controls"]` on mount and removes it on unmount.

- [ ] **Step 1: Write the failing tests**

Append to `web/tests/design-system.test.ts`:

```ts
test("Reveal, Stagger and StaggerItem render the reveal hooks", () => {
  const source = read("components/motion/reveal.tsx");
  assert.match(source, /"reveal"/);
  assert.match(source, /"stagger"/);
  assert.match(source, /--reveal-delay/);
  assert.match(source, /Math\.min\(index, 8\) \* 70/);
});

test("MotionObserver is mounted before main and MotionControls declares ownership", () => {
  const layout = read("app/layout.tsx");
  assert.ok(layout.indexOf("<MotionObserver />") < layout.indexOf('<main id="main">'), "MotionObserver must precede main");
  const controls = read("components/sections/motion-controls.tsx");
  assert.match(controls, /dataset\.motionOwner = "controls"/);
  assert.match(controls, /delete document\.documentElement\.dataset\.motionOwner/);
  const observer = read("components/motion/motion-observer.tsx");
  assert.match(observer, /IntersectionObserver/);
  assert.match(observer, /dataset\.reveal = "in"/);
  assert.match(observer, /motionOwner/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx tsx --test tests/design-system.test.ts` → the two new tests FAIL.

- [ ] **Step 3: Rewrite `reveal.tsx`**

```tsx
import { Children, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Visible-first rendering: essential text never depends on hydration or an observer.
 *  The `reveal` hook only hides content after `html[data-motion-ready]` is set and
 *  never while motion is paused or reduced (see globals.css). */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const Tag: ElementType = as;
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}

type StaggerItemProps = { children: ReactNode; className?: string; index?: number };

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("stagger", className)}>
      {Children.map(children, (child, index) =>
        isValidElement<StaggerItemProps>(child) && child.type === StaggerItem ? cloneElement(child, { index }) : child,
      )}
    </div>
  );
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `motion-observer.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Drives scroll-in reveals and owns the motion flags on pages that do not mount MotionControls.
 *  Anything already inside the viewport is marked "in" synchronously so above-the-fold content
 *  never flashes from visible to hidden after hydration. */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const owns = () => root.dataset.motionOwner === undefined;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const flags = () => {
      if (!owns()) return;
      root.dataset.motionReady = "true";
      root.dataset.motionPaused = String(reduced.matches || document.hidden);
    };
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const viewport = window.innerHeight;
    for (const el of targets) {
      const box = el.getBoundingClientRect();
      if (box.top < viewport && box.bottom > 0) el.dataset.reveal = "in";
    }
    flags();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of targets) if (el.dataset.reveal !== "in") observer.observe(el);
    const safety = window.setTimeout(() => {
      for (const el of targets) {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) el.dataset.reveal = "in";
      }
    }, 1000);
    reduced.addEventListener("change", flags);
    document.addEventListener("visibilitychange", flags);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
      reduced.removeEventListener("change", flags);
      document.removeEventListener("visibilitychange", flags);
      if (owns()) {
        delete root.dataset.motionReady;
        delete root.dataset.motionPaused;
      }
    };
  }, [pathname]);
  return null;
}
```

- [ ] **Step 5: Declare ownership in `motion-controls.tsx`**

In the second `useEffect` of `MotionControls`, make it read:

```tsx
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    root.dataset.motionOwner = "controls";
    const update = () => {
      root.dataset.motionReady = "true";
      root.dataset.motionPaused = String(paused || reduced.matches || document.hidden);
    };
    update();
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      delete document.documentElement.dataset.motionOwner;
      delete document.documentElement.dataset.motionReady;
      delete document.documentElement.dataset.motionPaused;
    };
  }, [paused]);
```

- [ ] **Step 6: Mount the observer in `layout.tsx`**

Add `import { MotionObserver } from "@/components/motion/motion-observer";` and render `<MotionObserver />` immediately before `<MeasurementSignals />`.

- [ ] **Step 7: Run tests, build, and the interactions spec**

Run: `npx tsx --test tests/design-system.test.ts` → PASS (9).
Run: `npm run check` → green.
Run: `npm run build`, restart the preview server, then `npx playwright test tests/browser/interactions.spec.ts tests/browser/transcript.spec.ts` → PASS ("pause never hides the hero" must still pass).

- [ ] **Step 8: Commit**

```bash
git add components/motion/reveal.tsx components/motion/motion-observer.tsx components/sections/motion-controls.tsx app/layout.tsx tests/design-system.test.ts
git commit -m "feat(motion): scroll-in reveals with a visible-first observer"
```

---

### Task 4: Button, Card, typography and SAP badge primitives

**Files:**
- Modify: `web/components/ui/button.tsx`, `web/components/ui/card.tsx`, `web/components/ui/typography.tsx`, `web/components/ui/sap-partner-badge.tsx`

**Interfaces:**
- `Button` props unchanged (`variant: "primary" | "secondary" | "ghost" | "on-dark"`, `withArrow`, `external`, `className`).
- `Card` props unchanged (`bezel`, `tone: "light" | "white" | "navy"`).
- `Headline` gains `plain?: boolean` (adds `heading-plain`).
- `Eyebrow` renders `text-gold`.

- [ ] **Step 1: Rewrite `button.tsx`**

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-4 rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "btn-shimmer bg-action text-on-action shadow-glass hover:bg-action-hover hover:-translate-y-px hover:shadow-glass-hover focus-visible:ring-offset-surface",
  secondary:
    "glass text-foreground hover:border-gold-soft hover:text-gold hover:-translate-y-px focus-visible:ring-offset-surface",
  ghost: "text-foreground hover:bg-surface-subtle hover:text-gold focus-visible:ring-offset-surface",
  "on-dark":
    "bg-on-brand text-brand shadow-glass hover:bg-brand-muted hover:-translate-y-px focus-visible:ring-brand-muted focus-visible:ring-offset-brand",
};

export function Button({
  children,
  href,
  variant = "primary",
  withArrow = false,
  className,
  external,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite `card.tsx`**

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Glass card: frosted surface, hairline top highlight, gold glow on hover.
 *  `bezel` adds an inner gold ring; `tone="navy"` keeps the inverse brand surface. */
export function Card({
  children,
  className,
  bezel = true,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  bezel?: boolean;
  tone?: "light" | "white" | "navy";
}) {
  if (tone === "navy") {
    return (
      <div
        className={cn(
          "theme-on-brand rounded-feature border border-gold-on-brand/20 bg-brand p-7 text-on-brand shadow-glass",
          className,
        )}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "glass-card rounded-feature p-7 text-foreground",
        bezel && "ring-1 ring-inset ring-gold-soft/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Update `typography.tsx`**

Change `Eyebrow` to render `onDark ? "text-gold-on-brand" : "text-gold"` in place of the `text-brand-muted`/`text-action` pair. Change `Headline` to:

```tsx
export function Headline({
  children,
  level = 2,
  className,
  plain = false,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  plain?: boolean;
}) {
  const sizes = { 1: "text-display", 2: "text-h2", 3: "text-h3" } as const;
  const Tag = `h${level}` as unknown as "h1";
  return <Tag className={cn("font-display font-bold", sizes[level], plain && "heading-plain", className)}>{children}</Tag>;
}
```

Keep `Accent`, `Lead` and `SectionHeading` as they are, except `SectionHeading` passes `plain` through if given (`plain?: boolean` prop forwarded to `Headline`).

- [ ] **Step 4: Update `sap-partner-badge.tsx`**

Replace the outer `span` classes with:

```tsx
      className={cn(
        "glass-gold inline-flex items-center gap-2.5 rounded-full px-3 py-1.5",
        onDark ? "border-gold-on-brand/40" : "shadow-glass",
        className,
      )}
```

Keep the white SAP chip exactly as it is. Change the tier text colour classes to `onDark ? "text-gold-on-brand" : "text-gold"` and the accent bar to `bg-gold`.

- [ ] **Step 5: Verify**

Run: `npm run check` → green.
Run: `npm run build` → build succeeds (the `check-build` prerender floor still holds).

- [ ] **Step 6: Commit**

```bash
git add components/ui/button.tsx components/ui/card.tsx components/ui/typography.tsx components/ui/sap-partner-badge.tsx
git commit -m "feat(ui): glass buttons, cards, gold eyebrows and badge"
```

---

## Phase 2 — Layout shell

### Task 5: Header glass and scroll state, footer gold rule, quick-contact glass

**Files:**
- Modify: `web/components/layout/header.tsx`, `web/components/layout/footer.tsx`, `web/components/layout/quick-contact.tsx`

**Interfaces:**
- Header keeps every id, aria attribute, ref, breakpoint and handler. Adds `data-scrolled="true|false"` on the `<header>`.
- Footer keeps `officeCities` link and all nav.
- QuickContact keeps `#quick-contact-panel`, `hidden` logic, refs.

- [ ] **Step 1: Header shell and scroll state**

In `header.tsx` add, after the existing effects:

```tsx
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const update = () => {
      el.dataset.scrolled = String(window.scrollY > 20);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
```

Change the `<header>` className to:

```tsx
      className="glass-elevated fixed inset-x-0 top-0 z-40 border-x-0 border-t-0 border-b border-border-subtle text-foreground transition-[background-color,box-shadow] duration-300 data-[scrolled=true]:[--glass-alpha-elevated:0.9] data-[scrolled=true]:border-gold-soft/60 data-[scrolled=true]:shadow-glass-hover"
```

Change the utility bar wrapper `div` from `border-b border-border-subtle bg-surface-subtle` to `border-b border-border-subtle/70 bg-transparent`, and its "Talk to us" `Link` className to:

```tsx
            className="glass-gold inline-flex min-h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold sm:text-sm"
```

(keep `href`, text and the `↗` span). Drop `min-h-11` on that link only; the utility row keeps `min-h-11` on its container so the touch target is unchanged in height.

- [ ] **Step 2: Nav links and mega-menu**

Top-level desktop nav `Link` className becomes:

```tsx
                  className={cn(
                    "nav-link inline-flex min-h-11 items-center px-2 text-sm font-semibold transition-colors hover:text-gold",
                    active && "text-gold",
                  )}
```

The chevron button keeps its classes but change `hover:bg-surface-subtle` to `hover:bg-glass/60`. The mega-menu panel `div` className becomes:

```tsx
                      className="glass-elevated absolute inset-x-0 top-full max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-b-feature border-t-0 p-7"
```

Inside it, child links: `text-action hover:underline` → `text-foreground hover:text-gold`, and grandchild links `text-foreground-muted hover:text-action hover:underline` → `text-foreground-muted hover:text-gold`.

Mobile dialog: `className` keeps everything; change `bg-surface` to `bg-canvas`, and the mobile title `h2` gains `heading-plain` (it lives outside `main`, but be explicit).

- [ ] **Step 3: Footer**

In `footer.tsx` change the `<footer>` className to `"theme-on-brand relative bg-brand pb-20 text-on-brand"` and insert as its first child `<div aria-hidden className="rule-gold absolute inset-x-0 top-0" />`. `LinkColumn` title: `text-brand-muted` → `text-gold-on-brand`; link hover: `hover:text-on-brand` → `hover:text-gold-on-brand`. Certification spans: `text-brand-muted` → `text-gold-on-brand`. Social links className:

```tsx
                className="glass-pill min-h-11 px-3.5 text-sm text-on-brand/80 transition-colors hover:border-gold-on-brand/60 hover:text-gold-on-brand"
```

- [ ] **Step 4: Quick contact**

Trigger button className:

```tsx
        className="btn-shimmer ml-auto flex min-h-12 items-center gap-2 rounded-full bg-action px-5 font-semibold text-on-action shadow-glass hover:bg-action-hover hover:shadow-glass-hover"
```

Panel className:

```tsx
        className="glass-elevated absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2.5rem)] rounded-feature p-5 text-foreground"
```

Panel links: `text-action` → `text-gold` on the "Talk to us" link (keep the email link `text-action`).

- [ ] **Step 5: Verify against the pinned facts**

Run: `npm run check` → green. `npm run build`, restart the preview, then:
`npx playwright test tests/browser/site.spec.ts tests/browser/transcript.spec.ts tests/browser/interactions.spec.ts` → PASS (combobox visible at ≥1280, `#desktop-nav-0` within 1280, quick-contact hiding).

- [ ] **Step 6: Commit**

```bash
git add components/layout/header.tsx components/layout/footer.tsx components/layout/quick-contact.tsx
git commit -m "feat(layout): frosted header with gold nav underline, gold-ruled footer, glass quick contact"
```

---

## Phase 3 — The 3D hero

### Task 6: Hero3D scene, loader and bundle budget

**Files:**
- Create: `web/components/hero/hero-3d.tsx`, `web/components/hero/hero-3d-loader.tsx`
- Modify: `web/scripts/check-build.mjs`
- Modify: `web/tests/design-system.test.ts`

**Interfaces:**
- `Hero3DLoader(): JSX.Element` renders `<div data-hero-3d={state} data-hero-3d-reason={reason} class="absolute inset-0 z-0 overflow-hidden" aria-hidden>` where `state ∈ pending | active | paused | unavailable` and `reason ∈ viewport | reduced-motion | save-data | no-webgl | hidden`.
- `Hero3D({ onState }: { onState: (s: "active" | "paused") => void })`.

- [ ] **Step 1: Write the failing tests**

Append to `web/tests/design-system.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify failure** — `npx tsx --test tests/design-system.test.ts` → the two new tests FAIL (files missing).

- [ ] **Step 3: Create `hero-3d.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";

type Preset = {
  knot: number;
  knotEmissive: number;
  knotEmissiveIntensity: number;
  ring: number;
  ringOpacity: number;
  speck: number;
  speckOpacity: number;
  ambient: number;
  ambientIntensity: number;
};

const PRESETS: Record<"light" | "dark", Preset> = {
  light: {
    knot: 0xd7dee9,
    knotEmissive: 0x9aa8bb,
    knotEmissiveIntensity: 0.15,
    ring: 0xb8944a,
    ringOpacity: 0.55,
    speck: 0x15213d,
    speckOpacity: 0.3,
    ambient: 0xdfe7f3,
    ambientIntensity: 1.4,
  },
  dark: {
    knot: 0x131722,
    knotEmissive: 0x0a0c14,
    knotEmissiveIntensity: 1,
    ring: 0xc5a059,
    ringOpacity: 0.4,
    speck: 0xe2e8f0,
    speckOpacity: 0.35,
    ambient: 0x0e121d,
    ambientIntensity: 1.8,
  },
};

const currentTheme = () => (document.documentElement.classList.contains("theme-dark") ? "dark" : "light");

/** The reference prototype's sculpture (torus knot, two gold orbit rings, sparse specks),
 *  re-lit per theme, paused whenever the page says decorative motion should stop. */
export function Hero3D({ onState }: { onState: (state: "active" | "paused") => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const report = useRef(onState);
  report.current = onState;

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || 700;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 900ms ease-out";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(-3.5, 0, 22);

    const ambient = new AmbientLight(0x0e121d, 1.8);
    const key = new DirectionalLight(0xf5ead4, 2.8);
    key.position.set(12, 14, 16);
    const rim = new DirectionalLight(0xcfd8e3, 1.6);
    rim.position.set(-14, -10, 10);
    const gold = new PointLight(0xd4af37, 2.0, 45);
    gold.position.set(0, 8, 8);
    scene.add(ambient, key, rim, gold);

    const group = new Group();
    scene.add(group);

    const knotGeometry = new TorusKnotGeometry(4.6, 0.9, 220, 40, 2, 3);
    const knotMaterial = new MeshPhysicalMaterial({
      roughness: 0.22,
      metalness: 0.88,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });
    const knot = new Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    const ringGeometry1 = new TorusGeometry(8.2, 0.025, 16, 120);
    const ringGeometry2 = new TorusGeometry(8.9, 0.02, 16, 120);
    const ringMaterial = new MeshStandardMaterial({ roughness: 0.3, metalness: 0.95, transparent: true });
    const ring1 = new Mesh(ringGeometry1, ringMaterial);
    const ring2 = new Mesh(ringGeometry2, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    group.add(ring1, ring2);

    const speckCount = 70;
    const positions = new Float32Array(speckCount * 3);
    for (let i = 0; i < speckCount; i++) {
      const radius = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const speckGeometry = new BufferGeometry();
    speckGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const speckMaterial = new PointsMaterial({ size: 0.08, transparent: true, blending: AdditiveBlending });
    group.add(new Points(speckGeometry, speckMaterial));

    const applyTheme = () => {
      const preset = PRESETS[currentTheme()];
      knotMaterial.color = new Color(preset.knot);
      knotMaterial.emissive = new Color(preset.knotEmissive);
      knotMaterial.emissiveIntensity = preset.knotEmissiveIntensity;
      ringMaterial.color = new Color(preset.ring);
      ringMaterial.opacity = preset.ringOpacity;
      speckMaterial.color = new Color(preset.speck);
      speckMaterial.opacity = preset.speckOpacity;
      ambient.color = new Color(preset.ambient);
      ambient.intensity = preset.ambientIntensity;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const clock = new Clock(false);
    let frame = 0;
    let running = false;
    let firstFrame = true;
    const render = () => {
      frame = requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      group.rotation.y = t * 0.06 + targetX;
      group.rotation.x = Math.sin(t * 0.04) * 0.12 + targetY;
      knot.rotation.z = t * 0.03;
      ring1.rotation.z = -t * 0.04;
      ring2.rotation.x = t * 0.05;
      group.position.y = Math.sin(t * 0.6) * 0.25;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        renderer.domElement.style.opacity = "1";
      }
    };

    let hidden = document.hidden;
    let paused = document.documentElement.dataset.motionPaused === "true";
    let offscreen = false;
    const sync = () => {
      const shouldRun = !hidden && !paused && !offscreen;
      if (shouldRun && !running) {
        running = true;
        clock.start();
        render();
        report.current("active");
      } else if (!shouldRun && running) {
        running = false;
        clock.stop();
        cancelAnimationFrame(frame);
        report.current("paused");
      } else if (!shouldRun && !running) {
        report.current("paused");
      }
    };
    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const pauseObserver = new MutationObserver(() => {
      paused = document.documentElement.dataset.motionPaused === "true";
      sync();
    });
    pauseObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
    const visibility = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      sync();
    });
    visibility.observe(host);
    const resize = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resize.observe(host);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      pauseObserver.disconnect();
      visibility.disconnect();
      resize.disconnect();
      knotGeometry.dispose();
      ringGeometry1.dispose();
      ringGeometry2.dispose();
      speckGeometry.dispose();
      knotMaterial.dispose();
      ringMaterial.dispose();
      speckMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default Hero3D;
```

- [ ] **Step 4: Create `hero-3d-loader.tsx`**

```tsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type Hero3DState = "pending" | "active" | "paused" | "unavailable";
type Reason = "viewport" | "reduced-motion" | "save-data" | "no-webgl" | "hidden";

const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

function blocker(): Reason | null {
  if (window.innerWidth < 1024) return "viewport";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced-motion";
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData === true) return "save-data";
  if (document.hidden) return "hidden";
  const probe = document.createElement("canvas");
  if (!(probe.getContext("webgl2") ?? probe.getContext("webgl"))) return "no-webgl";
  return null;
}

/** Mounts the WebGL sculpture only where it is worth it: wide viewports, motion allowed,
 *  no data saver, WebGL present, page visible — and only after the page has gone idle.
 *  The static `.hero-ambient` backdrop rendered by the server is the fallback in every other case. */
export function Hero3DLoader() {
  const [state, setState] = useState<Hero3DState>("pending");
  const [reason, setReason] = useState<Reason | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idle = 0;
    const evaluate = () => {
      const blocked = blocker();
      if (blocked) {
        setMounted(false);
        setReason(blocked);
        setState("unavailable");
        return;
      }
      setReason(null);
      if (!mounted) setState("pending");
      const start = () => {
        if (!cancelled) setMounted(true);
      };
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: 1500 });
      else idle = window.setTimeout(start, 200);
    };
    evaluate();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      evaluate();
    };
    window.addEventListener("resize", onChange);
    reduced.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener("resize", onChange);
      reduced.removeEventListener("change", onChange);
    };
    // `mounted` is intentionally read, not tracked: re-running on mount changes would re-probe needlessly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      data-hero-3d={state}
      data-hero-3d-reason={reason ?? undefined}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {mounted ? <Hero3D onState={setState} /> : null}
    </div>
  );
}
```

- [ ] **Step 5: Add the chunk budget to `check-build.mjs`**

Append before the script's final success log (keep its existing structure and the `fail()` helper it already uses; if it uses a different helper name, use that):

```js
// Premium restyle: three.js must stay in one lazily loaded chunk.
{
  const chunkDir = path.join(nextDir, "static", "chunks");
  const files = fs.readdirSync(chunkDir).filter((f) => f.endsWith(".js"));
  const withThree = files.filter((f) => fs.readFileSync(path.join(chunkDir, f), "utf8").includes("TorusKnotGeometry"));
  if (withThree.length !== 1) fail(`expected exactly one chunk containing three.js, found ${withThree.length}: ${withThree.join(", ")}`);
  const [threeChunk] = withThree;
  const manifest = fs.readFileSync(path.join(nextDir, "app-build-manifest.json"), "utf8");
  if (manifest.includes(threeChunk)) fail(`three.js chunk ${threeChunk} is referenced as initial JavaScript`);
  const size = fs.statSync(path.join(chunkDir, threeChunk)).size;
  if (size > 700_000) fail(`three.js chunk ${threeChunk} is ${size} bytes, budget is 700000`);
  console.log(`three.js chunk ${threeChunk}: ${size} bytes, lazy only`);
}
```

Read `scripts/check-build.mjs` first and adapt the variable names (`nextDir`, `fail`, `fs`, `path`) to what it already defines.

- [ ] **Step 6: Run unit tests and build**

Run: `npx tsx --test tests/design-system.test.ts` → PASS (11).
Run: `npm run check` → green.
Run: `npm run build` → the postbuild prints `three.js chunk …: N bytes, lazy only` with N ≤ 700000. (Until Task 7 wires the loader into the page the chunk may not exist; if the build fails on "found 0", temporarily confirm by completing Task 7's Step 2 first, then re-run the build. Commit only when the build passes.)

- [ ] **Step 7: Commit**

```bash
git add components/hero/hero-3d.tsx components/hero/hero-3d-loader.tsx scripts/check-build.mjs tests/design-system.test.ts
git commit -m "feat(hero): three.js sculpture with a gated, idle-time loader and a chunk budget"
```

---

### Task 7: ServiceHero restyle and the hero browser spec

**Files:**
- Modify: `web/components/sections/service-hero.tsx`
- Create: `web/tests/browser/hero.spec.ts`

**Interfaces:**
- Section keeps `aria-label="Featured services"`, `aria-roledescription="carousel"`, `h1.sr-only`, slide `h2`, the mount window, tab buttons and prev/pause/next with their labels.

- [ ] **Step 1: Write the hero spec**

```ts
import { test, expect, type Page } from "@playwright/test";

const carousel = 'section[aria-roledescription="carousel"]';
const loader = `${carousel} [data-hero-3d]`;

async function settled(page: Page) {
  await expect(page.locator(loader)).not.toHaveAttribute("data-hero-3d", "pending", { timeout: 15000 });
  return page.locator(loader).getAttribute("data-hero-3d");
}

test("desktop: the 3D hero activates or reports a WebGL-free environment, never both", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const state = await settled(page);
  if (state === "unavailable") {
    await expect(page.locator(loader)).toHaveAttribute("data-hero-3d-reason", "no-webgl");
    await expect(page.locator(`${loader} canvas`)).toHaveCount(0);
  } else {
    expect(["active", "paused"]).toContain(state);
    await expect(page.locator(`${loader} canvas`)).toHaveCount(1);
  }
  await expect(page.locator(`${carousel} .hero-ambient`)).toHaveCount(1);
  // The sculpture is not an image: the slide window is still the only responsive images in the carousel.
  await expect(page.locator(`${carousel} img[srcset]`)).toHaveCount(3);
});

test("narrow viewports never mount the scene", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "unavailable");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d-reason", "viewport");
  await expect(page.locator(`${loader} canvas`)).toHaveCount(0);
});

test("reduced motion never mounts the scene", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "unavailable");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d-reason", "reduced-motion");
});

test("the page pause control pauses and resumes the scene", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const state = await settled(page);
  test.skip(state === "unavailable", "no WebGL in this browser environment");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "active");
  await page.getByRole("button", { name: "Pause page animation", exact: true }).click();
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "paused");
  await page.getByRole("button", { name: "Resume page animation", exact: true }).click();
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "active");
});

test("dark theme reaches the same outcome", async ({ page, context }) => {
  await context.addCookies([{ name: "in2it-theme", value: "dark", domain: "127.0.0.1", path: "/" }]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const state = await settled(page);
  expect(["active", "paused", "unavailable"]).toContain(state);
  await expect(page.locator(`${carousel} .hero-ambient`)).toHaveCount(1);
});
```

- [ ] **Step 2: Restyle `service-hero.tsx`**

Add `import { Hero3DLoader } from "@/components/hero/hero-3d-loader";`. Replace the section's className with `"relative overflow-hidden bg-canvas pt-36 text-foreground md:pt-40"` and replace the existing `aria-hidden` radial `div` with:

```tsx
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0" />
      <Hero3DLoader />
```

Change `<Container className="relative">` to `<Container className="relative z-10">`.

Slide label: `text-sm font-semibold text-action` → `text-sm font-semibold text-gold`. The `h2` keeps its classes (the site rule paints the gradient). The "Talk to us" link: `text-action hover:underline` → `text-gold hover:underline`.

Image panel wrapper: change `relative min-h-[17rem] overflow-hidden rounded-feature bg-surface-subtle lg:min-h-[31rem]` to `glass-elevated relative min-h-[17rem] overflow-hidden rounded-feature p-2 lg:min-h-[31rem]`, and give each slide `Image` the extra class `rounded-[calc(var(--radius-feature)-0.5rem)]` and wrap the image set in `<div className="absolute inset-2 overflow-hidden rounded-[calc(var(--radius-feature)-0.5rem)]">…</div>` so the `fill` images stay inside the glass frame (the `img[srcset]` count stays 3). Caption bar: `border border-border-subtle bg-surface` → `glass rounded-surface`, caption counter `text-action` → `text-gold`.

Tabs/controls bar: `mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-border-subtle py-4` → `glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-feature px-4 py-3`. Active tab button: `bg-action text-on-action` stays; inactive: `text-foreground-muted hover:bg-surface-subtle` → `text-foreground-muted hover:bg-glass/70 hover:text-gold`; tab buttons `rounded-control` → `rounded-full`. Prev/pause/next buttons: `rounded-control border border-border-strong hover:bg-surface-subtle` → `rounded-full border border-border-strong hover:border-gold hover:text-gold`.

- [ ] **Step 3: Build, restart the preview and run the specs**

Run: `npm run check` → green. `npm run build` → chunk budget line printed. Restart the preview server. Then:
`npx playwright test tests/browser/hero.spec.ts tests/browser/transcript.spec.ts tests/browser/interactions.spec.ts` → PASS (the pause test may skip if the environment has no WebGL; a skip is acceptable, a failure is not).

- [ ] **Step 4: Commit**

```bash
git add components/sections/service-hero.tsx tests/browser/hero.spec.ts
git commit -m "feat(hero): glass service carousel over the 3D backdrop, with a loader spec"
```

---

## Phase 4 — Sections and pages

### Task 8: Inner hero, motif and CTA

**Files:**
- Modify: `web/components/sections/page-hero.tsx`, `web/components/sections/hero-motif.tsx`, `web/components/sections/cta-section.tsx`

- [ ] **Step 1: `page-hero.tsx`**

Section className → `"relative overflow-hidden bg-canvas pt-36 pb-20 md:pt-44 md:pb-28"`; replace the rotated-square `div` with `<div aria-hidden className="hero-ambient pointer-events-none absolute inset-0" />` followed by the original rotated square but with `border-navy` → `border-gold-soft` and opacity `opacity-[0.12]`. The `h1` className → `"text-display font-display font-bold"` (colour comes from the gradient rule). Subhead `text-grey-muted` → `text-foreground-muted`. The media wrapper `div.aspect-[5/4]` gains `glass-elevated rounded-feature p-2`.

- [ ] **Step 2: `hero-motif.tsx`**

Outer div → `"relative h-full w-full overflow-hidden rounded-[calc(var(--radius-feature)-0.5rem)] bg-surface-subtle"`. Keep the dot texture (change its colour to `oklch(var(--color-gold) / 0.22)` via the inline style's rgba). Replace the glow div with two static orbs:

```tsx
      <div aria-hidden className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-action/[0.14] blur-[90px]" />
      <div aria-hidden className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-gold-soft/[0.35] blur-[100px]" />
```

Triangle motif `border-blue-light` → `border-gold-soft`, opacity `0.25`. Icon `text-blue-light` → `text-gold`.

- [ ] **Step 3: `cta-section.tsx`**

Section className → `"relative overflow-hidden bg-canvas py-24 text-foreground md:py-32"`; keep `section-tint-b` and the orb. Wrap the `Reveal` grid in `<div className="glass rounded-feature p-8 md:p-14">…</div>`. Eyebrow `text-action` → `text-gold`. Email link hover `hover:text-action hover:decoration-action` → `hover:text-gold hover:decoration-gold`; `decoration-action/35` → `decoration-gold/40`.

- [ ] **Step 4: Verify and commit**

`npm run check` → green. `npm run build` → ok.

```bash
git add components/sections/page-hero.tsx components/sections/hero-motif.tsx components/sections/cta-section.tsx
git commit -m "feat(sections): glass inner heroes, gold motif and glass CTA"
```

---

### Task 9: Card and grid sections

**Files:**
- Modify: `web/components/sections/feature-grid.tsx`, `case-study-card.tsx`, `case-study-grid.tsx`, `pillar-cards.tsx`, `pillars.tsx`, `three-reasons.tsx`

Apply this mapping in every file (exact replacements; leave copy, links, roles and structure untouched):

| From | To |
|---|---|
| `font-serif text-h3 font-bold text-navy` | `text-h3 font-bold text-foreground` (card titles) ; inside `group` cards add `transition-colors group-hover:text-gold` |
| `text-grey-muted` | `text-foreground-muted` |
| `bg-white p-7 shadow-soft ring-1 ring-navy/5` (card shells) | `glass-card p-7` |
| `rounded-xl2` | `rounded-surface` ; `rounded-xl3` → `rounded-feature` |
| `hover:-translate-y-0.5 hover:shadow-lift` | remove (the glass card lifts itself) |
| `rounded-full bg-off-white px-3 py-1 text-xs font-medium text-navy/70` (chips) | `glass-pill text-foreground-muted` |
| `rounded-full bg-blue-pale/40 px-3 py-1 text-xs font-semibold text-blue-accent` (highlight chips) | `glass-gold rounded-full px-3 py-1 text-xs font-semibold` |
| `text-blue-accent` (links, arrows) | `text-gold` |
| `text-navy` (links) | `text-foreground` ; `hover:text-blue-accent` → `hover:text-gold` |
| `focus-visible:ring-blue-accent/50` | `focus-visible:ring-focus` |
| `bg-blue-accent` | `bg-action` |
| `border-l-4 … border-navy/border-blue-accent/border-blue-light/border-sand` (pillar accents) | `border-l-4 border-gold` for all four (keep the map but every value becomes `"border-gold"`) |
| `font-serif text-5xl font-bold text-blue-light` (ThreeReasons numerals) | `text-gradient-numeral text-5xl font-bold` |
| `bg-blue-pale/40 text-navy` (icon tiles) | `icon-tile rounded-surface` |
| `grid gap-px overflow-hidden rounded-xl2 border border-navy/5 bg-navy/5` (PillarsSection grid) | `grid gap-5` and each cell `flex h-full flex-col gap-5 bg-white p-8 md:p-10` → `glass-card flex h-full flex-col gap-5 rounded-feature p-8 md:p-10` |
| Filter buttons inactive (`case-study-grid.tsx`) `bg-off-white text-navy/70 ring-1 ring-navy/10 hover:bg-blue-pale/30 hover:text-navy` | `glass text-foreground-muted hover:border-gold-soft hover:text-gold` and `rounded-control` → `rounded-full` |
| `label-caps shrink-0 text-grey-muted` | `label-caps shrink-0 text-gold` |

- [ ] **Step 1: Apply the mapping to the six files.**
- [ ] **Step 2: `npm run check` → green; `npm run build` → ok.**
- [ ] **Step 3: Commit**

```bash
git add components/sections/feature-grid.tsx components/sections/case-study-card.tsx components/sections/case-study-grid.tsx components/sections/pillar-cards.tsx components/sections/pillars.tsx components/sections/three-reasons.tsx
git commit -m "feat(sections): glass cards, gold chips and numerals across grids"
```

---

### Task 10: Partner, toolchain, table, tile and stat sections

**Files:**
- Modify: `web/components/sections/home-partners.tsx`, `partner-ecosystem.tsx`, `alliance-strip.tsx`, `sap-toolchain.tsx`, `comparison-table.tsx`, `platform-practice-links.tsx`, `stat-band.tsx`, `logo-marquee.tsx`, `client-logo.tsx`, `client-wall.tsx`

Use the Task 9 mapping plus:

| Component | Change |
|---|---|
| `home-partners.tsx` | eyebrow `text-action` → `text-gold`; "Explore our partners" link `text-action` → `text-gold`; the `ul` → `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6` (drop `gap-px overflow-hidden rounded-surface border … bg-border-subtle`); each `li` → `glass-card flex min-h-28 flex-col items-center justify-center gap-3 rounded-surface px-4 py-5 text-logo-foreground` (keep `bg-logo-surface` **out**: the glass replaces it, but keep the image and name markup); the final "Full ecosystem" `li` → `glass-card rounded-surface`, link `text-action hover:bg-surface-subtle` → `text-gold`. |
| `partner-ecosystem.tsx` | card shell → `glass-card rounded-feature p-7`; partner chips → `glass-pill text-foreground` (keep logo/name markup); note chips → `glass-gold rounded-full px-2 py-0.5 text-xs font-semibold`. |
| `alliance-strip.tsx` | unchanged classes except add `hover:drop-shadow-[0_0_12px_oklch(var(--color-gold-soft)/0.6)]` to the img. |
| `sap-toolchain.tsx` | `li` → `glass-card group flex flex-col gap-4 rounded-feature p-6 focus-within:ring-2 focus-within:ring-focus` (drop the manual hover/translate/ring classes); icon span → `icon-tile h-11 w-11 rounded-surface`; name `font-serif font-semibold text-navy` → `font-semibold text-foreground group-hover:text-gold transition-colors`; role `text-grey-muted` → `text-foreground-muted`. |
| `comparison-table.tsx` | region wrapper `bg-surface shadow-soft ring-1 ring-border-subtle` → `glass rounded-feature`; header row stays `theme-on-brand bg-brand text-on-brand`; header label `text-blue-light` → `text-gold-on-brand`; zebra `bg-off-white` → `bg-surface-subtle/60`; `border-navy/10` → `border-border-subtle`; row heads `text-navy` → `text-foreground`; cells `text-grey-muted` → `text-foreground-muted`; `Pill` → `glass-gold rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal` (drop `bg-white/15 text-blue-pale`); `ColumnHeader` `font-serif` → nothing (keep `text-h3 font-bold`). |
| `platform-practice-links.tsx` | nav → `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6`; each link → `glass-card group flex min-h-20 items-center justify-between gap-3 rounded-surface px-5 py-4 text-base font-semibold text-foreground transition-colors hover:text-gold`; arrow `text-action` → `text-gold`. |
| `stat-band.tsx` | `CountUp` className `font-serif text-[2.75rem] font-bold leading-none text-foreground` → `text-gradient-numeral text-[2.75rem] font-bold leading-none`; label `text-foreground-muted` → `text-gold`. |
| `logo-marquee.tsx` | tile `div` (keep `group/logo`, `data-client`, roles) → add `rounded-surface` and change `border-r border-border-subtle bg-logo-surface` → `border border-glass-line/40 bg-logo-surface transition-[box-shadow] duration-300 hover:shadow-[0_0_0_1px_oklch(var(--color-gold-soft)/0.9)]`; keep `.client-ribbon*` hooks and both buttons (change their `rounded-control` to `rounded-full` and `hover:bg-surface-subtle` to `hover:border-gold hover:text-gold`). |
| `client-logo.tsx` | fallback wordmark `font-serif` → nothing else changes. |
| `client-wall.tsx` | grid → `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`; item → `glass-card group/logo flex h-28 items-center justify-center rounded-surface bg-logo-surface px-6`. |

- [ ] **Step 1: Apply the changes.**
- [ ] **Step 2: `npm run check` → green; `npm run build` → ok; restart the preview; `npx playwright test tests/browser/client-coverage.spec.ts tests/browser/interactions.spec.ts` → PASS.**
- [ ] **Step 3: Commit**

```bash
git add components/sections/home-partners.tsx components/sections/partner-ecosystem.tsx components/sections/alliance-strip.tsx components/sections/sap-toolchain.tsx components/sections/comparison-table.tsx components/sections/platform-practice-links.tsx components/sections/stat-band.tsx components/sections/logo-marquee.tsx components/sections/client-logo.tsx components/sections/client-wall.tsx
git commit -m "feat(sections): glass partner tiles, toolchain, tables and stat numerals"
```

---

### Task 11: Forms and the RISE vs GROW chooser

**Files:**
- Modify: `web/components/forms/demo-form.tsx`, `web/components/interactive/rise-grow-chooser.tsx`

- [ ] **Step 1: `demo-form.tsx`**

`field` constant → `"glass min-h-11 w-full rounded-control px-4 py-3 text-base text-foreground transition-colors hover:border-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2"`. Preview notice `rounded-control border border-border-strong bg-surface-subtle p-4` → `glass rounded-control p-4`. Submit button → `btn-shimmer min-h-12 rounded-full bg-action px-6 py-3 font-semibold text-on-action shadow-glass hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-70`. Error box unchanged. Links `text-action underline` unchanged.

- [ ] **Step 2: `rise-grow-chooser.tsx`**

Read the file; apply the Task 9 mapping to every className it contains (lines 239–240, 250, 258, 400, 433 and any other legacy palette class), specifically: the outer shell (line 239) → `mx-auto w-full max-w-2xl`; the inner panel (line 240) → `glass-elevated overflow-hidden rounded-feature p-7 text-foreground md:p-9`; progress track `bg-navy/10` → `bg-border-subtle`; progress fill `bg-blue-accent` → `bg-gold`; the result panel (line 400) → `glass-elevated rounded-feature p-6 md:p-8`; the restart link `text-navy … hover:text-blue-accent` → `text-foreground … hover:text-gold`; option buttons/cards → `glass-card rounded-surface` with `text-foreground`, selected state `border-gold ring-1 ring-gold` where it currently uses a blue ring/border. Keep all framer-motion usage, `aria-*`, names, ids and the scoring logic untouched.

- [ ] **Step 3: Verify**

`npm run check` → green. `npm run build`, restart the preview, then `npx playwright test tests/browser/transcript.spec.ts tests/browser/interactions.spec.ts` → PASS. Manually load `/sap-enterprise-solutions/rise-vs-grow/` in both themes with `curl -s http://127.0.0.1:3107/sap-enterprise-solutions/rise-vs-grow/ | grep -c glass` ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add components/forms/demo-form.tsx components/interactive/rise-grow-chooser.tsx
git commit -m "feat(forms): glass fields, gold progress and glass option cards"
```

---

### Task 12: Homepage sections

**Files:**
- Modify: `web/app/page.tsx`
- Modify: `web/app/globals.css` (section tints gain a gold radial)

- [ ] **Step 1: Section tints**

In `.section-tint-a`, `.section-tint-b`, `.section-tint-c` add as the first `background` layer `radial-gradient(circle at 88% 12%, oklch(var(--color-gold-soft) / 0.16), transparent 28rem),` (keep the existing layers after it).

- [ ] **Step 2: `app/page.tsx` mapping**

| Element | Change |
|---|---|
| Stats `dl` items | `dd` classes → `text-gradient-numeral text-3xl font-semibold tabular-nums tracking-[-0.04em] md:text-4xl`; `dt` `text-action` → `text-gold`; each item gets `glass-card rounded-surface px-6 py-7` and the grid becomes `grid gap-3 sm:grid-cols-2 lg:grid-cols-4` (drop the border-based layout; keep `metric-item relative`). |
| "Trusted in complex operating environments" `p` | `text-foreground-muted` → `text-gold` |
| "Partners & technology ecosystem" link | `text-action underline` → `text-gold underline decoration-gold/40 underline-offset-4` |
| Section eyebrows (`text-xs font-semibold uppercase tracking-[0.18em] text-action`) | `text-action` → `text-gold` (all five) |
| Section `h2` elements | drop `text-foreground` (gradient rule paints them); keep sizes |
| Capability rows (`capability-row group …`) | add `rounded-surface`; icon span → `icon-tile h-11 w-11 rounded-surface md:col-span-1` (drop its manual border/bg/hover classes); pillar name hover `group-hover:text-action` → `group-hover:text-gold`; index numerals `text-foreground-muted` → `text-gold`; "Explore" label `group-hover:text-action` → `group-hover:text-gold` |
| Method rows | code `text-action` → `text-gold`; icon span → `icon-tile h-11 w-11 rounded-surface`; arrow `text-action` → `text-gold` |
| Stage cards (`article.stage-card …`) | `border-border-subtle bg-surface/85` → `glass-card rounded-feature`; featured → `stage-card-featured glass-elevated rounded-feature border-gold-soft/70`; drop the manual `shadow-[…]`; numerals `text-action` → `text-gold`; icon box → `icon-tile h-12 w-12 rounded-surface`; bullets `bg-action` → `bg-gold` |
| Industry tiles | add `rounded-feature` to the `Link`; overlay unchanged; `industry.Icon` `text-brand-muted` → `text-gold-on-brand`; small industry links: `group-hover:text-action` → `group-hover:text-gold`, arrow `group-hover:text-action` → `group-hover:text-gold`, the list wrapper → `mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4` with each link `glass-card rounded-surface px-5` (drop the border-based classes) |
| Trust strip (`SAP Gold Partner`, `300+ SAP consultants`, …) | section → `glass border-x-0 py-8`; index `text-action` → `text-gold` |
| Ribbon section, partners section | unchanged beyond the items above |

- [ ] **Step 3: Verify**

`npm run check` → green. `npm run build`, restart the preview, `npx playwright test tests/browser/transcript.spec.ts tests/browser/interactions.spec.ts tests/browser/client-coverage.spec.ts tests/browser/hero.spec.ts` → PASS.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat(home): glass stats, rows, stage cards and gold accents"
```

---

### Task 13: Legacy palette sweep — hub and practice pages

**Files:**
- Modify: `web/app/sap-enterprise-solutions/page.tsx` and every `web/app/sap-enterprise-solutions/*/page.tsx`, `web/app/platform-services/page.tsx`, `web/app/salesforce/page.tsx`, `web/app/workday/page.tsx`, `web/app/oracle/page.tsx`, `web/app/microsoft/page.tsx`, `web/app/digital-data-ai/page.tsx` and its two children, `web/app/delivery-excellence/page.tsx`, `web/app/advisory/page.tsx`, `web/app/what-we-do/page.tsx`, `web/app/ecc-prism/page.tsx`, `web/app/why-in2it-ebs/page.tsx`

Apply this exact mapping to every className in those files. Do not touch copy, hrefs, ids, aria attributes, headings' text or component props. Where a class sits inside a `theme-on-brand` / `bg-brand` / `tone="navy"` context use the on-brand column.

| Legacy class | On light surfaces | Inside on-brand contexts |
|---|---|---|
| `text-navy` | `text-foreground` | `text-on-brand` |
| `text-navy/70`, `text-navy/60` | `text-foreground-muted` | `text-on-brand/70` |
| `text-grey-muted` | `text-foreground-muted` | `text-brand-muted` |
| `text-white` | `text-on-action` when on `bg-action`, otherwise `text-on-brand` | `text-on-brand` |
| `text-blue-accent` | `text-gold` for labels, numerals, arrows, icons; `text-action` for inline links | `text-gold-on-brand` |
| `text-blue-light` | `text-gold` | `text-gold-on-brand` for labels/icons, `text-brand-muted` for body |
| `text-blue-pale` | `text-foreground-muted` | `text-brand-muted` |
| `text-sand` | `text-gold` | `text-gold-on-brand` |
| `bg-white` (card/panel) | `glass-card` (interactive or grid cards) / `glass` (static panels) | `bg-brand/60 border border-gold-on-brand/20` |
| `bg-white` (page band) | `bg-canvas` | — |
| `bg-off-white` | `bg-surface-subtle` (bands) / `glass-pill` (chips) | `bg-on-brand/10` |
| `bg-navy` | `theme-on-brand bg-brand` | — |
| `bg-blue-accent` | `bg-action` | `bg-gold-on-brand` |
| `bg-blue-pale/…` | `bg-action/10` | `bg-on-brand/10` |
| `bg-sand` | `bg-gold` | `bg-gold-on-brand` |
| `border-navy`, `border-navy/5..20`, `ring-navy/*` | `border-border-subtle` / `ring-border-subtle` | `border-on-brand/20` |
| `border-blue-light`, `border-blue-accent` | `border-gold-soft` | `border-gold-on-brand/40` |
| `shadow-soft` | drop when the element is now glass; otherwise `shadow-glass` | drop |
| `shadow-lift` | drop (glass hover) | drop |
| `rounded-xl2` | `rounded-surface` | same |
| `rounded-xl3` | `rounded-feature` | same |
| `font-serif` | remove the class (Plex is the only face) | same |

- [ ] **Step 1: Apply the mapping to every file listed.**
- [ ] **Step 2: Verify no legacy class remains in those files**

Run from `web/`:

```bash
grep -rnE "text-navy|bg-white|text-grey-muted|bg-off-white|blue-accent|blue-light|blue-pale|shadow-soft|shadow-lift|rounded-xl2|rounded-xl3|border-navy|bg-navy|ring-navy|text-sand|bg-sand|font-serif" app/sap-enterprise-solutions app/platform-services app/salesforce app/workday app/oracle app/microsoft app/digital-data-ai app/delivery-excellence app/advisory app/what-we-do app/ecc-prism app/why-in2it-ebs || echo CLEAN
```

Expected: `CLEAN`.

- [ ] **Step 3: `npm run check` → green; `npm run build` → ok.**
- [ ] **Step 4: Commit**

```bash
git add app
git commit -m "refactor(pages): sweep hub and practice pages onto semantic glass and gold classes"
```

---

### Task 14: Legacy palette sweep — company and content pages, regression test

**Files:**
- Modify: `web/app/about/page.tsx`, `web/app/careers/page.tsx`, `web/app/contact/page.tsx`, `web/app/partners/page.tsx`, `web/app/industries/page.tsx`, `web/app/industries/[slug]/page.tsx`, `web/app/case-studies/page.tsx`, `web/app/case-studies/[slug]/page.tsx`, `web/app/insights/page.tsx`, `web/app/insights/[slug]/page.tsx`, `web/app/legal/*/page.tsx`, `web/app/thank-you/page.tsx`, `web/app/not-found.tsx`, and any remaining component under `web/components/` still carrying a legacy class
- Modify: `web/tests/foundations.test.ts`

- [ ] **Step 1: Write the failing regression test**

Append to `web/tests/foundations.test.ts`:

```ts
test("legacy palette classes are no longer used in markup", () => {
  // The premium restyle moved every page onto semantic roles; the legacy aliases stay in tailwind.config.ts only as migration adapters.
  const legacy =
    /\b(?:text-navy|bg-white|text-grey-muted|bg-off-white|(?:text|bg|border|ring)-blue-(?:accent|light|pale)|shadow-soft|shadow-lift|rounded-xl2|rounded-xl3|border-navy|bg-navy|ring-navy|text-sand|bg-sand|font-serif)(?:\/[\w.[\]]+)?\b/g;
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.tsx$/.test(entry))
        for (const m of readFileSync(full, "utf8").matchAll(legacy))
          offenders.push(`${path.relative(process.cwd(), full)}: ${m[0]}`);
    }
  };
  for (const root of ["app", "components"]) walk(path.join(process.cwd(), root));
  assert.deepEqual(offenders, []);
});
```

- [ ] **Step 2: Run it** — `npx tsx --test tests/foundations.test.ts` → FAIL listing the remaining offenders. That list is your worklist.
- [ ] **Step 3: Apply the Task 13 mapping to every listed file** (the `prose` article pages in `insights/[slug]` and `case-studies/[slug]` keep their `prose prose-neutral` classes; only the legacy palette classes change). `not-found.tsx`: same mapping.
- [ ] **Step 4: Run the test until it passes**, then `npm run check` → green; `npm run build` → ok.
- [ ] **Step 5: Run the full route/axe suite**

Restart the preview server, then `npx playwright test tests/browser/all-routes.spec.ts` → PASS in both themes (fix any axe contrast violation by raising the glass alpha on the offending panel or switching that text to `text-foreground`; record what you changed in the report).

- [ ] **Step 6: Commit**

```bash
git add app components tests/foundations.test.ts
git commit -m "refactor(pages): finish the semantic sweep and lock it with a regression test"
```

---

## Phase 5 — Documentation and verification

### Task 15: Design documentation, runbook note, worklog

**Files:**
- Modify: `DESIGN.md` (root), `docs/REMEDIATION_RUNBOOK.md`, `web/WORKLOG.md`

- [ ] **Step 1: Root `DESIGN.md`**

Update the header line to "Updated 10 September 2026" and:

- **Direction**: add a paragraph: the presentation is now premium glassmorphism — frosted panels over a white / cool-blue canvas with deep-gold text accents and navy-to-gold gradient headings in light mode; the dark theme is a noir canvas with champagne gold (the reference prototype's look). Content, imagery and hierarchy are unchanged.
- **Source of truth table**: add rows `gold, gold-display, gold-on-brand, gold-soft` (foreground roles) and `glass, glass-line` (surfaces), with the contrast facts from spec §3.1.
- **Typography and layout**: note the radii are now 0.75rem / 1rem / 1.5rem, buttons and pills are fully rounded, and `main h1, main h2` carry the gradient with `.heading-plain` as the opt-out.
- **Interaction and motion**: describe `.reveal` (visible-first, observer-driven), the hover vocabulary (glass lift + gold glow, gold nav underline, primary shimmer, icon-tile fill), and the WebGL hero's gating (≥1024px, motion allowed, no data saver, WebGL, idle) and pause rules (page control, reduced motion, hidden tab, offscreen), plus the 700 000-byte lazy chunk budget.
- **Integrity**: unchanged.

- [ ] **Step 2: Runbook**

Append a short "Premium restyle (2026-09-10)" section to `docs/REMEDIATION_RUNBOOK.md`: what changed, the new `hero.spec.ts`, the chunk budget in `check-build.mjs`, and that `content/` and `public/` were untouched (verify with `git diff --stat main -- web/content web/public`, expected empty).

- [ ] **Step 3: Worklog**

Add a dated entry to `web/WORKLOG.md` summarising the restyle and the branch.

- [ ] **Step 4: Verify the frozen-content constraint and the full suites**

From the repo root: `git diff --stat main -- web/content web/public` → no output.
From `web/`: `npm run check` → green; `npm run build` → chunk budget printed; restart the preview; `npx playwright test` (full suite) → all pass (the WebGL pause test may skip).

- [ ] **Step 5: Commit**

```bash
git add ../DESIGN.md ../docs/REMEDIATION_RUNBOOK.md WORKLOG.md
git commit -m "docs: record the premium glass restyle in the design system and runbook"
```

---

## Self-review notes

- Spec coverage: §3.1 tokens → Task 1; §3.3 utilities → Task 2; §3.4 reveals/hover → Tasks 2, 3, 4; §3.5 component table → Tasks 4, 5, 7–12; inner-page sweep → Tasks 13–14; §4 hero → Tasks 6–7; §4.4 budget → Task 6; §6 tests → Tasks 1, 2, 3, 6, 7, 14; §5 docs → Task 15. Nothing in §3.6 needs a task (no asset changes).
- Type consistency: `Hero3DState` and the `data-hero-3d` values match between the loader, the scene's `onState`, and `hero.spec.ts`; `Stagger`/`StaggerItem` `index` prop matches the unit test regex; token names match between CSS, Tailwind and both tests.
- Placeholders: none. Every mapping is explicit; every new file is given in full.
