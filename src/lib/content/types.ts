/**
 * The content model. One shape per entity, CMS-shaped from day 0 so swapping the
 * source later is a data-source change rather than a component rewrite.
 *
 * Money is stored in KOBO (integer minor units). Never floats — a charity ledger
 * that drifts by a rounding error is a charity ledger nobody trusts.
 */

export type Money = { amountKobo: number; currency: "NGN" };

export const naira = (amountKobo: number): Money => ({ amountKobo, currency: "NGN" });

/** A value the organisation must supply. Rendered conspicuously when absent. */
export type Pending<T> = T | { __pending: true; note: string };

export const pending = (note: string) => ({ __pending: true as const, note });

export const isPending = <T,>(v: Pending<T>): v is { __pending: true; note: string } =>
  typeof v === "object" && v !== null && "__pending" in v;

/** Every image on this site is evidence. Undated evidence is decoration. */
export type Evidence = {
  src: string;
  alt: string; // describes function, not appearance
  caption: string;
  place: string;
  date: string; // ISO
};

export type LedgerEntry = {
  id: string;
  date: string; // ISO
  direction: "in" | "out";
  amount: Money;
  description: string;
  category: "donation" | "grant" | "programme" | "logistics" | "admin";
  reference?: string; // processor ref or voucher number
  proofUrl?: string; // receipt or invoice, where publishable
};

export type Partner = {
  slug: string;
  name: string;
  logo?: string;
  /** REQUIRED. Stolen logos are a documented scam technique, so an unlinked
   *  logo now carries less weight than none. No unlinked logo ships. */
  proofUrl: string;
  proofLabel: string;
  tier: "headline" | "supporting" | "in-kind";
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  bio: string;
  linkedin?: string;
  isTrustee: boolean;
};

/** The unit-cost ladder. Never a bare amount box — a category convention we keep. */
export type GivingTier = {
  amountKobo: number;
  buys: string;
};

export type Update = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  cover?: Evidence;
};

export type Report = {
  slug: string;
  title: string;
  period: string;
  fileUrl: string;
  sizeBytes: number;
};

export type Faq = {
  q: string;
  a: string;
  group: "trust" | "giving" | "volunteering";
};

/** asOf is required: an impact counter without a date is a claim, not a figure. */
export type ImpactStat = {
  label: string;
  value: number;
  unit?: string;
  asOf: string;
  note?: string;
};

export type Org = {
  name: string;
  legalName: Pending<string>;
  tagline: string;
  /** CAC Incorporated Trustees number — the single strongest legitimacy token
   *  in this market. Rendered in the footer of every page. */
  cacNumber: Pending<string>;
  cacSearchUrl: string;
  taxExemptRef?: Pending<string>; // FIRS, if held
  address: Pending<string>;
  phone: Pending<string>;
  email: string;
  /** accountName renders FIRST and must be the org's exact registered name.
   *  A personal account number is the #1 scam tell donors screen for. */
  bank: Pending<{ accountName: string; accountNumber: string; bankName: string }>;
};
