import { test, expect } from "@playwright/test";
import { youtubeVideos } from "../../content/youtube";

// The YouTube ribbon (2026-09-15 17:08) is the last section of the homepage, directly above the
// footer: a horizontal scroll-snap carousel of the channel's uploads, newest first, each card a
// direct link to the video on YouTube, with self-hosted thumbnails (the CSP allows no third-party
// images) and arrow buttons that page the track for mouse users.
const ribbon = "section[data-youtube-ribbon]";

test("the ribbon sits right above the footer and links every upload, newest first", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("main > section:last-of-type[data-youtube-ribbon]")).toHaveCount(1);
  const cards = page.locator(`${ribbon} [data-youtube-video]`);
  await expect(cards).toHaveCount(youtubeVideos.length);
  for (const [index, video] of youtubeVideos.slice(0, 3).entries()) {
    const card = cards.nth(index);
    await expect(card).toHaveAttribute("href", `https://www.youtube.com/watch?v=${video.id}`);
    await expect(card).toHaveAttribute("target", "_blank");
    await expect(card).toHaveAttribute("rel", /noopener/);
    await expect(card).toContainText(video.title);
    await expect(card.locator("img")).toHaveAttribute("src", `/youtube/${video.id}.jpg`);
  }
  await page.locator(ribbon).scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      cards
        .first()
        .locator("img")
        .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
    )
    .toBeTruthy();
  await expect(page.locator(ribbon).getByRole("link", { name: /YouTube channel/ })).toHaveAttribute(
    "href",
    /youtube\.com\/channel\//,
  );
});

test("the ribbon is a scroll-snap carousel that the arrows page through", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator(ribbon).scrollIntoViewIfNeeded();
  const track = page.locator(`${ribbon} [data-youtube-track]`);
  expect(await track.evaluate((el) => getComputedStyle(el).scrollSnapType)).toContain("x");
  expect(await track.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  expect(await track.evaluate((el) => el.scrollLeft)).toBe(0);
  await page.getByRole("button", { name: "Show later videos" }).click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(200);
  await page.getByRole("button", { name: "Show earlier videos" }).click();
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBe(0);
});
