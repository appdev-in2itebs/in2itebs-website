import { test, expect } from "@playwright/test";
// The site has one theme since 2026-09-15 15:28 (dark mode was removed on request); the former dark
// palette survives only as the `.on-video` scope on the two ambient-video sections.
test("semantic colour contrast", async ({ page }) => {
  await page.goto("/");
  const measured = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    /** sRGB channels of an OKLCH channel triple, resolved by the browser itself. */
    const paint = (value: string) => {
      ctx.fillStyle = `oklch(${value})`;
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    };
    const token = (role: string) => styles.getPropertyValue("--color-" + role);
    const relative = (rgb: number[]) => {
      const linear = rgb.map((v) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const luminance = (role: string) => relative(paint(token(role)));
    const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const pairs: [string, string, number][] = [];
    for (const bg of ["bg-canvas", "bg-surface", "bg-subtle"])
      for (const fg of ["fg-primary", "fg-secondary", "action", "feedback-error", "feedback-success"])
        pairs.push([fg, bg, 4.5]);
    pairs.push(
      ["fg-on-brand", "bg-brand", 4.5],
      ["fg-brand-muted", "bg-brand", 4.5],
      ["fg-on-action", "action", 4.5],
      ["fg-on-action", "action-hover", 4.5],
      ["fg-logo", "bg-logo", 4.5],
      // Premium restyle: gold text roles must clear the same floor as every other text role.
      ["gold", "bg-canvas", 4.5],
      ["gold", "bg-surface", 4.5],
      ["gold", "bg-subtle", 4.5],
      ["gold-display", "bg-canvas", 3.5],
      ["gold-display", "bg-surface", 3.5],
      ["gold-display", "bg-subtle", 3.5],
      ["gold-on-brand", "bg-brand", 4.5],
      ["border-strong", "bg-surface", 3],
    );
    const results = pairs.map(([fg, bg, minimum]) => ({
      fg,
      bg,
      minimum,
      ratio: contrast(luminance(fg), luminance(bg)),
    }));

    // Glass composites. axe cannot compute contrast through `backdrop-filter`: it reports those
    // nodes as "incomplete" rather than pass or fail, so nothing else in the suite arbitrates text
    // on a translucent panel. Do the source-over arithmetic here instead — composite the glass
    // colour at the alpha the element really carries over the background it really sits on, then
    // measure the foreground against that composite. Only combinations actually in use are listed.
    const composite = (top: number[], bottom: number[], alpha: number) =>
      top.map((v, i) => v * alpha + bottom[i] * (1 - alpha));
    const panel = document.querySelector("#desktop-nav-0");
    const panelAlpha = panel ? Number(getComputedStyle(panel).getPropertyValue("--glass-alpha-elevated")) : NaN;
    const cardAlpha = Number(styles.getPropertyValue("--glass-alpha"));
    // `.theme-on-brand` remaps `--color-glass` to the brand ground; read the remap rather than
    // assuming it, so a change to the scope is caught here.
    const probe = document.createElement("div");
    probe.className = "theme-on-brand";
    document.body.append(probe);
    const onBrandGlass = getComputedStyle(probe).getPropertyValue("--color-glass");
    probe.remove();

    // [foreground role, glass channel triple, background role, alpha, minimum ratio]
    const glass = token("glass");
    const layered: [string, string, string, number, number][] = [];
    // The desktop mega-menu panel spans the viewport: it overlaps the page canvas and the dark
    // industry tiles on the hub routes alike.
    for (const bg of ["bg-canvas", "bg-brand"])
      for (const fg of ["fg-primary", "fg-secondary"]) layered.push([fg, glass, bg, panelAlpha, 4.5]);
    // `.glass-card` text on the two grounds cards are laid on.
    for (const bg of ["bg-canvas", "bg-subtle"]) {
      for (const fg of ["fg-primary", "fg-secondary", "gold"]) layered.push([fg, glass, bg, cardAlpha, 4.5]);
      // `gold-display` only ever paints display numerals and gradient stops: large-text floor.
      layered.push(["gold-display", glass, bg, cardAlpha, 3]);
    }
    // Glass inside an on-brand section tints to the brand ground it sits on.
    for (const fg of ["fg-on-brand", "gold-on-brand"]) layered.push([fg, onBrandGlass, "bg-brand", cardAlpha, 4.5]);

    for (const [fg, glassValue, bg, alpha, minimum] of layered)
      results.push({
        fg,
        bg: `glass ${alpha} over ${bg}`,
        minimum,
        ratio: contrast(luminance(fg), relative(composite(paint(glassValue), paint(token(bg)), alpha))),
      });

    // Ambient video sections (2026-09-15 15:28). The `.on-video` scope carries the former dark
    // palette over a 20% black veil over moving footage. Owner ruling: the copy itself is not
    // contrast-guarded against a light frame; the Discover pill is glass, so it is, on both a black
    // and a white frame.
    const hero = document.querySelector("section[data-brand-hero]")!;
    const heroStyles = getComputedStyle(hero);
    const onVideo = (role: string) => heroStyles.getPropertyValue("--color-" + role);
    const veilAlpha = Number(heroStyles.getPropertyValue("--video-veil-alpha"));
    const pillAlpha = Number(heroStyles.getPropertyValue("--glass-alpha-elevated"));
    for (const [frame, pixel] of [
      ["black", [0, 0, 0]],
      ["white", [255, 255, 255]],
    ] as [string, number[]][]) {
      const veiled = composite([0, 0, 0], pixel, veilAlpha);
      results.push({
        fg: "on-video fg-secondary",
        bg: `on-video glass pill ${pillAlpha} over black veil ${veilAlpha} over ${frame} frame`,
        minimum: 4.5,
        ratio: contrast(
          relative(paint(onVideo("fg-secondary"))),
          relative(composite(paint(onVideo("glass")), veiled, pillAlpha)),
        ),
      });
    }
    return { panelAlpha, cardAlpha, veilAlpha, results };
  });
  // The hero runs a 55% veil (owner, 2026-09-15 16:20); the methods section keeps the 20% default.
  expect(measured.veilAlpha, "hero --video-veil-alpha").toBe(0.55);
  // A1: the panel carries its own elevated alpha, and the composite pairs above are only valid
  // for the value it actually has.
  expect(measured.panelAlpha, "mega-menu panel --glass-alpha-elevated").toBeGreaterThanOrEqual(0.92);
  console.log(
    "GLASS_COMPOSITES",
    JSON.stringify({ panelAlpha: measured.panelAlpha, cardAlpha: measured.cardAlpha }),
    JSON.stringify(
      measured.results
        .filter((r) => r.bg.startsWith("glass ") || r.bg.startsWith("on-video "))
        .map((r) => `${r.fg} on ${r.bg}: ${r.ratio.toFixed(2)}`),
    ),
  );
  for (const pair of measured.results)
    expect(pair.ratio, `${pair.fg} on ${pair.bg}`).toBeGreaterThanOrEqual(pair.minimum);
});
