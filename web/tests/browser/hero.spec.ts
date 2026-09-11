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
    if (state === "active") {
      // A desktop resize re-evaluates the gates; a running scene must stay reported as running
      // rather than being stranded back at "pending" by the re-probe.
      await page.setViewportSize({ width: 1380, height: 900 });
      await page.waitForTimeout(500);
      await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "active");
    }
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
  // The control sits well below the fold, so clicking it scrolls the hero out of view — and the scene
  // pauses offscreen too. Returning to the top isolates the pause flag as the only thing still gating it.
  const press = async (name: string) => {
    await page.getByRole("button", { name, exact: true }).click();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  };
  await press("Pause page animation");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "paused");
  await press("Resume page animation");
  await expect(page.locator(loader)).toHaveAttribute("data-hero-3d", "active");
});

test("dark theme reaches the same outcome", async ({ page, context }) => {
  await context.addCookies([{ name: "in2it-theme", value: "dark", domain: "127.0.0.1", path: "/" }]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  // The cookie has to have actually put the document in the dark theme, or this test is just the
  // first one again under a different name.
  await expect(page.locator("html")).toHaveClass(/theme-dark/);
  const state = await settled(page);
  expect(["active", "paused", "unavailable"]).toContain(state);
  await expect(page.locator(`${carousel} .hero-ambient`)).toHaveCount(1);
});
