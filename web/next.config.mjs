import { redirects as redirectMap } from "./content/redirects.mjs";

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
      ...(process.env.SITE_ENV === "production" ? [] : [{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}]),
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
