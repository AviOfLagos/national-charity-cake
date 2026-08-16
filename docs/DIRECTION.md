# Direction — National Charity Cake

> Phase 2. The proposal, and the record of what was decided.

## References studied

| Site | Signature move | Worth stealing | Over-engineered here |
|---|---|---|---|
| [Slum2School](https://slum2school.org) | CAC/IT/58643 **and** US EIN 92-3176622 displayed as design elements, not fine print | Registration numbers set in the type system, at readable size | Dual-jurisdiction structure |
| [Aig-Imoukhuede Foundation](https://www.aigimoukhuedefoundation.org) | "Our Financials" as a **top-level nav item** | Promote transparency out of the footer and into the nav | Grantmaker application architecture |
| [Nigeria Solidarity Support Fund](https://nigeriasolidarityfund.ng) | National fund w/ named advisory board + NSIA backing | Third-party institutional corroboration named on the appeal | Multi-programme sprawl; its donate CTA has decayed to tertiary — a warning, not a model |
| [DEC](https://www.dec.org.uk) | Crisis hero + three costed tiers immediately below the fold, nothing between | That exact above-the-fold compression | Multi-appeal architecture |
| [charity: water](https://www.charitywater.org) | The 100% model + proof-of-destination | **One memorable, repeatable promise about where money goes, stated in the hero** | Per-donation GPS project tracking |
| [GiveDirectly](https://www.givedirectly.org) | The fraction reaching recipients stated plainly, backed by external evaluation | Publish the % split; cite an outside verifier | RCT evidence library |
| [Farm Africa](https://www.farmafrica.org) | Interaction used to explain the model, not decorate | One scroll explainer: cake sale → outcome | Bespoke illustration budget |
| [Obama Foundation](https://www.obama.org) | Editorial confidence; typographic scale as the whole hero | Type doing the work a stock photo usually does | Hero video production |
| [donate-ng](https://donate-ng.com) | Campaign cards + progress bars | The local convention for a raise-vs-goal readout | Its craft level generally |
| [Uplift Nigeria](https://upliftnigeria.com) | Launched 2025 as anti-fraud charity infrastructure | Confirms the positioning battle; verification is the product | Platform ambitions |

## Adjacent-niche donors

| Donor domain | Why isomorphic | Structural map | What we take |
|---|---|---|---|
| **DEC** (UK disaster appeals) | 63 years old, regulator-supervised, must convert cold traffic in 72h | their appeal → our campaign · their 15 member charities → our partners/chapters · their £10/£50/£100 ladder → our ₦ ladder · "Registered Charity No. 1062638" → our CAC/IT number · "£2.5bn raised over 80 appeals" → our cumulative totals. **Constraint map:** they must prove coalition legitimacy because donors don't know the members → we must prove legitimacy because donors *assume fraud*. Same solution, higher urgency. Their regulator-mandated post-appeal reporting → our voluntary but load-bearing money ledger | Costed tiers above the fold; post-appeal reporting as a permanent surface |
| **Crowdfunding** (GoFundMe, donate-ng) | Share-first distribution, identical to ours | their campaign page → our appeal page · raised-vs-goal bar → our thermometer · donor wall → our live gift feed (Sheets drives it trivially) · share sheet → WhatsApp share. **Constraint:** the page must be legible *inside the preview card*, before anyone clicks | The thermometer, the recent-gifts feed, and the hard requirement that OG tags are server-rendered |
| **E-commerce checkout** (hosted Paystack/Flutterwave) | Same drop-off physics | cart → gift amount · trust badges → payment-provider logos · order confirmation + receipt → **donation receipt** · guest checkout → no-account donation · abandoned cart → donate drop-off. **Constraint:** every extra field costs conversion — and a Sheets backend tempts you to collect employer, address, how-did-you-hear | Collect nothing beyond the minimum before payment; ask everything else on the thank-you page |

## What research says, and what we do about it

The trust findings replace review mining here (the product has no users yet). Severity is against the
primary task, since in this market verification gates donation entirely.

| Finding | Severity | Source quality |
|---|---|---|
| Documented scam mechanics: impersonated NGOs, **stolen logos**, fabricated stories, solicited via social + WhatsApp + fake websites | 4 | Reported; [Punch](https://punchng.com/exploiting-compassion-how-fake-patients-weaponise-pity-to-defraud-nigerians/) headline claim only — body text unfetchable |
| Personal (rather than corporate) bank account is the #1 scam tell donors screen for | 4 | Convention, corroborated across sources |
| ~60% hesitant to donate to any charity regardless of legitimacy; ~70% say trust is essential, ~20% report high trust | 3 | **Secondary citation only, untraced to a primary study — directional, not quotable.** Flagged in the research; do not put these numbers on the site |
| Unlinked partner logos now carry *less* weight, because stolen logos are a known technique | 3 | Follows from the above |

**Recommendations that follow.** Each becomes a route or section in `ARCHITECTURE.md`.

| Finding | What we do | Where it lands |
|---|---|---|
| Registration is the strongest legitimacy token | CAC Incorporated Trustees number in the footer of **every** page, in the type system, plus a link to CAC public search | Global footer + `/transparency` |
| Personal-account tell | Bank block shows account **name** first, in the org's exact registered name, never a person's | `/donate`, `/transparency` |
| Anonymity reads as fraud | Named trustees/leadership with photos, real bios, outbound LinkedIn | `/leadership` |
| Stolen-logo problem | Every partner logo is a **link to an outbound proof** — the article, the press release, the partner's own page. No unlinked logos ship | `/partners` |
| Receipts convert skepticism | Automatic receipt with the processor reference echoed back on-screen and by email | `/donate/thanks` |
| Nothing beats showing the money | **A public "where the money went" ledger**, driven by Sheets. Nearly free for us; no competitor above has one | `/transparency` — the differentiator |
| Institutional corroboration (DEC/NSSF pattern) | Named bank, state body, corporate or media partner on the appeal itself | `/` hero region |
| Hosted checkout reads as safer than a custom form | Paystack/Flutterwave hosted checkout + visible bank transfer + USSD | `/donate` |

## Conventions we will not break

Jakob's Law constraints from the direct competitors — breaking these costs trust for no gain:

- Registration number visible in footer and About.
- Named humans with photos.
- A partner/funder logo wall (ours is linked).
- A **unit-cost giving ladder** — "₦5,000 = X", never a bare amount box.
- Impact counters carry a date or period.
- Physical Lagos/Abuja address and a phone number that answers. Absence of a phone number reads as
  scam.
- Three distinct CTAs — Donate / Partner / Volunteer — never collapsed into one.

## The pole we are rejecting

**The NGO template.** Full-bleed hero photo of beneficiaries (usually children) under a dark scrim
with white text, one saturated brand colour against white, Poppins or Montserrat, rounded pill
buttons, three-up outline-icon "pillar" cards, animated counters, a grey unlinked logo strip,
generic WordPress rhythm.

Rejected for a specific reason, not taste: it is what every template produces, so it is what every
*fake* appeal also produces. In a market where impersonation is the documented attack, looking
exactly like the category default is indistinguishable from looking like the fraud. And it depends
on beneficiary photography we do not have and would be tempted to fake — AI-generated imagery on a
charity appeal is disqualifying.

Also checked against and avoided (the AI-default attractor states): warm cream ground with
high-contrast serif display and terracotta `#D97757`; untouched Tailwind `indigo-500`; purple-to-blue
mesh gradient blobs; Corporate Memphis illustration; centred hero over three feature cards.

## DNA blend

≈50% **DEC** — skeleton and conversion grammar: compressed above-the-fold, costed tiers, appeal-first
information order.
≈35% **GiveDirectly / charity: water** — content model and legibility: one repeatable promise about
where money goes, stated numerically, backed by an outside check.
≈15% **Aig-Imoukhuede** — transparency promoted into navigation, and the institutional register that
makes a national campaign read as real.

## Art direction

- **Signature move: the receipt.** The visual system is an archival financial record — ruled ledger
  lines, tabular monospace numerals, stamped reference numbers, index numbering on sections, a
  document-like column measure. The money's path *is* the art direction.

  Chosen because it is the one move that is simultaneously the differentiator and the answer to the
  category's actual problem. It says "we are accountable" structurally rather than by claiming it in
  a headline, it is legible at WhatsApp-preview size, it costs nothing in LCP, and — decisively — it
  requires **no photography**, which we do not have and must not fabricate. Where real documentary
  photographs arrive, they enter as evidence exhibits inside the record, captioned and dated, with a
  single grade applied to every one.

- **Light direction:** single, from above. One shadow ramp, used sparingly — this is a paper system,
  so depth comes from rules and insets more than from shadow.
- **Background layer strategy:** two grounds only, paper and ink, plus one raised surface. Section
  separation is done with **hairline rules and generous measure**, never with alternating tinted
  bands (that is the WordPress rhythm we are rejecting).
- **Grain / texture:** global paper grain at 3% opacity, one layer, over the whole page. Off under
  `prefers-reduced-motion`? No — it is static, so it stays; but it is removed under `forced-colors`.
- **Gradient role:** none, except a single ink-to-transparent scrim if a photograph ever needs text
  over it. There are no decorative gradients in this system.
- **Image treatment rule** (every asset, no exceptions): 4:3 or 3:2 crop, one warm grade, 2% grain to
  match the page, hairline rule border, and a **mandatory caption carrying what/where/when**. An
  uncaptioned image does not ship — on this site an image is evidence, and undated evidence is
  decoration.

## Tokens

Values in OKLCH, each verified in gamut (out-of-gamut values are silently clamped by the browser,
which would invalidate any contrast check run against the nominal number).

| Role | Light | Dark | Notes |
|---|---|---|---|
| `--bg` | `oklch(0.971 0.004 95)` | `oklch(0.178 0.012 60)` | Warm paper / warm ink. Never pure white or black |
| `--bg-soft` | `oklch(0.945 0.006 90)` | `oklch(0.223 0.013 60)` | Raised surfaces, ledger rows |
| `--ink` | `oklch(0.205 0.015 60)` | `oklch(0.955 0.005 90)` | |
| `--muted` | `oklch(0.505 0.014 65)` | `oklch(0.700 0.012 75)` | Captions, dates, meta |
| `--line` | `oklch(0.205 0.015 60 / 0.14)` | `oklch(0.955 0.005 90 / 0.16)` | The hairline that does the layout work |
| `--accent` | `oklch(0.545 0.195 22)` | `oklch(0.640 0.185 22)` | Deep cherry. Exactly one, re-tuned per theme |
| `--accent-ink` | `oklch(0.985 0.004 90)` | `oklch(0.160 0.012 40)` | Text on accent |
| Display face | **Bricolage Grotesque** (variable) | | Opinionated; deliberately not Poppins/Montserrat |
| Mono face | **IBM Plex Mono** | | **Every numeral on the site**, tabular figures |

The accent lands in exactly three places and nowhere else: the primary CTA, the ledger's inflow
figures, and the current-total readout. Deep cherry rather than the category's green/orange/navy, and
deliberately not terracotta — it reads as celebratory enough for cake and serious enough for money.

Themes shipped: light · dark · system. Also handled: `forced-colors: active` · `prefers-contrast: more`.

## Interaction budget

**Tier: low** (fintech/gov-adjacent, per the brief).

Permits: one-shot fade-up reveals at 200–300ms on section entry; a CountUp on the total that animates
only on first view and only from a real figure; the scroll explainer of cake sale → outcome;
focus and hover states with real affordance.

Forbids: parallax, particle systems, cursor followers, marquees, scroll-jacking, 3D, staggered
letter-by-letter type, anything with a visible cost. All motion respects `prefers-reduced-motion`,
and no content is ever gated behind an animation.

## Open question for the user

**Mood: solemn or celebratory?** Cake is joy; the cause underneath usually is not. The system above
is tuned to about 70/30 toward solemn — a financial record with warmth in the accent. Tell us if the
campaign's actual tone is closer to a national street party, and the same tokens re-tune in one
commit (the accent widens its role, the grain lifts, the ladder gets photographic).

Colour, type scale and easing are decided here and defended, not put to a vote.
