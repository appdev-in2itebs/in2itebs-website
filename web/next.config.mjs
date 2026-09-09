import { redirects as redirectMap } from "./content/redirects.mjs";

const siteEnv = process.env.SITE_ENV;
if (process.env.NODE_ENV === "production" && siteEnv !== "production" && siteEnv !== "preview") {
  throw new Error(
    "SITE_ENV must be set to 'production' or 'preview' for next build and next start. " +
    "It is read at build time and decides robots.txt and the X-Robots-Tag header. See docs/REMEDIATION_RUNBOOK.md.",
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  async headers() {
    return [{source:"/:path*",headers:[
      {key:"X-Content-Type-Options",value:"nosniff"},
      {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
      {key:"X-Frame-Options",value:"DENY"},
      {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
      ...(siteEnv === "production" ? [] : [{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}]),
    ]}];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return redirectMap;
  },
};

export default nextConfig;
