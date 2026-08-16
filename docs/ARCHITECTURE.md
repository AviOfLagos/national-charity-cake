# Architecture — National Charity Cake

> Phase 3. Pages first, stack second.

## Page inventory

| Route | Job | Primary action | Content source | Public | Indexation |
|---|---|---|---|---|---|
| `/` | Prove we are real and state the promise about where money goes, above the fold | Donate | content module | yes | index, canonical self |
| `/donate` | Remove every barrier between intent and payment | Give | content + processor | yes | index |
| `/donate/thanks` | Echo the receipt reference; ask the optional questions we refused to ask before payment | Share | query param + Sheets | yes | **noindex** |
| `/transparency` | The differentiator. Registration, trustees, bank details, and the public money ledger | Verify | Sheets (ledger) + content | yes | index |
| `/impact` | What the money bought, dated | Donate | content module | yes | index |
| `/about` | What the campaign is and why it exists | Donate | content | yes | index |
| `/leadership` | Named humans with photos, bios, LinkedIn | — | content | yes | index |
| `/partners` | Logo wall where **every logo links to outbound proof** | Partner | content | yes | index |
| `/partner` | Corporate partnership enquiry | Submit | → Sheets | yes | index |
| `/volunteer` | Volunteer sign-up | Submit | → Sheets | yes | index |
| `/in-kind` | In-kind / goods pledge | Submit | → Sheets | yes | index |
| `/updates` | Campaign updates index | Read | content | yes | index |
| `/updates/[slug]` | One update | Share | content | yes | index, canonical self |
| `/reports` | Annual report / audited accounts PDFs | Download | content | yes | index |
| `/media` | Press kit, logo pack, fact sheet, contact | Download | content | yes | index |
| `/faq` | Answer the objections, including "how do I know you're real" | Donate | content | yes | index |
| `/contact` | Physical address, phone that answers, email | Contact | content | yes | index |
| `/privacy`, `/terms` | Legal | — | content | yes | index |
| `not-found`, `error` | 404 / 500 | Return home | — | yes | noindex |

Empty and first-run states are first-class: `/updates`, `/impact`, `/partners` and the
`/transparency` ledger all render a designed zero-state, because at launch every one of them will be
empty and a blank region reads as abandonment.

## Responsive strategy

Breakpoints 375 / 768 / 1440. The signature move degrades rather than hides:

- **Ledger tables** become stacked label/value rows below 768, keeping tabular numerals and the
  hairline rule. They never become a horizontal scroll region for the primary figures.
- **Index numbering** on sections drops from the margin to inline before the heading.
- **Column measure** is capped at ~68ch on all sizes; on mobile the document gutter shrinks but the
  rule system stays, because the rules *are* the layout.

## Content model

One module, `lib/content/`. Components read; nobody hardcodes a string.

```ts
export type Money = { amountKobo: number; currency: 'NGN' }

export type LedgerEntry = {         // drives /transparency — the differentiator
  id: string
  date: string                      // ISO
  direction: 'in' | 'out'
  amount: Money
  description: string
  category: 'donation' | 'grant' | 'programme' | 'logistics' | 'admin'
  reference?: string                // processor ref or voucher no.
  proofUrl?: string                 // receipt / invoice, when publishable
}

export type Partner = {
  slug: string; name: string; logo: string
  proofUrl: string                  // REQUIRED — no unlinked logos ship
  tier: 'headline' | 'supporting' | 'in-kind'
}

export type Person = {
  slug: string; name: string; role: string; photo: string
  bio: string; linkedin?: string
  isTrustee: boolean
}

export type GivingTier = {          // the unit-cost ladder, never a bare amount box
  amountKobo: number
  buys: string                      // "feeds a family of four for a week"
}

export type Update  = { slug: string; title: string; date: string; excerpt: string; body: string; cover?: Image }
export type Report  = { slug: string; title: string; period: string; fileUrl: string; sizeBytes: number }
export type Faq     = { q: string; a: string; group: 'giving' | 'trust' | 'volunteering' }
export type ImpactStat = { label: string; value: number; unit?: string; asOf: string }   // asOf REQUIRED
export type Image   = { src: string; alt: string; caption: string; place: string; date: string }  // caption/place/date REQUIRED

export type Org = {                 // the trust block, rendered in every footer
  legalName: string
  cacNumber: string                 // CAC Incorporated Trustees no.
  cacSearchUrl: string
  taxExemptRef?: string             // FIRS, if held
  address: string; phone: string; email: string
  bank: { accountName: string; accountNumber: string; bankName: string }  // accountName renders FIRST
}
```

Every one of these is populated from a `TODO` placeholder that renders visibly as "not yet supplied"
rather than as empty space — the missing CAC number must be conspicuous to the team, not invisible
to the donor.

## Rendering decision

**Will any URL be read by a machine that does not run JavaScript?** **Yes — and it is the primary
distribution channel.** WhatsApp's crawler executes no JavaScript: a client-rendered SPA serves a
bare shell, so `og:*` tags set from React state produce a naked grey link. The PRD names WhatsApp in
its first branch.

- [x] 1. Public routes exist
- [x] 2. Links pasted into WhatsApp / X / Slack
- [x] 3. Content count will grow — updates, reports, media, ledger
- [x] 4. Content from a data source (Sheets)
- [x] 5. PRD literally says "SEO/PR"
- [ ] 6. Multi-locale within 18 months — plausible (Hausa/Yoruba/Igbo) but not committed
- [ ] 7. Pricing or comparison pages
- [x] 8. LLM discoverability — AI crawlers run no JS
- [ ] 9. Marketing and app share a codebase
- [x] 10. Link previews must render

**Score: 7 / 10.**

## Decision record

```
Rendering:   SSG + selective SSR / ISR (dynamic only for the Sheets-backed ledger and thermometer)
Framework:   Next.js App Router
Signals:     1, 2, 3, 4, 5, 8, 10 — score 7
Rejected:    Vite SPA — fails every signal. AI crawlers and social unfurlers execute no
             JavaScript, so a client-rendered appeal is invisible in exactly the channel
             the PRD names first.
             Astro — wins on prose weight, loses on the four server-side write paths and
             per-route OG generation, which are the load-bearing parts here.
Consequence: all indexable content renders server-side; client-only fetching is permitted
             only inside form interactivity. `ssr: false` on any indexable content is a
             defect, not a workaround.
```

## Metadata plan

Root: `metadataBase`, `title.template`, default `openGraph`/`twitter`. Per route, the primary query
it answers and the one-sentence answer, which then dictates the `<h1>`, the title and the first
paragraph.

| Route | Primary query | OG image | JSON-LD |
|---|---|---|---|
| `/` | "national charity cake" / "charity cake campaign Nigeria" | generated, carries the live total | `Organization` + `NGO`, incl. registration id |
| `/donate` | "donate national charity cake" | generated, carries the ladder | `DonateAction` |
| `/transparency` | "is national charity cake legit" — **the highest-intent query in this category** | generated | `Organization` w/ `identifier` |
| `/updates/[slug]` | per-update | generated per update | `NewsArticle` |
| `/faq` | objection queries | static | `FAQPage` |

OG images: 1200×630, PNG or JPEG (**not** GIF/SVG), under ~300KB — WhatsApp is stricter than
Facebook on size. Generated at build time via `opengraph-image.tsx`, wrapped in try/catch with a
static fallback, because a throwing OG route silently kills every share of that page. WhatsApp caches
previews aggressively, so these ship **before** any link circulates.

## Quality scope

In for v1:

- [x] Accessibility WCAG 2.2 AA
- [x] SEO / metadata / OG / sitemap / robots / JSON-LD
- [x] Error boundaries, 404, and the four states on every data surface
- [x] Types strict + zod validation at every boundary
- [x] Security headers, secrets server-side only, honeypot + timing check + rate limit on all four
      public forms
- [x] Performance budgets — LCP is the thing to protect

Deferred to `assets/backlog.md`, as tracked work rather than silent omission:

- [ ] E2E on the critical paths (donate, and one form)
- [ ] CMS for updates
- [ ] Multi-locale
- [ ] Peer-to-peer fundraiser pages
