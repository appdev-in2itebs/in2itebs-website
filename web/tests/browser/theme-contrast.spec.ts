import { test, expect } from "@playwright/test";
for (const theme of ["light", "dark"])
  test(`${theme} semantic colour contrast`, async ({ page, context }) => {
    await context.addCookies([{ name: "in2it-theme", value: theme, domain: "127.0.0.1", path: "/" }]);
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
      // Ambient video sections (2026-09-15). The copy sits on a canvas-coloured wash over a brand
      // tint over moving footage. Nothing can measure that live, so pin the worst case: the wash
      // at the alpha each `.video-wash-copy` block carries, over the tint, over a pure black and a
      // pure white frame. The alphas are read from the hero itself so a retune is caught here.
      // Ruling 2026-09-15 pm: the owner asked for more footage through the band and the methods
      // wash, so body and muted copy keep the 4.5:1 floor there while the small gold labels (the
      // eyebrows and the method codes) hold 3:1 against the worst-case frame instead.
      const hero = document.querySelector("section[data-brand-hero]");
      const heroStyles = hero ? getComputedStyle(hero) : styles;
      const methodsSection = document.querySelector("section[data-methods]");
      const methodsStyles = methodsSection ? getComputedStyle(methodsSection) : styles;
      const videoTint = Number(heroStyles.getPropertyValue("--video-tint-alpha"));
      const videoWash = Number(heroStyles.getPropertyValue("--video-wash-copy"));
      const videoMethods = Number(methodsStyles.getPropertyValue("--video-wash-methods"));
      for (const [label, alpha] of [
        ["hero band", videoWash],
        ["methods wash", videoMethods],
      ] as [string, number][])
        for (const [frame, pixel] of [
          ["black", [0, 0, 0]],
          ["white", [255, 255, 255]],
        ] as [string, number[]][]) {
          const tinted = composite(paint(token("bg-brand")), pixel, videoTint);
          const washed = composite(paint(token("bg-canvas")), tinted, alpha);
          for (const fg of ["fg-primary", "fg-secondary", "gold"])
            results.push({
              fg,
              bg: `video ${label} ${alpha} over tint ${videoTint} over ${frame} frame`,
              minimum: fg === "gold" ? 3 : 4.5,
              ratio: contrast(luminance(fg), relative(washed)),
            });
        }
      // The hero's Discover link sits on a glass pill over the veil, not over the copy wash.
      const videoBase = Number(heroStyles.getPropertyValue("--video-wash-base"));
      const pillAlpha = Number(styles.getPropertyValue("--glass-alpha-elevated"));
      for (const [frame, pixel] of [
        ["black", [0, 0, 0]],
        ["white", [255, 255, 255]],
      ] as [string, number[]][]) {
        const veiled = composite(
          paint(token("bg-canvas")),
          composite(paint(token("bg-brand")), pixel, videoTint),
          videoBase,
        );
        results.push({
          fg: "fg-secondary",
          bg: `glass pill ${pillAlpha} over video veil ${videoBase} over ${frame} frame`,
          minimum: 4.5,
          ratio: contrast(luminance("fg-secondary"), relative(composite(paint(glass), veiled, pillAlpha))),
        });
      }
      return { panelAlpha, cardAlpha, videoTint, videoWash, videoBase, videoMethods, results };
    });
    expect(measured.videoTint, "hero --video-tint-alpha").toBeGreaterThan(0);
    expect(measured.videoWash, "hero --video-wash-copy").toBeGreaterThan(0);
    // The band is meant to show footage through it (owner, 2026-09-15 pm): keep it translucent.
    expect(measured.videoWash, "hero --video-wash-copy").toBeLessThanOrEqual(0.85);
    expect(measured.videoBase, "hero --video-wash-base").toBeGreaterThan(0);
    expect(measured.videoMethods, "methods --video-wash-methods").toBeGreaterThan(0);
    // A1: the panel carries its own elevated alpha, and the composite pairs above are only valid
    // for the value it actually has.
    expect(measured.panelAlpha, "mega-menu panel --glass-alpha-elevated").toBeGreaterThanOrEqual(0.92);
    console.log(
      `GLASS_COMPOSITES ${theme}`,
      JSON.stringify({ panelAlpha: measured.panelAlpha, cardAlpha: measured.cardAlpha }),
      JSON.stringify(
        measured.results
          .filter((r) => r.bg.startsWith("glass ") || r.bg.startsWith("video "))
          .map((r) => `${r.fg} on ${r.bg}: ${r.ratio.toFixed(2)}`),
      ),
    );
    for (const pair of measured.results)
      expect(pair.ratio, `${theme}: ${pair.fg} on ${pair.bg}`).toBeGreaterThanOrEqual(pair.minimum);
  });
