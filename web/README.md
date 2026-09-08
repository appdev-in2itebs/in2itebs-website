# In2IT EBS — Website (Step 10 build)

Production website for In2IT EBS, built from the approved Step 1–9 documentation
(`../docs/`). Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · in-repo typed content (no CMS).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified green)
npm start        # serve the production build
```

## What's built

- **Design system** from `docs/DESIGN_SYSTEM.md`: Newsreader + IBM Plex Sans, navy-dominant
  palette, soft elevation, custom easings, film-grain overlay, marquee animation, reduced-motion support.
- **All routes** (43 prerendered): Home · Services hub · SAP (six anchored clusters) · ECC Prism ·
  Salesforce · Workday · ADMS · Delivery Excellence · Industries index + 13 dynamic industry pages ·
  Why In2IT EBS · About · Contact · Insights index + articles · Careers · Legal ×3 · Thank-you.
- **Content layer** (`content/`): typed modules; `clients`/`partners`/`certifications` generated from the
  cross-verified deck data. Industry client walls are derived by deck-sector membership
  (`lib/content.ts` → `getClientsBySectors`), so cross-listed clients appear on every matching industry.
- **SEO**: `sitemap.ts`, `robots.ts`, Organization + WebSite JSON-LD, per-page metadata, 301 redirect
  map from old-site URLs (`content/redirects.mjs`).
- **Lead form** → `app/api/lead/route.ts` (recipient: info@in2itebs.com).
- **Brand logos** vectorised to SVG in `public/brand/`; client/partner/cert logos in `public/logos/`.

## Known follow-ups (non-blocking; owner/deploy)

- **Email/CRM**: `app/api/lead/route.ts` currently logs the lead — wire to an email service (Resend/SES/SMTP).
- **Client logos**: 34/90 are real logos; the rest render as styled wordmark plates (deck-fallback). Swap in
  official files or deck crops as available; some JPGs need background cleanup.
- **Brand logos**: SVGs are traces of the supplied PNGs — swap for official vector masters if they exist.
- **Content to supply**: leadership bios (ported from old site — verify), legal text (port + legal sign-off),
  full Insights article bodies (currently metadata + placeholder), live job openings (intentionally blank).
- **OG images**: add per-page `og:image` assets (Step 11 / SEO).
- **Analytics** (Step 11): reuse GA4 + fresh GTM, LinkedIn Insight Tag, opt-in consent banner.
- **410s**: Lorem/demo URLs currently 301 → home; true 410 needs middleware.

Traceability: every page composes content traced to `docs/CONTENT_SOURCE_OF_TRUTH.md` (SOT IDs in `docs/copy/`).
