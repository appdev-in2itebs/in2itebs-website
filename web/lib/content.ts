import { clients } from "@/content/clients";
import type { Client, DeckSector } from "@/content/types";

/** Clients whose deck sector(s) intersect the given sectors (industry-client-map.md rule).
 *  Cross-listed clients (e.g. OMC, NALCO, WeWork) appear on every matching industry. */
export function getClientsBySectors(sectors: DeckSector[]): Client[] {
  if (!sectors.length) return [];
  return clients.filter((c) => c.sectors.some((s) => sectors.includes(s)));
}

/** A representative spread across sectors for the homepage / index logo walls. */
export function getFeaturedClients(limit = 24): Client[] {
  const withLogo = clients.filter((c) => c.logo);
  const seen = new Set<string>();
  const out: Client[] = [];
  for (const c of withLogo) {
    if (!seen.has(c.slug)) {
      seen.add(c.slug);
      out.push(c);
    }
    if (out.length >= limit) break;
  }
  return out;
}
