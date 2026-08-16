import Link from "next/link";

import { EmptyState, ButtonLink, Num, PendingValue, Prose, Section, Shell } from "@/components/primitives";
import { givingTiers, impactStats, org, partners, site, updates } from "@/lib/content";
import { formatCount, formatDate, formatNaira } from "@/lib/format";
import { readLedger } from "@/lib/sheets";

export const revalidate = 300;

export default async function HomePage() {
  const ledger = await readLedger();
  const raisedKobo = ledger
    .filter((e) => e.direction === "in")
    .reduce((sum, e) => sum + e.amount.amountKobo, 0);
  const progress = Math.min(100, (raisedKobo / site.campaignGoalKobo) * 100);

  return (
    <>
      {/* Above the fold, compressed: the promise, the figure, the three CTAs.
          Nothing sits between them. The DEC pattern. */}
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / The appeal</p>
            <div>
              <h1 className="reveal">{org.tagline}</h1>
              <p className="mt-6 text-lg" style={{ maxWidth: "var(--measure)" }}>
                {site.promise}
              </p>

              {/* The thermometer. Reads from the published ledger, not from a
                  target — the figure and the evidence are the same object. */}
              <div className="mt-10 border-t border-line pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="text-3xl md:text-4xl">
                    <Num>{formatNaira(raisedKobo)}</Num>
                  </p>
                  <p className="text-sm text-muted">
                    of <Num>{formatNaira(site.campaignGoalKobo)}</Num> · from the published ledger
                  </p>
                </div>
                <div
                  className="mt-4 h-2 w-full overflow-hidden bg-bg-soft"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Campaign progress"
                >
                  <div
                    className="h-full bg-accent transition-[width] duration-500"
                    style={{ width: `${Math.max(progress, 0.5)}%` }}
                  />
                </div>
                {ledger.length === 0 ? (
                  <p className="mt-3 text-sm text-muted">
                    The ledger is empty because the campaign has not opened yet. The figure above
                    will only ever be what the ledger says.
                  </p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/donate">Donate</ButtonLink>
                <ButtonLink href="/partner" variant="secondary">
                  Partner with us
                </ButtonLink>
                <ButtonLink href="/volunteer" variant="secondary">
                  Volunteer
                </ButtonLink>
              </div>

              {/* The trust line. Each fact on its own row so a not-yet-supplied
                  value cannot shove the next one into a ragged wrap. */}
              <dl className="mt-8 grid gap-2 border-t border-line pt-6 text-sm sm:grid-cols-[10rem_1fr]">
                <dt className="text-muted">Registered as</dt>
                <dd>
                  <PendingValue value={org.legalName} render={(v) => <strong>{v}</strong>} />
                </dd>
                <dt className="text-muted">CAC Trustees no.</dt>
                <dd>
                  <PendingValue value={org.cacNumber} render={(v) => <Num>{v}</Num>} />
                </dd>
                <dt className="text-muted">The money</dt>
                <dd>
                  <Link href="/transparency" className="underline underline-offset-4">
                    Read the full ledger
                  </Link>
                </dd>
              </dl>
            </div>
          </div>
        </Shell>
      </section>

      {/* The costed ladder, immediately below the fold. Never a bare amount box. */}
      <Section
        index="02 / What it buys"
        title="Pick an amount, see exactly what it does"
        lede="Each figure below is what that gift covers at cost. No percentages, no averages."
      >
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {givingTiers.map((tier) => (
            <li key={tier.amountKobo} className="bg-bg p-6">
              <p className="text-2xl text-accent">
                <Num>{formatNaira(tier.amountKobo)}</Num>
              </p>
              <p className="mt-2 text-muted">{tier.buys}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/donate">Give now</ButtonLink>
        </div>
      </Section>

      {/* Verification, promoted to the body of the page. */}
      <Section
        index="03 / Check us"
        title="Three checks you can run yourself"
        lede="You should not have to take our word for any of this. Here is how to verify it in about a minute."
      >
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
          <li className="bg-bg p-6">
            <p className="idx">Check one</p>
            <h3 className="mt-3">Look us up on the CAC register</h3>
            <p className="mt-2 text-sm text-muted">
              Our Incorporated Trustees number is{" "}
              <PendingValue value={org.cacNumber} render={(v) => <Num>{v}</Num>} />. Search it on
              the{" "}
              <a
                href={org.cacSearchUrl}
                className="underline underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                public register
              </a>
              .
            </p>
          </li>
          <li className="bg-bg p-6">
            <p className="idx">Check two</p>
            <h3 className="mt-3">Read the names</h3>
            <p className="mt-2 text-sm text-muted">
              Our trustees are{" "}
              <Link href="/leadership" className="underline underline-offset-4">
                named, photographed and reachable
              </Link>
              . Anonymous charities are not charities.
            </p>
          </li>
          <li className="bg-bg p-6">
            <p className="idx">Check three</p>
            <h3 className="mt-3">Follow the money</h3>
            <p className="mt-2 text-sm text-muted">
              Every naira in and out is on{" "}
              <Link href="/transparency" className="underline underline-offset-4">
                one public page
              </Link>
              , with references you can match to your own receipt.
            </p>
          </li>
        </ol>
        <p className="mt-6 text-sm text-muted" style={{ maxWidth: "var(--measure)" }}>
          We will never ask you to pay into a personal account. If a message asks you to send money
          anywhere other than the account published on this site, it is not from us.
        </p>
      </Section>

      <Section
        index="04 / Where we are"
        title="The campaign so far"
        lede="Every figure carries the date it was true. A counter without a date is a claim, not a number."
      >
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-bg p-6">
              <dt className="order-2 mt-2 text-sm">{stat.label}</dt>
              <dd className="order-1 text-3xl">
                <Num>{formatCount(stat.value)}</Num>
                <span className="mt-1 block text-xs text-muted">
                  as at {formatDate(stat.asOf)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        index="05 / Partners"
        title="Who is standing behind this"
        lede="Every partner below links to their own announcement. Logos on their own prove nothing — anyone can copy a logo, and plenty of fake appeals do."
      >
        {partners.length === 0 ? (
          <EmptyState
            title="No partners announced yet"
            body="Partnerships appear here only once the partner has published something we can link to. Until then this space stays empty on purpose."
            action={<ButtonLink href="/partner">Become the first</ButtonLink>}
          />
        ) : (
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <li key={p.slug} className="bg-bg p-6">
                <p className="font-medium">{p.name}</p>
                <p className="idx mt-1">{p.tier}</p>
                <a
                  href={p.proofUrl}
                  className="mt-3 inline-block text-sm underline underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {p.proofLabel}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        index="06 / Updates"
        title="What has happened lately"
        lede="Dated, specific, and written by the project team."
      >
        {updates.length === 0 ? (
          <EmptyState
            title="No updates yet"
            body="The first update goes up when the first bake happens. We would rather show you an empty page than a filler one."
          />
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {updates.slice(0, 4).map((u) => (
              <li key={u.slug} className="py-5">
                <p className="idx">{formatDate(u.date)}</p>
                <h3 className="mt-1">
                  <Link href={`/updates/${u.slug}`} className="hover:underline hover:underline-offset-4">
                    {u.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted">{u.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section index="07 / Take part" title="Four ways in">
        <Prose>
          <p>
            Give money, and it appears in the ledger. Give goods, and they appear in the ledger as an
            in-kind entry at their stated value. Give time, and you will be on a host site. Give
            reach, and you send someone this page.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/donate">Donate</ButtonLink>
          <ButtonLink href="/partner" variant="secondary">
            Partner
          </ButtonLink>
          <ButtonLink href="/volunteer" variant="secondary">
            Volunteer
          </ButtonLink>
          <ButtonLink href="/in-kind" variant="secondary">
            Give in kind
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
