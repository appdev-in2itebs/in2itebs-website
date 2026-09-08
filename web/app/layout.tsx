import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { resolveTheme } from "@/lib/themes";
import { RegionProvider } from "@/components/layout/region-preference";
import { MeasurementSignals } from "@/components/layout/measurement-signals";
import { QuickContact } from "@/components/layout/quick-contact";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "In2IT EBS — Enterprise transformation, delivered globally",
    template: "%s · In2IT EBS",
  },
  description:
    "10+ years of enterprise transformation, delivered globally. SAP Gold Partner with adjacent strength across Salesforce, Workday, Oracle, Microsoft, cloud and application services.",
  openGraph: {
    type: "website",
    siteName: "In2IT EBS",
    url: SITE_URL,
    title: "In2IT EBS — Enterprise transformation, delivered globally",
    description:
      "SAP Gold Partner. 300+ consultants. Salesforce, Workday and application services across 30+ countries.",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = resolveTheme((await cookies()).get("in2it-theme")?.value);
  return (
    <html lang="en" className={`theme-${theme} ${plex.variable}`}>
      <body className="grain">
        <RegionProvider>
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
