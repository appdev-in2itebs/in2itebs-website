import { test, expect, type Browser } from "@playwright/test";
test("record local first-viewport performance", async ({ browser }) => {
  const samples: unknown[] = [];
  for (const width of [375, 1440])
    for (const path of ["/", "/contact/", "/sap-enterprise-solutions/rise-vs-grow/"]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.addInitScript(() => {
        const metrics = { lcp: 0, cls: 0 };
        Object.assign(window, { previewMetrics: metrics });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) metrics.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[])
            if (!entry.hadRecentInput) metrics.cls += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(`http://127.0.0.1:3107${path}`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500); // Fixed observation window, not a functional readiness assertion.
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const metrics = (window as unknown as Window & { previewMetrics: { lcp: number; cls: number } }).previewMetrics;
        return { ...metrics, ttfb: navigation.responseStart - navigation.requestStart };
      });
      samples.push({ path, width, ...metrics });
      await context.close();
    }
  console.log("LOCAL_UNTHROTTLED_METRICS", JSON.stringify(samples));
  await test
    .info()
    .attach("local-performance", { body: JSON.stringify(samples, null, 2), contentType: "application/json" });
});

/** Scripted 2s scroll to the bottom, recording the interval between `requestAnimationFrame`
 *  callbacks. Returns the p95 interval in milliseconds — the long tail is where glass compositing
 *  would show up, and a mean would hide it. */
async function scrollFrameP95(browser: Browser, path: string, width: number) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:3107${path}`);
  await page.evaluate(() => document.fonts.ready);
  const measurement = await page.evaluate(
    () =>
      new Promise<{ p95: number; frames: number }>((resolve) => {
        const intervals: number[] = [];
        const distance = document.documentElement.scrollHeight - innerHeight;
        const start = performance.now();
        let last = start;
        const step = () => {
          const now = performance.now();
          intervals.push(now - last);
          last = now;
          const progress = Math.min(1, (now - start) / 2000);
          // `html { scroll-behavior: smooth }` would otherwise animate each step for us.
          scrollTo({ top: distance * progress, behavior: "instant" });
          if (progress < 1) requestAnimationFrame(step);
          else {
            // Drop the first interval: it spans page setup, not a scrolled frame.
            const sorted = intervals.slice(1).sort((a, b) => a - b);
            resolve({
              p95: sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] : 0,
              frames: sorted.length,
            });
          }
        };
        requestAnimationFrame(step);
      }),
  );
  await context.close();
  return measurement;
}

// Premium restyle: the glass surfaces added on this branch are `backdrop-filter` layers, and the
// SAP hub and partners routes carry the most of them. The bound is relative rather than absolute so
// it survives a slow machine: the privacy policy is the glass-light control route, scrolled the
// same way in the same session, and a heavy route may not cost more than 3x its p95 frame interval.
test("record scroll frame timing on the glass-heavy routes", async ({ browser }) => {
  const samples: unknown[] = [];
  const budgets: { path: string; width: number; p95: number; control: number; limit: number }[] = [];
  for (const width of [375, 1440]) {
    const control = await scrollFrameP95(browser, "/legal/privacy-policy/", width);
    samples.push({ path: "/legal/privacy-policy/", width, control: true, ...control });
    for (const path of ["/sap-enterprise-solutions/", "/partners/"]) {
      const heavy = await scrollFrameP95(browser, path, width);
      samples.push({ path, width, ...heavy });
      budgets.push({ path, width, p95: heavy.p95, control: control.p95, limit: control.p95 * 3 });
    }
  }
  console.log("SCROLL_FRAME_P95", JSON.stringify(samples));
  await test
    .info()
    .attach("scroll-frame-timing", { body: JSON.stringify(samples, null, 2), contentType: "application/json" });
  for (const b of budgets)
    expect(
      b.p95,
      `${b.path} at ${b.width}px p95 vs 3x the privacy-policy control (${b.control.toFixed(2)}ms)`,
    ).toBeLessThanOrEqual(b.limit);
});
