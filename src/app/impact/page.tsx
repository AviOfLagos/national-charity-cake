import type { Metadata } from "next";

import { ButtonLink, EmptyState, Num, Prose, Section, Shell } from "@/components/primitives";
import { impactStats, updates } from "@/lib/content";
import { formatCount, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Impact",
  description: "What the National Charity Cake campaign has done so far, with the date each figure was true.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  const evidence = updates.filter((u) => u.cover);

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Impact</p>
            <div>
              <h1>What the money did</h1>
              <Prose className="mt-6">
                <p>
                  Every figure here carries the date it was true, because a counter without a date is
                  a claim rather than a number. Where a figure comes from the ledger, it is the
                  ledger — not a rounded-up version of it.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Figures" title="Where we are">
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-bg p-6">
              <dt className="order-2 mt-2 text-sm">{stat.label}</dt>
              <dd className="order-1 text-3xl">
                <Num>{formatCount(stat.value)}</Num>
                {stat.unit ? <span className="ml-1 text-base text-muted">{stat.unit}</span> : null}
                <span className="mt-1 block text-xs text-muted">
                  as at {formatDate(stat.asOf)}
                </span>
                {stat.note ? (
                  <span className="mt-2 block text-xs text-muted">{stat.note}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        index="03 / Evidence"
        title="Photographs, dated and placed"
        lede="An image on this site is evidence, so it carries what it shows, where, and when. Nothing here is generated or stock."
      >
        {evidence.length === 0 ? (
          <EmptyState
            title="No photographs yet"
            body="We would rather show you nothing than show you a stock photo of somebody else's work. The first images go up after the first bake."
            action={<ButtonLink href="/volunteer">Help make the first one</ButtonLink>}
          />
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {evidence.map((u) => (
              <li key={u.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.cover!.src}
                  alt={u.cover!.alt}
                  className="w-full border border-line object-cover"
                  style={{ aspectRatio: "3 / 2" }}
                />
                <p className="mt-3 text-sm">{u.cover!.caption}</p>
                <p className="idx mt-1">
                  {u.cover!.place} · {formatDate(u.cover!.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
