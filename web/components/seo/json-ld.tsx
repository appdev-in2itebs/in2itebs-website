import { social, site } from "@/content/site";

const BASE = "https://in2itebs.com";

/**
 * Injects Organization + WebSite JSON-LD for In2IT EBS.
 * Server component — renders a single application/ld+json script.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: BASE,
        logo: `${BASE}/brand/in2it-ebs-navy.svg`,
        description: site.description,
        sameAs: [social.linkedin, social.x, social.youtube, social.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@in2itebs.com",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        name: site.name,
        url: BASE,
        publisher: { "@id": `${BASE}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
