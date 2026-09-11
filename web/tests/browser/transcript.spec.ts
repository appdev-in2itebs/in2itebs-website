import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage implements the transcript visibly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Change with confidence\.\s*Run without compromise\./,
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
    await page.locator("header").getByRole("link", { name: "Services", exact: true }).hover();
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

test("desktop navigation uses unified hover and focus disclosures", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const header = page.locator("header");
  const services = header.getByRole("link", { name: "Services", exact: true });
  await expect(services).toHaveAttribute("href", "/what-we-do/");
  await expect(header.getByRole("button", { name: /Services navigation/ })).toHaveCount(0);
  await services.hover();
  await expect(page.locator("#desktop-nav-0")).toBeVisible();

  const about = header.getByRole("link", { name: "About", exact: true });
  await about.hover();
  const aboutMenu = page.locator("#desktop-nav-5");
  await expect(aboutMenu).toBeVisible();
  await expect(aboutMenu.getByRole("link", { name: "Who We Are" })).toBeVisible();
  await expect(aboutMenu.getByRole("link", { name: "Why In2IT EBS" })).toBeVisible();
  await expect(aboutMenu.getByRole("link", { name: "Insights" })).toBeVisible();
  await expect(aboutMenu.getByRole("link", { name: "Partners" })).toHaveCount(0);
  await expect(aboutMenu.getByRole("link", { name: "Careers" })).toHaveCount(0);
  await expect(header.getByRole("button", { name: /About navigation/ })).toHaveCount(0);
});
