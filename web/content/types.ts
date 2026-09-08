/** Shared content types — see docs/DATA_MODEL.md */

export type DeckSector =
  | "Food & Beverages"
  | "Health & Pharma"
  | "Apparel & Fashion"
  | "Metals & Mining"
  | "IT & Professional Services"
  | "Infra & Housing"
  | "Automotives"
  | "Chemicals"
  | "PSUs"
  | "Services & BFSI"
  | "Real Estate"
  | "Others";

export interface Client {
  slug: string;
  name: string;
  sectors: DeckSector[];
  logo: string | null; // /logos/clients/* or null -> styled wordmark fallback
}

export interface Partner {
  slug: string;
  name: string;
  logo: string | null;
}

export interface Certification {
  slug: string;
  name: string;
  logo: string | null;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Region {
  code: "IN" | "KE" | "ZA" | "ME";
  name: string;
  email: string;
}

export interface Office {
  slug: string;
  name: string;
  legalEntity: string;
  kind: ("india-office" | "global-entity" | "delivery-centre")[];
  address?: string;
  city: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface PracticeSummary {
  slug: string;
  name: string;
  tagline: string;
  href: string;
}

export interface SignatureOffering {
  slug: string;
  name: string;
  summary: string;
  metric?: string;
  href: string;
  cta: string;
}

export interface IndustryMeta {
  slug: string;
  name: string;
  headline: string;
  accentWord: string;
  subhead: string;
  deckSectors: DeckSector[];
}

export interface Insight {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}
