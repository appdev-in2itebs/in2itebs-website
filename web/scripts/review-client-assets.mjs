import { chromium } from "@playwright/test";
import { readdir, readFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 1400 } });
for (const prefix of ["p42", "p43"]) {
  const files = (await readdir("../assets/deck-clients")).filter((f) => f.startsWith(prefix)).sort();
  const cells = await Promise.all(
    files.map(
      async (f) =>
        `<div><img src="data:image/${f.endsWith("jpeg") ? "jpeg" : "png"};base64,${(await readFile("../assets/deck-clients/" + f)).toString("base64")}"><p>${f}</p></div>`,
    ),
  );
  await page.setContent(
    `<style>body{margin:0;display:grid;grid-template-columns:repeat(5,1fr);font:12px Arial}div{height:130px;border:1px solid #ddd;text-align:center;padding:4px}img{width:190px;height:96px;object-fit:contain}p{margin:6px}</style>${cells.join("")}`,
  );
  await page.screenshot({ path: `test-results/${prefix}-asset-review.png`, fullPage: true });
}
await browser.close();
