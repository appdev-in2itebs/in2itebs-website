import type { MetadataRoute } from "next";

const BASE = "https://in2itebs.com";

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_ENV !== "production") return {rules:{userAgent:"*",disallow:"/"}};
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
