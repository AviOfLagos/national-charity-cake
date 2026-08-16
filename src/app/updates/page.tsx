import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, EmptyState, Prose, Section, Shell } from "@/components/primitives";
import { updates } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Updates",
  description: "Dated updates from the National Charity Cake project team.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  const sorted = [...updates].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Updates</p>
            <div>
              <h1>What is actually happening</h1>
              <Prose className="mt-6">
                <p>
                  Written by the project team, dated, and specific enough to be checked against the
                  ledger.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Archive" title="All updates">
        {sorted.length === 0 ? (
          <EmptyState
            title="No updates yet"
            body="The first one goes up when the first bake happens. We would rather leave this page empty than fill it with announcements about announcements."
            action={<ButtonLink href="/volunteer">Be part of the first one</ButtonLink>}
          />
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {sorted.map((u) => (
              <li key={u.slug} className="py-6">
                <p className="idx">{formatDate(u.date)}</p>
                <h3 className="mt-1">
                  <Link href={`/updates/${u.slug}`} className="hover:underline hover:underline-offset-4">
                    {u.title}
                  </Link>
                </h3>
                <p className="mt-2 text-muted" style={{ maxWidth: "var(--measure)" }}>
                  {u.excerpt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
