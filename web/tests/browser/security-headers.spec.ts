import { test, expect } from "@playwright/test";
test("security headers are present and the CSP breaks nothing", async ({ page, request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  const violations: string[] = [];
  page.on("console", (message) => {
    if (/Content Security Policy/i.test(message.text())) violations.push(message.text());
  });
  for (const path of ["/", "/contact/", "/sap-enterprise-solutions/rise-vs-grow/", "/partners/"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("img").first()).toBeVisible();
  }
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/theme-dark/);
  expect(violations).toEqual([]);
});
