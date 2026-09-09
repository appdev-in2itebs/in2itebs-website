import { social, site } from "@/content/site";
import { SITE_URL } from "@/lib/utils";

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
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/in2it-ebs-navy.svg`,
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
        "@id": `${SITE_URL}/#website`,
        name: site.name,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
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
