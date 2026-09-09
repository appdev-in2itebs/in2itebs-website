import { primaryNav, footerNav } from "@/content/nav";
import type { NavItem } from "@/content/types";
import { SITE_URL } from "@/lib/utils";

/** JSON.stringify that cannot terminate the surrounding <script> element. */
export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const labels = new Map<string, string>();
function collect(items: NavItem[]) { for (const item of items) { labels.set(item.href.replace(/#.*$/, ""), item.label); if (item.children) collect(item.children); } }
collect(primaryNav);
collect([...footerNav.company, ...footerNav.practices, ...footerNav.legal]);

/** True when the path is a navigable page, i.e. somewhere in the primary or footer nav. */
export function isKnownPage(path: string) {
  return labels.has(path);
}

export function labelFor(path: string) {
  const known = labels.get(path);
  if (known) return known;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Breadcrumb trail for `path`: Home first, then one crumb per segment, all absolute.
 * `name` overrides the label of the final crumb, which is always emitted.
 * An intermediate crumb is emitted only when `isPage(crumbPath)` — a level with no
 * page of its own (for example `/legal/`) would otherwise link to a 404.
 */
export function breadcrumbItems(
  path: string,
  name?: string,
  isPage: (p: string) => boolean = () => true,
): { name: string; item: string }[] {
  const segments = path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  let current = "";
  for (const [index, segment] of segments.entries()) {
    current += `/${segment}`;
    const crumbPath = `${current}/`;
    const isLast = index === segments.length - 1;
    if (!isLast && !isPage(crumbPath)) continue;
    items.push({ name: isLast && name ? name : labelFor(crumbPath), item: `${SITE_URL}${crumbPath}` });
  }
  return items;
}
