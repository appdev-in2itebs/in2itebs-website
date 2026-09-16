import { test, expect, type Page } from "@playwright/test";
import { leadership } from "../../content/leadership";
import { testimonials, testimonialVideos } from "../../content/testimonials";

// Three automatic carousels close the homepage (2026-09-16): leadership, client stories (quotes and
// video cards, copied 1:1 from in2itebs.com) and the YouTube ribbon. Each is a scroll-snap track
// that advances on its own every few seconds, holds while hovered, focused or offscreen, and never
// moves under reduced motion. The Transform / Decide / Operate section is gone.
const leadershipSection = "section[data-leadership]";
const storiesSection = "section[data-client-stories]";
const youtubeSection = "section[data-youtube-ribbon]";

async function top(page: Page, selector: string) {
  return (await page.locator(selector).boundingBox())!.y;
}

test("the leadership and client-story carousels sit between the industries and the YouTube ribbon", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#operating-model")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "One continuous line of accountability." })).toHaveCount(0);
  const order = [
    await top(page, "#industries"),
    await top(page, leadershipSection),
    await top(page, storiesSection),
    await top(page, youtubeSection),
  ];
  for (let i = 1; i < order.length; i++) expect(order[i]).toBeGreaterThan(order[i - 1]);
  // Leadership: the four live cards, photos and titles, no controls.
  const cards = page.locator(`${leadershipSection} [data-leader]`);
  await expect(cards).toHaveCount(leadership.length);
  for (const person of leadership) {
    const card = page.locator(`${leadershipSection} [data-leader="${person.slug}"]`);
    await expect(card).toContainText(person.name);
    await expect(card).toContainText(person.title);
    await expect(card.locator("img")).toHaveAttribute("src", person.photo);
  }
  await expect(page.locator(`${leadershipSection} button`)).toHaveCount(0);
  // Tracks whose cards carry no links are keyboard-reachable scroll regions (axe
  // scrollable-region-focusable); the ones full of links need no extra tab stop.
  await expect(page.locator(`${leadershipSection} [data-auto-track]`)).toHaveAttribute("tabindex", "0");
  await expect(page.locator(`${storiesSection} [data-auto-track]`).first()).toHaveAttribute("tabindex", "0");
  await expect(page.locator(`${storiesSection} [data-auto-track]`).nth(1)).not.toHaveAttribute("tabindex", /./);
  await expect(page.locator(`${youtubeSection} [data-auto-track]`)).not.toHaveAttribute("tabindex", /./);
  // Client stories: five quotes with their people, five video cards linking straight to YouTube.
  const quotes = page.locator(`${storiesSection} [data-quote]`);
  await expect(quotes).toHaveCount(testimonials.length);
  for (const quote of testimonials) {
    const slide = page.locator(`${storiesSection} [data-quote="${quote.slug}"]`);
    await expect(slide).toContainText(quote.quote.slice(0, 60));
    await expect(slide).toContainText(quote.name);
    await expect(slide.locator("img")).toHaveAttribute("src", quote.avatar);
  }
  const videos = page.locator(`${storiesSection} [data-testimonial-video]`);
  await expect(videos).toHaveCount(testimonialVideos.length);
  for (const [index, video] of testimonialVideos.entries()) {
    await expect(videos.nth(index)).toHaveAttribute("href", `https://www.youtube.com/watch?v=${video.id}`);
    await expect(videos.nth(index)).toHaveAttribute("target", "_blank");
    await expect(videos.nth(index).locator("img")).toHaveAttribute("src", `/testimonials/${video.id}.jpg`);
  }
  await expect(page.locator(`${storiesSection} button`)).toHaveCount(0);
});

for (const [label, section] of [
  ["leadership", leadershipSection],
  ["client stories", storiesSection],
  ["YouTube ribbon", youtubeSection],
] as [string, string][])
  test(`the ${label} track advances on its own, holds while hovered and never moves under reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const track = page.locator(`${section} [data-auto-track]`).first();
    await track.scrollIntoViewIfNeeded();
    expect(await track.evaluate((el) => getComputedStyle(el).scrollSnapType)).toContain("x");
    expect(await track.evaluate((el) => el.scrollLeft)).toBe(0);
    await expect.poll(() => track.evaluate((el) => el.scrollLeft), { timeout: 8000 }).toBeGreaterThan(50);
    // Let the smooth scroll settle on its snap point before reading where the track holds.
    let settled = -1;
    await expect
      .poll(async () => {
        const now = await track.evaluate((el) => el.scrollLeft);
        const stable = now === settled;
        settled = now;
        return stable;
      })
      .toBe(true);
    // Hovering the section holds it where it is.
    await page.locator(section).hover();
    const held = await track.evaluate((el) => el.scrollLeft);
    await page.waitForTimeout(5500);
    expect(await track.evaluate((el) => el.scrollLeft)).toBe(held);
    // Reduced motion: a fresh load never advances.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const still = page.locator(`${section} [data-auto-track]`).first();
    await still.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(5500);
    expect(await still.evaluate((el) => el.scrollLeft)).toBe(0);
  });
