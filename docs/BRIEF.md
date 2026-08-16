# Brief — National Charity Cake

> Phase 0. Written before looking at a single reference, to avoid design fixation.

## What this is

A national charity cake campaign: a time-bound fundraising and awareness push where people bake,
buy, sponsor or donate, and where the money raised is publicly accounted for. The website is the
canonical endpoint a shared WhatsApp message resolves to — the place where someone who was
forwarded a link decides in under a minute whether this is real, and then contributes.

## Who it's for

Ranked, because the ranking decides the layout:

1. **Cold individual donors** arriving from WhatsApp, X or Instagram. They did not seek us out. They
   are deciding whether we are a scam.
2. **Corporate partners and sponsors** evaluating whether association is safe for their brand.
3. **Volunteers and media** looking for a way in and for assets/facts respectively.

## Primary user task

**Contribute within one session** — money, goods, time or reach. Ranked: donate → partner →
volunteer → in-kind → share.

Secondary and load-bearing: **verify us**. In this market that is not a separate task, it is the
gate on the first one.

## Trust posture

**Credibility.** Not excitement.

This is the constraint the entire build is filtered through. Nigerian charity giving operates
against a documented, hostile baseline: fake medical appeals, impersonated NGOs, stolen partner
logos, solicitation via exactly the channels this campaign plans to use (social, WhatsApp, fake
sites). A 2025 entrant, Uplift Nigeria, launched positioning itself explicitly as fraud-elimination
infrastructure — meaning verification is the live competitive battle in this category, not a
hygiene factor.

Consequence: every design decision answers *does this make the operation more legible, or less?*
Polish that cannot be cashed out as evidence is a liability, because on a charity appeal an
expensive-feeling site raises the question "where is my money going" that the site exists to answer.

## Interaction budget tier

**Low.** Nearer to fintech/gov than to marketing.

Permitted: reveals that pace a narrative, counters bound to real figures, one scroll-driven
explainer of how a cake sale becomes an outcome. Forbidden: decorative motion, parallax, particle
fields, anything whose cost is visible and whose function is not.

## Stated style preference

None given. `docs/prd.md` is an ASCII structure diagram with no design direction, which is precisely
the condition this workflow exists for.

## Constraints

- **Google Sheets** as the data floor (PRD). No DBA, no ops team implied.
- No brand assets, no photography and no copy exist in the repo yet.
- No CAC number, trustee list, bank details or partner list supplied yet — these are facts only the
  organisation holds. The site is built with them as first-class, required content slots so their
  absence is visible rather than silently designed around.
- Payments must run through a hosted Paystack/Flutterwave checkout. A custom card form against a
  Sheets backend is not PCI-credible and will not be built.

## Success looks like

- A donor arriving cold can find the registration number, a named human, and where past money went,
  in under 30 seconds without leaving the first screen's reach.
- A pasted link renders a correct preview in WhatsApp, first time, before the link circulates.
- Every one of the four contribution paths lands a row in the Sheet, and the submitter sees proof.

## Explicitly out of scope

Donor accounts and login · recurring giving · multi-locale · a CMS · peer-to-peer fundraiser pages
(each host running their own cake sale page — deliberately deferred; it is the obvious v2).
