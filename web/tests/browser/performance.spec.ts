import { test } from "@playwright/test";
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
