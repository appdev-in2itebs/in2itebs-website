import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage implements the transcript visibly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "In2IT EBS: enterprise transformation, delivered globally",
  );
  await expect(page.locator("header").getByRole("link", { name: "info@in2itebs.com" })).toBeVisible();
  await expect(page.locator("header").getByRole("link", { name: "Talk to us" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText("Transform your enterprise with SAP.");
  await page.getByRole("button", { name: "Next service", exact: true }).click();
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText("Applications built around your business.");
  await expect(page.getByRole("link", { name: "Explore application services" })).toHaveAttribute(
    "href",
    "/digital-data-ai/application-engineering/",
  );
  await page.getByRole("button", { name: "Previous service", exact: true }).click();
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText("Transform your enterprise with SAP.");
  for (const name of ["SAP", "SuccessFactors", "Workday", "Salesforce", "Oracle", "Microsoft"])
    await expect(
      page.getByRole("navigation", { name: "Platform practices" }).getByRole("link", { name, exact: true }),
    ).toBeVisible();
  for (const name of [
    "SAP",
    "Microsoft",
    "Oracle",
    "Salesforce",
    "Workday",
    "IBM",
    "HP",
    "OpenText",
    "Newgen",
    "SAP Concur",
    "Qualtrics",
  ])
    await expect(page.locator("#partners").getByText(name, { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Contact", exact: true }).click();
  await expect(page.locator("#quick-contact-panel").getByRole("link", { name: "info@in2itebs.com" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#quick-contact-panel")).toBeHidden();
});
for (const route of ["/what-we-do/", "/contact/"])
  test(`transcript mega-menu ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(route);
    await page.getByRole("button", { name: "Open What We Do navigation" }).click();
    const box = await page.locator("#desktop-nav-0").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(1280);
    for (const name of ["Oracle", "Microsoft"])
      await expect(page.locator("#desktop-nav-0").getByRole("link", { name, exact: true })).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations).toEqual([]);
  });
for (const width of [320, 375, 1440])
  test(`transcript homepage at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await expect(page.locator("header").getByRole("link", { name: "Talk to us" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "info@in2itebs.com" })).toBeVisible();
    await page.screenshot({ path: `test-results/transcript-home-${width}.png` });
  });
test("the hero mounts only the previous, visible and next slide images", async ({ page }) => {
  await page.goto("/");
  // The SAP Gold Partner badge in the hero is a plain <img>; the slide backgrounds are the only responsive images.
  const slideImages = page.locator('section[aria-roledescription="carousel"] img[srcset]');
  await expect(slideImages).toHaveCount(3);
  await page.getByRole("button", { name: "Next service", exact: true }).click();
  await expect(slideImages).toHaveCount(3);
});
