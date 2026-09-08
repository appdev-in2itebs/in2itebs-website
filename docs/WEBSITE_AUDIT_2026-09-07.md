# Website code and experience audit — 7 September 2026

## Verdict

**Not ready for production lead generation.** The build has substantial content and working routes, but the enquiry endpoint is a stub, the public test tunnel targets the wrong local app, a vulnerable framework release remains installed, and shared typography, navigation, SEO and accessibility defects affect multiple pages.

This is an audit, not an implementation pass. No website source, dependency versions, deployment configuration or running ngrok service was changed.

Priority means likely impact, not implementation cost: **P0** release blocker; **P1** major defect/high-impact gap; **P2** important improvement; **P3** polish/maintenance. Confirmed observations are distinguished from risks and business decisions.

## What was checked

- Next.js App Router source, shared components, CSS/theme configuration, content/navigation data, lead handler, metadata, sitemap/robots/redirects, package scripts and relevant planning/source documents.
- Existing production artifact (BUILD_ID `nBVTQ6FZEuMp4KFvJYEYc`, built 3 September), served temporarily on **127.0.0.1:3107**, isolated from the application on port 3000. No files under app/components/content/lib were newer than that artifact in the timestamp comparison; this is not a cryptographic build attestation.
- HTTP crawl: **61 sitemap URLs plus thank-you = 62 pages**, all returned 200; each had one H1. Extracted internal links had no HTTP errors. **48 distinct referenced local image assets** returned successfully. One rendered fragment link was broken.
- Browser inspection at **1280×900, 1100×850 and 375×812**, including desktop dropdown, Escape, mobile menu focus, responsive scroll lock, comparison table and theme samples.
- `npm run typecheck`: passed. `npm run lint`: failed to run checks, opening the ESLint setup prompt and exiting 1. `npm audit --json`: five affected package entries — one critical, three high, one low.
- Source-document comparison includes the Markdown content/design plans and preserved Oracle/Microsoft research. This is **not** a cell-by-cell contractual reconciliation of the Excel scope matrix.
- No destructive security testing, real enquiry submission, dependency installation, fresh production rebuild, comprehensive screen-reader audit or field Core Web Vitals measurement.

Public-site limits: the ngrok agent API confirms its upstream is `http://localhost:3000`; that port redirects to `/login` and serves **In2CLM**. An external request to the ngrok URL returned an intermediary response, not independently verified website content. The live company domain timed out through web retrieval and failed TLS connection through the direct HTTP client. I did **not** bypass TLS validation. The transcript's old/new-design flash remains unconfirmed.

## Prioritized findings

### 01 — P0 · Real enquiries receive a false success response

**Evidence:** [web/app/api/lead/route.ts:7](<D:/Obsidian/In2IT EBS/in2itebs/web/app/api/lead/route.ts:7>); [web/components/forms/demo-form.tsx:32](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:32>); [web/app/thank-you/page.tsx:20](<D:/Obsidian/In2IT EBS/in2itebs/web/app/thank-you/page.tsx:20>).

**Problem:** The handler explicitly leaves email/CRM wiring as a TODO, logs selected fields and returns `{ok:true}`. It neither sends nor durably stores the enquiry. The message is not even included in the log. The browser then claims the request was routed and promises follow-up.

**Impact:** Lost leads and false assurance at the site's primary conversion point. A visually successful form is not a working funnel.

**Fix:** Connect an approved inbox/CRM through a durable queue or persistence layer, preserve the full message and context, and acknowledge success only after confirmed acceptance. Add delivery failure/retry monitoring and an end-to-end test proving receipt. Until then, identify the form as a prototype and offer a clear email route.

### 02 — P1 · The public test tunnel targets another application

**Evidence:** Local `/api/tunnels` on port 4040 reports the supplied ngrok domain forwarding to `localhost:3000`; port 3000 currently resolves to In2CLM's login.

**Problem:** The website's shared test URL is coupled to a reusable port, not a verified website process.

**Impact:** Reviewers can assess the wrong build; an unrelated app is behind an existing public tunnel. Its authentication strength and exposed content were not audited.

**Fix:** The owner should stop or repoint that tunnel, assign a dedicated website port, and verify app identity before sharing. Use a stable protected staging deployment with release identifiers. No tunnel or unrelated service was changed during this audit.

### 03 — P1 · Vulnerable dependencies remain installed

**Evidence:** [web/package.json:15](<D:/Obsidian/In2IT EBS/in2itebs/web/package.json:15>) and lockfile; npm advisory scan.

**Problem:** Next.js is pinned to **14.2.5**. The scan reports affected entries for **next (critical), browserslist (high), nanoid (high), postcss (high), postcss-selector-parser (low)**.

**Impact:** There are relevant server availability risks. This is an App Router application; the vendor documents a denial-of-service issue affecting that architecture. The critical middleware-bypass advisory does **not** prove an exploitable authentication bypass here: no app middleware-based authorization was found. Build-tool advisories also require their own reachability assessment.

**Fix:** Upgrade to a currently supported, patched release, refresh transitive dependencies, then rebuild and regression-test. Do not blindly run force-fix or assume the audit's suggested 14.2.35 resolves all newer advisories. Re-run both production-only and full audits.

Primary reference: [Next.js security advisory](https://nextjs.org/blog/security-update-2025-12-11). No exploit requests were sent.

### 04 — P1 · Every checked route canonicalizes to the homepage

**Evidence:** [web/app/layout.tsx:33](<D:/Obsidian/In2IT EBS/in2itebs/web/app/layout.tsx:33>); HTTP crawl verified **62/62** canonical URLs as `https://in2itebs.com/`.

**Problem:** The root canonical is inherited by service, industry, case-study and article pages.

**Impact:** Search engines receive contradictory signals about which URLs should be indexed. This can undermine the separate practice pages that should attract qualified searches; actual ranking loss was not measured.

**Fix:** Generate a self-referencing canonical per indexable route and slug, consistently using trailing slashes. Test every sitemap URL against its canonical in CI.

### 05 — P1 · Class merging silently removes heading sizes

**Evidence:** [web/components/ui/typography.tsx:29](<D:/Obsidian/In2IT EBS/in2itebs/web/components/ui/typography.tsx:29>), [web/lib/utils.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/lib/utils.ts>), [web/tailwind.config.ts:56](<D:/Obsidian/In2IT EBS/in2itebs/web/tailwind.config.ts:56>).

**Problem:** Default `tailwind-merge` does not recognize the custom font-size utilities as configured here. Reproduction: `twMerge("font-serif font-bold text-h2", "text-foreground")` produces `font-serif font-bold text-foreground`. The same happens with `text-display` and `text-h3` when paired with a colour.

**Impact:** On What We Do, all four inspected shared section headings computed to **16px**, despite the larger fluid scale defined in Tailwind. This is a concrete technical cause of the inconsistent, unpolished visual hierarchy—not merely a taste disagreement. Other pages using Headline/SectionHeading inherit it.

**Fix:** Extend the merge configuration to classify custom sizes correctly, or separate size application from colour merging. Test class output and computed heading sizes at mobile and desktop widths.

### 06 — P1 · What We Do mega-menu clips outside the viewport

**Evidence:** [web/components/layout/header.tsx:75](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:75>).

**Problem:** A 768px panel is centered on the individual nav item, rather than positioned within the header/viewport.

**Impact:** Confirmed at 1280px: left edge **−31.03px**, right edge **736.97px**. Text and navigation destinations are cut off.

**Fix:** Anchor the panel to a full-width, positioned header container and constrain it to safe inline gutters, or use collision-aware positioning. Validate 1024, 1100, 1280, 1440px and browser zoom.

### 07 — P1 · Desktop dropdown has no proper disclosure/dismissal state

**Evidence:** [web/components/layout/header.tsx:75](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:75>), [web/components/layout/header.tsx:107](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:107>) and NavLink in that file.

**Problem:** The menu is controlled solely by hover/focus-within; its trigger is a navigation link without expanded-state semantics. **Escape left the open menu unchanged** during testing.

**Impact:** Keyboard users cannot dismiss obscuring content while retaining focus, and activating the apparent disclosure also navigates. This is relevant to WCAG **1.4.13 Content on Hover or Focus**; using CSS focus-within alone does not satisfy dismissal.

**Fix:** Separate hub navigation from a labelled disclosure button; manage aria-expanded/aria-controls, Escape and outside dismissal, with a reliable hover path. Ordinary website navigation does not need application-menu ARIA roles.

### 08 — P1 · Mobile menu allows focus behind it and leaves scroll locked on resize

**Evidence:** [web/components/layout/header.tsx:36](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:36>), [web/components/layout/header.tsx:153](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:153>).

**Problem:** Body overflow is locked while open, but background content remains focusable. Tabbing from the last region control moved to the underlying hero CTA while the menu stayed open. Escape did not close it. Resizing to 1100px hid the mobile panel but left `body.style.overflow = "hidden"`.

**Impact:** Hidden/background focus confuses keyboard navigation; resizing or changing orientation can leave the page unable to scroll.

**Fix:** Either implement a modal drawer with inert background, focus containment/restoration and Escape, or a genuinely nonmodal in-flow disclosure without modal scroll locking. Reset open state and restore previous overflow on breakpoint changes.

### 09 — P1 · Theme migration causes real contrast failures

**Evidence:** [web/app/globals.css:33](<D:/Obsidian/In2IT EBS/in2itebs/web/app/globals.css:33>), [web/app/globals.css:70](<D:/Obsidian/In2IT EBS/in2itebs/web/app/globals.css:70>), [web/components/ui/card.tsx:19](<D:/Obsidian/In2IT EBS/in2itebs/web/components/ui/card.tsx:19>), [web/app/thank-you/page.tsx:13](<D:/Obsidian/In2IT EBS/in2itebs/web/app/thank-you/page.tsx:13>), [web/components/layout/header.tsx:16](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:16>).

**Problem:** Legacy `navy` is an alias for foreground and is still used as a background. In dark mode it becomes pale; `text-blue-light` also becomes pale. On thank-you, measured computed colours yield approximately **1.71:1** for the paragraph against its background. In light mode, the shared header uses muted dark text over the navy thank-you hero (**2.17:1**), because the dark-hero route list is empty; the highlighted heading word is about **2.38:1**.

**Impact:** Meaningful text fails the AA text contrast threshold. The same token misuse occurs in shared navy cards and merits a full component sweep.

**Fix:** Replace legacy colour names with role-specific pairs: surface/foreground, brand/on-brand, action/on-action; use an explicit inverse-surface contract. Give the header an appropriate surface or inverse state on dark heroes. Test normal, hover, focus, disabled and translucent compositions in both themes.

Core semantic primary/surface samples themselves are strong: light **17.55:1**, dark **14.80:1**. Passing those pairs does not establish site-wide compliance. Ratios above use OKLCH-to-sRGB relative luminance, not an assertion about logo contrast (logos are exempt).

### 10 — P1 · Mobile comparison table hides part of the GROW column

**Evidence:** [web/components/sections/comparison-table.tsx:22](<D:/Obsidian/In2IT EBS/in2itebs/web/components/sections/comparison-table.tsx:22>).

**Problem:** The table sits inside `overflow-hidden` without an accessible scrolling alternative.

**Impact:** At a 375px viewport its width was **385.42px inside a 320px wrapper**. Content extends beyond the wrapper and is clipped. A data table may legitimately need horizontal scrolling, but must not silently cut off information.

**Fix:** Provide a labelled, keyboard-scrollable horizontal container, or a mobile comparison layout retaining row/column relationships. Test at 320px and 400% zoom; preserve table header associations.

### 11 — P1 · Oracle/Microsoft are presented as future capabilities, contrary to the stated business need

**Evidence:** [web/app/platform-services/page.tsx:181](<D:/Obsidian/In2IT EBS/in2itebs/web/app/platform-services/page.tsx:181>), [web/content/nav.ts:61](<D:/Obsidian/In2IT EBS/in2itebs/web/content/nav.ts:61>), [web/content/redirects.mjs:50](<D:/Obsidian/In2IT EBS/in2itebs/web/content/redirects.mjs:50>), [web/components/forms/demo-form.tsx:8](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:8>).

**Problem:** Oracle and Microsoft do not have first-class practice pages or nav entries. The hub explicitly labels them future expansion. Legacy Oracle/Dynamics/Office URLs redirect to the generic hub. The current interest selector omits them.

**Impact:** Buyers looking for existing Oracle/Microsoft delivery capability can reasonably conclude the company does not offer it. Legacy search intent is poorly served.

**Fix:** Resolve the now-explicit scope discrepancy with the business owner, then add approved practice pages, named navigation/hub coverage, contact interests and appropriate redirects. Surface SuccessFactors explicitly in discovery without unnecessarily duplicating its existing SAP page. Validate current partner status before reusing historic “Gold” claims.

This was **not simply content absent from the folder**: the source-of-truth notes Azure, Dynamics, Oracle EBS/HCM and integrations; preserved Microsoft/Oracle service pages exist. However, the content plan deliberately placed Oracle/Microsoft in a later phase. See transcript analysis below.

### 12 — P1 · Insights pages are unfinished placeholders published as articles

**Evidence:** [web/app/insights/[slug]/page.tsx:71](<D:/Obsidian/In2IT EBS/in2itebs/web/app/insights/[slug]/page.tsx:71>), [web/content/insights.ts:3](<D:/Obsidian/In2IT EBS/in2itebs/web/content/insights.ts:3>).

**Problem:** Six article routes show a common “full article is being prepared” body and an internal editorial migration note. Dates are marked in source as needing refresh.

**Impact:** People clicking an insight get no real article. Repeated placeholder content undermines expertise and creates thin indexable pages.

**Fix:** Port and review actual bodies, authors and verified publication dates. Until ready, remove unfinished articles from public recommendations and the sitemap, or label an honest preview and noindex it.

### 13 — P1 · Continuous client motion lacks a persistent accessible pause

**Evidence:** [web/components/sections/logo-marquee.tsx:15](<D:/Obsidian/In2IT EBS/in2itebs/web/components/sections/logo-marquee.tsx:15>), [web/app/page.tsx:254](<D:/Obsidian/In2IT EBS/in2itebs/web/app/page.tsx:254>).

**Problem:** The 52-second homepage logo loop runs indefinitely. It pauses only while a mouse hovers. There is no pause control usable independently of pointer position.

**Impact:** Moving information alongside page content needs a usable pause/stop/hide mechanism; hover alone is not sufficient. Reduced-motion support is useful but does not replace an on-page control for everyone. Relevant to WCAG **2.2.2**.

**Fix:** Add a clearly labelled pause/play button and keep the paused state while users continue reading. For reduced motion, show a wrapping or manually scrollable static list: currently stopping the animation leaves offscreen logos inside an overflow-hidden track.

Reference: [W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

### 14 — P1 · Essential content is hidden until animation JavaScript succeeds

**Evidence:** [web/components/motion/reveal.tsx:25](<D:/Obsidian/In2IT EBS/in2itebs/web/components/motion/reveal.tsx:25>).

**Problem:** Reveal server-renders opacity zero, including its reduced-motion branch. Stagger items also start hidden. The crawl found **969 opacity-zero occurrences** across the 62 HTML responses; these are occurrences, not 969 unique visible defects.

**Impact:** With blocked/failed/delayed hydration, substantial text and CTAs remain invisible. Reduced-motion handling still introduces delayed reveals in this wrapper.

**Fix:** Render essential content visible by default and progressively enhance motion after initialization, with a no-script/failure-safe strategy. Reduced-motion should render final visible state immediately. Test missing JS chunks and slow hydration.

### 15 — P1 · Lead endpoint is insufficiently validated and protected

**Evidence:** [web/app/api/lead/route.ts:10](<D:/Obsidian/In2IT EBS/in2itebs/web/app/api/lead/route.ts:10>).

**Problem:** Only truthiness is checked for name/email/company. There is no schema validation of types, length, email, allowed region or interest; no application-level request-size/rate limit; the only spam check is a trivial honeypot. Personal contact fields are written to ordinary logs.

**Impact:** Invalid or abusive requests can pollute logs and, once delivery is connected, overwhelm the lead channel. Retention/access to these logs becomes a privacy concern.

**Fix:** Use server-side schema validation (Zod is already installed), trim/cap fields, enforce allowed values and request size, rate-limit at a trusted boundary, add accessible anti-abuse measures as warranted, and log request IDs/status rather than unnecessary PII. No authentication is required merely because this is an intentionally public enquiry form.

### 16 — P2 · The persistent contact CTA disappears at common widths

**Evidence:** [web/components/layout/header.tsx:130](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:130>).

**Problem:** CTA visibility is `xl` only (1280px+), while desktop nav begins at 1024px. At **1100px** the CTA computes to display none. Below 1024px it is inside the closed mobile menu.

**Impact:** Persistent contact is absent across a substantial laptop/tablet range, even though page-body CTAs exist.

**Fix:** Reserve space for a short “Contact” button at every width, collapsing lower-priority navigation earlier. Phone/email need not both occupy the header if a clear persistent contact path is retained.

### 17 — P2 · Contact flow loses the context of the buyer's action

**Evidence:** [web/components/forms/demo-form.tsx:8](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:8>), [web/components/forms/demo-form.tsx:74](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:74>), [web/components/interactive/rise-grow-chooser.tsx:434](<D:/Obsidian/In2IT EBS/in2itebs/web/components/interactive/rise-grow-chooser.tsx:434>).

**Problem:** Named offers such as the two-week Pathway Assessment all lead to generic /contact/. Chooser answers/verdict are not passed forward. The form defaults interest to SAP and only offers SAP, Salesforce, Workday and ADMS. The submit button says “Book a 30-minute workshop”, but no booking/calendar is performed.

**Impact:** Visitors must repeat their needs; advisory/data/AI buyers have no accurate category; the expected offer changes mid-flow.

**Fix:** Pass an approved offer ID and optional assessment summary, prefill meaningful choices, include the full service taxonomy plus “Not sure”, and use “Request a workshop” unless a time is actually booked. Show reviewable context before submission; avoid personal data in URLs.

### 18 — P2 · Region selection is cosmetic and inconsistent with the form

**Evidence:** [web/components/layout/region-switcher.tsx:16](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/region-switcher.tsx:16>), [web/components/forms/demo-form.tsx:62](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:62>).

**Problem:** The region switcher only stores its own label. No other app consumer of its storage key was found; it does not change contact routing/content, and the contact form independently defaults to India.

**Impact:** A Kenya/South Africa/Middle East selection implies a regional experience that is not delivered.

**Fix:** Either make it an explicitly labelled contact preference shared by the form and regional contacts, or remove it until functional. Guard storage access against unavailable/blocked localStorage.

### 19 — P2 · Custom region listbox has incomplete accessible behaviour

**Evidence:** [web/components/layout/region-switcher.tsx:41](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/region-switcher.tsx:41>).

**Problem:** The popup has role=listbox without its own accessible name, and lacks expected arrow-key, Escape and focus restoration behaviour. Every option is implemented as a button.

**Impact:** Screen-reader and keyboard expectations for a listbox do not match its interaction model. Tab/Enter still allows selection, so this is not a claim that the entire control is keyboard-inoperable.

**Fix:** Prefer a labelled native select; otherwise implement the complete selected-option focus/keyboard pattern and associate popup and trigger.

### 20 — P2 · Secondary form feedback and privacy context need completion

**Evidence:** [web/components/forms/demo-form.tsx:26](<D:/Obsidian/In2IT EBS/in2itebs/web/components/forms/demo-form.tsx:26>).

**Problem:** No request timeout/cancel exists; a stalled fetch can leave the disabled “Sending…” state indefinitely. Required fields have no visible required cue. The textarea is non-resizable. The form does not link the applicable privacy notice at the point of collection.

**Impact:** People lack a recovery path and clear expectations about required information and its handling.

**Fix:** Add a bounded timeout and retry preserving entered data, explicit required/optional labels, a resizable textarea, and a short privacy-notice link. Keep the existing error alert and native label/required associations. A mandatory marketing-consent checkbox should not be invented without an agreed lawful purpose.

### 21 — P2 · Case-study filtering does not announce updated results

**Evidence:** [web/components/sections/case-study-grid.tsx:48](<D:/Obsidian/In2IT EBS/in2itebs/web/components/sections/case-study-grid.tsx:48>).

**Problem:** Filtering replaces the grid without an announced count/status; the empty message is not a live status and provides no direct reset.

**Impact:** Nonvisual users may not know what changed; users can get stuck in an unproductive filter combination.

**Fix:** Keep focus on the active filter, announce a concise result count through a polite status region, and provide “Clear filters” in empty states. Preserve aria-pressed, which is already present.

### 22 — P2 · Theme choice resets on full navigation/reload

**Evidence:** [web/components/layout/theme-toggle.tsx:8](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/theme-toggle.tsx:8>), [web/app/layout.tsx:38](<D:/Obsidian/In2IT EBS/in2itebs/web/app/layout.tsx:38>).

**Problem:** The root defaults correctly to light without JavaScript, but the choice exists only in component/DOM state. A full document navigation resets it; this occurred during testing.

**Impact:** Inconsistent comfort and appearance across visits. This is a UX gap, not inherently a WCAG failure.

**Fix:** Persist an explicit preference, ideally in a server-readable cookie so the root class is correct on the first response. Keep optional system preference separate from explicit light/dark selection; define a theme registry for future themes.

### 23 — P2 · Partner credibility is weak on the homepage, not absent site-wide

**Evidence:** [web/app/page.tsx:204](<D:/Obsidian/In2IT EBS/in2itebs/web/app/page.tsx:204>), [web/app/page.tsx:254](<D:/Obsidian/In2IT EBS/in2itebs/web/app/page.tsx:254>), [web/app/partners/page.tsx](<D:/Obsidian/In2IT EBS/in2itebs/web/app/partners/page.tsx>), [web/content/partner-ecosystem.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/content/partner-ecosystem.ts>).

**Problem:** Homepage trust presentation is SAP badge/proof plus customer logos, without a clear multi-platform partner band or obvious Partners route in its main narrative. A full Partners page already exists, and the What We Do alliance strip renders logos.

**Impact:** A homepage-only visitor can miss the breadth of the ecosystem.

**Fix:** Add a restrained, static or controllably animated band of currently approved partner marks and a “Partners & ecosystem” link. Separate “clients”, “certified partners” and “technologies we deliver”; do not imply every integration vendor is a formal partnership.

### 24 — P2 · Service taxonomy is inconsistent and hides useful routes

**Evidence:** [web/content/nav.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/content/nav.ts>), [web/app/what-we-do/page.tsx:106](<D:/Obsidian/In2IT EBS/in2itebs/web/app/what-we-do/page.tsx:106>), [web/components/layout/header.tsx:77](<D:/Obsidian/In2IT EBS/in2itebs/web/components/layout/header.tsx:77>).

**Problem:** The hub says “Three pillars” but renders four cards, including Delivery Excellence. It also introduces three engagement tiers with different labels. Nav data has practice-level children, but desktop and mobile render only pillar-level entries. Two delivery fragments in nav data (#fastforward and #ams-transition) do not match page IDs; the homepage FastForward link is a confirmed rendered broken anchor.

**Impact:** Buyers have to decode multiple structures and click through generic hubs to reach familiar technologies; the accelerator CTA fails to land where promised.

**Fix:** Distinguish three practices plus one shared delivery layer consistently, or choose one four-part structure. Expose high-intent practice links in the menu and use centralized, tested section IDs.

### 25 — P2 · Social/search metadata and preview isolation are unfinished

**Evidence:** [web/app/layout.tsx:24](<D:/Obsidian/In2IT EBS/in2itebs/web/app/layout.tsx:24>), [web/app/robots.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/app/robots.ts>), [web/app/sitemap.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/app/sitemap.ts>), [web/app/thank-you/page.tsx:6](<D:/Obsidian/In2IT EBS/in2itebs/web/app/thank-you/page.tsx:6>).

**Problem:** Root Open Graph URL/title/description are generic and inherited; no social image is configured despite summary_large_image. Preview robots allow all crawlers with production identity, and thank-you has no noindex. Sitemap lastModified is generated from the build date for every page, not actual content changes.

**Impact:** Weak/misleading shared-link previews, noisy search signals and accidental indexing of an unfinished preview. Canonical tags do not secure a preview.

**Fix:** Generate route-specific Open Graph data/images, noindex utility pages, protect previews with access control and environment-specific X-Robots-Tag, and use real content modification timestamps or omit them.

### 26 — P2 · No implemented conversion measurement or delivery observability

**Evidence:** [docs/ANALYTICS_AND_CONVERSION.md](<D:/Obsidian/In2IT EBS/in2itebs/docs/ANALYTICS_AND_CONVERSION.md>); source scan found no GA/GTM/dataLayer integration or equivalent conversion events in app/components/lib.

**Problem:** There is no usable event trail for CTA clicks, successful accepted leads, form errors, assessment completion or practice interest; delivery monitoring is also absent.

**Impact:** Engagement changes cannot be tied reliably to enquiries or diagnosed when the funnel fails.

**Fix:** Agree an event taxonomy and privacy approach, record accepted-lead success server-side, and implement consent-appropriate analytics without sending message/email fields into analytics. Add availability and delivery-failure alerts. This absence is not itself evidence of unlawful tracking; no tracker was found.

### 27 — P2 · Careers exists but the application journey is incomplete

**Evidence:** [web/app/careers/page.tsx:94](<D:/Obsidian/In2IT EBS/in2itebs/web/app/careers/page.tsx:94>), [web/content/nav.ts](<D:/Obsidian/In2IT EBS/in2itebs/web/content/nav.ts>).

**Problem:** “Open roles” is a coming-soon message; the fallback asks candidates to send CVs to the general sales mailbox. Careers is in the About dropdown and footer, not only the footer.

**Impact:** Candidate intent is poorly served and CVs can arrive in an inappropriate operational queue.

**Fix:** Link an approved ATS/jobs board or show an honest current no-openings state with a monitored recruitment contact and privacy guidance. Decide top-level placement based on recruiting priority; adding it to the header is a business choice, not a universal UX rule.

### 28 — P2 · Regression and release controls are missing

**Evidence:** [web/package.json:5](<D:/Obsidian/In2IT EBS/in2itebs/web/package.json:5>), [docs/DEPLOYMENT_RUNBOOK.md](<D:/Obsidian/In2IT EBS/in2itebs/docs/DEPLOYMENT_RUNBOOK.md>); repository inspection.

**Problem:** No configured lint execution or automated functional/a11y/route regression suite was found. The workspace is not under Git. The deployment runbook remains “Not Started”, with hosting, rollback and cutover fields unfilled.

**Impact:** UI changes can silently break headings, menus or theming; reliable comparisons and rollback are difficult. The port/tunnel mismatch illustrates why release identity checks matter.

**Fix:** Establish version control with appropriate ignores and a protected remote under owner authority, working lint/typecheck/build checks, smoke/keyboard/theme/route tests, a documented deployment target, release ID, rollback procedure and owner. Do not initialize/push a repository or publish anything without the relevant authorization.

### 29 — P2 · Design system migration is incomplete across routes

**Evidence:** [web/tailwind.config.ts:72](<D:/Obsidian/In2IT EBS/in2itebs/web/tailwind.config.ts:72>), [web/app/globals.css:42](<D:/Obsidian/In2IT EBS/in2itebs/web/app/globals.css:42>), [web/components/ui/card.tsx](<D:/Obsidian/In2IT EBS/in2itebs/web/components/ui/card.tsx>), [web/components/sections/page-hero.tsx](<D:/Obsidian/In2IT EBS/in2itebs/web/components/sections/page-hero.tsx>), [web/app/page.tsx:99](<D:/Obsidian/In2IT EBS/in2itebs/web/app/page.tsx:99>).

**Problem:** New small semantic radii coexist with legacy 20px/28px cards; the homepage uses bespoke large editorial headings, while shared inner pages use a different template and currently broken Headline sizing. A legacy brand-surface transform card remains amid the newer light-tint homepage treatment.

**Impact:** The experience changes visual language between pages and components. This is distinct from the functional heading-size bug in finding 05.

**Fix:** After fixing merge/token defects, define a small set of approved section/card/hero variants and migrate routes deliberately. Review typography, whitespace, icon scale and contrast together rather than appending more overrides or animations.

### 30 — P2 · Homepage animation/performance budget is undefined

**Evidence:** [web/app/globals.css:223](<D:/Obsidian/In2IT EBS/in2itebs/web/app/globals.css:223>) onward, [web/app/page.tsx](<D:/Obsidian/In2IT EBS/in2itebs/web/app/page.tsx>), [web/components/motion/reveal.tsx](<D:/Obsidian/In2IT EBS/in2itebs/web/components/motion/reveal.tsx>).

**Problem:** Many simultaneous infinite orbit, float, scan, halo, status, rail and stage animations are present; several animate shadows/strokes rather than only transforms. The homepage HTML was about **210,673 uncompressed bytes** including Next payloads. No field/Lighthouse evidence was available to show whether performance targets are met.

**Impact:** This is a performance risk and visual-attention concern, not a measured Core Web Vitals failure. Decorative movement can compete with service comprehension.

**Fix:** Establish a motion hierarchy and budgets; pause offscreen/nonessential work, make reduced-motion fully static, and profile representative lower-powered mobile devices before retaining costly effects. Measure LCP/INP/CLS and compressed transfer sizes; do not equate HTML size with total load time.

### 31 — P3 · Documentation and approval records contradict the current build

**Evidence:** [README.md](<D:/Obsidian/In2IT EBS/in2itebs/README.md>), [web/DESIGN.md](<D:/Obsidian/In2IT EBS/in2itebs/web/DESIGN.md>), [docs/LEGAL_REVIEW.md](<D:/Obsidian/In2IT EBS/in2itebs/docs/LEGAL_REVIEW.md>), [docs/OPEN_QUESTIONS.md](<D:/Obsidian/In2IT EBS/in2itebs/docs/OPEN_QUESTIONS.md>), [docs/plans/In2IT-EBS-Content-Plan.md:357](<D:/Obsidian/In2IT EBS/in2itebs/docs/plans/In2IT-EBS-Content-Plan.md:357>).

**Problem:** Older records describe the pre-build stage, serif design, resolved matters as pending, and NDA-only case studies. The newer content plan explicitly supersedes the NDA restriction for named studies, matching the new implementation. Some approved “10+ years” copy still appears as “a decade”.

**Impact:** Reviewers can incorrectly diagnose omissions or disclosure violations from stale records. Developers lack a single current acceptance baseline.

**Fix:** Mark superseded documents, maintain a dated decision/change log and per-content publication approvals, update design/build/runbook instructions and reconcile metric wording. Do not remove approved named case studies solely because an older document says NDA-only.

## Transcript: what is accurate and what needs correction

| Claim | Audit verdict | Appropriate response |
|---|---|---|
| Static homepage lost the old carousel | **No carousel is implemented, but the homepage is not motionless:** CSS animation and the client ribbon exist. A carousel is a design decision, not an automatic improvement. | Agree one deliberate hero objective and acceptance criteria. A strong single hero can work; if slides return, provide manual controls, pause and reduced-motion behaviour. Do not restore landing-page customer case studies against the owner's earlier direction. |
| No header contact CTA | **Partly incorrect:** “Start a conversation” exists at 1280px+, but disappears at 1024–1279px and is menu-hidden on mobile. | Developer is right that it exists; reviewer is right that contact prominence is inconsistent. Fix the breakpoints. |
| Oracle/Microsoft disappeared | **Business gap confirmed; literal absence claim is false.** They are explicitly labelled future expansion; Azure appears in alliances and partner content. | The documents did include these names and historic service pages. More importantly, the content plan deliberately deferred them. Resolve the scope decision, then represent the active practices accurately. |
| No Partners page/no alliance logos | **Incorrect for the current build.** /partners/ exists, About and footer link to it, and What We Do shows six alliance logos. | Do not commission a duplicate Partners page. Improve homepage exposure and verify approved partner marks/status. |
| Careers is footer-only | **Incorrect:** also under About. Not top-level is true. The jobs/application journey is unfinished. | Fix the actual candidate journey; choose header prominence consciously. |
| What We Do dropdown clips | **Confirmed:** 31px off the left edge at 1280px; additional Escape/focus defects found. | Treat as a shared-component regression, with responsive and keyboard acceptance tests. |
| Live site flashes then redirects to old design | **Not verified.** Live-domain retrieval failed; no production DNS/CDN/redirect chain was available. Current ngrok is pointed at another application. | First establish exactly which app/build each URL serves. Then inspect DNS/CDN/service-worker/cache/client-routing behaviour with a captured network trace. A flash is not proof of caching. |
| Serif/italic/navy praise describes the current design | **Stale:** current display and body typography use IBM Plex Sans and accents are non-italic. | Review the current identified build, not screenshots or recollections of an earlier iteration. |

### Source evidence for the Oracle/Microsoft disagreement

- [docs/CONTENT_SOURCE_OF_TRUTH.md:59](<D:/Obsidian/In2IT EBS/in2itebs/docs/CONTENT_SOURCE_OF_TRUTH.md:59>): Microsoft Azure alliance.
- [docs/CONTENT_SOURCE_OF_TRUTH.md:150](<D:/Obsidian/In2IT EBS/in2itebs/docs/CONTENT_SOURCE_OF_TRUTH.md:150>): Oracle EBS, Dynamics; next line includes Oracle HCM.
- [docs/CONTENT_SOURCE_OF_TRUTH.md:317](<D:/Obsidian/In2IT EBS/in2itebs/docs/CONTENT_SOURCE_OF_TRUTH.md:317>): Oracle Suite, Microsoft 365, AWS/Azure in packaged integration.
- [scraped/services/oracle.md:5](<D:/Obsidian/In2IT EBS/in2itebs/scraped/services/oracle.md:5>) and [scraped/services/microsoft.md:5](<D:/Obsidian/In2IT EBS/in2itebs/scraped/services/microsoft.md:5>): dedicated old-site practices, not merely incidental names.
- [docs/plans/In2IT-EBS-Content-Plan.md:127](<D:/Obsidian/In2IT EBS/in2itebs/docs/plans/In2IT-EBS-Content-Plan.md:127>) and [docs/plans/In2IT-EBS-Content-Plan.md:204](<D:/Obsidian/In2IT EBS/in2itebs/docs/plans/In2IT-EBS-Content-Plan.md:204>): expressly “coming later”.
- [web/app/platform-services/page.tsx:181](<D:/Obsidian/In2IT EBS/in2itebs/web/app/platform-services/page.tsx:181>): that deferral became public-facing future-expansion copy.

**Conclusion:** “Not in the documents” is too broad and inaccurate. “The agreed new content plan deferred dedicated practice pages” is supported. Historic scraped claims still need current approval before publication.

## Positive foundations and false positives avoided

- The contact fields have actual associated labels, native required validation, a busy state and an error alert. The central failure is delivery, not total absence of form feedback.
- A real semantic root-class theme system exists; its default renders without JavaScript. Incomplete migration, not lack of tokens, causes the cited contrast defects.
- A skip link, reduced-motion CSS, one H1 per checked page, static route generation, Next image use in key media, dynamic 404 handling in page code, and partner/client content inventories are present.
- Logo contrast is exempt from WCAG text contrast requirements. Do not fail branded logos simply because they are pale.
- StoriesCarousel, IndustriesShowcase and LeadershipScroller were found as unreferenced components; their potential defects were **not counted as reachable site failures**.
- The later content plan expressly supports public named case studies. Earlier NDA-only notes are not sufficient to allege an unauthorized disclosure.
- No evidence establishes a production caching fault, a compromised server, an exploitable middleware auth bypass, or a comprehensive WCAG AA pass.

## Suggested remediation sequence

1. **Protect the review environment and restore real conversion:** resolve tunnel target, upgrade vulnerable runtime, implement reliable lead acceptance/delivery and validation.
2. **Repair shared foundations:** custom class merging, semantic/inverse theme pairing, desktop/mobile navigation, mobile table, canonical metadata.
3. **Resolve content/offer scope:** active Oracle/Microsoft practices, complete or withhold Insights, align CTA context and form taxonomy, improve partner/recruitment discovery.
4. **Finish accessibility and interaction states:** controllable motion, visible-first SSR, focus recovery, region selection, filter announcements, form timeouts.
5. **Prove release readiness:** regression suite, current approval/requirements baseline, protected staging, performance testing, consent-appropriate analytics and rollback rehearsal.

Release acceptance should include a synthetic enquiry visibly received in the intended destination; menu/keyboarding at responsive breakpoints; no inaccessible clipped content; tested contrast in both modes; correct canonicals for every sitemap URL; no placeholder articles; and a verified app/release identity on the shared preview URL.

## Reproducing the read-only route check

Run the existing website on an unused loopback-only port, then:

```powershell
node docs/audits/check-local-site.mjs http://127.0.0.1:3107
```

Checker: [docs/audits/check-local-site.mjs](<D:/Obsidian/In2IT EBS/in2itebs/docs/audits/check-local-site.mjs>). It makes GET/HEAD requests only to a loopback host. Its regex-based link/image inventory does not replace full HTML validation, JavaScript-state crawling or browser accessibility tests.

**Scope limit:** These are the issues established by this audit, not a guarantee that no others exist. Production infrastructure, every external destination, all device/assistive-technology combinations, complete content factual verification and the Excel scope matrix require separate verification.

