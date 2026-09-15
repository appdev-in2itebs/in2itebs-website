import { test, expect, type Page } from "@playwright/test";

// The homepage hero is a five-slide, auto-rotating carousel on ambient video (2026-09-15 15:28):
// the brand copy plus the four service slides that used to follow it in their own section, one
// clip each, advancing every 4.5 s with no controls of any kind. `AmbientVideo` reports what each
// clip is doing on `data-ambient-video`: "playing", "paused" (hidden tab, motion flag or offscreen)
// or "poster" (reduced motion or data saver: the clip is never fetched or played). Both video
// sections carry the `.on-video` palette (the former dark theme) over a 20% black veil.
const brandHero = "section[data-brand-hero]";
const methods = "section[data-methods]";
const heroVideo = `${brandHero} [data-ambient-video]`;
const methodsVideo = `${methods} [data-ambient-video]`;
const activeSlide = `${brandHero} [data-hero-slide][data-active="true"]`;
const activeClip = `${brandHero} [data-hero-video][data-active="true"] [data-ambient-video]`;
const activeVideo = `${activeClip} video`;

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

test("desktop: the hero is a five-slide carousel on ambient video with no controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = page.locator(brandHero);
  await expect(hero).toHaveAttribute("aria-roledescription", "carousel");
  await expect(hero).toHaveClass(/on-video/);
  await expect(page.locator(`${brandHero} [data-hero-slide]`)).toHaveCount(5);
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "0");
  await expect(page.locator(`${activeSlide} h1`)).toContainText("Change with confidence.");
  // Only the active clip and the next one are mounted; the active one plays the entry clip.
  await expect(page.locator(heroVideo)).toHaveCount(2);
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  const video = page.locator(activeVideo);
  expect(await video.evaluate((v: HTMLVideoElement) => [v.muted, v.loop, v.playsInline, v.paused])).toEqual([
    true,
    true,
    true,
    false,
  ]);
  await expect(video).toHaveAttribute("poster", /hero-entry-poster\.jpg$/);
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(/hero-entry-1080\.mp4$/);
  // One 20% black veil sits between the clip and the copy; none of the earlier layers survive.
  const veil = page.locator(`${brandHero} .video-veil`);
  await expect(veil).toHaveCount(1);
  expect(await veil.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgba(0, 0, 0, 0.2)");
  for (const gone of [".video-tint", ".video-wash", ".video-wash-copy", ".video-wash-methods"])
    await expect(page.locator(`${brandHero} ${gone}`)).toHaveCount(0);
  await expect(page.locator(`${brandHero} .hero-ambient`)).toHaveCount(1);
  // The copy sits bottom-left in the lower half, and nothing in the carousel is a control.
  const heroBox = (await hero.boundingBox())!;
  const headline = (await page.locator(`${activeSlide} h1`).boundingBox())!;
  expect(headline.y).toBeGreaterThan(heroBox.y + heroBox.height / 2);
  expect(headline.x).toBeLessThan(heroBox.x + heroBox.width / 4);
  await expect(page.locator(`${brandHero} button`)).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /page animation|service carousel|Next service|Previous service/ }),
  ).toHaveCount(0);
  await discoverClearOfQuickContact(page);
  // The former service carousel section is gone; the hero is the only carousel on the page.
  await expect(page.locator("#featured-services")).toHaveCount(0);
  await expect(page.locator('[aria-roledescription="carousel"]')).toHaveCount(1);
});

test("the hero advances on its own every 4.5 seconds and keeps the h1 in the document", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "0");
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "1", { timeout: 7000 });
  await expect(page.locator(`${activeSlide} h2`)).toContainText("Transform your enterprise with SAP.");
  expect(await page.locator(activeVideo).evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(
    /hero-sap-1080\.mp4$/,
  );
  // Slide 1's h1 stays in the document, hidden, and the leaving clip unmounts once the fade ends.
  await expect(page.locator(`${brandHero} h1`)).toHaveCount(1);
  await expect(page.locator(heroVideo)).toHaveCount(2, { timeout: 3000 });
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "2", { timeout: 7000 });
});

test("phones get the 720p clip and no Discover cue", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  expect(await page.locator(activeVideo).evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(
    /hero-entry-720\.mp4$/,
  );
  // The cue row ends under the fixed quick-contact button on a phone, so Discover is hidden there.
  await expect(page.locator('a[aria-label="Scroll to featured services"]')).toBeHidden();
});

test("reduced motion holds the first slide on its poster and never plays a clip", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "poster");
  expect(await page.locator(activeVideo).evaluate((v: HTMLVideoElement) => [v.paused, v.preload, v.autoplay])).toEqual([
    true,
    "none",
    false,
  ]);
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "poster");
  // No rotation under reduced motion: still the brand slide after a full interval and a half.
  await page.waitForTimeout(7000);
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "0");
});

test("the motion-paused flag pauses the active clip and holds the slide", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  // There is no visible pause control; MotionObserver sets the flag for reduced motion and hidden
  // tabs, and both the clip and the rotation must keep honouring it.
  await page.evaluate(() => (document.documentElement.dataset.motionPaused = "true"));
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "paused");
  expect(await page.locator(activeVideo).evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.waitForTimeout(6000);
  await expect(page.locator(activeSlide)).toHaveAttribute("data-hero-slide", "0");
  await page.evaluate(() => (document.documentElement.dataset.motionPaused = "false"));
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing");
});

test("the methods video plays only while its section is on screen, under the same veil", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  // Far below the fold at load: not fetched into playback until it is needed.
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "paused");
  await page.locator(methods).scrollIntoViewIfNeeded();
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  await expect(page.locator(`${methodsVideo} video`)).toHaveAttribute("poster", /methods-office-poster\.jpg$/);
  await expect(page.locator(methods)).toHaveClass(/on-video/);
  await expect(page.locator(`${methods} .video-veil`)).toHaveCount(1);
  for (const gone of [".video-tint", ".video-wash", ".video-wash-copy", ".video-wash-methods", ".section-tint-b"])
    await expect(page.locator(`${methods} ${gone}`)).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator(methodsVideo)).toHaveAttribute("data-ambient-video", "paused");
  await expect(page.locator(activeClip)).toHaveAttribute("data-ambient-video", "playing");
});

test("the brand hero fills the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({ path: "test-results/home-brand-hero.png" });
  const heroBox = await page.locator(brandHero).boundingBox();
  expect(heroBox!.height).toBeGreaterThanOrEqual(900);
});

test("inner-page heroes retain the full-screen rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/");
  const box = await page.locator("main > section").first().boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(900);
});
