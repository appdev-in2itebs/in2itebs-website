# Final whole-branch review — premium glass restyle (17277ca..4e88987)

Reviewer: Fable (dispatched by the controller on 2026-09-11). Verdict at the time: **not ready to merge**; every item below was routed into the single fix wave (6d1cfde..da6447a) except those marked deferred, and the fix wave was re-reviewed separately (see the ledger).

## Passes made

1. Plan Global Constraints, spec §2, §3, §4, §6, and the full deferred-and-rulings ledger.
2. `web/app/globals.css` + `web/tailwind.config.ts`.
3. `components/hero/hero-3d-loader.tsx`, `components/hero/hero-3d.tsx`, `scripts/check-build.mjs`, `components/motion/motion-observer.tsx`, `components/motion/reveal.tsx`, `app/layout.tsx`.
4. `components/ui/*`, `components/layout/*`, `components/sections/motion-controls.tsx`.
5. `components/sections/*` (all 20 files), `components/forms/demo-form.tsx`, `components/interactive/rise-grow-chooser.tsx`.
6. `app/**/page.tsx` in five chunks.
7. Tests: `hero.spec.ts`, `interactions.spec.ts`, `theme-contrast.spec.ts`, `design-system.test.ts`, `foundations.test.ts`; plus the unchanged `transcript.spec.ts`, `all-routes.spec.ts`, `performance.spec.ts` for the failing-gate analysis.
8. Docs: `DESIGN.md`, `WORKLOG.md`, `docs/REMEDIATION_RUNBOOK.md`.

Spot checks outside the package: built CSS (what Tailwind's `ring-1` emits), `node_modules/axe-core` (`opacityHidden` semantics), `components/ui/container.tsx`, and `git diff --stat 17277ca..4e88987 -- web/content web/public web/next.config.mjs web/lib web/app/api web/app/robots.ts web/app/sitemap.ts` (empty: constraints 1 and 6 hold).

## Strengths

- Disciplined token architecture: every new colour is an OKLCH channel triple consumed through Tailwind; `.theme-on-brand` remaps gold and glass at the token layer; the on-brand alpha rule is placed after the dark rule so source order settles a same-specificity tie in both themes. Cascade reasoning is written down where it matters.
- The hero loader is honest after its fix round: `mountedRef`, cached and debounced WebGL probe, self-healing `sync()`, offscreen-first, renderer failure reported, full disposal with forced context loss; the elapsed-time accumulator avoids a jump on resume.
- The chunk budget is enforced recursively and against the app-build manifest.
- The sweep is locked by a real regression test and the frozen-content constraint is verifiably true.
- Tests exercise behaviour, not mocks.
- Ledger rulings were sound and cheap to verify; all checked ones are present at HEAD.

## Issues

### Critical

1. **Form-field boundaries lost their 3:1 contrast (constraint 2, WCAG 1.4.11).** `demo-form.tsx:9-10` replaced `border border-border-strong bg-surface` with `glass`; the glass hairline over a 62%-alpha white panel inside `Card tone="light"` on `bg-surface-subtle` is about 1.1:1. axe does not test non-text contrast. Fix: `border-border-strong` on `field`. Spec §3.5 is itself the defect.
2. **Known failing gate (constraint 7)** — see below; the fix belongs in the reveal CSS, not the test.

### Important

3. **`Card bezel` silences the glass shadow and hover glow on about 20 cards.** `card.tsx:33` `ring-1 ring-inset ring-gold-soft/40` sets `box-shadow` in the utilities layer and beats `.glass-card`'s base-layer shadow. Same mechanism the Task 11 reviewer caught on the chooser.
4. **The `main h2` gradient reaches sub-large headings** (`app/page.tsx:146`, `what-we-do/page.tsx:93`, `insights/[slug]/page.tsx:85`) whose gold tail is below 4.5:1; `.heading-plain` (0,1,0) also loses to `main .theme-on-brand h2` (0,1,2).
5. **A background-tab load leaves the 3D hero permanently `unavailable`** — no `visibilitychange` re-evaluation (spec §4.2 defect).
6. **`<Accent>` words are no longer coloured** — `-webkit-text-fill-color: transparent` is inherited from the gradient heading, so the blue accent word is gone site-wide; unruled at the time.
7. **Text-on-glass contrast is unverifiable by axe** (cannot compute through `backdrop-filter`); the mega-menu muted links at 0.78 over navy tiles composite to about 3.2:1. Add arithmetic composite pairs to `theme-contrast.spec.ts`.
8. **Backdrop-filter surface count** is a performance risk no test measures; drop it from chips, sample scroll frame timing.
9. **Ledger items already ruled into the fix wave still open at HEAD** (mega-menu alpha, practice-tiles breakpoints, dark logo-wall radius, PageHero `relative z-10`, stale comments, header `border-color` transition).

### Minor

10. `not-found.tsx:33` ghost button hover pair about 2:1 in the on-brand scope.
11. `hero-3d.tsx:233-239` `setSize` clears the buffer; a paused scene goes blank on resize.
12. Probe canvas keeps a WebGL context for the document lifetime; renderer failure reported as `no-webgl`.
13. `motion-observer.tsx` read/write interleave forces a layout per reveal at hydration.
14. `header.tsx:69` scrolled alpha override beats the `@supports not (backdrop-filter)` fallback.
15. Foundations regex covers `bg-white` but not `text-white`/`border-white`/`ring-white`.
16. Docs: sr-only h1 `heading-plain` claim; worklog "hidden-until-animated" phrasing; commit count; Card docstring silent on navy `bezel`.
17. Hover conventions mixed after the sweep (deferred).
18. Dark `--gradient-heading-on-brand` duplicates `--gradient-heading` verbatim.
19. `hero.spec.ts` dark test asserts nothing dark-specific.

## Triage of deferred and parked items

All controller rulings confirmed in code (gold-display 57%, `Reveal delay`, on-brand glass remap, `border-l-gold`, `.glass-card-selected`, 320px overflow, SectionHeading colour drop, photo-frame wrappers, cta-section/home-partners colour drop, root `WORKLOG.md`). The insights motif `border-gold-soft` parking is confirmed (aria-hidden, `opacity-[0.05]`, decorative; grey would be the outlier); dropping `ring-1 ring-white/10` on navy cards was also right because `ring-white` resolves to the legacy alias that is dark in the dark theme. Mega-menu 0.92 reclassified from polish to necessary. Items kept deferred: dark on-brand gradient duplicate (18), glass utility repetition, no numeric glass pin, first-occurrence regex, `--stagger-step`, client-mounted `.reveal` unobserved, RSC `child.type`, safety pass once, navy `bezel` no-op (document it), Talk-to-us 36px hit area, mobile close-button hover class, `settled()` race, gold over the canvas, renderer-failure latch, transition-utility removal, blue decorative dots and `stage-featured-tint`, thin 4.7:1 small gold uppercase. Visual-gate items: header offset artefact, pillars rhythm, knot under hero copy (fix: camera x −5).

## Known failing gate

A constraint-7 failure exposing a real property of the reveal system. `.reveal` transitions both directions, so at hydration every below-the-fold `.reveal` fades from 1 to 0 over 600 ms plus its delay; axe skips opacity 0 but multiplies fractional opacity into the foreground — the reported `#eff1f3 on #f3f6fa`. Nothing in a25585f..5f1b372 is structural on those routes; the race has existed since b96a3c5 and widened at c5973d8. Correct fix: move the transition onto `.reveal[data-reveal="in"]` so hiding is instantaneous; `transcript.spec.ts` unchanged becomes the regression guard. Emulating reduced motion in the test would hide the defect. Spec §3.4 is amended.

## Recommendations

1. One fix wave in the order: reveal transition, form-field border, Card bezel, sub-large h2 opt-outs, visibilitychange, composite pairs, ruled ledger items.
2. Explicit owner decision on accent words, written into `DESIGN.md` either way.
3. Scroll frame-timing sample before merge; drop `backdrop-filter` from chips if not free.
4. Re-run the full Playwright suite after the wave, not subsets.
5. Record in the spec that axe cannot arbitrate glass contrast and that §3.4 was amended.

## Assessment

**Ready to merge?** No at 4e88987; "With fixes" becomes "Yes" after one focused wave and a full-suite run.


---

# Appendix A — Fix-wave brief (controller)

# Final fix wave — brief (premium glass restyle)

Branch `restyle/2026-09-10-premium-glass`. Work in `web/`. One commit per logical group is fine; every commit carries the trailers:

```
Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V5zMQn5A4dFKdr2AkEeizu
```

Global constraints (spec §2) bind every change: no edits under `web/content/` or `web/public/`; contrast ≥ 4.5:1 normal / ≥ 3:1 large and boundaries in both themes, `theme-contrast.spec.ts` pairs extended never relaxed; `.reveal` may hide content only under `html[data-motion-ready]:not([data-motion-paused="true"])`; decorative motion pauses under the page control, reduced motion, hidden tab, offscreen; no dynamic APIs; `next.config.mjs` and CSP untouched; existing tests keep passing and a test changed on purpose carries a comment saying why; pinned layout facts; one lazy three.js chunk ≤ 700 000 bytes; `npm run check` green; class hooks are Tailwind utilities or `globals.css` definitions.

## A. Items already ruled into this wave by the controller (mandatory)

A1. `web/components/layout/header.tsx` — the desktop mega-menu panel (`#desktop-nav-0`) gets `[--glass-alpha-elevated:0.92]` so busy photography under the light-theme panel no longer bleeds through. One class on the panel element. (Task 5 ruling.)

A2. `web/components/sections/platform-practice-links.tsx` — the practice tiles grid becomes `grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` so 320–479px phones get one column instead of mid-word breaks. Keep the existing `min-w-0` and `[overflow-wrap:anywhere]` safety net. (Task 12 ruling.)

A3. `web/app/globals.css` — in the dark theme the static logo wall (client ribbon expanded, or under reduced motion) shows a cross pattern where rounded light tiles meet over the noir 1px gaps. Add `.client-ribbon[data-expanded="true"] .client-ribbon-list > div { border-radius: 0; }` and the same declaration inside the existing reduced-motion block for the ribbon, so tiles are square-cornered only in the static wall. Verify the hook names against `web/components/sections/logo-marquee.tsx` (the ribbon component; `motion-controls.tsx` toggles its state) before writing the selector. (Task 12 ruling.)

A4. `web/components/sections/page-hero.tsx` — the `Container` gets `relative z-10` (matching `service-hero.tsx`) so the hero-ambient layer paints beneath the copy; the doc comment no longer says "serif headline". (Task 8 deferred minors.)

A5. `web/components/sections/comparison-table.tsx` — the JSDoc that says the table renders "on white" is stale; describe the glass scroller. (Task 10 deferred minor.)

A6. Docs wording (from the Task 15 re-review): `DESIGN.md` line ~50 — make the hero's mount-condition sentence a single complete list (viewport ≥ 1024px, motion allowed / no `prefers-reduced-motion: reduce`, no data saver, WebGL available, page not hidden) followed by the pause sentence (page control, hidden tab, offscreen); `WORKLOG.md` line ~7 — restore "the page visible" to the mount conditions. Keep reduced motion out of the pause clause.

## B. Final-review findings (whole-branch review on 17277ca..4e88987) — with controller rulings

Severity is the reviewer's. Every item below is mandatory unless marked "deferred".

B1 (Critical) — **Form-field boundaries lost their 3:1 contrast.** `web/components/forms/demo-form.tsx:9-10` replaced `border border-border-strong bg-surface` with `glass`; the glass border is white at 55% alpha over a 62%-alpha white panel inside `Card tone="light"` on `bg-surface-subtle` (`app/contact/page.tsx:64`), so every input/select/textarea is a near-white box with a white hairline (about 1.1:1). Fix: add `border-border-strong` to the shared `field` class (Tailwind's utility overrides the glass border colour; keep `hover:border-gold-soft`). Confirm select and textarea share the class. Spec section 3.5's "inputs become `.glass`" row is amended to say the field keeps `border-border-strong` (see B10).

B2 (Critical, the failing gate) — **Reveal hide transition runs in both directions.** `.reveal` (`globals.css` about lines 785-791) transitions opacity/transform on the base class, so at hydration every below-the-fold `.reveal` fades from 1 to 0 over 600 ms plus its stagger delay; axe skips opacity 0 but multiplies fractional opacity into the foreground, which is the `#eff1f3 on #f3f6fa` violation the mega-menu tests hit mid-fade. Fix in the reveal CSS, not the test and not the sweep: move the transition onto the revealed state so hiding is instantaneous and only the reveal animates:

```css
.reveal[data-reveal="in"] { transition: opacity 600ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--reveal-delay, 0ms); }
html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"]) { opacity: 0; transform: translateY(18px); }
```

Constraint 3 is unchanged. `tests/design-system.test.ts` has a regex on the reveal rules: keep it passing, and if it must change, the change carries a comment saying why (constraint 7). `transcript.spec.ts` is NOT edited and must pass as-is; do not add reduced-motion emulation to it. The interactions reveal test (opacity 0 then 1 on scroll) must still pass. Section C below carries the bisect and root-cause confirmation from the diagnosis agent; if C contradicts this mechanism, C wins and you stop and report NEEDS_CONTEXT before changing anything.

B3 (Important) — **`Card bezel` (the default) silences the glass shadow and hover glow on about 20 cards.** `web/components/ui/card.tsx:33` adds `ring-1 ring-inset ring-gold-soft/40`; Tailwind's ring sets `box-shadow` in the utilities layer and beats `.glass-card`'s base-layer shadow at rest and on hover/focus-within. Ruling: do NOT use `outline` (it would clobber `:focus-visible` outlines on cards that are links). Add a `.glass-card-bezel` component utility in `globals.css` next to `.glass-card-selected`, mirroring its selector set (rest, `:hover`, `:focus-within`, and the `.theme-dark` hover override) with `box-shadow: <the matching glass shadow list>, inset 0 0 0 1px oklch(var(--color-gold-soft) / 0.4)`; Card applies `glass-card-bezel` instead of the ring when `bezel` is set and tone is not navy; add the hook to the design-system utilities test alongside `glass-card-selected`; document in the Card docstring that `bezel` is ignored for `tone="navy"`.

B4 (Important) — **The `main h2` gradient reaches sub-large headings** whose gold tail is below the 4.5:1 normal-text floor: `app/page.tsx:146` (`text-lg font-semibold`), `app/what-we-do/page.tsx:93` and `app/insights/[slug]/page.tsx:85` (`text-h3 font-semibold`). Fix: give those three h2s `heading-plain text-foreground`. Also `.heading-plain` (0,1,0) loses to `main .theme-on-brand h2` (0,1,2) on `background-image`; make the selector list `.heading-plain, main .heading-plain, main .theme-on-brand .heading-plain` so the opt-out wins everywhere.

B5 (Important) — **A background-tab load leaves the 3D hero permanently `unavailable`.** `hero-3d-loader.tsx:26` returns `"hidden"` when `document.hidden` and re-evaluates only on `resize` and the reduced-motion change. Add a `visibilitychange` listener: when the document becomes visible and state is `unavailable` with reason `hidden`, re-run the evaluation through the same debounce. Clean the listener up with the others.

B6 (Important, ruled) — **`<Accent>` words inherit the heading gradient.** `.accent { color: action }` is inert inside gradient h1/h2 because `-webkit-text-fill-color: transparent` is inherited, so the blue accent word is gone site-wide. Controller ruling: this stands. The spec's direction is deep-gold accents in light and champagne gold in dark, the gradient's gold tail is that accent, and a solid blue word inside a navy-to-gold heading would fight it. Do not restore the blue. Do: (a) add a comment on `.accent` and `.theme-on-brand .accent` in `globals.css` saying they apply only where the heading gradient does not (`.heading-plain` headings and body copy); (b) state in `DESIGN.md` (Typography and layout) that accent words inside gradient headings inherit the gradient and are not separately coloured.

B7 (Important) — **Text-on-glass contrast is unverifiable by axe** (it cannot compute through `backdrop-filter`). Add arithmetic composite pairs to `tests/browser/theme-contrast.spec.ts` using its existing luminance helper: composite the glass colour at `--glass-alpha` and `--glass-alpha-elevated` over the relevant background, then check the foreground against that composite. Cover the combinations actually in use, not a full cross-product: the desktop mega-menu panel (`fg-primary` and `fg-secondary` on elevated glass at the panel's alpha, over `bg-canvas` and over `bg-brand`, since the panel can sit over dark industry tiles); `glass-card` text (`fg-primary`, `fg-secondary`, `gold`) over `bg-canvas` and `bg-surface-subtle`; on-brand glass (`fg-on-brand`, `gold-on-brand`) over the `.theme-on-brand` glass remap on `bg-brand`. Floors: at least 4.5 for normal-text roles, at least 3 for `gold-display`. Both themes. Together with A1: set the mega-menu panel to `[--glass-alpha-elevated:0.92]`; if the new panel pair fails at 0.92, raise it to the lowest value that passes and record the value in your report.

B8 (Important, ruled) — **Backdrop-filter surface count.** Drop `backdrop-filter` (and its `-webkit-` twin) from `.glass-pill` and `.glass-gold` in `globals.css`: chips sit on opaque or already-glass surfaces where the blur is invisible at their alpha. Do NOT change `.glass-card` below `md`. Add one scroll frame-timing sample to `tests/browser/performance.spec.ts`: scripted scroll of the SAP hub route and the partners route at 375 and 1440 using `requestAnimationFrame` timestamps, computing the p95 frame interval; assert it is no more than 3x the same measurement on the glass-light control route (the privacy policy page), a relative bound that survives slow machines, and log all values so the numbers are known. If headless Chrome cannot produce meaningful rAF timing in this environment, say so in the report and keep the sample as a logged measurement with the relative assertion.

B9 (Important) — the ledger items in section A plus: `header.tsx:69` transition list adds `border-color` so the gold border no longer snaps on scroll; `hero-3d.tsx:97` camera x from -3.5 to -5 so the knot edge no longer passes under the hero body copy in the light theme (take a 1440x1000 light-theme screenshot of the homepage with the scene active and name its path in the report for the controller visual gate).

B10 (docs, ruled) — amend the spec so the next restyle does not inherit these defects: `docs/superpowers/specs/2026-09-10-premium-glass-restyle-design.md` section 3.4 reveal CSS line to the B2 form; section 3.3 gets a sentence that axe cannot arbitrate glass contrast and the composite pairs in `theme-contrast.spec.ts` are the arbiter; section 3.5 inputs row becomes `.glass` plus `border-border-strong`. Each amendment gets a one-line "(amended 2026-09-11: ...)" note.

## C. Transcript mega-menu axe failure — diagnosis (bisect and snapshots by the diagnosis agent, 2026-09-11)

**Bisect.** The two tests pass at `dca115d` (Task 2, before the reveal system) and fail from `b96a3c5` (Task 3, the reveal markup hooks and MotionObserver). They fail at `a25585f` (Task 12), so this is not a Task 13 or 14 regression; the sweep merely changed which text sits inside the fading elements. At HEAD the two tests pass when run alone (`2 passed (15.3s)`) and fail under the full suite (twice, `54 passed / 2 failed`): the outcome depends on how much of the fade window the scan lands in.

**Snapshots at a25585f (viewport 1280x900, no reduced motion, axe run immediately after opening the mega-menu):**

- `/what-we-do/`: 18 `.reveal` elements; before axe, `data-motion-ready` was set, 1 element was `in`, and 12 of the 17 below-the-fold elements were at partial opacity (0.66, 0.83 ...) with no `data-reveal`; after axe all 17 were at opacity 0. axe reported 46 `color-contrast` violations (ratios 1.31 to 1.37, e.g. the eyebrow `label-caps text-gold` and the lead paragraph inside `.reveal.mb-12.max-w-2xl`) plus 50 incompletes.
- `/contact/`: 15 `.reveal` elements; before axe all were opaque; after axe the 10 below-the-fold elements were at opacity 0. axe reported 0 violations and 38 incompletes.

**Root cause (confirmed).** Exactly the B2 mechanism: the base `.reveal` rule carries the transition, so when `MotionObserver` sets `data-motion-ready` the below-the-fold elements animate from opacity 1 to 0 over 600 ms plus their stagger delay. axe treats opacity 0 as hidden (skipped) but multiplies a fractional opacity into the foreground colour, so any element caught mid-fade reports a ratio near 1. Whether a given run passes depends only on whether the scan lands inside that window.

**Fix.** The B2 CSS change (transition only on `.reveal[data-reveal="in"]`, hide instantaneous). Do not touch `transcript.spec.ts`; after the fix it becomes the regression guard for "hide must be instantaneous". Verify by running the full suite (not the two tests alone, which can pass by timing).

## D. Minor items folded in (cheap, mandatory unless marked deferred)

D1. `app/not-found.tsx:33` ghost button hover: `hover:bg-surface-subtle` becomes `hover:bg-on-brand/10` (on-brand scope).
D2. `hero-3d.tsx:233-239`: `renderer.setSize` clears the buffer; when `!running` after a resize, render one frame so a paused scene is not blank.
D3. `hero-3d-loader.tsx:14-19`: after the WebGL probe, call `getExtension("WEBGL_lose_context")?.loseContext()` so the probe canvas does not hold a context for the document lifetime.
D4. `motion-observer.tsx:20-24, 37-41`: collect `getBoundingClientRect` reads first, then write `dataset.reveal` (no read/write interleave).
D5. `header.tsx:69`: move the scrolled glass-alpha override into a base-layer rule placed before the `@supports not (backdrop-filter)` block in `globals.css` so the no-backdrop-filter fallback is not lowered (0.96 to 0.90) while scrolled.
D6. `tests/foundations.test.ts` legacy regex: add `(?:text|bg|border|ring)-white` (the `white` alias resolves to `bg-surface`, which is dark in the dark theme). Keep `bg-white` covered.
D7. Docs: `DESIGN.md` — remove the claim that the sr-only h1 carries `heading-plain` (it is `sr-only` only); `WORKLOG.md` — the previous `Reveal` was a visible-first no-op wrapper, not "hidden-until-animated"; update the commit count/range to the branch state after this wave (count it with `git rev-list --count main..HEAD` as your last step before the final commit); `card.tsx` docstring — `bezel` is ignored for `tone="navy"`.
D8. `globals.css` dark block: `--gradient-heading-on-brand: var(--gradient-heading)` instead of the verbatim duplicate (keep `tests/design-system.test.ts` passing; its token-presence check needs only the name).
D9. `tests/browser/hero.spec.ts` "dark theme reaches the same outcome": add one `await expect(page.locator("html")).toHaveClass(/theme-dark/)` so it asserts something dark-specific.
D10 (deferred, do not do): hover-colour conventions on body links (`hover:text-gold` vs `hover:text-foreground`) are left as they are.

## E. Order and commits

Work in this order, one commit per group, each with the trailers: (1) B2 reveal CSS + spec 3.4; (2) B1 field border + spec 3.5; (3) B3 bezel utility + Card + test hook; (4) B4 headings + `.heading-plain`; (5) B5 + D2 + D3 loader/scene; (6) B7 contrast pairs + A1 mega-menu alpha; (7) B8 chips + performance sample; (8) A2 to A5, B9, D1, D4, D5, D8, D9; (9) D6 regex; (10) A6, B6, B10, D7 docs. Run `npm run check` after each group; run the build and the FULL Playwright suite once at the end (not subsets: subset runs hid B2 for twelve tasks) and again only if you changed code after the first full run.

## Gates

From `web/`: `npm run check` → green; `npm run build` → ok with the chunk-budget line; then `npx playwright test` (full suite) → all pass (the WebGL pause test may skip). Playwright starts `npm start` on 127.0.0.1:3107 itself if nothing listens; if a server from an older build is listening, stop it first. From the repo root: `git diff --stat main -- web/content web/public` → prints nothing.


---

# Appendix B — Fix-wave implementer report

# Final fix wave — report

Branch `restyle/2026-09-10-premium-glass`. Base `e5cc01a`, tip `da6447a`. 10 commits, working tree clean,
nothing left listening on 3107. No premise in the brief proved false: every item in A, B, C and D except the
explicitly deferred D10 has a hunk.

## Commits, in order

| # | SHA | Subject |
|---|---|---|
| 1 | `6d1cfde` | fix(motion): reveal only on the way in, so hiding is instantaneous |
| 2 | `2056948` | fix(forms): give glass form fields a visible boundary again |
| 3 | `fd43fea` | fix(cards): carry the Card bezel as a glass shadow, not a Tailwind ring |
| 4 | `b3b6d02` | fix(headings): keep sub-large h2s off the gold gradient tail |
| 5 | `a5ba8fb` | fix(hero): recover the 3D scene after a background-tab load |
| 6 | `eafa5cf` | test(contrast): arbitrate text on glass with composite pairs |
| 7 | `09a3b47` | perf(glass): stop compositing chips, and sample scroll frame timing |
| 8 | `6c084c5` | fix(ledger): clear the deferred minors from tasks 8, 10 and 12 |
| 9 | `58f909a` | test(foundations): catch every prefix of the legacy white alias |
| 10 | `da6447a` | docs: correct the hero gates, the reveal history and the glass arbiter |

Every commit carries both trailers (`Co-Authored-By: Claude Fable 5.1` and `Claude-Session: …session_01V5zMQn5A4dFKdr2AkEeizu`).
No existing commit was amended, rebased or touched; nothing pushed.

## Brief item → commit → change

All paths relative to the repo root. Line numbers are post-wave.

| Item | Commit | What changed |
|---|---|---|
| A1 | `eafa5cf` | `web/components/layout/header.tsx:142` — mega-menu panel gains `[--glass-alpha-elevated:0.92]` (one class, plus a comment above the attribute saying why 0.92). |
| A2 | `6c084c5` | `web/components/sections/platform-practice-links.tsx:15` — `grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`; the `min-w-0` and `[overflow-wrap:anywhere]` net on the tile (line 21) is untouched. |
| A3 | `6c084c5` | `web/app/globals.css:77` (`.client-ribbon[data-expanded="true"] .client-ribbon-list > div`) and `:95` (the same element inside the existing `prefers-reduced-motion` block) — `border-radius: 0`. Hook names verified against `logo-marquee.tsx` (`client-ribbon`, `data-expanded`, `client-ribbon-list`, tile `<div>` children). |
| A4 | `6c084c5` | `web/components/sections/page-hero.tsx:33` — `<Container className="relative z-10">` (matching `service-hero.tsx:92`); `:9` doc comment now says "large display headline", not serif. |
| A5 | `6c084c5` | `web/components/sections/comparison-table.tsx:10-12` — JSDoc describes the rounded glass scroller with an on-brand header band instead of "on white". |
| A6 | `da6447a` | `DESIGN.md:50` — mount conditions are now one complete list (viewport ≥1024px, motion allowed / no `prefers-reduced-motion: reduce`, no data saver, WebGL available, page visible), then the pause sentence (page control, hidden tab, offscreen); reduced motion stays out of the pause clause. `WORKLOG.md:7` — "the page visible" restored to the mount conditions. |
| B1 | `2056948` | `web/components/forms/demo-form.tsx:13` — shared `field` class gains `border-border-strong`; `hover:border-gold-soft` kept. Confirmed `select` (lines 109, 119, 132) and `textarea` (line 149) share `field`. Spec §3.5 inputs row amended. |
| B2 | `6d1cfde` | `web/app/globals.css:836` — transition moved from `.reveal` to `.reveal[data-reveal="in"]`; the hiding rule is byte-identical. Spec §3.4 amended. |
| B3 | `fd43fea` | `web/app/globals.css:408` (rest), `:413` (`:focus-within`), `:440` (`:hover`), `:448` (`.theme-dark …:hover`) — new `.glass-card-bezel`, each state `box-shadow: <that state's glass shadow list>, inset 0 0 0 1px oklch(var(--color-gold-soft) / 0.4)`. `web/components/ui/card.tsx:33` applies it instead of the ring; docstring `:5-8` records that `bezel` is ignored for `tone="navy"`. `web/tests/design-system.test.ts:81` adds the hook next to `glass-card-selected`. No `outline` used. |
| B4 | `b3b6d02` | `web/app/page.tsx:146`, `web/app/what-we-do/page.tsx:93`, `web/app/insights/[slug]/page.tsx:85` — all three h2s gain `heading-plain … text-foreground`. `web/app/globals.css:531-533` — selector list widened to `.heading-plain, main .heading-plain, main .theme-on-brand .heading-plain`. |
| B5 | `a5ba8fb` | `web/components/hero/hero-3d-loader.tsx:66,69` (a `blockedBy` verdict readable from listeners), `:103-106` (`onVisible` re-runs `onChange`, the existing 150 ms debounce, only when the page becomes visible and the reason was `"hidden"`), `:109` add, `:116` remove alongside the others. |
| B6 | `da6447a` | (a) `web/app/globals.css:302-306` — comment above `.accent` / `.theme-on-brand .accent` stating they apply only where the heading gradient does not (`.heading-plain` headings and body copy), and that inherited `-webkit-text-fill-color: transparent` is why. (b) `DESIGN.md:36` (Typography and layout) states an `<Accent>` word inside a gradient heading inherits the gradient and is not separately coloured. Blue not restored. |
| B7 | `eafa5cf` | `web/tests/browser/theme-contrast.spec.ts` — helper split into `paint`/`relative`/`luminance` plus a `composite` source-over, then 14 composite pairs per theme (see numbers below). Panel alpha read from `#desktop-nav-0` itself; on-brand glass read from a `.theme-on-brand` probe, so both track the real values. Existing token pairs unchanged. |
| B8 | `09a3b47` | `web/app/globals.css` — `backdrop-filter` and `-webkit-backdrop-filter` removed from `.glass-pill` and `.glass-gold` (comment at `:456`). `.glass-card` untouched at every breakpoint. `web/tests/browser/performance.spec.ts:36-100` — `scrollFrameP95` helper plus the new logged, relatively-bounded test. |
| B9 | `6c084c5` | `web/components/layout/header.tsx:71` — `transition-[background-color,box-shadow,border-color]`. `web/components/hero/hero-3d.tsx:98` — `camera.position.set(-5, 0, 22)`. Screenshot path below. Plus the section-A ledger items above. |
| B10 | `6d1cfde`, `2056948`, `da6447a` | Spec §3.4 reveal CSS → the B2 form; §3.5 inputs row → `.glass` plus `border-border-strong`; §3.3 → axe cannot arbitrate glass contrast, the composite pairs are the arbiter. Each carries a "(amended 2026-09-11: …)" note. |
| D1 | `6c084c5` | `web/app/not-found.tsx:36` — `hover:bg-on-brand/10` (tailwind-merge drops the ghost variant's `hover:bg-surface-subtle`). |
| D2 | `a5ba8fb` | `web/components/hero/hero-3d.tsx:243` — `if (!running) renderer.render(scene, camera)` after `setSize`. |
| D3 | `a5ba8fb` | `web/components/hero/hero-3d-loader.tsx:18-21` — probe context captured, then `getExtension("WEBGL_lose_context")?.loseContext()`. |
| D4 | `6c084c5` | `web/components/motion/motion-observer.tsx:23-29` (mount pass) and `:43-50` (1 s safety pass) — all `getBoundingClientRect` reads collected, then the `dataset.reveal` writes. |
| D5 | `6c084c5` | Removed `data-[scrolled=true]:[--glass-alpha-elevated:0.9]` from `header.tsx:71`; added `header[data-scrolled="true"] { --glass-alpha-elevated: 0.9 }` at `web/app/globals.css:291`, inside `@layer base` and physically above the `@supports not (backdrop-filter)` block. Base layer loses to the components-layer `@supports` rule, so the no-backdrop-filter fallback keeps 0.96 while scrolled; `header[data-scrolled="true"]` is (0,1,1) so it still beats the (0,1,0) theme declaration in normal browsers. |
| D6 | `58f909a` | `web/tests/foundations.test.ts:405` — `bg-white` → `(?:text\|bg\|border\|ring)-white`, with a comment giving the reason. Verified by hand that the new alternation matches `text-white`, `border-white/40`, `ring-white`, `bg-white` and `hover:text-white`, and does not match `off-white` or `surface-white`; `bg-off-white` still matches its own alternative. No current markup trips it. |
| D7 | `da6447a`, `fd43fea` | `DESIGN.md:36` no longer claims the sr-only h1 carries `heading-plain` (verified: `service-hero.tsx:93` is `className="sr-only"` only). `WORKLOG.md:7` — the previous `Reveal` described as a no-op wrapper (verified against `git show main:web/components/motion/reveal.tsx`: it rendered children and animated nothing). `WORKLOG.md:5` commit count/range updated to 36 commits (see note below). `card.tsx:5-8` docstring — `bezel` ignored for `tone="navy"` (landed with B3). |
| D8 | `6c084c5` | `web/app/globals.css:227` — dark `--gradient-heading-on-brand: var(--gradient-heading)`. Verified a pure no-op: the previous value was textually identical to `--gradient-heading`, so under either eager (spec) or lazy custom-property substitution both resolve the same. `tests/design-system.test.ts` token-presence and the `main .theme-on-brand h1/h2` rule assertion both still pass. |
| D9 | `6c084c5` | `web/tests/browser/hero.spec.ts:74` — `await expect(page.locator("html")).toHaveClass(/theme-dark/)`. |
| D10 | — | **Not done**, as instructed. Body-link hover conventions (`hover:text-gold` vs `hover:text-foreground`) untouched. |

### Commit count note (D7)

`git rev-list --count main..HEAD` was 35 immediately before the final docs commit; the branch state *after* this
wave is 36, which is the number recorded in `WORKLOG.md`. Because a sha cannot be known before the commit that
contains it, the range is written as `main..restyle/2026-09-10-premium-glass` rather than `main..<sha>`. The full
suite passed after that commit with no further code changes, so 36 is final.

## Section C — no contradiction

C confirms the B2 mechanism rather than contradicting it (base-class transition runs in both directions; axe
multiplies fractional opacity into the foreground). No NEEDS_CONTEXT was warranted. The fix is in the reveal CSS
only: `tests/browser/transcript.spec.ts` is byte-identical to `e5cc01a` (`git diff e5cc01a..HEAD -- web/tests/browser/transcript.spec.ts`
is empty), no reduced-motion emulation was added to it, and the sweep was not touched. Both mega-menu tests passed
inside the full 57-test run, which is the condition C says to verify under.

The final CSS, read back after the change (`web/app/globals.css:836-847`):

```css
.reveal[data-reveal="in"] {
  transition: opacity 600ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"]) {
  opacity: 0;
  transform: translateY(18px);
}
```

The hide is instantaneous: while an element lacks `data-reveal="in"` no rule gives it a transition duration, so the
1 → 0 change applies in one frame. The reveal still animates because CSS Transitions starts a transition from the
*after-change* style, which is where the transition property now lives. `design-system.test.ts`'s reveal regex
needed no change — it pins the hiding rule, which is unchanged.

## B7 — mega-menu alpha and composite-pair results

**Alpha: 0.92.** It passed on the first try; no raise was needed. `--glass-alpha-elevated` is read from
`#desktop-nav-0` at test time and asserted `>= 0.92`.

Ratios (from the full run; the light `fg-secondary` over `bg-brand` pair at 6.91 is the tightest):

| Composite | light | dark | floor |
|---|---|---|---|
| `fg-primary` on glass 0.92 over `bg-canvas` | 17.48 | 17.32 | 4.5 |
| `fg-secondary` on glass 0.92 over `bg-canvas` | 8.09 | 12.78 | 4.5 |
| `fg-primary` on glass 0.92 over `bg-brand` | 14.92 | 17.27 | 4.5 |
| `fg-secondary` on glass 0.92 over `bg-brand` | **6.91** | 12.74 | 4.5 |
| `fg-primary` on glass 0.62/0.65 over `bg-canvas` | 17.17 | 17.67 | 4.5 |
| `fg-secondary` on glass 0.62/0.65 over `bg-canvas` | 7.95 | 13.04 | 4.5 |
| `gold` on glass 0.62/0.65 over `bg-canvas` | 5.51 | 7.88 | 4.5 |
| `gold-display` on glass 0.62/0.65 over `bg-canvas` | 4.30 | 11.85 | 3 |
| `fg-primary` on glass 0.62/0.65 over `bg-subtle` | 16.43 | 16.86 | 4.5 |
| `fg-secondary` on glass 0.62/0.65 over `bg-subtle` | 7.61 | 12.44 | 4.5 |
| `gold` on glass 0.62/0.65 over `bg-subtle` | 5.27 | 7.52 | 4.5 |
| `gold-display` on glass 0.62/0.65 over `bg-subtle` | 4.12 | 11.31 | 3 |
| `fg-on-brand` on on-brand glass over `bg-brand` | 17.00 | 18.55 | 4.5 |
| `gold-on-brand` on on-brand glass over `bg-brand` | 7.29 | 7.96 | 4.5 |

Card alpha is the live `--glass-alpha` (0.62 light, 0.65 dark). `gold-display` was included at the large-text floor
of 3 because the brief's floor sentence names it and `.text-gradient-numeral` paints it on glass cards.

## B8 — performance sample

rAF timing **is** meaningful in this environment: each 2 s scripted scroll produced 95–115 frames (≈18–21 ms mean),
i.e. the frames are real and roughly vsync-paced, not a degenerate zero-interval loop. p95 intervals, full run:

| Route | 375px | ratio vs control | 1440px | ratio vs control |
|---|---|---|---|---|
| `/legal/privacy-policy/` (control) | 22.0 ms | — | 27.9 ms | — |
| `/sap-enterprise-solutions/` | 42.6 ms | 1.94x | 46.7 ms | 1.67x |
| `/partners/` | 36.8 ms | 1.67x | 44.3 ms | 1.59x |

All under the 3x bound. An earlier standalone run of the same test gave 21.9/30.7 ms control and 31.3–42.2 ms heavy
(worst 1.93x), so the numbers are stable across runs. Worst observed headroom is ~1.55x, which is the one figure
worth watching: the SAP hub at 375 is consistently the tightest pair.

## B9 — visual gate screenshot

`D:\Obsidian\In2IT EBS\in2itebs\web\test-results\b9-home-light-1440x1000.png`

1440×1000, light theme, `data-hero-3d="active"` with one canvas mounted, captured after the 900 ms canvas fade plus
2.5 s settle. (`web/test-results/` is gitignored, so the file is on disk only.) In it the knot silhouette begins at
roughly x≈660 and the hero copy column ends at roughly x≈655 — the edge no longer passes under the lead paragraph.
The "Find your platform practice" h2 is visible rendering solid (B4), and the practice tiles show six columns.

## Gates

**`npm run check`** (from `web/`) — run after every group; final run green:

```
format:check ok · eslint --max-warnings 0 ok · tsc --noEmit ok
ℹ tests 44 · pass 44 · fail 0 · skipped 0 · duration_ms 1673.7
```

**`SITE_ENV=preview npm run build`** — ok, with the chunk-budget line:

```
three.js chunk bd904a5c.44c352f9c2a53e23.js: 204447 bytes, lazy only
check-build: ok (SITE_ENV=preview, noindex=true)
```

(`npm run build` alone fails by design: `next.config.mjs` requires `SITE_ENV`. Playwright's `webServer` sets
`SITE_ENV=preview` itself, so `npx playwright test` needs no env.)

**`npx playwright test`** (full suite, one run, no re-run needed) —

```
Running 57 tests using 1 worker
…
57 passed (12.9m)
```

**57 passed / 0 failed / 0 skipped.** The two mega-menu tests are named in the run:
`tests\browser\transcript.spec.ts:44:7 › transcript mega-menu /what-we-do/ (5.8s)` and
`… › transcript mega-menu /contact/ (6.3s)`. The WebGL pause test did **not** skip —
`tests\browser\hero.spec.ts:50:5 › the page pause control pauses and resumes the scene (4.8s)` ran and passed, so
WebGL was available. `all-routes.spec.ts` (axe on every published route, both themes, 8.2 m) passed, which is the
broadest confirmation of the B2 fix. Log kept at
`…\scratchpad\full-run-1.log`. Port 3107 was free before the build and is free again now.

**Frozen content** (from the repo root) — `git diff --stat main -- web/content web/public` prints nothing.

## Self-review

Read `git diff e5cc01a..HEAD` in full. Findings:

- Every item A1–A6, B1–B10, C, D1–D9 has a hunk and a commit (table above). D10 deliberately absent.
- No change under `web/content/` or `web/public/` — the diff touches 22 files, none of them there.
- No existing test relaxed. The four test files changed only gain assertions or tighten a regex:
  `hero.spec.ts` (+1 assertion), `design-system.test.ts` (+1 required hook), `foundations.test.ts` (regex widened,
  never narrowed), `theme-contrast.spec.ts` (existing pair list byte-identical, 14 composites per theme added),
  `performance.spec.ts` (existing test untouched, new test added). Each carries a comment saying why.
- The reveal hide is instantaneous in the final CSS (read back and quoted above).
- `transcript.spec.ts` untouched.
- Spec amendments present in §3.3, §3.4 and §3.5, each with a "(amended 2026-09-11: …)" note.
- Docs updated per A6, B6, B10, D7.
- Commit subjects follow the branch's `type(scope): imperative summary` convention; both trailers on all 10.

Two things I checked because they looked risky and found sound:

- **`.glass-card-bezel` vs `.glass-card-selected`.** Both set `box-shadow` at equal specificity, and the bezel rules
  sit later in source, so a card carrying both classes would take the bezel shadow on hover/focus-within. No such
  element exists: `glass-card-selected` is used only at `rise-grow-chooser.tsx:315` on a raw `div`, never through
  `Card`. Worth knowing if `Card` ever gains a selected state.
- **JSX `//` comments inside opening tags** (`header.tsx`, twice). Valid in attribute position; typecheck, eslint,
  prettier and the production build all pass.

## Concerns

1. **A1 vs the no-backdrop-filter fallback.** `[--glass-alpha-elevated:0.92]` is a utilities-layer declaration, so in
   a browser without `backdrop-filter` it overrides the `@supports not` fallback's 0.96 down to 0.92 on the panel —
   the same class of defect D5 fixes for the header. It is not a contrast regression (0.92 is the value the composite
   pairs are verified at, and 0.96 would only be more opaque), and the brief rules A1 as "one class on the panel
   element", so I implemented it as specified rather than mirroring D5's base-layer treatment. If the controller
   prefers consistency, moving it to a base-layer `#desktop-nav-0`-scoped rule is a two-line change.
2. **`.glass-pill` still listed in the `@supports not (backdrop-filter)` block** (`globals.css:485`) although it no
   longer has a `backdrop-filter`. Pre-existing, harmless (it only raises the chip alpha in fallback browsers), and
   outside B8's stated scope, so I left it.
3. **Scroll-timing headroom.** The SAP hub at 375 sits at ~1.9x of a 3x bound in both runs I measured. Stable, but it
   is the pair most likely to flake on a contended machine. The values are logged and attached on every run, so a
   drift will be visible before it becomes a failure.
4. **`.theme-dark .glass-card-bezel:hover`** is, today, redundant: `.theme-dark .glass-card:hover` sets only
   `border-color`, so nothing outranks the (0,2,0) bezel shadow. I included it because the brief specifies mirroring
   `.glass-card-selected`'s selector set, and the comment says plainly that it restates the state at that specificity.
   It can be dropped without behaviour change if the reviewer prefers less CSS.


---

# Appendix C — Scoped re-review of the fix wave

# Scoped re-review of the final fix wave (e5cc01a..da6447a)

Reviewer: Opus, 2026-09-11. Scope: the findings list in `fix-wave-brief.md` (A1–A6, B1–B10, C, D1–D10) and the fix diff only.

## Finding verdicts

- A1 mega-menu panel alpha 0.92 — ADDRESSED (`header.tsx:142`; `theme-contrast.spec.ts` asserts the live value on `#desktop-nav-0`; tightest composite pair 6.91, no raise needed).
- A2 practice-tiles grid — ADDRESSED (`platform-practice-links.tsx:15,21`).
- A3 dark logo wall square corners — ADDRESSED (`globals.css:77,95`; hooks verified against `logo-marquee.tsx`; unlayered rules win over `.rounded-surface`).
- A4 PageHero `relative z-10` and comment — ADDRESSED (`page-hero.tsx:33,4`).
- A5 comparison-table JSDoc — ADDRESSED and accurate (`comparison-table.tsx:10-12`).
- A6 DESIGN.md / WORKLOG.md hero wording — ADDRESSED (`DESIGN.md:50`, `WORKLOG.md:7`).
- B1 form-field boundary — ADDRESSED (`demo-form.tsx:13`; selects and textarea share `field`; spec §3.5 amended).
- B2 reveal hide transition — ADDRESSED (`globals.css:836` transition on `.reveal[data-reveal="in"]`; hiding rule at `:842` has no transition; constraint-3 selector byte-identical; `design-system.test.ts:109-119` still matches; `transcript.spec.ts` byte-identical to e5cc01a; spec §3.4 amended).
- B3 Card bezel — ADDRESSED (`card.tsx:33` emits `glass-card-bezel`; `globals.css:408/413/440/448` set `box-shadow`; Tailwind v3.4.7 emits no native cascade layers, so equal specificity plus source order decides; hook at `design-system.test.ts:81`; navy note at `card.tsx:5-8`).
- B4 sub-large h2s — ADDRESSED (three h2s carry `heading-plain … text-foreground`; `globals.css:531-533` three-selector list; specificity confirmed in the compiled sheet). See side-effect below.
- B5 background-tab hero recovery — ADDRESSED (`hero-3d-loader.tsx:66,69,103-106,109,116`).
- B6 accent words inherit the gradient — ADDRESSED (`globals.css:302-312` comments; `DESIGN.md:36`; blue not restored).
- B7 composite text-on-glass pairs — ADDRESSED (14 composites per theme; arithmetic is glass over background; no pre-existing pair relaxed; on-brand glass read from a live probe).
- B8 chips without backdrop-filter, scroll sample — ADDRESSED (`globals.css:458,471`; `.glass-card:378-379` keeps blur; `performance.spec.ts:36-100`).
- B9 header transition, camera x −5 — ADDRESSED (`header.tsx:71`; `hero-3d.tsx:98`).
- B10 spec amendments — ADDRESSED (spec `:194`, `:212`, `:263`).
- D1 not-found hover — ADDRESSED (`not-found.tsx:36`; tailwind-merge drops the ghost variant's hover bg).
- D2 frame after resize when paused — ADDRESSED (`hero-3d.tsx:243`).
- D3 probe context released — ADDRESSED (`hero-3d-loader.tsx:21`).
- D4 MotionObserver reads before writes — ADDRESSED (`motion-observer.tsx:20-28,40-49`).
- **D5 scrolled header alpha vs no-backdrop-filter fallback — NOT ADDRESSED.** `header[data-scrolled="true"] { --glass-alpha-elevated: 0.9 }` at `globals.css:291` is (0,1,1) and still outranks the `@supports not (backdrop-filter)` fallback at (0,1,0); the built sheet contains zero `@layer` at-rules, so the base-layer move is a no-op. Working form: `@supports not (backdrop-filter: blur(1px)) { header[data-scrolled="true"] { --glass-alpha-elevated: 0.96 } }`.
- D6 foundations white-alias regex — ADDRESSED (`foundations.test.ts:405`).
- D7 docs corrections — ADDRESSED (`DESIGN.md:36`, `WORKLOG.md:5,7`, `card.tsx:5-8`).
- D8 dark on-brand gradient var — ADDRESSED and a true no-op (`globals.css:227`).
- D9 hero.spec.ts dark assertion — ADDRESSED (`hero.spec.ts:74`).
- D10 hover conventions — CONFIRMED NOT DONE.

## New breakage in the fix diff (all Minor)

- `globals.css:286-290` and `header.tsx:69-70` carry comments asserting a false cascade fact (same root as D5).
- B4 side-effect: `main .heading-plain` (0,1,1) outranks `.text-foreground` (0,1,0), so the companion class is inert on every `.heading-plain` inside `main`; on `insights/[slug]/page.tsx:85` the h2 inherits `fg-secondary` from its muted parent (a tested 4.5 pair, but the heading loses tonal separation). The homepage and What We Do h2s inherit from `body` and are unaffected.
- A1's utility form also lowers the no-backdrop-filter panel from 0.96 to 0.92 (as the brief specified; parked by the controller).
- `performance.spec.ts:65` hardcodes `http://127.0.0.1:3107` instead of the configured `baseURL`.

No Critical or Important new breakage. No test was relaxed or made vacuous.

## Out-of-scope observations

- `.glass-pill` is still listed in the `@supports not (backdrop-filter)` block (`globals.css:497`) though B8 removed its blur — harmless.
- The implementer's report says "four test files" and lists five; the diff agrees on five.

## Verdict

Findings remain open: D5 (Minor). Everything else addressed. The controller parked D5, the two comment fixes, the insights-heading colour and the hardcoded URL as one follow-up commit (see the ledger's breaker rulings).
