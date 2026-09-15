import { test, expect } from "@playwright/test";
import { homeEcosystem } from "../../content/partner-ecosystem";

// The homepage partners section sits on ambient footage (2026-09-15 16:40) under the same 20% black
// veil and `.on-video` palette as the methods section, and every partner tile is a `.glass-liquid`
// panel: iOS 26 "Liquid Glass", light-leaning so the marks keep their contrast.
const partners = "section[data-partners]";
const partnersVideo = `${partners} [data-ambient-video]`;

test("the partners section plays its clip only on screen, under the veil", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(partners)).toHaveClass(/on-video/);
  await expect(page.locator(partnersVideo)).toHaveCount(1);
  // Below the fold at load: not fetched into playback until it is needed.
  await expect(page.locator(partnersVideo)).toHaveAttribute("data-ambient-video", "paused");
  await page.locator(partners).scrollIntoViewIfNeeded();
  await expect(page.locator(partnersVideo)).toHaveAttribute("data-ambient-video", "playing", { timeout: 15000 });
  await expect(page.locator(`${partnersVideo} video`)).toHaveAttribute("poster", /partners-office-poster\.jpg$/);
  expect(await page.locator(`${partnersVideo} video`).evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(
    /partners-office-720\.mp4$/,
  );
  const veil = page.locator(`${partners} .video-veil`);
  await expect(veil).toHaveCount(1);
  expect(await veil.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgba(0, 0, 0, 0.2)");
});

test("every partner tile is a liquid-glass panel that keeps its mark legible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator(partners).scrollIntoViewIfNeeded();
  const tiles = page.locator(`${partners} .glass-liquid`);
  // One tile per ecosystem entry plus the "Full ecosystem" link tile.
  await expect(tiles).toHaveCount(homeEcosystem.length + 1);
  await expect(page.locator(`${partners} .glass-card`)).toHaveCount(0);
  const style = await tiles.first().evaluate((el) => {
    const s = getComputedStyle(el);
    const sheen = getComputedStyle(el, "::before");
    return {
      filter: s.backdropFilter || (s as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter,
      isolation: s.isolation,
      radius: parseFloat(s.borderRadius),
      sheen: sheen.content,
      sheenZ: sheen.zIndex,
    };
  });
  expect(style.filter).toContain("blur");
  expect(style.filter).toContain("saturate");
  // The specular sheen is a pseudo-element behind the content, inside the tile's own stacking context.
  expect(style.isolation).toBe("isolate");
  expect(style.sheen).toBe('""');
  expect(style.sheenZ).toBe("-1");
  expect(style.radius).toBeGreaterThanOrEqual(20);
  // Every named partner is still exposed as text, and the marks sit on a light tile.
  for (const partner of homeEcosystem)
    await expect(page.locator(partners).getByText(partner.name, { exact: true })).toBeVisible();
  const tileBackground = await tiles.first().evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(tileBackground).toContain("linear-gradient");
  expect(tileBackground).toContain("rgba(255, 255, 255");
});
