# Website performance and motion budget

7 September 2026. These are release targets, not claims about production field performance.

- Aim for p75 LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 on representative mobile traffic. Real-user measurement requires the approved provider/consent decision.
- Homepage first-load JavaScript budget: 150kB in the Next build report. The current report is 120kB; shared first-load JS is 103kB. The optional RISE/GROW assessment route reports 160kB and has a separate 180kB budget because it loads the interactive assessment. Build sizes are not full page transfer sizes or a substitute for timings.
- Keep essential page content server-visible. No continuous blur/box-shadow animation. Restrict decorative loops to the homepage model and client ribbon; provide pause, reduced-motion static rendering, offscreen suspension and hidden-document suspension.
- Prefer opacity/transform for motion. Assess stroke-animation paint cost on a lower-powered physical mobile device before production approval. No scrolling hijacks or automatic message carousel.
- `web/tests/browser/performance.spec.ts` records local, unthrottled first-viewport LCP/CLS/TTFB at 375 and 1440px in isolated Chrome contexts. It is a short synthetic observation window, not a Lighthouse score, field test or INP measurement. Preserve results and repeat on realistic network/device profiles before launch.
- Route crawl measured homepage HTML at approximately 191kB uncompressed after remediation versus about 211kB in the baseline. This is payload evidence only; it does not establish a load-time improvement.

## Recorded local sample

Isolated Chrome contexts, loopback server, no network/CPU throttling, 1.5-second post-font observation window, 7 September 2026. These samples do not measure INP or p75 field performance.

| Route | Width | LCP | CLS | TTFB |
|---|---:|---:|---:|---:|
| Home | 375px | 1244ms | 0 | 74ms |
| Contact | 375px | 472ms | 0.00015 | 44ms |
| RISE/GROW | 375px | 604ms | 0.01094 | 50ms |
| Home | 1440px | 1528ms | 0.00011 | 70ms |
| Contact | 1440px | 604ms | 0.00102 | 44ms |
| RISE/GROW | 1440px | 664ms | 0.00011 | 33ms |
