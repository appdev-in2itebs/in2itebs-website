import { test, expect, type Page } from "@playwright/test";

// The brand hero and the "Methods that make delivery observable" section each sit on a muted,
// looping ambient video (2026-09-15, replacing the WebGL sculpture). `AmbientVideo` reports what it
// is doing on `data-ambient-video`: "playing", "paused" (page pause control, hidden tab or offscreen)
// or "poster" (reduced motion or data saver: the clip is never fetched or played).
const carousel = 'section[aria-roledescription="carousel"]';
const brandHero = "section[data-brand-hero]";
const methods = "section[data-methods]";
const heroVideo = `${brandHero} [data-ambient-video]`;
const methodsVideo = `${methods} [data-ambient-video]`;

async function state(page: Page, selector: string) {
  await expect(page.locator(selector)).not.toHaveAttribute("data-ambient-video", "pending", { timeout: 15000 });
  return page.locator(selector).getAttribute("data-ambient-video");
}

/** The Discover cue must never sit under the fixed quick-contact button in the bottom-right corner. */
async function discoverClearOfQuickContact(page: Page) {
  const discover = (await page.getByRole("link", { name: "Scroll to featured services" }).boundingBox())!;
  const contact = (await page.locator('button[aria-controls="quick-contact-panel"]').boundingBox())!;
  const overlaps =
    discover.x < contact.x + contact.width &&
    discover.x + discover.width > contact.x &&
    discover.y < contact.y + contact.height &&
    discover.y + discover.height > contact.y;
  expect(overlaps, "the Discover cue overlaps the quick-contact button").toBe(false);
}

test("desktop: the brand hero video plays, muted and inline, under the light wash", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  const video = page.locator(`${heroVideo} video`);
  await expect(video).toHaveCount(1);
  expect(await video.evaluate((v: HTMLVideoElement) => [v.muted, v.loop, v.playsInline, v.paused])).toEqual([
    true,
    true,
    true,
    false,
  ]);
  await expect(video).toHaveAttribute("poster", /hero-team-poster\.jpg$/);
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(/hero-team-1080\.mp4$/);
  // Tint and a light veil sit between the clip and the copy; the readable floor follows the copy
  // block itself (`.video-wash-copy`), and the ambient gradient survives on top.
  await expect(page.locator(`${brandHero} .video-tint`)).toHaveCount(1);
  await expect(page.locator(`${brandHero} .video-wash`)).toHaveCount(1);
  await expect(page.locator(`${brandHero} .video-wash-copy`)).toHaveCount(1);
  await expect(page.locator(`${brandHero} .hero-ambient`)).toHaveCount(1);
  // The copy wash is a full-bleed band (2026-09-15 pm): edge to edge of the viewport, fading in above
  // the copy and out below it, with no rounded corners and no halo, so it merges with the footage.
  const band = page.locator(`${brandHero} .video-wash-copy`);
  const bandBox = (await band.boundingBox())!;
  expect(bandBox.x).toBeLessThanOrEqual(0);
  expect(bandBox.x + bandBox.width).toBeGreaterThanOrEqual(1440);
  const bandStyle = await band.evaluate((el) => {
    const s = getComputedStyle(el);
    return { image: s.backgroundImage, shadow: s.boxShadow, radius: s.borderRadius };
  });
  expect(bandStyle.image).toContain("linear-gradient");
  expect(bandStyle.shadow).toBe("none");
  expect(bandStyle.radius).toBe("0px");
  // The copy sits in the lower half of the hero (2026-09-15), so the clip owns the upper half.
  const hero = (await page.locator(brandHero).boundingBox())!;
  const headline = (await page.locator(`${brandHero} h1`).boundingBox())!;
  expect(headline.y).toBeGreaterThan(hero.y + hero.height / 2);
  expect(headline.x).toBeLessThan(hero.x + hero.width / 4);
  await discoverClearOfQuickContact(page);
  // The page pause control left the hero (2026-09-15 pm); reduced motion and hidden tabs still pause.
  await expect(page.getByRole("button", { name: /page animation/ })).toHaveCount(0);
  // The sculpture is gone for good.
  await expect(page.locator("[data-hero-3d]")).toHaveCount(0);
  await expect(page.locator(`${carousel} img[srcset]`)).toHaveCount(3);
});

test("phones get the 720p hero source", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  expect(await page.locator(`${heroVideo} video`).evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(
    /hero-team-720\.mp4$/,
  );
  // The cue row ends under the fixed quick-contact button on a phone, so Discover is hidden there.
  await expect(page.locator('a[aria-label="Scroll to featured services"]')).toBeHidden();
});

test("reduced motion shows the poster and never plays the clip", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "poster");
  const video = page.locator(`${heroVideo} video`);
  expect(await video.evaluate((v: HTMLVideoElement) => [v.paused, v.preload, v.autoplay])).toEqual([
    true,
    "none",
    false,
  ]);
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "poster");
});

test("the motion-paused flag still pauses and resumes the hero video without a control", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  // The visible pause control went on 2026-09-15 pm; MotionObserver still sets the flag for reduced
  // motion and hidden tabs, and the clip must keep honouring it.
  await page.evaluate(() => (document.documentElement.dataset.motionPaused = "true"));
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "paused");
  expect(await page.locator(`${heroVideo} video`).evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.evaluate(() => (document.documentElement.dataset.motionPaused = "false"));
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing");
});

test("the methods video plays only while its section is on screen", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  // Far below the fold at load: not fetched into playback until it is needed.
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "paused");
  await page.locator(methods).scrollIntoViewIfNeeded();
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  await expect(page.locator(`${methodsVideo} video`)).toHaveAttribute("poster", /methods-office-poster\.jpg$/);
  // The methods clip sits under the brand tint and one translucent white-to-blue wash
  // (`.video-wash-methods`, 2026-09-15 pm): no copy panels, no uniform veil, no section tint.
  await expect(page.locator(`${methods} .video-wash-copy`)).toHaveCount(0);
  await expect(page.locator(`${methods} .video-wash`)).toHaveCount(0);
  await expect(page.locator(`${methods} .section-tint-b`)).toHaveCount(0);
  await expect(page.locator(`${methods} .video-tint`)).toHaveCount(1);
  const methodsWash = page.locator(`${methods} .video-wash-methods`);
  await expect(methodsWash).toHaveCount(1);
  expect(await methodsWash.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain("linear-gradient");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "paused");
  await expect(page.locator(heroVideo)).toHaveAttribute("data-ambient-video", "playing");
});

test("dark theme reaches the same outcome", async ({ page, context }) => {
  await context.addCookies([{ name: "in2it-theme", value: "dark", domain: "127.0.0.1", path: "/" }]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/theme-dark/);
  expect(["playing", "paused", "poster"]).toContain(await state(page, heroVideo));
  await expect(page.locator(`${brandHero} .video-wash`)).toHaveCount(1);
  await expect(page.locator(`${brandHero} .hero-ambient`)).toHaveCount(1);
});

test("the brand hero and service carousel each fill the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({ path: "test-results/home-brand-hero.png" });
  const heroBox = await page.locator(brandHero).boundingBox();
  const carouselBox = await page.locator(carousel).boundingBox();
  const headerBox = await page.locator("header").boundingBox();
  expect(heroBox!.height).toBeGreaterThanOrEqual(900);
  expect(carouselBox!.height).toBeGreaterThanOrEqual(900 - headerBox!.height);
  await page.locator(carousel).scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/home-service-carousel.png" });
});

test("the visible service carousel advances after three seconds", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator(carousel).scrollIntoViewIfNeeded();
  const heading = page.locator(carousel).getByRole("heading", { level: 2 });
  const initial = await heading.textContent();
  await expect(heading).not.toHaveText(initial!, { timeout: 4200 });
});

test("inner-page heroes retain the full-screen rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/");
  const box = await page.locator("main > section").first().boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(900);
});
