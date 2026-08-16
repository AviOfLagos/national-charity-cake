# National Charity Cake

A national charity cake campaign site, built so that a donor arriving cold from a WhatsApp forward
can verify the organisation before giving.

Design decisions and their evidence live in `docs/` — read `docs/BRIEF.md`, `docs/DIRECTION.md` and
`docs/ARCHITECTURE.md` before changing anything visual or structural. They are the record of what
was decided and why, and re-litigating them by accident is the main way this site would drift back
into looking like every other charity template.

## Running it

```bash
npm install
cp .env.example .env.local     # fill in, see below
npm run dev
```

The site runs fully without any environment variables. Forms report honestly that they are not
connected rather than pretending to succeed, and `/donate` says the checkout is not open yet instead
of rendering a dead button.

```bash
npm run build        # production build
npm run start        # serve the production build on :3000
npm run a11y         # axe sweep, all routes × light and dark
npm run verify       # Playwright screenshot sweep + stop-ship checks (server must be running)
node scripts/form-check.mjs   # exercises the volunteer form's validation and failure paths
```

## Architecture decision record

```
Rendering:   SSG + selective SSR / ISR (dynamic only for the Sheets-backed ledger and thermometer)
Framework:   Next.js 16, App Router
Signals:     public routes (1), links pasted into WhatsApp/X/Slack (2), growing content (3),
             content from a data source (4), the PRD says "SEO/PR" (5), LLM discoverability (8),
             link previews must render (10) — score 7/10
Rejected:    Vite SPA — fails every signal. AI crawlers and social unfurlers execute no
             JavaScript, so a client-rendered appeal is invisible in exactly the channel the
             PRD names first. WhatsApp in particular serves the bare shell to its crawler,
             which produces a naked grey link.
             Astro — wins on prose weight, loses on the four server-side write paths and
             per-route OG generation, which are the load-bearing parts here.
Consequence: all indexable content renders server-side. `ssr: false` on anything indexable is a
             defect, not a workaround. Client-only fetching is permitted inside form
             interactivity and nowhere else.
```

## How it is put together

- `src/app/globals.css` — the token system, three layers: primitive → semantic → component.
  Components reference semantic tokens only. Changing `--accent` and the two ground colours
  reskins the whole site with no other edit; that is the test the layer has to pass.
- `src/lib/content/` — every string, every record, every figure. Components read from it and
  nothing hardcodes copy. Facts the organisation has not supplied yet are marked `pending()` and
  render as a visible labelled gap, so a missing CAC number is conspicuous to the team rather than
  invisible to the donor.
- `src/lib/sheets.ts` — the single read/write path to Google Sheets, `server-only`. Swapping in a
  database later touches this module and nothing else.
- `src/lib/actions.ts` — one shared server action handler behind all four forms: rate limit →
  zod validation → honeypot and timing check → append → typed result. It returns a discriminated
  result instead of throwing, because a submission that silently vanishes is the worst failure this
  site can have.
- `src/components/form.tsx` — the form shell. Field errors travel by context rather than as a render
  prop, which is what lets the form pages stay Server Components and keep their metadata.

## Before launch

Facts only the organisation can supply — until they are in, the site displays each as an explicit
gap. Fill them in `src/lib/content/index.ts`:

1. **CAC Incorporated Trustees number** and registered legal name.
2. **Bank account** — account name must be the exact registered name, never an individual's.
3. **Trustees and project team** — names, photographs, real bios, LinkedIn.
4. **Registered office address and a phone number that is answered.**
5. **Checkout URL** once the merchant account exists (`NEXT_PUBLIC_CHECKOUT_URL`).
6. **Legal review** of `/privacy` and `/terms` against the Nigeria Data Protection Act.

Deferred engineering work is tracked in `docs/BACKLOG.md`.
