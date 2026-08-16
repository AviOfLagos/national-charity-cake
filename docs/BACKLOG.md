# Backlog

Work deliberately deferred from v1. Tracked rather than silently omitted — skipping any of these is
the org's call to make knowingly.

Ordered by what would hurt most if it stayed undone.

---

## B1 — Donation processor integration · blocked on merchant account

`/donate` renders the ladder, the bank block and the honest "checkout is not open yet" state, but no
payment is captured.

**Needs:** Paystack or Flutterwave account under the registered legal name.
**Then:** hosted checkout link in `NEXT_PUBLIC_CHECKOUT_URL`; a webhook route verifying the provider
signature, writing to the `Donations` tab and appending the matching `Ledger` row; redirect to
`/donate/thanks?reference=…`.
**Acceptance:** a test gift produces a ledger line whose reference matches the receipt email, and a
replayed webhook does not double-count.

## B2 — Receipt email

The reference is shown on screen but nothing is emailed, so a donor who closes the tab loses it.

**Acceptance:** an email arrives within 60s carrying the reference, the amount and a link to
`/transparency`; a send failure is logged with the reference and does not fail the donation.

## B3 — Rate limiter is per-instance

`src/lib/actions.ts` holds its counter in memory. On more than one instance the effective limit
multiplies, and it resets on deploy.

**Acceptance:** limiter backed by a shared store; limit holds across instances and restarts.

## B4 — E2E on the critical paths

`scripts/form-check.mjs` covers the volunteer form's validation and failure paths by hand. Nothing
runs in CI.

**Acceptance:** Playwright specs for donate → thanks and one form → Sheets, green in CI on every PR.

## B5 — axe in CI

`npm run a11y` passes clean today across 8 routes × 2 themes, but only when someone runs it.

**Acceptance:** CI fails on any new violation, and the sweep includes each form's error state.

## B6 — Ledger reconciliation check

Nothing verifies that the published ledger matches the bank. The site's entire credibility rests on
it doing so.

**Acceptance:** a documented monthly reconciliation, and a visible "reconciled to DD/MM" stamp on
`/transparency`.

## B7 — CMS for updates

Updates are typed content modules, so posting one needs a deploy. The content model is already
CMS-shaped, so this is a data-source swap rather than a rewrite.

**Acceptance:** the project team can publish an update without a developer.

## B8 — Real photography, and the image system

`docs/DIRECTION.md` defines the treatment: one grade, one crop logic, 2% grain, hairline border, and
a mandatory caption carrying what/where/when. No images exist yet.

**Acceptance:** every shipped image is a real photograph of the actual work, captioned, dated and
placed. No AI-generated imagery — on a charity appeal it is disqualifying, not merely cheap.

## B9 — Analytics and consent

No analytics, therefore no consent banner. Adding the first requires the second.

**Acceptance:** whatever is added runs only after consent, and the privacy page describes it
accurately.

## B10 — Multi-locale

Hausa, Yoruba and Igbo are plausible within 18 months. Not committed, so not built — but the routing
decision was made with it in mind.

## B11 — Peer-to-peer fundraiser pages

Each host site running its own page with its own thermometer. The obvious v2, and the thing most
likely to change the architecture, since it turns one appeal into many.
