import {
  pending,
  type Faq,
  type GivingTier,
  type ImpactStat,
  type Org,
  type Partner,
  type Person,
  type Report,
  type Update,
} from "./types";

export * from "./types";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nationalcharitycake.org",
  name: "National Charity Cake",
  /** The one repeatable promise about where money goes, stated in the hero.
   *  Borrowed structurally from charity: water and GiveDirectly. */
  promise: "Every naira is published. You can read the ledger before you give.",
  campaignGoalKobo: 50_000_000_00, // ₦50,000,000
} as const;

/**
 * The trust block. Values the organisation must supply — left as `pending` so
 * they render as a visible, labelled gap rather than quietly vanishing. A
 * missing CAC number should be conspicuous to the team and never invisible to
 * the donor.
 */
export const org: Org = {
  name: "National Charity Cake",
  legalName: pending("Registered name on the CAC certificate"),
  tagline: "A national bake. A public ledger.",
  cacNumber: pending("CAC Incorporated Trustees number, e.g. CAC/IT/NO/000000"),
  cacSearchUrl: "https://search.cac.gov.ng/home",
  taxExemptRef: pending("FIRS tax-exemption reference, if held"),
  address: pending("Registered office address, with state"),
  phone: pending("A phone number that is answered during working hours"),
  email: "hello@nationalcharitycake.org",
  bank: pending("Account name (exact registered name), number and bank"),
};

/** The costed ladder, sitting immediately below the fold. The DEC pattern. */
export const givingTiers: GivingTier[] = [
  { amountKobo: 2_000_00, buys: "ingredients for one cake at a community bake" },
  { amountKobo: 5_000_00, buys: "a week of meals for a family of four" },
  { amountKobo: 25_000_00, buys: "a full bake station for a host site" },
  { amountKobo: 100_000_00, buys: "one community kitchen, running for a month" },
];

export const impactStats: ImpactStat[] = [
  {
    label: "Raised so far",
    value: 0,
    asOf: "2026-08-16",
    note: "Figure is drawn from the published ledger, not from a target.",
  },
  { label: "Cakes baked", value: 0, asOf: "2026-08-16" },
  { label: "Host sites", value: 0, asOf: "2026-08-16" },
  { label: "Volunteers signed up", value: 0, asOf: "2026-08-16" },
];

/** Every logo links to outbound proof, or it does not appear. */
export const partners: Partner[] = [];

export const people: Person[] = [];

export const updates: Update[] = [];

export const reports: Report[] = [];

export const faqs: Faq[] = [
  {
    group: "trust",
    q: "How do I know this is real and not a scam?",
    a: "Three checks you can run yourself, right now. Our CAC Incorporated Trustees registration number is in the footer of every page and can be looked up on the CAC public register. Our trustees are named on the leadership page with photographs and real bios. And every naira in and out is published on the transparency page, with processor references you can match against your own receipt.",
  },
  {
    group: "trust",
    q: "Where does my money actually go?",
    a: "Into a bank account held in the organisation's exact registered name — never a personal account. Every inflow and outflow is entered in the public ledger with a date, a category and, where publishable, the receipt or invoice.",
  },
  {
    group: "trust",
    q: "Do you take card details on this site?",
    a: "No. Payment happens on a hosted Paystack or Flutterwave checkout, and card details never touch our servers. You can also transfer directly to the bank account published on the donate page, or give by USSD.",
  },
  {
    group: "giving",
    q: "Can I give from outside Nigeria?",
    a: "Yes. The hosted checkout accepts international cards. Amounts are shown in naira.",
  },
  {
    group: "giving",
    q: "Will I get a receipt?",
    a: "Immediately. The reference number appears on screen the moment payment completes, and the same reference is emailed to you. Keep it — it is what matches your gift to a line in the public ledger.",
  },
  {
    group: "volunteering",
    q: "What does volunteering involve?",
    a: "Baking, hosting a sale, logistics on the day, or helping with media. Tell us what you have time for on the volunteer form and someone from the project team will follow up.",
  },
  {
    group: "volunteering",
    q: "Can my company partner with the campaign?",
    a: "Yes — as a headline partner, a supporting partner, or in kind. Use the partner form and we will send the partnership pack.",
  },
];

/** Nav is content too: transparency is promoted OUT of the footer. */
export const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/impact", label: "Impact" },
  { href: "/transparency", label: "Transparency" },
  { href: "/partners", label: "Partners" },
  { href: "/updates", label: "Updates" },
] as const;

export const contributeNav = [
  { href: "/donate", label: "Donate" },
  { href: "/partner", label: "Partner" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/in-kind", label: "Give in kind" },
] as const;

export const footerNav = [
  { href: "/leadership", label: "Leadership" },
  { href: "/reports", label: "Reports & accounts" },
  { href: "/media", label: "Media" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
