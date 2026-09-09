import { social, site } from "@/content/site";
import { offices } from "@/content/offices";
import { primaryNav, footerNav } from "@/content/nav";
import type { NavItem } from "@/content/types";
import { SITE_URL } from "@/lib/utils";
import { safeJsonLd } from "@/lib/json-ld";

function Script({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}

/** Organization + WebSite, rendered once from the root layout. */
export function OrganizationJsonLd() {
  const headOffice = offices.find((o) => o.slug === "bangalore");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/in2it-ebs-mark-512.png`,
        description: site.description,
        sameAs: [social.linkedin, social.x, social.youtube, social.instagram],
        telephone: headOffice?.phone,
        address: offices.filter((o) => o.address).map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.address,
          addressLocality: o.city,
          addressCountry: o.country,
        })),
        contactPoint: { "@type": "ContactPoint", email: site.primaryEmail, contactType: "customer support" },
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: site.name, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` } },
    ],
  };
  return <Script data={data} />;
}

const labels = new Map<string, string>();
function collect(items: NavItem[]) { for (const item of items) { labels.set(item.href.replace(/#.*$/, ""), item.label); if (item.children) collect(item.children); } }
collect(primaryNav);
collect([...footerNav.company, ...footerNav.practices, ...footerNav.legal]);

function labelFor(path: string) {
  const known = labels.get(path);
  if (known) return known;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** BreadcrumbList for an inner page; `name` overrides the label of the final crumb. */
export function BreadcrumbJsonLd({ path, name }: { path: string; name?: string }) {
  const segments = path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  let current = "";
  for (const [index, segment] of segments.entries()) {
    current += `/${segment}`;
    const crumbPath = `${current}/`;
    items.push({ name: index === segments.length - 1 && name ? name : labelFor(crumbPath), item: `${SITE_URL}${crumbPath}` });
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, position) => ({ "@type": "ListItem", position: position + 1, name: item.name, item: item.item })),
  };
  return <Script data={data} />;
}

/** Article schema for an insight. */
export function ArticleJsonLd({ slug, title, date, excerpt, author }: { slug: string; title: string; date: string; excerpt: string; author?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    ...(date ? { datePublished: date } : {}),
    author: author ? { "@type": "Person", name: author } : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/insights/${slug}/`,
  };
  return <Script data={data} />;
}
