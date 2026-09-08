# Technical Audit (devtools-level findings)

Source pages inspected: `/` (homepage), plus selected service pages via curl. Captured 2026-05-28.

## 1. Hosting / Network

| Property | Value |
|---|---|
| Server / WAF | **Sucuri CloudProxy** (`Server: Sucuri/Cloudproxy`, `X-Sucuri-ID: 18012`, `X-Sucuri-Cache: HIT`) |
| HTTP versions | HTTP/1.1 served; `Alt-Svc: h3=":443"; ma=2592000` (HTTP/3 advertised) |
| Content encoding | gzip (raw homepage HTML ≈ 400 KB; gzipped ≈ 64 KB) |
| TTFB (homepage) | ~613 ms |
| Total time (homepage) | ~821 ms |
| Total time (service page e.g. `/sap-rise-with-sap/`) | ~3.0 s — slow |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` (legacy header) |
| `Content-Security-Policy` | `upgrade-insecure-requests;` (very weak — no script-src, no frame-ancestors) |
| Referrer-Policy / Permissions-Policy / HSTS | **Not set** |
| WordPress version disclosed | Yes — `<meta name="generator" content="WordPress 6.4.8" />` |

## 2. Platform & Plugins

The site is **WordPress 6.4.8** (current stable is 6.7+, so ~3 minor versions behind), built with the **Elementor** page builder on top of the **"conult"** theme (a multipurpose Gavias/GoodLayers theme).

Detected plugins (from CSS/JS asset URLs and `<meta name="generator">`):

| Plugin | Version | Purpose |
|---|---|---|
| WordPress core | 6.4.8 | CMS |
| WooCommerce | 9.1.6 | E-commerce — **installed but unused on the front-end** |
| Elementor | 3.19.2 | Page builder |
| Elementor: Elementskit Lite | 3.5.6 | Elementor widgets |
| Elementor: bdthemes Element Pack Lite | 8.1.4 / `bdt-uikit` 3.21.7 | Elementor widgets |
| All in One SEO (AIOSEO) | 4.8.5 | SEO |
| Slider Revolution | 6.5.20 | Hero slider |
| The Events Calendar (Tribe) | 6.8.3 | Events |
| Simply Schedule Appointments (SSA) | 1.6.8.32 | Demo / meeting bookings |
| WP Job Manager | (no version exposed) | Careers listings |
| Contact Form 7 | 5.9.8 | Most forms |
| WPCF7 Redirect | 2c532d7e | Form redirects |
| WPCF7 reCAPTCHA | 1.2 | Spam protection (reCAPTCHA v2) |
| Country Phone Field for CF7 | — | International phone input |
| WPForms | — | `/apply-now/` form (shortcode ID 6706) |
| Mailchimp for WP | 4.10.4 | Newsletter signup |
| MonsterInsights | (REST namespace `monsterinsights/v1`) | Google Analytics integration |
| Buttonizer | — | Floating action button ("Talk to Us") |
| Cookie Law Info | 3.3.2 | Cookie banner (plugin loaded but **no banner is shown** — likely disabled in settings) |
| Logo Showcase with Slick Slider | 3.3 | Partner-logo carousel |
| Slide Anything | — | Carousels (owl-carousel + lightgallery) |
| Forget About Shortcode Buttons | 2.1.3 | Button styles |
| Redux Framework | 4.5.7 | Theme options |
| Conult Themer (Gavias) | — | Theme companion plugin |

## 3. CSS & JS payload

- **~50 separate CSS files** are linked on the homepage (many duplicates: e.g. Font Awesome 4 *and* 5, plus Elementor's eicons, plus Line Awesome, plus Dashicons — five icon libraries loaded simultaneously).
- **~50 separate JS files**, including jQuery 3.7.1 + jQuery Migrate 3.4.1 (legacy bridge that should not be needed), Bootstrap, plus Elementor's own modules. Bootstrap is loaded by the theme even though Elementor doesn't need it.
- No HTTP/2 push, no `rel="preload"` on critical CSS/JS, no critical-CSS extraction.
- The single `<link rel="preconnect">` is for `fonts.gstatic.com` (Google Fonts) — useful.
- `dns-prefetch` set for `cdnjs.cloudflare.com` and `fonts.googleapis.com`.

## 4. Images

| Metric | Value |
|---|---|
| `<img>` tags on homepage | 66 |
| PNG | 62 |
| JPG/JPEG | 28 |
| SVG | 5 |
| **WebP** | **0** |
| **AVIF** | **0** |
| `loading="lazy"` attributes | 59 (well used) |
| `decoding="async"` | 4 (under-used) |
| Empty `alt=""` attributes | 14 / 66 (~21% of images have no accessible alt text) |

No `<picture>` / `srcset` responsive image markup detected on the homepage hero. Most images are served straight from `/wp-content/uploads/` as PNG.

## 5. Fonts

- Google Fonts: **DM Sans** (weights 400, 500, 700) — `display=swap`, loaded via `fonts.googleapis.com/css2?family=DM+Sans...`.
- Icon fonts (5 of them, see CSS section above).
- No font subsetting, no `font-display: optional` for above-the-fold text.

## 6. SEO / Structured data

**JSON-LD schema present** (added by AIOSEO):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", ... },
    { "@type": "Organization", "name": "In2IT EBS", "url": "https://in2itebs.com/" },
    { "@type": "WebPage", ... },
    { "@type": "WebSite", ... }
  ]
}
```

Notable gaps:
- The Organization schema has **no `logo`, `sameAs` social-profile array, `address`, `contactPoint`, or `numberOfEmployees`** — these are easy wins.
- No `Service` schema on service pages.
- No `JobPosting` schema on career listings — these get strong Google for Jobs surfacing.
- No `FAQPage` schema on `/faq/`.
- No `Event` schema on event/webinar pages.
- No `Review` / `AggregateRating` schema (despite 5+ testimonials on most pages).
- No `BreadcrumbList` with multiple items (only Home), because the site has no breadcrumb UI.

**Open Graph / Twitter Cards:**
- `og:locale`, `og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `article:published_time`, `article:modified_time` all present.
- **`og:image` is missing** — social-share thumbnails will be blank.
- `twitter:card`: `summary` (not `summary_large_image`), and no `twitter:image`.

**Meta description:** "In2IT EBS is a global IT & consulting organization having offices in India, Singapore, Kenya, Dubai, UAE, USA, etc., We have a Premier partnership with SAP" — note: **same description appears verbatim on every page checked**, which hurts SERPs.

**Canonical URL:** present (`<link rel="canonical" href="https://in2itebs.com/" />`). Good.

**Robots.txt** (live at `https://in2itebs.com/robots.txt`):
```
User-agent: *
Allow: /
Crawl-delay:3
Sitemap:http://in2itebs.com/infos.php?sitemap.xml
Sitemap:http://in2itebs.com/infos.php?sitemap_1.xml
```
- `Allow: /` with no `Disallow` lines — admin/login pages are crawlable.
- The two `Sitemap:` lines point to `infos.php?sitemap.xml` — this is **not** the WordPress sitemap (`/sitemap.xml`). It may be a leftover from an old setup or, more concerningly, a sign of a `infos.php` SEO-spam injection. Recommend investigating that file and replacing the sitemap directives with the real `/sitemap.xml`.
- `Crawl-delay: 3` will slow Google indexing.

## 7. Analytics & marketing tags

| Tool | Detected | Notes |
|---|---|---|
| **Google Tag Manager** | **GTM-PWV2BPZH** (active, with `<noscript>` iframe fallback) | Inline in `<head>` |
| **MonsterInsights** (GA plugin) | REST namespace exposed | Likely sending pageviews to GA via GTM |
| Google reCAPTCHA v2 | Yes (on Contact Form 7) | |
| Facebook Pixel | Not detected | |
| LinkedIn Insight Tag | Not detected | |
| Hotjar / Microsoft Clarity / FullStory | Not detected | |
| HubSpot / Marketo / Intercom / Drift / Crisp / Tawk | Not detected | |

For a B2B SAP partner targeting C-suite/HR buyers, the absence of a **LinkedIn Insight Tag** and **conversion-focused** analytics (HubSpot, Marketo, or even Hotjar session recording) is a notable gap.

## 8. Forms

- Most forms use **Contact Form 7** (CF7) with the WPCF7 Redirect, Country Phone Field, and reCAPTCHA add-ons.
- The `/apply-now/` form uses **WPForms** shortcode ID 6706 — splitting form platforms is unnecessary tech debt.
- The newsletter footer uses **Mailchimp for WP** (`mc4wp-forms-api-js`).
- Honeypot field present: `"Leave this field empty if you're human:"`.

## 9. WordPress REST API exposure

`https://in2itebs.com/wp-json/` is publicly readable and returns:

```
"namespaces": [
  "ssa/v1", "oembed/1.0", "aioseo/v1", "buttonizer", "contact-form-7/v1",
  "cky/v1", "wc/v3", "wpjm-internal/v1", "wpcf7r/v1",
  "tribe/event-aggregator/v1", "tribe/events/v1", "tribe/views/v2",
  "jetpack/v4", "mc4wp/v1", "monsterinsights/v1", "wc-admin",
  "wc-analytics", "wc/store", "wc/store/v1", "wc/private",
  "elementskit/v1/ajaxselect2", "elementor/v1", ...
]
```

- The `wp/v2/users` endpoint (if not locked down) typically enumerates author accounts — useful for credential-stuffing attacks. Worth restricting.
- WooCommerce REST namespaces are advertised even though no shop is active.

## 10. Accessibility quick-checks

- **No skip-to-content link** detected.
- **Empty alt** attributes on 14 / 66 homepage images (~21%).
- **No language switcher** uses `<html lang>` change — the page is `lang="en-US"` for all locale variants (IN/KN/ZA links don't change the document language).
- Mega-menu submenus likely don't satisfy keyboard navigation (Elementor mega-menu defaults — needs manual test).
- Body content uses many low-contrast pairings (DM Sans light grey on white in footer cards) — needs an axe-core scan.

## 11. Typos / copy issues to fix during revamp

- `"Subsrcibe for Latest News and Resources"` — should be **Subscribe**. Appears in the footer of virtually every page.
- `"9, Kinross Streat"` — should be **Street** (South Africa address).
- `"Souring automation"` — should be **Sourcing** (SimplifyTalent platform copy).
- `"Invester/Shareholder"` — should be **Investor** (Unlock the Power event registration dropdown).
- `"Industries we Focused"` — grammatically off, should be **Industries we focus on** or **Industries we serve**.
- `"out-leadership"` URL slug — typo of **our-leadership** (both resolve to same content).
- `"Best SAP SuccessFactors Partner In Bangalore"` — appears as the `<title>` on the **Bhubaneswar** page (template bug).
- `"SAP SuccessFactors HcM Suite"` — inconsistent casing (HCM elsewhere).
- News index shows `08 Dec` for many posts that were actually published in 2020–2022 — original `datePublished` lost (likely from a bulk import); dates need to be restored.
- Copyright still reads `Copyright 2022 – In2IT EBS – All rights reserved.` in 2026.
- `/event-2024/` is Lorem ipsum placeholder content that's publicly indexed.
- `/case/...` sub-pages are WordPress theme demo content (Lorem ipsum, "halpes@example.com", "New York, 8 King Street NY 101") and remain on the live site.

## 12. Information-architecture / UX issues

- **No global header search**.
- **No breadcrumbs** despite the BreadcrumbList JSON-LD claim — JSON-LD currently lists only "Home".
- **No "Back to top"** button on long pages.
- **Multiple URL slugs serve the same content** (e.g. `/sap-concur/` and `/sap-concur-2/`, `/oracle/`, `/oracle-2/`, `/oracle-3/`) — needs a 301 cleanup plan.
- The mega-menu lists 30+ services and 14 industries — too dense for usability; would benefit from a "Solutions by role" or "Solutions by outcome" alternative entry point.
- City pages and SuccessFactors local-SEO pages are near-identical templates with only the city name swapped — Google may treat them as **doorway pages** under its current spam policies.
- The same testimonial carousel ("MG Motor / Mrs. Bectors / Trilegal / Aknamed / Accion Labs") appears on dozens of pages, including unrelated industry pages like Automobiles and FMCG — feels generic.
- `/event-2024/`, `/faq/`, `/join-our-team/` and several other pages contain **placeholder Lorem ipsum text** that should never have shipped.

## 13. Quick-win recommendations for the revamp

1. **Modernize the stack:** migrate off WordPress + Elementor + Conult theme entirely OR upgrade to WordPress 6.7+ with a leaner single page-builder approach (Bricks, Breakdance, or a custom Gutenberg theme). The current bundle of Elementor + Elementskit + Element Pack + Slider Revolution + Redux + Conult Themer is the root cause of the bloated payload.
2. **Replace PNGs with WebP/AVIF** and generate responsive `srcset` variants.
3. **Collapse the 5 icon libraries** to one (e.g. just Lucide or Phosphor as SVG).
4. **Fix the `Subsrcibe` typo** and run a site-wide copy-edit pass against the typo list above.
5. **Add real og:image and twitter:image:**large** assets** per page.
6. **Expand JSON-LD**: add Service schema on every service page, JobPosting on every job, FAQPage on `/faq/`, Event on the webinar pages, and an Organization block with `sameAs` (LinkedIn/Twitter/YouTube/Instagram) plus `logo`, `address`, `contactPoint` arrays.
7. **Deduplicate URLs:** 301-redirect every `-2`/`-3` slug to the canonical, and 410 the `/case/...` and `/event/...` WordPress-demo pages.
8. **Replace Cookie Law Info** with a working, GDPR-compliant consent banner (currently the plugin is loaded but inactive — no banner appears even from the EU).
9. **Add a LinkedIn Insight Tag and conversion tracking** (the buyer journey runs through LinkedIn for SAP/HR buyers).
10. **Address the 21% empty-alt images and add a skip-to-content link**.
11. **Investigate the `infos.php?sitemap.xml` robots.txt entry** — could be a leftover plugin reference or a sign of a previous SEO hack. Either way, replace with `/sitemap.xml`.
12. **Restore real publish dates** on the news posts (everything except 2 recent posts currently says "08 Dec" with no year).
13. **Remove placeholder pages:** `/event-2024/`, `/case/...`, `/event/...`, `/slide-anything-popup-preview/`.
14. **Reduce HTTP-2 request count**: combine the 50 CSS files and 50 JS files via a build step or by removing unused plugins (WooCommerce is the biggest unused payload — remove it if there's no shop planned).
15. **Tighten security headers**: add a real `Content-Security-Policy`, `Strict-Transport-Security` (HSTS), `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` denying camera/microphone/geolocation by default.
16. **Hide the WP version** generator meta + lock down the `wp/v2/users` REST endpoint.
17. **Add a global header search** powered by the existing `/wp-json/wp/v2/search` endpoint.
