import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import { RegionProvider } from "@/components/layout/region-preference";
import { MeasurementSignals } from "@/components/layout/measurement-signals";
import { QuickContact } from "@/components/layout/quick-contact";
import { MotionObserver } from "@/components/motion/motion-observer";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

/** Applies the persisted theme before first paint; pages are prerendered light. */
const THEME_INIT = `(function(){try{var m=document.cookie.match(/(?:^|; )in2it-theme=(dark|light)(?:;|$)/);if(m&&m[1]==="dark"){var c=document.documentElement.classList;c.remove("theme-light");c.add("theme-dark");}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "In2IT EBS — Enterprise transformation, delivered globally",
    template: "%s · In2IT EBS",
  },
  description:
    "10+ years of enterprise transformation, delivered globally. SAP Gold Partner with adjacent strength across Salesforce, Workday, Oracle, Microsoft, cloud and application services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`theme-light ${plex.variable}`} suppressHydrationWarning>
      <body className="grain">
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <RegionProvider>
          <MotionObserver />
          <MeasurementSignals />
          <OrganizationJsonLd />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-action focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-action"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <QuickContact />
        </RegionProvider>
      </body>
    </html>
  );
}
